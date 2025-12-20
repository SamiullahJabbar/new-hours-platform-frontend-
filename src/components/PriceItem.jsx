import React from 'react';
import Button from './ui/Button';

const PriceItem = ({ plan }) => {
  return (
    <div className="w-full md:w-[32%] bg-white rounded-md shadow-md overflow-hidden border">
      <div className="flex items-center justify-center w-full h-40 bg-no-repeat bg-center bg-cover overflow-hidden" style={{ backgroundImage: `url(${plan.image})` }}>
        <img src={plan.icon} width={60} height={60} alt={plan.title} className="block object-cover" />
      </div>
      <div className="px-5 py-4">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-2xl font-semibold">{plan.title}</h4>
          <span className="text-xl font-bold text-yellow-500">{plan.price}</span>
        </div>
        <p className="text-gray-600 text-[15px] mb-3">{plan.description}</p>
        <ul className="space-y-2 mb-4">
          {plan.features.map((f, i) => (
            <li className="flex items-center text-[15px]" key={i}>
              <i className="bi bi-check2-circle text-green-600 mr-2"></i>
              <span className="text-gray-700">{f}</span>
            </li>
          ))}
        </ul>
        <Button variant="yellow" size="md" className="w-full">Choose Plan</Button>
      </div>
    </div>
  )
}

export default PriceItem;
