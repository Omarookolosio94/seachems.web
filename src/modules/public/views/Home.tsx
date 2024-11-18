/* eslint-disable no-template-curly-in-string */
import {addMetaData} from "core/helpers/seoHelpers";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {ArrowRight, Package} from "react-feather";
import {product3} from "core/consts/images";
import Subheader from "core/components/Subheader";
import {btn, listBox, productBox} from "core/consts/styling";
import Product from "modules/partials/Product";
import ValueProposition from "modules/partials/ValueProposition";
import Modal from "core/components/Modal";
import ProductDetail from "modules/partials/ProductDetail";
import {useProductStore} from "core/services/stores/useProductStore";

const Home = () => {
    const categories = useProductStore((store) => store.categories);
    const getCategories = useProductStore((store) => store.getCategory);

    const productList = useProductStore((store) => store.productPagination);
    const query = useProductStore((store) => store.query);
    const getProducts = useProductStore((store) => store.getProducts);

    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [openProductModal, setOpenProductModal] = useState(false);

    const handleViewProduct = (product: Product) => {
        setSelectedProduct(product);
        setOpenProductModal(true);
    };

    useEffect(() => {
        getCategories();
        getProducts({
            ...query,
            categoryId: "",
            pageNumber: 1,
            pageSize: 10,
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            {addMetaData({
                title: " Seachems Multi-trade Ventures",
                description:
                    " Seachems Multi-trade Ventures Nigeria - Buy high quality chemicals.",
            })}

            <div className="mx-auto mb-[34px] mt-[-20px] h-full w-11/12 overflow-hidden md:w-4/5">
                <section className="mb-[38px] flex flex-col-reverse gap-5 sm:h-[60vh] sm:flex-row">
                    <div
                        className="hidden h-full w-3/12 flex-col gap-2 border-r border-r-black-shade pr-[10px] pt-[20px] text-[14px] sm:flex">
                        <Link to="/products">All</Link>
                        {categories?.length > 1 &&
                            categories?.map((cat) => (
                                <Link to={`/products?category=${cat?.categoryId}`}>
                                    {cat?.name}
                                </Link>
                            ))}
                    </div>

                    <div className="h-full w-full pt-5 sm:w-9/12">
                        <div
                            className="item-center flex h-full w-full flex-col-reverse overflow-hidden rounded-[4px] bg-black sm:flex-row">
                            <div className="flex h-full w-full flex-col justify-center p-5 text-white sm:w-1/2 sm:p-8">
                                <p className="mb-3 text-[18px] font-[500] sm:mb-5 sm:text-[24px]">
                                    Your One-Stop Shop for Wholesale Chemicals in Nigeria
                                </p>
                                <Link to="/products" className="w-1/2 sm:w-1/3">
                                    <span className="border-b py-1 text-[14px]">View Products</span>
                                    <ArrowRight className="ml-3 inline-block h-[14px] w-[14px]"/>
                                </Link>
                            </div>
                            <div className="flex h-full w-full items-center justify-center p-5 sm:w-1/2 sm:p-5">
                                <img src={product3} alt="" className="h-[75%] w-[75%]"/>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="mb-[38px]">
                    <Subheader shortHeader="Categories" fullHeader="Browse By Category"/>

                    <div className="flex gap-5 overflow-x-auto">
                        {categories?.length > 1 &&
                            categories?.map((cat) => (
                                <Link
                                    to={`/products?category=${cat?.categoryId}`}
                                    className={`${listBox} snap-center snap-always`}
                                >
                                    <div className="rounded-full border-[6px] border-shade">
                                        <Package className="h-[28px] w-[28px] sm:h-[32px] sm:w-[32px]"/>
                                    </div>
                                    <p className="mb-1 h-[14px] text-ellipsis text-[12px] leading-none sm:mb-0">
                                        {cat?.name}
                                    </p>
                                </Link>
                            ))}
                    </div>
                </section>

                <section className="mb-[38px]">
                    <Subheader
                        shortHeader="Our Products"
                        fullHeader="Explore Our Products"
                    />

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

                    <div className="flex items-center justify-center">
                        <Link
                            to="/products"
                            className={`${btn} w-2/3 bg-brand text-[12px] text-white sm:w-1/3 lg:w-1/4`}
                        >
                            View All Products
                        </Link>
                    </div>
                </section>

                <ValueProposition/>
            </div>

            {openProductModal && (
                <Modal
                    bodyStyle="w-11/12 md:w-11/12 lg:w-11/12"
                    onClose={() => {
                        setSelectedProduct(null);
                        setOpenProductModal(false);
                    }}
                >
                    <ProductDetail product={selectedProduct}/>
                </Modal>
            )}
        </>
    );
};

export default Home;
