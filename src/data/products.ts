export type Category =
  | 'Gaming PCs'
  | 'Processors'
  | 'Graphics Cards'
  | 'Motherboards'
  | 'Memory'
  | 'Storage'
  | 'Power Supplies'
  | 'Cases'
  | 'Cooling'
  | 'Monitors'
  | 'Gaming Mice'
  | 'Mechanical Keyboards'
  | 'Mouse Pads & Desk Mats'
  | 'Headsets & Audio'
  | 'Microphones & Webcams'
  | 'Controllers & Sim Gear'
  | 'Battlestations & Gear'
  | 'Operating Systems'

export type Department =
  | 'Gaming PCs'
  | 'Graphics Cards (GPUs)'
  | 'Processors (CPUs)'
  | 'Motherboards'
  | 'Memory (RAM)'
  | 'Storage (NVMe & SSDs)'
  | 'Power Supplies (PSUs)'
  | 'PC Cases & Cooling'
  | 'Monitors & Displays'
  | 'Gaming Mice'
  | 'Mechanical Keyboards'
  | 'Mouse Pads & Desk Mats'
  | 'Headsets & Audio'
  | 'Microphones & Webcams'
  | 'Controllers & Sim Gear'
  | 'Operating Systems'
  | 'Battlestations & Gear'

export type BuilderSlot =
  | 'cpu' | 'cooler' | 'motherboard' | 'ram' | 'gpu' | 'storage' | 'psu' | 'case' | 'os'
  | 'monitor' | 'gaming-mice' | 'mechanical-keyboards' | 'mouse-pads' | 'headsets-audio'
  | 'microphones-webcams' | 'controllers-sim'

export interface Product {
  id: string
  name: string
  brand: string
  category: Category
  department: Department
  price: number
  rating: number
  reviews: number
  image: string
  badge?: string
  description: string
  specs: Record<string, string>
  stock: number
  builderSlot?: BuilderSlot
  socket?: string
  memoryType?: string
  watts?: number
  gpuLength?: number
  caseClearance?: number
}

type ProductSeed = Omit<Product, 'department' | 'image'>

const seedProducts: ProductSeed[] = [
  {
    id: 'rig-apex', name: 'Apex X 4K Creator Rig', brand: 'OZ Gaming', category: 'Gaming PCs', price: 3299, rating: 4.9, reviews: 128,
    badge: 'BUILT TO ORDER', description: 'Uncompromising 4K gaming with carefully tuned thermals and a clean, quiet build.',
    specs: { GPU: 'GeForce RTX 4080 SUPER 16GB', CPU: 'Ryzen 7 9800X3D', Memory: '32GB DDR5-6000', Storage: '2TB Gen4 NVMe', PSU: '850W Gold' }, stock: 8,
  },
  {
    id: 'rig-vector', name: 'Vector 1440p Performance PC', brand: 'OZ Gaming', category: 'Gaming PCs', price: 1899, rating: 4.8, reviews: 86,
    badge: 'BEST SELLER', description: 'The sweet spot for high-refresh 1440p gaming, ready to play out of the box.',
    specs: { GPU: 'GeForce RTX 4070 SUPER 12GB', CPU: 'Ryzen 7 7700', Memory: '32GB DDR5-6000', Storage: '1TB Gen4 NVMe', PSU: '750W Gold' }, stock: 12,
  },
  {
    id: 'rig-nova', name: 'Nova 1080p Starter Rig', brand: 'OZ Gaming', category: 'Gaming PCs', price: 999, rating: 4.7, reviews: 61,
    badge: 'READY TO SHIP', description: 'A confident first gaming PC, balanced for smooth 1080p play and easy upgrades.',
    specs: { GPU: 'Radeon RX 7600 8GB', CPU: 'Ryzen 5 7600', Memory: '16GB DDR5-5600', Storage: '1TB NVMe', PSU: '650W Bronze' }, stock: 5,
  },
  {
    id: 'rig-pulse', name: 'Pulse SFF Gaming System', brand: 'OZ Gaming', category: 'Gaming PCs', price: 1549, rating: 4.8, reviews: 44,
    badge: 'COMPACT BUILD', description: 'Big-frame performance in a footprint that fits neatly into a smaller setup.',
    specs: { GPU: 'GeForce RTX 4060 Ti 8GB', CPU: 'Ryzen 5 7600', Memory: '32GB DDR5-5600', Storage: '1TB NVMe', PSU: '750W SFX Gold' }, stock: 3,
  },
  {
    id: 'cpu-9800x3d', name: 'Ryzen 7 9800X3D', brand: 'AMD', category: 'Processors', price: 479, rating: 4.9, reviews: 214,
    badge: 'GAMING KING', description: 'High-end gaming processor with 3D V-Cache for exceptional frame rates.',
    specs: { Cores: '8 / 16 threads', Boost: 'Up to 5.2GHz', Cache: '96MB L3', TDP: '120W', Socket: 'AM5' }, stock: 16, builderSlot: 'cpu', socket: 'AM5', watts: 120,
  },
  {
    id: 'cpu-ryzen7600', name: 'Ryzen 5 7600', brand: 'AMD', category: 'Processors', price: 189, rating: 4.8, reviews: 338,
    description: 'Efficient six-core AM5 performance with a capable stock cooler included.',
    specs: { Cores: '6 / 12 threads', Boost: 'Up to 5.1GHz', Cache: '38MB', TDP: '65W', Socket: 'AM5' }, stock: 22, builderSlot: 'cpu', socket: 'AM5', watts: 65,
  },
  {
    id: 'cpu-i5-14600k', name: 'Core i5-14600K', brand: 'Intel', category: 'Processors', price: 289, rating: 4.7, reviews: 172,
    description: 'A versatile hybrid desktop CPU for gaming, streaming, and creation.',
    specs: { Cores: '14 (6P + 8E)', Boost: 'Up to 5.3GHz', Cache: '24MB', TDP: '125W', Socket: 'LGA1700' }, stock: 11, builderSlot: 'cpu', socket: 'LGA1700', watts: 125,
  },
  {
    id: 'gpu-4080s', name: 'GeForce RTX 4080 SUPER Trinity', brand: 'ZOTAC', category: 'Graphics Cards', price: 999, rating: 4.8, reviews: 97,
    badge: '4K READY', description: 'Cool, quiet triple-fan graphics with ray tracing and AI acceleration.',
    specs: { Memory: '16GB GDDR6X', Interface: 'PCIe 4.0 x16', Boost: '2,565MHz', TDP: '320W', Length: '306mm' }, stock: 4, builderSlot: 'gpu', watts: 320, gpuLength: 306,
  },
  {
    id: 'gpu-4070s', name: 'GeForce RTX 4070 SUPER Dual', brand: 'ASUS', category: 'Graphics Cards', price: 599, rating: 4.8, reviews: 156,
    badge: 'TOP PICK', description: 'High-refresh 1440p graphics with efficient Ada architecture.',
    specs: { Memory: '12GB GDDR6X', Interface: 'PCIe 4.0 x16', Boost: '2,475MHz', TDP: '220W', Length: '267mm' }, stock: 9, builderSlot: 'gpu', watts: 220, gpuLength: 267,
  },
  {
    id: 'gpu-rx7600', name: 'Radeon RX 7600 Pulse', brand: 'Sapphire', category: 'Graphics Cards', price: 269, rating: 4.6, reviews: 84,
    description: 'Excellent value 1080p gaming with 8GB of fast GDDR6 memory.',
    specs: { Memory: '8GB GDDR6', Interface: 'PCIe 4.0 x8', Boost: '2,755MHz', TDP: '165W', Length: '240mm' }, stock: 14, builderSlot: 'gpu', watts: 165, gpuLength: 240,
  },
  {
    id: 'mb-b650', name: 'B650 AORUS Elite AX', brand: 'GIGABYTE', category: 'Motherboards', price: 219, rating: 4.7, reviews: 109,
    description: 'Feature-rich AM5 ATX board with Wi-Fi 6E and robust power delivery.',
    specs: { Socket: 'AM5', Memory: 'DDR5, 4 DIMM', Form: 'ATX', Storage: '3x M.2', Network: '2.5GbE + Wi-Fi 6E' }, stock: 7, builderSlot: 'motherboard', socket: 'AM5', memoryType: 'DDR5',
  },
  {
    id: 'mb-z790', name: 'MAG Z790 Tomahawk WiFi', brand: 'MSI', category: 'Motherboards', price: 249, rating: 4.8, reviews: 91,
    description: 'A sturdy Intel LGA1700 board with DDR5, Wi-Fi 6E, and four M.2 slots.',
    specs: { Socket: 'LGA1700', Memory: 'DDR5, 4 DIMM', Form: 'ATX', Storage: '4x M.2', Network: '2.5GbE + Wi-Fi 6E' }, stock: 5, builderSlot: 'motherboard', socket: 'LGA1700', memoryType: 'DDR5',
  },
  {
    id: 'ram-32-ddr5', name: 'Vengeance 32GB DDR5-6000', brand: 'Corsair', category: 'Memory', price: 104, rating: 4.8, reviews: 263,
    badge: 'DDR5-6000', description: 'Low-latency, AMD EXPO-ready memory kit with a clean low-profile heat spreader.',
    specs: { Capacity: '32GB (2x16GB)', Speed: 'DDR5-6000', Latency: 'CL30', Voltage: '1.35V' }, stock: 25, builderSlot: 'ram', memoryType: 'DDR5',
  },
  {
    id: 'ram-32-ddr4', name: 'Fury Beast 32GB DDR4-3600', brand: 'Kingston', category: 'Memory', price: 68, rating: 4.7, reviews: 192,
    description: 'Reliable dual-channel memory for DDR4 platforms and practical upgrades.',
    specs: { Capacity: '32GB (2x16GB)', Speed: 'DDR4-3600', Latency: 'CL18', Voltage: '1.35V' }, stock: 18, builderSlot: 'ram', memoryType: 'DDR4',
  },
  {
    id: 'ssd-990pro', name: '990 PRO 2TB NVMe SSD', brand: 'Samsung', category: 'Storage', price: 169, rating: 4.9, reviews: 401,
    badge: 'GEN4 SPEED', description: 'Fast PCIe 4.0 storage for game libraries and demanding creative projects.',
    specs: { Capacity: '2TB', Interface: 'PCIe 4.0 x4', Read: '7,450MB/s', Write: '6,900MB/s', Form: 'M.2 2280' }, stock: 21, builderSlot: 'storage',
  },
  {
    id: 'ssd-sn770', name: 'Black SN770 1TB NVMe SSD', brand: 'WD', category: 'Storage', price: 79, rating: 4.8, reviews: 289,
    description: 'Responsive, DRAM-less PCIe 4.0 storage in a compact M.2 form factor.',
    specs: { Capacity: '1TB', Interface: 'PCIe 4.0 x4', Read: '5,150MB/s', Write: '4,900MB/s', Form: 'M.2 2280' }, stock: 31, builderSlot: 'storage',
  },
  {
    id: 'psu-rm850e', name: 'RM850e 850W 80+ Gold', brand: 'Corsair', category: 'Power Supplies', price: 129, rating: 4.8, reviews: 144,
    description: 'Fully modular ATX 3.0 power with quiet operation and a 10-year warranty.',
    specs: { Output: '850W', Efficiency: '80+ Gold', Cabling: 'Fully modular', Standard: 'ATX 3.0 / PCIe 5.0' }, stock: 13, builderSlot: 'psu', watts: 850,
  },
  {
    id: 'psu-cx650', name: 'CX650 650W Bronze', brand: 'Corsair', category: 'Power Supplies', price: 69, rating: 4.6, reviews: 121,
    description: 'Dependable 650W power for mainstream gaming builds and everyday upgrades.',
    specs: { Output: '650W', Efficiency: '80+ Bronze', Cabling: 'Non-modular', Standard: 'ATX 2.4' }, stock: 10, builderSlot: 'psu', watts: 650,
  },
  {
    id: 'case-h510', name: 'H5 Flow Mid-Tower', brand: 'NZXT', category: 'Cases', price: 94, rating: 4.7, reviews: 117,
    description: 'Airflow-focused ATX chassis with a tempered glass side panel and tidy cable routing.',
    specs: { Board: 'ATX / mATX / Mini-ITX', 'GPU clearance': '365mm', Cooling: 'Up to 7 fans', 'Front I/O': 'USB-C, USB-A' }, stock: 9, builderSlot: 'case', caseClearance: 365,
  },
  {
    id: 'case-4000d', name: '4000D Airflow Tempered Glass', brand: 'Corsair', category: 'Cases', price: 104, rating: 4.8, reviews: 206,
    description: 'Clean, roomy mid-tower with a high-airflow front panel and accessible build layout.',
    specs: { Board: 'ATX / mATX / Mini-ITX', 'GPU clearance': '360mm', Cooling: 'Up to 6 fans', 'Front I/O': 'USB-C, USB-A' }, stock: 6, builderSlot: 'case', caseClearance: 360,
  },
  {
    id: 'cooler-peerless', name: 'Peerless Assassin 120 SE', brand: 'Thermalright', category: 'Cooling', price: 39, rating: 4.8, reviews: 318,
    badge: 'GREAT VALUE', description: 'Dual-tower air cooling with two quiet 120mm fans and broad socket support.',
    specs: { Type: 'Dual-tower air', Fan: '2x 120mm PWM', Height: '155mm', Socket: 'AM5 / AM4 / LGA1700' }, stock: 17, builderSlot: 'cooler',
  },
  {
    id: 'cooler-kraken', name: 'Kraken 240 RGB AIO', brand: 'NZXT', category: 'Cooling', price: 149, rating: 4.7, reviews: 79,
    description: 'A clean 240mm liquid cooler with vivid addressable lighting and quiet fans.',
    specs: { Type: '240mm AIO', Radiator: '275 x 123 x 30mm', Fans: '2x 120mm PWM', Socket: 'AM5 / AM4 / LGA1700' }, stock: 4, builderSlot: 'cooler',
  },
  {
    id: 'monitor-lg27', name: 'UltraGear 27GR83Q-B 27" QHD', brand: 'LG', category: 'Monitors', price: 449, rating: 4.8, reviews: 94,
    badge: '240HZ QHD', description: 'Fast IPS clarity and smooth 240Hz refresh for competitive 1440p gaming.',
    specs: { Panel: 'IPS, 2560 x 1440', Refresh: '240Hz', Response: '1ms GtG', Sync: 'G-SYNC Compatible / FreeSync' }, stock: 7, builderSlot: 'monitor',
  },
  {
    id: 'monitor-oled', name: 'Alienware AW3423DWF 34" QD-OLED', brand: 'Dell', category: 'Monitors', price: 799, rating: 4.9, reviews: 137,
    description: 'Immersive ultrawide OLED contrast, cinematic color, and a 165Hz refresh rate.',
    specs: { Panel: 'QD-OLED, 3440 x 1440', Refresh: '165Hz', Response: '0.1ms', HDR: 'DisplayHDR True Black 400' }, stock: 3, builderSlot: 'monitor',
  },
  {
    id: 'keyboard-keychron', name: 'K8 Pro Wireless Mechanical', brand: 'Keychron', category: 'Mechanical Keyboards', price: 99, rating: 4.8, reviews: 168,
    description: 'Hot-swappable tenkeyless board with tactile switches and wired or Bluetooth modes.',
    specs: { Layout: 'TKL, 87 keys', Switches: 'Hot-swappable mechanical', Connection: 'USB-C / Bluetooth 5.1', Backlight: 'RGB' }, stock: 12, builderSlot: 'mechanical-keyboards',
  },
  {
    id: 'mouse-gpro', name: 'G Pro X Superlight 2', brand: 'Logitech', category: 'Gaming Mice', price: 159, rating: 4.9, reviews: 244,
    badge: 'PRO CHOICE', description: 'Featherweight wireless esports mouse with a precise HERO 2 sensor.',
    specs: { Weight: '60g', Sensor: 'HERO 2, 32K DPI', Polling: 'Up to 2,000Hz', Connection: 'LIGHTSPEED wireless', Battery: 'Up to 95 hours' }, stock: 8, builderSlot: 'gaming-mice',
  },
  {
    id: 'headset-cloud3', name: 'Cloud III Wireless Headset', brand: 'HyperX', category: 'Headsets & Audio', price: 149, rating: 4.7, reviews: 132,
    description: 'Comfort-first wireless headset with spatial audio and a detachable microphone.',
    specs: { Drivers: '53mm angled', Connection: '2.4GHz wireless', Battery: 'Up to 120 hours', Microphone: 'Detachable, noise cancelling' }, stock: 6, builderSlot: 'headsets-audio',
  },
  {
    id: 'chair-titan', name: 'TITAN Evo Gaming Chair', brand: 'Secretlab', category: 'Battlestations & Gear', price: 549, rating: 4.8, reviews: 386,
    badge: 'ERGONOMIC', description: 'Supportive, adjustable seating designed for long sessions at your battle station.',
    specs: { Upholstery: 'SoftWeave fabric', Recline: 'Up to 165°', Support: '4-way L-ADAPT lumbar', Capacity: 'Up to 130kg' }, stock: 5,
  },
  {
    id: 'desk-levitate', name: 'Magnus Pro Sit-to-Stand Desk', brand: 'Secretlab', category: 'Battlestations & Gear', price: 799, rating: 4.9, reviews: 91,
    description: 'Height-adjustable steel desk with integrated cable management and power column.',
    specs: { Surface: '150 x 70cm', Height: '65–125cm', Capacity: 'Up to 120kg', Finish: 'Black steel' }, stock: 2,
  },
  {
    id: 'mat-deskpad', name: 'Large RGB Desk Mat', brand: 'OZ Gaming', category: 'Mouse Pads & Desk Mats', price: 39, rating: 4.6, reviews: 73,
    description: 'Extended stitched-edge surface with a subtle customizable RGB perimeter.',
    specs: { Dimensions: '900 x 400mm', Surface: 'Micro-textured cloth', Base: 'Anti-slip rubber', Lighting: 'USB powered RGB' }, stock: 19, builderSlot: 'mouse-pads',
  },
  {
    id: 'paste-nt-h2', name: 'NT-H2 Thermal Compound', brand: 'Noctua', category: 'Cooling', price: 13, rating: 4.9, reviews: 223,
    description: 'Easy-to-apply premium thermal compound for CPU and GPU coolers.',
    specs: { Weight: '3.5g', Conductivity: 'Non-electrically conductive', Application: 'CPU / GPU', Included: 'Cleaning wipes' }, stock: 40,
  },
  {
    id: 'ups-cyberpower', name: 'CP1500PFCLCD UPS Backup', brand: 'CyberPower', category: 'Battlestations & Gear', price: 229, rating: 4.7, reviews: 88,
    description: 'Pure sine wave battery backup and surge protection for valuable gaming gear.',
    specs: { Capacity: '1500VA / 1000W', Outlets: '12 (6 battery backup)', Display: 'Multifunction LCD', Protection: 'AVR + surge' }, stock: 4,
  },
  {
    id: 'mic-wave3', name: 'Wave:3 USB Condenser Mic', brand: 'Elgato', category: 'Microphones & Webcams', price: 149, rating: 4.8, reviews: 146,
    description: 'Stream-ready USB microphone with a capacitive mute sensor and clipguard.',
    specs: { Type: 'Condenser, cardioid', Resolution: '24-bit / 96kHz', Connection: 'USB-C', Controls: 'Gain / mix / headphone' }, stock: 9, builderSlot: 'microphones-webcams',
  },
  {
    id: 'fan-arctic', name: 'P12 PWM PST 120mm Fan 5-Pack', brand: 'ARCTIC', category: 'Cooling', price: 32, rating: 4.8, reviews: 207,
    description: 'High-static-pressure case fans with low-noise PWM control and daisy chaining.',
    specs: { Size: '120 x 120 x 25mm', Speed: '200–1800 RPM', Bearing: 'Fluid dynamic bearing', Connection: '4-pin PWM PST' }, stock: 16,
  },
  {
    id: 'webcam-brio', name: 'Brio 4K Webcam', brand: 'Logitech', category: 'Microphones & Webcams', price: 169, rating: 4.7, reviews: 75,
    description: 'Sharp 4K streaming webcam with HDR, autofocus, and flexible field of view.',
    specs: { Resolution: '4K at 30fps', Focus: 'Autofocus', FOV: '65° / 78° / 90°', Connection: 'USB-C' }, stock: 6, builderSlot: 'microphones-webcams',
  },
  {
    id: 'os-windows11', name: 'Windows 11 Home License', brand: 'Microsoft', category: 'Operating Systems', price: 119, rating: 4.7, reviews: 102,
    description: 'Genuine Windows 11 Home digital license for a ready-to-play new PC.',
    specs: { Edition: 'Windows 11 Home', License: 'Retail digital key', Install: 'USB media / download', Activation: 'Single PC' }, stock: 24, builderSlot: 'os',
  },
]

