import React from "react";

const ContactSupport = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-[#002444] text-[#002444] dark:text-white py-12 px-6 md:px-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-10 text-[#0372aa] dark:text-[#0372aa]">
          Contact Support
        </h1>

        <p className="text-center text-lg text-[#024b74] dark:text-[#ffffff] mb-8">
          We're here to help you! Reach out to us using any of the methods below.
        </p>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">📞 Phone</h2>
            <p className="text-[#024b74] dark:text-[#ffffff]">
              Call us 24/7 at <span className="font-medium">+1 (555) 123-4567</span>
            </p>

            <h2 className="text-xl font-semibold">📧 Email</h2>
            <p className="text-[#024b74] dark:text-[#ffffff]">
              Send your queries to <span className="font-medium">support@HJvoyages.com</span>
            </p>

            <h2 className="text-xl font-semibold">📍 Office Address</h2>
            <p className="text-[#024b74] dark:text-[#ffffff]">
              Shop 4, AI Masraf Bidg, 51 Baniyas Rd, AI Rigga, Deira, Dubai, UAE 46733.
            </p>
          </div>

          <form className="bg-[#024b74] dark:bg-[#002444] p-6 rounded-xl shadow-md space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-white">Your Name</label>
              <input
                type="text"
                className="w-full px-4 py-2 rounded-md border border-[#0372aa] bg-white dark:bg-[#002444] text-[#002444] dark:text-white"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-white">Email Address</label>
              <input
                type="email"
                className="w-full px-4 py-2 rounded-md border border-[#0372aa] bg-white dark:bg-[#002444] text-[#002444] dark:text-white"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-white">Message</label>
              <textarea
                rows={4}
                className="w-full px-4 py-2 rounded-md border border-[#0372aa] bg-white dark:bg-[#002444] text-[#002444] dark:text-white"
                placeholder="Type your message here..."
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-[#0372aa] hover:bg-[#024b74] text-white py-2 px-4 rounded-md transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactSupport;
