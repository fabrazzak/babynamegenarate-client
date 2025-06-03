const PrivacyPage = () => {
    return (
        <div className="max-w-4xl mx-auto px-6 py-14 text-gray-900 font-sans leading-relaxed">
            <div className="bg-white shadow-md rounded-xl p-8 border border-gray-200">
                <h1 className="text-5xl font-extrabold text-center text-primary mb-4">Privacy Policy</h1>
                <p className="text-sm text-center mb-10 italic">
                    Effective Date: {new Date().toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                    })}
                </p>

                <section className="mb-10">
                    <p>
                        Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your
                        information when you visit and use our website.
                    </p>
                </section>

                <section className="mb-10">
                    <h2 className="text-2xl font-bold mb-2 text-primary">Information We Collect</h2>
                    <p>
                        We may collect certain information automatically when you visit our site, such as your IP address,
                        browser type, device information, and pages visited. This helps us improve your experience.
                    </p>
                </section>

                <section className="mb-10">
                    <h2 className="text-2xl font-bold mb-2 text-primary">Use of Cookies and Tracking Technologies</h2>
                    <p className="mb-2">Our website uses cookies and similar technologies to:</p>
                    <ul className="list-disc list-inside mb-4 space-y-1 ml-4">
                        <li>Enhance site functionality</li>
                        <li>Analyze site traffic</li>
                        <li>Personalize content and ads</li>
                    </ul>
                    <p>
                        Cookies are small text files stored on your device. You can control or disable cookies through your
                        browser settings, but this may affect some features of our site.
                    </p>
                </section>

                <section className="mb-10">
                    <h2 className="text-2xl font-bold mb-2 text-primary">Google AdSense and Third-Party Advertising</h2>
                    <p>
                        We participate in Google AdSense, which uses cookies to serve ads based on your interests and
                        browsing behavior. Google may collect information about your visits to this and other websites to
                        provide personalized ads. For more details, visit{' '}
                        <a
                            href="https://policies.google.com/privacy"
                            className="text-blue-600 hover:text-blue-800 underline transition"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Google Privacy & Terms
                        </a>
                        .
                    </p>
                </section>

                <section className="mb-10">
                    <h2 className="text-2xl font-bold mb-2 text-primary">Data Protection</h2>
                    <p>
                        We do not sell or share your personal information with third parties except as described in this
                        policy. We take reasonable measures to protect your information.
                    </p>
                </section>

                <section className="mb-10">
                    <h2 className="text-2xl font-bold mb-2 text-primary">Your Rights</h2>
                    <p className="mb-2">
                        You can manage your cookie preferences and opt out of personalized advertising by visiting:
                    </p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                        <li>
                            <a
                                href="https://adssettings.google.com"
                                className="text-blue-600 hover:text-blue-800 underline transition"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Google Ads Settings
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://optout.networkadvertising.org"
                                className="text-blue-600 hover:text-blue-800 underline transition"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Network Advertising Initiative Opt-Out
                            </a>
                        </li>
                    </ul>
                </section>

                <section className="mb-10">
                    <h2 className="text-2xl font-bold mb-2 text-primary">Changes to This Policy</h2>
                    <p>
                        We may update this Privacy Policy occasionally. Any changes will be posted on this page with an updated
                        effective date.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold mb-2 text-primary">Contact Us</h2>
                    <p>
                        If you have any questions about this Privacy Policy, please contact us at:{' '}
                        <a
                            href="mailto:babynameblessing@gmail.com"
                            className="text-blue-600 hover:text-blue-800 underline transition"
                        >
                            babynameblessing@gmail.com
                        </a>
                    </p>
                </section>
            </div>
        </div>
    );
};

export default PrivacyPage;
