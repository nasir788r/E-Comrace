import React, { useState } from 'react';
import { 
  ChevronRight, Code2, Terminal, Layers, 
  Copy, Check, Play, BookOpen, Clock, BarChart 
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Tutorial = () => {
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    const code = `const ShopCoButton = ({ label }) => {\n  return <button className="bg-black text-white px-8 py-4 rounded-full font-bold uppercase hover:bg-gray-800 transition-all">{label}</button>\n};`;
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white min-h-screen">
      {/* 1. Tutorial Header */}
      <header className="bg-black text-white pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-10">
          <nav className="flex items-center gap-2 text-gray-400 text-xs mb-8">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={14} />
            <span className="text-white font-medium">Dev Tutorials</span>
          </nav>

          <div className="max-w-4xl">
            <div className="flex flex-wrap gap-4 mb-6">
              <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                <Clock size={12} /> 15 Min Read
              </span>
              <span className="flex items-center gap-1.5 bg-yellow-400 text-black px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                <BarChart size={12} /> Intermediate
              </span>
            </div>
            <h1 className="font-display text-4xl md:text-6xl font-bold uppercase tracking-tighter leading-none mb-6">
              Building the Perfect <br /> E-commerce Button.
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl leading-relaxed">
              In this guide, we’ll explore how to create a highly reusable, accessible, and high-performance button component using React and Tailwind CSS.
            </p>
          </div>
        </div>
      </header>

      {/* 2. Content Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-10 flex flex-col lg:flex-row gap-16">
          
          {/* Main Article */}
          <article className="lg:w-2/3 space-y-12">
            <div>
              <h2 className="text-3xl font-bold mb-6 italic underline decoration-4 decoration-yellow-400">Introduction</h2>
              <p className="text-gray-600 leading-loose text-lg">
                Buttons are the primary interaction point for e-commerce conversion. A well-designed button doesn't just look good—it feels responsive and works for every user, including those using screen readers.
              </p>
            </div>

            {/* Code Block Component */}
            <div className="rounded-3xl overflow-hidden shadow-2xl">
              <div className="bg-[#1E1E1E] px-6 py-4 flex justify-between items-center border-b border-white/10">
                <div className="flex items-center gap-2">
                  <Terminal size={18} className="text-gray-400" />
                  <span className="text-xs font-mono text-gray-400">Button.jsx</span>
                </div>
                <button 
                  onClick={copyCode}
                  className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 text-xs"
                >
                  {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                  {copied ? 'Copied!' : 'Copy Code'}
                </button>
              </div>
              <div className="bg-[#1E1E1E] p-6 md:p-8 font-mono text-sm md:text-base leading-relaxed overflow-x-auto text-blue-300">
                <pre>
{`const ShopCoButton = ({ label }) => {
  return (
    <button className="bg-black text-white px-8 py-4 
      rounded-full font-bold uppercase 
      hover:bg-gray-800 transition-all">
      {label}
    </button>
  );
};`}
                </pre>
              </div>
            </div>

            <div className="bg-gray-50 p-8 rounded-[32px] border-l-8 border-black">
               <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
                 <Layers size={20} /> Design Principle
               </h3>
               <p className="text-gray-600 text-sm leading-relaxed">
                 We use <code className="bg-gray-200 px-2 py-0.5 rounded">rounded-full</code> to maintain the friendly yet premium look of the brand. This shape is scientifically proven to be more "clickable" than sharp rectangles in mobile UI.
               </p>
            </div>
          </article>

          {/* Sidebar Navigation */}
          <aside className="lg:w-1/3 space-y-8">
            <div className="bg-gray-50 rounded-[32px] p-8 sticky top-32">
              <h4 className="font-bold uppercase text-xs tracking-widest text-gray-400 mb-6">Course Content</h4>
              <ul className="space-y-4">
                {[
                  { title: "Component Structure", status: "completed" },
                  { title: "Tailwind Styling", status: "active" },
                  { title: "Hover States & Transitions", status: "pending" },
                  { title: "Accessibility (Aria Labels)", status: "pending" },
                  { title: "Testing with Jest", status: "pending" }
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] ${
                      item.status === 'completed' ? 'bg-green-500 text-white' : 
                      item.status === 'active' ? 'bg-black text-white' : 
                      'bg-gray-200 text-gray-500'
                    }`}>
                      {item.status === 'completed' ? <Check size={14} /> : i + 1}
                    </div>
                    <span className={`text-sm font-medium ${item.status === 'active' ? 'text-black' : 'text-gray-500'}`}>
                      {item.title}
                    </span>
                  </li>
                ))}
              </ul>
              
              <button className="w-full mt-10 bg-black text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-gray-800 transition-all">
                Next Lesson <Play size={16} fill="white" />
              </button>
            </div>

            {/* Author Card */}
            <div className="border border-gray-100 rounded-[32px] p-8 flex items-center gap-4">
               <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center font-bold">JD</div>
               <div>
                  <p className="text-xs text-gray-400 uppercase font-bold tracking-widest">Instructor</p>
                  <p className="font-bold">John Doe</p>
                  <p className="text-[10px] text-gray-500">Senior UI Engineer</p>
               </div>
            </div>
          </aside>

        </div>
      </section>
    </div>
  );
};

export default Tutorial;