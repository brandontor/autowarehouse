export interface SubProduct {
  subProductId: string;
  name: string;
  quantity: number;
}

export interface Product {
  productId: string;
  productName: string;
  contents: SubProduct[]
}


export interface LineItem {
  lineItemId: string;
  productId: string;
  productName: string;
  price: number;
  contents?: SubProduct[]
}

export interface Order {
  orderId: string;
  orderTotal: number;
  orderDate: string;
  shippingAddress: string;
  customerName: string;
  customerEmail: string;
  lineItems: LineItem[];
}