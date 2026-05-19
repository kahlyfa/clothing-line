'use strict';

module.exports = ({ env }) => {
  const frontendUrls = env('FRONTEND_URLS', 'http://localhost:3000')
    .split(',')
    .map(u => u.trim())
    .filter(Boolean);

  return [
    'strapi::logger',
    'strapi::errors',
    {
      name: 'strapi::security',
      config: {
        contentSecurityPolicy: {
          useDefaults: true,
          directives: {
            'connect-src': ["'self'", 'https:'],
            'img-src': [
              "'self'",
              'data:',
              'blob:',
              '*.digitaloceanspaces.com',
              '*.cdn.digitaloceanspaces.com',
              'market-assets.strapi.io',
            ],
            'media-src': [
              "'self'",
              'data:',
              'blob:',
              '*.digitaloceanspaces.com',
              '*.cdn.digitaloceanspaces.com',
            ],
            upgradeInsecureRequests: null,
          },
        },
      },
    },
    {
      name: 'strapi::cors',
      config: {
        enabled: true,
        headers: '*',
        origin: [
          'http://localhost:1337',
          'http://127.0.0.1:1337',
          ...frontendUrls,
        ],
      },
    },
    'strapi::poweredBy',
    'strapi::query',
    'strapi::body',
    'strapi::session',
    'strapi::favicon',
    'strapi::public',
  ];
};
