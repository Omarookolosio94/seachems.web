import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import {
  AddNewQuote,
  GetCategories,
  GetProductByParam,
  GetProducts,
} from "../api/product.api";
import notification from "core/helpers/notification";

type DataProps = {
  isLoading: boolean;
  productPagination: Pagination<Product>;
  quotedProducts: Product[];
  product: Product | null;
  errors: any | {};
  query: ProductQuery;
  categories: Category[];
};

interface State extends DataProps {
  reset: () => void;
  resetProduct: () => void;
  updateError: (name: string, value: string) => void;
  clearError: () => void;
  setError: (errors: any) => void;
  getProducts: (query: ProductQuery) => Promise<void>;
  getProductByParam: (sku: string) => Promise<void>;
  getCategory: () => Promise<void>;
  addToQuote: (product: Product) => void;
  removeFromQuote: (sku: string) => void;
  placeQuotation: (quote: NewQuotation) => Promise<UIResponse>;
  clearQuote: () => void;
}

const defaultState: DataProps = {
  isLoading: false,
  errors: null,
  productPagination: {
    currentPage: 1,
    items: [],
    totalItem: 0,
    totalPage: 0,
  },
  product: null,
  query: {
    businessId: "",
    categoryId: "",
    listedOnly: false,
    pageNumber: 1,
    pageSize: 10,
  },
  quotedProducts: [],
  categories: [],
};

export const useProductStore = create<State>()(
  devtools(
    persist(
      (set, get): State => ({
        ...defaultState,
        updateError: (name, value) =>
          set((state) => ({
            errors: {
              ...state.errors,
              [name]: value,
            },
          })),
        clearError: () => {
          set({ errors: null });
        },
        setError: (errors) => {
          set({ errors });
        },
        clearQuote: () => {
          set({ quotedProducts: [] });
        },
        resetProduct: () => {
          set({ product: null });
        },
        getProducts: async (query) => {
          set({ isLoading: true });

          var res: UIResponse = await GetProducts(query);
          set({
            productPagination: res?.data?.data,
            isLoading: false,
            query: query,
          });
        },
        getProductByParam: async (sku) => {
          set({ isLoading: true });
          var res: UIResponse = await GetProductByParam(sku);
          set({ product: res?.data?.data, isLoading: false });
        },
        getCategory: async () => {
          set({ isLoading: true });

          var res: UIResponse = await GetCategories();
          set({ categories: res?.data?.data, isLoading: false });
        },
        addToQuote: (product) => {
          const exists = get().quotedProducts.some(
            (quote) => quote.sku === product?.sku,
          );

          if (!exists) {
            set((state) => ({
              quotedProducts: [product, ...state.quotedProducts],
            }));
          }
        },
        placeQuotation: async (quote) => {
          set({ isLoading: true });
          var res: UIResponse = await AddNewQuote(quote);

          if (res?.status) {
            set({ isLoading: false });
            notification({
              type: "success",
              message: res?.data?.message,
            });
          } else {
            set({
              isLoading: false,
              errors: res?.data?.data,
            });
            notification({
              type: "warning",
              message: res?.data?.message,
            });
          }

          return res;
        },
        removeFromQuote: (sku) => {
          set({
            quotedProducts: get().quotedProducts.filter(
              (prod) => prod.sku !== sku,
            ),
          });
        },
        reset: () => {
          set({ ...defaultState });
        },
      }),
      {
        name: "productStore",
        storage: createJSONStorage(() => sessionStorage),
        skipHydration: false,
      },
    ),
  ),
);