type SeedOptions = Partial<Pick<Product, 'builderSlot' | 'socket' | 'memoryType' | 'watts' | 'gpuLength' | 'caseClearance'>>

const generatedSeeds: ProductSeed[] = []
const addProduct = (category: Category, name: string, brand: string, price: number, specs: Record<string, string>, options: SeedOptions = {}, stockOverride?: number) => {
  const index = generatedSeeds.length
  const slug = `${category}-${name}`.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
  generatedSeeds.push({
    id: `catalog-${slug}`,
    name,
    brand,
    category,
    price,
    rating: [4.6, 4.7, 4.8, 4.9, 4.5][index % 5],
    reviews: 42 + (index * 47) % 390,
    description: `${name} by ${brand}, selected for dependable performance and clear, verified specifications.`,
    specs,
    stock: stockOverride ?? [3, 8, 14, 21, 6, 0, 11][index % 7],
    ...options,
  })
}

const addGpu = (name: string, brand: string, price: number, memory: string, interfaceType: string, boost: string, watts: number, length: number) => {
  addProduct('Graphics Cards', name, brand, price, { Memory: memory, Interface: interfaceType, Boost: boost, TDP: `${watts}W`, Length: `${length}mm` }, { builderSlot: 'gpu', watts, gpuLength: length })
}

addGpu('GeForce RTX 5090 Founders Edition', 'NVIDIA', 1999, '32GB GDDR7', 'PCIe 5.0 x16', '2,407MHz', 575, 304)
addGpu('GeForce RTX 5080 Gaming Trio OC', 'MSI', 1199, '16GB GDDR7', 'PCIe 5.0 x16', '2,730MHz', 360, 338)
addGpu('GeForce RTX 5070 Ti Windforce OC', 'GIGABYTE', 849, '16GB GDDR7', 'PCIe 5.0 x16', '2,490MHz', 300, 304)
addGpu('GeForce RTX 5070 TUF Gaming OC', 'ASUS', 699, '12GB GDDR7', 'PCIe 5.0 x16', '2,610MHz', 250, 301)
addGpu('GeForce RTX 5060 Ti 16GB Ventus 2X', 'MSI', 499, '16GB GDDR7', 'PCIe 5.0 x8', '2,572MHz', 180, 227)
addGpu('GeForce RTX 5060 Ti 8GB Dual OC', 'ASUS', 399, '8GB GDDR7', 'PCIe 5.0 x8', '2,610MHz', 180, 228)
addGpu('GeForce RTX 5060 Eagle OC', 'GIGABYTE', 329, '8GB GDDR7', 'PCIe 5.0 x8', '2,550MHz', 145, 199)
addGpu('GeForce RTX 4090 Gaming X Trio', 'MSI', 1799, '24GB GDDR6X', 'PCIe 4.0 x16', '2,595MHz', 450, 337)
addGpu('GeForce RTX 4060 Ti 16GB Dual', 'ZOTAC', 449, '16GB GDDR6', 'PCIe 4.0 x8', '2,535MHz', 165, 226)
addGpu('GeForce RTX 4060 Twin Edge OC', 'ZOTAC', 309, '8GB GDDR6', 'PCIe 4.0 x8', '2,490MHz', 115, 226)
addGpu('Radeon RX 9070 XT Pulse', 'Sapphire', 699, '16GB GDDR6', 'PCIe 5.0 x16', '2,970MHz', 304, 320)
addGpu('Radeon RX 9070 Gaming OC', 'GIGABYTE', 599, '16GB GDDR6', 'PCIe 5.0 x16', '2,700MHz', 220, 288)
addGpu('Radeon RX 9060 XT 16GB Mech', 'MSI', 379, '16GB GDDR6', 'PCIe 5.0 x16', '2,600MHz', 160, 249)
addGpu('Radeon RX 7900 XTX Nitro+', 'Sapphire', 999, '24GB GDDR6', 'PCIe 4.0 x16', '2,680MHz', 355, 320)
addGpu('Radeon RX 7900 XT Hellhound', 'PowerColor', 749, '20GB GDDR6', 'PCIe 4.0 x16', '2,500MHz', 315, 320)
addGpu('Radeon RX 7800 XT Gaming OC', 'GIGABYTE', 499, '16GB GDDR6', 'PCIe 4.0 x16', '2,565MHz', 263, 302)
addGpu('Arc B580 Steel Legend 12GB', 'ASRock', 279, '12GB GDDR6', 'PCIe 4.0 x8', '2,740MHz', 190, 328)

