const TermsPage = () => {
    return (
        <div className="max-w-4xl mx-auto px-6 py-14 text-gray-900 font-sans leading-relaxed">
            <div className="bg-white shadow-md rounded-xl p-8 border border-gray-200">
                <h1 className="text-4xl font-bold text-center mb-6">Terms of Service</h1>
                <p className="text-sm text-center mb-10 italic">
                    Effective Date: {new Date().toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                    })}
                </p>

                <p className="mb-4">
                    Welcome to <strong>babynameblessing.com</strong>! By accessing and using our website, you agree to the
                    following terms and conditions. Please read them carefully.
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-2">Use of Our Website</h2>
                <ul className="list-disc list-inside mb-4 space-y-1">
                    <li>You agree to use the website for lawful purposes only.</li>
                    <li>You will not engage in any activity that may harm the website or interfere with other users' experience.</li>
                    <li>You agree not to attempt unauthorized access to our systems.</li>
                </ul>

                <h2 className="text-2xl font-semibold mt-8 mb-2">Content</h2>
                <ul className="list-disc list-inside mb-4 space-y-1">
                    <li>All content on this website is for informational and personal use only.</li>
                    <li>We do not guarantee the accuracy or completeness of any information provided.</li>
                    <li>You may not copy, reproduce, or distribute content from this site without permission.</li>
                </ul>

                <h2 className="text-2xl font-semibold mt-8 mb-2">Intellectual Property</h2>
                <ul className="list-disc list-inside mb-4 space-y-1">
                    <li>All trademarks, logos, and content are the property of <strong>babynameblessing.com</strong> or their respective owners.</li>
                    <li>You agree to respect all intellectual property rights associated with this website.</li>
                </ul>

                <h2 className="text-2xl font-semibold mt-8 mb-2">Third-Party Services</h2>
                <p className="mb-4">
                    Our website uses third-party services, including Google AdSense, which may collect data and show
                    advertisements. By using our site, you consent to the use of cookies and data collection as described in our{' '}
                    <a
                        href="/privacy-policy"
                        className="text-blue-600 underline"
                    >
                        Privacy Policy
                    </a>.
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-2">Limitation of Liability</h2>
                <ul className="list-disc list-inside mb-4 space-y-1">
                    <li>We are not responsible for any damages or losses resulting from your use of this website.</li>
                    <li>The website and its content are provided "as is" without warranties of any kind.</li>
                </ul>

                <h2 className="text-2xl font-semibold mt-8 mb-2">Changes to Terms</h2>
                <p className="mb-4">
                    We may update these Terms of Service at any time. Changes will be posted on this page with an updated
                    effective date. Continued use of the website after changes constitutes acceptance of the new terms.
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-2">Contact Information</h2>
                <p>
                    If you have any questions about these Terms of Service, please contact us at:{' '}
                    <a
                        href="mailto:babynameblessing@gmail.com"
                        className="text-blue-600 underline"
                    >
                        babynameblessing@gmail.com
                    </a>
                </p>
            </div>
        </div>
    );
};

export default TermsPage;
