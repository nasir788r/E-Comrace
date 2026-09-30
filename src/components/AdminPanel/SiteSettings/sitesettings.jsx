import React, { useState, useEffect } from "react";
import {
  db,
  doc,
  onSnapshot,
  setDoc,
  updateDoc,
  arrayUnion,
} from "../../../firebase";

const SiteSettings = () => {
  const [loading, setLoading] = useState(false);
  const [resetKey, setResetKey] = useState(Date.now());
  const [brandText, setBrandText] = useState("");
  const [heroHeadline, setHeroHeadline] = useState("");
  const [heroDescription, setHeroDescription] = useState("");
  const [sectionTitles, setSectionTitles] = useState({
    newArrivals: "",
    topSelling: "",
    dressStyle: "",
    customers: "",
  });

  const [logoFile, setLogoFile] = useState(null);
  const [bannerFile, setBannerFile] = useState(null);
  const [styleFiles, setStyleFiles] = useState({
    casual: null,
    formal: null,
    party: null,
    gym: null,
  });
  const [currentDB, setCurrentDB] = useState({});

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "site_content", "home_page"), (snap) => {
      if (snap.exists()) setCurrentDB(snap.data());
    });
    return () => unsub();
  }, []);

  const uploadToCloudinary = async (file) => {
    if (!file) return null;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "unsigned_preset");
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dkjz9brjc/image/upload",
      { method: "POST", body: formData }
    );
    const resData = await res.json();
    return resData.secure_url;
  };

  const addBrandText = async () => {
    if (!brandText.trim()) return alert("Enter brand name");
    setLoading(true);
    try {
      const docRef = doc(db, "site_content", "home_page");
      await updateDoc(docRef, {
        brands: arrayUnion(brandText.toUpperCase()),
      });
      setBrandText("");
      alert("Brand Name Added!");
    } catch (err) {
      console.error(err);
      alert("Error adding brand");
    }
    setLoading(false);
  };

  const handleSaveAll = async () => {
    setLoading(true);
    try {
      const logoUrl = logoFile
        ? await uploadToCloudinary(logoFile)
        : currentDB.navLogoImg;
      const bannerUrl = bannerFile
        ? await uploadToCloudinary(bannerFile)
        : currentDB.heroBanner;

      const styles = { ...currentDB.styles };
      if (styleFiles.casual)
        styles.casual = await uploadToCloudinary(styleFiles.casual);
      if (styleFiles.formal)
        styles.formal = await uploadToCloudinary(styleFiles.formal);
      if (styleFiles.party)
        styles.party = await uploadToCloudinary(styleFiles.party);
      if (styleFiles.gym) styles.gym = await uploadToCloudinary(styleFiles.gym);

      await setDoc(
        doc(db, "site_content", "home_page"),
        {
          navLogoImg: logoUrl || "",
          heroHeadline: heroHeadline || currentDB.heroHeadline || "",
          heroDescription: heroDescription || currentDB.heroDescription || "",
          heroBanner: bannerUrl || "",
          headings: {
            newArrivals:
              sectionTitles.newArrivals ||
              currentDB.headings?.newArrivals ||
              "NEW ARRIVALS",
            topSelling:
              sectionTitles.topSelling ||
              currentDB.headings?.topSelling ||
              "TOP SELLING",
            dressStyle:
              sectionTitles.dressStyle ||
              currentDB.headings?.dressStyle ||
              "BROWSE BY DRESS STYLE",
            customers:
              sectionTitles.customers ||
              currentDB.headings?.customers ||
              "OUR HAPPY CUSTOMERS",
          },
          styles: styles,
        },
        { merge: true }
      );

      alert("Global Site Data Updated!");
      setResetKey(Date.now());
      setLogoFile(null);
      setHeroHeadline("");
      setHeroDescription("");
      setSectionTitles({
        newArrivals: "",
        topSelling: "",
        dressStyle: "",
        customers: "",
      });
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-10 space-y-10 pb-20 font-sans">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100">
        <div>
          <h1 className="text-3xl font-black tracking-tighter uppercase italic">
            Master UI Controller
          </h1>
          <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">
            Full Dynamic Control (Stats Hidden)
          </p>
        </div>
        <button
          onClick={handleSaveAll}
          disabled={loading}
          className="w-full md:w-auto bg-black text-white px-12 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl hover:bg-gray-800 transition-all"
        >
          {loading ? "SYNCING DATA..." : "PUBLISH ALL CHANGES"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
            <h3 className="text-[10px] font-black uppercase text-gray-400 mb-6 tracking-widest italic border-b pb-2">
              Branding & Headings
            </h3>
            <div className="space-y-4">
              <div className="relative h-14 bg-gray-50 rounded-xl flex items-center justify-center border border-dashed border-gray-200 group overflow-hidden">
                <span className="text-[10px] font-black uppercase text-gray-400">
                  {logoFile ? logoFile.name : "Upload Nav Logo (Image)"}
                </span>
                <input
                  key={resetKey + 1}
                  type="file"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={(e) => setLogoFile(e.target.files[0])}
                  accept="image/*"
                />
              </div>
              <input
                className="w-full bg-gray-50 rounded-xl p-3 text-sm outline-none"
                placeholder="Arrivals Section Title"
                value={sectionTitles.newArrivals}
                onChange={(e) =>
                  setSectionTitles({
                    ...sectionTitles,
                    newArrivals: e.target.value,
                  })
                }
              />
              <input
                className="w-full bg-gray-50 rounded-xl p-3 text-sm outline-none"
                placeholder="Selling Section Title"
                value={sectionTitles.topSelling}
                onChange={(e) =>
                  setSectionTitles({
                    ...sectionTitles,
                    topSelling: e.target.value,
                  })
                }
              />
              <input
                className="w-full bg-gray-50 rounded-xl p-3 text-sm outline-none"
                placeholder="Styles Section Title"
                value={sectionTitles.dressStyle}
                onChange={(e) =>
                  setSectionTitles({
                    ...sectionTitles,
                    dressStyle: e.target.value,
                  })
                }
              />
            </div>
          </div>

          <div className="bg-black p-8 rounded-[2.5rem] text-white shadow-xl">
            <h3 className="text-[9px] font-black uppercase text-gray-500 mb-6 tracking-widest text-center italic">
              Brand Partner Bar
            </h3>
            <div className="space-y-4">
              <div className="h-20 border border-white/10 rounded-2xl bg-white/5 flex items-center justify-center relative px-4">
                <input
                  type="text"
                  className="w-full bg-transparent text-center outline-none text-[11px] font-bold text-white placeholder:text-gray-600 uppercase"
                  placeholder="Type Brand Name (e.g. ZARA)"
                  value={brandText}
                  onChange={(e) => setBrandText(e.target.value)}
                />
              </div>
              <button
                onClick={addBrandText}
                className="w-full bg-white text-black py-3 rounded-xl text-[10px] font-black uppercase hover:scale-105 transition-all"
              >
                Add Brand Text
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 bg-gray-900 rounded-[3rem] p-10 text-white shadow-2xl space-y-8">
          <h3 className="text-[10px] font-black uppercase text-gray-500 tracking-[0.3em] italic">
            Hero Content
          </h3>
          <textarea
            className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 text-xl font-bold outline-none focus:border-white/30"
            rows="3"
            placeholder="Headline..."
            value={heroHeadline}
            onChange={(e) => setHeroHeadline(e.target.value)}
          />
          <textarea
            className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 text-xs text-gray-400 outline-none"
            rows="4"
            placeholder="Description..."
            value={heroDescription}
            onChange={(e) => setHeroDescription(e.target.value)}
          />
          <div className="relative border-2 border-dashed border-white/10 rounded-[2rem] h-40 flex flex-col items-center justify-center bg-white/5">
            <span className="text-[10px] font-black uppercase tracking-widest">
              {bannerFile ? bannerFile.name : "Banner Image"}
            </span>
            <input
              key={resetKey}
              type="file"
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={(e) => setBannerFile(e.target.files[0])}
            />
          </div>
        </div>

        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm">
            <h3 className="text-[10px] font-black uppercase text-gray-400 mb-6 italic text-center">
              Dress Style Images
            </h3>
            <div className="space-y-3">
              {["casual", "formal", "party", "gym"].map((s) => (
                <div
                  key={s}
                  className="relative h-12 bg-gray-50 rounded-xl flex items-center justify-between px-4 border border-gray-100 group overflow-hidden"
                >
                  <span className="text-[9px] font-black uppercase">{s}</span>
                  <span className="text-[8px] text-blue-500 font-bold uppercase">
                    {styleFiles[s] ? "Selected" : "Update"}
                  </span>
                  <input
                    type="file"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={(e) =>
                      setStyleFiles({ ...styleFiles, [s]: e.target.files[0] })
                    }
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SiteSettings;
