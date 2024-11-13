import defaultImg from "assets/img/defaultProductImg.svg";
import { btn, gallery } from "core/consts/styling";
import { useEffect, useState } from "react";
import { Delete, ShoppingBag } from "react-feather";
import { useProductStore } from "core/services/stores/useProductStore";

interface Props {
  product: Product | null;
  boxStyle?: string;
  showClose?: boolean;
  onClose?: any;
}

const ProductDetail = ({
  product = null,
  boxStyle = "",
  showClose = false,
  onClose = () => {},
}: Props) => {
  const quotedProducts = useProductStore((store) => store.quotedProducts);
  const addToQuote = useProductStore((store) => store.addToQuote);
  const removeFromQuote = useProductStore((store) => store.removeFromQuote);

  const [displayedImg, setDisplayedImg] = useState<any>("");

  useEffect(() => {
    setDisplayedImg(product?.images[0]?.url ?? defaultImg);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product?.sku]);

  return (
    <>
      {product !== null && (
        <section className={`flex flex-col gap-5 sm:flex-row ${boxStyle}`}>
          <div className="flex w-full flex-col-reverse gap-3 sm:w-3/5 sm:flex-row">
            <div className="flex w-full justify-center gap-5 sm:block sm:w-[80px]">
              {product?.images?.length > 0
                ? product?.images?.map((pic) => (
                    <div
                      key={pic?.logoId}
                      className={`${gallery}`}
                      onClick={() => setDisplayedImg(pic?.url)}
                    >
                      <img
                        src={pic?.url}
                        alt={pic?.name}
                        className="h-2/3 w-2/3"
                      />
                    </div>
                  ))
                : [1, 2, 3, 4].map((count: any) => (
                    <div
                      key={count}
                      className={`${gallery}`}
                      onClick={() => setDisplayedImg(defaultImg)}
                    >
                      <img
                        src={defaultImg}
                        alt="default image"
                        className="h-2/3 w-2/3"
                      />
                    </div>
                  ))}
            </div>
            <div className="flex h-full w-full items-center justify-center rounded-[4px] bg-[#f5f5f5] py-5 sm:py-0">
              <div className="flex h-2/3 w-2/3 items-center justify-center overflow-y-scroll">
                <img src={displayedImg} alt="" className="" />
              </div>
            </div>
          </div>

          <div className="w-full sm:w-2/5">
            <h4 className="text-[18px] font-[500] capitalize">
              {product?.name}
            </h4>

            <p className="my-3">{product?.description}</p>

            <div className="border-b-[.5px] border-black-shade"></div>

            <div className="mb-3 mt-2">
              <div className="mb-2 flex items-center gap-3">
                <p>Category:</p>
                <span className="rounded-[4px] border border-black-shade bg-shade px-1 font-[500]">
                  {product?.category?.name || "n/a"}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <p>Tags:</p>
                <span className="rounded-[4px] border border-brand bg-shade px-1 font-[500] text-brand">
                  {product?.tags || "n/a"}
                </span>
              </div>
            </div>

            <div className="mt-5 flex flex-col items-center gap-3 lg:flex-row">
              {quotedProducts.some((item) => item.sku === product?.sku) ? (
                <button
                  onClick={() => removeFromQuote(product?.sku!)}
                  className={`${btn} !h-10 !w-full bg-red-700 text-[12px] font-[500] text-white lg:!w-1/2`}
                >
                  <Delete className="h-[14px]" />
                  <span className="text-[10px]">Remove From Quote</span>
                </button>
              ) : (
                <button
                  onClick={() => addToQuote(product)}
                  className={`${btn} !h-10 !w-full bg-brand text-[12px] font-[500] text-white lg:!w-1/2`}
                >
                  <ShoppingBag className="h-[14px]" />
                  <span className="text-[10px]">Add to Quote</span>
                </button>
              )}

              {showClose && (
                <button
                  onClick={() => onClose()}
                  className={`${btn} !h-10 !w-full bg-gray text-[12px] font-[500] text-white lg:hidden lg:!w-1/2`}
                >
                  <span className="text-[10px]">Close</span>
                </button>
              )}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default ProductDetail;
