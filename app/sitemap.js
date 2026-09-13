import { SITE_URL } from '../lib/site';
import { products } from '../lib/products';
import { zebraFamilies } from '../lib/zebraFamilies';
import { getAllBlogSlugs } from '../lib/blogs';

// trailingSlash is on in next.config, so every URL ends with "/" to match the canonical pages.
const url = (path) => `${SITE_URL}${path}/`.replace(/\/+$/, '/');

export default function sitemap() {
  const staticPages = [
    { path: '', priority: 1, changeFrequency: 'weekly' },
    { path: '/products', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/about', priority: 0.6, changeFrequency: 'monthly' },
    { path: '/our-factory', priority: 0.6, changeFrequency: 'monthly' },
    { path: '/blogs', priority: 0.7, changeFrequency: 'weekly' },
    { path: '/contact', priority: 0.8, changeFrequency: 'monthly' },
  ];

  return [
    ...staticPages.map(({ path, ...rest }) => ({ url: url(path), ...rest })),
    ...products.map((p) => ({
      url: url(`/products/${p.slug}`),
      priority: 0.8,
      changeFrequency: 'monthly',
    })),
    ...zebraFamilies.map((f) => ({
      url: url(`/products/zebra-blinds/${f.slug}`),
      priority: 0.7,
      changeFrequency: 'monthly',
    })),
    ...getAllBlogSlugs().map((slug) => ({
      url: url(`/blog/${slug}`),
      priority: 0.6,
      changeFrequency: 'monthly',
    })),
  ];
}
