import React from 'react';
import heroBg from '../assets/hero-bg.jpg'
import StatCard from './ui/StatCard';
import Button from './ui/Button';
import { Link } from 'react-router-dom';
import Badge from './ui/Badge';

const Hero = () => {
    const stats = [
        { bg: 'bg-emerald-500', icon: 'bi-graph-up', value: '78%', label: 'Win Rate' },
        { bg: 'bg-violet-600', icon: 'bi-people', value: '10K+', label: 'Active Users' },
        { bg: 'bg-indigo-600', icon: 'bi-coin', value: '500+', label: 'Daily Tips' },
    ]
    return (
        <>
            <section className='hero flex items-center min-h-screen py-3 bg-red-100 bg-no-repeat bg-center bg-cover px-4' style={{ backgroundImage: `url(${heroBg})` }} id='hero'>
                <div className="container mx-auto">

                    <div className="hero-section text-center md:w-2/4 md:mx-auto mt-5">
                        <Badge>Trusted by 10,000+ Bettors</Badge>
                        <div className="hero-info text-center my-2">
                            <h1 className='text-5xl font-bold text-white leading-normal'>Accurate Daily</h1>
                            <span className='block text-5xl bg-yellow-400 font-bold py-2 rounded-md my-2'>Horse Racing Tips</span>
                            <p className="text-lg text-white font-normal">Win, Quinella, Pick 6 — Fast, Reliable, Data-Driven predictions to boost your betting strategy</p>
                        </div>
                        <div className="hero-button">
                            <div className="flex justify-center gap-1">
                                <Link to="/pricing"><Button variant="yellow" size="md">View Plans</Button></Link>
                                <Link to="/tips"><Button variant="ghost" size="md">See Performance</Button></Link>
                            </div>
                        </div>
                    </div>

                    <div className="hero-feature md:w-3/5 mx-auto my-2">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                            {stats.map((s, i) => (
                                <StatCard key={i} bg={s.bg} iconClass={s.icon} value={s.value} label={s.label} />
                            ))}
                        </div>
                    </div>

                </div>
            </section>
        </>
    )
}

export default Hero;
