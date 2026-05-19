/* =========================================
   FRANKO CLOTHING — Central Data Store
   All product & blog data. localStorage-backed
   with default seed data matching the original site.
   ========================================= */

const STORE_KEY  = 'franko_products';
const BLOG_KEY   = 'franko_blog';
const ADMIN_KEY  = 'franko_admin_session';

/* Path prefix — set window.IMG_PREFIX before loading this file:
   root pages   → ''
   pages/ pages → '../'
   admin/ pages → '../'                                          */
function imgPrefix() {
  return (typeof window !== 'undefined' && window.IMG_PREFIX) ? window.IMG_PREFIX : '';
}

/* ── Default Products ─────────────────────── */
const DEFAULT_PRODUCTS = [
  // SUITS
  { id:'suit-001', name:'The Executive Suit',            price:480, category:'suits',          image:'images/suits/Double-Breasted Navy Suit (Sartorial Style).jfif', badge:'New',         featured:true  },
  { id:'suit-002', name:'The Boardroom Two-Piece',       price:560, category:'suits',          image:'images/suits/grey-and-black-suit.jpg',                          badge:'',            featured:false },
  { id:'suit-003', name:'Three-Piece Signature Suit',    price:720, category:'suits',          image:'images/suits/three-piece-suit-brown.jfif',                      badge:'Bestseller',  featured:false },
  { id:'suit-004', name:'Classic Charcoal Suit',         price:390, category:'suits',          image:'images/suits/charcoal-suit.jfif',                               badge:'',            featured:false },
  { id:'suit-005', name:'White Suit',                    price:220, category:'suits',          image:'images/suits/white-suit.jpg',                                   badge:'',            featured:false },
  { id:'suit-006', name:'Couple Outfit — White & Gold',  price:350, category:'suits',          image:'images/couple-outfit-suit-and-dress-white&gold.jpeg',            badge:'',            featured:false },
  { id:'suit-007', name:'Couple Outfit — Blue',          price:350, category:'suits',          image:'images/couple-outfit-suit-and-dress-blue.jpeg',                  badge:'',            featured:false },
  { id:'suit-008', name:'Couple Outfit — Burgundy',      price:350, category:'suits',          image:'images/couple-outfit-suit-and-dress-burgundy.jpeg',              badge:'',            featured:false },
  { id:'suit-009', name:'Couple Outfit — Red',           price:350, category:'suits',          image:'images/couple-outfit-suit-and-dress.jpeg',                      badge:'',            featured:false },
  // SHIRTS
  { id:'shirt-001', name:'Oxford Dress Shirt',               price:95,  category:'shirts', image:'images/shirts/shirt.jfif',                                       badge:'New',        featured:false },
  { id:'shirt-002', name:'Slim Fit Linen Shirt',             price:110, category:'shirts', image:'images/shirts/french-linen-shirts.jfif',                         badge:'',           featured:false },
  { id:'shirt-003', name:'French Cuff Formal Shirt',         price:85,  category:'shirts', image:'images/shirts/mens-french-cufflinks-shirts.jfif',                badge:'Bestseller', featured:false },
  { id:'shirt-004', name:'Classic White Poplin',             price:75,  category:'shirts', image:'images/shirts/Chemise-à-manches-longues-en-pur.jfif',            badge:'',           featured:false },
  { id:'shirt-005', name:'Oxford Shirts',                    price:120, category:'shirts', image:'images/shirts/oxford-shirts.jfif',                               badge:'',           featured:false },
  { id:'shirt-006', name:'Classic Beaded Shirt — White',     price:120, category:'shirts', image:'images/shirts/classic-beaded-shirt-white.jpg',                   badge:'',           featured:true  },
  { id:'shirt-007', name:'Classic Beaded Shirt — Black',     price:120, category:'shirts', image:'images/shirts/classic-beaded-shirt-black.jpg',                   badge:'',           featured:false },
  { id:'shirt-008', name:'Classic Gold Beaded Shirt',        price:120, category:'shirts', image:'images/shirts/classic-gold-beaded-shirt.jpg',                    badge:'',           featured:false },
  { id:'shirt-009', name:'African Print Shirt — Brown',      price:70,  category:'shirts', image:'images/shirts/custom-african-breatheable-print-shirt-brown.jpeg',badge:'',           featured:false },
  { id:'shirt-010', name:'African Print Shirt',              price:70,  category:'shirts', image:'images/shirts/custom-african-breatheable-print-shirt.jpeg',      badge:'',           featured:false },
  { id:'shirt-011', name:'Soft Breatheable Cotton Shirt',    price:120, category:'shirts', image:'images/shirts/shirt.jfif',                                       badge:'',           featured:false },
  // SHOES
  { id:'shoe-001', name:'Oxford Leather Derby',              price:220, category:'shoes', image:'images/shoes/shoes-001 (3).jpg',                                    badge:'Bestseller', featured:true  },
  { id:'shoe-002', name:'Monk Strap Loafer',                 price:185, category:'shoes', image:'images/shoes/mens-brown-double-monk-strap-leather-dress-shoes.jfif',badge:'',           featured:false },
  { id:'shoe-003', name:'Brogue Cap Toe',                    price:260, category:'shoes', image:'images/shoes/oxford-pin-toe-shoes-black.jfif',                      badge:'New',        featured:false },
  { id:'shoe-004', name:'Chelsea Boot Classic',              price:195, category:'shoes', image:'images/shoes/chelsea-boots-black-classic.jfif',                     badge:'',           featured:false },
  // ACCESSORIES
  { id:'acc-001', name:'Silk Pocket Square',                 price:55,  category:'accessories', image:'images/accessories/women&men-clothing-piece-for-suit-breast-pockets.jfif', badge:'',           featured:false },
  { id:'acc-002', name:'Wooden Cane Collection',             price:75,  category:'accessories', image:'images/accessories/my-cane-collection.jfif',                                badge:'New',        featured:false },
  { id:'acc-003', name:'Kemisant Men Belt 2Pack',            price:120, category:'accessories', image:'images/accessories/kemisant-men-belt-2pack.jfif',                           badge:'Bestseller', featured:false },
  { id:'acc-004', name:'Premium Brown Gold Tip Cane',        price:90,  category:'accessories', image:'images/accessories/download (7).jfif',                                      badge:'',           featured:false },
  // AFRICAN ATTIRES
  { id:'afr-001', name:'Custom Brown Embroidered Agbada',    price:180, category:'african_attires', image:'images/custom-brown-embroidered-nigerian-agbada-for-men.jfif', badge:'Signature',   featured:false },
  { id:'afr-002', name:'Custom Deep Blue Agbada',            price:240, category:'african_attires', image:'images/custom-deep-blue-agbada.jfif',                           badge:'Signature',   featured:false },
  { id:'afr-003', name:'Custom White Agbada',                price:320, category:'african_attires', image:'images/custom-white-agbada.jfif',                               badge:'Handcrafted', featured:false },
  { id:'afr-004', name:'Brown Custom Agbada',                price:160, category:'african_attires', image:'images/brown-custom-agbada.jfif',                               badge:'',            featured:false },
  { id:'afr-005', name:'Custom Gold Embroidered Kaftan',     price:200, category:'african_attires', image:'images/custom-gold-embroidered-kaftan.jpeg',                   badge:'Handcrafted', featured:false },
  { id:'afr-006', name:'Custom African Print Attire',        price:200, category:'african_attires', image:'images/custom-african-print-attire.jpeg',                      badge:'Handcrafted', featured:false },
  { id:'afr-007', name:'Custom African Black Agbada',        price:200, category:'african_attires', image:'images/custom-african-black-agbada.jpeg',                      badge:'Handcrafted', featured:false },
  { id:'afr-008', name:'White Laced Design Agbada',          price:200, category:'african_attires', image:'images/white-laced-design-agbada.jpeg',                        badge:'Handcrafted', featured:false },
];

