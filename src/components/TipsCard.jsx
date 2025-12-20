import React from 'react';
import Button from '../components/ui/Button';

const TipsCard = () => {
    return (
        <div className="card bg-white rounded-md">

            <div className="card-header flex justify-between items-center bg-slate-100 p-3 rounded-t-md">
                <div className="c-lt flex items-center">
                    <h4 className='text-xl font-medium'>Race 1</h4>
                    <span className='ml-2'>1200m - Turf</span>
                </div>
                <div className="c-rt flex items-center">
                    <i className="bi bi-clock"></i>
                    <span className='ml-1'>14:30</span>
                </div>
            </div>

            <div className="card-body flex items-center justify-between py-2 px-2 gap-2">

                <div className="cb-l w-44 min-h-44 bg-gray-100 rounded-md p-2">
                    <span className='bg-blue-600 text-white rounded-md px-3 py-1'>Win</span>
                    <div className="flex items-center my-2 justify-between">
                        <h4 className='text-xl font-bold'>#5</h4>
                        <div className="rating space-x-1">
                            <i className="bi text-yellow-500 bi-star"></i>
                            <i className="bi text-yellow-500 bi-star"></i>
                            <i className="bi text-yellow-500 bi-star"></i>
                            <i className="bi text-yellow-500 bi-star"></i>
                            <i className="bi text-yellow-500 bi-star"></i>
                        </div>
                    </div>
                </div>

                <div className="cb-r">
                    <span className='inline-block text-sm font-medium bg-blue-200 text-black rounded-md px-3 py-1 mb-2'>Quinella</span>
                    <div className="cb-r-info text-center">
                        <div className="icon flex justify-center items-center mx-auto w-14 h-14 bg-gray-300 rounded-full">
                        <i className="bi bi-lock"></i>
                    </div>
                    <p className='font-medium text-gray-500 mb-1'>Available in Quinella Plan</p>
                    <Button type="button" variant="dark" size="sm">Upgrade Now</Button>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default TipsCard;