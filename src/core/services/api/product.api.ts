import { filterProductQuery } from "core/helpers/generalHelpers";
import { apiCall } from "./api.axios";

const businessId = process.env.REACT_APP_BUSINESS_ID;

export const AddNewQuote = (quote: NewQuotation) => {
  return apiCall({
    endpoint: "/quotations",
    param: businessId,
    body: quote,
    method: "POST",
  });
};

export const GetProducts = (query: ProductQuery) => {
  return apiCall({
    endpoint: "/products",
    pQuery: filterProductQuery({
      ...query,
      businessId: businessId!,
      listedOnly: true,
    }),
    method: "GET",
  });
};

export const GetProductByParam = (sku: string) => {
  return apiCall({
    endpoint: "/products",
    param: `${sku}/${businessId}`,
    method: "GET",
  });
};

export const GetCategories = () => {
  return apiCall({
    endpoint: "/category",
    pQuery: { businessId },
    method: "GET",
  });
};
