// Premium Fashion Catalog for L'ÉTOILE / SHOP.CO LUXE
// Accurately structured for Men, Women (Ladies), and Kids (Boys & Girls)
// Each product has its EXACT authentic colors (1 color = 1 dot, 2 colors = 2 dots)

export const FASHION_PRODUCTS = [
  // ==========================================
  // 1. MEN'S COLLECTION
  // ==========================================
  {
    id: "men-01",
    title: "Signature Classic Black Tailored Shirt",
    name: "Signature Classic Black Tailored Shirt",
    subtitle: "100% Egyptian Giza compact cotton with mother-of-pearl buttons",
    category: "Shirts",
    gender: "Men",
    subCategory: "Men",
    style: "Formal",
    price: 145,
    oldPrice: 180,
    tag: "Essential",
    rating: 4.9,
    reviewCount: 54,
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=900&q=80",
    hoverImage: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=900&q=80"
    ],
    // EXACT 1 COLOR (Black)
    colors: [
      { name: "Obsidian Black", value: "#141414" }
    ],
    sizes: ["Small", "Medium", "Large", "X-Large"],
    description: "An immaculate black dress shirt tailored from extra-long staple Egyptian Giza cotton with semi-spread collar.",
    features: [
      "100% Egyptian Giza Cotton",
      "Genuine Australian mother-of-pearl buttons",
      "Removable brass collar stays",
      "Machine wash delicate cold"
    ],
    inStock: true,
    discount: "-19%"
  },
  {
    id: "men-02",
    title: "Double-Breasted Wool Melange Blazer",
    name: "Double-Breasted Wool Melange Blazer",
    subtitle: "Tailored Italian virgin wool with natural horn buttons",
    category: "Tailoring",
    gender: "Men",
    subCategory: "Men",
    style: "Formal",
    price: 345,
    oldPrice: 420,
    tag: "Runway Edit",
    rating: 4.9,
    reviewCount: 48,
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=900&q=80",
    hoverImage: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=80"
    ],
    // EXACT 2 COLORS
    colors: [
      { name: "Charcoal Grey", value: "#383B3E" },
      { name: "Obsidian Black", value: "#141414" }
    ],
    sizes: ["Small", "Medium", "Large", "X-Large"],
    description: "Expertly tailored from Super 130s Italian virgin wool, balancing structured shoulders with a gently tapered waist.",
    features: [
      "100% Super 130s Italian Virgin Wool",
      "Hand-finished pick lapel stitching",
      "Dual interior jet pockets with satin trims",
      "Dry clean only"
    ],
    inStock: true,
    discount: "-18%"
  },
  {
    id: "men-03",
    title: "Selvedge Raw Denim Straight Jeans",
    name: "Selvedge Raw Denim Straight Jeans",
    subtitle: "13.5 oz Kurabo Japanese shuttle loom selvedge denim",
    category: "Jeans",
    gender: "Men",
    subCategory: "Men",
    style: "Casual",
    price: 195,
    oldPrice: 240,
    tag: "Japanese Denim",
    rating: 4.8,
    reviewCount: 42,
    image: "https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=900&q=80",
    hoverImage: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=900&q=80"
    ],
    // EXACT 1 COLOR (Dark Indigo)
    colors: [
      { name: "Deep Raw Indigo", value: "#1A2B44" }
    ],
    sizes: ["30", "32", "34", "36"],
    description: "Woven in Okayama, Japan on vintage Toyoda shuttle looms. Features red-line selvedge ID, donut shank buttons, and hidden back pocket rivets.",
    features: [
      "100% Long-Staple Cotton 13.5oz Kurabo Selvedge",
      "Chainstitched hem on Union Special 43200G",
      "Vegetable-tanned leather waistband patch",
      "Cold soak inside out"
    ],
    inStock: true,
    discount: "-18%"
  },
  {
    id: "men-04",
    title: "Heavyweight Boxy Supima Cotton T-Shirt",
    name: "Heavyweight Boxy Supima Cotton T-Shirt",
    subtitle: "280 GSM American combed Supima cotton jersey",
    category: "T-Shirts",
    gender: "Men",
    subCategory: "Men",
    style: "Casual",
    price: 85,
    oldPrice: 110,
    tag: "Essential",
    rating: 4.9,
    reviewCount: 112,
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80",
    hoverImage: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=900&q=80"
    ],
    // EXACT 2 COLORS (White and Washed Black)
    colors: [
      { name: "Pristine White", value: "#F8F8F8" },
      { name: "Washed Black", value: "#262626" }
    ],
    sizes: ["Small", "Medium", "Large", "X-Large"],
    description: "The definitive luxury tee. Knitted from extra-long staple Supima cotton for an exceptionally smooth hand that retains structure.",
    features: [
      "100% Certified American Supima Cotton",
      "280 GSM heavy jersey weight",
      "Seamless blind stitch hems",
      "Pre-shrunk dimensional stability"
    ],
    inStock: true,
    discount: "-23%"
  },
  {
    id: "men-05",
    title: "Lambskin Leather Moto Jacket",
    name: "Lambskin Leather Moto Jacket",
    subtitle: "Supple Spanish nappa leather with brushed ruthenium hardware",
    category: "Jackets",
    gender: "Men",
    subCategory: "Men",
    style: "Casual",
    price: 580,
    oldPrice: 680,
    tag: "Limited Run",
    rating: 5.0,
    reviewCount: 31,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=900&q=80",
    hoverImage: "https://images.unsplash.com/photo-1520975954732-35dd22299614?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1520975954732-35dd22299614?auto=format&fit=crop&w=900&q=80"
    ],
    // EXACT 1 COLOR (Black)
    colors: [
      { name: "Obsidian Black", value: "#101010" }
    ],
    sizes: ["Small", "Medium", "Large", "X-Large"],
    description: "Mastercrafted from buttery soft Spanish lamb nappa leather with asymmetric two-way zip and quilted cupro lining.",
    features: [
      "100% Full-Grain Spanish Lambskin Nappa",
      "Brushed ruthenium hardware with engraved pulls",
      "Professional leather care only"
    ],
    inStock: true,
    discount: "-15%"
  },

  // ==========================================
  // 2. WOMEN'S (LADIES) COLLECTION
  // ==========================================
  {
    id: "women-01",
    title: "Silk Charmeuse Bias-Cut Slip Dress",
    name: "Silk Charmeuse Bias-Cut Slip Dress",
    subtitle: "Fluid drape in pure 22-momme Mulberry silk",
    category: "Dresses",
    gender: "Women",
    subCategory: "Ladies",
    style: "Party",
    price: 280,
    oldPrice: 350,
    tag: "Best Seller",
    rating: 5.0,
    reviewCount: 64,
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=900&q=80",
    hoverImage: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=900&q=80"
    ],
    // EXACT 2 COLORS (Champagne and Emerald)
    colors: [
      { name: "Champagne Pearl", value: "#EADDC7" },
      { name: "Emerald Noir", value: "#0F382E" }
    ],
    sizes: ["X-Small", "Small", "Medium", "Large"],
    description: "Flowing gracefully along the contours of the body, spun from 22-momme Mulberry silk with a luminous satin finish.",
    features: [
      "100% Grade 6A Mulberry Silk",
      "True bias-cut construction for body-contour drape",
      "Adjustable gold-tone strap hardware"
    ],
    inStock: true,
    discount: "-20%"
  },
  {
    id: "women-02",
    title: "Oversized Cashmere Turtleneck Sweater",
    name: "Oversized Cashmere Turtleneck Sweater",
    subtitle: "Ultra-soft 7-gauge Mongolian cashmere",
    category: "Tops",
    gender: "Women",
    subCategory: "Ladies",
    style: "Casual",
    price: 295,
    oldPrice: 380,
    tag: "Exclusive",
    rating: 4.8,
    reviewCount: 39,
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=900&q=80",
    hoverImage: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=900&q=80"
    ],
    // EXACT 1 COLOR (Cream Ecru)
    colors: [
      { name: "Cream Ecru", value: "#F5F2EB" }
    ],
    sizes: ["Small", "Medium", "Large"],
    description: "Knit from 100% sustainably combed Inner Mongolian cashmere, delivering peerless warmth and tactile luxury.",
    features: [
      "100% Grade A Mongolian Cashmere (7-gauge knit)",
      "Ribbed cuffs, hem, and roll collar",
      "Anti-pilling dense yarn twist"
    ],
    inStock: true,
    discount: "-22%"
  },
  {
    id: "women-03",
    title: "Sculpted Hourglass Wool Blazer",
    name: "Sculpted Hourglass Wool Blazer",
    subtitle: "Dramatic cinch waist with peaked satin lapels",
    category: "Tailoring",
    gender: "Women",
    subCategory: "Ladies",
    style: "Formal",
    price: 380,
    oldPrice: 460,
    tag: "Runway Edit",
    rating: 4.9,
    reviewCount: 35,
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=80",
    hoverImage: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80"
    ],
    // EXACT 2 COLORS (Black and Crimson)
    colors: [
      { name: "Midnight Black", value: "#0D0D0D" },
      { name: "Crimson Garnet", value: "#66141F" }
    ],
    sizes: ["X-Small", "Small", "Medium", "Large"],
    description: "Commanding presence defined by bold architectural tailoring. The exaggerated hourglass waist creates an unforgettable couture silhouette.",
    features: [
      "100% Fine Merino Wool",
      "Satin peaked lapels and pocket welts",
      "Full internal horsehair canvas chest piece"
    ],
    inStock: true,
    discount: "-17%"
  },
  {
    id: "women-04",
    title: "Relaxed Pleated Wide-Leg Trousers",
    name: "Relaxed Pleated Wide-Leg Trousers",
    subtitle: "High-waisted wool-linen blend with fluid drape",
    category: "Pants",
    gender: "Women",
    subCategory: "Ladies",
    style: "Formal",
    price: 220,
    oldPrice: 260,
    tag: "Trending",
    rating: 4.7,
    reviewCount: 41,
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=900&q=80",
    hoverImage: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80"
    ],
    // EXACT 1 COLOR (Chalk White)
    colors: [
      { name: "Chalk White", value: "#ECEAE6" }
    ],
    sizes: ["X-Small", "Small", "Medium", "Large"],
    description: "Cut with dramatic double forward pleats and an elongated, relaxed leg, creating an effortless elongated silhouette.",
    features: [
      "60% Virgin Wool, 40% Belgian Linen",
      "Double forward pleat detailing",
      "Internal curtain waistband for slip-free fit"
    ],
    inStock: true,
    discount: "-15%"
  },

  // ==========================================
  // 3. KIDS: BOYS' COLLECTION
  // ==========================================
  {
    id: "boy-01",
    title: "Boys' Breton Striped Long-Sleeve Shirt",
    name: "Boys' Breton Striped Long-Sleeve Shirt",
    subtitle: "100% Organic combed cotton knit with reinforced seams",
    category: "Shirts",
    gender: "Kids",
    subCategory: "Boys",
    style: "Casual",
    price: 52,
    oldPrice: 65,
    tag: "Kids Edit",
    rating: 4.9,
    reviewCount: 28,
    image: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=900&q=80",
    hoverImage: "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=900&q=80"
    ],
    // EXACT 1 COLOR (Navy/White)
    colors: [
      { name: "Nautical Navy", value: "#1A2B44" }
    ],
    sizes: ["4-5Y", "6-7Y", "8-9Y", "10-12Y"],
    description: "Inspired by French maritime knitwear, this breathable organic cotton top offers skin-gentle durability for active play.",
    features: [
      "100% GOTS Certified Organic Cotton",
      "Tagless itch-free neckline",
      "Reinforced twin-needle cuffs",
      "Machine wash safe"
    ],
    inStock: true,
    discount: "-20%"
  },
  {
    id: "boy-02",
    title: "Boys' Classic Indigo Denim Trucker Jacket",
    name: "Boys' Classic Indigo Denim Trucker Jacket",
    subtitle: "Soft-washed 10oz cotton denim with brushed antique brass snaps",
    category: "Jackets",
    gender: "Kids",
    subCategory: "Boys",
    style: "Casual",
    price: 78,
    oldPrice: 95,
    tag: "Junior Heritage",
    rating: 5.0,
    reviewCount: 32,
    image: "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=900&q=80",
    hoverImage: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=900&q=80"
    ],
    // EXACT 1 COLOR (Vintage Denim Blue)
    colors: [
      { name: "Vintage Denim Blue", value: "#385273" }
    ],
    sizes: ["4-5Y", "6-7Y", "8-9Y", "10-12Y"],
    description: "A tailored junior trucker jacket washed for immediate softness, featuring easy-open snap buttons and chest flap pockets.",
    features: [
      "100% Cotton 10oz washed denim",
      "Child-safe smooth snap buttons",
      "Dual hand-warmer welt pockets"
    ],
    inStock: true,
    discount: "-18%"
  },
  {
    id: "boy-03",
    title: "Boys' Cozy Organic Fleece Zip Hoodie",
    name: "Boys' Cozy Organic Fleece Zip Hoodie",
    subtitle: "Heavyweight 360 GSM brushed cotton fleece",
    category: "Tops",
    gender: "Kids",
    subCategory: "Boys",
    style: "Casual",
    price: 64,
    oldPrice: 80,
    tag: "Best Seller",
    rating: 4.8,
    reviewCount: 46,
    image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=900&q=80",
    hoverImage: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=900&q=80"
    ],
    // EXACT 2 COLORS (Heather Grey and Forest Olive)
    colors: [
      { name: "Heather Grey", value: "#8C8C8C" },
      { name: "Forest Olive", value: "#3E4E3A" }
    ],
    sizes: ["4-5Y", "6-7Y", "8-9Y", "10-12Y"],
    description: "Plush organic cotton fleece with ribbed waistband and cuffs. A comfortable layer for school days and outdoor adventures.",
    features: [
      "100% Organic Combed Cotton Fleece",
      "Smooth nylon coil zipper with chin guard",
      "Pre-shrunk fabric"
    ],
    inStock: true,
    discount: "-20%"
  },

  // ==========================================
  // 4. KIDS: GIRLS' COLLECTION
  // ==========================================
  {
    id: "girl-01",
    title: "Girls' Embroidered Broderie Anglaise Dress",
    name: "Girls' Embroidered Broderie Anglaise Dress",
    subtitle: "Pure cotton eyelet lace with soft voile lining",
    category: "Dresses",
    gender: "Kids",
    subCategory: "Girls",
    style: "Party",
    price: 74,
    oldPrice: 92,
    tag: "Girls Edit",
    rating: 5.0,
    reviewCount: 38,
    image: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&w=900&q=80",
    hoverImage: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=900&q=80"
    ],
    // EXACT 2 COLORS (Powder Rose and Cloud White)
    colors: [
      { name: "Powder Rose", value: "#E8B4B8" },
      { name: "Cloud White", value: "#FAF9F6" }
    ],
    sizes: ["3-4Y", "5-6Y", "7-8Y", "9-10Y"],
    description: "Delicately embroidered cotton eyelet twirl dress with flutter cap sleeves and mother-of-pearl back buttons.",
    features: [
      "100% Breathable Cotton Eyelet",
      "Gentle hypoallergenic cotton lining",
      "Full twirl skirt silhouette",
      "Machine wash gentle"
    ],
    inStock: true,
    discount: "-20%"
  },
  {
    id: "girl-02",
    title: "Girls' Ruffle Collar Organic Cotton Blouse",
    name: "Girls' Ruffle Collar Organic Cotton Blouse",
    subtitle: "Lightweight woven cotton poplin with scalloped peter-pan collar",
    category: "Tops",
    gender: "Kids",
    subCategory: "Girls",
    style: "Formal",
    price: 56,
    oldPrice: 70,
    tag: "Chic Junior",
    rating: 4.9,
    reviewCount: 22,
    image: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=900&q=80",
    hoverImage: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=900&q=80"
    ],
    // EXACT 1 COLOR (Ivory White)
    colors: [
      { name: "Ivory White", value: "#FDFDFD" }
    ],
    sizes: ["3-4Y", "5-6Y", "7-8Y", "9-10Y"],
    description: "An elegant French-inspired blouse featuring scalloped ruffle embroidery along the collar and elasticated puff cuffs.",
    features: [
      "100% Organic Cotton Poplin",
      "Hand-finished scalloped embroidery",
      "Breathable and easy to iron"
    ],
    inStock: true,
    discount: "-20%"
  },
  {
    id: "girl-03",
    title: "Girls' Plissé Pleated Chiffon Twirl Skirt",
    name: "Girls' Plissé Pleated Chiffon Twirl Skirt",
    subtitle: "Permanent plissé pleats with glistening lurex elastic waistband",
    category: "Skirts",
    gender: "Kids",
    subCategory: "Girls",
    style: "Party",
    price: 48,
    oldPrice: 60,
    tag: "Party Edit",
    rating: 4.8,
    reviewCount: 31,
    image: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=900&q=80",
    hoverImage: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=900&q=80"
    ],
    // EXACT 2 COLORS (Lilac and Blush)
    colors: [
      { name: "Misty Lilac", value: "#BDB0D0" },
      { name: "Blush Pink", value: "#F4C2C2" }
    ],
    sizes: ["3-4Y", "5-6Y", "7-8Y", "9-10Y"],
    description: "Designed for celebrations and festive occasions. The permanent plissé pleating catches the light during movement.",
    features: [
      "Plissé micro-pleated lightweight chiffon",
      "Soft gold lurex stretch comfort waistband",
      "100% cotton inner modesty lining"
    ],
    inStock: true,
    discount: "-20%"
  },

  // ==========================================
  // 5. ADDITIONAL LADIES' ATELIER EXPANSION
  // ==========================================
  {
    id: "women-05",
    title: "Bias-Cut Mulberry Silk Satin Midi Skirt",
    name: "Bias-Cut Mulberry Silk Satin Midi Skirt",
    subtitle: "Fluid drape satin with a comfortable concealed elastic waistband",
    category: "Skirts",
    gender: "Women",
    subCategory: "Ladies",
    style: "Party",
    price: 165,
    oldPrice: 210,
    tag: "Atelier Classic",
    rating: 4.9,
    reviewCount: 37,
    image: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&w=900&q=80",
    hoverImage: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80"
    ],
    // EXACT 2 COLORS
    colors: [
      { name: "Midnight Noir", value: "#141414" },
      { name: "Champagne Pearl", value: "#EADDC7" }
    ],
    sizes: ["X-Small", "Small", "Medium", "Large"],
    description: "Expertly tailored on the true bias from heavy 22-momme Mulberry silk, gliding effortlessly across the hips.",
    features: [
      "100% Grade 6A Mulberry Silk",
      "Concealed side zipper with French hook",
      "Gentle baby-hem finish"
    ],
    inStock: true,
    discount: "-21%"
  },
  {
    id: "women-06",
    title: "Double-Breasted Camel Wool Belted Trench Coat",
    name: "Double-Breasted Camel Wool Belted Trench Coat",
    subtitle: "Supple double-faced virgin wool with horn buckle and storm flaps",
    category: "Jackets",
    gender: "Women",
    subCategory: "Ladies",
    style: "Formal",
    price: 420,
    oldPrice: 510,
    tag: "Couture Outerwear",
    rating: 5.0,
    reviewCount: 42,
    image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&w=900&q=80",
    hoverImage: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&w=900&q=80"
    ],
    // EXACT 1 COLOR
    colors: [
      { name: "Camel", value: "#C2A684" }
    ],
    sizes: ["Small", "Medium", "Large"],
    description: "An architectural statement coat cut from insulating double-faced virgin wool. Finished with wide notch lapels and belted waist.",
    features: [
      "100% Double-Faced Virgin Wool",
      "Genuine Buffalo horn buttons and buckle",
      "Deep side welt pockets",
      "Dry clean only"
    ],
    inStock: true,
    discount: "-18%"
  },
  {
    id: "women-07",
    title: "Emerald Velvet Sculpted Cocktail Gown",
    name: "Emerald Velvet Sculpted Cocktail Gown",
    subtitle: "Plush silk-blend velvet with structured sweetheart corsetry",
    category: "Dresses",
    gender: "Women",
    subCategory: "Ladies",
    style: "Party",
    price: 340,
    oldPrice: 420,
    tag: "Gala Edit",
    rating: 4.9,
    reviewCount: 29,
    image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=900&q=80",
    hoverImage: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=900&q=80"
    ],
    // EXACT 1 COLOR
    colors: [
      { name: "Royal Emerald", value: "#0F382E" }
    ],
    sizes: ["X-Small", "Small", "Medium", "Large"],
    description: "Designed for grand celebrations, featuring an internal boned bodice and sweeping column silhouette that commands the room.",
    features: [
      "Plush silk-rayon blend velvet with rich sheen",
      "Internal boned corsetry structure",
      "High side split with discreet reinforcement"
    ],
    inStock: true,
    discount: "-19%"
  },
  {
    id: "women-08",
    title: "Organza Puff-Sleeve Silk Blouse",
    name: "Organza Puff-Sleeve Silk Blouse",
    subtitle: "Architectural silk organza sleeves with fine crepe bodice",
    category: "Tops",
    gender: "Women",
    subCategory: "Ladies",
    style: "Formal",
    price: 175,
    oldPrice: 220,
    tag: "Trending",
    rating: 4.8,
    reviewCount: 33,
    image: "https://images.unsplash.com/photo-1604514813560-1e4f5726d600?auto=format&fit=crop&w=900&q=80",
    hoverImage: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1604514813560-1e4f5726d600?auto=format&fit=crop&w=900&q=80"
    ],
    // EXACT 2 COLORS
    colors: [
      { name: "Pure Pearl White", value: "#FFFFFF" },
      { name: "Blush Nude", value: "#F2D6CE" }
    ],
    sizes: ["Small", "Medium", "Large"],
    description: "Romantic dramatic volume rendered in whisper-light sheer silk organza, balanced by a structured high neckline and button cuffs.",
    features: [
      "100% Silk Organza & Crepe",
      "Concealed mother-of-pearl back keyhole",
      "French-seamed internal construction"
    ],
    inStock: true,
    discount: "-20%"
  },

  // ==========================================
  // 6. ADDITIONAL KIDS: BOYS' EXPANSION
  // ==========================================
  {
    id: "boy-04",
    title: "Boys' Tailored Stretch Cotton Chino Trousers",
    name: "Boys' Tailored Stretch Cotton Chino Trousers",
    subtitle: "Durable combed twill with adjustable inner button waistband",
    category: "Pants",
    gender: "Kids",
    subCategory: "Boys",
    style: "Casual",
    price: 52,
    oldPrice: 65,
    tag: "Everyday Essential",
    rating: 4.9,
    reviewCount: 27,
    image: "https://images.unsplash.com/photo-1471286174890-9c112ffca56a?auto=format&fit=crop&w=900&q=80",
    hoverImage: "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1471286174890-9c112ffca56a?auto=format&fit=crop&w=900&q=80"
    ],
    // EXACT 2 COLORS
    colors: [
      { name: "British Khaki", value: "#C3A06B" },
      { name: "Classic Navy", value: "#1C2430" }
    ],
    sizes: ["4-5Y", "6-7Y", "8-9Y", "10-12Y"],
    description: "A tailored chino built for active movement, featuring stretch twill cotton and reinforced knee panels.",
    features: [
      "98% Cotton, 2% Elastane twill",
      "Internal button-elastic size adjuster",
      "Reinforced double-stitch hems"
    ],
    inStock: true,
    discount: "-20%"
  },
  {
    id: "boy-05",
    title: "Boys' 3-Piece Linen-Wool Celebration Suit",
    name: "Boys' 3-Piece Linen-Wool Celebration Suit",
    subtitle: "Tailored blazer, waistcoat, and matching trousers for celebrations",
    category: "Tailoring",
    gender: "Kids",
    subCategory: "Boys",
    style: "Party",
    price: 110,
    oldPrice: 135,
    tag: "Junior Gala",
    rating: 5.0,
    reviewCount: 19,
    image: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=900&q=80",
    hoverImage: "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=900&q=80"
    ],
    // EXACT 1 COLOR
    colors: [
      { name: "Navy Blue", value: "#1A2B44" }
    ],
    sizes: ["4-5Y", "6-7Y", "8-9Y", "10-12Y"],
    description: "An exquisite junior suit tailored with notch lapels, matching buttoned vest, and comfortable trousers.",
    features: [
      "Linen-wool blend breathable fabric",
      "Complete 3-piece set (Jacket, Vest, Pant)",
      "Child-safe soft internal lining"
    ],
    inStock: true,
    discount: "-19%"
  },

  // ==========================================
  // 7. ADDITIONAL KIDS: GIRLS' EXPANSION
  // ==========================================
  {
    id: "girl-04",
    title: "Girls' Floral Smocked Cotton Party Dress",
    name: "Girls' Floral Smocked Cotton Party Dress",
    subtitle: "Hand-smocked floral poplin with delicate flutter cap sleeves",
    category: "Dresses",
    gender: "Kids",
    subCategory: "Girls",
    style: "Party",
    price: 68,
    oldPrice: 85,
    tag: "Best Seller",
    rating: 5.0,
    reviewCount: 35,
    image: "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=900&q=80",
    hoverImage: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=900&q=80"
    ],
    // EXACT 1 COLOR
    colors: [
      { name: "Powder Rose", value: "#E8B4B8" }
    ],
    sizes: ["3-4Y", "5-6Y", "7-8Y", "9-10Y"],
    description: "Crafted with hand-smocked embroidery across the chest, spun from featherweight organic cotton poplin.",
    features: [
      "100% Certified Organic Cotton",
      "Hand-finished smocking embroidery",
      "Button back fastening with self-tie sash"
    ],
    inStock: true,
    discount: "-20%"
  },
  {
    id: "girl-05",
    title: "Girls' Tulle Sparkle Ballerina Twirl Dress",
    name: "Girls' Tulle Sparkle Ballerina Twirl Dress",
    subtitle: "Multi-layered ethereal tulle skirt with metallic star sequins",
    category: "Dresses",
    gender: "Kids",
    subCategory: "Girls",
    style: "Party",
    price: 82,
    oldPrice: 98,
    tag: "Holiday Edit",
    rating: 4.9,
    reviewCount: 28,
    image: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=900&q=80",
    hoverImage: "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=900&q=80"
    ],
    // EXACT 2 COLORS
    colors: [
      { name: "Blush Pink", value: "#F4C2C2" },
      { name: "Starry Cream", value: "#FFFDF6" }
    ],
    sizes: ["3-4Y", "5-6Y", "7-8Y", "9-10Y"],
    description: "Every twirl sparkles with soft multi-layer tulle over soft organic cotton jersey lining.",
    features: [
      "4-layer micro tulle with shimmer star motif",
      "Soft 100% cotton inner slip lining",
      "Anti-scratch gentle neckline"
    ],
    inStock: true,
    discount: "-16%"
  },
  {
    id: "girl-06",
    title: "Girls' Pointelle Knit Scalloped Cardigan",
    name: "Girls' Pointelle Knit Scalloped Cardigan",
    subtitle: "Fine gauge combed cotton pointelle with mother-of-pearl buttons",
    category: "Tops",
    gender: "Kids",
    subCategory: "Girls",
    style: "Casual",
    price: 54,
    oldPrice: 68,
    tag: "Chic Junior",
    rating: 4.8,
    reviewCount: 24,
    image: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=900&q=80",
    hoverImage: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=900&q=80"
    ],
    // EXACT 1 COLOR
    colors: [
      { name: "Vanilla Cream", value: "#F5F2EB" }
    ],
    sizes: ["3-4Y", "5-6Y", "7-8Y", "9-10Y"],
    description: "A lovely layering piece knitted with delicate pointelle lace patterns and scalloped rib trims.",
    features: [
      "100% Combed Breathable Cotton",
      "Australian shell button closures",
      "Machine wash gentle"
    ],
    inStock: true,
    discount: "-21%"
  },

  // ==========================================
  // 8. ADDITIONAL MEN'S EXPANSION
  // ==========================================
  {
    id: "men-06",
    title: "Italian Spread Collar Crisp Cotton Poplin Shirt",
    name: "Italian Spread Collar Crisp Cotton Poplin Shirt",
    subtitle: "120/2 two-ply Italian Thomas Mason cotton poplin",
    category: "Shirts",
    gender: "Men",
    subCategory: "Men",
    style: "Formal",
    price: 155,
    oldPrice: 190,
    tag: "Formal Essential",
    rating: 4.9,
    reviewCount: 39,
    image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=900&q=80",
    hoverImage: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=900&q=80"
    ],
    // EXACT 2 COLORS
    colors: [
      { name: "Optical White", value: "#FFFFFF" },
      { name: "Sky Blue", value: "#A7C7E7" }
    ],
    sizes: ["Small", "Medium", "Large", "X-Large"],
    description: "The quintessential formal dress shirt featuring a spread collar, mitered cuffs, and single-needle tailoring.",
    features: [
      "100% Two-Ply Italian Cotton Poplin 120/2",
      "Reinforced gussets and mother-of-pearl buttons",
      "Wrinkle-resistant luxury finish"
    ],
    inStock: true,
    discount: "-18%"
  },
  {
    id: "men-07",
    title: "Double-Pleated Italian Tropical Wool Trousers",
    name: "Double-Pleated Italian Tropical Wool Trousers",
    subtitle: "High-waist trousers with side adjusters and gentle taper",
    category: "Pants",
    gender: "Men",
    subCategory: "Men",
    style: "Formal",
    price: 210,
    oldPrice: 260,
    tag: "Sartorial",
    rating: 4.9,
    reviewCount: 31,
    image: "https://images.unsplash.com/photo-1479064555552-3ef4979f8908?auto=format&fit=crop&w=900&q=80",
    hoverImage: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1479064555552-3ef4979f8908?auto=format&fit=crop&w=900&q=80"
    ],
    // EXACT 1 COLOR
    colors: [
      { name: "Midnight Navy", value: "#1C2430" }
    ],
    sizes: ["30", "32", "34", "36"],
    description: "Cut with double forward pleats and brass side-buckle tab adjusters for a tailored beltless silhouette.",
    features: [
      "100% Super 120s Italian Tropical Wool",
      "Brass buckle side tab adjusters",
      "Full viscose knee lining"
    ],
    inStock: true,
    discount: "-19%"
  },
  {
    id: "men-08",
    title: "Double-Breasted Heavyweight Wool Overcoat",
    name: "Double-Breasted Heavyweight Wool Overcoat",
    subtitle: "Structured 850 GSM virgin melton wool with peaked lapels",
    category: "Jackets",
    gender: "Men",
    subCategory: "Men",
    style: "Formal",
    price: 450,
    oldPrice: 540,
    tag: "Winter Icon",
    rating: 5.0,
    reviewCount: 46,
    image: "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=900&q=80",
    hoverImage: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=900&q=80"
    ],
    // EXACT 2 COLORS
    colors: [
      { name: "Camel Melange", value: "#C2A684" },
      { name: "Caviar Black", value: "#141414" }
    ],
    sizes: ["Small", "Medium", "Large", "X-Large"],
    description: "A formidable outerwear piece crafted from heavy Italian virgin melton wool with strong roped shoulders.",
    features: [
      "100% Virgin Melton Wool (850 GSM)",
      "Bemberg cupro full inner lining",
      "Deep interior cigar pocket and twin flap pockets"
    ],
    inStock: true,
    discount: "-17%"
  }
];

