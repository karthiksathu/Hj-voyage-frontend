import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen py-20 px-4 max-w-4xl mx-auto text-[#002444] dark:text-white">
      <h1 className="text-4xl font-bold mb-6 text-center text-[#024b74] dark:text-white">
        Privacy Policy
      </h1>
      <p className="text-lg mb-10 text-center text-gray-600 dark:text-gray-300">
        Your privacy is important to us. This policy outlines how we handle your personal data.
      </p>

      <div className="space-y-6 leading-relaxed">
        <section>
          <h2 className="text-2xl font-semibold mb-2 text-[#0372aa] dark:text-[#ffffff]">
            1. Information We Collect
          </h2>
          <p>
            We may collect personal information such as your name, email address, contact details, and travel preferences
            when you use our services or create an account.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2 text-[#0372aa] dark:text-[#ffffff]">
            2. How We Use Your Information
          </h2>
          <p>
            Your information is used to provide, personalize, and improve our services. We may also use it to communicate
            important updates, offers, and respond to support requests.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2 text-[#0372aa] dark:text-[#ffffff]">
            3. Sharing Your Information
          </h2>
          <p>
            We never sell your data. We may share it with trusted third-party services necessary to operate our platform,
            such as payment processors or booking engines.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2 text-[#0372aa] dark:text-[#ffffff]">
            4. Data Security
          </h2>
          <p>
            We implement strong security measures to protect your data from unauthorized access, misuse, or loss.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2 text-[#0372aa] dark:text-[#ffffff]">
            5. Cookies
          </h2>
          <p>
            We use cookies to enhance your browsing experience and analyze website traffic. You can manage your cookie
            preferences in your browser settings.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2 text-[#0372aa] dark:text-[#ffffff]">
            6. Your Rights
          </h2>
          <p>
            You have the right to access, update, or delete your personal data. Contact us at{" "}
            <a href="mailto:support@hjvoyages.com" className="text-[#0372aa] underline">
              support@hjvoyages.com
            </a>{" "}
            for any privacy-related requests.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2 text-[#0372aa] dark:text-[#ffffff]">
            7. Changes to This Policy
          </h2>
          <p>
            We may update this privacy policy periodically. Any changes will be reflected on this page with the updated
            date.
          </p>
        </section>

        <p className="text-sm text-gray-500 mt-10">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
