export interface Product {
  name: string;
  description?: string;
  status?: string;
  href?: string;
  cover?: string;
  logo?: string;
}

// Add only user-approved product facts and supplied artwork here.
export const products: Product[] = [{ name: 'Smriti' }];
