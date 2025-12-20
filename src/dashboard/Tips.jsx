import React from 'react';
import TipsCard from '../components/TipsCard';

const Tips = () => {
    return (
        <section className="tips-component w-full" id="tips-component">
            <div className="container md:px-4">

                <div className="tips-title mb-3">
                    <h2 className="text-3xl font-bold">Today Tip's</h2>
                </div>

                <div className="tips-header flex flex-col md:flex-row items-center md:justify-between my-3 gap-y-3 md:gap-y-0">

                    <div className="left-h flex items-center md:justify-between md:w-2/5 gap-x-3 md:gap-x-0">
                        <i className="bi text-3xl cursor-pointer text-gray-400 bi-chevron-left"></i>
                        <p className='text-lg font-medium'>Wed , Dec 3, 2025</p>
                        <i className="bi text-3xl cursor-pointer text-gray-400 bi-chevron-right"></i>
                    </div>

                    <div className="right-h flex md:justify-between md:w-2/5">
                        <div className="button-group flex gap-1 bg-gray-300 rounded-md px-3 py-2">
                            <button className='px-4 py-2 bg-white rounded-md transition' type="button">Veliefend</button>
                            <button className='px-4 py-2 border border-transparent hover:border-white hover:bg-opacity-15 rounded-md transition' type="button">Adana</button>
                            <button className='px-4 py-2 border border-transparent hover:border-white hover:bg-opacity-15 rounded-md transition' type="button">Izmir</button>
                            <button className='px-4 py-2 border border-transparent hover:border-white hover:bg-opacity-15 rounded-md transition' type="button">Bursa</button>
                        </div>
                    </div>

                </div>

                <div className="tips-body my-3">
                    <div className="container md:w-full mx-auto md:mx-0">
                        <div className="flex flex-wrap justify-around gap-3">
                            <div className="tips-item w-full md:w-[46%]">
                                <TipsCard />
                            </div>
                            <div className="tips-item w-full md:w-[46%]">
                                <TipsCard />
                            </div>
                            <div className="tips-item w-full md:w-[46%]">
                                <TipsCard />
                            </div>
                            <div className="tips-item w-full md:w-[46%]">
                                <TipsCard />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    )
}

export default Tips;