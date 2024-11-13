/* eslint-disable no-template-curly-in-string */
import { useNavigate } from "react-router-dom";
import { addMetaData } from "core/helpers/seoHelpers";
import { Link } from "react-router-dom";
import InputField from "core/components/formfields/InputField";
import { useEffect, useState } from "react";
import { btn, invoiceGroup } from "core/consts/styling";
import defaultImg from "assets/img/defaultProductImg.svg";
import notification from "core/helpers/notification";
import { useProductStore } from "core/services/stores/useProductStore";
import TextField from "core/components/formfields/TextField";

const Quotation = () => {
  const navigate = useNavigate();

  const quotedProducts = useProductStore((store) => store.quotedProducts);
  const errors = useProductStore((store) => store.errors);
  const setError = useProductStore((store) => store.setError);
  const updateError = useProductStore((store) => store.updateError);
  const clearError = useProductStore((store) => store.clearError);

  const placeQuotationAction = useProductStore((store) => store.placeQuotation);
  const clearCart = useProductStore((store) => store.clearQuote);

  const [data, setData] = useState<NewQuotation>({
    companyName: "",
    contactEmail: "",
    contactPhoneNumber: "",
    name: "",
    note: "",
    productSkus: quotedProducts.map((product) => product.sku),
  });

  // TODO: Add Validations
  const validation = (data: NewQuotation) => {
    var isValid = true;

    if (data?.name?.length < 1) {
      isValid = false;
      updateError("name", "Name is required");
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data?.contactEmail)) {
      updateError("contactEmail", "A valid Email address is required");
      isValid = false;
    }

    if (data?.companyName?.length < 1) {
      isValid = false;
      updateError("companyName", "Business/Company is required");
    }

    if (
      data?.contactPhoneNumber?.length !== 11 &&
      data?.contactPhoneNumber?.length !== 13
    ) {
      updateError(
        "contactPhoneNumber",
        "Phone number must be 11 digits or 13 digits",
      );
      isValid = false;
    }

    if (data?.productSkus?.length < 1) {
      updateError("productSkus", "Please add products for quotes");
      isValid = false;
    }

    return isValid;
  };

  const handleFormChange = (e: any) => {
    const { name, value } = e?.target;

    setData((state) => ({
      ...state,
      [name]: value,
    }));
  };

  const placeQuote = async (e: any) => {
    e.preventDefault();

    if (!validation(data)) {
      notification({
        type: "danger",
        message: "Please pass in all required information",
      });

      return;
    }

    clearError();
    var res = await placeQuotationAction(data);

    if (res?.status) {
      navigate("/products");
      clearCart();
      setData({
        companyName: "",
        contactEmail: "",
        contactPhoneNumber: "",
        name: "",
        note: "",
        productSkus: [],
      });
    }
  };

  useEffect(() => {
    quotedProducts?.length < 1 && navigate("/products");

    setError({
      companyName: "",
      contactEmail: "",
      contactPhoneNumber: "",
      name: "",
      note: "",
      productSkus: "",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // TODO: Save customer details for automatic refill

  return (
    <>
      {addMetaData({
        title: "Ocean Global Chemicals Nigeria - Checkout",
        description: "Easy checkout in less than 2 minutes",
      })}

      <div className="m-[0px] mx-auto mb-[34px] h-full w-11/12 overflow-hidden pt-[20px] md:w-4/5">
        <section className="mb-[28px]">
          <header className="flex flex-wrap items-center gap-3 text-[12px] text-black-shade">
            <Link to="/" className="hover:underline">
              Home
            </Link>
            <span>/</span>
            <Link to="/products" className="hover:underline">
              Product
            </Link>
            <span>/</span>
            <Link to="/cart" className="hover:underline">
              View Cart
            </Link>
            <span>/</span>
            <Link to="/checkout" className="text-black hover:underline">
              Checkout
            </Link>
          </header>
        </section>

        <form
          className="mb-[28px] flex flex-col gap-10 sm:flex-row"
          onSubmit={placeQuote}
        >
          <div className="w-full sm:w-1/2">
            <p className="mb-5 text-[24px] font-[500]">Billing Details</p>

            <div>
              <InputField
                boxStyle="mb-3"
                label="Name"
                isRequired
                name="name"
                value={data?.name}
                onChange={handleFormChange}
                errors={errors?.name}
                onBlur={() => updateError("name", "")}
              />
              <InputField
                boxStyle="mb-3"
                label="Company/Business"
                name="companyName"
                value={data?.companyName}
                onChange={handleFormChange}
                instruction={`* if purchase is made on behalf of a business or company`}
                errors={errors?.companyName}
                onBlur={() => updateError("companyName", "")}
              />

              <InputField
                boxStyle="mb-3"
                label="Email"
                isRequired
                name="contactEmail"
                value={data?.contactEmail}
                onChange={handleFormChange}
                errors={errors?.ContactEmail}
                onBlur={() => updateError("contactEmail", "")}
              />

              <InputField
                boxStyle="mb-3"
                label="Contact Phone Number"
                name="contactPhoneNumber"
                isNumberOnly
                isRequired
                value={data?.contactPhoneNumber}
                onChange={handleFormChange}
                errors={errors?.ContactPhoneNumber}
                onBlur={() => updateError("contactPhoneNumber", "")}
              />

              <TextField
                boxStyle="mb-3 flex flex-col"
                label="Extra Note"
                name="note"
                value={data?.note}
                onChange={handleFormChange}
              />
            </div>
          </div>

          <div className="w-full rounded-[4px] sm:w-1/2">
            <div className="mb-5">
              <div className="mb-5">
                {quotedProducts?.length > 0 &&
                  quotedProducts?.map((item) => (
                    <div
                      key={item?.productId}
                      className={`${invoiceGroup} !border-none`}
                    >
                      <div className="flex w-2/3 items-center gap-3">
                        <img
                          src={item?.images[0]?.url ?? defaultImg}
                          alt={item?.name}
                          className="w-[32px]"
                        />
                        <p>{item?.name}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            <div className="flex flex-col items-center justify-start gap-3 lg:flex-row">
              <Link
                to="/products"
                className={`${btn} !lg:w-1/2 !w-full border text-[12px] font-[500]`}
              >
                Return to Shop
              </Link>

              <button
                className={`${btn} !lg:w-1/2 !w-full border bg-brand text-[12px] font-[500] text-white`}
              >
                Place Quote Request
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Quotation;
