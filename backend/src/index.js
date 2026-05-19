'use strict';

/**
 * Bootstrap runs once on every server start.
 * Ensures the Public role has read access to products and blog posts
 * so the frontend can query them without an API token.
 */
module.exports = {
  register(/*{ strapi }*/) {},

  async bootstrap({ strapi }) {
    await grantPublicPermissions(strapi);
  },
};

async function grantPublicPermissions(strapi) {
  const publicRole = await strapi
    .query('plugin::users-permissions.role')
    .findOne({ where: { type: 'public' } });

  if (!publicRole) {
    strapi.log.warn('Public role not found — skipping permission setup');
    return;
  }

  const requiredActions = [
    'api::product.product.find',
    'api::product.product.findOne',
    'api::blog-post.blog-post.find',
    'api::blog-post.blog-post.findOne',
  ];

  const existingPerms = await strapi
    .query('plugin::users-permissions.permission')
    .findMany({ where: { role: publicRole.id } });

  for (const action of requiredActions) {
    const existing = existingPerms.find(p => p.action === action);

    if (existing) {
      if (!existing.enabled) {
        await strapi.query('plugin::users-permissions.permission').update({
          where: { id: existing.id },
          data:  { enabled: true },
        });
      }
    } else {
      await strapi.query('plugin::users-permissions.permission').create({
        data: { action, role: publicRole.id, enabled: true },
      });
    }
  }

  strapi.log.info('✅ Public API permissions ready (products, blog-posts)');
}
