import React from 'react';

const Archive = () => {
    return (
        <div className="archive" id="archive">
            <div className="mx-auto max-w-7xl space-y-8 px-4">
                <h1 className="text-4xl font-bold">Archive</h1>

                <div className="grid grid-cols-12 gap-4">

                    <select className="col-span-3 px-4 py-3 bg-white rounded-md border-2 border-white focus:border-blue-400">
                        <option className='px-2 py-1' value="all-tips">All Tips</option>
                        <option className='px-2 py-1' value="premium">Premium Tips</option>
                        <option className='px-2 py-1' value="free">Free Tips</option>
                    </select>

                    <select className="col-span-3 px-4 py-3 bg-white rounded-md border-2 border-white focus:border-blue-400">
                        <option className='px-2 py-1' value="all-tracks">All Tracks</option>
                        <option className='px-2 py-1' value="domestic">Domestic</option>
                        <option className='px-2 py-1' value="international">International</option>
                    </select>

                </div>

                <div className="archive-history my-3">
                    <div className="history flex justify-between items-center rounded-lg bg-white p-3">

                        <div className="history-left flex items-center w-full">
                            <div className="icon flex justify-center items-center w-12 h-12 rounded-md bg-gray-200">
                                <i className="bi text-xl bi-calendar"></i>
                            </div>
                            <div className="history-day ml-2">
                                <h4 className='text-lg font-medium'>Sun , Jan Dec,2025</h4>
                                <span className='text-gray-400 font-medium'>Valiefendi</span>
                            </div>
                        </div>

                        <div className="history-right flex items-center justify-end w-full">

                            <div>
                                <h4 className='text-lg font-medium'>4 races , 3 Win</h4>
                                <span className='text-gray-400 font-medium'>75% hit Rate</span>
                            </div>

                            <i className="bi ml-4 text-2xl hidden md:inline-block text-gray-500 bi-chevron-right"></i>

                        </div>

                    </div>
                </div>

            </div>
        </div>
    )
}

export default Archive;