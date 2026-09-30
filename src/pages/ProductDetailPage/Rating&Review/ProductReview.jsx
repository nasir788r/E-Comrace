import React, { useState } from 'react';
import ReviewCard from './ReviewCard';

const ProductReviews = () => {
  const [showModal, setShowModal] = useState(false);
  const [reviews, setReviews] = useState([
    { id: 1, name: "Samantha D.", date: "August 14, 2023", rating: 4.5, title: "Great quality!", comment: "Feels amazing." }
  ]);

  // Naya review add karne ka function
  const addNewReview = (data) => {
    const newEntry = {
      id: Date.now(),
      name: data.name,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      rating: data.rating,
      title: data.title,
      comment: data.comment
    };
    setReviews([newEntry, ...reviews]);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-3xl font-bold">Reviews ({reviews.length})</h2>
        <button onClick={() => setShowModal(true)} className="bg-black text-white px-8 py-3 rounded-full font-medium shadow-lg hover:bg-gray-800 transition">
          Write a Review
        </button>
      </div>

      {/* Review List Display */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reviews.map((rev) => (
          <div key={rev.id} className="border rounded-[30px] p-8 space-y-4 shadow-sm hover:shadow-md transition">
            <div className="text-yellow-400 text-xl italic">
              {"★".repeat(Math.floor(rev.rating))}
              {rev.rating % 1 !== 0 && "★"} 
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-xl">{rev.name}</span>
              <div className="bg-green-500 text-white rounded-full p-1"><svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" /></svg></div>
            </div>
            <p className="font-bold text-gray-800">"{rev.title}"</p>
            <p className="text-gray-500 leading-relaxed">"{rev.comment}"</p>
            <p className="text-gray-400 text-sm font-medium">Posted on {rev.date}</p>
          </div>
        ))}
      </div>

      {/* Write Review Modal */}
      {showModal && (
        <ReviewCard 
          onClose={() => setShowModal(false)} 
          onSubmit={addNewReview} 
        />
      )}
    </div>
  );
};

export default ProductReviews;