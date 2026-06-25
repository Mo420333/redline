// Mock content for the Redline prototype.
// Real, specific photos from Wikimedia Commons (validated 1280px thumbnails,
// served from Wikimedia's global CDN). `p` is "d1/d2/File/NNNpx-File"; we emit
// the canonical 1280px thumbnail URL. A clean placeholder shows on any failure.
const W = (p) => {
  const [d1, d2, file] = p.split('/')
  return `https://upload.wikimedia.org/wikipedia/commons/thumb/${d1}/${d2}/${file}/1280px-${file}`
}

export const EVENTS = [
  { id: 'e1', title: 'Sunset Cars & Coffee', type: 'Cars & Coffee', city: 'Los Angeles, CA', region: 'West', country: 'USA', date: 'Jul 12', time: '7:00 AM', attendees: 312, emoji: '☕', tag: 'Weekly', img: W('5/5a/Hollywood_Sign_%28Zuschnitt%29.jpg/1024px-Hollywood_Sign_%28Zuschnitt%29.jpg'), kw: 'Los Angeles skyline sunset' },
  { id: 'e2', title: 'Midnight Touge Run', type: 'Cruise', city: 'Denver, CO', region: 'West', country: 'USA', date: 'Jul 14', time: '10:00 PM', attendees: 86, emoji: '🌙', tag: 'Night', img: W('3/3b/Denver%2C_Colorado_skyline_%28cropped%29.jpg/1024px-Denver%2C_Colorado_skyline_%28cropped%29.jpg'), kw: 'Denver skyline night' },
  { id: 'e3', title: 'Eurofest Show & Shine', type: 'Car Show', city: 'Miami, FL', region: 'South', country: 'USA', date: 'Jul 20', time: '11:00 AM', attendees: 540, emoji: '🏆', tag: 'Featured', img: W('2/25/Villa_Vizcaya_20110228.jpg/1024px-Villa_Vizcaya_20110228.jpg'), kw: 'Miami skyline' },
  { id: 'e4', title: 'Track Day @ Laguna', type: 'Track Day', city: 'Monterey, CA', region: 'West', country: 'USA', date: 'Jul 22', time: '8:00 AM', attendees: 64, emoji: '🏁', tag: 'Track', img: W('b/b7/Santa_Catalina_School%2C_Monterey%2C_CA_%28cropped%29.jpg/1024px-Santa_Catalina_School%2C_Monterey%2C_CA_%28cropped%29.jpg'), kw: 'Monterey California coast' },
  { id: 'e5', title: 'JDM Legends Meet', type: 'Cars & Coffee', city: 'Austin, TX', region: 'South', country: 'USA', date: 'Jul 27', time: '9:00 AM', attendees: 220, emoji: '🇯🇵', tag: 'Popular', img: W('f/f4/Skyline_of_Austin%2C_Texas_%28cropped%29.jpg/1024px-Skyline_of_Austin%2C_Texas_%28cropped%29.jpg'), kw: 'Austin Texas skyline' },
  { id: 'e6', title: 'Brooklyn Night Lights', type: 'Cruise', city: 'New York, NY', region: 'East', country: 'USA', date: 'Aug 02', time: '9:00 PM', attendees: 175, emoji: '🌃', tag: 'Night', img: W('7/7a/View_of_Empire_State_Building_from_Rockefeller_Center_New_York_City_dllu_%28cropped%29.jpg/1024px-View_of_Empire_State_Building_from_Rockefeller_Center_New_York_City_dllu_%28cropped%29.jpg'), kw: 'New York City skyline night' },
  { id: 'e7', title: 'Tokyo Daikoku PA Meet', type: 'Car Show', city: 'Tokyo', region: 'Asia', country: 'Japan', date: 'Aug 05', time: '8:00 PM', attendees: 980, emoji: '🗼', tag: 'Global', img: W('b/b2/Skyscrapers_of_Shinjuku_2009_January.jpg/1024px-Skyscrapers_of_Shinjuku_2009_January.jpg'), kw: 'Tokyo skyline night' },
  { id: 'e8', title: 'Nürburgring Touristenfahrten', type: 'Track Day', city: 'Nürburg', region: 'Europe', country: 'Germany', date: 'Aug 09', time: '5:00 PM', attendees: 410, emoji: '🇩🇪', tag: 'Track', img: W('a/a7/N%C3%BCrburg_11010027.jpg/1024px-N%C3%BCrburg_11010027.jpg'), kw: 'Nurburgring racetrack' },
  { id: 'e9', title: 'London Supercar Sunday', type: 'Car Show', city: 'London', region: 'Europe', country: 'UK', date: 'Aug 11', time: '10:00 AM', attendees: 360, emoji: '🇬🇧', tag: 'Global', img: W('6/67/London_Skyline_%28125508655%29.jpeg/1024px-London_Skyline_%28125508655%29.jpeg'), kw: 'London skyline' },
]

