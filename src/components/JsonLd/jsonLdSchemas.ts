export function createWebsiteSchema(options?: {potentialAction?: any}) {
  return {
    type: 'WebSite',
    data: {
      name: 'AutoGen Labs',
      url: 'https://autogenlabs.com',
      potentialAction: options?.potentialAction || {
        '@type': 'SearchAction',
        target: 'https://autogenlabs.com/search?q={search_term_string}',
        'query-input': 'required name=search_term_string'
      }
    }
  };
}

export function createOrganizationSchema(options: {
  foundingDate: string;
  foundingLocation: string;
  numberOfEmployees: {
    '@type': string;
    minValue: string;
    maxValue: string;
  };
}) {
  return {
    type: 'Organization',
    data: {
      name: 'AutoGen Labs',
      url: 'https://autogenlabs.com',
      logo: 'https://autogenlabs.com/images/logo.png',
      foundingDate: options.foundingDate,
      foundingLocation: {
        '@type': 'Place',
        address: {
          '@type': 'PostalAddress',
          addressLocality: options.foundingLocation
        }
      },
      numberOfEmployees: options.numberOfEmployees,
      sameAs: [
        'https://twitter.com/autogenlabs',
        'https://linkedin.com/company/autogenlabs',
        'https://github.com/autogenlabs'
      ]
    }
  };
}

export function createArticleSchema(options: {
  headline: string;
  description: string;
}) {
  return {
    type: 'Article',
    data: {
      headline: options.headline,
      description: options.description,
      image: 'https://autogenlabs.com/images/logo.png', // Replace with actual image URL
      datePublished: new Date().toISOString(),
      author: {
        '@type': 'Organization',
        name: 'AutoGen Labs',
        url: 'https://autogenlabs.com'
      }
    }
  };
}
