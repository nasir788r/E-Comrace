import React from 'react';
import { ChevronRight, Clock, User, ArrowUpRight, Search, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';

const BLOG_POSTS = [
  {
    id: 1,
    category: "Style Guide",
    title: "How to Build a Capsule Wardrobe in 2026",
    excerpt: "Learn the art of minimalism and how to choose pieces that never go out of style.",
    author: "Alex Rivera",
    date: "Dec 20, 2025",
    readTime: "8 min",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800"
  },
  {
    id: 2,
    category: "Tutorial",
    title: "How to Properly Wash Your Premium Denim",
    excerpt: "Stop ruining your jeans. Our guide covers everything from water temperature to drying.",
    author: "Sam Chen",
    date: "Dec 15, 2025",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=800"
  },
  {
    id: 3,
    category: "Trends",
    title: "Mastering the Art of Layering: A Step-by-Step",
    excerpt: "Layering isn't just for winter. Discover how to layer textures and colors for any season.",
    author: "Jordan Lee",
    date: "Dec 10, 2025",
    readTime: "6 min",
    image: "https://images.unsplash.com/photo-1520975954732-35dd2229969e?w=800"
  }
];

const Blog = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* 1. Page Header */}
      <section className="pt-12 md:pt-24 pb-12 border-b">
        <div className="container mx-auto px-4 md:px-10">
          <nav className="flex items-center gap-2 text-gray-400 text-xs mb-8">
            <Link to="/" className="hover:text-black">Home</Link>
            <ChevronRight size={14} />
            <span className="text-black font-medium">How-To Blog</span>
          </nav>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <h1 className="font-display text-5xl md:text-8xl font-bold uppercase tracking-tighter leading-[0.8] mb-6">
                The <br /> Style <br /> Journal.
              </h1>
              <p className="text-gray-500 text-lg">Expert advice on fashion, care, and the tech behind the fit.</p>
            </div>
            
            <div className="relative group w-full md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors" size={20} />
              <input 
                type="text" 
                placeholder="Search tutorials..." 
                className="w-full pl-12 pr-6 py-4 bg-gray-100 rounded-full outline-none focus:ring-2 ring-black transition-all"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Featured Post */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 md:px-10">
          <Link to="/blog/featured" className="group block relative overflow-hidden rounded-[40px] md:rounded-[60px] bg-black h-[500px] md:h-[600px]">
            <img 
              src="https://images.unsplash.com/photo-1445205170230-053b830c6050?w=1200" 
              alt="Featured" 
              className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 p-8 md:p-16 flex flex-col justify-end text-white">
              <span className="bg-white text-black px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest w-fit mb-6">
                Featured Article
              </span>
              <h2 className="text-4xl md:text-6xl font-display font-bold uppercase tracking-tighter max-w-3xl leading-none mb-6">
                How to Style Streetwear for Professional Environments
              </h2>
              <div className="flex items-center gap-6 text-sm font-medium">
                <span className="flex items-center gap-2"><User size={16}/> By Maria Gomez</span>
                <span className="flex items-center gap-2"><Clock size={16}/> 12 Min Read</span>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* 3. Article Grid */}
      <section className="py-12 md:py-20 bg-[#F2F0F1] rounded-t-[40px] md:rounded-t-[80px]">
        <div className="container mx-auto px-4 md:px-10">
          <div className="flex items-center justify-between mb-12">
            <h3 className="font-display text-3xl font-bold uppercase tracking-tight">Recent Tutorials</h3>
            <div className="flex gap-2">
              {['All', 'Style', 'Care', 'Design'].map((cat) => (
                <button key={cat} className="px-4 py-2 rounded-full text-xs font-bold border border-gray-200 hover:bg-black hover:text-white transition-all">
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {BLOG_POSTS.map((post) => (
              <div key={post.id} className="bg-white rounded-[32px] p-4 flex flex-col group cursor-pointer hover:shadow-2xl transition-all">
                <div className="relative h-64 overflow-hidden rounded-[24px] mb-6">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-sm text-black px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                      {post.category}
                    </span>
                  </div>
                </div>
                
                <div className="px-2 pb-4 flex flex-col flex-1">
                  <h4 className="text-xl font-bold leading-tight mb-4 group-hover:underline underline-offset-4 transition-all">
                    {post.title}
                  </h4>
                  <p className="text-gray-500 text-sm mb-6 line-clamp-2">
                    {post.excerpt}
                  </p>
                  
                  <div className="mt-auto pt-6 border-t flex justify-between items-center text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    <span>{post.date}</span>
                    <div className="flex items-center gap-1 text-black">
                      Read More <ArrowUpRight size={14} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Newsletter Section */}
      <section className="py-24 text-center">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto space-y-8">
             <div className="bg-black text-white w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-6 rotate-12">
               <Tag size={24} />
             </div>
             <h2 className="font-display text-4xl font-bold uppercase tracking-tight">Never Miss a Guide.</h2>
             <p className="text-gray-500">Get the latest fashion tutorials and product drops delivered to your inbox every Sunday.</p>
             <form className="flex gap-2 p-1 bg-gray-100 rounded-full">
                <input type="email" placeholder="Your email address" className="flex-1 bg-transparent px-6 py-3 outline-none" />
                <button className="bg-black text-white px-8 py-3 rounded-full font-bold uppercase text-xs hover:bg-gray-800 transition-all">Subscribe</button>
             </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;