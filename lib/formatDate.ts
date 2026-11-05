// Post dates are calendar dates stored as UTC midnight; formatting them in UTC keeps the server
// render and every visitor's browser on the same day (pliny's formatDate uses the local timezone)
export const formatDate = (date: string, locale = 'en-US') =>
  new Date(date).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  })