const addCpu = (name: string, brand: string, price: number, socket: string, cores: string, boost: string, cache: string, watts: number) => {
  addProduct('Processors', name, brand, price, { Cores: cores, Boost: boost, Cache: cache, TDP: `${watts}W`, Socket: socket }, { builderSlot: 'cpu', socket, watts })
}

addCpu('Ryzen 9 9950X3D', 'AMD', 699, 'AM5', '16 cores / 32 threads', 'Up to 5.7GHz', '144MB', 170)
addCpu('Ryzen 9 9900X3D', 'AMD', 599, 'AM5', '12 cores / 24 threads', 'Up to 5.5GHz', '140MB', 120)
addCpu('Ryzen 9 9950X', 'AMD', 599, 'AM5', '16 cores / 32 threads', 'Up to 5.7GHz', '80MB', 170)
addCpu('Ryzen 9 9900X', 'AMD', 449, 'AM5', '12 cores / 24 threads', 'Up to 5.6GHz', '76MB', 120)
addCpu('Ryzen 7 9700X', 'AMD', 329, 'AM5', '8 cores / 16 threads', 'Up to 5.5GHz', '40MB', 65)
addCpu('Ryzen 5 9600X', 'AMD', 249, 'AM5', '6 cores / 12 threads', 'Up to 5.4GHz', '38MB', 65)
addCpu('Ryzen 7 7800X3D', 'AMD', 379, 'AM5', '8 cores / 16 threads', 'Up to 5.0GHz', '104MB', 120)
addCpu('Ryzen 9 7950X', 'AMD', 499, 'AM5', '16 cores / 32 threads', 'Up to 5.7GHz', '80MB', 170)
addCpu('Ryzen 9 7900', 'AMD', 349, 'AM5', '12 cores / 24 threads', 'Up to 5.4GHz', '76MB', 65)
addCpu('Ryzen 7 7700', 'AMD', 269, 'AM5', '8 cores / 16 threads', 'Up to 5.3GHz', '40MB', 65)
addCpu('Ryzen 5 7500F', 'AMD', 159, 'AM5', '6 cores / 12 threads', 'Up to 5.0GHz', '38MB', 65)
addCpu('Core Ultra 9 285K', 'Intel', 589, 'LGA1851', '24 cores (8P + 16E)', 'Up to 5.7GHz', '36MB', 125)
addCpu('Core Ultra 7 265K', 'Intel', 399, 'LGA1851', '20 cores (8P + 12E)', 'Up to 5.5GHz', '30MB', 125)
addCpu('Core Ultra 5 245K', 'Intel', 309, 'LGA1851', '14 cores (6P + 8E)', 'Up to 5.2GHz', '24MB', 125)
addCpu('Core i7-14700K', 'Intel', 379, 'LGA1700', '20 cores (8P + 12E)', 'Up to 5.6GHz', '33MB', 125)
addCpu('Core i5-14400F', 'Intel', 189, 'LGA1700', '10 cores (6P + 4E)', 'Up to 4.7GHz', '20MB', 65)
addCpu('Ryzen 7 5700X', 'AMD', 169, 'AM4', '8 cores / 16 threads', 'Up to 4.6GHz', '36MB', 65)

const addMotherboard = (name: string, brand: string, price: number, socket: string, memoryType: string, form: string, storage: string, network: string) => {
  addProduct('Motherboards', name, brand, price, { Socket: socket, Memory: memoryType, Form: form, Storage: storage, Network: network }, {
    builderSlot: 'motherboard',
    socket,
    memoryType: memoryType.startsWith('DDR4') ? 'DDR4' : 'DDR5',
  })
}

addMotherboard('ROG Crosshair X870E Hero', 'ASUS', 699, 'AM5', 'DDR5, 4 DIMM', 'ATX', '5x M.2, PCIe 5.0', 'Wi-Fi 7 + 5GbE')
addMotherboard('X870E AORUS Master', 'GIGABYTE', 499, 'AM5', 'DDR5, 4 DIMM', 'E-ATX', '4x M.2, PCIe 5.0', 'Wi-Fi 7 + 5GbE')
addMotherboard('MPG X870E Carbon WiFi', 'MSI', 499, 'AM5', 'DDR5, 4 DIMM', 'ATX', '4x M.2, PCIe 5.0', 'Wi-Fi 7 + 5GbE')
addMotherboard('ROG Strix X870E-E Gaming WiFi', 'ASUS', 449, 'AM5', 'DDR5, 4 DIMM', 'ATX', '5x M.2, PCIe 5.0', 'Wi-Fi 7 + 2.5GbE')
addMotherboard('X870 AORUS Elite WiFi7', 'GIGABYTE', 289, 'AM5', 'DDR5, 4 DIMM', 'ATX', '3x M.2, PCIe 5.0', 'Wi-Fi 7 + 2.5GbE')
addMotherboard('MAG B850 Tomahawk Max WiFi', 'MSI', 229, 'AM5', 'DDR5, 4 DIMM', 'ATX', '3x M.2, PCIe 5.0', 'Wi-Fi 7 + 2.5GbE')
addMotherboard('TUF Gaming B850-Plus WiFi', 'ASUS', 219, 'AM5', 'DDR5, 4 DIMM', 'ATX', '3x M.2, PCIe 5.0', 'Wi-Fi 7 + 2.5GbE')
addMotherboard('B650E Steel Legend WiFi', 'ASRock', 229, 'AM5', 'DDR5, 4 DIMM', 'ATX', '3x M.2, PCIe 5.0', 'Wi-Fi 6E + 2.5GbE')
addMotherboard('B650M AORUS Elite AX', 'GIGABYTE', 179, 'AM5', 'DDR5, 4 DIMM', 'Micro-ATX', '2x M.2, PCIe 4.0', 'Wi-Fi 6E + 2.5GbE')
addMotherboard('MAG B650 Tomahawk WiFi', 'MSI', 199, 'AM5', 'DDR5, 4 DIMM', 'ATX', '3x M.2, PCIe 4.0', 'Wi-Fi 6E + 2.5GbE')
addMotherboard('B550 AORUS Elite AX V2', 'GIGABYTE', 139, 'AM4', 'DDR4, 4 DIMM', 'ATX', '2x M.2, PCIe 4.0', 'Wi-Fi 6 + 2.5GbE')
addMotherboard('ROG Strix B550-F Gaming WiFi II', 'ASUS', 159, 'AM4', 'DDR4, 4 DIMM', 'ATX', '2x M.2, PCIe 4.0', 'Wi-Fi 6E + 2.5GbE')
addMotherboard('ROG Maximus Z890 Hero', 'ASUS', 699, 'LGA1851', 'DDR5, 4 DIMM', 'ATX', '5x M.2, PCIe 5.0', 'Wi-Fi 7 + 2.5GbE')
addMotherboard('Z890 AORUS Elite WiFi7', 'GIGABYTE', 299, 'LGA1851', 'DDR5, 4 DIMM', 'ATX', '4x M.2, PCIe 5.0', 'Wi-Fi 7 + 2.5GbE')
addMotherboard('MAG Z890 Tomahawk WiFi', 'MSI', 299, 'LGA1851', 'DDR5, 4 DIMM', 'ATX', '4x M.2, PCIe 5.0', 'Wi-Fi 7 + 5GbE')
addMotherboard('B860M AORUS Elite WiFi6E', 'GIGABYTE', 189, 'LGA1851', 'DDR5, 4 DIMM', 'Micro-ATX', '3x M.2, PCIe 4.0', 'Wi-Fi 6E + 2.5GbE')
addMotherboard('MAG B760 Tomahawk WiFi DDR4', 'MSI', 169, 'LGA1700', 'DDR4, 4 DIMM', 'ATX', '3x M.2, PCIe 4.0', 'Wi-Fi 6E + 2.5GbE')
addMotherboard('TUF Gaming Z790-Plus WiFi', 'ASUS', 249, 'LGA1700', 'DDR5, 4 DIMM', 'ATX', '4x M.2, PCIe 4.0', 'Wi-Fi 6 + 2.5GbE')

const addMemory = (name: string, brand: string, price: number, capacity: string, speed: string, latency: string, memoryType: string) => {
  addProduct('Memory', name, brand, price, { Capacity: capacity, Speed: speed, Latency: latency, Voltage: memoryType === 'DDR5' ? '1.35V' : '1.35V' }, { builderSlot: 'ram', memoryType })
}

addMemory('Trident Z5 Neo RGB 32GB DDR5-6000', 'G.SKILL', 119, '32GB (2x16GB)', 'DDR5-6000 EXPO', 'CL30', 'DDR5')
addMemory('Trident Z5 RGB 64GB DDR5-6400', 'G.SKILL', 209, '64GB (2x32GB)', 'DDR5-6400 XMP', 'CL32', 'DDR5')
addMemory('Dominator Titanium 64GB DDR5-6000', 'Corsair', 239, '64GB (2x32GB)', 'DDR5-6000 EXPO', 'CL30', 'DDR5')
addMemory('Vengeance RGB 32GB DDR5-6400', 'Corsair', 129, '32GB (2x16GB)', 'DDR5-6400 XMP', 'CL36', 'DDR5')
addMemory('Fury Renegade 32GB DDR5-6400', 'Kingston', 134, '32GB (2x16GB)', 'DDR5-6400 XMP', 'CL32', 'DDR5')
addMemory('Fury Beast 32GB DDR5-6000', 'Kingston', 99, '32GB (2x16GB)', 'DDR5-6000 EXPO', 'CL36', 'DDR5')
addMemory('Flare X5 32GB DDR5-6000', 'G.SKILL', 94, '32GB (2x16GB)', 'DDR5-6000 EXPO', 'CL32', 'DDR5')
addMemory('Ripjaws S5 32GB DDR5-5600', 'G.SKILL', 89, '32GB (2x16GB)', 'DDR5-5600 XMP', 'CL28', 'DDR5')
addMemory('Viper Venom 32GB DDR5-6000', 'Patriot', 84, '32GB (2x16GB)', 'DDR5-6000 XMP', 'CL36', 'DDR5')
addMemory('T-Force Delta RGB 32GB DDR5-6000', 'TeamGroup', 99, '32GB (2x16GB)', 'DDR5-6000 XMP', 'CL38', 'DDR5')
addMemory('Vulcan Z 16GB DDR4-3200', 'TeamGroup', 34, '16GB (2x8GB)', 'DDR4-3200', 'CL16', 'DDR4')
addMemory('Vengeance LPX 16GB DDR4-3200', 'Corsair', 39, '16GB (2x8GB)', 'DDR4-3200', 'CL16', 'DDR4')
addMemory('Fury Beast 16GB DDR4-3600', 'Kingston', 42, '16GB (2x8GB)', 'DDR4-3600', 'CL17', 'DDR4')
addMemory('Dominator Platinum RGB 32GB DDR4-3600', 'Corsair', 99, '32GB (2x16GB)', 'DDR4-3600', 'CL18', 'DDR4')
addMemory('Trident Z Neo 32GB DDR4-3600', 'G.SKILL', 89, '32GB (2x16GB)', 'DDR4-3600', 'CL16', 'DDR4')
addMemory('Viper Steel 32GB DDR4-3600', 'Patriot', 69, '32GB (2x16GB)', 'DDR4-3600', 'CL18', 'DDR4')
addMemory('XPG Lancer Blade 32GB DDR5-6000', 'ADATA', 89, '32GB (2x16GB)', 'DDR5-6000 EXPO', 'CL30', 'DDR5')
addMemory('T-Create Expert 64GB DDR5-6000', 'TeamGroup', 179, '64GB (2x32GB)', 'DDR5-6000 XMP', 'CL34', 'DDR5')

