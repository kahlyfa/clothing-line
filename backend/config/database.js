'use strict';

/** @type {import('@strapi/strapi').Strapi['config']['database']} */
module.exports = ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: {
      host:     env('DATABASE_HOST',     '127.0.0.1'),
      port:     env.int('DATABASE_PORT', 5432),
      database: env('DATABASE_NAME',     'franko_clothing'),
      user:     env('DATABASE_USERNAME', 'postgres'),
      password: env('DATABASE_PASSWORD', ''),
      ssl: env.bool('DATABASE_SSL', false)
        ? { rejectUnauthorized: false }
        : false,
    },
    pool: { min: 2, max: 10 },
    debug: false,
  },
});
