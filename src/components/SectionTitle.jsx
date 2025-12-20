import React from 'react'

const SectionTitle = (props) => {
    const { heading, desc } = props;
    return (
        <div className='text-center my-2 md:my-3 py-2'>
            <h2 className='text-4xl font-bold mb-2'>{heading}</h2>
            <p className='text-lg text-gray-500 font-medium'>{desc}</p>
        </div>
    )
}

export default SectionTitle