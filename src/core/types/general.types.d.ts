export {};

declare global {
  interface RoutesType {
    name: string;
    layout: string;
    component: JSX.Element;
    icon: JSX.Element | string;
    path: string;
    secondary?: boolean;
  }

  interface Category {
    categoryId: number;
    businessId: string;
    name: string;
    description: string;
    addedBy: string;
    updatedBy: string;
    dateAdded: string;
    lastDateUpdated: string;
  }

  interface Pagination<T> {
    items: T[];
    totalPage: number;
    currentPage: number;
    totalItem: number;
  }

  interface UIResponse {
    status: boolean;
    statusCode: number;
    message: string;
    data: any;
  }

  interface Product {
    images: Image[];
    productId: string;
    sku: string;
    name: string;
    description: string;
    categoryId: null | number;
    category: Category | null;
    tags: null | string;
    qrCodeUrl: string;
    units: null | string;
    comments: null | string;
    isListed: boolean;
    businessId: string;
    dateAdded: string;
    lastDateUpdated: string;
  }

  interface Image {
    logoId: string;
    name: string;
    url: string;
    alt: string;
  }

  interface ProductQuery {
    businessId: string;
    categoryId: string | number;
    listedOnly: boolean;
    pageNumber: number;
    pageSize: number;
  }

  interface NewQuotation {
    name: string;
    companyName: string;
    contactPhoneNumber: string;
    contactEmail: string;
    note: string;
    productSkus: string[];
  }
}
