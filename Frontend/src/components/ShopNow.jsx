import React, { useState, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import './ShopNowStyle.css';
// ---------- Categories ----------
const CATEGORIES = [
  { id: "foodDrinks", name: "Food&Drinks", icon: "🍟🍾" },
  { id: "fruitsVegetables", name: "Fruits&Vegetables", icon: "🍎🥕" },
  { id: "wearablesBeauty", name: "Wearables&Beauty", icon: "👕💄" },
  { id: "accessories", name: "Accessories", icon: "👜" },
  { id: "craftsGifts", name: "Crafts&Gifts", icon: "🧵💐" },
  { id: "toolsHardware", name: "Tools&Hardware", icon: "🔧" },
  { id: "homeApplications", name: "Home&Applications", icon: "🏠" },
  { id: "stationery", name: "Stationery", icon: "✏️" },
  { id: "kitchenDining", name: "Kitchen&Dining", icon: "🍴" },
  { id: "scientificEquipment", name: "Scientific Equipment", icon: "🔬" },
  { id: "books", name: "Books", icon: "📚" },
  { id: "electronics", name: "Electronics", icon: "💻" },
  { id: "games", name: "Games", icon: "⚽" },
  { id: "clocks", name: "Clocks", icon: "⏰" },
  { id: "outdoor", name: "Outdoor", icon: "🏕️" },
  { id: "accessibility", name: "Accessibility", icon: "♿" },
  { id: "securityHardware", name: "Security&Hardware", icon: "🔒" },
];

// ---------- Product generation ----------
const CATEGORY_DATA = {
  foodDrinks: {
    base: ["Hot Dog", "Hamburger", "French Fries", "Pizza", "Flatbread", "Sandwich", "Stuffled Flatbread", "Falafel", "Taco", "Burrito","Tamale","GreenSalad","Fondue","Ketchup","Spaghetti","Maggie",
          "Curry Rice","Sushi","Dumpling","Oyster","RiceBall","CookedRice","RiceCracker","Fish Cake with Swirl","FortuneCookies","MoonCake","Oden","Dango","Shaved ice","Cup Ice Cream",
          "Soft Ice Cream","Pie","CupCake","ShortCake","BirthdayCake","Custard","Lollipop","Candy","ChocolateBar","Popcorn","Doughnut","Cookie","Chestnut","Croissant",
          "Bagel","Bread","BaguetteBread","Pretzel","CheeseWedge","Egg","Half-Boiled Egg","Pancake","Waffle","Bacon","Mutton","PoultryLeg","BentoBox","Steaming Bowl","Roasted Sweet Potato","TakeoutBox","Honey",
          "Lobster","Squid","Fried Shrimp","YerbaMate","TankJuice","Beer","Wine","CockTail","Tropical Drink","Champagne","Milk","Iced Coffee","Soup","Sake","Bubble Tea","MilkShake"
        ],
    art: ["🌭", "🍔", "🍟", "🍕", "🫓", "🥪", "🥙", "🧆", "🌮", "🌯","🫔","🥗","🫕","🥫","🍝","🍜","🍛","🥟","🦪","🍤","🍙","🍚","🍘","🍥","🥠","🥮","🍢","🍡","🍧","🍨","🍦","🥧",
          "🧁","🍰","🎂","🍮","🍭","🍬","🍫","🍿","🍩","🍪","🌰","🥐","🥯","🍞","🥖","🥨","🧀","🥚","🍳","🥞","🧇","🥓","🥩","🍗","🍱","🍜","🍠","🥡","🍯","🦞","🦑","🦐",
          "🧉","🧃","🍻","🍷","🍸","🍹","🍾","🥛","☕","🍵","🍶","🧋","🥤"
    ],
    priceRange: [8, 150],
  },
  fruitsVegetables: {
    base: ["RedApple", "Banana", "Orange", "Mango", "Grapes", "Strawberry", "Pineapple", "Watermelon", "Blueberry", "Papaya","GreenApple","Pear","Tangerine","Cherries","Melon",
           "Peach","Kiwi","Lemon","Olive","Tomato","Coconut","Potato","Onion","Carrot","Broccoli","Spinach","Cucumber","Bell Pepper","Aubergine","Mushroom","Avocado",
           "Corn","HotPepper","Garlic","Peanuts","Beans","Ginger","PeaPod","RootVegetable"],
    art: ["🍎", "🍌", "🍊", "🥭", "🍇", "🍓", "🍍", "🍉", "🫐", "🍈","🍏","🍐","🍊","🍒","🍈","🍑","🥝","🍋","🫒","🍅","🥥","🥔","🧅","🥕","🥦","🥬","🥒","🫑","🍆",
          "🍄","🥑","🌽","🌶️","🧄","🥜","🫘","🫚","🫛","🫜"
        ],
    priceRange: [1, 8],
  },
  wearablesBeauty: {
    base: ["Matte Lipstick", "Facial Cleanser", "Hair Serum", "Nail Polish", "Eyeshadow Palette", "Perfume", "Face Mask", "Body Lotion", "Makeup Brush Set",
           "Men's T-Shirt", "Women's Dress", "Denim Jeans", "Winter Jacket", "Casual Shorts", "Formal Shirt", "Yoga Leggings", "Summer Skirt",
           "Lab Coat","Safety Vest","Briefs","NeckTie","Bikini","SwimSuit","Sari","Blouse","Socks","Sneakers","Flip-Flops","Leather Boots","Ballet Flat",
           "High Heels","Slip-On Loafers","Boots","Flats","Wedges","SunHat","TopHat","Baseball Cap","Crown","Safety Helmet","Protection Helmet","Sunglasses","Eyeglasses","Goggles",
           "Silk Scarf","Winter Gloves","Wrist Watch","Ring","Bracelet",
           "Hair Comb","Headscarf","Chef Hat"
    ],
    art: ["💄", "🧼", "💆", "💅", "🎨", "🌸", "🧖", "🧴", "🖌️","👕", "👗", "👖", "🧥", "🩳", "👔","🩱", "👘","🥼","🦺","🩲","👔","👙","🩱","🥻",
          "👚","🧦","👟", "🩴", "🥾","🩰", "👠", "👞","👢","🥿","👡","👒","🎩","🧢","👑","⛑️","🪖","🕶️","👓","🥽", "🧣", "🧤","⌚",
          "💍","📿","🪮","🧕","👨‍🍳"
    ],

    priceRange: [6, 65],
  },
  accessories:{
    base:["Leather Wallet","Handbag","Canvas Backpack","ToteBag","Briefcase","Clutch Bag","Travel Bag","Umbrella",],
    art:["👛", "👜","🎒","🛍️","💼","👝","🧳","🌂"],
    priceRange:[8,67],

  },
  craftsGifts:{
    base:["Yarn","Thread","Sewing Needle","Bouquet","Christmas Tree","Cactus","Rose","Spiral Shell","GiftBox",
          "Balloons","Teddy Bear","Doll","Framed Picture","Magic Wand","Pinata","Confetti Ball","Party Popper",
          "Japanese Dolls","WaterGun","Gift Ribbon","Crystal Ball","Scissors","Paint Brush","Crayons","Safety Pin"
    ],
    art:["🧶","🧵","🪡","💐","🎄","🌵","🌹","🐚","🎁","🎈","🧸","🪆","🖼️","🪄","🪅","🎊","🎉","🎎",
         "🔫","🎀","🔮","✂️","🖌️","🖍️","🧷"
    ],
    priceRange:[9,56],
  },
  toolsHardware:{
    base:["Hook","Ladder","ToolBox","ScrewDriver","Wrench","Hammer","Hammer & Wrench","Pick",
          "Shovel","Carpentry Saw","Nut & Bolt","Gear","Brick","Magnet","Axe","Clamp","Oil Drum"
        ],
    art:["🪝","🪜","🧰","🪛","🔧","🔨","🛠️","⛏️","🪏","🪚","🔩","⚙️","🧱","🧲","🪓","🗜️","🛢️"],
    priceRange:[8,68],
  },
  homeApplications:{
    base:["Funeral Urn","Amphora","Chair","Couch & Lamp","Bed","Mirror","Folding Hand Fan","Wind Chime",
          "Mirror Ball","Bellhop Bell","Door","Diya Lamp","Candle","Shower","Bathtub","Toothbrush","Razor",
          "Trash Bin","Broom","Plunger","Basket","Roll of Paper","Sponge","Bucket"],
    art:["⚱️","🏺","🪑","🛋️","🛏️","🪞","🪭","🎐","🪩","🛎️","🚪","🪔","🕯️","🚿","🛁","🪥","🪒",
         "🗑️","🧹","🪠","🧺","🧻","🧽","🪣"
    ],
    priceRange:[9,79],
  },
  stationery:{
    base:["Card File Box","Calendar","Paper Clips","Clipboard","Triangular Ruler","Ruler","Abacus","Push Pin",
          "Round Push Pin","Pen","Fountain Pen","Pencil","Envelope","Spiral NotePad"],
    art:["🗃️","📅","🖇️","📋","📐","📏","🧮","📌","📍","🖊️","🖋️","✏️","✉️","🗒️"],
    priceRange:[4,29],
  },
  kitchenDining:{
    base:["Spoon","Fork & Knife","Fork, Knife & Plate Set","Bowl & Spoon","Chopsticks","Kitchen Knife"],
    art:["🥄","🍴","🍽️","🥣","🥢","🔪",],
    priceRange:[8,39],
  },
  scientificEquipment:{
    base:["Alembic","Telescope","Microscope","Magnifying Glass","Test Tube","Petri Dish","Thermometer"],
    art:["⚗️","🔭","🔬","🔍","🧪","🧫","🌡️"],
    priceRange:[25,60],
  },
  books: {
    base: ["Dexter","Prison Break", "The Walking Dead", "Harry potter", "Breaking Bad", "Game Of Thrones", 
          "Stranger Things","Mad Men","House Of Cards"
    ],
    art: ["📖", "📗", "📕", "📘", "📙", "📔", "📓", "📒", "📚", "📚"],
    priceRange: [5, 32],
  },
  electronics: {
    base: ["Wireless Earbuds", "Smart Watch", "Bluetooth Speaker", "Laptop", "Gaming Mouse", "Mechanical Keyboard",
           "Power Bank", "Smartphone Case", "Webcam","Laptop Stand","Printer","JoyStick","Mobile Phone","TrackBall",
           "Computer Disk","Floppy Disk","Optical Disk","DVD","Videocassette","Video Camera","Movie Camera",
           "Film Projector","Film Frames","Telephone","Pager","Fax Machine","Television","Radio","Studio Microphone",
           "Level Slider","Control Knobs","TV Antenna","Flashlight","Light Bulb","Electric Plug"
    ],
    art: ["🎧", "⌚", "🔊", "💻", "🖱️", "⌨️", "🔋", "📱", "📷", "🖥️","🖨️","🕹️","📲","🖲️","💽","💾","💿","📀",
          "📼","📹","🎥","📽️","🎞️","☎️","📟","📠","📺","📻","🎙️","🎚️","🎛️","📡","🔦","💡","🔌"
        ],
    priceRange: [15, 220],
  },
  games: {
    base: ["Cricket Bat", "Yoga Mat", "Basketball", "Tennis Racket", "Dumbbell Set", "Soccerball", "Skipping Rope", "Resistance Bands", "Badminton Racket", "Cycling Helmet",
           "AmericanFootball","BaseBall","SoftBall","VolleyBall","RugbyFootball","FlyingDisc","Pool 8 Ball","Yo-Yo","Ping Pong","IceHockey","FieldHockey","Lacrosse","Boomerang",
           "GoalNet","GolfFlag","Kite","Playground Slide","Bow&Arrow","Fishing Pole","Swimming Mask","Boxing Glove","Martial Arts Uniform","Running Shirt","Skateboard","Rollerskate",
           "Sled","IceSkate","CurlingStone","Skis","SnowBoard","Parachute","Fencing Tool","HandBall","Golf Bat","Surfing board","Water Polo Ball","Rowing Boat","Climbing Rope","Biking Vehicle",
           "Juggling Ball","Circus Tent","Performance Mask","Ballet Shoes","Artist Palette","Clapper Board","Microphone","Musical Keyboard","Maracas","Drum","Long Drum","Saxophone","Trumpet",
           "Accordion","Guitar","Postal Horn","Banjo","Harp","Violin","Flute","Game Die","Chess Board","Archery Hit","Bowling","Video game Controller","Slot Machine","Puzzle","Trophy","1st Place Medal",
           "2nd Place Medal","3rd Place Medal","Sports Medal","Participation Medal","Rosette","Ribbon","JoyStick","Rummy Cards"," Mahjong Red Dragon"
    ],
    art: ["🏏", "🧘", "🏀", "🎾", "🏋️", "⚽", "🪢", "💪", "🏸", "🚴","🏈","⚾","🥎","🏐","🏉","🥏","🎱","🪀","🏓","🏒","🏑","🥍","🪃","🥅","⛳","🪁","🛝","🏹","🎣",
          "🤿","🥊","🥋","🎽","🛹","🛼","🛷","⛸️","🥌","🎿","🏂","🪂","🤺","🤾","🏌️","🏄","🤽","🚣","🧗","🚵","🤹","🎪","🎭","🩰","🎨","🎬","🎤","🎹","🪇","🥁","🪘",
          "🎷","🎺","🪗","🎸","📯","🪕","🪉","🎻","🪈","🎲","♟️","🎯","🎳","🎮","🎰","🧩","🏆","🥇","🥈","🥉","🏅","🎖️","🏵️","🎗️","🕹️","🃏","🀄"
    ],
    priceRange: [8, 110],
  },
  clocks:{
    base:["Mantelpiece Clock","Alarm Clock","Timer Clock","Stopwatch","Hourglass"],
    art:["🕰️","⏰","⏲️","⏱️","⏳"],
    priceRange:[12,19],
  },
  outdoor:{
    base:["Anchor","Ring Buoy","Lantern","Kick Scooter","Bicycle","Tent","Compass"],
    art:["⚓","🛟","🏮","🛴","🚲","⛺","🧭"],
    priceRange:[9,34],
  },
  accessibility:{
    base:["Manual Wheelchair","Motorized Wheelchair","Crutch","White Cane"],
    art:["🦽","🦼","🩼","🦯"],
    priceRange:[45,65],
  },
  securityHardware:{
    base:["Mouse Trap","Chains","Dagger","Lock Set","Fire Extinguisher"],
    art:["🪤","⛓️","🗡️","🔐","🧯"],
    priceRange:[8,23],
  },
};
function generateCategoryProducts(catId) {
  const { base, art, priceRange } = CATEGORY_DATA[catId];
  const [min, max] = priceRange;
  const products = [];

  for (let i = 0; i < base.length; i++) {
    const baseName = base[i];
    const spread = ((i * 37) % 100) / 100;
    const price = Math.round((min + spread * (max - min)) * 100) / 100;

    products.push({
      id: `${catId}${i + 1}`,
      name: baseName,
      cat: catId,
      price, // stored in USD internally; converted for display
      art: art[i],
    });
  }

  return products;
}

// ---------- Products ----------
const PRODUCTS = CATEGORIES.flatMap((c) => generateCategoryProducts(c.id));
const TAX_RATE = 0.05;
const SHIPPING_FLAT = 4.99;
const FREE_SHIP_THRESHOLD = 50;

const COUPONS = {
  SAVE10: { percent: 10 },
  WELCOME20: { percent: 20 },
  FREESHIP: { freeShip: true },
};

const ORDER_STEPS = ["Placed", "Packed", "Shipped", "Out for Delivery", "Delivered"];

const PAYMENT_METHODS = [
  { id: "card", label: "💳 Credit / Debit Card" },
  { id: "upi", label: "📱 UPI" },
  { id: "cod", label: "💵 Cash on Delivery" },
];

const REWARDS_CATALOG = [
  { points: 100, label: "$5 off your next order" },
  { points: 200, label: "$12 off your next order" },
  { points: 500, label: "Free premium shipping for a month" },
];

const FAQ_ITEMS = [
  { q: "How do I track my order?", a: "Go to My Orders and tap Track Order on any order to see its live status." },
  { q: "What is your return policy?", a: "Items can be returned within 30 days of delivery for a full refund." },
  { q: "How do I apply a coupon?", a: "Enter your code in the cart before checkout and tap Apply." },
  { q: "How do rewards points work?", a: "You earn 1 point per dollar spent. Redeem points for discounts in the Rewards panel." },
];

// ---------- Languages ----------
// A broad set of the world's major languages (ISO 639-1 style codes).
// Full UI translation is provided for a core set (see TRANSLATIONS below);
// any language not in that set automatically falls back to English text.
const LANGUAGES = [
  { code: "en", name: "English" }, { code: "es", name: "Español" }, { code: "fr", name: "Français" },
  { code: "de", name: "Deutsch" }, { code: "it", name: "Italiano" }, { code: "pt", name: "Português" },
  { code: "nl", name: "Nederlands" }, { code: "ru", name: "Русский" }, { code: "zh", name: "中文" },
  { code: "ja", name: "日本語" }, { code: "ko", name: "한국어" }, { code: "ar", name: "العربية" },
  { code: "hi", name: "हिन्दी" }, { code: "bn", name: "বাংলা" }, { code: "pa", name: "ਪੰਜਾਬੀ" },
  { code: "ur", name: "اردو" }, { code: "ta", name: "தமிழ்" }, { code: "te", name: "తెలుగు" },
  { code: "mr", name: "मराठी" }, { code: "gu", name: "ગુજરાતી" }, { code: "kn", name: "ಕನ್ನಡ" },
  { code: "ml", name: "മലയാളം" }, { code: "th", name: "ไทย" }, { code: "vi", name: "Tiếng Việt" },
  { code: "id", name: "Bahasa Indonesia" }, { code: "ms", name: "Bahasa Melayu" }, { code: "tl", name: "Filipino" },
  { code: "tr", name: "Türkçe" }, { code: "fa", name: "فارسی" }, { code: "he", name: "עברית" },
  { code: "pl", name: "Polski" }, { code: "uk", name: "Українська" }, { code: "cs", name: "Čeština" },
  { code: "sk", name: "Slovenčina" }, { code: "hu", name: "Magyar" }, { code: "ro", name: "Română" },
  { code: "bg", name: "Български" }, { code: "el", name: "Ελληνικά" }, { code: "sv", name: "Svenska" },
  { code: "no", name: "Norsk" }, { code: "da", name: "Dansk" }, { code: "fi", name: "Suomi" },
  { code: "is", name: "Íslenska" }, { code: "et", name: "Eesti" }, { code: "lv", name: "Latviešu" },
  { code: "lt", name: "Lietuvių" }, { code: "hr", name: "Hrvatski" }, { code: "sr", name: "Српски" },
  { code: "sl", name: "Slovenščina" }, { code: "bs", name: "Bosanski" }, { code: "mk", name: "Македонски" },
  { code: "sq", name: "Shqip" }, { code: "af", name: "Afrikaans" }, { code: "sw", name: "Kiswahili" },
  { code: "am", name: "አማርኛ" }, { code: "ha", name: "Hausa" }, { code: "yo", name: "Yorùbá" },
  { code: "ig", name: "Igbo" }, { code: "zu", name: "isiZulu" }, { code: "xh", name: "isiXhosa" },
  { code: "so", name: "Soomaali" }, { code: "om", name: "Afaan Oromoo" }, { code: "rw", name: "Kinyarwanda" },
  { code: "ny", name: "Chichewa" }, { code: "sn", name: "chiShona" }, { code: "st", name: "Sesotho" },
  { code: "mg", name: "Malagasy" }, { code: "ka", name: "ქართული" }, { code: "hy", name: "Հայերեն" },
  { code: "az", name: "Azərbaycan" }, { code: "kk", name: "Қазақша" }, { code: "uz", name: "Oʻzbekcha" },
  { code: "tg", name: "Тоҷикӣ" }, { code: "ky", name: "Кыргызча" }, { code: "tk", name: "Türkmençe" },
  { code: "mn", name: "Монгол" }, { code: "ne", name: "नेपाली" }, { code: "si", name: "සිංහල" },
  { code: "my", name: "မြန်မာ" }, { code: "km", name: "ខ្មែរ" }, { code: "lo", name: "ລາວ" },
  { code: "ps", name: "پښتو" }, { code: "ku", name: "Kurdî" }, { code: "sd", name: "سنڌي" },
  { code: "gl", name: "Galego" }, { code: "ca", name: "Català" }, { code: "eu", name: "Euskara" },
  { code: "cy", name: "Cymraeg" }, { code: "ga", name: "Gaeilge" }, { code: "gd", name: "Gàidhlig" },
  { code: "mt", name: "Malti" }, { code: "lb", name: "Lëtzebuergesch" }, { code: "fo", name: "Føroyskt" },
  { code: "haw", name: "ʻŌlelo Hawaiʻi" }, { code: "mi", name: "Māori" }, { code: "sm", name: "Gagana Samoa" },
  { code: "to", name: "Lea Fakatonga" }, { code: "fj", name: "Vosa Vakaviti" }, { code: "qu", name: "Runa Simi" },
  { code: "gn", name: "Guaraní" }, { code: "ay", name: "Aymar aru" }, { code: "ht", name: "Kreyòl Ayisyen" },
  { code: "jv", name: "Basa Jawa" }, { code: "su", name: "Basa Sunda" }, { code: "ceb", name: "Cebuano" },
  { code: "co", name: "Corsu" }, { code: "eo", name: "Esperanto" }, { code: "la", name: "Latina" },
  { code: "yi", name: "ייִדיש" },
];

//const RTL_LANGS = ["ar", "he", "fa", "ur", "ps", "sd"];

// Core UI translation packs. Any key/language missing here falls back to English.


// ---------- Currencies ----------
// ISO 4217 world currencies with static, approximate demo conversion rates
// (units per 1 USD). These are illustrative only, not live exchange rates —
// wire this up to a real FX API for production use.
const CURRENCIES = {
  USD:{name:"US Dollar",rate:1}, EUR:{name:"Euro",rate:0.92}, GBP:{name:"British Pound",rate:0.79},
  JPY:{name:"Japanese Yen",rate:151}, CNY:{name:"Chinese Yuan",rate:7.24}, INR:{name:"Indian Rupee",rate:83.3},
  AUD:{name:"Australian Dollar",rate:1.52}, CAD:{name:"Canadian Dollar",rate:1.36}, CHF:{name:"Swiss Franc",rate:0.88},
  HKD:{name:"Hong Kong Dollar",rate:7.82}, SGD:{name:"Singapore Dollar",rate:1.35}, SEK:{name:"Swedish Krona",rate:10.4},
  NOK:{name:"Norwegian Krone",rate:10.6}, DKK:{name:"Danish Krone",rate:6.88}, NZD:{name:"New Zealand Dollar",rate:1.64},
  KRW:{name:"South Korean Won",rate:1330}, MXN:{name:"Mexican Peso",rate:17.0}, BRL:{name:"Brazilian Real",rate:5.05},
  ZAR:{name:"South African Rand",rate:18.7}, RUB:{name:"Russian Ruble",rate:92.0}, TRY:{name:"Turkish Lira",rate:32.1},
  AED:{name:"UAE Dirham",rate:3.67}, SAR:{name:"Saudi Riyal",rate:3.75}, ILS:{name:"Israeli Shekel",rate:3.72},
  PLN:{name:"Polish Zloty",rate:3.98}, THB:{name:"Thai Baht",rate:35.9}, IDR:{name:"Indonesian Rupiah",rate:15750},
  MYR:{name:"Malaysian Ringgit",rate:4.72}, PHP:{name:"Philippine Peso",rate:56.2}, VND:{name:"Vietnamese Dong",rate:24500},
  EGP:{name:"Egyptian Pound",rate:47.5}, NGN:{name:"Nigerian Naira",rate:1450}, KES:{name:"Kenyan Shilling",rate:129},
  GHS:{name:"Ghanaian Cedi",rate:14.7}, PKR:{name:"Pakistani Rupee",rate:278}, BDT:{name:"Bangladeshi Taka",rate:110},
  LKR:{name:"Sri Lankan Rupee",rate:300}, NPR:{name:"Nepalese Rupee",rate:133}, MMK:{name:"Myanmar Kyat",rate:2100},
  KHR:{name:"Cambodian Riel",rate:4100}, LAK:{name:"Lao Kip",rate:21600}, MNT:{name:"Mongolian Togrog",rate:3450},
  KZT:{name:"Kazakhstani Tenge",rate:445}, UZS:{name:"Uzbekistani Som",rate:12700}, AZN:{name:"Azerbaijani Manat",rate:1.70},
  GEL:{name:"Georgian Lari",rate:2.66}, AMD:{name:"Armenian Dram",rate:387}, UAH:{name:"Ukrainian Hryvnia",rate:39.5},
  RON:{name:"Romanian Leu",rate:4.57}, BGN:{name:"Bulgarian Lev",rate:1.80}, CZK:{name:"Czech Koruna",rate:22.9},
  HUF:{name:"Hungarian Forint",rate:358}, ISK:{name:"Icelandic Krona",rate:137}, ALL:{name:"Albanian Lek",rate:92},
  MKD:{name:"Macedonian Denar",rate:56.5}, RSD:{name:"Serbian Dinar",rate:107.9}, BAM:{name:"Bosnia-Herzegovina Mark",rate:1.80},
  MDL:{name:"Moldovan Leu",rate:17.7}, BYN:{name:"Belarusian Ruble",rate:3.27}, QAR:{name:"Qatari Riyal",rate:3.64},
  KWD:{name:"Kuwaiti Dinar",rate:0.307}, BHD:{name:"Bahraini Dinar",rate:0.377}, OMR:{name:"Omani Rial",rate:0.385},
  JOD:{name:"Jordanian Dinar",rate:0.709}, LBP:{name:"Lebanese Pound",rate:89500}, IQD:{name:"Iraqi Dinar",rate:1310},
  YER:{name:"Yemeni Rial",rate:250}, SYP:{name:"Syrian Pound",rate:13000}, LYD:{name:"Libyan Dinar",rate:4.85},
  TND:{name:"Tunisian Dinar",rate:3.11}, DZD:{name:"Algerian Dinar",rate:134.5}, MAD:{name:"Moroccan Dirham",rate:9.95},
  ETB:{name:"Ethiopian Birr",rate:57.0}, TZS:{name:"Tanzanian Shilling",rate:2600}, UGX:{name:"Ugandan Shilling",rate:3800},
  RWF:{name:"Rwandan Franc",rate:1330}, ZMW:{name:"Zambian Kwacha",rate:26.5}, MWK:{name:"Malawian Kwacha",rate:1740},
  MZN:{name:"Mozambican Metical",rate:63.9}, AOA:{name:"Angolan Kwanza",rate:830}, XOF:{name:"West African CFA Franc",rate:610},
  XAF:{name:"Central African CFA Franc",rate:610}, BWP:{name:"Botswana Pula",rate:13.6}, NAD:{name:"Namibian Dollar",rate:18.7},
  SZL:{name:"Swazi Lilangeni",rate:18.7}, LSL:{name:"Lesotho Loti",rate:18.7}, MUR:{name:"Mauritian Rupee",rate:46.0},
  SCR:{name:"Seychellois Rupee",rate:13.6}, MGA:{name:"Malagasy Ariary",rate:4500}, DJF:{name:"Djiboutian Franc",rate:178},
  SOS:{name:"Somali Shilling",rate:570}, SDG:{name:"Sudanese Pound",rate:601}, SSP:{name:"South Sudanese Pound",rate:1300},
  ERN:{name:"Eritrean Nakfa",rate:15.0}, GMD:{name:"Gambian Dalasi",rate:68.5}, GNF:{name:"Guinean Franc",rate:8600},
  LRD:{name:"Liberian Dollar",rate:193}, SLL:{name:"Sierra Leonean Leone",rate:22700}, CVE:{name:"Cape Verdean Escudo",rate:101.5},
  STN:{name:"São Tomé Dobra",rate:22.4}, KMF:{name:"Comorian Franc",rate:452}, BIF:{name:"Burundian Franc",rate:2870},
  XPF:{name:"CFP Franc",rate:110.3}, FJD:{name:"Fijian Dollar",rate:2.27}, PGK:{name:"Papua New Guinean Kina",rate:3.85},
  SBD:{name:"Solomon Islands Dollar",rate:8.45}, TOP:{name:"Tongan Paʻanga",rate:2.36}, WST:{name:"Samoan Tala",rate:2.75},
  VUV:{name:"Vanuatu Vatu",rate:119}, TWD:{name:"Taiwan Dollar",rate:32.1}, MOP:{name:"Macanese Pataca",rate:8.06},
  BND:{name:"Brunei Dollar",rate:1.35}, XCD:{name:"East Caribbean Dollar",rate:2.70}, BBD:{name:"Barbadian Dollar",rate:2.00},
  BSD:{name:"Bahamian Dollar",rate:1.00}, BZD:{name:"Belize Dollar",rate:2.02}, BMD:{name:"Bermudian Dollar",rate:1.00},
  KYD:{name:"Cayman Islands Dollar",rate:0.833}, JMD:{name:"Jamaican Dollar",rate:156}, TTD:{name:"Trinidad & Tobago Dollar",rate:6.78},
  GYD:{name:"Guyanese Dollar",rate:209}, SRD:{name:"Surinamese Dollar",rate:32.9}, HTG:{name:"Haitian Gourde",rate:132},
  DOP:{name:"Dominican Peso",rate:59.0}, CUP:{name:"Cuban Peso",rate:24.0}, ANG:{name:"Netherlands Antillean Guilder",rate:1.79},
  AWG:{name:"Aruban Florin",rate:1.79}, HNL:{name:"Honduran Lempira",rate:24.7}, GTQ:{name:"Guatemalan Quetzal",rate:7.78},
  NIO:{name:"Nicaraguan Córdoba",rate:36.8}, CRC:{name:"Costa Rican Colón",rate:520}, PAB:{name:"Panamanian Balboa",rate:1.00},
  COP:{name:"Colombian Peso",rate:3900}, PEN:{name:"Peruvian Sol",rate:3.75}, BOB:{name:"Bolivian Boliviano",rate:6.91},
  PYG:{name:"Paraguayan Guarani",rate:7300}, UYU:{name:"Uruguayan Peso",rate:39.0}, ARS:{name:"Argentine Peso",rate:880},
  CLP:{name:"Chilean Peso",rate:940}, VES:{name:"Venezuelan Bolívar",rate:36.5}, FKP:{name:"Falkland Islands Pound",rate:0.79},
  GIP:{name:"Gibraltar Pound",rate:0.79}, SHP:{name:"Saint Helena Pound",rate:0.79}, IRR:{name:"Iranian Rial",rate:42000},
  AFN:{name:"Afghan Afghani",rate:70.5}, TJS:{name:"Tajikistani Somoni",rate:10.9}, KGS:{name:"Kyrgystani Som",rate:89.0},
  TMT:{name:"Turkmenistani Manat",rate:3.50}, KPW:{name:"North Korean Won",rate:900},
};

function findProduct(id) {
  return PRODUCTS.find((p) => p.id === id);
}
function initialsOf(name) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

const CSS = `
`;

export default function ShopNowApp({ onLogout } = {}) {
  const { t: i18nT, i18n } = useTranslation();
  const navigate = useNavigate();

  // ---------- core shop state ----------
  const [activeCategory, setActiveCategory] = useState("all");
  const [cart, setCart] = useState({});
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [toast, setToast] = useState("");
  const [justAdded, setJustAdded] = useState(null);

  const toastTimer = useRef(null);
  const addedTimer = useRef(null);

  // ---------- search / filters ----------
  const [searchQuery, setSearchQuery] = useState("");
  const [priceFilter, setPriceFilter] = useState("all");
  const [sortBy, setSortBy] = useState("relevance");

  const PAGE_SIZE = 24;
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  // ---------- theme ----------
  const [darkMode, setDarkMode] = useState(false);

  // ---------- language / currency ----------
  const [langOpen, setLangOpen] = useState(false);
  const [langSearch, setLangSearch] = useState("");

  const [currency, setCurrency] = useState("USD");
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const [currencySearch, setCurrencySearch] = useState("");

  // ---------- profile / account ----------
  const [user, setUser] = useState({
    name: "Guest User",
    email: "guest@shopnow.com",
    avatar: null,
  });

  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const avatarInputRef = useRef(null);

  // ---------- side panel ----------
  const [activePanel, setActivePanel] = useState(null);

  // ---------- notifications ----------
  const [notifOpen, setNotifOpen] = useState(false);

  const [notifications, setNotifications] = useState([
    {
      id: "n1",
      msg: "Welcome to ShopNow! Enjoy 10% off with code SAVE10.",
      read: false,
    },
    {
      id: "n2",
      msg: "Items are waiting in your wishlist.",
      read: false,
    },
    {
      id: "n3",
      msg: "Free shipping on orders over $50.",
      read: true,
    },
  ]);

  // ---------- wishlist ----------
  const [wishlist, setWishlist] = useState({});

  // ---------- orders ----------
  const [orders, setOrders] = useState([]);
  const [trackingOrder, setTrackingOrder] = useState(null);

  // ---------- addresses ----------
  const [addresses, setAddresses] = useState([
    {
      id: "a1",
      label: "Home",
      line: "221B Baker Street",
      city: "Springfield",
      zip: "12345",
      phone: "9999999999",
    },
  ]);

  const [selectedAddressId, setSelectedAddressId] = useState("a1");
  const [showAddressForm, setShowAddressForm] = useState(false);

  const [addressDraft, setAddressDraft] = useState({
    label: "",
    line: "",
    city: "",
    zip: "",
    phone: "",
  });

  // ---------- payment ----------
  const [paymentMethod, setPaymentMethod] = useState("card");

  // ---------- rewards ----------
  const [rewardsPoints, setRewardsPoints] = useState(120);

  // ---------- coupon ----------
  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  // ---------- settings ----------
  const [notifEnabled, setNotifEnabled] = useState(true);

  // ---------- support ----------
  const [openFaq, setOpenFaq] = useState(null);
  const [supportMsg, setSupportMsg] = useState("");

  // =====================================================
  // i18n
  // =====================================================

  const currentLanguage = i18n.language?.split("-")[0] || "en";

  const RTL_LANGS = ["ar", "ur", "fa", "he", "ps", "sd"];

  const isRTL = RTL_LANGS.includes(currentLanguage);

  function t(key, options) {
    return i18nT(key, options);
  }

  // =====================================================
  // LANGUAGE CHANGE
  // =====================================================

  async function changeLanguage(code) {
    try {
      await i18n.changeLanguage(code);

      setLangOpen(false);
      setLangSearch("");

      showToast(
        `${LANGUAGES.find((l) => l.code === code)?.name || code} selected`
      );
    } catch (error) {
      console.error("Language change failed:", error);
      showToast("Unable to change language");
    }
  }

  // =====================================================
  // CURRENCY
  // =====================================================

  function formatMoney(usdAmount) {
    const rate = CURRENCIES[currency]?.rate ?? 1;
    const converted = usdAmount * rate;

    try {
      return new Intl.NumberFormat(undefined, {
        style: "currency",
        currency,
        maximumFractionDigits: converted >= 1000 ? 0 : 2,
      }).format(converted);
    } catch {
      return `${currency} ${converted.toFixed(2)}`;
    }
  }

  // =====================================================
  // LANGUAGE SEARCH
  // =====================================================

  const filteredLanguages = useMemo(() => {
    const q = langSearch.trim().toLowerCase();

    if (!q) return LANGUAGES;

    return LANGUAGES.filter(
      (l) =>
        l.name.toLowerCase().includes(q) ||
        l.code.toLowerCase().includes(q)
    );
  }, [langSearch]);

  // =====================================================
  // CURRENCY SEARCH
  // =====================================================

  const filteredCurrencies = useMemo(() => {
    const q = currencySearch.trim().toLowerCase();

    const list = Object.entries(CURRENCIES).map(([code, value]) => ({
      code,
      ...value,
    }));

    if (!q) return list;

    return list.filter(
      (c) =>
        c.code.toLowerCase().includes(q) ||
        c.name.toLowerCase().includes(q)
    );
  }, [currencySearch]);

  // =====================================================
  // DERIVED PRODUCTS
  // =====================================================

  const filteredProducts = useMemo(() => {
    let list =
      activeCategory === "all"
        ? PRODUCTS
        : PRODUCTS.filter((p) => p.cat === activeCategory);

    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();

      list = list.filter((p) =>
        p.name.toLowerCase().includes(q)
      );
    }

    if (priceFilter === "under20") {
      list = list.filter((p) => p.price < 20);
    } else if (priceFilter === "20to50") {
      list = list.filter(
        (p) => p.price >= 20 && p.price <= 50
      );
    } else if (priceFilter === "above50") {
      list = list.filter((p) => p.price > 50);
    }

    list = [...list];

    if (sortBy === "price-asc") {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === "name") {
      list.sort((a, b) => a.name.localeCompare(b.name));
    }

    return list;
  }, [
    activeCategory,
    searchQuery,
    priceFilter,
    sortBy,
  ]);

  const displayedProducts = filteredProducts.slice(
    0,
    visibleCount
  );

  // =====================================================
  // CART
  // =====================================================

  const entries = useMemo(
    () =>
      Object.entries(cart)
        .map(([id, qty]) => {
          const product = findProduct(id);

          if (!product) return null;

          return {
            ...product,
            qty,
          };
        })
        .filter(Boolean),
    [cart]
  );

  const cartCount = entries.reduce(
    (sum, item) => sum + item.qty,
    0
  );

  const subtotal = entries.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const couponDiscount = appliedCoupon?.percent
    ? (subtotal * appliedCoupon.percent) / 100
    : 0;

  const discountedSubtotal = Math.max(
    0,
    subtotal - couponDiscount
  );

  const shipping =
    entries.length === 0
      ? 0
      : appliedCoupon?.freeShip ||
        discountedSubtotal >= FREE_SHIP_THRESHOLD
      ? 0
      : SHIPPING_FLAT;

  const tax = discountedSubtotal * TAX_RATE;

  const total =
    discountedSubtotal +
    shipping +
    tax;

  // =====================================================
  // RECOMMENDATIONS
  // =====================================================

  const recommended = useMemo(() => {
    const interestCats = new Set([
      ...entries.map((e) => e.cat),

      ...Object.keys(wishlist)
        .map((id) => findProduct(id)?.cat)
        .filter(Boolean),
    ]);

    let pool = PRODUCTS.filter(
      (p) =>
        interestCats.has(p.cat) &&
        !cart[p.id]
    );

    if (pool.length < 4) {
      const extra = PRODUCTS.filter(
        (p) =>
          !pool.includes(p) &&
          !cart[p.id]
      );

      pool = [...pool, ...extra];
    }

    return pool.slice(0, 4);
  }, [cart, wishlist, entries]);

  const unreadCount = notifEnabled
    ? notifications.filter((n) => !n.read).length
    : 0;

  // =====================================================
  // TOAST
  // =====================================================

  function showToast(msg) {
    setToast(msg);

    if (toastTimer.current) {
      clearTimeout(toastTimer.current);
    }

    toastTimer.current = setTimeout(() => {
      setToast("");
    }, 2200);
  }

  // =====================================================
  // OVERLAYS
  // =====================================================

  function closeAllOverlays() {
    setDrawerOpen(false);
    setActivePanel(null);
    setProfileMenuOpen(false);
    setNotifOpen(false);
    setLangOpen(false);
    setCurrencyOpen(false);
  }

  function openPanel(name) {
    setActivePanel(name);
    setDrawerOpen(false);
    setProfileMenuOpen(false);
    setNotifOpen(false);
    setLangOpen(false);
    setCurrencyOpen(false);
  }

  function toggleDrawer(open) {
    setDrawerOpen(open);

    if (open) {
      setActivePanel(null);
      setProfileMenuOpen(false);
      setNotifOpen(false);
      setLangOpen(false);
      setCurrencyOpen(false);
    }
  }

  // =====================================================
  // CART FUNCTIONS
  // =====================================================

  function filterCategory(catId) {
    setActiveCategory(catId);
    setVisibleCount(PAGE_SIZE);
  }

  function addToCart(id) {
    const product = findProduct(id);

    if (!product) return;

    setCart((current) => ({
      ...current,
      [id]: (current[id] || 0) + 1,
    }));

    showToast(`${product.name} added to cart`);

    setJustAdded(id);

    if (addedTimer.current) {
      clearTimeout(addedTimer.current);
    }

    addedTimer.current = setTimeout(() => {
      setJustAdded(null);
    }, 800);
  }

  function changeQty(id, delta) {
    setCart((current) => {
      if (!current[id]) return current;

      const next = {
        ...current,
      };

      next[id] += delta;

      if (next[id] <= 0) {
        delete next[id];
      }

      return next;
    });
  }

  function removeLine(id) {
    setCart((current) => {
      const next = {
        ...current,
      };

      delete next[id];

      return next;
    });
  }

  // =====================================================
  // WISHLIST
  // =====================================================

  function toggleWishlist(id) {
    setWishlist((current) => {
      const next = {
        ...current,
      };

      if (next[id]) {
        delete next[id];
        showToast("Removed from wishlist");
      } else {
        next[id] = true;
        showToast("Added to wishlist");
      }

      return next;
    });
  }

  // =====================================================
  // COUPON
  // =====================================================

  function applyCoupon() {
    const code = couponInput.trim().toUpperCase();
    const found = COUPONS[code];

    if (!found) {
      showToast("Invalid coupon code");
      return;
    }

    setAppliedCoupon({
      code,
      ...found,
    });

    showToast(`Coupon applied: ${code}`);
  }

  function removeCoupon() {
    setAppliedCoupon(null);
    setCouponInput("");
  }

  // =====================================================
  // PAYMENT
  // =====================================================

  function goToPayment() {
    if (entries.length === 0) {
      showToast("Your cart is empty");
      return;
    }

    openPanel("payment");
  }

  function confirmPayment() {
    const newOrder = {
      id:
        "ORD" +
        Date.now()
          .toString()
          .slice(-6),

      date: new Date().toLocaleDateString(),

      items: entries.map((e) => ({
        name: e.name,
        qty: e.qty,
      })),

      total,
      status: 0,
    };

    setOrders((current) => [
      newOrder,
      ...current,
    ]);

    setRewardsPoints(
      (points) =>
        points + Math.floor(total)
    );

    setCart({});
    setAppliedCoupon(null);
    setCouponInput("");
    setActivePanel(null);

    showToast(
      "Order placed — thank you for shopping with ShopNow!"
    );
  }

  // =====================================================
  // ORDER TRACKING
  // =====================================================

  function advanceTracking() {
    if (!trackingOrder) return;

    const nextStatus = Math.min(
      trackingOrder.status + 1,
      ORDER_STEPS.length - 1
    );

    setOrders((current) =>
      current.map((order) =>
        order.id === trackingOrder.id
          ? {
              ...order,
              status: nextStatus,
            }
          : order
      )
    );

    setTrackingOrder((current) => ({
      ...current,
      status: nextStatus,
    }));
  }

  // =====================================================
  // ADDRESS
  // =====================================================

  function saveAddress() {
    if (
      !addressDraft.line ||
      !addressDraft.city
    ) {
      showToast(
        "Fill in address and city"
      );
      return;
    }

    const id =
      "a" + Date.now();

    setAddresses((current) => [
      ...current,
      {
        id,
        ...addressDraft,
      },
    ]);

    setSelectedAddressId(id);

    setAddressDraft({
      label: "",
      line: "",
      city: "",
      zip: "",
      phone: "",
    });

    setShowAddressForm(false);

    showToast("Address saved");
  }

  // =====================================================
  // REWARDS
  // =====================================================

  function redeemReward(points, label) {
    if (rewardsPoints < points) {
      showToast(
        "Not enough points yet"
      );
      return;
    }

    setRewardsPoints(
      (current) =>
        current - points
    );

    showToast(
      `Redeemed: ${label}`
    );
  }

  // =====================================================
  // PROFILE
  // =====================================================

  function handleAvatarUpload(e) {
    const file =
      e.target.files?.[0];

    if (!file) return;

    const reader =
      new FileReader();

    reader.onload = () => {
      setUser((current) => ({
        ...current,
        avatar: reader.result,
      }));

      showToast(
        "Profile picture updated"
      );
    };

    reader.readAsDataURL(file);
  }

  // =====================================================
  // LOGOUT
  // =====================================================

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser({
      name: "Guest User",
      email: "guest@shopnow.com",
      avatar: null,
    });

    closeAllOverlays();

    if (onLogout) {
      onLogout();
    }

    navigate("/login");
  }

  // =====================================================
  // NOTIFICATIONS
  // =====================================================

  function markAllRead() {
    setNotifications((current) =>
      current.map((notification) => ({
        ...notification,
        read: true,
      }))
    );
  }

  // =====================================================
  // PROFILE MENU
  // =====================================================

  const profileMenuItems = [
    {
      icon: "👤",
      label: t("myProfile"),
      action: () => openPanel("profile"),
    },
    {
      icon: "📷",
      label: t("changePicture"),
      action: () =>
        avatarInputRef.current?.click(),
    },
    {
      icon: "✏️",
      label: t("editProfile"),
      action: () =>
        openPanel("editProfile"),
    },
    {
      icon: "📦",
      label: t("myOrders"),
      action: () =>
        openPanel("orders"),
    },
    {
      icon: "❤️",
      label: t("wishlist"),
      action: () =>
        openPanel("wishlist"),
    },
    {
      icon: "💳",
      label: t("paymentGateway"),
      action: () =>
        openPanel("paymentInfo"),
    },
    {
      icon: "🎁",
      label: t("rewards"),
      action: () =>
        openPanel("rewards"),
    },
    {
      icon: "⚙️",
      label: t("settings"),
      action: () =>
        openPanel("settings"),
    },
    {
      icon: "🚪",
      label: t("logout"),
      action: logout,
    },
  ];

  const PANEL_TITLES = {
    profile: t("myProfile"),
    editProfile: t("editProfile"),
    orders: t("myOrders"),
    orderTrack: t("trackOrder"),
    wishlist: t("wishlist"),
    addresses: t("addresses"),
    paymentInfo: t("paymentMethods"),
    payment: t("choosePayment"),
    rewards: t("rewards"),
    settings: t("settings"),
    support: t("customerSupport"),
    privacy: t("privacy"),
  };

  // =====================================================
  // PROFILE PANEL
  // =====================================================

  function renderProfile() {
    return (
      <>
        <div className="profile-avatar-row">
          <div className="avatar-large">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt="avatar"
              />
            ) : (
              initialsOf(user.name)
            )}
          </div>

          <div>
            <h3>{user.name}</h3>
            <p>{user.email}</p>
          </div>
        </div>

        <label className="upload-btn">
          📷 {t("changePicture")}

          <input
            type="file"
            accept="image/*"
            style={{
              display: "none",
            }}
            onChange={
              handleAvatarUpload
            }
          />
        </label>

        <button
          className="panel-btn secondary"
          onClick={() =>
            setActivePanel(
              "editProfile"
            )
          }
        >
          ✏️ {t("editProfile")}
        </button>

        <div className="profile-stats">
          <div>
            <strong>
              {orders.length}
            </strong>
            <span>
              {t("myOrders")}
            </span>
          </div>

          <div>
            <strong>
              {Object.keys(
                wishlist
              ).length}
            </strong>
            <span>
              {t("wishlist")}
            </span>
          </div>

          <div>
            <strong>
              {rewardsPoints}
            </strong>
            <span>
              {t("rewards")}
            </span>
          </div>
        </div>
      </>
    );
  }

  // =====================================================
  // EDIT PROFILE
  // =====================================================

  function renderEditProfile() {
    return (
      <>
        <label className="field-label">
          {t("name") || "Name"}
        </label>

        <input
          className="field-input"
          value={user.name}
          onChange={(e) =>
            setUser((current) => ({
              ...current,
              name: e.target.value,
            }))
          }
        />

        <label className="field-label">
          {t("email") || "Email"}
        </label>

        <input
          className="field-input"
          value={user.email}
          onChange={(e) =>
            setUser((current) => ({
              ...current,
              email: e.target.value,
            }))
          }
        />

        <button
          className="panel-btn"
          onClick={() => {
            showToast(
              "Profile updated"
            );
            setActivePanel("profile");
          }}
        >
          {t("saveChanges") ||
            "Save Changes"}
        </button>
      </>
    );
  }

  // =====================================================
  // ORDERS
  // =====================================================

  function renderOrders() {
    if (orders.length === 0) {
      return (
        <div className="panel-empty">
          <div className="glyph">
            📦
          </div>

          <div>
            {t("noOrders") ||
              "No orders yet."}
          </div>
        </div>
      );
    }

    return orders.map((order) => (
      <div
        className="order-card"
        key={order.id}
      >
        <div className="order-card-top">
          <span>
            Order #{order.id}
          </span>

          <span className="status-pill">
            {
              ORDER_STEPS[
                order.status
              ]
            }
          </span>
        </div>

        <div className="order-card-date">
          {order.date}
        </div>

        <div className="order-card-items">
          {order.items
            .map(
              (item) =>
                `${item.name} x${item.qty}`
            )
            .join(", ")}
        </div>

        <div className="order-card-foot">
          <strong>
            {formatMoney(
              order.total
            )}
          </strong>

          <button
            onClick={() => {
              setTrackingOrder(
                order
              );
              setActivePanel(
                "orderTrack"
              );
            }}
          >
            {t("trackOrder")}
          </button>
        </div>
      </div>
    ));
  }

  // =====================================================
  // ORDER TRACK
  // =====================================================

  function renderOrderTrack() {
    if (!trackingOrder)
      return null;

    return (
      <>
        <p
          style={{
            fontSize: "0.85rem",
            marginBottom: 10,
          }}
        >
          Order #{trackingOrder.id}
        </p>

        <div className="tracking-steps">
          {ORDER_STEPS.map(
            (step, index) => (
              <div
                className={`track-step${
                  index <=
                  trackingOrder.status
                    ? " done"
                    : ""
                }`}
                key={step}
              >
                <span className="track-dot" />
                <span>{step}</span>
              </div>
            )
          )}
        </div>

        <button
          className="panel-btn secondary"
          onClick={
            advanceTracking
          }
          disabled={
            trackingOrder.status >=
            ORDER_STEPS.length - 1
          }
        >
          {t("nextStep") ||
            "Simulate Next Step"}
        </button>
      </>
    );
  }

  // =====================================================
  // WISHLIST
  // =====================================================

  function renderWishlist() {
    const items = Object.keys(
      wishlist
    )
      .map((id) =>
        findProduct(id)
      )
      .filter(Boolean);

    if (items.length === 0) {
      return (
        <div className="panel-empty">
          <div className="glyph">
            ❤️
          </div>

          <div>
            {t("emptyWishlist") ||
              "Your wishlist is empty."}
          </div>
        </div>
      );
    }

    return items.map((product) => (
      <div
        className="wishlist-grid-item"
        key={product.id}
      >
        <div className="art">
          {product.art}
        </div>

        <div className="info">
          <h4>{product.name}</h4>

          <div className="price">
            {formatMoney(
              product.price
            )}
          </div>
        </div>

        <div className="actions">
          <button
            className="add"
            onClick={() =>
              addToCart(product.id)
            }
          >
            {t("addToCart")}
          </button>

          <button
            className="remove"
            onClick={() =>
              toggleWishlist(
                product.id
              )
            }
          >
            {t("remove") || "Remove"}
          </button>
        </div>
      </div>
    ));
  }

  // =====================================================
  // ADDRESSES
  // =====================================================

  function renderAddresses() {
    return (
      <>
        {addresses.map((address) => (
          <div
            className="address-card"
            key={address.id}
          >
            <input
              type="radio"
              name="selectedAddress"
              checked={
                selectedAddressId ===
                address.id
              }
              onChange={() =>
                setSelectedAddressId(
                  address.id
                )
              }
            />

            <div>
              <strong>
                {address.label ||
                  "Address"}
              </strong>

              <p>
                {address.line},{" "}
                {address.city}{" "}
                {address.zip}
              </p>

              <p>
                {address.phone}
              </p>
            </div>
          </div>
        ))}

        {showAddressForm ? (
          <>
            {[
              [
                "label",
                "Label",
                "Home / Work",
              ],
              [
                "line",
                "Address line",
                "",
              ],
              [
                "city",
                "City",
                "",
              ],
              [
                "zip",
                "ZIP",
                "",
              ],
              [
                "phone",
                "Phone",
                "",
              ],
            ].map(
              ([
                field,
                label,
                placeholder,
              ]) => (
                <React.Fragment
                  key={field}
                >
                  <label className="field-label">
                    {label}
                  </label>

                  <input
                    className="field-input"
                    placeholder={
                      placeholder
                    }
                    value={
                      addressDraft[
                        field
                      ]
                    }
                    onChange={(e) =>
                      setAddressDraft(
                        (current) => ({
                          ...current,
                          [field]:
                            e.target
                              .value,
                        })
                      )
                    }
                  />
                </React.Fragment>
              )
            )}

            <button
              className="panel-btn"
              onClick={
                saveAddress
              }
            >
              {t("saveAddress") ||
                "Save Address"}
            </button>
          </>
        ) : (
          <button
            className="panel-btn secondary"
            onClick={() =>
              setShowAddressForm(
                true
              )
            }
          >
            +{" "}
            {t("addNewAddress") ||
              "Add New Address"}
          </button>
        )}
      </>
    );
  }

  // =====================================================
  // PAYMENT INFO
  // =====================================================

  function renderPaymentInfo() {
    return (
      <>
        <p
          style={{
            fontSize: "0.85rem",
            color:
              "var(--text-muted)",
            marginBottom: 14,
          }}
        >
          {t("savedPaymentMethods") ||
            "Saved payment methods for faster checkout."}
        </p>

        {PAYMENT_METHODS.map(
          (method) => (
            <div
              key={method.id}
              className={`payment-method-row${
                paymentMethod ===
                method.id
                  ? " selected"
                  : ""
              }`}
              onClick={() =>
                setPaymentMethod(
                  method.id
                )
              }
            >
              <input
                type="radio"
                checked={
                  paymentMethod ===
                  method.id
                }
                onChange={() =>
                  setPaymentMethod(
                    method.id
                  )
                }
              />

              <span>
                {method.label}
              </span>
            </div>
          )
        )}
      </>
    );
  }

  // =====================================================
  // CHECKOUT
  // =====================================================

  function renderPaymentCheckout() {
    return (
      <>
        {PAYMENT_METHODS.map(
          (method) => (
            <div
              key={method.id}
              className={`payment-method-row${
                paymentMethod ===
                method.id
                  ? " selected"
                  : ""
              }`}
              onClick={() =>
                setPaymentMethod(
                  method.id
                )
              }
            >
              <input
                type="radio"
                checked={
                  paymentMethod ===
                  method.id
                }
                onChange={() =>
                  setPaymentMethod(
                    method.id
                  )
                }
              />

              <span>
                {method.label}
              </span>
            </div>
          )
        )}

        <div
          className="sum-row total"
          style={{
            marginTop: 16,
          }}
        >
          <span>
            {t("total")}
          </span>

          <span>
            {formatMoney(total)}
          </span>
        </div>

        <button
          className="panel-btn"
          style={{
            marginTop: 12,
          }}
          onClick={
            confirmPayment
          }
        >
          {t("pay") || "Pay"}{" "}
          {formatMoney(total)}
        </button>
      </>
    );
  }

  // =====================================================
  // REWARDS
  // =====================================================

  function renderRewards() {
    return (
      <>
        <div className="rewards-balance">
          <strong>
            {rewardsPoints}
          </strong>

          <span>
            {t("pointsAvailable") ||
              "points available"}
          </span>
        </div>

        {REWARDS_CATALOG.map(
          (reward) => (
            <div
              className="reward-item"
              key={reward.points}
            >
              <span>
                {reward.label}
                <br />
                <small
                  style={{
                    color:
                      "var(--text-muted)",
                  }}
                >
                  {reward.points} pts
                </small>
              </span>

              <button
                disabled={
                  rewardsPoints <
                  reward.points
                }
                onClick={() =>
                  redeemReward(
                    reward.points,
                    reward.label
                  )
                }
              >
                {t("redeem") ||
                  "Redeem"}
              </button>
            </div>
          )
        )}
      </>
    );
  }

  // =====================================================
  // SETTINGS
  // =====================================================

  function renderSettings() {
    return (
      <>
        <div className="settings-row">
          <span>
            🌙 {t("darkMode")}
          </span>

          <button
            className={`toggle-switch${
              darkMode
                ? " on"
                : ""
            }`}
            onClick={() =>
              setDarkMode(
                (current) =>
                  !current
              )
            }
          >
            <span className="knob" />
          </button>
        </div>

        <div className="settings-row">
          <span>
            🔔{" "}
            {t("notifications")}
          </span>

          <button
            className={`toggle-switch${
              notifEnabled
                ? " on"
                : ""
            }`}
            onClick={() =>
              setNotifEnabled(
                (current) =>
                  !current
              )
            }
          >
            <span className="knob" />
          </button>
        </div>

        <div
          className="settings-row"
          style={{
            cursor: "pointer",
          }}
          onClick={() =>
            setActivePanel(
              "privacy"
            )
          }
        >
          <span>
            🔒 {t("privacy")}
          </span>

          <span>›</span>
        </div>

        <div
          className="settings-row"
          style={{
            cursor: "pointer",
          }}
          onClick={() =>
            setActivePanel(
              "support"
            )
          }
        >
          <span>
            💬{" "}
            {t("customerSupport")}
          </span>

          <span>›</span>
        </div>
      </>
    );
  }

  // =====================================================
  // SUPPORT
  // =====================================================

  function renderSupport() {
    return (
      <>
        {FAQ_ITEMS.map(
          (faq, index) => (
            <div
              className="faq-item"
              key={faq.q}
            >
              <div
                className="faq-q"
                onClick={() =>
                  setOpenFaq(
                    openFaq === index
                      ? null
                      : index
                  )
                }
              >
                {faq.q}

                <span>
                  {openFaq === index
                    ? "−"
                    : "+"}
                </span>
              </div>

              {openFaq ===
                index && (
                <div className="faq-a">
                  {faq.a}
                </div>
              )}
            </div>
          )
        )}

        <div className="support-form">
          <label
            className="field-label"
            style={{
              marginTop: 16,
            }}
          >
            {t("messageUs") ||
              "Message us"}
          </label>

          <textarea
            value={supportMsg}
            onChange={(e) =>
              setSupportMsg(
                e.target.value
              )
            }
            placeholder={
              t(
                "howCanWeHelp"
              ) ||
              "How can we help?"
            }
          />

          <button
            className="panel-btn"
            onClick={() => {
              if (
                !supportMsg.trim()
              )
                return;

              showToast(
                "Message sent to our support team"
              );

              setSupportMsg("");
            }}
          >
            {t("sendMessage") ||
              "Send Message"}
          </button>
        </div>
      </>
    );
  }

  // =====================================================
  // PRIVACY
  // =====================================================

  function renderPrivacy() {
    return (
      <div className="privacy-text">
        <p>
          ShopNow respects your
          privacy. We only collect
          the information needed to
          process orders, personalize
          recommendations, and
          improve your shopping
          experience.
        </p>

        <p>
          Your payment details are
          never stored on our servers
          in plain text. Addresses
          and order history are kept
          only as long as your
          account is active.
        </p>

        <p>
          You can request a copy of
          your data or ask us to
          delete it at any time from
          the Customer Support panel.
        </p>
      </div>
    );
  }

  // =====================================================
  // PANEL BODY
  // =====================================================

  function renderPanelBody() {
    switch (activePanel) {
      case "profile":
        return renderProfile();

      case "editProfile":
        return renderEditProfile();

      case "orders":
        return renderOrders();

      case "orderTrack":
        return renderOrderTrack();

      case "wishlist":
        return renderWishlist();

      case "addresses":
        return renderAddresses();

      case "paymentInfo":
        return renderPaymentInfo();

      case "payment":
        return renderPaymentCheckout();

      case "rewards":
        return renderRewards();

      case "settings":
        return renderSettings();

      case "support":
        return renderSupport();

      case "privacy":
        return renderPrivacy();

      default:
        return null;
    }
  }

  // =====================================================
  // RETURN
  // =====================================================

  return (
    <div
      className={`sn-app${
        darkMode ? " dark" : ""
      }`}
      dir={isRTL ? "rtl" : "ltr"}
    >
      <style>{CSS}</style>

      {/* =================================================
          HEADER
      ================================================= */}

      <header>
        <div className="logo">
          ShopNow
        </div>

        <div className="search-wrap">
          <input
            className="search-input"
            placeholder={`🔍 ${t(
              "search"
            )}`}
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(
                e.target.value
              );
              setVisibleCount(
                PAGE_SIZE
              );
            }}
          />
        </div>

        <div className="header-actions">

          {/* DARK MODE */}

          <button
            className="icon-btn"
            title={
              t("toggleDarkMode") ||
              "Toggle dark mode"
            }
            onClick={() =>
              setDarkMode(
                (current) =>
                  !current
              )
            }
          >
            {darkMode
              ? "☀️"
              : "🌙"}
          </button>

          {/* LANGUAGE */}

          <div className="lang-currency-wrap">
            <button
              className="icon-btn"
              title={t("language")}
              onClick={() => {
                setLangOpen(
                  (current) =>
                    !current
                );

                setCurrencyOpen(
                  false
                );
                setProfileMenuOpen(
                  false
                );
                setNotifOpen(
                  false
                );
              }}
            >
              🌐
            </button>

            {langOpen && (
              <>
                <div
                  className="backdrop-click"
                  onClick={() =>
                    setLangOpen(
                      false
                    )
                  }
                />

                <div className="dropdown">
                  <div className="dropdown-header">
                    {t("language")}
                  </div>

                  <input
                    className="dropdown-search-input"
                    placeholder={t(
                      "searchLanguage"
                    )}
                    value={
                      langSearch
                    }
                    onChange={(e) =>
                      setLangSearch(
                        e.target.value
                      )
                    }
                    autoFocus
                  />

                  <div className="dropdown-scroll">
                    {filteredLanguages.length ===
                    0 ? (
                      <div className="dropdown-empty">
                        —
                      </div>
                    ) : (
                      filteredLanguages.map(
                        (lang) => (
                          <button
                            key={
                              lang.code
                            }
                            className={
                              currentLanguage ===
                              lang.code
                                ? "selected"
                                : ""
                            }
                            onClick={() =>
                              changeLanguage(
                                lang.code
                              )
                            }
                          >
                            <span>
                              {
                                lang.name
                              }
                            </span>

                            <span className="lang-code">
                              {
                                lang.code
                              }
                            </span>
                          </button>
                        )
                      )
                    )}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* CURRENCY */}

          <div className="lang-currency-wrap">
            <button
              className="icon-btn currency-btn"
              title={t(
                "currency"
              )}
              onClick={() => {
                setCurrencyOpen(
                  (current) =>
                    !current
                );

                setLangOpen(
                  false
                );

                setProfileMenuOpen(
                  false
                );

                setNotifOpen(
                  false
                );
              }}
            >
              {currency}
            </button>

            {currencyOpen && (
              <>
                <div
                  className="backdrop-click"
                  onClick={() =>
                    setCurrencyOpen(
                      false
                    )
                  }
                />

                <div className="dropdown">
                  <div className="dropdown-header">
                    {t("currency")}
                  </div>

                  <input
                    className="dropdown-search-input"
                    placeholder={t(
                      "searchCurrency"
                    )}
                    value={
                      currencySearch
                    }
                    onChange={(e) =>
                      setCurrencySearch(
                        e.target.value
                      )
                    }
                    autoFocus
                  />

                  <div className="dropdown-scroll">
                    {filteredCurrencies.length ===
                    0 ? (
                      <div className="dropdown-empty">
                        —
                      </div>
                    ) : (
                      filteredCurrencies.map(
                        (item) => (
                          <button
                            key={
                              item.code
                            }
                            onClick={() => {
                              setCurrency(
                                item.code
                              );

                              setCurrencyOpen(
                                false
                              );

                              setCurrencySearch(
                                ""
                              );
                            }}
                          >
                            <span>
                              {
                                item.name
                              }
                            </span>

                            <span className="cur-code">
                              {
                                item.code
                              }
                            </span>
                          </button>
                        )
                      )
                    )}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* NOTIFICATIONS */}

          <div className="notif-wrap">
            <button
              className="icon-btn"
              title={
                t(
                  "notifications"
                )
              }
              onClick={() => {
                const willOpen =
                  !notifOpen;

                setNotifOpen(
                  willOpen
                );

                setProfileMenuOpen(
                  false
                );

                setLangOpen(
                  false
                );

                setCurrencyOpen(
                  false
                );

                if (willOpen) {
                  markAllRead();
                }
              }}
            >
              🔔

              {unreadCount >
                0 && (
                <span className="notif-badge">
                  {
                    unreadCount
                  }
                </span>
              )}
            </button>

            {notifOpen && (
              <>
                <div
                  className="backdrop-click"
                  onClick={() =>
                    setNotifOpen(
                      false
                    )
                  }
                />

                <div className="dropdown">
                  <div className="dropdown-header">
                    {t(
                      "notifications"
                    )}
                  </div>

                  {notifications.length ===
                  0 ? (
                    <div className="notif-empty">
                      You're all
                      caught up.
                    </div>
                  ) : (
                    notifications.map(
                      (notification) => (
                        <div
                          className={`notif-item${
                            notification.read
                              ? ""
                              : " unread"
                          }`}
                          key={
                            notification.id
                          }
                        >
                          {
                            notification.msg
                          }
                        </div>
                      )
                    )
                  )}
                </div>
              </>
            )}
          </div>

          {/* PROFILE */}

          <div className="profile-wrap">
            <button
              className="avatar-btn"
              onClick={() => {
                setProfileMenuOpen(
                  (current) =>
                    !current
                );

                setNotifOpen(
                  false
                );

                setLangOpen(
                  false
                );

                setCurrencyOpen(
                  false
                );
              }}
            >
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt="avatar"
                />
              ) : (
                initialsOf(
                  user.name
                )
              )}
            </button>

            <input
              ref={avatarInputRef}
              type="file"
              accept="image/*"
              style={{
                display: "none",
              }}
              onChange={
                handleAvatarUpload
              }
            />

            {profileMenuOpen && (
              <>
                <div
                  className="backdrop-click"
                  onClick={() =>
                    setProfileMenuOpen(
                      false
                    )
                  }
                />

                <div className="dropdown">
                  <div className="dropdown-header">
                    {user.name}
                  </div>

                  {profileMenuItems.map(
                    (item) => (
                      <button
                        key={
                          item.label
                        }
                        onClick={
                          item.action
                        }
                      >
                        <span>
                          {
                            item.icon
                          }
                        </span>

                        {
                          item.label
                        }
                      </button>
                    )
                  )}
                </div>
              </>
            )}
          </div>

          {/* CART */}

          <button
            className="cart-btn"
            onClick={() =>
              toggleDrawer(true)
            }
          >
            {t("cart")}{" "}
            <span className="cart-count">
              {cartCount}
            </span>
          </button>
        </div>
      </header>

      {/* =================================================
          HERO
      ================================================= */}

      <section className="hero">
        <div className="eyebrow">
          {t("heroEyebrow")}
        </div>

        <h1>
          {t("heroTitle")}
        </h1>

        <p>
          {t("heroSubtitle")}
        </p>
      </section>

      {/* =================================================
          MAIN
      ================================================= */}

      <main>
        <h2 className="section-title">
          {t("shopByCategory")}
        </h2>

        <div
          className="categories"
          id="categoryGrid"
        >
          <div
            className={`category-card ${
              activeCategory ===
              "all"
                ? "active"
                : ""
            }`}
            onClick={() =>
              filterCategory(
                "all"
              )
            }
          >
            <div className="icon">
              🛍️
            </div>

            <div className="name">
              {t("all") || "All"}
            </div>
          </div>

          {CATEGORIES.map(
            (category) => (
              <div
                key={
                  category.id
                }
                className={`category-card ${
                  activeCategory ===
                  category.id
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  filterCategory(
                    category.id
                  )
                }
              >
                <div className="icon">
                  {
                    category.icon
                  }
                </div>

                <div className="name">
                  {category.name}
                </div>
              </div>
            )
          )}
        </div>

        {/* RECOMMENDATIONS */}

        {recommended.length >
          0 && (
          <div className="recommend-section">
            <h2 className="section-title">
              ✨{" "}
              {t("aiPicks")}{" "}
              <span className="ai-tag">
                {t("aiTag")}
              </span>
            </h2>

            <div className="recommend-scroll">
              {recommended.map(
                (product) => (
                  <div
                    className="recommend-card"
                    key={
                      product.id
                    }
                  >
                    <div className="recommend-art">
                      {
                        product.art
                      }
                    </div>

                    <div className="recommend-body">
                      <h4>
                        {
                          product.name
                        }
                      </h4>

                      <div className="recommend-foot">
                        <span className="price">
                          {formatMoney(
                            product.price
                          )}
                        </span>

                        <button
                          onClick={() =>
                            addToCart(
                              product.id
                            )
                          }
                        >
                          {t("addToCart")}
                        </button>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        )}

        {/* PRODUCTS */}

        <h2 className="section-title">
          {t("allProducts")}
        </h2>

        <div className="filters-row">
          <select
            value={priceFilter}
            onChange={(e) => {
              setPriceFilter(
                e.target.value
              );
              setVisibleCount(
                PAGE_SIZE
              );
            }}
          >
            <option value="all">
              {t("allPrices")}
            </option>

            <option value="under20">
              {t("under20")}
            </option>

            <option value="20to50">
              {t("price20to50")}
            </option>

            <option value="above50">
              {t("above50")}
            </option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => {
              setSortBy(
                e.target.value
              );
              setVisibleCount(
                PAGE_SIZE
              );
            }}
          >
            <option value="relevance">
              {t("sortRelevance")}
            </option>

            <option value="price-asc">
              {t("priceLowHigh")}
            </option>

            <option value="price-desc">
              {t("priceHighLow")}
            </option>

            <option value="name">
              {t("nameAZ")}
            </option>
          </select>
        </div>

        <p
          style={{
            fontSize: "0.8rem",
            color:
              "var(--text-muted)",
            marginBottom: 14,
          }}
        >
          {t("showing")}{" "}
          {
            displayedProducts.length
          }{" "}
          {t("of")}{" "}
          {
            filteredProducts.length
          }{" "}
          {t("products")}
        </p>

        <div
          className="grid"
          id="productGrid"
        >
          {displayedProducts.map(
            (product) => (
              <div
                className="product"
                key={product.id}
              >
                <button
                  className="wishlist-btn"
                  onClick={() =>
                    toggleWishlist(
                      product.id
                    )
                  }
                  title={
                    wishlist[
                      product.id
                    ]
                      ? "Remove from wishlist"
                      : "Add to wishlist"
                  }
                >
                  {wishlist[
                    product.id
                  ]
                    ? "❤️"
                    : "🤍"}
                </button>

                <div className="product-art">
                  {
                    product.art
                  }
                </div>

                <div className="product-body">
                  <span className="cat-tag">
                    {
                      product.cat
                    }
                  </span>

                  <h3>
                    {
                      product.name
                    }
                  </h3>

                  <div className="product-foot">
                    <span className="price">
                      {formatMoney(
                        product.price
                      )}
                    </span>

                    <button
                      className={`add-btn${
                        justAdded ===
                        product.id
                          ? " added"
                          : ""
                      }`}
                      onClick={() =>
                        addToCart(
                          product.id
                        )
                      }
                    >
                      {justAdded ===
                      product.id
                        ? t(
                            "added"
                          )
                        : t(
                            "addToCart"
                          )}
                    </button>
                  </div>
                </div>
              </div>
            )
          )}
        </div>

        {visibleCount <
          filteredProducts.length && (
          <button
            className="panel-btn secondary"
            style={{
              maxWidth: 220,
              margin:
                "24px auto 0",
              display: "block",
            }}
            onClick={() =>
              setVisibleCount(
                (current) =>
                  current +
                  PAGE_SIZE
              )
            }
          >
            {t("loadMore")}
          </button>
        )}
      </main>

      {/* =================================================
          FOOTER
      ================================================= */}

      <footer>
        <div className="contact">
          📞{" "}
          {t("contactUs")}: + 91
          6369456650
        </div>

        <div className="contact">
          ✉️ {t("email")}:{" "}
          <a href="mailto:jeyagurubalaji@gmail.com">
            jeyagurubalaji@gmail.com
          </a>
        </div>

        <div>
          © 2026 ShopNow.{" "}
          {t("rights")}
        </div>
      </footer>

      {/* =================================================
          CART DRAWER
      ================================================= */}

      <div
        className={`overlay${
          drawerOpen
            ? " open"
            : ""
        }`}
        onClick={() =>
          toggleDrawer(false)
        }
      />

      <div
        className={`drawer${
          drawerOpen
            ? " open"
            : ""
        }`}
      >
        <div className="drawer-head">
          <h2>
            {t("yourCart")}
          </h2>

          <button
            className="close-btn"
            onClick={() =>
              toggleDrawer(false)
            }
          >
            &times;
          </button>
        </div>

        <div className="drawer-items">
          {entries.length ===
          0 ? (
            <div className="empty-cart">
              <div className="glyph">
                🛒
              </div>

              <div>
                {t(
                  "emptyCart"
                )}
              </div>
            </div>
          ) : (
            entries.map(
              (item) => (
                <div
                  className="cart-line"
                  key={
                    item.id
                  }
                >
                  <div className="art">
                    {item.art}
                  </div>

                  <div className="cart-line-info">
                    <h4>
                      {
                        item.name
                      }
                    </h4>

                    <p className="unit">
                      {formatMoney(
                        item.price
                      )}{" "}
                      {t("each") ||
                        "each"}
                    </p>

                    <div className="qty-row">
                      <button
                        className="qty-btn"
                        onClick={() =>
                          changeQty(
                            item.id,
                            -1
                          )
                        }
                      >
                        –
                      </button>

                      <span>
                        {item.qty}
                      </span>

                      <button
                        className="qty-btn"
                        onClick={() =>
                          changeQty(
                            item.id,
                            1
                          )
                        }
                      >
                        +
                      </button>

                      <button
                        className="remove-link"
                        onClick={() =>
                          removeLine(
                            item.id
                          )
                        }
                      >
                        {t(
                          "remove"
                        ) ||
                          "Remove"}
                      </button>
                    </div>
                  </div>

                  <div className="line-total">
                    {formatMoney(
                      item.price *
                        item.qty
                    )}
                  </div>
                </div>
              )
            )
          )}
        </div>

        <div className="drawer-summary">
          {entries.length >
            0 && (
            <>
              {appliedCoupon ? (
                <div className="coupon-chip">
                  <span>
                    🎟️{" "}
                    {
                      appliedCoupon.code
                    }{" "}
                    {t(
                      "applied"
                    ) ||
                      "applied"}
                  </span>

                  <button
                    onClick={
                      removeCoupon
                    }
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <div className="coupon-row">
                  <input
                    placeholder={t(
                      "couponPlaceholder"
                    )}
                    value={
                      couponInput
                    }
                    onChange={(
                      e
                    ) =>
                      setCouponInput(
                        e.target
                          .value
                      )
                    }
                  />

                  <button
                    onClick={
                      applyCoupon
                    }
                  >
                    {t(
                      "apply"
                    )}
                  </button>
                </div>
              )}

              <div className="sum-row">
                <span>
                  {t(
                    "subtotal"
                  )}
                </span>

                <span>
                  {formatMoney(
                    subtotal
                  )}
                </span>
              </div>

              {couponDiscount >
                0 && (
                <div className="sum-row">
                  <span>
                    {t(
                      "discount"
                    )}
                  </span>

                  <span>
                    -
                    {formatMoney(
                      couponDiscount
                    )}
                  </span>
                </div>
              )}

              <div className="sum-row">
                <span>
                  {t(
                    "shipping"
                  )}
                </span>

                <span>
                  {shipping ===
                  0
                    ? t(
                        "free"
                      )
                    : formatMoney(
                        shipping
                      )}
                </span>
              </div>

              <div className="sum-row">
                <span>
                  {t("tax")}
                </span>

                <span>
                  {formatMoney(
                    tax
                  )}
                </span>
              </div>

              <div className="sum-row total">
                <span>
                  {t(
                    "total"
                  )}
                </span>

                <span>
                  {formatMoney(
                    total
                  )}
                </span>
              </div>

              <button
                className="checkout-btn"
                onClick={
                  goToPayment
                }
              >
                {t(
                  "checkout"
                )}
              </button>
            </>
          )}
        </div>
      </div>

      {/* =================================================
          SIDE PANEL
      ================================================= */}

      <div
        className={`overlay${
          activePanel
            ? " open"
            : ""
        }`}
        onClick={() =>
          setActivePanel(
            null
          )
        }
      />

      <div
        className={`side-panel${
          activePanel
            ? " open"
            : ""
        }`}
      >
        <div className="panel-head">
          <h2>
            {PANEL_TITLES[
              activePanel
            ] || ""}
          </h2>

          <button
            className="close-btn"
            onClick={() =>
              setActivePanel(
                null
              )
            }
          >
            &times;
          </button>
        </div>

        <div className="panel-body">
          {renderPanelBody()}
        </div>
      </div>

      {/* =================================================
          TOAST
      ================================================= */}

      <div
        className={`toast${
          toast ? " show" : ""
        }`}
      >
        {toast}
      </div>
    </div>
  );
}