const addStorage = (name: string, brand: string, price: number, capacity: string, interfaceType: string, read: string, write: string) => {
  addProduct('Storage', name, brand, price, { Capacity: capacity, Interface: interfaceType, Read: read, Write: write, Form: 'M.2 2280' }, { builderSlot: 'storage' })
}

addStorage('990 PRO 1TB NVMe SSD', 'Samsung', 109, '1TB', 'PCIe 4.0 x4', '7,450MB/s', '6,900MB/s')
addStorage('990 EVO Plus 2TB NVMe SSD', 'Samsung', 139, '2TB', 'PCIe 4.0 x4', '7,250MB/s', '6,300MB/s')
addStorage('T705 2TB PCIe 5.0 NVMe SSD', 'Crucial', 299, '2TB', 'PCIe 5.0 x4', '14,500MB/s', '12,700MB/s')
addStorage('T500 1TB PCIe 4.0 NVMe SSD', 'Crucial', 99, '1TB', 'PCIe 4.0 x4', '7,300MB/s', '6,800MB/s')
addStorage('Black SN850X 2TB NVMe SSD', 'WD', 149, '2TB', 'PCIe 4.0 x4', '7,300MB/s', '6,600MB/s')
addStorage('Black SN850X 4TB NVMe SSD', 'WD', 299, '4TB', 'PCIe 4.0 x4', '7,300MB/s', '6,600MB/s')
addStorage('Black SN770 2TB NVMe SSD', 'WD', 119, '2TB', 'PCIe 4.0 x4', '5,150MB/s', '4,850MB/s')
addStorage('KC3000 2TB NVMe SSD', 'Kingston', 159, '2TB', 'PCIe 4.0 x4', '7,000MB/s', '7,000MB/s')
addStorage('Fury Renegade 2TB NVMe SSD', 'Kingston', 189, '2TB', 'PCIe 4.0 x4', '7,300MB/s', '7,000MB/s')
addStorage('P41 Platinum 2TB NVMe SSD', 'SK hynix', 179, '2TB', 'PCIe 4.0 x4', '7,000MB/s', '6,500MB/s')
addStorage('P44 Pro 2TB NVMe SSD', 'Solidigm', 169, '2TB', 'PCIe 4.0 x4', '7,000MB/s', '6,500MB/s')
addStorage('MP700 Pro 2TB PCIe 5.0 NVMe SSD', 'Corsair', 279, '2TB', 'PCIe 5.0 x4', '12,400MB/s', '11,800MB/s')
addStorage('FireCuda 530 2TB NVMe SSD', 'Seagate', 189, '2TB', 'PCIe 4.0 x4', '7,300MB/s', '6,900MB/s')
addStorage('P3 Plus 2TB NVMe SSD', 'Crucial', 99, '2TB', 'PCIe 4.0 x4', '5,000MB/s', '4,200MB/s')
addStorage('870 EVO 2TB SATA SSD', 'Samsung', 159, '2TB', 'SATA 6Gb/s', '560MB/s', '530MB/s')
addStorage('MX500 2TB SATA SSD', 'Crucial', 139, '2TB', 'SATA 6Gb/s', '560MB/s', '510MB/s')
addStorage('BarraCuda 4TB 3.5-inch HDD', 'Seagate', 99, '4TB', 'SATA 6Gb/s, 5400RPM', '190MB/s', '190MB/s')
addStorage('Blue 4TB 3.5-inch HDD', 'WD', 109, '4TB', 'SATA 6Gb/s, 5400RPM', '180MB/s', '180MB/s')

const addPsu = (name: string, brand: string, price: number, watts: number, efficiency: string, cabling: string, standard: string) => {
  addProduct('Power Supplies', name, brand, price, { Output: `${watts}W`, Efficiency: efficiency, Cabling: cabling, Standard: standard }, { builderSlot: 'psu', watts })
}

addPsu('RM1000x Shift 1000W Gold', 'Corsair', 229, 1000, '80+ Gold', 'Fully modular, side connectors', 'ATX 3.0 / PCIe 5.0')
addPsu('RM750e 750W Gold', 'Corsair', 109, 750, '80+ Gold', 'Fully modular', 'ATX 3.0 / PCIe 5.0')
addPsu('RM1200x Shift 1200W Gold', 'Corsair', 259, 1200, '80+ Gold', 'Fully modular, side connectors', 'ATX 3.0 / PCIe 5.0')
addPsu('FOCUS GX-850 ATX 3 850W Gold', 'Seasonic', 149, 850, '80+ Gold', 'Fully modular', 'ATX 3.0 / PCIe 5.0')
addPsu('VERTEX GX-1000 1000W Gold', 'Seasonic', 199, 1000, '80+ Gold', 'Fully modular', 'ATX 3.0 / PCIe 5.0')
addPsu('PRIME TX-1000 1000W Titanium', 'Seasonic', 329, 1000, '80+ Titanium', 'Fully modular', 'ATX 3.0')
addPsu('Straight Power 12 850W Platinum', 'be quiet!', 189, 850, '80+ Platinum', 'Fully modular', 'ATX 3.0 / PCIe 5.0')
addPsu('Pure Power 12 M 750W Gold', 'be quiet!', 119, 750, '80+ Gold', 'Fully modular', 'ATX 3.0 / PCIe 5.0')
addPsu('Pure Power 12 M 1000W Gold', 'be quiet!', 159, 1000, '80+ Gold', 'Fully modular', 'ATX 3.0 / PCIe 5.0')
addPsu('MAG A850GL PCIE5 850W Gold', 'MSI', 119, 850, '80+ Gold', 'Fully modular', 'ATX 3.0 / PCIe 5.0')
addPsu('MAG A750GL PCIE5 750W Gold', 'MSI', 99, 750, '80+ Gold', 'Fully modular', 'ATX 3.0 / PCIe 5.0')
addPsu('MEG Ai1300P PCIE5 1300W Platinum', 'MSI', 329, 1300, '80+ Platinum', 'Fully modular', 'ATX 3.0 / PCIe 5.0')
addPsu('AORUS P850W 850W Gold', 'GIGABYTE', 129, 850, '80+ Gold', 'Fully modular', 'ATX 3.0 / PCIe 5.0')
addPsu('TUF Gaming 850W Gold', 'ASUS', 139, 850, '80+ Gold', 'Fully modular', 'ATX 3.0 / PCIe 5.0')
addPsu('ROG Thor 1000W Platinum III', 'ASUS', 349, 1000, '80+ Platinum', 'Fully modular', 'ATX 3.1 / PCIe 5.1')
addPsu('Leadex VII XG 1000W Gold', 'Super Flower', 179, 1000, '80+ Gold', 'Fully modular', 'ATX 3.0 / PCIe 5.0')
addPsu('V850 SFX Gold', 'Cooler Master', 159, 850, '80+ Gold', 'Fully modular, SFX', 'ATX 3.0 / PCIe 5.0')
addPsu('SFX-L 1000W Platinum', 'SilverStone', 239, 1000, '80+ Platinum', 'Fully modular, SFX-L', 'ATX 3.0 / PCIe 5.0')

const addCase = (name: string, brand: string, price: number, board: string, clearance: number, cooling: string, stock?: number) => {
  addProduct('Cases', name, brand, price, { Board: board, 'GPU clearance': `${clearance}mm`, Cooling: cooling, 'Front I/O': 'USB-C + USB-A' }, { builderSlot: 'case', caseClearance: clearance }, stock)
}

const addCooler = (name: string, brand: string, price: number, type: string, detail: string, socket: string) => {
  addProduct('Cooling', name, brand, price, { Type: type, Cooling: detail, Socket: socket }, { builderSlot: 'cooler' })
}

addCase('North XL Mesh Charcoal', 'Fractal Design', 189, 'E-ATX / ATX / mATX / Mini-ITX', 413, 'Up to 9x 120mm fans or 420mm radiator')
addCase('North Mesh Charcoal Black', 'Fractal Design', 149, 'ATX / mATX / Mini-ITX', 355, 'Up to 7x 120mm fans or 360mm radiator')
addCase('LANCOOL 216 RGB Black', 'Lian Li', 119, 'E-ATX / ATX / mATX / Mini-ITX', 392, '2x 160mm front fans, up to 360mm radiator')
addCase('O11 Vision Compact Black', 'Lian Li', 139, 'ATX / mATX / Mini-ITX', 408, 'Up to 11x 120mm fans or 360mm radiator')
addCase('AP201 Mesh Mini-Tower', 'ASUS', 89, 'mATX / Mini-ITX', 338, 'Up to 6x 120mm fans or 360mm radiator')
addCase('MasterBox NR200P V2', 'Cooler Master', 119, 'Mini-ITX', 357, 'SFX PSU, up to 280mm radiator')
addCase('H7 Flow RGB 2024', 'NZXT', 139, 'E-ATX / ATX / mATX / Mini-ITX', 410, 'Up to 10x 120mm fans or 420mm radiator')
addCase('Meshify 2 Compact Lite', 'Fractal Design', 109, 'ATX / mATX / Mini-ITX', 341, 'Up to 7x 120mm fans or 360mm radiator')
addCooler('NH-D15 G2 Dual-Tower Cooler', 'Noctua', 149, 'Dual-tower air', '2x 140mm PWM fans, 168mm height', 'AM5 / AM4 / LGA1851 / LGA1700')
addCooler('NH-U12A chromax.black', 'Noctua', 129, 'Single-tower air', '2x 120mm PWM fans, 158mm height', 'AM5 / AM4 / LGA1851 / LGA1700')
addCooler('Liquid Freezer III 360 A-RGB', 'ARCTIC', 139, '360mm AIO', '3x 120mm PWM fans, 398mm radiator', 'AM5 / AM4 / LGA1851 / LGA1700')
addCooler('Liquid Freezer III 280', 'ARCTIC', 109, '280mm AIO', '2x 140mm PWM fans, 317mm radiator', 'AM5 / AM4 / LGA1851 / LGA1700')
addCooler('Kraken Elite 360 RGB', 'NZXT', 299, '360mm AIO', '3x 120mm PWM fans, LCD pump display', 'AM5 / AM4 / LGA1851 / LGA1700')
addCooler('iCUE H150i Elite Capellix XT', 'Corsair', 219, '360mm AIO', '3x 120mm PWM fans, 397mm radiator', 'AM5 / AM4 / LGA1851 / LGA1700')

const addMonitor = (name: string, brand: string, price: number, panel: string, resolution: string, refresh: string, response: string) => {
  addProduct('Monitors', name, brand, price, { Panel: `${panel}, ${resolution}`, Refresh: refresh, Response: response, Sync: 'Adaptive-Sync compatible' }, { builderSlot: 'monitor' })
}

addMonitor('ROG Swift OLED PG32UCDM 32-inch', 'ASUS', 1299, 'QD-OLED', '3840 x 2160', '240Hz', '0.03ms')
addMonitor('ROG Swift OLED PG27AQDM 27-inch', 'ASUS', 799, 'OLED', '2560 x 1440', '240Hz', '0.03ms')
addMonitor('Odyssey OLED G8 G80SD 32-inch', 'Samsung', 1199, 'QD-OLED', '3840 x 2160', '240Hz', '0.03ms')
addMonitor('Odyssey OLED G9 G93SC 49-inch', 'Samsung', 1299, 'QD-OLED ultrawide', '5120 x 1440', '240Hz', '0.03ms')
addMonitor('UltraGear 32GS95UE-B 32-inch', 'LG', 1399, 'WOLED', '3840 x 2160', '240Hz / 480Hz dual-mode', '0.03ms')
addMonitor('UltraGear 27GS95QE-B 27-inch', 'LG', 799, 'WOLED', '2560 x 1440', '240Hz', '0.03ms')
addMonitor('Alienware AW2725DF 27-inch', 'Dell', 899, 'QD-OLED', '2560 x 1440', '360Hz', '0.03ms')
addMonitor('Alienware AW3225QF 32-inch Curved', 'Dell', 1199, 'QD-OLED curved', '3840 x 2160', '240Hz', '0.03ms')
addMonitor('Predator X27U F3 27-inch', 'Acer', 999, 'OLED', '2560 x 1440', '480Hz', '0.01ms')
addMonitor('Predator X32 X3 31.5-inch', 'Acer', 1199, 'OLED', '3840 x 2160', '240Hz', '0.03ms')
addMonitor('MAG 271QPX QD-OLED E2 27-inch', 'MSI', 749, 'QD-OLED', '2560 x 1440', '240Hz', '0.03ms')
addMonitor('MPG 321URX QD-OLED 32-inch', 'MSI', 999, 'QD-OLED', '3840 x 2160', '240Hz', '0.03ms')
addMonitor('M27Q X 27-inch QHD', 'GIGABYTE', 499, 'SS IPS', '2560 x 1440', '240Hz', '1ms')
addMonitor('M32U 32-inch 4K', 'GIGABYTE', 649, 'SS IPS', '3840 x 2160', '144Hz', '1ms')
addMonitor('Fast IPS 27-inch QHD 180Hz', 'AOC', 229, 'Fast IPS', '2560 x 1440', '180Hz', '1ms')
addMonitor('CU34G3S 34-inch Curved', 'AOC', 349, 'VA curved, 1500R', '3440 x 1440', '165Hz', '1ms MPRT')
addMonitor('TUF Gaming VG27AQML1A 27-inch', 'ASUS', 399, 'Fast IPS', '2560 x 1440', '260Hz', '1ms')
addMonitor('UltraGear 24GN650-B 24-inch', 'LG', 179, 'IPS', '1920 x 1080', '144Hz', '1ms')

