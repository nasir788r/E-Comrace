import React, { useState } from 'react';
import { 
  ChevronRight, Play, Share2, Info, 
  Menu, Clock, Heart, MoreHorizontal, 
  Tv, Youtube 
} from 'lucide-react';
import { Link } from 'react-router-dom';

const PLAYLIST_DATA = [
  { id: "UubyOFwTrzI", title: "Mastering the Capsule Wardrobe", length: "12:45", thumbnail: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400" },
  { id: "44407jxiY4w", title: "Styling 101: Color Theory", length: "08:30", thumbnail: "https://images.unsplash.com/photo-1520975954732-35dd2229969e?w=400" },
  { id: "rUJaOLUYtZw", title: "Sustainable Denim Care", length: "15:20", thumbnail: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400" },
  { id: "oj8y8KAXC3Y", title: "How to Layer for Winter", length: "10:15", thumbnail: "https://images.unsplash.com/photo-1445205170230-053b830c6050?w=400" },
];

const PlaylistPage = () => {
  const [activeVideo, setActiveVideo] = useState(PLAYLIST_DATA[0]);

  return (
    <div className="bg-white min-h-screen">
      {/* 1. Header & Navigation */}
      <section className="pt-24 pb-10 border-b">
        <div className="container mx-auto px-4 md:px-10">
          <nav className="flex items-center gap-2 text-gray-400 text-xs mb-8">
            <Link to="/" className="hover:text-black">Home</Link>
            <ChevronRight size={14} />
            <span className="text-black font-medium">Video Library</span>
          </nav>
          
          <div className="flex flex-col md:flex-row justify-between items-end gap-6">
            <div>
              <div className="flex items-center gap-2 text-red-600 font-bold text-xs uppercase tracking-widest mb-2">
                <Youtube size={16} /> SHOP.CO Originals
              </div>
              <h1 className="font-display text-4xl md:text-6xl font-bold uppercase tracking-tighter">
                Style Tutorials
              </h1>
            </div>
            <div className="flex gap-4">
              <button className="p-3 border rounded-full hover:bg-gray-50 transition-colors"><Share2 size={20}/></button>
              <button className="p-3 border rounded-full hover:bg-gray-50 transition-colors"><Heart size={20}/></button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Player Section */}
      <section className="py-12 bg-black">
        <div className="container mx-auto px-4 md:px-10 flex flex-col lg:flex-row gap-8">
          
          {/* Main Player */}
          <div className="lg:flex-1">
            <div className="aspect-video bg-gray-900 rounded-[32px] overflow-hidden shadow-2xl relative group">
              {/* Simulated YouTube Embed */}
              <iframe 
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${activeVideo.id}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            
            <div className="mt-8 text-white">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">{activeVideo.title}</h2>
              <div className="flex items-center gap-4 text-gray-400 text-sm">
                <span className="flex items-center gap-1"><Tv size={16}/> 1.2M Views</span>
                <span className="flex items-center gap-1"><Clock size={16}/> {activeVideo.length}</span>
              </div>
            </div>
          </div>

          {/* Playlist Sidebar */}
          <div className="lg:w-1/3">
            <div className="bg-zinc-900 rounded-[32px] p-6 h-full max-h-[600px] flex flex-col border border-white/10">
              <div className="flex justify-between items-center mb-6 text-white border-b border-white/10 pb-4">
                <h3 className="font-bold uppercase tracking-widest text-xs flex items-center gap-2">
                   <Menu size={16} /> Next in Queue
                </h3>
                <span className="text-[10px] text-gray-500">4 Videos</span>
              </div>
              
              <div className="overflow-y-auto space-y-4 pr-2 custom-scrollbar">
                {PLAYLIST_DATA.map((video) => (
                  <button 
                    key={video.id}
                    onClick={() => setActiveVideo(video)}
                    className={`w-full flex gap-4 p-3 rounded-2xl transition-all text-left group ${
                      activeVideo.id === video.id ? 'bg-white/10' : 'hover:bg-white/5'
                    }`}
                  >
                    <div className="relative w-24 h-16 rounded-lg overflow-hidden shrink-0">
                      <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover opacity-60" />
                      {activeVideo.id === video.id ? (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                          <Play size={16} fill="white" className="text-white" />
                        </div>
                      ) : (
                        <div className="absolute bottom-1 right-1 bg-black/80 text-[8px] text-white px-1 rounded">
                          {video.length}
                        </div>
                      )}
                    </div>
                    <div>
                      <h4 className={`text-sm font-bold line-clamp-2 ${activeVideo.id === video.id ? 'text-white' : 'text-gray-400'}`}>
                        {video.title}
                      </h4>
                      <p className="text-[10px] text-gray-500 mt-1 uppercase tracking-widest">Shop.Co Fashion</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Description & Metadata */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2 space-y-8">
              <h3 className="text-2xl font-bold flex items-center gap-2">
                <Info size={24} /> About this tutorial
              </h3>
              <p className="text-gray-500 leading-loose">
                Dive deep into the world of minimalist fashion. In this series, our lead designers break down the complex world of textiles and tailoring into simple, actionable steps for the modern dresser. This series is updated weekly with new trends and care guides.
              </p>
              <div className="flex flex-wrap gap-2">
                {['#styling', '#minimalist', '#guide', '#tutorials'].map(tag => (
                  <span key={tag} className="px-4 py-2 bg-gray-100 rounded-full text-xs font-bold text-gray-600 hover:bg-black hover:text-white cursor-pointer transition-all">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-[40px] h-fit">
               <h4 className="font-bold mb-4 uppercase tracking-tighter">Shop the look</h4>
               <p className="text-xs text-gray-500 mb-6 leading-relaxed">Featured products from this video series are available now with exclusive student discounts.</p>
               <Link to="/shop" className="w-full bg-black text-white py-4 rounded-full flex items-center justify-center font-bold text-sm uppercase tracking-widest hover:bg-gray-800 transition-all">
                 Browse Collection
               </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PlaylistPage;