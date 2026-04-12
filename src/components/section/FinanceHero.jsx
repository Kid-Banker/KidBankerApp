import React from 'react';
import bgImage from '../../assets/FinanceSection.png';


const FinanceHero = () => {
  return (
    <section className="relative w-full bg-[#f0f4ff] overflow-hidden"
     style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
      }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20 lg:py-32 flex flex-col lg:flex-row items-center justify-between gap-12">
        
        {/* Left Content */}
        <div className="flex-1 max-w-xl z-10">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
            From Financial<br />
            Problems to Smart<br />
            Financial Habits
          </h1>
          
          <p className="text-gray-600 text-lg leading-relaxed max-w-md">
            Track your savings, manage expenses, and build financial discipline — with parental guidance and Google Calendar integration.
          </p>


        </div>
      </div>
    </section>
  );
};

export default FinanceHero;