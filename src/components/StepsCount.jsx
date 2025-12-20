import React from 'react';

const StepsCount = ({ step }) => {
    return (
        <div className='w-full'>
            <div className="icon my-2">
                <img src={step.icon} width={50} height={50} alt={step.heading} className="" />
            </div>
            <div className="info my-2">
                <h4 className='text-2xl font-semibold mb-1'>{step.heading}</h4>
                <p className='text-[17px] font-medium text-gray-500'>{step.description}</p>
            </div>
            <div className="badge absolute -right-3 md:-left-5 -top-3 w-10 h-10 bg-yellow-500 bg-gradient-to-tr flex justify-center items-center rounded-full">
                <span className='text-xl text-white font-bold'>{step.badge}</span>
            </div>
        </div>
    )
}

export default StepsCount;