import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { subscriptionAPI } from '../api/client';

const Pricing = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [plans, setPlans] = useState([]);
  const [error, setError] = useState(null);
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [checkoutLoading, setCheckoutLoading] = useState(null);

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await subscriptionAPI.getPlans();
      // Backend returns array of plans directly
      setPlans(response || []);
    } catch (err) {
      console.error('Error fetching plans:', err);
      setError(err.response?.data?.message || 'Failed to load pricing plans');
    } finally {
      setLoading(false);
    }
  };

  const handleCheckout = async (planId) => {
    try {
      setCheckoutLoading(planId);
      const response = await subscriptionAPI.createSubscription(planId);

      // Show success message and redirect to dashboard
      if (response) {
        alert('Subscription created successfully!');
        navigate('/tips');
      }
    } catch (err) {
      console.error('Checkout error:', err);
      const errorMessage = err.response?.data?.message || err.response?.data?.error || 'Failed to create subscription';
      setError(errorMessage);
      setCheckoutLoading(null);
    }
  };

  const toggleBillingCycle = (cycle) => {
    setBillingCycle(cycle);
  };

  const getPrice = (plan) => {
    // Backend returns price as string, convert to number for display
    return parseFloat(plan.price || 0).toFixed(2);
  };

  const getPlanFeatures = (product) => {
    const featureMap = {
      'WIN': [
        { label: "Daily WIN tips", available: true },
        { label: "Basic insights", available: true },
        { label: "Quinella tips", available: false },
        { label: "Pick 6 tickets", available: false },
        { label: "Archive access", available: false },
      ],
      'QUINELLA': [
        { label: "Daily WIN tips", available: true },
        { label: "Daily QUINELLA tips", available: true },
        { label: "Basic insights", available: true },
        { label: "Pick 6 tickets", available: false },
        { label: "Archive access", available: false },
      ],
      'PICK6': [
        { label: "Daily WIN tips", available: true },
        { label: "Daily QUINELLA tips", available: true },
        { label: "Daily PICK 6 tickets", available: true },
        { label: "Full archive access", available: true },
        { label: "Performance charts", available: true },
        { label: "Priority updates", available: true },
      ],
    };
    return featureMap[product] || [];
  };

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
            <button
              onClick={() => toggleBillingCycle('monthly')}
              className={`px-4 py-2 rounded-full ${billingCycle === 'monthly' ? 'bg-green-600 text-white' : 'text-gray-700'}`}
            >
              Monthly
            </button>
            <button
              onClick={() => toggleBillingCycle('yearly')}
              className={`px-4 py-2 rounded-full ${billingCycle === 'yearly' ? 'bg-green-600 text-white' : 'text-gray-700'}`}
            >
              Yearly <span className="text-green-600 font-semibold">Save 17%</span>
            </button>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="max-w-6xl mx-auto px-6 mt-8">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        </div>
      )}

      {/* Loading State */}
      {loading ? (
        <div className="max-w-6xl mx-auto px-6 my-24 text-center">
          <i className="bi bi-hourglass-split text-4xl text-gray-400 animate-spin"></i>
          <p className="mt-4 text-gray-600">Loading pricing plans...</p>
        </div>
      ) : (
        /* Pricing Cards */
        <div className="max-w-6xl px-6 mx-auto grid md:grid-cols-3 gap-8 my-24">
          {plans.length > 0 ? (
            plans.map((plan, index) => {
              const isPopular = plan.name === 'PREMIUM';
              const price = getPrice(plan);

              return (
                <div
                  key={plan.id || index}
                  className={`relative rounded-xl bg-white text-gray-900 shadow-lg ${isPopular ? "border-4 border-green-600 scale-105" : ""}`}
                >
                  {isPopular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-green-600 text-white text-sm px-4 py-1 rounded-full">
                      Most popular ✨
                    </div>
                  )}

                  <div className="p-8">
                    <h3 className="text-2xl font-semibold text-center mb-4">
                      {plan.name}
                    </h3>

                    <div className="text-center mb-6">
                      <span className="text-5xl font-bold">${price}</span>
                      <span className="text-gray-500">/{plan.duration_days} days</span>
                    </div>

                    {plan.description && (
                      <p className="text-sm text-gray-600 text-center mb-6">
                        {plan.description}
                      </p>
                    )}

                    <button
                      onClick={() => handleCheckout(plan.id)}
                      disabled={checkoutLoading === plan.id}
                      className={`w-full py-3 rounded-lg font-semibold transition ${isPopular
                        ? "bg-green-600 text-white hover:bg-green-700"
                        : "border border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
                        } disabled:opacity-50`}
                    >
                      {checkoutLoading === plan.id ? 'Processing...' : 'Get started'}
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-3 text-center text-gray-500">
              No pricing plans available at the moment.
            </div>
          )}
        </div>
      )}

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