const DEFAULT_BLOG_POSTS = [
  {
    id: 'blog-001',
    title: "The Art of the Perfect Suit Fit",
    slug: 'art-of-perfect-suit-fit',
    excerpt: "A well-fitted suit is more than clothing — it's armor. Learn the key measurements that separate a good suit from a great one.",
    content: "<p>A well-fitted suit is more than clothing — it's armor. When you walk into a room dressed sharp, every element of your presence shifts.</p><p>The shoulders are the foundation. The seam should sit exactly at the edge of your shoulder — not hanging off, not digging in. If the shoulders don't fit, no amount of tailoring can save the rest.</p><p>The chest should button cleanly with no pulling. A slight x-shape of fabric at the button means it's too tight. A relaxed, smooth front means it's just right.</p><p>Trouser break matters more than most men realize. A slight break — just kissing the top of your shoe — is the classic choice. A no-break look is modern and clean. Choose intentionally.</p><p>At FRANKO CLOTHING, every suit is selected with these principles in mind. Our fitting guidance ensures you leave with a suit that commands the room.</p>",
    coverImage: 'images/suits/grey-and-black-suit.jpg',
    category: 'Style Guide',
    date: '2025-01-15',
    published: true,
  },
  {
    id: 'blog-002',
    title: "Building Your Gentleman's Wardrobe: The Essentials",
    slug: 'gentlemans-wardrobe-essentials',
    excerpt: "Every distinguished man needs a core wardrobe. Here are the five essential pieces that will carry you through any occasion.",
    content: "<p>The mark of a prepared man is a wardrobe that can handle any occasion without hesitation. You don't need fifty suits — you need five right pieces.</p><p><strong>1. The Navy Suit.</strong> Versatile, powerful, and endlessly appropriate. Pair it with white for boardrooms or patterned shirts for social events.</p><p><strong>2. The White Oxford Shirt.</strong> The foundation of everything. Crisp, clean, unfussy. It belongs under every suit and works alone with chinos.</p><p><strong>3. The Oxford Derby Shoe.</strong> The single shoe that covers the most ground. In dark brown or black, it carries you from business to formal with ease.</p><p><strong>4. A Quality Leather Belt.</strong> Your belt and shoes should match. Always. This one rule elevates the entire outfit.</p><p><strong>5. The Pocket Square.</strong> Not a handkerchief — a statement. A simple white fold communicates that you care about the details.</p><p>FRANKO CLOTHING carries every one of these essentials, curated for the modern gentleman who commands his environment.</p>",
    coverImage: 'images/suits/blue-suit.jpg',
    category: "Men's Fashion",
    date: '2025-02-01',
    published: true,
  },
  {
    id: 'blog-003',
    title: "African Attire: The New Power Dressing",
    slug: 'african-attire-power-dressing',
    excerpt: "Agbada, kaftan, and African print attires aren't just cultural dress — they're the boldest statement a man can make.",
    content: "<p>There is a confidence that comes from wearing your heritage. African attire — the Agbada, the embroidered kaftan, the dashiki — carries centuries of royalty in its fabric.</p><p>At FRANKO CLOTHING, we've witnessed a powerful shift: our clients are choosing African pieces not just for cultural events, but for corporate meetings, galas, and milestone moments. Because nothing announces arrival quite like a beautifully crafted Agbada.</p><p>The key to wearing African attire with authority is fit and fabric. A structured Agbada in deep blue or embroidered white communicates mastery. The embroidery tells the story — intricate patterns crafted by skilled hands.</p><p>Pair your Agbada with clean, polished accessories. A carved walking stick. A quality watch. Minimal jewelry that lets the garment speak.</p><p>African attire is not a departure from power dressing — it is power dressing, elevated to its highest form.</p>",
    coverImage: 'images/custom-white-agbada.jfif',
    category: 'African Fashion',
    date: '2025-03-10',
    published: true,
  },
];

