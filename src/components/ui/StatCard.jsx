import React from 'react';

const StatCard = ({ bg = 'bg-green-500', iconClass = 'bi-graph-up', value, label }) => {
  return (
    <div className={`rounded-[20px] ${bg} text-white px-4 py-4 shadow-md w-full`}>
      <div className="flex items-center justify-between mb-3">
        <span className="rounded-full bg-white/20 p-3">
          <i className={`bi ${iconClass}`}></i>
        </span>
        <span className="text-3xl font-bold">{value}</span>
      </div>
      <div>
        <p className="text-white font-semibold">{label}</p>
      </div>
    </div>
  );
};

export default StatCard;