const addDesktop = (name: string, brand: string, price: number, gpu: string, cpu: string, memory: string, storage: string, psu: string, stock: number) => {
  addProduct('Gaming PCs', name, brand, price, { GPU: gpu, CPU: cpu, Memory: memory, Storage: storage, PSU: psu }, {}, stock)
}

addDesktop('OZ Titan 4K RTX 5090 Edition', 'OZ Gaming', 4999, 'GeForce RTX 5090 32GB', 'Ryzen 9 9950X3D', '64GB DDR5-6000', '2TB PCIe 5.0 NVMe', '1200W 80+ Gold', 2)
addDesktop('OZ Apex Ultra RTX 5080', 'OZ Gaming', 3499, 'GeForce RTX 5080 16GB', 'Ryzen 7 9800X3D', '32GB DDR5-6000', '2TB PCIe 4.0 NVMe', '1000W 80+ Gold', 5)
addDesktop('OZ Vector 1440p RTX 5070 Ti', 'OZ Gaming', 2499, 'GeForce RTX 5070 Ti 16GB', 'Ryzen 7 9700X', '32GB DDR5-6000', '2TB PCIe 4.0 NVMe', '850W 80+ Gold', 8)
addDesktop('OZ Nova 1440p Radeon RX 9070 XT', 'OZ Gaming', 2199, 'Radeon RX 9070 XT 16GB', 'Ryzen 5 9600X', '32GB DDR5-6000', '1TB PCIe 4.0 NVMe', '850W 80+ Gold', 6)
addDesktop('OZ Pulse Compact RTX 5070', 'OZ Gaming', 1999, 'GeForce RTX 5070 12GB', 'Ryzen 7 7800X3D', '32GB DDR5-6000', '1TB PCIe 4.0 NVMe', '850W SFX 80+ Gold', 4)
addDesktop('OZ Forge Creator RTX 4070 SUPER', 'OZ Gaming', 1899, 'GeForce RTX 4070 SUPER 12GB', 'Core i7-14700K', '32GB DDR5-6000', '2TB PCIe 4.0 NVMe', '850W 80+ Gold', 7)
addDesktop('OZ Summit Workstation 9950X', 'OZ Gaming', 2899, 'GeForce RTX 5070 Ti 16GB', 'Ryzen 9 9950X', '64GB DDR5-6000', '2TB PCIe 5.0 NVMe', '1000W 80+ Gold', 3)
addDesktop('OZ Striker Esports RTX 5060 Ti', 'OZ Gaming', 1399, 'GeForce RTX 5060 Ti 16GB', 'Ryzen 5 7600', '32GB DDR5-6000', '1TB PCIe 4.0 NVMe', '750W 80+ Gold', 12)
addDesktop('OZ Starter 1080p RX 9060 XT', 'OZ Gaming', 1199, 'Radeon RX 9060 XT 16GB', 'Ryzen 5 7500F', '32GB DDR5-6000', '1TB PCIe 4.0 NVMe', '750W 80+ Gold', 10)
addDesktop('OZ Compact LAN RTX 4060', 'OZ Gaming', 1099, 'GeForce RTX 4060 8GB', 'Core i5-14400F', '16GB DDR5-5600', '1TB PCIe 4.0 NVMe', '650W 80+ Bronze', 9)
addDesktop('OZ Radeon Creator RX 7900 XTX', 'OZ Gaming', 2799, 'Radeon RX 7900 XTX 24GB', 'Ryzen 9 9900X', '64GB DDR5-6000', '2TB PCIe 4.0 NVMe', '1000W 80+ Gold', 4)
addDesktop('OZ Frostline 1440p RX 7800 XT', 'OZ Gaming', 1699, 'Radeon RX 7800 XT 16GB', 'Ryzen 7 7700', '32GB DDR5-6000', '1TB PCIe 4.0 NVMe', '750W 80+ Gold', 8)
addDesktop('OZ Intel Ultra RTX 5080 Creator', 'OZ Gaming', 3699, 'GeForce RTX 5080 16GB', 'Core Ultra 9 285K', '64GB DDR5-6400', '2TB PCIe 5.0 NVMe', '1000W 80+ Platinum', 3)
addDesktop('OZ Whiteout RTX 5070 Dual-Chamber', 'OZ Gaming', 2199, 'GeForce RTX 5070 12GB', 'Ryzen 7 9700X', '32GB DDR5-6000', '2TB PCIe 4.0 NVMe', '850W 80+ Gold', 5)
addDesktop('OZ Entry RTX 4060 Ti 16GB', 'OZ Gaming', 1299, 'GeForce RTX 4060 Ti 16GB', 'Core i5-12600K', '32GB DDR4-3600', '1TB PCIe 4.0 NVMe', '750W 80+ Bronze', 6)
addDesktop('OZ Silent Studio RTX 4070 SUPER', 'OZ Gaming', 2099, 'GeForce RTX 4070 SUPER 12GB', 'Ryzen 9 7900', '64GB DDR5-6000', '2TB PCIe 4.0 NVMe', '850W 80+ Gold', 2)

type PeripheralCategory = Extract<Category,
  | 'Gaming Mice'
  | 'Mechanical Keyboards'
  | 'Mouse Pads & Desk Mats'
  | 'Headsets & Audio'
  | 'Microphones & Webcams'
  | 'Controllers & Sim Gear'>
type PeripheralSeed = { id?: string; name: string; brand: string; price: number; specs: Record<string, string> }

const addPeripheralProducts = (category: PeripheralCategory, slot: BuilderSlot, items: PeripheralSeed[]) => {
  for (const item of items) {
    addProduct(category, item.name, item.brand, item.price, item.specs, { builderSlot: slot })
    if (item.id) generatedSeeds[generatedSeeds.length - 1].id = item.id
  }
}

addPeripheralProducts('Gaming Mice', 'gaming-mice', [
  { id: 'catalog-mice-viper-v3-pro-wireless', name: 'Viper V3 Pro Wireless', brand: 'Razer', price: 159, specs: { Weight: '54g', Sensor: 'Focus Pro 35K DPI', Polling: 'Up to 8,000Hz', Connection: 'HyperSpeed wireless' } },
  { id: 'catalog-mice-g502-x-plus-lightspeed', name: 'G502 X Plus LIGHTSPEED', brand: 'Logitech', price: 159, specs: { Weight: '106g', Sensor: 'HERO 25K DPI', Polling: '1,000Hz', Connection: 'LIGHTSPEED wireless' } },
  { id: 'catalog-mice-deathadder-v3-pro-wireless', name: 'DeathAdder V3 Pro Wireless', brand: 'Razer', price: 149, specs: { Weight: '63g', Sensor: 'Focus Pro 30K DPI', Polling: 'Up to 4,000Hz', Connection: 'HyperSpeed wireless' } },
  { id: 'catalog-mice-xm2w-4k-wireless', name: 'XM2w 4K Wireless', brand: 'Endgame Gear', price: 129, specs: { Weight: '63g', Sensor: 'PixArt PAW3395, 26K DPI', Polling: 'Up to 4,000Hz', Connection: '2.4GHz wireless / USB-C' } },
  { name: 'G Pro 2 LIGHTSPEED', brand: 'Logitech', price: 129, specs: { Weight: '80g', Sensor: 'HERO 2, 32K DPI', Polling: '1,000Hz', Connection: 'LIGHTSPEED wireless / USB-C' } },
  { name: 'Viper V3 HyperSpeed', brand: 'Razer', price: 69, specs: { Weight: '82g', Sensor: 'Focus Pro 30K DPI', Polling: '1,000Hz', Connection: 'HyperSpeed wireless' } },
  { name: 'Cobra Pro Wireless', brand: 'Razer', price: 129, specs: { Weight: '77g', Sensor: 'Focus Pro 30K DPI', Polling: '1,000Hz', Connection: 'HyperSpeed / Bluetooth / USB-C' } },
  { name: 'Aerox 5 Wireless', brand: 'SteelSeries', price: 139, specs: { Weight: '74g', Sensor: 'TrueMove Air, 18K DPI', Polling: '1,000Hz', Connection: '2.4GHz / Bluetooth' } },
  { name: 'M75 Wireless', brand: 'Corsair', price: 129, specs: { Weight: '89g', Sensor: 'MARKSMAN 26K DPI', Polling: '2,000Hz', Connection: 'SLIPSTREAM / Bluetooth / USB' } },
  { name: 'Darkstar Wireless', brand: 'Corsair', price: 169, specs: { Weight: '96g', Sensor: 'MARKSMAN 26K DPI', Polling: '2,000Hz', Connection: 'SLIPSTREAM / Bluetooth / USB' } },
  { name: 'ROG Keris II Ace', brand: 'ASUS', price: 159, specs: { Weight: '54g', Sensor: 'ROG AimPoint Pro, 42K DPI', Polling: 'Up to 8,000Hz', Connection: 'SpeedNova / Bluetooth / USB-C' } },
  { name: 'ROG Harpe Ace Mini', brand: 'ASUS', price: 129, specs: { Weight: '49g', Sensor: 'ROG AimPoint Pro, 42K DPI', Polling: 'Up to 8,000Hz', Connection: 'SpeedNova / Bluetooth / USB-C' } },
  { name: 'X2V2 Wireless', brand: 'Pulsar', price: 99, specs: { Weight: '55g', Sensor: 'PixArt PAW3395, 26K DPI', Polling: '1,000Hz', Connection: '2.4GHz wireless / USB-C' } },
  { name: 'Xlite V3 Medium Wireless', brand: 'Pulsar', price: 99, specs: { Weight: '55g', Sensor: 'PixArt PAW3395, 26K DPI', Polling: '1,000Hz', Connection: '2.4GHz wireless / USB-C' } },
  { name: 'EC2-CW Wireless', brand: 'ZOWIE', price: 149, specs: { Weight: '77g', Sensor: '3360 optical, 3,200 DPI', Polling: '1,000Hz', Connection: '2.4GHz wireless / USB' } },
  { name: 'OP1 8K Wired', brand: 'Endgame Gear', price: 79, specs: { Weight: '50g', Sensor: 'PixArt PAW3395, 26K DPI', Polling: '8,000Hz', Connection: 'USB-C wired' } },
  { name: 'M3 Mini 4K Wireless', brand: 'Keychron', price: 69, specs: { Weight: '55g', Sensor: 'PixArt PAW3395, 26K DPI', Polling: 'Up to 4,000Hz', Connection: '2.4GHz / Bluetooth / USB-C' } },
  { name: 'G305 LIGHTSPEED', brand: 'Logitech', price: 49, specs: { Weight: '99g', Sensor: 'HERO, 12K DPI', Polling: '1,000Hz', Connection: 'LIGHTSPEED wireless' } },
  { name: 'DeathAdder V3 HyperSpeed', brand: 'Razer', price: 99, specs: { Weight: '55g', Sensor: 'Focus X 26K DPI', Polling: 'Up to 4,000Hz', Connection: 'HyperSpeed wireless / USB-C' } },
])

