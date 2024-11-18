/* eslint-disable no-template-curly-in-string */
import {useNavigate} from "react-router-dom";
import {addMetaData} from "core/helpers/seoHelpers";
import {Link} from "react-router-dom";

const Privacy = () => {
    const navigate = useNavigate();

    return (
        <>
            {addMetaData({
                title: " Seachems Multi-trade Ventures - Privacy",
                description: "Our privacy policy",
            })}

            <div className="m-[0px] mx-auto mb-[34px] h-full w-11/12 overflow-hidden pt-[20px] md:w-4/5">
                <section className="mb-[28px]">
                    <header className="flex flex-wrap items-center gap-3 text-[12px] text-black-shade">
                        <Link to="/" className="hover:underline">
                            Home
                        </Link>
                        <span>/</span>
                        <Link to="/privacy" className="text-black hover:underline">
                            Privacy Policy
                        </Link>
                    </header>
                </section>

                <section className="mb-[28px]">
                    <p className="mb-6">
                        At <strong>Seachems Multi-trade Ventures</strong>, we value your privacy and are committed to
                        protecting the personal information you share with us. This Privacy Policy explains how we
                        collect, use, and safeguard your information.
                    </p>

                    <h2 className="text-xl font-semibold text-gray-800 mb-3">Information We Collect</h2>
                    <ul className="list-disc list-inside mb-6">
                        <li><strong>Name:</strong> To identify you and personalize your experience with us.</li>
                        <li><strong>Company/Business Name:</strong> (if applicable) For processing purchases made on
                            behalf of a business.
                        </li>
                        <li><strong>Email:</strong> To communicate with you about orders, inquiries, and updates.</li>
                        <li><strong>Contact Phone Number:</strong> For timely communication regarding your requests or
                            transactions.
                        </li>
                    </ul>

                    <h2 className="text-xl font-semibold text-gray-800 mb-3">How We Use Your Information</h2>
                    <p className="mb-6">
                        The information we collect is used for:
                    </p>
                    <ul className="list-disc list-inside mb-6">
                        <li>Processing orders and ensuring timely delivery of products.</li>
                        <li>Responding to your inquiries or customer support needs.</li>
                        <li>Providing relevant updates about our products, promotions, or services.</li>
                        <li>Maintaining records for legal and business purposes.</li>
                    </ul>

                    <h2 className="text-xl font-semibold text-gray-800 mb-3">Data Protection</h2>
                    <p className="mb-6">
                        We implement appropriate technical and organizational measures to protect your personal
                        information against unauthorized access, alteration, disclosure, or destruction.
                    </p>

                    <h2 className="text-xl font-semibold text-gray-800 mb-3">Third-Party Sharing</h2>
                    <p className="mb-6">
                        We do not sell, rent, or share your personal information with third parties except as necessary
                        to:
                    </p>
                    <ul className="list-disc list-inside mb-6">
                        <li>Comply with legal obligations.</li>
                        <li>Provide services such as shipping or payment processing.</li>
                        <li>Improve customer support through trusted partners.</li>
                    </ul>

                    <h2 className="text-xl font-semibold text-gray-800 mb-3">Your Rights</h2>
                    <p className="mb-6">
                        You have the right to:
                    </p>
                    <ul className="list-disc list-inside mb-6">
                        <li>Access the information we hold about you.</li>
                        <li>Request corrections or updates to your information.</li>
                        <li>Request deletion of your data, subject to legal requirements.</li>
                    </ul>

                    <h2 className="text-xl font-semibold text-gray-800 mb-3">Cookies</h2>
                    <p className="mb-6">
                        Our website may use cookies to enhance user experience. By using our site, you agree to the use
                        of cookies as outlined in this Privacy Policy.
                    </p>

                    <h2 className="text-xl font-semibold text-gray-800 mb-3">Contact Us</h2>
                    <p>
                        If you have any questions about this Privacy Policy or how your data is handled, please contact
                        us at:
                    </p>
                    <p className="mt-2">
                        <strong>Email:</strong> 0ceanglobalchems@gmail.com<br/>
                        <strong>Phone:</strong> +234 701 900 0000<br/>
                    </p>

                </section>
            </div>
        </>
    );
};

export default Privacy;