export const DEPARTMENTS = [
  {
    id: "dept-men",
    title: "Men's Collection",
    subtitle: "Tailored blazers, Egyptian cotton shirts & Japanese denim",
    gender: "Men",
    subCategory: "Men",
    path: "/shop/men",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=80",
    itemCount: "50+ Silhouettes"
  },
  {
    id: "dept-women",
    title: "Ladies' Atelier",
    subtitle: "Mulberry silk gowns, cashmere knits & sculpted outerwear",
    gender: "Women",
    subCategory: "Ladies",
    path: "/shop/women",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80",
    itemCount: "65+ Silhouettes"
  },
  {
    id: "dept-boys",
    title: "Kids: Boys",
    subtitle: "Organic cotton tees, denim jackets & comfortable sets",
    gender: "Kids",
    subCategory: "Boys",
    path: "/shop/boys",
    image: "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=900&q=80",
    itemCount: "25+ Silhouettes"
  },
  {
    id: "dept-girls",
    title: "Kids: Girls",
    subtitle: "Broderie anglaise dresses, pleated skirts & chic tops",
    gender: "Kids",
    subCategory: "Girls",
    path: "/shop/girls",
    image: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&w=900&q=80",
    itemCount: "28+ Silhouettes"
  }
];

export const BRAND_PARTNERS = [
  { name: "CHANEL", origin: "Paris" },
  { name: "GUCCI", origin: "Firenze" },
  { name: "PRADA", origin: "Milano" },
  { name: "SAINT LAURENT", origin: "Paris" },
  { name: "BOTTEGA VENETA", origin: "Vicenza" },
  { name: "BALENCIAGA", origin: "Paris" },
  { name: "JACQUEMUS", origin: "Marseille" },
  { name: "LOEWE", origin: "Madrid" }
];