/* ── Product CRUD ─────────────────────────── */
function getProducts() {
  const stored = localStorage.getItem(STORE_KEY);
  if (!stored) {
    localStorage.setItem(STORE_KEY, JSON.stringify(DEFAULT_PRODUCTS));
    return [...DEFAULT_PRODUCTS];
  }
  try { return JSON.parse(stored); }
  catch { return [...DEFAULT_PRODUCTS]; }
}

function saveProducts(products) {
  localStorage.setItem(STORE_KEY, JSON.stringify(products));
}

function addProduct(product) {
  const products = getProducts();
  product.id = 'p-' + Date.now();
  products.push(product);
  saveProducts(products);
  return product;
}

function updateProduct(id, updates) {
  const products = getProducts();
  const idx = products.findIndex(p => p.id === id);
  if (idx !== -1) {
    products[idx] = { ...products[idx], ...updates };
    saveProducts(products);
    return products[idx];
  }
  return null;
}

function deleteProduct(id) {
  saveProducts(getProducts().filter(p => p.id !== id));
}

function resetProducts() {
  saveProducts([...DEFAULT_PRODUCTS]);
}

/* ── Blog CRUD ────────────────────────────── */
function getBlogPosts() {
  const stored = localStorage.getItem(BLOG_KEY);
  if (!stored) {
    localStorage.setItem(BLOG_KEY, JSON.stringify(DEFAULT_BLOG_POSTS));
    return [...DEFAULT_BLOG_POSTS];
  }
  try { return JSON.parse(stored); }
  catch { return [...DEFAULT_BLOG_POSTS]; }
}

