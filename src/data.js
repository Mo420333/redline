// Mock content for the Redline prototype.
// Photos load real images by keyword at runtime (LoremFlickr); a textured
// fallback shows if a photo can't load.
const img = (kw, lock) => `https://loremflickr.com/800/600/${kw}?lock=${lock}`

export const EVENTS = [
  { id: 'e1', title: 'Sunset Cars & Coffee', type: 'Cars & Coffee', city: 'Los Angeles, CA', region: 'West', country: 'USA', date: 'Jul 12', time: '7:00 AM', attendees: 312, emoji: '☕', tag: 'Weekly', img: img('losangeles,skyline,sunset', 31), kw: 'Los Angeles skyline sunset' },
  { id: 'e2', title: 'Midnight Touge Run', type: 'Cruise', city: 'Denver, CO', region: 'West', country: 'USA', date: 'Jul 14', time: '10:00 PM', attendees: 86, emoji: '🌙', tag: 'Night', img: img('denver,skyline,night', 32), kw: 'Denver skyline night' },
  { id: 'e3', title: 'Eurofest Show & Shine', type: 'Car Show', city: 'Miami, FL', region: 'South', country: 'USA', date: 'Jul 20', time: '11:00 AM', attendees: 540, emoji: '🏆', tag: 'Featured', img: img('miami,beach,skyline', 33), kw: 'Miami skyline' },
  { id: 'e4', title: 'Track Day @ Laguna', type: 'Track Day', city: 'Monterey, CA', region: 'West', country: 'USA', date: 'Jul 22', time: '8:00 AM', attendees: 64, emoji: '🏁', tag: 'Track', img: img('monterey,california,coast', 34), kw: 'Monterey California coast' },
  { id: 'e5', title: 'JDM Legends Meet', type: 'Cars & Coffee', city: 'Austin, TX', region: 'South', country: 'USA', date: 'Jul 27', time: '9:00 AM', attendees: 220, emoji: '🇯🇵', tag: 'Popular', img: img('austin,texas,skyline', 35), kw: 'Austin Texas skyline' },
  { id: 'e6', title: 'Brooklyn Night Lights', type: 'Cruise', city: 'New York, NY', region: 'East', country: 'USA', date: 'Aug 02', time: '9:00 PM', attendees: 175, emoji: '🌃', tag: 'Night', img: img('newyork,city,night', 36), kw: 'New York City skyline night' },
  { id: 'e7', title: 'Tokyo Daikoku PA Meet', type: 'Car Show', city: 'Tokyo', region: 'Asia', country: 'Japan', date: 'Aug 05', time: '8:00 PM', attendees: 980, emoji: '🗼', tag: 'Global', img: img('tokyo,city,night', 37), kw: 'Tokyo skyline night' },
  { id: 'e8', title: 'Nürburgring Touristenfahrten', type: 'Track Day', city: 'Nürburg', region: 'Europe', country: 'Germany', date: 'Aug 09', time: '5:00 PM', attendees: 410, emoji: '🇩🇪', tag: 'Track', img: img('racetrack,germany,circuit', 38), kw: 'Nurburgring racetrack' },
  { id: 'e9', title: 'London Supercar Sunday', type: 'Car Show', city: 'London', region: 'Europe', country: 'UK', date: 'Aug 11', time: '10:00 AM', attendees: 360, emoji: '🇬🇧', tag: 'Global', img: img('london,city,skyline', 39), kw: 'London skyline' },
]

export const REGIONS = ['All', 'West', 'South', 'East', 'Europe', 'Asia']
export const EVENT_TYPES = ['All Types', 'Cars & Coffee', 'Cruise', 'Car Show', 'Track Day']

export const GIVEAWAYS = [
  { id: 'g1', prize: 'Set of 4 Volk TE37 Wheels', sponsor: 'by Rays Engineering', endsInDays: 3, value: '$2,400', entries: 4820, emoji: '🛞' },
  { id: 'g2', prize: 'GoPro Hero + Suction Mount Kit', sponsor: 'Capture your runs', endsInDays: 8, value: '$520', entries: 9140, emoji: '🎥' },
  { id: 'g3', prize: '$1,000 Detailing Gift Card', sponsor: 'Adam’s Polishes', endsInDays: 1, value: '$1,000', entries: 12030, emoji: '✨' },
]