addPeripheralProducts('Mechanical Keyboards', 'mechanical-keyboards', [
  { id: 'catalog-keyboards-g915-x-lightspeed-tkl', name: 'G915 X LIGHTSPEED TKL', brand: 'Logitech', price: 229, specs: { Layout: 'TKL, 87 keys', Switches: 'Low-profile GL mechanical', Connection: 'LIGHTSPEED / Bluetooth / USB-C', Backlight: 'LIGHTSYNC RGB' } },
  { id: 'catalog-keyboards-blackwidow-v4-pro-75', name: 'BlackWidow V4 Pro 75%', brand: 'Razer', price: 299, specs: { Layout: '75%, 80 keys', Switches: 'Hot-swappable tactile mechanical', Connection: 'HyperSpeed wireless / Bluetooth / USB-C', Backlight: 'Per-key RGB' } },
  { id: 'catalog-keyboards-80he-analog-gaming-keyboard', name: '80HE Analog Gaming Keyboard', brand: 'Wooting', price: 199, specs: { Layout: '80%, 88 keys', Switches: 'Lekker Hall-effect', Connection: 'USB-C wired', Backlight: 'Per-key RGB' } },
  { id: 'catalog-keyboards-q1-max-wireless-mechanical-keyboard', name: 'Q1 Max Wireless Mechanical Keyboard', brand: 'Keychron', price: 199, specs: { Layout: '75%, 82 keys', Switches: 'Gateron Jupiter mechanical', Connection: '2.4GHz / Bluetooth / USB-C', Backlight: 'South-facing RGB' } },
  { id: 'catalog-keyboards-apex-pro-tkl-gen-3', name: 'Apex Pro TKL Gen 3', brand: 'SteelSeries', price: 219, specs: { Layout: 'TKL, 87 keys', Switches: 'OmniPoint 3.0 Hall-effect', Connection: 'USB-C wired', Backlight: 'Per-key RGB / OLED' } },
  { name: 'ROG Azoth Extreme', brand: 'ASUS', price: 499, specs: { Layout: '75%, 81 keys', Switches: 'ROG NX Snow mechanical, hot-swappable', Connection: 'SpeedNova / Bluetooth / USB-C', Backlight: 'Per-key RGB / OLED' } },
  { name: 'ROG Strix Scope II 96 Wireless', brand: 'ASUS', price: 179, specs: { Layout: '96%, 97 keys', Switches: 'ROG NX Snow mechanical', Connection: '2.4GHz / Bluetooth / USB-C', Backlight: 'Per-key RGB' } },
  { name: 'Huntsman V3 Pro TKL', brand: 'Razer', price: 219, specs: { Layout: 'TKL, 87 keys', Switches: 'Analog optical, adjustable actuation', Connection: 'USB-C wired', Backlight: 'Per-key RGB' } },
  { name: 'BlackWidow V4 75%', brand: 'Razer', price: 189, specs: { Layout: '75%, 81 keys', Switches: 'Orange tactile mechanical, hot-swappable', Connection: 'USB-C wired', Backlight: 'Per-key RGB' } },
  { name: 'Apex Pro Mini Wireless', brand: 'SteelSeries', price: 219, specs: { Layout: '60%, 61 keys', Switches: 'OmniPoint 2.0 Hall-effect', Connection: '2.4GHz / Bluetooth / USB-C', Backlight: 'Per-key RGB' } },
  { name: 'G Pro X TKL LIGHTSPEED', brand: 'Logitech', price: 199, specs: { Layout: 'TKL, 87 keys', Switches: 'GX mechanical, tactile or linear', Connection: 'LIGHTSPEED / Bluetooth / USB-C', Backlight: 'LIGHTSYNC RGB' } },
  { name: 'K70 MAX RGB', brand: 'Corsair', price: 229, specs: { Layout: 'Full-size, 104 keys', Switches: 'MGX magnetic Hall-effect', Connection: 'USB-C wired', Backlight: 'Per-key RGB' } },
  { name: 'Vulcan II Mini Air', brand: 'Turtle Beach', price: 169, specs: { Layout: '65%, 68 keys', Switches: 'Titan II optical linear', Connection: '2.4GHz / Bluetooth / USB-C', Backlight: 'Per-key RGB' } },
  { name: 'One 3 TKL RGB', brand: 'Ducky', price: 119, specs: { Layout: 'TKL, 87 keys', Switches: 'Cherry MX mechanical', Connection: 'USB-C wired', Backlight: 'Per-key RGB' } },
  { name: 'GMMK 3 Pro HE 75%', brand: 'Glorious', price: 249, specs: { Layout: '75%, 82 keys', Switches: 'Fox Hall-effect, hot-swappable', Connection: 'USB-C wired', Backlight: 'Per-key RGB' } },
  { name: 'Q3 Max Wireless TKL', brand: 'Keychron', price: 229, specs: { Layout: 'TKL, 87 keys', Switches: 'Gateron Jupiter mechanical, hot-swappable', Connection: '2.4GHz / Bluetooth / USB-C', Backlight: 'South-facing RGB' } },
  { name: 'V1 Max Wireless', brand: 'Keychron', price: 119, specs: { Layout: '75%, 81 keys', Switches: 'Gateron Jupiter mechanical, hot-swappable', Connection: '2.4GHz / Bluetooth / USB-C', Backlight: 'South-facing RGB' } },
  { name: 'MOD007B HE', brand: 'Akko', price: 149, specs: { Layout: '75%, 82 keys', Switches: 'Magnetic Hall-effect, adjustable actuation', Connection: 'Bluetooth / 2.4GHz / USB-C', Backlight: 'Per-key RGB' } },
  { name: 'FC750RBT TKL', brand: 'Leopold', price: 149, specs: { Layout: 'TKL, 87 keys', Switches: 'Cherry MX mechanical', Connection: 'Bluetooth / USB-C', Backlight: 'None' } },
])

addPeripheralProducts('Mouse Pads & Desk Mats', 'mouse-pads', [
  { name: 'FX Zero Soft XL', brand: 'ARTISAN', price: 69, specs: { Surface: 'Textured cloth, balanced glide', Dimensions: '490 x 420mm', Base: 'Non-slip foam', Thickness: '4mm' } },
  { name: 'FX Hien Soft XL', brand: 'ARTISAN', price: 69, specs: { Surface: 'Textured hybrid cloth, fast glide', Dimensions: '490 x 420mm', Base: 'Non-slip foam', Thickness: '4mm' } },
  { name: 'QcK Heavy Large', brand: 'SteelSeries', price: 29, specs: { Surface: 'Micro-woven cloth', Dimensions: '450 x 400mm', Base: 'Non-slip rubber', Thickness: '6mm' } },
  { name: 'QcK Prism Cloth 3XL', brand: 'SteelSeries', price: 119, specs: { Surface: 'Micro-woven cloth, RGB edge', Dimensions: '1,220 x 590mm', Base: 'Non-slip rubber', Lighting: '2-zone RGB, USB' } },
  { name: 'G740 Thick Gaming Mouse Pad', brand: 'Logitech', price: 39, specs: { Surface: 'Cloth, moderate friction', Dimensions: '460 x 400mm', Base: 'Rubber', Thickness: '5mm' } },
  { name: 'G640 Large Cloth Gaming Mouse Pad', brand: 'Logitech', price: 29, specs: { Surface: 'Cloth, moderate friction', Dimensions: '460 x 400mm', Base: 'Rubber', Thickness: '3mm' } },
  { name: 'Gigantus V2 XXL', brand: 'Razer', price: 39, specs: { Surface: 'Micro-weave cloth', Dimensions: '940 x 410mm', Base: 'Anti-slip rubber', Thickness: '4mm' } },
  { name: 'Strider Chroma XXL', brand: 'Razer', price: 129, specs: { Surface: 'Hybrid soft/hard weave', Dimensions: '900 x 370mm', Base: 'Anti-slip rubber', Lighting: '19-zone RGB, USB' } },
  { name: 'MM350 PRO Extended XL', brand: 'Corsair', price: 39, specs: { Surface: 'Micro-weave cloth', Dimensions: '930 x 400mm', Base: 'Anti-slip rubber', Thickness: '4mm' } },
  { name: 'MM700 RGB Extended', brand: 'Corsair', price: 79, specs: { Surface: 'Micro-weave cloth', Dimensions: '930 x 400mm', Base: 'Rubber', Lighting: '3-zone RGB, USB hub' } },
  { name: 'Pulsefire Mat XXL', brand: 'HyperX', price: 39, specs: { Surface: 'Cloth, precision-stitched edges', Dimensions: '900 x 420mm', Base: 'Anti-slip rubber', Thickness: '3mm' } },
  { name: '3XL Extended Mouse Pad', brand: 'Glorious', price: 49, specs: { Surface: 'Smooth cloth', Dimensions: '1,220 x 610mm', Base: 'Anti-slip rubber', Thickness: '3mm' } },
  { name: 'G-SR-SE Rouge', brand: 'ZOWIE', price: 39, specs: { Surface: 'Cloth, controlled glide', Dimensions: '470 x 390mm', Base: 'Rubber', Thickness: '3.5mm' } },
  { name: 'G-SR II', brand: 'ZOWIE', price: 39, specs: { Surface: 'Cloth, controlled glide', Dimensions: '470 x 390mm', Base: 'Rubber', Thickness: '3.5mm' } },
  { name: 'Aqua Control II XXL', brand: 'X-raypad', price: 39, specs: { Surface: 'Textured cloth, balanced glide', Dimensions: '900 x 400mm', Base: 'Poron-style anti-slip rubber', Thickness: '4mm' } },
  { name: 'Saturn Pro XL Soft', brand: 'Lethal Gaming Gear', price: 59, specs: { Surface: 'Premium cloth, balanced control', Dimensions: '490 x 420mm', Base: 'Poron anti-slip foam', Thickness: '4mm' } },
  { name: 'MPC450 Cordura Pad', brand: 'Endgame Gear', price: 29, specs: { Surface: 'Cordura fabric, fast glide', Dimensions: '450 x 400mm', Base: 'Anti-slip rubber', Thickness: '3mm' } },
  { name: 'ParaControl V2 XXL', brand: 'Pulsar', price: 39, specs: { Surface: 'Textured cloth, control glide', Dimensions: '900 x 400mm', Base: 'Anti-slip rubber', Thickness: '4mm' } },
  { name: 'Sense AIMO XXL', brand: 'ROCCAT', price: 49, specs: { Surface: 'Performance cloth, RGB edge', Dimensions: '900 x 400mm', Base: 'Anti-slip rubber', Lighting: 'RGB edge, USB' } },
])

