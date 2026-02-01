import React from 'react';
import Button from '../components/ui/Button';
import { useNavigate } from 'react-router-dom';

const TipsCard = ({ tip }) => {
    const navigate = useNavigate();

    if (!tip) {
        return null;
    }

    const { race_name, race_no, track, tip_type, data, locked, age_group, distance_m, surface } = tip;

    // Parse tip data if it's a string
    const tipData = typeof data === 'string' ? JSON.parse(data) : data;

    return (
        <div className="card bg-white rounded-md shadow-sm">

            <div className="card-header flex justify-between items-center bg-slate-100 p-3 rounded-t-md">
                <div className="c-lt flex items-center">
                    <h4 className='text-xl font-medium'>{race_name || `Race ${race_no}`}</h4>
                    <span className='ml-2 text-sm text-gray-600'>
                        {distance_m ? `${distance_m}m` : ''} {surface ? `- ${surface}` : ''}
                    </span>
                </div>
                <div className="c-rt flex items-center">
                    <span className='text-sm font-medium bg-blue-100 px-2 py-1 rounded'>{track}</span>
                </div>
            </div>

            <div className="card-body flex items-center justify-between py-2 px-2 gap-2">

                {/* WIN Tip Section */}
                <div className="cb-l w-44 min-h-44 bg-gray-100 rounded-md p-2">
                    <span className='bg-blue-600 text-white rounded-md px-3 py-1 text-sm'>
                        {tip_type || 'Win'}
                    </span>

                    {!locked && tipData ? (
                        <div className="tip-details mt-2">
                            <div className="flex items-center my-2 justify-between">
                                <h4 className='text-xl font-bold'>
                                    #{tipData.selection || tipData.horse_number || 'N/A'}
                                </h4>
                                {tipData.confidence && (
                                    <div className="rating space-x-1">
                                        {[...Array(5)].map((_, i) => (
                                            <i
                                                key={i}
                                                className={`bi ${i < tipData.confidence ? 'bi-star-fill text-yellow-500' : 'bi-star text-gray-300'}`}
                                            ></i>
                                        ))}
                                    </div>
                                )}
                            </div>
                            {tipData.horse_name && (
                                <p className="text-sm font-medium text-gray-700">{tipData.horse_name}</p>
                            )}
                            {tipData.odds && (
                                <p className="text-xs text-gray-500 mt-1">Odds: {tipData.odds}</p>
                            )}
                        </div>
                    ) : (
                        <div className="locked-content text-center mt-4">
                            <div className="icon flex justify-center items-center mx-auto w-12 h-12 bg-gray-300 rounded-full">
                                <i className="bi bi-lock text-gray-600"></i>
                            </div>
                            <p className='text-xs text-gray-500 mt-2'>Subscribe to view</p>
                        </div>
                    )}
                </div>

                {/* Additional Info / Locked Section */}
                <div className="cb-r flex-1">
                    {locked ? (
                        <div className="cb-r-info text-center">
                            <span className='inline-block text-sm font-medium bg-yellow-100 text-yellow-800 rounded-md px-3 py-1 mb-2'>
                                Premium Content
                            </span>
                            <div className="icon flex justify-center items-center mx-auto w-14 h-14 bg-gray-300 rounded-full">
                                <i className="bi bi-lock"></i>
                            </div>
                            <p className='font-medium text-gray-500 mb-1 text-sm'>
                                Available in {tip_type} Plan
                            </p>
                            <Button
                                type="button"
                                variant="dark"
                                size="sm"
                                onClick={() => navigate('/price')}
                            >
                                Upgrade Now
                            </Button>
                        </div>
                    ) : (
                        <div className="additional-info">
                            {tipData?.quinella && (
                                <div className="mb-2">
                                    <span className='inline-block text-sm font-medium bg-blue-200 text-black rounded-md px-3 py-1 mb-1'>
                                        Quinella
                                    </span>
                                    <p className="text-sm">#{tipData.quinella.join(', #')}</p>
                                </div>
                            )}
                            {tipData?.notes && (
                                <div className="notes mt-2 p-2 bg-gray-50 rounded text-xs text-gray-600">
                                    <i className="bi bi-info-circle mr-1"></i>
                                    {tipData.notes}
                                </div>
                            )}
                            {age_group && (
                                <p className="text-xs text-gray-500 mt-2">Age Group: {age_group}</p>
                            )}
                        </div>
                    )}
                </div>

            </div>

        </div>
    )
}

export default TipsCard;