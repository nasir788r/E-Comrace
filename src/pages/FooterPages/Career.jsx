import React from 'react';
import { ChevronRight, Briefcase, MapPin, Clock, ArrowRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const OPEN_POSITIONS = [
  {
    id: 1,
    role: "Senior Fashion Designer",
    department: "Creative",
    location: "London, UK / Remote",
    type: "Full-time"
  },
  {
    id: 2,
    role: "E-commerce Growth Manager",
    department: "Marketing",
    location: "New York, US",
    type: "Full-time"
  },
  {
    id: 3,
    role: "UI/UX Product Designer",
    department: "Technology",
    location: "Remote",
    type: "Contract"
  },
  {
    id: 4,
    role: "Sustainability Specialist",
    department: "Operations",
    location: "London, UK",
    type: "Full-time"
  }
];

const Career = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* 1. Hero Section */}
      <section className="pt-12 md:pt-24 pb-16 bg-[#F2F0F1]">
        <div className="container mx-auto px-4 md:px-10">
          <nav className="flex items-center gap-2 text-gray-400 text-xs md:text-sm mb-8">
            <Link to="/" className="hover:text-black">Home</Link>
            <ChevronRight size={14} />
            <span className="text-black font-medium">Careers</span>
          </nav>

          <div className="max-w-4xl">
            <h1 className="font-display text-5xl md:text-8xl font-bold uppercase tracking-tighter leading-none mb-8">
              Shape the <br /> Future of <br /> Fashion.
            </h1>
            <p className="text-gray-500 text-lg md:text-xl max-w-2xl leading-relaxed">
              We’re a team of rebels, designers, and tech enthusiasts. At SHOP.CO, we don't just follow trends—we build the platforms that define them. Join us.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Culture & Values Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800" 
                alt="Our Team" 
                className="rounded-[40px] grayscale hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute -bottom-10 -right-10 bg-black text-white p-10 rounded-[30px] hidden lg:block">
                <Star className="text-yellow-400 mb-4" fill="currentColor" />
                <p className="font-display text-2xl font-bold uppercase italic">"The best place <br /> to create."</p>
              </div>
            </div>
            <div className="space-y-8">
              <h2 className="font-display text-4xl md:text-5xl font-bold uppercase tracking-tighter">Why Work With Us?</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="shrink-0 w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center font-bold">01</div>
                  <div>
                    <h4 className="font-bold text-lg">Growth Mindset</h4>
                    <p className="text-gray-500 text-sm">We provide annual learning stipends and mentorship from industry leaders.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="shrink-0 w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center font-bold">02</div>
                  <div>
                    <h4 className="font-bold text-lg">Global Impact</h4>
                    <p className="text-gray-500 text-sm">Your work will be seen and worn by millions of customers worldwide.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="shrink-0 w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center font-bold">03</div>
                  <div>
                    <h4 className="font-bold text-lg">Wellness First</h4>
                    <p className="text-gray-500 text-sm">Flexible working hours, remote options, and comprehensive health plans.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Open Positions List */}
      <section className="py-20 bg-black text-white rounded-t-[40px] md:rounded-t-[80px]">
        <div className="container mx-auto px-4 md:px-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <h2 className="font-display text-4xl md:text-6xl font-bold uppercase tracking-tighter">Open Positions</h2>
            <p className="text-gray-400 font-medium">({OPEN_POSITIONS.length} roles available)</p>
          </div>

          <div className="space-y-4">
            {OPEN_POSITIONS.map((job) => (
              <div 
                key={job.id} 
                className="group border-b border-white/10 py-8 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-white/5 transition-all px-4 rounded-xl cursor-pointer"
              >
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 block">{job.department}</span>
                  <h3 className="text-xl md:text-3xl font-bold group-hover:translate-x-2 transition-transform">{job.role}</h3>
                </div>
                
                <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <MapPin size={16} /> {job.location}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={16} /> {job.type}
                  </div>
                  <button className="bg-white text-black px-6 py-3 rounded-full font-bold flex items-center gap-2 group-hover:bg-yellow-400 transition-colors">
                    Apply <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Spontaneous Application */}
      <section className="py-24 text-center">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <Briefcase className="text-black" />
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold uppercase">Don't see your role?</h2>
            <p className="text-gray-500">
              We are always looking for exceptional talent. If you think you'd be a great fit for SHOP.CO, send us your portfolio anyway.
            </p>
            <button className="text-black font-bold underline underline-offset-8 hover:text-gray-600 transition-colors">
              dummy.apply@shop.co
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Career;