export const REGIONS = ['All', 'West', 'South', 'East', 'Europe', 'Asia']
export const EVENT_TYPES = ['All Types', 'Cars & Coffee', 'Cruise', 'Car Show', 'Track Day']

export const GIVEAWAYS = [
  { id: 'g0', prize: '$10,000 Dream Build Fund', sponsor: 'The Redline Grand Prize', endsInDays: 14, value: '$10,000', entries: 28400, emoji: '💰', featured: true },
  { id: 'g1', prize: 'Set of 4 Volk TE37 Wheels', sponsor: 'by Rays Engineering', endsInDays: 3, value: '$2,400', entries: 4820, emoji: '🛞' },
  { id: 'g2', prize: 'Full Custom Vehicle Wrap', sponsor: 'Any design, pro install', endsInDays: 6, value: '$3,500', entries: 7610, emoji: '🎨' },
  { id: 'g3', prize: 'Sim Rig + PS5 + Wheel', sponsor: 'Full racing cockpit setup', endsInDays: 9, value: '$1,800', entries: 15240, emoji: '🎮' },
  { id: 'g4', prize: 'Laguna Seca Track Day', sponsor: 'Car + coaching included', endsInDays: 4, value: '$1,200', entries: 9870, emoji: '🏁' },
  { id: 'g5', prize: '$1,000 Detailing Gift Card', sponsor: 'Adam’s Polishes', endsInDays: 1, value: '$1,000', entries: 12030, emoji: '✨' },
]