addPeripheralProducts('Headsets & Audio', 'headsets-audio', [
  { id: 'catalog-audio-arctis-nova-pro-wireless', name: 'Arctis Nova Pro Wireless', brand: 'SteelSeries', price: 349, specs: { Type: 'Wireless gaming headset', Drivers: '40mm neodymium', Connection: '2.4GHz / Bluetooth', Battery: 'Hot-swap dual battery' } },
  { id: 'catalog-audio-inzone-h9-wireless-gaming-headset', name: 'INZONE H9 Wireless Gaming Headset', brand: 'Sony', price: 299, specs: { Type: 'Wireless gaming headset', Drivers: '40mm', Connection: '2.4GHz / Bluetooth', Features: '360 Spatial Sound, ANC' } },
  { id: 'catalog-audio-g560-lightsync-pc-speakers', name: 'G560 LIGHTSYNC PC Speakers', brand: 'Logitech', price: 199, specs: { Type: '2.1 PC speaker system', Output: '240W peak', Connection: 'USB / 3.5mm / Bluetooth', Features: 'DTS:X Ultra, LIGHTSYNC RGB' } },
  { name: 'G Pro X 2 LIGHTSPEED', brand: 'Logitech', price: 249, specs: { Type: 'Wireless gaming headset', Drivers: '50mm graphene', Connection: '2.4GHz / Bluetooth / 3.5mm', Battery: 'Up to 50 hours' } },
  { name: 'BlackShark V2 Pro (2023)', brand: 'Razer', price: 199, specs: { Type: 'Wireless gaming headset', Drivers: '50mm TriForce Titanium', Connection: '2.4GHz / Bluetooth / USB', Battery: 'Up to 70 hours' } },
  { name: 'Kraken V4 Pro', brand: 'Razer', price: 399, specs: { Type: 'Wireless haptic gaming headset', Drivers: '40mm TriForce Bio-Cellulose', Connection: '2.4GHz / Bluetooth / USB', Features: 'Sensa HD haptics, OLED control hub' } },
  { name: 'Arctis Nova 7 Wireless', brand: 'SteelSeries', price: 179, specs: { Type: 'Wireless gaming headset', Drivers: '40mm neodymium', Connection: '2.4GHz / Bluetooth', Battery: 'Up to 38 hours' } },
  { name: 'G733 LIGHTSPEED', brand: 'Logitech', price: 139, specs: { Type: 'Wireless gaming headset', Drivers: '40mm PRO-G', Connection: '2.4GHz LIGHTSPEED', Battery: 'Up to 29 hours' } },
  { name: 'H6PRO Closed Acoustic Headset', brand: 'EPOS', price: 129, specs: { Type: 'Closed-back wired headset', Drivers: '42mm', Connection: '3.5mm analog', Microphone: 'Detachable boom, lift-to-mute' } },
  { name: 'MMX 300 PRO', brand: 'beyerdynamic', price: 299, specs: { Type: 'Closed-back wired headset', Drivers: 'STELLAR.45, 48 ohm', Connection: '3.5mm analog / adapter', Microphone: 'Broadcast-quality boom' } },
  { name: 'Maxwell Wireless', brand: 'Audeze', price: 299, specs: { Type: 'Wireless planar gaming headset', Drivers: '90mm planar magnetic', Connection: '2.4GHz / Bluetooth / USB', Battery: 'Over 80 hours' } },
  { name: 'PULSE Elite Wireless Headset', brand: 'Sony', price: 149, specs: { Type: 'Wireless gaming headset', Drivers: 'Planar magnetic', Connection: 'PlayStation Link / Bluetooth', Microphone: 'Retractable boom' } },
  { name: 'Quantum 910 Wireless', brand: 'JBL', price: 249, specs: { Type: 'Wireless gaming headset', Drivers: '50mm Hi-Res certified', Connection: '2.4GHz / Bluetooth / USB', Features: 'ANC, head tracking' } },
  { name: 'HS80 MAX Wireless', brand: 'Corsair', price: 179, specs: { Type: 'Wireless gaming headset', Drivers: '50mm neodymium', Connection: '2.4GHz / Bluetooth', Battery: 'Up to 65 hours' } },
  { name: 'INZONE Buds', brand: 'Sony', price: 199, specs: { Type: 'True wireless gaming earbuds', Drivers: '8.4mm', Connection: '2.4GHz USB-C / Bluetooth LE Audio', Battery: 'Up to 12 hours per charge' } },
  { name: 'Hammerhead HyperSpeed', brand: 'Razer', price: 149, specs: { Type: 'True wireless gaming earbuds', Drivers: '10mm', Connection: '2.4GHz USB-C / Bluetooth 5.2', Features: 'Active noise cancellation' } },
  { name: 'Z623 2.1 Speaker System', brand: 'Logitech', price: 149, specs: { Type: '2.1 PC speaker system', Output: '200W RMS', Connection: '3.5mm / RCA', Features: 'THX-certified subwoofer' } },
  { name: 'Pebble X Plus 2.1', brand: 'Creative', price: 129, specs: { Type: '2.1 desktop speaker system', Output: '15W RMS, 30W peak', Connection: 'USB-C / Bluetooth 5.3', Features: 'Down-firing subwoofer, RGB' } },
  { name: 'Nommo V2 2.1 Speakers', brand: 'Razer', price: 299, specs: { Type: '2.1 gaming speaker system', Output: '40W RMS', Connection: 'USB / Bluetooth', Features: 'THX Spatial Audio, rear RGB' } },
])

addPeripheralProducts('Microphones & Webcams', 'microphones-webcams', [
  { id: 'catalog-audio-wave-dx-dynamic-microphone', name: 'Wave DX Dynamic Microphone', brand: 'Elgato', price: 99, specs: { Type: 'Dynamic cardioid microphone', Connection: 'XLR', Frequency: '50Hz–15kHz', Mount: 'Swivel mount included' } },
  { name: 'MV7+ Podcast Microphone', brand: 'Shure', price: 279, specs: { Type: 'Dynamic cardioid microphone', Connection: 'USB-C / XLR', Resolution: '24-bit / 48kHz USB', Features: 'Auto Level, digital pop filter' } },
  { name: 'SM7B Vocal Microphone', brand: 'Shure', price: 399, specs: { Type: 'Dynamic cardioid broadcast mic', Connection: 'XLR', Frequency: '50Hz–20kHz', Features: 'Internal shock isolation, pop filter' } },
  { name: 'NT-USB+ USB Microphone', brand: 'RØDE', price: 169, specs: { Type: 'Condenser cardioid microphone', Connection: 'USB-C', Resolution: '24-bit / 48kHz', Features: 'On-board headphone monitoring' } },
  { name: 'PodMic USB', brand: 'RØDE', price: 199, specs: { Type: 'Dynamic broadcast microphone', Connection: 'USB-C / XLR', Resolution: '24-bit / 48kHz USB', Features: 'Built-in pop filter, DSP' } },
  { name: 'QuadCast 2 USB Microphone', brand: 'HyperX', price: 149, specs: { Type: 'Condenser microphone, 4 polar patterns', Connection: 'USB-C', Resolution: '24-bit / 96kHz', Features: 'Tap-to-mute, gain control' } },
  { name: 'AT2020USB-X', brand: 'Audio-Technica', price: 149, specs: { Type: 'Condenser cardioid microphone', Connection: 'USB-C', Resolution: '24-bit / 96kHz', Features: 'Headphone monitoring, mix control' } },
  { name: 'Yeti X USB Microphone', brand: 'Logitech', price: 169, specs: { Type: 'Condenser microphone, 4 patterns', Connection: 'USB', Resolution: '24-bit / 48kHz', Features: 'Smart gain, LED metering' } },
  { name: 'AM8 Dynamic USB/XLR Microphone', brand: 'FIFINE', price: 59, specs: { Type: 'Dynamic cardioid microphone', Connection: 'USB-C / XLR', Resolution: '24-bit / 48kHz USB', Features: 'Headphone monitoring, RGB' } },
  { name: 'Profile USB Microphone', brand: 'Sennheiser', price: 129, specs: { Type: 'Condenser cardioid microphone', Connection: 'USB-C', Resolution: '24-bit / 48kHz', Features: 'Gain, mix and mute controls' } },
  { name: 'Facecam MK.2 Webcam', brand: 'Elgato', price: 149, specs: { Type: 'USB webcam', Resolution: '1080p at 60fps', Focus: 'Fixed-focus glass lens', Connection: 'USB-C 3.0' } },
  { name: 'Facecam Pro 4K Webcam', brand: 'Elgato', price: 299, specs: { Type: 'USB webcam', Resolution: '4K at 60fps', Focus: 'Autofocus', Connection: 'USB-C 3.0' } },
  { name: 'C920s Pro HD Webcam', brand: 'Logitech', price: 69, specs: { Type: 'USB webcam', Resolution: '1080p at 30fps', Focus: 'Autofocus', Connection: 'USB-A 2.0' } },
  { name: 'StreamCam Webcam', brand: 'Logitech', price: 139, specs: { Type: 'USB webcam', Resolution: '1080p at 60fps', Focus: 'Autofocus', Connection: 'USB-C 3.1' } },
  { name: 'Kiyo Pro Ultra 4K Webcam', brand: 'Razer', price: 299, specs: { Type: 'USB webcam', Resolution: '4K at 30fps / 1080p at 60fps', Focus: 'Autofocus', Connection: 'USB 3.0' } },
  { name: 'PW515 4K Webcam', brand: 'AVerMedia', price: 249, specs: { Type: 'USB webcam', Resolution: '4K at 30fps', Focus: 'Fixed-focus glass lens', Connection: 'USB-C 3.0' } },
  { name: 'OBSBOT Tiny 2 4K Webcam', brand: 'OBSBOT', price: 329, specs: { Type: 'AI PTZ webcam', Resolution: '4K at 30fps / 1080p at 60fps', Focus: 'PDAF autofocus, AI tracking', Connection: 'USB-C 3.0' } },
  { name: 'Link 2C 4K Webcam', brand: 'Insta360', price: 149, specs: { Type: 'AI webcam', Resolution: '4K at 30fps', Focus: 'PDAF autofocus, AI framing', Connection: 'USB-C' } },
])

addPeripheralProducts('Controllers & Sim Gear', 'controllers-sim', [
  { name: 'Xbox Wireless Controller Carbon Black', brand: 'Microsoft', price: 59, specs: { Type: 'Wireless gamepad', Connection: 'Xbox Wireless / Bluetooth / USB-C', Controls: 'Hybrid D-pad, impulse triggers', Compatibility: 'Xbox / Windows / Android / iOS' } },
  { name: 'Xbox Elite Wireless Controller Series 2', brand: 'Microsoft', price: 179, specs: { Type: 'Pro wireless gamepad', Connection: 'Xbox Wireless / Bluetooth / USB-C', Controls: 'Adjustable-tension sticks, paddles', Battery: 'Rechargeable, up to 40 hours' } },
  { name: 'DualSense Wireless Controller', brand: 'Sony', price: 69, specs: { Type: 'Wireless gamepad', Connection: 'Bluetooth / USB-C', Controls: 'Adaptive triggers, haptic feedback', Compatibility: 'PlayStation 5 / Windows' } },
  { name: 'DualSense Edge Wireless Controller', brand: 'Sony', price: 199, specs: { Type: 'Pro wireless gamepad', Connection: 'Bluetooth / USB-C', Controls: 'Back buttons, remappable profiles', Compatibility: 'PlayStation 5 / Windows' } },
  { name: 'Ultimate 2.4G Wireless Controller', brand: '8BitDo', price: 49, specs: { Type: 'Wireless gamepad', Connection: '2.4GHz / USB-C', Controls: 'Hall-effect joysticks, back buttons', Compatibility: 'Windows / Android / Steam Deck' } },
  { name: 'Ultimate Bluetooth Controller', brand: '8BitDo', price: 69, specs: { Type: 'Wireless gamepad with dock', Connection: 'Bluetooth / 2.4GHz / USB-C', Controls: 'Hall-effect joysticks, back buttons', Compatibility: 'Windows / Switch / Android' } },
  { name: 'Pro 2 Bluetooth Controller', brand: '8BitDo', price: 49, specs: { Type: 'Wireless gamepad', Connection: 'Bluetooth / USB-C', Controls: 'Hall-effect joysticks, rear paddles', Compatibility: 'Windows / Switch / Android / iOS' } },
  { name: 'G7 SE Wired Controller', brand: 'GameSir', price: 49, specs: { Type: 'Wired gamepad', Connection: 'USB-C, 3m cable', Controls: 'Hall-effect sticks and triggers', Compatibility: 'Xbox / Windows' } },
  { name: 'T4 Kaleid Wired Controller', brand: 'GameSir', price: 42, specs: { Type: 'Wired transparent gamepad', Connection: 'USB-C', Controls: 'Hall-effect sticks, 2 back buttons', Compatibility: 'Windows / Switch / Android' } },
  { name: 'Envision Pro Wireless Controller', brand: 'SCUF', price: 179, specs: { Type: 'Pro wireless gamepad', Connection: '2.4GHz / Bluetooth / USB-C', Controls: 'Four remappable rear paddles', Compatibility: 'Windows PC' } },
  { name: 'Wolverine V3 Pro Wireless', brand: 'Razer', price: 199, specs: { Type: 'Pro wireless gamepad', Connection: '2.4GHz / USB-C', Controls: 'Six remappable buttons, Hall-effect sticks', Compatibility: 'Xbox / Windows' } },
  { name: 'T128 Racing Wheel', brand: 'Thrustmaster', price: 199, specs: { Type: 'Racing wheel and pedal set', Connection: 'USB', Controls: '270°–900° rotation, magnetic pedals', Compatibility: 'PC / PlayStation' } },
  { name: 'G923 TRUEFORCE Racing Wheel', brand: 'Logitech', price: 399, specs: { Type: 'Force-feedback wheel and pedals', Connection: 'USB', Controls: '900° rotation, TRUEFORCE feedback', Compatibility: 'PC / PlayStation' } },
  { name: 'G29 Driving Force Racing Wheel', brand: 'Logitech', price: 299, specs: { Type: 'Force-feedback wheel and pedals', Connection: 'USB', Controls: '900° rotation, dual-motor feedback', Compatibility: 'PC / PlayStation' } },
  { name: 'R5 Racing Simulator Bundle', brand: 'MOZA', price: 599, specs: { Type: 'Direct-drive wheel, base and pedals', Connection: 'USB', Controls: '5.5Nm torque, 280mm steering wheel', Compatibility: 'Windows PC' } },
  { name: 'CSL DD Ready2Race Bundle', brand: 'Fanatec', price: 699, specs: { Type: 'Direct-drive wheelbase, wheel and pedals', Connection: 'USB', Controls: '5Nm torque, 300mm steering wheel', Compatibility: 'Windows PC' } },
  { name: 'TCA Airbus Edition Joystick', brand: 'Thrustmaster', price: 89, specs: { Type: 'Airbus-style flight joystick', Connection: 'USB', Controls: '16 action buttons, detachable throttle', Compatibility: 'Windows PC' } },
  { name: 'T.16000M FCS HOTAS', brand: 'Thrustmaster', price: 129, specs: { Type: 'Flight stick and throttle', Connection: 'USB', Controls: 'Hall-effect magnetic sensors', Compatibility: 'Windows PC' } },
  { name: 'G X56 H.O.T.A.S. Flight System', brand: 'Logitech', price: 249, specs: { Type: 'Flight stick and throttle', Connection: 'USB', Controls: '189 programmable controls, RGB', Compatibility: 'Windows PC' } },
  { name: 'Gladiator NXT EVO Space Combat Edition', brand: 'VKB', price: 165, specs: { Type: 'Precision flight joystick', Connection: 'USB', Controls: 'Contactless sensors, adjustable springs', Compatibility: 'Windows PC' } },
])