export const PRESS_TESTIMONIALS = [
  {
    id: "rev-1",
    name: "Camille Laurent",
    role: "Senior Fashion Editor, VOGUE France",
    rating: 5,
    verified: true,
    date: "September 24, 2026",
    comment: "The cut of the virgin wool blazer rivals bespoke Savile Row houses. The drape is effortless and the fabric hand is astonishingly rich."
  },
  {
    id: "rev-2",
    name: "Julian Vance",
    role: "Creative Director, GQ Style",
    rating: 5,
    verified: true,
    date: "September 18, 2026",
    comment: "Finally, an online label that does not compromise on textile weights. The Supima t-shirts and cashmere knits are permanently in my wardrobe."
  },
  {
    id: "rev-3",
    name: "Elena Rostova",
    role: "Verified VIP Client, Zurich",
    rating: 5,
    verified: true,
    date: "September 12, 2026",
    comment: "The silk slip dress arrived in luxurious sustainable packaging within 48 hours. The fit is pure perfection. I ordered two more shades."
  },
  {
    id: "rev-4",
    name: "Marcus Sterling",
    role: "Architect & Collector, New York",
    rating: 5,
    verified: true,
    date: "September 02, 2026",
    comment: "Unmatched attention to micro-details. From pick-stitched lapels to weighted hems, this atelier sets the gold standard for modern luxury."
  }
];

export const FASHION_STYLES = [
  {
    id: "formal",
    name: "Formal Tailoring",
    description: "Peak-lapel virgin wool blazers, silk neckwear, and crisp Egyptian cotton dress shirts.",
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=900&q=80",
    itemCount: "42 Silhouettes",
    path: "/shop?category=tailoring"
  },
  {
    id: "casual",
    name: "Quiet Casual",
    description: "Heavyweight 280 GSM Supima cotton tees, Japanese selvedge denim, and relaxed knitwear.",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80",
    itemCount: "58 Silhouettes",
    path: "/shop?category=casual"
  },
  {
    id: "party",
    name: "Gala & Evening",
    description: "Mulberry satin slip dresses, velvet dinner jackets, and broderie anglaise occasion pieces.",
    image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=900&q=80",
    itemCount: "34 Silhouettes",
    path: "/shop?category=party"
  },
  {
    id: "junior",
    name: "Junior Atelier",
    description: "Crafted for young connoisseurs. Organic cotton staples, miniature denim, and celebration twirl dresses.",
    image: "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=900&q=80",
    itemCount: "53 Silhouettes",
    path: "/shop/kids"
  }
];
