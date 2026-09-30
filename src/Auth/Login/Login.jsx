import React, { useState } from "react";
import { auth, db } from "../../firebase";
import { 
  signInWithEmailAndPassword, 
  sendPasswordResetEmail, 
  GoogleAuthProvider, 
  signInWithPopup 
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [resetEmail, setResetEmail] = useState(""); 
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userRef);

      let userData;

      if (!userDoc.exists()) {
       
        userData = {
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          role: "user"
        };
        await setDoc(userRef, userData);
      } else {
        const existingData = userDoc.data();
        await setDoc(userRef, { photoURL: user.photoURL }, { merge: true });
        userData = { ...existingData, photoURL: user.photoURL };
      }

      dispatch({ type: "SET_USER", payload: userData });

      if (userData.role === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/");
      }

    } catch (err) {
      alert("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      const userDoc = await getDoc(doc(db, "users", user.uid));
      
      if (userDoc.exists()) {
        const userData = userDoc.data();
        dispatch({ type: "SET_USER", payload: userData });


        if (userData.role === "admin") {
          navigate("/dashboard");
        } else {
          navigate("/");
        }
      }
    } catch (err) {
      alert("Login Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };


  const handlePasswordReset = async (e) => {
    e.preventDefault();
    if (!resetEmail) return alert("Please enter email");
    try {
      await sendPasswordResetEmail(auth, resetEmail);
      alert("Reset link sent!");
      setShowModal(false);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="h-screen w-full bg-[#F3F4F6] flex items-center justify-center p-4 font-sans overflow-hidden">
      
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-[380px] p-8 rounded-[2.5rem] shadow-2xl">
            <h2 className="text-xl font-black italic mb-2">Reset Password</h2>
            <form onSubmit={handlePasswordReset} className="space-y-4">
              <input 
                type="email" 
                className="w-full bg-gray-50 border-none rounded-xl p-4 text-sm outline-none" 
                placeholder="Email..." 
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                required 
              />
              <div className="flex gap-3">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-3 bg-gray-100 text-gray-500 rounded-xl font-bold text-xs">Cancel</button>
                <button type="submit" className="flex-1 py-3 bg-black text-white rounded-xl font-bold text-xs">Send</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="bg-white w-full max-w-[400px] p-8 rounded-[2.5rem] shadow-sm border border-gray-100 relative">
        <h1 className="text-3xl font-black text-center tracking-tighter mb-1 italic">SHOP.CO</h1>
        <p className="text-gray-400 text-center font-bold text-[10px] uppercase tracking-widest mb-6">Sign in to your account</p>

        <button 
          type="button"
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 py-3 border border-gray-200 rounded-2xl mb-6 hover:bg-gray-50 transition-all font-bold text-[13px] text-gray-700 shadow-sm"
        >
          <svg width="18" height="18" viewBox="0 0 18 18">
            <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" fill="#4285F4"/>
            <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/>
            <path d="M3.964 10.71a5.41 5.41 0 0 1 0-3.42V4.958H.957a8.997 8.997 0 0 0 0 8.084l3.007-2.332z" fill="#FBBC05"/>
            <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
          </svg>
          Continue with Google
        </button>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-gray-100"></span></div>
          <div className="relative flex justify-center text-[9px] uppercase"><span className="bg-white px-2 text-gray-400 font-bold tracking-widest">Or email login</span></div>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-[9px] font-black uppercase text-gray-400 ml-4 tracking-wider">Email</label>
            <input type="email" className="w-full mt-1 bg-gray-50 border-none rounded-xl p-3.5 text-sm outline-none focus:ring-1 focus:ring-black" placeholder="admin@shop.co" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>

          <div>
            <label className="text-[9px] font-black uppercase text-gray-400 ml-4 tracking-wider">Password</label>
            <input type="password" className="w-full mt-1 bg-gray-50 border-none rounded-xl p-3.5 text-sm outline-none focus:ring-1 focus:ring-black" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>

          <div className="flex justify-end pr-2">
            <button type="button" onClick={() => setShowModal(true)} className="text-[9px] font-black text-blue-500 uppercase hover:underline">Forgot Password?</button>
          </div>

          <button disabled={loading} className="w-full py-4 bg-black text-white rounded-2xl font-bold text-sm shadow-lg active:scale-95 transition-all">
            {loading ? "Please wait..." : "Login Now"}
          </button>
        </form>

        <p className="text-center mt-6 text-xs font-bold text-gray-400">
          New here? <span onClick={() => navigate('/signup')} className="text-black underline cursor-pointer">Create Account</span>
        </p>
      </div>
    </div>
  );
};

export default Login;