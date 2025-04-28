export type ArmorLevel = 'I' | 'IIA' | 'IIA+' | 'IIIA' | 'IIIA+' | 'III' | 'III+';
export type PenetrationValue = 0 | 1 | 2 | 3; // 0:Red, 1:Orange, 2:Yellow, 3:Green

export interface AmmoType {
  id: string;
  caliber: string;
  name: string;
  dispersion: number;
  velocity: number;
  traderUnlock: string;
  price: number | null;
  helmPenetration: {
    'I': PenetrationValue;
    'IIA': PenetrationValue;
    'IIA+': PenetrationValue;
  };
  bodyPenetration: {
    'IIIA': PenetrationValue;
    'IIIA+': PenetrationValue;
    'III': PenetrationValue;
    'III+': PenetrationValue;
  };
  description?: string;
}

// Data extracted from the provided image and verified/corrected
export const ammoData: AmmoType[] = [
  // 7.65 browning
  {
    id: '765-fmj',
    caliber: '7.65 browning',
    name: 'FMJ',
    dispersion: 0,
    velocity: 318,
    traderUnlock: 'Artisan LV1',
    price: 15,
    helmPenetration: { 'I': 0, 'IIA': 0, 'IIA+': 0 },
    bodyPenetration: { 'IIIA': 0, 'IIIA+': 0, 'III': 0, 'III+': 0 },
  },
  {
    id: '765-jhp',
    caliber: '7.65 browning',
    name: 'JHP',
    dispersion: 4,
    velocity: 283,
    traderUnlock: 'Artisan LV2',
    price: 25,
    helmPenetration: { 'I': 0, 'IIA': 0, 'IIA+': 0 },
    bodyPenetration: { 'IIIA': 0, 'IIIA+': 0, 'III': 0, 'III+': 0 },
  },
  // 7.62x25
  {
    id: '762x25-fmj',
    caliber: '7.62x25',
    name: 'FMJ',
    dispersion: 0,
    velocity: 427,
    traderUnlock: 'Artisan LV1',
    price: 15,
    helmPenetration: { 'I': 3, 'IIA': 2, 'IIA+': 2 },
    bodyPenetration: { 'IIIA': 0, 'IIIA+': 0, 'III': 0, 'III+': 0 },
  },
  {
    id: '762x25-pst',
    caliber: '7.62x25',
    name: 'PST',
    dispersion: -2,
    velocity: 430,
    traderUnlock: 'Artisan LV2',
    price: 25,
    helmPenetration: { 'I': 3, 'IIA': 3, 'IIA+': 3 },
    bodyPenetration: { 'IIIA': 0, 'IIIA+': 0, 'III': 0, 'III+': 0 },
  },
  {
    id: '762x25-pt',
    caliber: '7.62x25',
    name: 'PT',
    dispersion: 2,
    velocity: 415,
    traderUnlock: 'Artisan LV3',
    price: 15,
    helmPenetration: { 'I': 3, 'IIA': 2, 'IIA+': 2 },
    bodyPenetration: { 'IIIA': 2, 'IIIA+': 0, 'III': 0, 'III+': 0 },
  },
  // 9mm
  {
    id: '9mm-fmj',
    caliber: '9mm',
    name: 'FMJ',
    dispersion: 0,
    velocity: 390,
    traderUnlock: 'Gunny LV1',
    price: 15,
    helmPenetration: { 'I': 1, 'IIA': 0, 'IIA+': 0 },
    bodyPenetration: { 'IIIA': 0, 'IIIA+': 0, 'III': 0, 'III+': 0 },
  },
  {
    id: '9mm-hp',
    caliber: '9mm',
    name: 'HP',
    dispersion: 3,
    velocity: 377,
    traderUnlock: 'Gunny LV1',
    price: 25,
    helmPenetration: { 'I': 1, 'IIA': 0, 'IIA+': 0 },
    bodyPenetration: { 'IIIA': 0, 'IIIA+': 0, 'III': 0, 'III+': 0 },
  },
  {
    id: '9mm-tracer',
    caliber: '9mm',
    name: 'TRACER',
    dispersion: 4,
    velocity: 342,
    traderUnlock: 'Gunny LV2',
    price: 25,
    helmPenetration: { 'I': 1, 'IIA': 0, 'IIA+': 0 },
    bodyPenetration: { 'IIIA': 0, 'IIIA+': 0, 'III': 0, 'III+': 0 },
  },
  {
    id: '9mm-xpen',
    caliber: '9mm',
    name: 'XTREME PEN',
    dispersion: -2,
    velocity: 381,
    traderUnlock: 'Gunny LV2',
    price: 35,
    helmPenetration: { 'I': 3, 'IIA': 3, 'IIA+': 3 },
    bodyPenetration: { 'IIIA': 3, 'IIIA+': 3, 'III': 0, 'III+': 0 },
  },
  {
    id: '9mm-ls9mm',
    caliber: '9mm',
    name: 'LS 9MM',
    dispersion: -2,
    velocity: 0,
    traderUnlock: 'Found in AO',
    price: null,
    helmPenetration: { 'I': 3, 'IIA': 3, 'IIA+': 3 },
    bodyPenetration: { 'IIIA': 3, 'IIIA+': 3, 'III': 3, 'III+': 0 },
  },
  // 5.45x39
  {
    id: '545-fmj',
    caliber: '5.45x39',
    name: 'FMJ',
    dispersion: 0,
    velocity: 884,
    traderUnlock: 'Tumcont LV1',
    price: 15,
    helmPenetration: { 'I': 3, 'IIA': 3, 'IIA+': 3 },
    bodyPenetration: { 'IIIA': 3, 'IIIA+': 3, 'III': 1, 'III+': 1 },
  },
  {
    id: '545-us',
    caliber: '5.45x39',
    name: 'US',
    dispersion: 6,
    velocity: 304,
    traderUnlock: 'Tumcont LV2',
    price: 35,
    helmPenetration: { 'I': 3, 'IIA': 3, 'IIA+': 3 },
    bodyPenetration: { 'IIIA': 1, 'IIIA+': 1, 'III': 0, 'III+': 0 },
  },
  {
    id: '545-hp',
    caliber: '5.45x39',
    name: 'HP',
    dispersion: 6,
    velocity: 884,
    traderUnlock: 'Tumcont LV2',
    price: 25,
    helmPenetration: { 'I': 3, 'IIA': 3, 'IIA+': 3 },
    bodyPenetration: { 'IIIA': 3, 'IIIA+': 3, 'III': 1, 'III+': 1 },
  },
  {
    id: '545-ps',
    caliber: '5.45x39',
    name: 'PS',
    dispersion: 2,
    velocity: 880,
    traderUnlock: 'Tumcont LV2',
    price: 35,
    helmPenetration: { 'I': 3, 'IIA': 3, 'IIA+': 3 },
    bodyPenetration: { 'IIIA': 3, 'IIIA+': 3, 'III': 1, 'III+': 1 },
  },
  {
    id: '545-pp',
    caliber: '5.45x39',
    name: 'PP',
    dispersion: -2,
    velocity: 880,
    traderUnlock: 'Found in AO',
    price: null,
    helmPenetration: { 'I': 3, 'IIA': 3, 'IIA+': 3 },
    bodyPenetration: { 'IIIA': 3, 'IIIA+': 3, 'III': 3, 'III+': 2 },
  },
  {
    id: '545-bt',
    caliber: '5.45x39',
    name: 'BT',
    dispersion: -2,
    velocity: 880,
    traderUnlock: 'Tumcont LV2',
    price: 35,
    helmPenetration: { 'I': 3, 'IIA': 3, 'IIA+': 3 },
    bodyPenetration: { 'IIIA': 3, 'IIIA+': 3, 'III': 3, 'III+': 1 }, 
  },
  {
    id: '545-bp',
    caliber: '5.45x39',
    name: 'BP',
    dispersion: -1,
    velocity: 840,
    traderUnlock: 'Found in AO',
    price: null,
    helmPenetration: { 'I': 3, 'IIA': 3, 'IIA+': 3 },
    bodyPenetration: { 'IIIA': 3, 'IIIA+': 3, 'III': 3, 'III+': 3 },
  },
  {
    id: '545-bs',
    caliber: '5.45x39',
    name: 'BS',
    dispersion: -6,
    velocity: 840,
    traderUnlock: 'Found in AO',
    price: null,
    helmPenetration: { 'I': 3, 'IIA': 3, 'IIA+': 3 },
    bodyPenetration: { 'IIIA': 3, 'IIIA+': 3, 'III': 3, 'III+': 1 },
  },
  // 5.56x45
  {
    id: '556-sp',
    caliber: '5.56x45',
    name: 'SP',
    dispersion: 3,
    velocity: 930,
    traderUnlock: 'Gunny LV1',
    price: 15,
    helmPenetration: { 'I': 2, 'IIA': 2, 'IIA+': 2 },
    bodyPenetration: { 'IIIA': 2, 'IIIA+': 2, 'III': 2, 'III+': 2 },
  },
  {
    id: '556-hpbt',
    caliber: '5.56x45',
    name: 'HPBT',
    dispersion: 3,
    velocity: 1040,
    traderUnlock: 'Found in AO',
    price: null,
    helmPenetration: { 'I': 3, 'IIA': 3, 'IIA+': 3 },
    bodyPenetration: { 'IIIA': 3, 'IIIA+': 3, 'III': 2, 'III+': 2 },
  },
  {
    id: '556-fmj',
    caliber: '5.56x45',
    name: 'FMJ',
    dispersion: 0,
    velocity: 880,
    traderUnlock: 'Gunny LV2',
    price: 45,
    helmPenetration: { 'I': 3, 'IIA': 3, 'IIA+': 3 },
    bodyPenetration: { 'IIIA': 3, 'IIIA+': 3, 'III': 2, 'III+': 2 },
  },
  {
    id: '556-m193',
    caliber: '5.56x45',
    name: 'M193',
    dispersion: -2,
    velocity: 1006,
    traderUnlock: 'Found in AO',
    price: null,
    helmPenetration: { 'I': 3, 'IIA': 3, 'IIA+': 3 },
    bodyPenetration: { 'IIIA': 3, 'IIIA+': 3, 'III': 2, 'III+': 2 },
  },
  {
    id: '556-m855',
    caliber: '5.56x45',
    name: 'M855',
    dispersion: -2,
    velocity: 945,
    traderUnlock: 'Gunny LV3',
    price: 35,
    helmPenetration: { 'I': 3, 'IIA': 3, 'IIA+': 3 },
    bodyPenetration: { 'IIIA': 3, 'IIIA+': 3, 'III': 3, 'III+': 2 },
  },
  {
    id: '556-m856',
    caliber: '5.56x45',
    name: 'M856',
    dispersion: 3,
    velocity: 916,
    traderUnlock: 'Gunny LV3',
    price: 35,
    helmPenetration: { 'I': 3, 'IIA': 3, 'IIA+': 3 },
    bodyPenetration: { 'IIIA': 3, 'IIIA+': 3, 'III': 3, 'III+': 2 },
  },
  {
    id: '556-m856a1',
    caliber: '5.56x45',
    name: 'M856A1',
    dispersion: 4,
    velocity: 968,
    traderUnlock: 'Found in AO',
    price: null,
    helmPenetration: { 'I': 3, 'IIA': 3, 'IIA+': 3 },
    bodyPenetration: { 'IIIA': 3, 'IIIA+': 3, 'III': 3, 'III+': 3 },
  },
  {
    id: '556-m855a1',
    caliber: '5.56x45',
    name: 'M855A1',
    dispersion: -7,
    velocity: 970,
    traderUnlock: 'Gunny LV3',
    price: 55,
    helmPenetration: { 'I': 3, 'IIA': 3, 'IIA+': 3 },
    bodyPenetration: { 'IIIA': 3, 'IIIA+': 3, 'III': 3, 'III+': 3 },
  },
  // 7.62x39
  {
    id: '762x39-sp',
    caliber: '7.62x39',
    name: 'SP',
    dispersion: 2,
    velocity: 743,
    traderUnlock: 'Artisan LV1',
    price: 15,
    helmPenetration: { 'I': 1, 'IIA': 1, 'IIA+': 1 },
    bodyPenetration: { 'IIIA': 1, 'IIIA+': 0, 'III': 0, 'III+': 0 },
  },
  {
    id: '762x39-us',
    caliber: '7.62x39',
    name: 'US',
    dispersion: 6,
    velocity: 310,
    traderUnlock: 'Artisan LV2',
    price: 35,
    helmPenetration: { 'I': 3, 'IIA': 3, 'IIA+': 3 },
    bodyPenetration: { 'IIIA': 1, 'IIIA+': 1, 'III': 0, 'III+': 0 },
  },
  {
    id: '762x39-tracer',
    caliber: '7.62x39',
    name: 'TRACER',
    dispersion: 3,
    velocity: 725,
    traderUnlock: 'Artisan LV2',
    price: 35,
    helmPenetration: { 'I': 3, 'IIA': 3, 'IIA+': 3 },
    bodyPenetration: { 'IIIA': 3, 'IIIA+': 3, 'III': 3, 'III+': 0 },
  },
  {
    id: '762x39-ps',
    caliber: '7.62x39',
    name: 'PS',
    dispersion: -1,
    velocity: 725,
    traderUnlock: 'Artisan LV2',
    price: 35,
    helmPenetration: { 'I': 3, 'IIA': 3, 'IIA+': 3 },
    bodyPenetration: { 'IIIA': 3, 'IIIA+': 3, 'III': 3, 'III+': 1 },
  },
  {
    id: '762x39-bp',
    caliber: '7.62x39',
    name: 'BP',
    dispersion: -2,
    velocity: 725,
    traderUnlock: 'Found in AO',
    price: null,
    helmPenetration: { 'I': 3, 'IIA': 3, 'IIA+': 3 },
    bodyPenetration: { 'IIIA': 3, 'IIIA+': 3, 'III': 3, 'III+': 2 },
  },
  // 7.62x51
  {
    id: '762x51-fmjm80',
    caliber: '7.62x51',
    name: 'FMJ/M80',
    dispersion: 0,
    velocity: 838,
    traderUnlock: 'Banshee LV1',
    price: 25,
    helmPenetration: { 'I': 3, 'IIA': 3, 'IIA+': 3 },
    bodyPenetration: { 'IIIA': 2, 'IIIA+': 2, 'III': 1, 'III+': 0 },
  },
  {
    id: '762x51-m80a1',
    caliber: '7.62x51',
    name: 'M80A1',
    dispersion: -3,
    velocity: 835,
    traderUnlock: 'Banshee LV3?',
    price: 35,
    helmPenetration: { 'I': 3, 'IIA': 3, 'IIA+': 3 },
    bodyPenetration: { 'IIIA': 2, 'IIIA+': 2, 'III': 2, 'III+': 2 },
  },
  {
    id: '762x51-hpbt',
    caliber: '7.62x51',
    name: 'HPBT',
    dispersion: -6,
    velocity: 800,
    traderUnlock: 'Banshee LV2',
    price: 35,
    helmPenetration: { 'I': 3, 'IIA': 3, 'IIA+': 3 },
    bodyPenetration: { 'IIIA': 3, 'IIIA+': 3, 'III': 2, 'III+': 2 },
  },
  {
    id: '762x51-m62',
    caliber: '7.62x51',
    name: 'M62',
    dispersion: 4,
    velocity: 822,
    traderUnlock: 'Banshee LV3',
    price: 55,
    helmPenetration: { 'I': 3, 'IIA': 3, 'IIA+': 3 },
    bodyPenetration: { 'IIIA': 3, 'IIIA+': 3, 'III': 2, 'III+': 2 },
  },
  {
    id: '762x51-m61',
    caliber: '7.62x51',
    name: 'M61',
    dispersion: -4,
    velocity: 838,
    traderUnlock: 'Banshee LV3',
    price: 55,
    helmPenetration: { 'I': 3, 'IIA': 3, 'IIA+': 3 },
    bodyPenetration: { 'IIIA': 3, 'IIIA+': 3, 'III': 3, 'III+': 3 },
  },
  // 7.62x54R
  {
    id: '762x54r-lps',
    caliber: '7.62x54R',
    name: 'LPS',
    dispersion: -1,
    velocity: 828,
    traderUnlock: 'Artisan LV1',
    price: 25,
    helmPenetration: { 'I': 3, 'IIA': 3, 'IIA+': 3 },
    bodyPenetration: { 'IIIA': 3, 'IIIA+': 3, 'III': 3, 'III+': 2 },
  },
  {
    id: '762x54r-tracer',
    caliber: '7.62x54R',
    name: 'TRACER',
    dispersion: 3,
    velocity: 830,
    traderUnlock: 'Artisan LV2',
    price: 35,
    helmPenetration: { 'I': 3, 'IIA': 3, 'IIA+': 3 },
    bodyPenetration: { 'IIIA': 3, 'IIIA+': 3, 'III': 3, 'III+': 2 },
  },
  {
    id: '762x54r-sr',
    caliber: '7.62x54R',
    name: 'SR',
    dispersion: -5,
    velocity: 835,
    traderUnlock: 'Found in AO',
    price: null,
    helmPenetration: { 'I': 3, 'IIA': 3, 'IIA+': 3 },
    bodyPenetration: { 'IIIA': 3, 'IIIA+': 3, 'III': 3, 'III+': 3 },
  },
  {
    id: '762x54r-ap',
    caliber: '7.62x54R',
    name: 'AP',
    dispersion: -2,
    velocity: 828,
    traderUnlock: 'Found in AO',
    price: null,
    helmPenetration: { 'I': 3, 'IIA': 3, 'IIA+': 3 },
    bodyPenetration: { 'IIIA': 3, 'IIIA+': 3, 'III': 3, 'III+': 3 },
  },
  // 12 GAUGE
  {
    id: '12g-00buck',
    caliber: '12 GAUGE',
    name: '00 BUCK',
    dispersion: 0,
    velocity: 370,
    traderUnlock: 'Gunny LV1',
    price: 15,
    helmPenetration: { 'I': 0, 'IIA': 0, 'IIA+': 0 },
    bodyPenetration: { 'IIIA': 0, 'IIIA+': 0, 'III': 0, 'III+': 0 },
  },
  {
    id: '12g-fc00buck',
    caliber: '12 GAUGE',
    name: 'FC 00 BUCK',
    dispersion: -27,
    velocity: 370,
    traderUnlock: 'Gunny LV2',
    price: 35,
    helmPenetration: { 'I': 0, 'IIA': 0, 'IIA+': 0 },
    bodyPenetration: { 'IIIA': 0, 'IIIA+': 0, 'III': 0, 'III+': 0 },
  },
  {
    id: '12g-12gslug',
    caliber: '12 GAUGE',
    name: '12G SLUG',
    dispersion: -42,
    velocity: 420,
    traderUnlock: 'Gunny LV2',
    price: 25,
    helmPenetration: { 'I': 1, 'IIA': 1, 'IIA+': 1 },
    bodyPenetration: { 'IIIA': 1, 'IIIA+': 1, 'III': 1, 'III+': 1 },
  },
  {
    id: '12g-sstsabotslug',
    caliber: '12 GAUGE',
    name: 'SST SABOT SLUG',
    dispersion: -50,
    velocity: 542,
    traderUnlock: 'Gunny LV2',
    price: 35,
    helmPenetration: { 'I': 3, 'IIA': 3, 'IIA+': 3 },
    bodyPenetration: { 'IIIA': 3, 'IIIA+': 3, 'III': 1, 'III+': 1 },
  },
];

// Get all unique calibers
export const getAllCalibers = (): string[] => {
  return [...new Set(ammoData.map(ammo => ammo.caliber))];
};

// Get ammo by caliber
export const getAmmoByCalibrer = (caliber: string): AmmoType[] => {
  return ammoData.filter(ammo => ammo.caliber === caliber);
};

// Get ammo by id
export const getAmmoById = (id: string): AmmoType | undefined => {
  return ammoData.find(ammo => ammo.id === id);
};

// Helper function to convert penetration values to readable text
export const penetrationLevelText = (value: PenetrationValue): string => {
  switch(value) {
    case 0: return 'No penetration';
    case 1: return 'Low penetration';
    case 2: return 'Medium penetration';
    case 3: return 'High penetration';
    default: return 'Unknown';
  }
};

// Helper function to get color class for penetration values based on image legend
export const penetrationColorClass = (value: PenetrationValue): string => {
  switch(value) {
    case 0: return 'bg-red-600';    // No penetration (Red)
    case 1: return 'bg-orange-500'; // Low penetration (Orange)
    case 2: return 'bg-yellow-500'; // Medium penetration (Yellow)
    case 3: return 'bg-green-500';  // High penetration (Green)
    default: return 'bg-gray-400';
  }
};
