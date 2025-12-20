import React from 'react';

const Feature = (props) => {
    const { feature, className = '' } = props;
    return (
        <div className={`feature-item md:w-[33%] md:mx-auto border px-2 rounded-md text-center py-3 ${className}`} style={{ backgroundColor: feature.bgColor , borderColor: feature.bgColor }}>
            <div className="info flex justify-center items-center mb-2">
                <i className={`bi text-yellow-400 ${feature.icon}`}></i>
                <p className='text-lg font-medium text-white ml-2'>{feature.number}</p>
            </div>
            <h4 className='text-xl text-white font-semibold'>{feature.headline}</h4>
        </div>
    )
}

export default Feature;
