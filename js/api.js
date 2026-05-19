/* =========================================
   FRANKO CLOTHING — API Client
   Wraps Strapi REST API calls.
   Falls back to localStorage (store.js) when
   window.STRAPI_URL is empty.
   ========================================= */

const FrankoAPI = (() => {
  'use strict';

  function base() {
    return (window.STRAPI_URL || '').replace(/\/$/, '');
  }

  /* ── Strapi response → flat product object ── */
  function toProduct(item) {
    const a   = item.attributes;
    const img = a.image?.data?.attributes ?? null;
    /* Prefer medium format, fall back to original */
    const url = img
      ? (img.formats?.medium?.url ?? img.formats?.small?.url ?? img.url ?? '')
      : '';

    return {
      id:          String(item.id),
      name:        a.name        ?? '',
      price:       Number(a.price) || 0,
      category:    a.category    ?? 'suits',
      badge:       a.badge       ?? '',
      featured:    Boolean(a.featured),
      image:       url,
      description: a.description ?? '',
    };
  }

  /* ── Strapi response → flat blog post object ── */
  function toPost(item) {
    const a     = item.attributes;
    const cover = a.coverImage?.data?.attributes ?? null;
    const coverUrl = cover
      ? (cover.formats?.medium?.url ?? cover.formats?.small?.url ?? cover.url ?? '')
      : '';

    return {
      id:         String(item.id),
      title:      a.title    ?? '',
      slug:       a.slug     ?? '',
      excerpt:    a.excerpt  ?? '',
      content:    a.content  ?? '',
      coverImage: coverUrl,
      category:   a.category ?? '',
      date:       (a.publishedAt ?? a.createdAt ?? '').split('T')[0],
      published:  Boolean(a.publishedAt),
    };
  }

  /* ── Generic fetch ── */
  async function apiFetch(path) {
    const res = await fetch(`${base()}${path}`, {
      headers: { 'Content-Type': 'application/json' },
    });
    if (!res.ok) throw new Error(`Strapi API ${res.status} — ${path}`);
    return res.json();
  }

  /* ── Public methods ── */

  async function getProducts() {
    /* No Strapi URL configured — use localStorage store */
    if (!base()) {
      return typeof window._storeGetProducts === 'function'
        ? window._storeGetProducts()
        : [];
    }
    try {
      const json = await apiFetch(
        '/api/products' +
        '?populate=image' +
        '&pagination[pageSize]=200' +
        '&sort=createdAt:asc' +
        '&publicationState=live'
      );
      return (json.data ?? []).map(toProduct);
    } catch (err) {
      console.warn('[FrankoAPI] Products fetch failed, using local store:', err.message);
      return typeof window._storeGetProducts === 'function'
        ? window._storeGetProducts()
        : [];
    }
  }

  async function getBlogPosts() {
    if (!base()) {
      return typeof window._storeGetBlogPosts === 'function'
        ? window._storeGetBlogPosts()
        : [];
    }
    try {
      const json = await apiFetch(
        '/api/blog-posts' +
        '?populate=coverImage' +
        '&pagination[pageSize]=100' +
        '&sort=publishedAt:desc' +
        '&publicationState=live'
      );
      return (json.data ?? []).map(toPost);
    } catch (err) {
      console.warn('[FrankoAPI] Blog fetch failed, using local store:', err.message);
      return typeof window._storeGetBlogPosts === 'function'
        ? window._storeGetBlogPosts()
        : [];
    }
  }

  return { getProducts, getBlogPosts };
})();
