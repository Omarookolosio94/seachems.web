/* eslint-disable eqeqeq */
/* eslint-disable no-template-curly-in-string */
import { useSearchParams } from "react-router-dom";
import { addMetaData } from "core/helpers/seoHelpers";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Subheader from "core/components/Subheader";
import Product from "modules/partials/Product";
import Pagination from "core/components/Pagination";
import Modal from "core/components/Modal";
import ProductDetail from "modules/partials/ProductDetail";
import { productBox } from "core/consts/styling";
import SelectField from "core/components/formfields/SelectField";
import { useProductStore } from "core/services/stores/useProductStore";

const Products = () => {
  const productList = useProductStore((store) => store.productPagination);
  const query = useProductStore((store) => store.query);
  const getProducts = useProductStore((store) => store.getProducts);

  const categories = useProductStore((store) => store.categories);
  const getCategories = useProductStore((store) => store.getCategory);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [openProductModal, setOpenProductModal] = useState(false);
  const [searchParams, setSearchParams]: any = useSearchParams();

  const handleViewProduct = (product: Product) => {
    setSelectedProduct(product);
    setOpenProductModal(true);
  };

  const fetchMore = async (page: number) => {
    getProducts({ ...query, pageNumber: page });
  };

  useEffect(() => {
    var category = searchParams.get("category");

    getProducts({
      ...query,
      categoryId: category != null ? category : "",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams.get("category")]);

  useEffect(() => {
    getCategories();
    productList != null && productList?.items?.length < 1 && getProducts(query);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {addMetaData({
        title: "Seachems Multi-trade Ventures- Products",
        description:
          "We sell and deliver high quality chemical products nationwide. Shop with us today and get the best prices",
      })}

      <div className="m-[0px] mx-auto mb-[34px] h-full w-11/12 overflow-hidden pt-[20px] md:w-4/5">
        <section className="mb-[28px]">
          <header className="flex flex-wrap items-center gap-3 text-[12px] text-black-shade">
            <Link to="/" className="hover:underline">
              Home
            </Link>
            <span>/</span>
            <Link to="/products" className="text-black hover:underline">
              Products
            </Link>
            <span>/</span>
            {categories?.length > 0 && `${query?.categoryId}`?.length > 0 ? (
              <>
                <Link
                  to={`/products?category=${query?.categoryId}`}
                  className="capitalize hover:underline"
                >
                  {
                    categories?.find((x) => x.categoryId == query?.categoryId)
                      ?.name
                  }
                </Link>
              </>
            ) : (
              <p className="capitalize text-black hover:underline">All</p>
            )}
          </header>
        </section>

        <section className="mb-[38px]">
          <Subheader shortHeader="Products" fullHeader="Currently On Sale">
            <SelectField
              boxStyle=""
              name="category"
              isRequired
              selectStyle="!h-8 !text-[12px] !py-1 !px-2"
              defaultName="Filter By Category"
              defaultValue=""
              value={query?.categoryId}
              options={
                categories?.length > 0
                  ? [
                      ...categories?.map((cat) => ({
                        name: cat?.name,
                        value: cat?.categoryId,
                      })),
                    ]
                  : []
              }
              onChange={(e: any) => {
                setSearchParams({ category: e?.target?.value });
              }}
            />
          </Subheader>

          <div className={`${productBox}`}>
            {productList?.items?.length > 0 ? (
              productList?.items?.map((product) => (
                <Product
                  key={product?.sku}
                  product={product}
                  handleOpen={handleViewProduct}
                />
              ))
            ) : (
              <>
                <p>No products yet</p>
              </>
            )}
          </div>

          <div className="flex w-full justify-center">
            <Pagination
              pageNumber={productList?.currentPage}
              pageSize={query?.pageSize}
              totalCount={productList?.totalItem}
              totalPage={productList?.totalPage}
              onFetch={fetchMore}
            />
          </div>
        </section>
      </div>

      {openProductModal && (
        <Modal
          bodyStyle="!w-full !h-[100%] lg:!w-11/12"
          onClose={() => {
            setSelectedProduct(null);
            setOpenProductModal(false);
          }}
        >
          <ProductDetail
            product={selectedProduct}
            onClose={() => {
              setSelectedProduct(null);
              setOpenProductModal(false);
            }}
            showClose={true}
          />
        </Modal>
      )}
    </>
  );
};

export default Products;
