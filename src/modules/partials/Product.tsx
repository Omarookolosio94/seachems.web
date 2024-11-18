import defaultImg from "assets/img/defaultProductImg.svg";
import {useProductStore} from "core/services/stores/useProductStore";
import {Delete, Maximize, ShoppingCart} from "react-feather";
import {useNavigate} from "react-router-dom";
import {formatDate} from "../../core/helpers/generalHelpers";

interface Props {
    product: Product | null;
    handleOpen?: any;
    allowExpansion?: boolean;
}

const Product = ({
                     product = null,
                     handleOpen = () => {
                     },
                     allowExpansion = true,
                 }: Props) => {
    const navigate = useNavigate();

    const quotedProducts = useProductStore((store) => store.quotedProducts);
    const addToQuote = useProductStore((store) => store.addToQuote);
    const removeFromQuote = useProductStore((store) => store.removeFromQuote);

    return (
        <div
            className="h-[260px] hover:cursor-pointer sm:h-[322px]"
            onClick={() => navigate(`/products/${product?.sku}`)}
        >
            <div className="relative h-4/5 !rounded-[4px] bg-shade">
                <div className="relative flex h-[90%] flex-row items-center justify-center">
                    {allowExpansion && (
                        <div
                            className="absolute right-[2px] top-[2px] p-2 hover:cursor-pointer lg:right-[5px] lg:top-[5px] "
                            onClick={(e: any) => {
                                e?.stopPropagation();
                                handleOpen(product);
                            }}
                        >
                            <Maximize className="h-[18px] sm:h-[24px]"/>
                        </div>
                    )}
                    <img
                        src={product?.images[0]?.url ?? defaultImg}
                        alt={product?.name}
                        className="h-2/3"
                    />
                </div>

                {quotedProducts.some((item) => item.sku == product?.sku) ? (
                    <button
                        onClick={(e: any) => {
                            e?.stopPropagation();
                            removeFromQuote(product!.sku);
                        }}
                        className="absolute bottom-0 flex w-full items-center justify-center gap-2 rounded-b-[5px] bg-red-700 py-[10px] text-[12px] text-white"
                    >
                        <Delete className="h-[12px] w-[12px]"/>
                        <span className="inline-block">Remove From Quote</span>
                    </button>
                ) : (
                    <button
                        onClick={(e: any) => {
                            e?.stopPropagation();
                            addToQuote(product!);
                        }}
                        className="absolute bottom-0 flex w-full items-center justify-center gap-2 rounded-b-[5px] bg-black py-[10px] text-[12px] text-white"
                    >
                        <ShoppingCart className="h-[12px] w-[12px]"/>
                        <span className="inline-block">Add To Quote</span>
                    </button>
                )}
            </div>

            <div className="mt-2">
                <p className="font-[500] capitalize">{product?.name}</p>
                <p className="text-[12px] font-[500] text-red-500">
                    {product?.category?.name ?? ""}
                </p>
            </div>
        </div>
    );
};

export default Product;
