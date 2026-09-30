import React, { useState, useEffect } from 'react';
import { db, collection, addDoc } from '../../../firebase';

const ReviewCard = ({ onClose, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [userName, setUserName] = useState("");
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, []);

  const handleMouseMove = (e, starValue) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    if (x < rect.width / 2) {
      setHover(starValue - 0.5);
    } else {
      setHover(starValue);
    }
  };

  const handlePostReview = async () => {
    if (rating === 0 || !userName || !title || !comment) {
      alert("Please fill all fields and select a rating!");
      return;
    }

    const reviewData = {
      name: userName,
      title: title,
      comment: comment,
      rating: rating,
      approved: false,
      createdAt: new Date(),
      date: new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      })
    };

    try {
      await addDoc(collection(db, "reviews"), reviewData);

      if (onSubmit) {
        onSubmit(reviewData);
      }

      setIsSubmitted(true);
    } catch (error) {
      console.error("Firebase Error:", error);
      alert("Review submit nahi ho saka. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center overflow-hidden px-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-[4px] transition-opacity duration-300"
        onClick={onClose}
      ></div>

      <div className="relative bg-white w-full h-full sm:h-auto sm:max-h-[90vh] sm:max-w-[500px] 
                      sm:rounded-[40px] shadow-2xl flex flex-col
                      animate-in fade-in zoom-in-95 slide-in-from-bottom-10 duration-300 overflow-hidden">

        <div className="flex justify-between items-center p-6 md:p-8 border-b border-gray-50 flex-shrink-0">
          <h3 className="text-2xl font-bold tracking-tight text-gray-900">Write a Review</h3>
          <button
            onClick={onClose}
            className="p-2.5 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {!isSubmitted ? (
          <>
            <div className="flex-1 overflow-y-auto p-6 md:p-8 no-scrollbar">
              <form className="space-y-6" onClick={(e) => e.stopPropagation()}>
                <div className="flex flex-col items-center justify-center py-2">
                  <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Select Rating</p>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((starValue) => (
                      <div
                        key={starValue}
                        className="relative cursor-pointer transition-transform active:scale-90"
                        onMouseMove={(e) => handleMouseMove(e, starValue)}
                        onMouseLeave={() => setHover(0)}
                        onClick={() => setRating(hover)}
                      >
                        <span className="text-5xl text-gray-100 italic">★</span>
                        <div
                          className="absolute top-0 left-0 overflow-hidden select-none pointer-events-none"
                          style={{
                            width: (hover || rating) >= starValue
                              ? '100%'
                              : (hover || rating) === starValue - 0.5
                                ? '50%'
                                : '0%'
                          }}
                        >
                          <span className="text-5xl text-yellow-400 italic">★</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <span className="mt-4 font-bold text-xl">{rating} / 5</span>
                </div>

                <div className="space-y-4 pt-4">
                  <InputField
                    label="Your Name"
                    placeholder="Enter your Full name"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                  <InputField
                    label="Review Title"
                    placeholder="Amazing Experience!"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase ml-1 mb-2">Description</label>
                    <textarea
                      rows="4"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="w-full bg-gray-50 border-2 border-transparent p-4 rounded-2xl outline-none focus:bg-white focus:border-black transition-all resize-none"
                      placeholder="Tell us what you loved..."
                    />
                  </div>
                </div>
              </form>
            </div>

            <div className="p-6 md:p-8 bg-white border-t border-gray-50">
              <button
                type="button"
                onClick={handlePostReview}
                className="w-full bg-black text-white py-5 rounded-2xl font-bold text-lg 
                           hover:bg-gray-800 active:scale-[0.98] transition-all shadow-xl shadow-black/10"
              >
                Post Review
              </button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-12 text-center animate-in zoom-in-90 duration-500">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-2">Thank You!</h3>
            <p className="text-gray-500 mb-8 font-medium">
              Successfully your post review is submitted. We appreciate your feedback.
            </p>
            <button
              onClick={onClose}
              className="px-10 py-4 bg-black text-white rounded-2xl font-bold hover:bg-gray-800 transition-all"
            >
              Close Window
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
};

const InputField = ({ label, placeholder, value, onChange }) => (
  <div>
    <label className="block text-xs font-bold text-gray-400 uppercase ml-1 mb-2">{label}</label>
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full bg-gray-50 border-2 border-transparent p-4 rounded-2xl outline-none focus:bg-white focus:border-black transition-all"
    />
  </div>
);

export default ReviewCard;
