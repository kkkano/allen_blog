/** @type {import("pliny/config").PlinyConfig } */
const siteMetadata = {
  title: "Allen's Blog",
  author: 'Allen Wang',
  headerTitle: "Allen's Blog",
  description:
    'The purpose of this blog is to share his insights and experiences in the field of technology, programming, and personal thoughts.',
  language: 'en-us',
  theme: 'system', // system, dark or light
  siteUrl: 'https://tailwind-nextjs-starter-blog.vercel.app',
  siteRepo: 'https://github.com/kkkano/allen_blog',
  siteLogo: `${process.env.BASE_PATH || ''}/static/images/logo.png`,
  socialBanner: `${process.env.BASE_PATH || ''}/static/images/twitter-card.png`,
  //mastodon: 'https://mastodon.social/@mastodonuser',
  email: 'wx657394554@163.com',
  github: 'https://github.com/kkkano',
  //x: 'https://twitter.com/x',
  // twitter: 'https://twitter.com/Twitter',
  //facebook: 'https://facebook.com',
  //youtube: 'https://youtube.com',
  linkedin: 'https://www.linkedin.com/in/AllenWangQWQ/',
  //threads: 'https://www.threads.net',
  //instagram: 'https://www.instagram.com',
  //medium: 'https://medium.com',
  //bluesky: 'https://bsky.app/',
  locale: 'en-US',
  // set to true if you want a navbar fixed to the top
  stickyNav: false,
  analytics: {
    // If you want to use an analytics provider you have to add it to the
    // content security policy in the `next.config.js` file.
    // supports Plausible, Simple Analytics, Umami, Posthog or Google Analytics.
    umamiAnalytics: {
      // We use an env variable for this site to avoid other users cloning our analytics ID
      umamiWebsiteId: process.env.NEXT_UMAMI_ID, // e.g. 123e4567-e89b-12d3-a456-426614174000
      // You may also need to overwrite the script if you're storing data in the US - ex:
      // src: 'https://us.umami.is/script.js'
      // Remember to add 'us.umami.is' in `next.config.js` as a permitted domain for the CSP
    },
    // plausibleAnalytics: {
    //   plausibleDataDomain: '', // e.g. tailwind-nextjs-starter-blog.vercel.app
    // If you are hosting your own Plausible.
    //   src: '', // e.g. https://plausible.my-domain.com/js/script.js
    // },
    // simpleAnalytics: {},
    // posthogAnalytics: {
    //   posthogProjectApiKey: '', // e.g. 123e4567-e89b-12d3-a456-426614174000
    // },
    // googleAnalytics: {
    //   googleAnalyticsId: '', // e.g. G-XXXXXXX
    // },
  },
  newsletter: {
    // supports mailchimp, buttondown, convertkit, klaviyo, revue, emailoctopus, beehive
    // Please add your .env file and modify it according to your selection
    provider: 'buttondown',
  },
  comments: {
    // If you want to use an analytics provider you have to add it to the
    // content security policy in the `next.config.js` file.
    // Select a provider and use the environment variables associated to it
    // https://vercel.com/docs/environment-variables
    provider: 'giscus', // supported providers: giscus, utterances, disqus
    giscusConfig: {
      // Visit the link below, and follow the steps in the 'configuration' section
      // https://giscus.app/
      repo: 'kkkano/allen_blog',
      repositoryId: 'R_kgDONxOD7A',
      category: 'General',
      categoryId: 'DIC_kwDONxOD7M4CmjqM',
      mapping: 'url',
      strict: '0',
      reactionsEnabled: '1',
      emitMetadata: '0',
      inputPosition: 'bottom',
      theme: 'light',
      lang: 'en',
    },
  },
  search: {
    // provider: 'kbar', // kbar or algolia
    // kbarConfig: {
    //   searchDocumentsPath: `${process.env.BASE_PATH || ''}/search.json`, // path to load documents to search
    // },
    provider: 'algolia',
    algoliaConfig: {
      // The application ID provided by Algolia
      appId: 'R2IYF7ETH7',
      // Public API key: it is safe to commit it
      apiKey: '599cec31baffa4868cae4e79f180729b',
      indexName: 'docsearch',
    },
  },
}

module.exports = siteMetadata
