import React from 'react';
import Hero from '../components/Hero'
import SectionTitle from '../components/SectionTitle';
import StepsCount from '../components/StepsCount';
import Card from '../assets/icon/card.svg';
import Bell from '../assets/icon/bell.svg';
import Curved from '../assets/icon/curved.svg';
import Graph from '../assets/icon/graph.svg';
import PriceItem from '../components/PriceItem';
import WinPlan from '../assets/win-plan.jpg';
import QuinellaPlan from '../assets/quinella-plan.jpg';
import ProPlan from '../assets/pro-plan.jpg';
import winIcon from '../assets/price/star.svg';
import quinellaIcon from '../assets/price/king.svg';
import proIcon from '../assets/price/award.svg';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Home = () => {

    const steps = [
        {
            icon: Card,
            badge: '01',
            heading: 'Choose a Plan',
            description: 'Select a subscription plan that suits your needs and budget.',
        },
        {
            icon: Bell,
            badge: '02',
            heading: 'Access Daily Tips',
            description: 'Get Expert Predictions and Tips delivered to your inbox daily.',
        },
        {
            icon: Graph,
            badge: '03',
            heading: 'Track Performance',
            description: 'Monitor your Success with detailed performance analytics and reports.',
        },
        {
            icon: Curved,
            badge: '04',
            heading: 'Improve Strategy',
            description: 'Refine and Approach your betting strategy based on performance insights.',
        },
    ]

    const plans = [
        {
            title: 'Win',
            image: WinPlan,
            icon: winIcon,
            price: '$9.99',
            description: 'High-confidence picks for single winners.',
            features: [
                'Daily win tips',
                'Beginner-friendly strategy',
                'Performance analytics',
            ],
        },
        {
            title: 'Quinella',
            image: QuinellaPlan,
            icon: quinellaIcon,
            price: '$19.99',
            description: 'Pair-based predictions for two top finishers.',
            features: [
                'Daily quinella tips',
                'Optimized risk-reward',
                'Historical trends',
            ],
        },
        {
            title: 'Pro',
            image: ProPlan,
            icon: proIcon,
            price: '$29.99',
            description: 'Advanced picks and multi-race strategies.',
            features: [
                'All tip types unlocked',
                'Pro analytics suite',
                'Priority updates',
            ],
        },
    ]

    return (

        <div className='home-page' id='home-page'>

            <header className="page-header flex justify-center sticky top-0 md:relative z-[4050]" id="page-header">
                <Header />
            </header>

            <Hero />

            <section className="how-it-work my-2 md:my-3 py-3">
                <SectionTitle heading="How It Works" desc="Start winning in four simple steps" />
                <div className="container md:w-4/5 mx-auto px-3">
                    <div className="how-steps flex md:justify-center gap-x-5 gap-y-4 flex-wrap">
                        {
                            steps.map((step, index) => (
                                <div className="steps-count w-full md:w-2/5 bg-white px-5 py-3 shadow-md rounded-md relative z-[1]" key={index++}>
                                    <StepsCount step={step} />
                                </div>
                            ))
                        }
                    </div>
                </div>
            </section>

            <section className="price-plan my-2 md:my-3 py-3" id="price-plan">
                <SectionTitle heading="Choose Your Winning Plan" desc="Select the Strategy that Matches Your Style" />
                <div className="container md:w-4/5 mx-auto px-3">
                    <div className="flex gap-4 flex-wrap md:flex-nowrap md:justify-center">
                        {
                            plans.map((plan, idx) => (
                                <PriceItem plan={plan} key={idx} />
                            ))
                        }
                    </div>
                </div>
            </section>

            <div className="page-footer">
                <Footer />
            </div>

        </div>
    )
}

export default Home;