function saveBlogPosts(posts) {
  localStorage.setItem(BLOG_KEY, JSON.stringify(posts));
}

function addBlogPost(post) {
  const posts = getBlogPosts();
  post.id = 'blog-' + Date.now();
  post.date = post.date || new Date().toISOString().split('T')[0];
  posts.unshift(post);
  saveBlogPosts(posts);
  return post;
}

function updateBlogPost(id, updates) {
  const posts = getBlogPosts();
  const idx = posts.findIndex(p => p.id === id);
  if (idx !== -1) {
    posts[idx] = { ...posts[idx], ...updates };
    saveBlogPosts(posts);
    return posts[idx];
  }
  return null;
}

function deleteBlogPost(id) {
  saveBlogPosts(getBlogPosts().filter(p => p.id !== id));
}

function resetBlogPosts() {
  saveBlogPosts([...DEFAULT_BLOG_POSTS]);
}

/* ── Helpers ──────────────────────────────── */
const CATEGORY_LABELS = {
  suits: 'Suits',
  shirts: 'Shirts',
  shoes: 'Shoes',
  accessories: 'Accessories',
  african_attires: 'African Attires',
};

const SPECIAL_BADGES = ['Signature', 'Handcrafted'];

function buildProductCard(product, prefix) {
  prefix = prefix !== undefined ? prefix : imgPrefix();
  /* Absolute CDN URLs (from Strapi/DO Spaces) need no prefix */
  const imgSrc = (product.image && /^https?:\/\//i.test(product.image))
    ? product.image
    : `${prefix}${product.image}`;
  const badgeClass = SPECIAL_BADGES.includes(product.badge) ? 'product-badge badge-special' : 'product-badge';
  const badgeHtml = product.badge ? `<div class="${badgeClass}">${product.badge}</div>` : '';
  const catLabel  = CATEGORY_LABELS[product.category] || product.category;
  const nameEsc   = product.name.replace(/'/g, "\\'");

  return `
<div class="product-card reveal" data-category="${product.category}" data-price="${product.price}" data-name="${product.name}" data-id="${product.id}">
  <div class="product-image">
    <img src="${imgSrc}" alt="${product.name}" loading="lazy" style="width:100%;height:100%;object-fit:cover;">
    ${badgeHtml}
    <div class="product-actions-overlay">
      <button class="btn btn-primary" onclick="addToCart('${nameEsc}', ${product.price}, '${catLabel}', '')">
        <i class="bi bi-bag-plus"></i> Add to Cart
      </button>
      <button class="btn btn-white" onclick="buyNow('${nameEsc}', ${product.price})">
        <i class="bi bi-whatsapp"></i> Buy Now
      </button>
    </div>
  </div>
  <div class="product-info">
    <div class="product-category">${catLabel}</div>
    <div class="product-name">${product.name}</div>
    <div class="product-price">$${product.price.toLocaleString()}</div>
  </div>
</div>`.trim();
}

/* ── Aliases for api.js fallback ─────────────────────────── */
window._storeGetProducts  = getProducts;
window._storeGetBlogPosts = getBlogPosts;
