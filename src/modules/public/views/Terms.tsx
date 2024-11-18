/* eslint-disable no-template-curly-in-string */
import {useNavigate} from "react-router-dom";
import {addMetaData} from "core/helpers/seoHelpers";
import {Link} from "react-router-dom";

const Terms = () => {
    const navigate = useNavigate();

    return (
        <>
            {addMetaData({
                title: " Seachems Multi-trade Ventures - Terms of Use",
                description: "Our terms of use policy",
            })}

            <div className="m-[0px] mx-auto mb-[34px] h-full w-11/12 overflow-hidden pt-[20px] md:w-4/5">
                <section className="mb-[28px]">
                    <header className="flex flex-wrap items-center gap-3 text-[12px] text-black-shade">
                        <Link to="/" className="hover:underline">
                            Home
                        </Link>
                        <span>/</span>
                        <Link to="/terms" className="text-black hover:underline">
                            Terms of Use
                        </Link>
                    </header>
                </section>

                <section className="mb-[28px]">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">Terms of Use</h1>
                    <p className="mb-6">
                        Welcome to <strong>Seachems Multi-trade Ventures</strong>. By accessing or using our website,
                        you agree to be bound by the following terms and conditions. If you do not agree with these
                        terms, please do not use our site.
                    </p>

                    <h2 className="text-xl font-semibold text-gray-800 mb-3">Use of Our Website</h2>
                    <ul className="list-disc list-inside mb-6">
                        <li>Our website and its content are provided solely for personal and business purposes.</li>
                        <li>You agree not to misuse the website or interfere with its operation.</li>
                        <li>Unauthorized use of our website may result in legal action.</li>
                    </ul>

                    <h2 className="text-xl font-semibold text-gray-800 mb-3">Intellectual Property</h2>
                    <p className="mb-6">
                        All content on this website, including text, images, logos, and trademarks, is the property of
                        <strong> Seachems Multi-trade Ventures </strong> or its licensors and is protected by
                        applicable intellectual property laws. You may not reproduce, distribute, or modify any
                        content without prior written permission.
                    </p>

                    <h2 className="text-xl font-semibold text-gray-800 mb-3">User Responsibilities</h2>
                    <ul className="list-disc list-inside mb-6">
                        <li>You are responsible for ensuring that the information you provide is accurate and
                            up-to-date.
                        </li>
                        <li>You agree not to use the site for unlawful activities, including the transmission of harmful
                            or malicious content.
                        </li>
                    </ul>

                    <h2 className="text-xl font-semibold text-gray-800 mb-3">Disclaimer of Warranties</h2>
                    <p className="mb-6">
                        Our website is provided "as is" without any express or implied warranties, including, but not
                        limited to, implied warranties of merchantability, fitness for a particular purpose, or
                        non-infringement.
                    </p>

                    <h2 className="text-xl font-semibold text-gray-800 mb-3">Limitation of Liability</h2>
                    <p className="mb-6">
                        To the fullest extent permitted by law, <strong>Seachems Multi-trade Ventures-</strong> shall
                        not be liable for any direct, indirect, incidental, consequential, or punitive damages arising
                        out of your use of our website or inability to access it.
                    </p>

                    <h2 className="text-xl font-semibold text-gray-800 mb-3">Changes to Terms</h2>
                    <p className="mb-6">
                        We reserve the right to modify these terms at any time. Changes will be effective immediately
                        upon posting. It is your responsibility to review these terms regularly.
                    </p>

                    <h2 className="text-xl font-semibold text-gray-800 mb-3">Governing Law</h2>
                    <p className="mb-6">
                        These terms are governed by the laws of Nigeria. Any disputes arising from these terms or your
                        use of our website shall be resolved exclusively in the courts of Nigeria.
                    </p>

                    <h2 className="text-xl font-semibold text-gray-800 mb-3">Contact Us</h2>
                    <p>
                        If you have any questions about these Terms of Use, please contact us at:
                    </p>
                    <p className="mt-2">
                        <strong>Email:</strong> oceanglobalchems@gmail.com<br/>
                        <strong>Phone:</strong> +234 701 900 0000<br/>
                    </p>
                </section>
            </div>
        </>
    );
};

export default Terms;