export const MERCH = [
  { id: 'm1', name: 'Redline Logo Tee', price: 32, emoji: '👕', color: '#dc2626' },
  { id: 'm2', name: 'Apex Snapback', price: 28, emoji: '🧢', color: '#ef4444' },
  { id: 'm3', name: 'Touge Hoodie', price: 64, emoji: '🧥', color: '#b91c1c' },
  { id: 'm4', name: 'Tach Sticker Pack', price: 12, emoji: '🩹', color: '#f87171' },
  { id: 'm5', name: 'Pit Crew Jacket', price: 98, emoji: '🏎️', color: '#991b1b' },
  { id: 'm6', name: 'Redline Enamel Pin', price: 9, emoji: '📌', color: '#dc2626' },
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
  { id: 's1', owner: 'Marcus', car: '1998 Nissan Skyline GT-R', category: 'JDM', kw: 'Nissan Skyline GT-R', caption: 'Finally got the BBS fitment right 🔥', img: img('nissan,gtr,car', 11), color: '#dc2626', sky: '#1e293b', loves: 248 },
  { id: 's2', owner: 'Dana', car: 'Mazda RX-7 FD', category: 'JDM', kw: 'Mazda RX-7', caption: 'Sunset pulls hit different.', img: img('mazda,rx7,car', 12), color: '#38bdf8', sky: '#7c2d12', loves: 192 },
  { id: 's3', owner: 'Sofia', car: 'BMW E30 M3', brand: 'bmw', category: 'Euro', kw: 'BMW E30', caption: 'Restored her over 2 years. Worth every weekend.', img: img('bmw,e30', 13), color: '#e5e7eb', sky: '#0f172a', loves: 421 },
  { id: 's4', owner: 'Andre', car: 'BMW M4 Competition', brand: 'bmw', category: 'Euro', kw: 'BMW M4', caption: 'Twin-turbo therapy. That grille though 😍', img: img('bmw,m4', 14), color: '#1d4ed8', sky: '#14532d', loves: 387 },
  { id: 's5', owner: 'Kenji', car: 'Honda S2000 AP1', category: 'JDM', kw: 'Honda S2000', caption: 'VTEC just kicked in, yo 🏎️', img: img('honda,s2000', 15), color: '#dc2626', sky: '#1e1b4b', loves: 333 },
  { id: 's6', owner: 'Mia', car: 'BMW M2', brand: 'bmw', category: 'Euro', kw: 'BMW M2', caption: 'Small bumper, big attitude.', img: img('bmw,m2', 16), color: '#f97316', sky: '#0c4a6e', loves: 264 },
  { id: 's7', owner: 'Leo', car: 'Ford Mustang GT', category: 'Muscle', kw: 'Ford Mustang', caption: 'American muscle, no apologies.', img: img('ford,mustang', 17), color: '#1e40af', sky: '#1e293b', loves: 201 },
  { id: 's8', owner: 'Ava', car: 'Porsche 911 GT3', category: 'Exotic', kw: 'Porsche 911', caption: 'Flat-six symphony 🎶', img: img('porsche,911', 18), color: '#e5e7eb', sky: '#0f172a', loves: 512 },
  { id: 's9', owner: 'Sam', car: 'Chevrolet Corvette C8', category: 'Muscle', kw: 'Chevrolet Corvette', caption: 'Mid-engine changed everything.', img: img('chevrolet,corvette', 19), color: '#facc15', sky: '#1e1b4b', loves: 298 },
  { id: 's10', owner: 'Noah', car: 'Lamborghini Huracán', category: 'Exotic', kw: 'Lamborghini Huracan', caption: 'Loud and proud 🟢', img: img('lamborghini,huracan', 20), color: '#22c55e', sky: '#052e16', loves: 604 },
]
