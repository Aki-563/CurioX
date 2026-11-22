export interface Product {
  name: string;
  description?: string;
  status?: string;
  href?: string;
  cover?: string;
  /** Optional responsive sources for the cover, e.g. "a.webp 640w, b.webp 1200w". */
  coverSrcset?: string;
  logo?: string;
}

// Add only user-approved product facts and supplied artwork here.
// Smriti facts come from its Google Play listing and the Smriti repo (D037).
export const products: Product[] = [
  {
    name: 'Smriti',
    description: 'A private, offline daily journal for Android.',
    href: '/products/smriti/',
    logo: '/products/smriti-icon.png',
    cover: '/products/smriti-cover.webp',
    coverSrcset:
      '/products/smriti-cover-640.webp 640w, /products/smriti-cover.webp 1200w',
  },
];

export const smriti = {
  playStoreUrl:
    'https://play.google.com/store/apps/details?id=com.connectingdots.smriti',
  packageName: 'com.connectingdots.smriti',
};
