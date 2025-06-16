import React from "react";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";

const sections = [
  {
    title: "General Terms and Conditions",
    content:
      "By using our services, you agree to comply with all our policies, including the acceptable use policy and local laws. Any misuse can lead to account suspension."
  },
  {
    title: "Offers and Discounts",
    content:
      "All offers are subject to availability. Discounts cannot be combined unless explicitly stated."
  },
  {
    title: "Refunds Policy",
    content:
      "Refunds will be processed to the original payment method within 5–7 working days after cancellation approval."
  },
  {
    title: "Cancellation Policy",
    content:
      "Cancellations are allowed before the departure time. Charges may apply based on the cancellation window."
  },
  {
    title: "Failure Transactions",
    content:
      "In case of payment failure, please wait 30 minutes. If the issue persists, contact support with transaction details."
  },
  {
    title: "User Responsibilities",
    content:
      "Users must ensure all provided information is accurate. Misuse or fraudulent activity is strictly prohibited."
  },
  {
    title: "Our Responsibilities",
    content:
      "We aim to provide reliable service but are not liable for external provider failures such as transport operators."
  }
];

const Terms: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#ffffff] dark:bg-[#002444] py-12 px-4 sm:px-10">
      <div className="max-w-4xl mx-auto bg-[#f8f9fa] dark:bg-[#024b74] rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-[#002444] dark:text-white mb-6">
          Terms and Conditions
        </h1>
        <div className="space-y-4">
          {sections.map((section, idx) => (
            <Disclosure key={idx}>
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex w-full justify-between rounded-lg bg-[#e0f0f7] dark:bg-[#0372aa] px-4 py-3 text-left text-sm font-semibold text-[#002444] dark:text-white hover:bg-[#d1ecf9] dark:hover:bg-[#025f91] focus:outline-none focus-visible:ring focus-visible:ring-blue-500/75">
                    <span>{section.title}</span>
                    <ChevronUpIcon
                      className={`${
                        open ? "rotate-180 transform" : ""
                      } h-5 w-5 text-[#024b74] dark:text-white`}
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel className="px-4 pt-4 pb-2 text-[#024b74] dark:text-white">
                    {section.content}
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          ))}
        </div>
        <p className="text-sm text-[#0372aa] dark:text-gray-300 mt-6">
          Last updated: June 10, 2025
        </p>
      </div>
    </div>
  );
};

export default Terms;

