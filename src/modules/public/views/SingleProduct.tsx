/* eslint-disable no-template-curly-in-string */
import { useNavigate, useParams } from "react-router-dom";
import { addMetaData } from "core/helpers/seoHelpers";
import { Link } from "react-router-dom";
import { isObjectEmpty } from "core/helpers/generalHelpers";
import { useEffect } from "react";
import Subheader from "core/components/Subheader";
import Product from "modules/partials/Product";
import ProductDetail from "modules/partials/ProductDetail";
import { productBox } from "core/consts/styling";
import { useProductStore } from "core/services/stores/useProductStore";

const SingleProduct = () => {
  const navigate = useNavigate();

  const product = useProductStore((store) => store.product);
  const productList = useProductStore((store) => store.productPagination);
  const getProductById = useProductStore((store) => store.getProductByParam);
  const getProducts = useProductStore((store) => store.getProducts);

  const { productId } = useParams();

  useEffect(() => {
    if (productId == null || productId?.length < 1) {
      navigate("/products");
    } else {
      if (isObjectEmpty(product) || product?.sku !== productId) {
        getProductById(productId);
      }
    }

    getProducts({
      businessId: "",
      categoryId: "",
      listedOnly: true,
      pageNumber: 1,
      pageSize: 4,
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  return (
    <>
      {addMetaData({
        title: " Seachems Multi-trade Ventures - Single Product",
        description:
          product != null
            ? `Buy ${product?.name} from us today`
            : "Buy from us today",
      })}

      <div className="m-[0px] mx-auto mb-[34px] h-full w-11/12 overflow-hidden pt-[20px] md:w-4/5">
        <section className="mb-[28px]">
          <header className="flex flex-wrap items-center gap-1 text-[12px] leading-none text-black-shade sm:gap-3">
            <Link to="/" className="hover:underline">
              Home
            </Link>
            <span>/</span>
            <Link to="/products" className="hover:underline">
              Products
            </Link>
            <span>/</span>
            {product != null && (
              <>
                {product?.category != null && (
                  <>
                    <Link
                      to={`/products?category=${product?.category?.categoryId}`}
                      className="capitalize hover:underline"
                    >
                      {product?.category?.name}
                    </Link>
                    <span>/</span>
                  </>
                )}
                <Link
                  to={`/products/${product?.sku}`}
                  className="capitalize text-black hover:underline"
                >
                  {product?.name}
                </Link>
              </>
            )}
          </header>
        </section>

        {product !== null && (
          <ProductDetail product={product} boxStyle="mb-[48px]" />
        )}

        <section className="mb-[38px]">
          <Subheader shortHeader="Related Item" fullHeader="" />

          <div className={`${productBox}`}>
            {productList?.items?.length > 0 ? (
              productList?.items
                ?.slice(0, 4)
                ?.map((product) => (
                  <Product
                    key={product?.sku}
                    product={product}
                    allowExpansion={false}
                  />
                ))
            ) : (
              <>
                <p>No products yet</p>
              </>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default SingleProduct;
