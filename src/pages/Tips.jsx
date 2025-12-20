import React from 'react';
import Sidebar from '../components/Sidebar';
import TipsComponent from '../dashboard/Tips';

const Tips = () => {
    return (
        <section className="dashboard bg-gray-200" id="dashboard">
            <div className="w-full">
                <div className='flex flex-col md:flex-row w-full'>
                    <div className="sidebar hidden md:block fixed top-0 left-0 z-[3078] w-full md:w-[18%] h-screen overflow-y-auto bg-white py-2 px-3">
                        <Sidebar />
                    </div>
                    <div className="main-content w-full md:w-[82%] relative md:left-[18%] min-h-screen py-2 px-3">
                        <TipsComponent />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Tips;