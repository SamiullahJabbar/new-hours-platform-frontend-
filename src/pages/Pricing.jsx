import React, { useMemo, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Pricing = () => {
  const pricingPlans = [
    {
      name: "Basic",
      price: 19,
      popular: false,
      features: [
        { label: "Daily WIN tips", available: true },
        { label: "Basic insights", available: true },
        { label: "Quinella tips", available: false },
        { label: "Pick 6 tickets", available: false },
        { label: "Archive access", available: false },
      ],
    },
    {
      name: "Essential",
      price: 59,
      popular: true,
      features: [
        { label: "Daily WIN tips", available: true },
        { label: "Daily QUINELLA tips", available: true },
        { label: "Basic insights", available: true },
        { label: "Pick 6 tickets", available: false },
        { label: "Archive access", available: false },
      ],
    },
    {
      name: "Premium",
      price: 119,
      popular: false,
      features: [
        { label: "Daily WIN tips", available: true },
        { label: "Daily QUINELLA tips", available: true },
        { label: "Daily PICK 6 tickets", available: true },
        { label: "Full archive access", available: true },
        { label: "Performance charts", available: true },
        { label: "Priority updates", available: true },
      ],
    },
  ];

  return (
    <div className="min-h-screen">

      <header className="page-header flex justify-center sticky top-0 md:relative z-[4050]" id="page-header">
        <Header />
      </header>

      {/* Header */}
      <div className="flex items-center bg-gradient-to-br min-h-[60vh] from-green-900 via-black to-yellow-700 text-white">
        <div className="max-w-6xl mx-auto text-center py-20 px-6">
          <h1 className="text-4xl font-bold mb-3">Choose Your Plan</h1>
          <p className="text-gray-300 mb-6">
            Select the package that fits your tipping needs.
          </p>

          <div className="inline-flex bg-white rounded-full p-1 text-sm">
            <button className="px-4 py-2 rounded-full bg-green-600 text-white">
              Monthly
            </button>
            <button className="px-4 py-2 rounded-full text-gray-700">
              Yearly <span className="text-green-600 font-semibold">Save 17%</span>
            </button>
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-6xl px-6 mx-auto grid md:grid-cols-3 gap-8 my-24">
        {pricingPlans.map((plan, index) => (
          <div
            key={index}
            className={`relative rounded-xl bg-white text-gray-900 shadow-lg ${plan.popular ? "border-4 border-green-600 scale-105" : ""
              }`}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-green-600 text-white text-sm px-4 py-1 rounded-full">
                Most popular ✨
              </div>
            )}

            <div className="p-8">
              <h3 className="text-2xl font-semibold text-center mb-4">
                {plan.name}
              </h3>

              <div className="text-center mb-6">
                <span className="text-5xl font-bold">${plan.price}</span>
                <span className="text-gray-500"> /month</span>
              </div>

              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, i) => (
                  <li
                    key={i}
                    className={`flex items-center gap-3 ${feature.available
                      ? "text-gray-800"
                      : "text-gray-400"
                      }`}
                  >
                    <i
                      className={`bi ${feature.available
                        ? "bi-check-circle-fill text-green-600"
                        : "bi-x-circle-fill"
                        }`}
                    ></i>
                    {feature.label}
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3 rounded-lg font-semibold transition ${plan.popular
                  ? "bg-green-600 text-white hover:bg-green-700"
                  : "border border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
                  }`}
              >
                Get started
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* FAQ */}
      <div className="bg-white text-gray-900 py-20">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-10">
            Frequently asked questions
          </h2>

          {[
            "Which plan is best for me?",
            "What payment methods do you support?",
            "Can I cancel anytime?",
            "Do you offer refunds?",
          ].map((q, i) => (
            <div
              key={i}
              className="border-b py-4 flex justify-between items-center cursor-pointer"
            >
              <span className="font-medium">{q}</span>
              <i className="bi bi-chevron-down"></i>
            </div>
          ))}
        </div>
      </div>

      <div className="page-footer">
        <Footer />
      </div>

    </div>
  );
}

export default Pricing;