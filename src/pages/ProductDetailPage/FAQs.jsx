import React, { useState } from "react";

const FaqItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 py-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between text-left focus:outline-none"
      >
        <span className="text-base md:text-lg font-medium text-black">
          {question}
        </span>
        <span className={`transform transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-40 mt-3" : "max-h-0"
        }`}
      >
        <p className="text-gray-500 text-sm md:text-base leading-relaxed">
          {answer}
        </p>
      </div>
    </div>
  );
};

export default function FaqsPage() {
  const faqData = [
    {
      question: "What is the delivery time for my order?",
      answer: "Standard delivery typically takes 3-5 business days. Express shipping options are also available at checkout.",
    },
    {
      question: "How can I track my package?",
      answer: "Once your order is shipped, you will receive an email with a tracking link to monitor your package in real-time.",
    },
    {
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy for all unworn and unwashed items with original tags attached.",
    },
    {
      question: "Do you offer international shipping?",
      answer: "Yes, we ship to over 50 countries worldwide. Shipping costs and delivery times vary by location.",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 md:py-20">
      <h2 className="text-3xl md:text-5xl font-black text-center mb-10 uppercase italic">
        Frequently Asked Questions
      </h2>
      
      <div className="bg-white rounded-2xl border p-6 md:p-10 shadow-sm">
        {faqData.map((item, index) => (
          <FaqItem key={index} question={item.question} answer={item.answer} />
        ))}
      </div>

      <div className="mt-12 text-center">
        <p className="text-gray-500 mb-4">Still have questions?</p>
        <button className="bg-black text-white px-8 py-3 rounded-full font-medium hover:bg-gray-800 transition">
          Customer Support
        </button>
      </div>
    </div>
  );
}