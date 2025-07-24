export type ProductCustomization = {
  tax: string;
  color: string;
  price: string;
};

export type QuotationItem = {
  itemId: string;
  productId: string;
  quantity: number;
  unitPrice: number;
  total: number;
  color: string;
  productName: string;
  productCustomization: ProductCustomization[];
};

type Quotation = {
  id: string;
  appUserId: string;
  appUserName: string;
  quoteNumber: string;
  expiryDate: string;
  tax: string | null;
  total: string;
  discount: string;
  discountType: string;
  subtotal: string;
  items: QuotationItem[];
  createdBy: string;
  updatedBy: string | null;
  createdAt: string;
  updatedAt: string;
  tenant: string;
  deletedAt: string | null;
};

export default Quotation;
