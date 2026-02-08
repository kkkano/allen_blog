import { NextResponse } from 'next/server'
import siteMetadata from '@/data/siteMetadata'

export const dynamic = 'force-dynamic'

const provider = siteMetadata.newsletter?.provider
const buttondownRoute = 'https://api.buttondown.email/v1/subscribers'
const fallbackUrl =
  process.env.NEXT_PUBLIC_NEWSLETTER_FALLBACK_URL?.trim() ||
  (siteMetadata.email
    ? `mailto:${siteMetadata.email}?subject=${encodeURIComponent('Newsletter Subscription')}`
    : undefined)

function getProviderConfigError() {
  if (!provider) {
    return 'Newsletter provider is disabled.'
  }

  if (provider !== 'buttondown') {
    return `Newsletter provider "${provider}" is not supported by this route.`
  }

  if (!process.env.BUTTONDOWN_API_KEY) {
    return 'Newsletter is not configured yet. Missing BUTTONDOWN_API_KEY.'
  }

  return null
}

function toErrorResponse(error: string, status = 503) {
  return NextResponse.json({ error, fallbackUrl }, { status })
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

async function getProviderMessage(response: Response) {
  try {
    const payload = await response.json()
    if (typeof payload === 'string') {
      return payload
    }

    if (Array.isArray(payload?.detail)) {
      return payload.detail
        .map((item) => {
          if (typeof item === 'string') {
            return item
          }

          if (item?.msg && typeof item.msg === 'string') {
            return item.msg
          }

          return ''
        })
        .filter(Boolean)
        .join('; ')
    }

    if (payload?.detail && typeof payload.detail === 'string') {
      return payload.detail
    }

    if (payload?.error && typeof payload.error === 'string') {
      return payload.error
    }

    if (payload?.message && typeof payload.message === 'string') {
      return payload.message
    }

    return ''
  } catch {
    return ''
  }
}

function mapProviderError(status: number, providerMessage: string) {
  const normalized = providerMessage.toLowerCase()

  if (status === 409 || (status === 400 && normalized.includes('already'))) {
    return { status: 409, error: '你已订阅，无需重复操作。' }
  }

  if (status === 400) {
    return { status: 400, error: 'Please enter a valid email address.' }
  }

  if (status === 422) {
    return { status: 400, error: providerMessage || 'Please enter a valid email address.' }
  }

  if (status === 401 || status === 403) {
    return {
      status: 503,
      error: 'Newsletter service is temporarily unavailable. Please use the fallback link.',
    }
  }

  if (status === 429) {
    return { status: 429, error: 'Too many requests. Please try again in a minute.' }
  }

  return {
    status: 502,
    error: providerMessage || 'Unable to subscribe right now. Please try again later.',
  }
}

export async function GET() {
  const configError = getProviderConfigError()

  if (configError) {
    return toErrorResponse(configError, 503)
  }

  return NextResponse.json(
    {
      message: 'Newsletter service is ready.',
      provider,
      fallbackUrl,
    },
    { status: 200 }
  )
}

export async function POST(request: Request) {
  const configError = getProviderConfigError()

  if (configError) {
    return toErrorResponse(configError, 503)
  }

  let payload: { email?: string }

  try {
    payload = await request.json()
  } catch {
    return toErrorResponse('Request body must be valid JSON.', 400)
  }

  const email = payload?.email?.trim() || ''
  if (!email) {
    return toErrorResponse('Email is required.', 400)
  }

  if (!isValidEmail(email)) {
    return toErrorResponse('Please enter a valid email address.', 400)
  }

  const response = await fetch(buttondownRoute, {
    method: 'POST',
    headers: {
      Authorization: `Token ${process.env.BUTTONDOWN_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email_address: email }),
    cache: 'no-store',
  })

  if (response.ok) {
    return NextResponse.json(
      {
        message: '订阅成功，请去邮箱点确认链接。',
      },
      { status: 201 }
    )
  }

  const providerMessage = await getProviderMessage(response)
  const mappedError = mapProviderError(response.status, providerMessage)

  return toErrorResponse(mappedError.error, mappedError.status)
}
