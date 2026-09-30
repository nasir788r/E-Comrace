import React from 'react';
import { ChevronRight, FileText, Scale, ShieldAlert } from 'lucide-react';
import { Link } from 'react-router-dom';

const Terms = () => {
  const sections = [
    { id: "usage", title: "1. Website Usage", content: "By accessing SHOP.CO, you agree to use the site for lawful purposes only. Unauthorized use of this website may give rise to a claim for damages." },
    { id: "intellectual", title: "2. Intellectual Property", content: "All content, logos, and designs are the property of SHOP.CO. Reproduction is prohibited without express written consent." },
    { id: "orders", title: "3. Orders & Pricing", content: "We reserve the right to refuse any order. Prices are subject to change without notice. We are not responsible for typographical errors in pricing." },
  ];

  return (
    <div className="bg-white min-h-screen">
      <section className="pt-12 md:pt-20 pb-10 border-b">
        <div className="container mx-auto px-4 md:px-10">
          <nav className="flex items-center gap-2 text-gray-400 text-xs mb-6">
            <Link to="/" className="hover:text-black">Home</Link>
            <ChevronRight size={14} />
            <span className="text-black font-medium">Terms & Conditions</span>
          </nav>
          <h1 className="font-display text-4xl md:text-6xl font-bold uppercase tracking-tighter">Legal Agreement</h1>
          <p className="text-gray-500 mt-4 italic">Last Updated: October 2023</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 md:px-10 flex flex-col lg:flex-row gap-16">
          <aside className="lg:w-1/4 space-y-4 hidden lg:block sticky top-32 h-fit">
            <h4 className="font-bold uppercase text-xs tracking-widest text-gray-400 mb-6">Navigation</h4>
            {sections.map(s => (
              <a key={s.id} href={`#${s.id}`} className="block text-sm font-medium hover:text-black text-gray-400 transition-colors">
                {s.title}
              </a>
            ))}
          </aside>

          <div className="lg:w-3/4 space-y-12">
            {sections.map(s => (
              <div key={s.id} id={s.id} className="scroll-mt-32">
                <h2 className="text-2xl font-bold mb-4">{s.title}</h2>
                <p className="text-gray-600 leading-loose">{s.content}</p>
              </div>
            ))}
            <div className="bg-gray-50 p-8 rounded-3xl border border-dashed border-gray-300">
              <h3 className="font-bold flex items-center gap-2 mb-4"><Scale size={20}/> Governing Law</h3>
              <p className="text-sm text-gray-500">These terms are governed by and construed in accordance with the laws of the United Kingdom and New York State.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Terms;