const addGear = (name: string, brand: string, price: number, type: string, specs: string) => {
  addProduct('Battlestations & Gear', name, brand, price, { Type: type, Specifications: specs })
}

addGear('TITAN Evo XL 2024 Gaming Chair', 'Secretlab', 599, 'Gaming chair', 'XL fit, 4-way L-ADAPT lumbar, magnetic head pillow, 165-degree recline')
addGear('OMEGA 2020 Gaming Chair', 'Secretlab', 449, 'Gaming chair', 'Regular fit, cold-cure foam, adjustable lumbar support, 165-degree recline')
addGear('Iskur V2 Ergonomic Gaming Chair', 'Razer', 599, 'Gaming chair', 'Built-in adjustable lumbar arch, 152-degree recline, up to 136kg')
addGear('Enki X Ergonomic Gaming Chair', 'Razer', 399, 'Gaming chair', 'Shoulder arches, 152-degree recline, high-density foam cushions')
addGear('PL4800 Ergonomic Gaming Chair', 'AndaSeat', 499, 'Gaming chair', '4-way lumbar support, magnetic head pillow, XL steel frame')
addGear('Hero Gaming Chair Black Edition', 'Noblechairs', 549, 'Gaming chair', 'Cold-foam upholstery, adjustable lumbar support, 135-degree recline')
addGear('MAGNUS Pro XL Sit-to-Stand Desk', 'Secretlab', 999, 'Standing desk', '177 x 80cm steel desktop, 65–125cm electric lift, integrated cable tray')
addGear('Magnus Metal Desk', 'Secretlab', 599, 'Gaming desk', '150 x 70cm steel desktop, magnetic cable management, 100kg capacity')
addGear('Jarvis Bamboo Standing Desk 60x30', 'Fully', 899, 'Standing desk', '152 x 76cm bamboo top, electric height adjustment, programmable handset')
addGear('UPLIFT V2 Commercial 60x30 Desk', 'UPLIFT Desk', 999, 'Standing desk', '152 x 76cm laminate top, dual-motor lift, 64–130cm height range')
addGear('E7 Pro Plus Standing Desk Frame', 'FlexiSpot', 499, 'Standing desk', 'Dual motors, 125kg lift capacity, 63.5–128.5cm height range')
addGear('HX Premium Monitor Arm', 'Ergotron', 329, 'Monitor arm', 'Supports 3.2–19.1kg displays, 33cm lift, VESA 75 x 75 / 100 x 100')
addGear('LX Desk Monitor Arm', 'Ergotron', 219, 'Monitor arm', 'Supports 3.2–11.3kg displays, 34cm lift, VESA 75 x 75 / 100 x 100')
addGear('Heavy-Duty Single Monitor Arm', 'Humanscale', 279, 'Monitor arm', 'Supports up to 15.9kg, counterbalance adjustment, VESA compatible')
addGear('Smart Light Bar', 'BenQ', 129, 'Monitor lighting', 'Auto-dimming desk lamp, screen-safe asymmetric optics, wireless controller')
addGear('Govee RGBIC Gaming Light Bars', 'Govee', 89, 'RGB lighting', 'RGBICWW, 16 million colors, app and voice control, dual bars')
addGear('CyberPower CP1500PFCLCD UPS', 'CyberPower', 239, 'UPS backup', '1500VA / 1000W, pure sine wave, 12 outlets, AVR and LCD')
addGear('APC Back-UPS Pro 1500VA', 'APC', 249, 'UPS backup', '1500VA / 865W, 10 outlets, AVR, replaceable battery')

const departmentForCategory: Record<Category, Department> = {
  'Gaming PCs': 'Gaming PCs',
  'Processors': 'Processors (CPUs)',
  'Graphics Cards': 'Graphics Cards (GPUs)',
  'Motherboards': 'Motherboards',
  'Memory': 'Memory (RAM)',
  'Storage': 'Storage (NVMe & SSDs)',
  'Power Supplies': 'Power Supplies (PSUs)',
  'Cases': 'PC Cases & Cooling',
  'Cooling': 'PC Cases & Cooling',
  'Monitors': 'Monitors & Displays',
  'Gaming Mice': 'Gaming Mice',
  'Mechanical Keyboards': 'Mechanical Keyboards',
  'Mouse Pads & Desk Mats': 'Mouse Pads & Desk Mats',
  'Headsets & Audio': 'Headsets & Audio',
  'Microphones & Webcams': 'Microphones & Webcams',
  'Controllers & Sim Gear': 'Controllers & Sim Gear',
  'Battlestations & Gear': 'Battlestations & Gear',
  'Operating Systems': 'Operating Systems',
}

const verifiedProductImages: Record<string, string> = {
}

const productPhotos: Record<Category, readonly string[]> = {
  'Gaming PCs': ['1587202372775-e229f172b9d7', '1587202372634-32705e3bf49c', '1593640408182-31c70c8268f5', '1598550476439-6847785fcea6'],
  'Processors': ['1591799264318-7e6ef8ddb7ea', '1518770660439-4636190af475', '1615906655593-ad0386982a0f'],
  'Graphics Cards': ['1591488320449-011701bb6704', '1587202372634-32705e3bf49c', '1593640408182-31c70c8268f5'],
  'Motherboards': ['1518770660439-4636190af475', '1615906655593-ad0386982a0f', '1581091226825-a6a2a5aee158'],
  'Memory': ['1587202372634-32705e3bf49c', '1587202372775-e229f172b9d7', '1598550476439-6847785fcea6'],
  'Storage': ['1597852074816-d933c7d2b988', '1593642632823-8f785ba67e45', '1518770660439-4636190af475'],
  'Power Supplies': ['1615906655593-ad0386982a0f', '1587202372775-e229f172b9d7', '1593640408182-31c70c8268f5'],
  'Cases': ['1593640408182-31c70c8268f5', '1587202372775-e229f172b9d7', '1587202372634-32705e3bf49c'],
  'Cooling': ['1587202372775-e229f172b9d7', '1587202372634-32705e3bf49c', '1598550476439-6847785fcea6'],
  'Monitors': ['1527443224154-c4a3942d3acf', '1593305841991-05c297ba4575', '1625842268584-8f3296236761'],
  'Mechanical Keyboards': ['1618384887929-16ec33fab9ef', '1595225476474-87563907a212', '1587829741301-dc798b83add3'],
  'Gaming Mice': ['1613141412501-9012977f1969', '1527814050087-3793815479db', '1526738549149-8e07eca6c147'],
  'Mouse Pads & Desk Mats': ['1526738549149-8e07eca6c147', '1612287230202-1ff1d85d1bdf', '1498050108023-c5249f4df085'],
  'Headsets & Audio': ['1599669454699-248893623440', '1526738549149-8e07eca6c147', '1542751371-adc38448a05e'],
  'Microphones & Webcams': ['1526738549149-8e07eca6c147', '1612287230202-1ff1d85d1bdf', '1498050108023-c5249f4df085'],
  'Controllers & Sim Gear': ['1526738549149-8e07eca6c147', '1613141412501-9012977f1969', '1542751371-adc38448a05e'],
  'Battlestations & Gear': ['1598550476439-6847785fcea6', '1625842268584-8f3296236761', '1542751371-adc38448a05e'],
  'Operating Systems': ['1498050108023-c5249f4df085', '1526738549149-8e07eca6c147', '1612287230202-1ff1d85d1bdf'],
}

const productImage = (category: Category, variantIndex: number) => {
  const photos = productPhotos[category]
  const photo = photos[variantIndex % photos.length]
  return `https://images.unsplash.com/photo-${photo}?auto=format&fit=crop&w=1200&q=85`
}

const departmentForProduct = (product: ProductSeed): Department => departmentForCategory[product.category]

export const departments: Department[] = [
  'Gaming PCs',
  'Graphics Cards (GPUs)',
  'Processors (CPUs)',
  'Motherboards',
  'Memory (RAM)',
  'Storage (NVMe & SSDs)',
  'Power Supplies (PSUs)',
  'PC Cases & Cooling',
  'Monitors & Displays',
  'Gaming Mice',
  'Mechanical Keyboards',
  'Mouse Pads & Desk Mats',
  'Headsets & Audio',
  'Microphones & Webcams',
  'Controllers & Sim Gear',
  'Operating Systems',
  'Battlestations & Gear',
]

const allProductSeeds = [...seedProducts, ...generatedSeeds]
const categoryImageCounts = new Map<Category, number>()
export const products: Product[] = allProductSeeds.map((product) => {
  const department = departmentForProduct(product)
  const variantIndex = categoryImageCounts.get(product.category) ?? 0
  categoryImageCounts.set(product.category, variantIndex + 1)
  return { ...product, department, image: verifiedProductImages[product.id] ?? productImage(product.category, variantIndex) }
})

export const categories: Category[] = [
  'Gaming PCs', 'Processors', 'Graphics Cards', 'Motherboards', 'Memory', 'Storage', 'Power Supplies',
  'Cases', 'Cooling', 'Monitors', 'Gaming Mice', 'Mechanical Keyboards', 'Mouse Pads & Desk Mats',
  'Headsets & Audio', 'Microphones & Webcams', 'Controllers & Sim Gear', 'Battlestations & Gear', 'Operating Systems',
]

export const builderSlots: { id: BuilderSlot; label: string; required: boolean }[] = [
  { id: 'cpu', label: 'Processor', required: true },
  { id: 'cooler', label: 'CPU Cooler', required: false },
  { id: 'motherboard', label: 'Motherboard', required: true },
  { id: 'ram', label: 'Memory', required: true },
  { id: 'gpu', label: 'Graphics Card', required: true },
  { id: 'storage', label: 'Storage', required: true },
  { id: 'psu', label: 'Power Supply', required: true },
  { id: 'case', label: 'PC Case', required: true },
  { id: 'os', label: 'Operating System', required: false },
  { id: 'monitor', label: 'Monitor', required: false },
  { id: 'gaming-mice', label: 'Gaming Mice', required: false },
  { id: 'mechanical-keyboards', label: 'Mechanical Keyboards', required: false },
  { id: 'mouse-pads', label: 'Mouse Pads & Desk Mats', required: false },
  { id: 'headsets-audio', label: 'Headsets & Audio', required: false },
  { id: 'microphones-webcams', label: 'Microphones & Webcams', required: false },
  { id: 'controllers-sim', label: 'Controllers & Sim Gear', required: false },
]

export function getCompatibleProducts(slot: BuilderSlot, selected: Record<string, string>): Product[] {
  const cpu = products.find((product) => product.id === selected.cpu)
  const motherboard = products.find((product) => product.id === selected.motherboard)
  const gpu = products.find((product) => product.id === selected.gpu)
  return products.filter((product) => {
    if (product.builderSlot !== slot) return false
    if (product.stock === 0) return false
    if (slot === 'motherboard' && cpu?.socket && product.socket !== cpu.socket) return false
    if (slot === 'cpu' && motherboard?.socket && product.socket !== motherboard.socket) return false
    if (slot === 'ram' && motherboard?.memoryType && product.memoryType !== motherboard.memoryType) return false
    if (slot === 'case' && product.caseClearance && gpu?.gpuLength && product.caseClearance < gpu.gpuLength) return false
    return true
  })
}
