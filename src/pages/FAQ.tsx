import React from "react";

const FAQPage = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-[#002444] text-[#024b74] dark:text-white py-12 px-6 md:px-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-10 text-[#0372aa] dark:text-[#0372aa]">
          Frequently Asked Questions (FAQ)
        </h1>

        <div className="space-y-8">
          <div>
            <h2 className="text-xl font-semibold mb-2">1. How do I book a flight?</h2>
            <p className="text-[#024b74] dark:text-[#ffffff]">
              Simply visit our Flights page, enter your departure and arrival destinations,
              choose your dates, and click "Search." Then, follow the on-screen instructions to complete your booking.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">2. Can I cancel or modify my booking?</h2>
            <p className="text-[#024b74] dark:text-[#ffffff]">
              Yes, go to the "Manage Bookings" section. There, you can view, cancel, or make changes to your existing bookings,
              depending on the airline's policy.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">3. How do I reset my password?</h2>
            <p className="text-[#024b74] dark:text-[#ffffff]">
              Click on "Forgot Password" on the login page. Enter your registered email to receive a reset link.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">4. Do you offer customer support?</h2>
            <p className="text-[#024b74] dark:text-[#ffffff]">
              Absolutely. Visit the Support page to contact us via chat, email, or phone. We’re here 24/7 to assist you.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">5. Where can I find your terms and privacy policy?</h2>
            <p className="text-[#024b74] dark:text-[#ffffff]">
              You can find our{" "}
              <a href="/terms-&-conditions" className="text-[#0372aa] underline">
                Terms & Conditions
              </a>{" "}
              and{" "}
              <a href="/privacy-policy" className="text-[#0372aa] underline">
                Privacy Policy
              </a>{" "}
              at the bottom of the page or in the Support section.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