export const MERCH = [
  { id: 'm1', name: 'Redline Logo Tee', price: 32, emoji: '👕', color: '#dc2626', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Wiki_Loves_Bangla_T-Shirt_Black.jpg/960px-Wiki_Loves_Bangla_T-Shirt_Black.jpg' },
  { id: 'm2', name: 'Apex Snapback', price: 28, emoji: '🧢', color: '#ef4444', img: 'https://upload.wikimedia.org/wikipedia/commons/6/64/Baseball_cap.png' },
  { id: 'm3', name: 'Touge Hoodie', price: 64, emoji: '🧥', color: '#b91c1c', img: 'https://upload.wikimedia.org/wikipedia/commons/0/00/Fastcolors-men_fashion_sweatshirt-back-printed.jpg' },
  { id: 'm4', name: 'Tach Sticker Pack', price: 12, emoji: '🩹', color: '#f87171', img: 'https://upload.wikimedia.org/wikipedia/commons/4/45/British_Columbia_Sticker_Decal_May_2009.jpg' },
  { id: 'm5', name: 'Pit Crew Jacket', price: 98, emoji: '🧥', color: '#991b1b', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Windbreaker_Jacket%2C_Hood_Outside.jpg/960px-Windbreaker_Jacket%2C_Hood_Outside.jpg' },
  { id: 'm6', name: 'Redline Enamel Pin', price: 9, emoji: '📌', color: '#dc2626', img: 'https://upload.wikimedia.org/wikipedia/commons/4/40/CCS_Pin_Badge.jpg' },
  { id: 'm7', name: 'Apex Beanie', price: 24, emoji: '🧶', color: '#ef4444', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Beanie_hat_by_Polo_Ralph_Lauren.jpg/960px-Beanie_hat_by_Polo_Ralph_Lauren.jpg' },
  { id: 'm8', name: "Driver's Gloves", price: 45, emoji: '🧤', color: '#b91c1c', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Peccary_Driving_Glove_Black.jpg/960px-Peccary_Driving_Glove_Black.jpg' },
]

export const CHANNELS = [
  { id: 'c1', name: 'JDM Legends', members: 4210, emoji: '🇯🇵' },
  { id: 'c2', name: 'Euro Tuners', members: 3180, emoji: '🇩🇪' },
  { id: 'c3', name: 'Track Rats', members: 2640, emoji: '🏁' },
  { id: 'c4', name: 'Stance Nation', members: 5560, emoji: '📉' },
]

export const SEED_MESSAGES = {
  c1: [
    { id: 1, user: 'Kenji', text: 'Anyone heading to Daikoku Friday night?', me: false },
    { id: 2, user: 'You', text: 'Trying to! Bringing the S2000 🏎️', me: true },
    { id: 3, user: 'Mia', text: 'Save me a spot, rolling in the GR86', me: false },
  ],
  c2: [
    { id: 1, user: 'Lukas', text: 'New coilovers came in, ride height is perfect now', me: false },
    { id: 2, user: 'You', text: 'Drop a pic when you can 👀', me: true },
  ],
  c3: [
    { id: 1, user: 'Devon', text: 'Best tire pressure for Laguna in summer?', me: false },
    { id: 2, user: 'Sara', text: '34 hot worked great for me last week', me: false },
  ],
  c4: [
    { id: 1, user: 'Priya', text: 'Fitment check — 18x9.5 +12 on stock fenders?', me: false },
    { id: 2, user: 'You', text: 'Gonna need a small pull but doable', me: true },
  ],
}

export const STAT_TICKER = [
  'Los Angeles', 'Tokyo', 'London', 'Miami', 'Berlin', 'Austin',
  'New York', 'Nürburg', 'Denver', 'Monterey', 'Osaka', 'Chicago',
]

// Showroom — members share a pic of their ride and collect love.
// Photos load real car images by keyword at runtime; CarArt is the fallback.
export const CATEGORIES = ['All', 'Euro', 'JDM', 'Muscle', 'Exotic']

export const SHOWROOM = [
  { id: 's1', owner: 'Marcus', car: 'Nissan Skyline GT-R R34', category: 'JDM', kw: 'Nissan Skyline GT-R', caption: 'Finally got the BBS fitment right 🔥', img: W('0/06/Nissan_Skyline_GT-R_R34_V_Spec_II.jpg/1024px-Nissan_Skyline_GT-R_R34_V_Spec_II.jpg'), color: '#dc2626', sky: '#1e293b', loves: 248 },
  { id: 's2', owner: 'Dana', car: 'Mazda RX-7 FD', category: 'JDM', kw: 'Mazda RX-7', caption: 'Sunset pulls hit different.', img: W('8/8c/1994_Mazda_RX-7_R2_in_Vintage_Red%2C_front_left_%28Lime_Rock%29.jpg/1024px-1994_Mazda_RX-7_R2_in_Vintage_Red%2C_front_left_%28Lime_Rock%29.jpg'), color: '#38bdf8', sky: '#7c2d12', loves: 192 },
  { id: 's3', owner: 'Sofia', car: 'BMW M3 Competition', brand: 'bmw', category: 'Euro', kw: 'BMW M3', caption: 'Restored her over 2 years. Worth every weekend.', img: W('8/8a/BMW_M3_Competition_%28G80%29_IMG_4041.jpg/1024px-BMW_M3_Competition_%28G80%29_IMG_4041.jpg'), color: '#e5e7eb', sky: '#0f172a', loves: 421 },
  { id: 's4', owner: 'Andre', car: 'BMW M4 Competition', brand: 'bmw', category: 'Euro', kw: 'BMW M4', caption: 'Twin-turbo therapy. That grille though 😍', img: W('e/e2/2021_BMW_M4_Competition_Automatic_3.0_Front.jpg/1024px-2021_BMW_M4_Competition_Automatic_3.0_Front.jpg'), color: '#1d4ed8', sky: '#14532d', loves: 387 },
  { id: 's5', owner: 'Kenji', car: 'Honda S2000 AP1', category: 'JDM', kw: 'Honda S2000', caption: 'VTEC just kicked in, yo 🏎️', img: W('d/dc/HondaS2000-004.jpg/1024px-HondaS2000-004.jpg'), color: '#dc2626', sky: '#1e1b4b', loves: 333 },
  { id: 's6', owner: 'Mia', car: 'BMW M2', brand: 'bmw', category: 'Euro', kw: 'BMW M2', caption: 'Small bumper, big attitude.', img: W('b/b8/BMW_G87_M2_1X7A1838.jpg/1024px-BMW_G87_M2_1X7A1838.jpg'), color: '#f97316', sky: '#0c4a6e', loves: 264 },
  { id: 's7', owner: 'Leo', car: 'Ford Mustang GT', category: 'Muscle', kw: 'Ford Mustang', caption: 'American muscle, no apologies.', img: W('9/9c/Ford_Mustang_VII_GT_Rutesheimer_Autoschau_2025_DSC_9234.jpg/1024px-Ford_Mustang_VII_GT_Rutesheimer_Autoschau_2025_DSC_9234.jpg'), color: '#1e40af', sky: '#1e293b', loves: 201 },
  { id: 's8', owner: 'Ava', car: 'Porsche 911', category: 'Exotic', kw: 'Porsche 911', caption: 'Flat-six symphony 🎶', img: W('a/a2/Porsche_911_No_1000000%2C_70_Years_Porsche_Sports_Car%2C_Berlin_%281X7A3888%29.jpg/1024px-Porsche_911_No_1000000%2C_70_Years_Porsche_Sports_Car%2C_Berlin_%281X7A3888%29.jpg'), color: '#e5e7eb', sky: '#0f172a', loves: 512 },
  { id: 's9', owner: 'Sam', car: 'Chevrolet Corvette C8', category: 'Muscle', kw: 'Chevrolet Corvette', caption: 'Mid-engine changed everything.', img: W('4/4b/Chevrolet_Corvette_C8_IAA_2021_1X7A0156.jpg/1024px-Chevrolet_Corvette_C8_IAA_2021_1X7A0156.jpg'), color: '#facc15', sky: '#1e1b4b', loves: 298 },
  { id: 's10', owner: 'Noah', car: 'Lamborghini Huracán', category: 'Exotic', kw: 'Lamborghini Huracan', caption: 'Loud and proud 🟢', img: W('c/ca/2017_Lamborghini_Huracan_LP610.jpg/1024px-2017_Lamborghini_Huracan_LP610.jpg'), color: '#22c55e', sky: '#052e16', loves: 604 },
]
