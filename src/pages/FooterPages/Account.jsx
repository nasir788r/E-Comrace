import React, { useState, useEffect } from 'react';
import { 
  User, Package, MapPin, CreditCard, 
  Settings, LogOut, ChevronRight, Edit2, Save, X 
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom'; 


import { auth, db } from '../../firebase'; 
import { doc, getDoc, updateDoc, setDoc } from 'firebase/firestore';
import { onAuthStateChanged, signOut } from 'firebase/auth';


import { useDispatch } from 'react-redux';

const Account = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    photoURL: '',
    uid: ''
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const authPhoto = user.photoURL || '';
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        let dataToSet = {
          uid: user.uid,
          name: user.displayName || 'User',
          email: user.email || '',
          photoURL: authPhoto,
          phone: ''
        };

        if (docSnap.exists()) {
          const firestoreData = docSnap.data();
          if (!firestoreData.photoURL && authPhoto) {
            await updateDoc(userRef, { photoURL: authPhoto });
          }
          dataToSet = { ...dataToSet, ...firestoreData };
        } else {
          await setDoc(docRef, dataToSet);
        }

        setUserData(dataToSet);
        dispatch({ type: 'SET_USER', payload: dataToSet });
      } else {
       
        navigate("/login");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [dispatch, navigate]);

 
  const handleLogout = async () => {
    try {
      await signOut(auth); 
      dispatch({ type: 'LOGOUT' }); 
      navigate('/login'); 
    } catch (error) {
      console.error("Logout Error:", error);
      alert("Error logging out.");
    }
  };

  const handleUpdate = async () => {
    try {
      const userRef = doc(db, "users", userData.uid);
      await updateDoc(userRef, {
        name: userData.name,
        phone: userData.phone
      });
      dispatch({ type: 'SET_USER', payload: userData });
      setIsEditing(false);
      alert("Profile Updated!");
    } catch (error) {
      alert("Error updating profile.");
    }
  };

  if (loading) return <div className="h-screen flex items-center justify-center font-bold">Loading Account...</div>;

  const menuItems = [
    { id: 'profile', label: 'My Profile', icon: <User size={20} /> },
    { id: 'orders', label: 'My Orders', icon: <Package size={20} /> },
    { id: 'addresses', label: 'Addresses', icon: <MapPin size={20} /> },
    { id: 'payments', label: 'Payments', icon: <CreditCard size={20} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={20} /> },
  ];

  return (
    <div className="bg-[#F2F0F1] min-h-screen pt-24 pb-20 font-sans">
      <div className="container mx-auto px-4 md:px-10">
        <nav className="flex items-center gap-2 text-gray-400 text-xs mb-8 uppercase tracking-widest font-bold">
          <Link to="/" className="hover:text-black">Home</Link>
          <ChevronRight size={14} />
          <span className="text-black">My Account</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-8">
          
          <aside className="w-full lg:w-1/4">
            <div className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-4 mb-8 pb-6 border-b">
                <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center overflow-hidden border-2 border-gray-100">
                  {userData.photoURL ? (
                    <img 
                      src={userData.photoURL} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <span className="text-white text-xl font-bold uppercase">{userData.name?.charAt(0)}</span>
                  )}
                </div>
                <div>
                  <h2 className="font-bold text-lg truncate w-32">{userData.name}</h2>
                  <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wider">Verified Member</p>
                </div>
              </div>

              <nav className="space-y-1">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all font-bold text-[13px] ${
                      activeTab === item.id ? 'bg-black text-white' : 'text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    {item.icon} {item.label}
                  </button>
                ))}
                
               
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 font-bold text-[13px] mt-4 transition-colors"
                >
                  <LogOut size={20} /> Logout
                </button>
              </nav>
            </div>
          </aside>

          
          <main className="flex-1">
            <div className="bg-white rounded-[32px] p-8 md:p-10 shadow-sm min-h-[550px] border border-gray-100">
              {activeTab === 'profile' ? (
                <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                  <div className="flex justify-between items-center mb-10 pb-4 border-b">
                    <h3 className="text-2xl font-black italic uppercase tracking-tighter">Personal Information</h3>
                    <button 
                      onClick={() => isEditing ? handleUpdate() : setIsEditing(true)}
                      className="flex items-center gap-2 text-xs font-black uppercase border-2 border-black px-6 py-2.5 rounded-full hover:bg-black hover:text-white transition-all active:scale-95"
                    >
                      {isEditing ? <><Save size={14}/> Save Profile</> : <><Edit2 size={14}/> Edit Profile</>}
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-2">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Full Name</p>
                      {isEditing ? (
                        <input 
                          className="w-full bg-gray-50 p-3 rounded-xl outline-none border focus:border-black font-bold text-sm" 
                          value={userData.name} 
                          onChange={(e) => setUserData({...userData, name: e.target.value})} 
                        />
                      ) : (
                        <p className="font-bold text-gray-900 text-lg">{userData.name}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Email Address</p>
                      <p className="font-bold text-gray-500 text-lg">{userData.email}</p>
                    </div>

                    <div className="space-y-2">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Phone Number</p>
                      {isEditing ? (
                        <input 
                          className="w-full bg-gray-50 p-3 rounded-xl outline-none border focus:border-black font-bold text-sm" 
                          placeholder="+92 000 0000000" 
                          value={userData.phone} 
                          onChange={(e) => setUserData({...userData, phone: e.target.value})} 
                        />
                      ) : (
                        <p className="font-bold text-gray-900 text-lg">{userData.phone || "Not set"}</p>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center py-20 text-center opacity-50">
                   <div className="bg-gray-100 p-8 rounded-full mb-6 italic font-black text-3xl">!</div>
                   <h3 className="text-xl font-black uppercase tracking-tighter mb-2">{activeTab}</h3>
                   <p className="text-gray-400 text-sm font-bold">This section is coming soon.</p>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Account;