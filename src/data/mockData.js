// HealthMarg Mock Data & Startup Intelligence

export const PITCH_DATA = {
  company: "HealthMarg",
  parentCompany: "WellViva HealthTech India Pvt. Ltd.",
  cin: "U62011GJ2025PTC164160",
  tagline: "Connecting India’s Heartland to Urban Healthcare",
  contact: {
    founder: "Naresh Tawde",
    phone: "+91 9820462984 / +91 9537995556",
    email: "info@healthmarg.in",
    gmail: "healthmarg.wellviva@gmail.com"
  },
  problem: [
    "Millions in Tier II/III/IV cities lack access to advanced tertiary care (Oncology, Cardiac Surgeries, Neuro).",
    "No real-time hospital bed availability status or transparent referral system.",
    "Over 50% of tertiary care patients in Tier I hospitals come from smaller towns.",
    "Families struggle severely with medical travel, lodging costs, and diagnostic delays."
  ],
  solution: [
    "1st Dedicated Aggregator connecting rural & semi-urban patients directly to Tier I tertiary centers.",
    "Real-time ICU & Ward Bed live availability booking system.",
    "Scouting economical lodging, homestays & dormitories for patient families right next to hospitals.",
    "Medical equipment rentals (BiPAP, O2 Concentrators, ICU Beds) delivered to home.",
    "End-to-end support system: 0% EMI medical loans, NGO trust aid & patient mental health counselling."
  ],
  usp: [
    "Dedicated Tier II/III/IV → Tier I Referral Aggregator.",
    "Complete 360° Care Loop: Bed + Diagnostics + Family Stay + Equipment + Finance.",
    "Zero Pharmacy operations to avoid regulatory friction & keep pure referral focus.",
    "High social impact with strong unit economics & scalable tech infrastructure."
  ],
  revenueStreams: [
    { title: "Hospital Bed Booking Fee", rate: "₹500 - ₹1,000 per booking", icon: "Bed" },
    { title: "Pathology Lab Test Fee", rate: "₹10 - ₹100 per test", icon: "Microscope" },
    { title: "Lodging & Homestay Commission", rate: "5% - 10% commission", icon: "Hotel" },
    { title: "Medical Equipment Rentals", rate: "₹100 - ₹1,500 rental commission", icon: "Truck" },
    { title: "Annual Retention Subscriptions", rate: "₹500 - ₹1,000 / year", icon: "Star" }
  ],
  marketSize: {
    tam: "₹45,000 Cr",
    tamDesc: "Total Available Digital Health Referral & Service Market in India (2026)",
    sam: "₹8,500 Cr",
    samDesc: "Serviceable Market in Tier II/III/IV to Tier I Corridors",
    som: "₹1,200 Cr",
    somDesc: "Target Obtainable Market by 2030 across 50 Urban Hubs"
  },
  gtmStrategy: [
    "Phase 1 Pilot: Mehsana, Palitana, Konkan region corridors linked to Ahmedabad & Mumbai.",
    "Channels: ASHA worker referrals, local clinic networks, regional WhatsApp campaign.",
    "Strategic Partnerships: Urban hospital chains, accredited lab networks, budget lodge associations."
  ]
};

export const ORIGIN_CITIES = [
  { id: "mehsana", name: "Mehsana, Gujarat", hub: "ahmedabad", distance: "75 km" },
  { id: "palitana", name: "Palitana, Gujarat", hub: "ahmedabad", distance: "215 km" },
  { id: "konkan", name: "Ratnagiri / Konkan, MH", hub: "mumbai", distance: "330 km" },
  { id: "amreli", name: "Amreli, Gujarat", hub: "ahmedabad", distance: "240 km" },
  { id: "latur", name: "Latur, Maharashtra", hub: "mumbai", distance: "470 km" },
  { id: "nanded", name: "Nanded, Maharashtra", hub: "pune", distance: "420 km" }
];

export const DESTINATION_HUBS = [
  { id: "ahmedabad", name: "Ahmedabad (Tier I Center)", state: "Gujarat" },
  { id: "mumbai", name: "Mumbai (Tier I Center)", state: "Maharashtra" },
  { id: "pune", name: "Pune (Tier I Center)", state: "Maharashtra" }
];

export const HOSPITALS = [
  {
    id: "hosp-apollo-ahmedabad",
    name: "Apollo Hospitals",
    location: "Bhat, GIDC, Ahmedabad",
    cityHub: "ahmedabad",
    rating: 4.9,
    reviews: 1280,
    accreditation: "JCI & NABH Accredited",
    image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=800&q=80",
    specialties: ["Cardiology", "Oncology", "Nephrology", "Organ Transplants"],
    totalBeds: 350,
    vacantBeds: 14,
    icuVacant: 4,
    ventilatorsVacant: 3,
    deluxeVacant: 7,
    generalVacant: 3,
    bedPrices: {
      general: 1200,
      semiPrivate: 3500,
      private: 5500,
      icu: 7500
    },
    facilities: [
      "128-Slice CT Scan",
      "3T Silent MRI",
      "Emergency Cardiac Cath Lab",
      "24/7 NABL Blood Bank",
      "Organ Transplant Suite",
      "In-house Chemotherapy Daycare"
    ],
    doctors: [
      { name: "Dr. Rajesh Shah", spec: "Senior Cardiac Surgeon", exp: "22 Yrs Exp", opdTime: "10:00 AM - 02:00 PM" },
      { name: "Dr. Ananya Mehta", spec: "Radiation Oncologist", exp: "16 Yrs Exp", opdTime: "02:30 PM - 06:00 PM" },
      { name: "Dr. Sameer Parikh", spec: "Chief Nephrologist", exp: "19 Yrs Exp", opdTime: "11:00 AM - 04:00 PM" }
    ],
    nearbyLodgesCount: 12,
    bookingFee: 500
  },
  {
    id: "hosp-hcg-ahmedabad",
    name: "HCG Cancer Centre",
    location: "Sola, SG Highway, Ahmedabad",
    cityHub: "ahmedabad",
    rating: 4.8,
    reviews: 940,
    accreditation: "NABH Cancer Specialty Center",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80",
    specialties: ["Surgical Oncology", "Radiation Therapy", "Bone Marrow Transplant"],
    totalBeds: 220,
    vacantBeds: 8,
    icuVacant: 2,
    ventilatorsVacant: 2,
    deluxeVacant: 3,
    generalVacant: 3,
    bedPrices: {
      general: 1500,
      semiPrivate: 4000,
      private: 6000,
      icu: 8500
    },
    facilities: [
      "TrueBeam LINAC Radiation",
      "PET-CT Scanner",
      "Molecular Onco-Pathology",
      "Bone Marrow Unit",
      "24/7 ICU Isolation"
    ],
    doctors: [
      { name: "Dr. Vikram Desai", spec: "Onco Surgeon", exp: "24 Yrs Exp", opdTime: "09:00 AM - 01:00 PM" },
      { name: "Dr. Neha Patel", spec: "Medical Oncologist", exp: "14 Yrs Exp", opdTime: "02:00 PM - 05:30 PM" }
    ],
    nearbyLodgesCount: 8,
    bookingFee: 500
  },
  {
    id: "hosp-fortis-mumbai",
    name: "Fortis Hospital Mulund",
    location: "Goregaon East, Mumbai",
    cityHub: "mumbai",
    rating: 4.9,
    reviews: 2150,
    accreditation: "JCI & NABH Accredited",
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80",
    specialties: ["Heart Transplants", "Neuro Surgery", "Pediatric Cardiac"],
    totalBeds: 400,
    vacantBeds: 11,
    icuVacant: 3,
    ventilatorsVacant: 4,
    deluxeVacant: 2,
    generalVacant: 2,
    bedPrices: {
      general: 1800,
      semiPrivate: 4500,
      private: 7500,
      icu: 9200
    },
    facilities: [
      "Advanced Heart Failure Unit",
      "Robotic Surgical System",
      "3T MRI",
      "Level IV Trauma Center",
      "Air Ambulance Helipad"
    ],
    doctors: [
      { name: "Dr. Anvay Mulay", spec: "Chief Cardiac Transplant Surgeon", exp: "28 Yrs Exp", opdTime: "10:00 AM - 03:00 PM" },
      { name: "Dr. Smriti Rastogi", spec: "Neuro Specialist", exp: "18 Yrs Exp", opdTime: "01:00 PM - 05:00 PM" }
    ],
    nearbyLodgesCount: 15,
    bookingFee: 750
  },
  {
    id: "hosp-cims-ahmedabad",
    name: "Marengo CIMS Hospital",
    location: "Off Science City Road, Ahmedabad",
    cityHub: "ahmedabad",
    rating: 4.8,
    reviews: 1420,
    accreditation: "NABH Multi-Specialty",
    image: "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=800&q=80",
    specialties: ["Pulmonology", "Critical Care ICU", "Gastroenterology"],
    totalBeds: 300,
    vacantBeds: 18,
    icuVacant: 5,
    ventilatorsVacant: 3,
    deluxeVacant: 6,
    generalVacant: 4,
    bedPrices: {
      general: 1400,
      semiPrivate: 3800,
      private: 5800,
      icu: 7800
    },
    facilities: [
      "ECMO & Advanced Ventilator Support",
      "24/7 Stroke Response Team",
      "Gastro Endoscopy Suite",
      "Dialysis Center"
    ],
    doctors: [
      { name: "Dr. Keyur Parikh", spec: "Senior Interventional Cardiologist", exp: "26 Yrs Exp", opdTime: "10:30 AM - 02:30 PM" },
      { name: "Dr. Bhagyesh Shah", spec: "Critical Care Lead", exp: "17 Yrs Exp", opdTime: "09:00 AM - 05:00 PM" }
    ],
    nearbyLodgesCount: 10,
    bookingFee: 500
  }
];

export const DIAGNOSTIC_TESTS = [
  {
    id: "test-petct",
    name: "Whole Body PET-CT Scan",
    category: "Oncology & Imaging",
    cost: 14500,
    discountCost: 12800,
    fastingRequired: "6 Hours Fasting Required",
    reportTime: "6 Hours Express Digital Report",
    accreditedLabs: ["HealthMarg Central Onco Lab", "Apollo Diagnostics"],
    description: "Detects active metabolic tumors & cancer metastasis with high precision."
  },
  {
    id: "test-mri-brain",
    name: "3T Brain MRI with Contrast",
    category: "Neurology",
    cost: 6500,
    discountCost: 5200,
    fastingRequired: "No Fasting Needed",
    reportTime: "4 Hours Digital Delivery",
    accreditedLabs: ["HealthMarg Imaging Hub", "CIMS Advanced Radiology"],
    description: "High resolution scan for stroke, aneurysm, brain lesions & neurological assessment."
  },
  {
    id: "test-ct-chest",
    name: "High Resolution Chest CT (HRCT)",
    category: "Pulmonology",
    cost: 3200,
    discountCost: 2400,
    fastingRequired: "No Fasting Needed",
    reportTime: "3 Hours Digital Delivery",
    accreditedLabs: ["HealthMarg Diagnostics", "Metro Scan Center"],
    description: "Evaluates lung infection, fibrosis, nodule evaluation & airway disease."
  },
  {
    id: "test-cardiac-panel",
    name: "Advanced Cardiac Risk & Biomarker Panel",
    category: "Cardiology",
    cost: 1800,
    discountCost: 1199,
    fastingRequired: "10 Hours Fasting",
    reportTime: "Same Day Evening",
    accreditedLabs: ["HealthMarg PathLab", "Metropolis Partner Lab"],
    description: "Includes Lipid Profile, Troponin-I, hs-CRP, HbA1c & Kidney Function."
  },
  {
    id: "test-cbc-routine",
    name: "Complete Blood Count (CBC) + ESR",
    category: "General Pathology",
    cost: 350,
    discountCost: 250,
    fastingRequired: "No Fasting Required",
    reportTime: "2 Hours Express",
    accreditedLabs: ["All Partner Labs"],
    description: "Standard screening for infection, anemia, hemoglobin & platelet counts."
  }
];

export const MEDICAL_EQUIPMENT = [
  {
    id: "eq-bipap",
    name: "Philips Respironics BiPAP Auto",
    category: "Respiratory & ICU Support",
    image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=600&q=80",
    rentalPerDay: 350,
    rentalPerMonth: 8500,
    outrightBuy: 75000,
    deposit: 3000,
    deliveryTime: "Under 3 Hours",
    specs: "Dual pressure therapy (IPAP/EPAP), integrated humidifier, leak compensation & digital compliance tracking.",
    includesTechnician: true,
    rating: 4.9
  },
  {
    id: "eq-oxygen",
    name: "10-Liter Dual Flow Medical Oxygen Concentrator",
    category: "Oxygen & Respiratory",
    image: "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?auto=format&fit=crop&w=600&q=80",
    rentalPerDay: 450,
    rentalPerMonth: 9500,
    outrightBuy: 62000,
    deposit: 3500,
    deliveryTime: "Under 2 Hours (Urgent Triage)",
    specs: "93% ± 3% purity continuous flow oxygen, power outage alarm, oxygen purity analyzer built-in.",
    includesTechnician: true,
    rating: 4.9
  },
  {
    id: "eq-icu-bed",
    name: "5-Function Motorized Electric ICU Bed + Air Mattress",
    category: "Patient Mobility & Bedcare",
    image: "https://images.unsplash.com/photo-1512678080530-7760d81faba6?auto=format&fit=crop&w=600&q=80",
    rentalPerDay: 550,
    rentalPerMonth: 12000,
    outrightBuy: 88000,
    deposit: 4000,
    deliveryTime: "Same Day Setup",
    specs: "Remote control head & foot tilt, height adjustment, Trendelenburg position & anti-bedsore ripple air mattress.",
    includesTechnician: true,
    rating: 4.8
  },
  {
    id: "eq-wheelchair",
    name: "Foldable Lightweight Transit Wheelchair",
    category: "Patient Mobility",
    image: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=600&q=80",
    rentalPerDay: 80,
    rentalPerMonth: 1800,
    outrightBuy: 9500,
    deposit: 1000,
    deliveryTime: "Under 4 Hours",
    specs: "Ultra light aluminum frame, companion handbrakes, cushion seat, compact fold for car trunk.",
    includesTechnician: false,
    rating: 4.7
  }
];

export const FAMILY_LODGINGS = [
  {
    id: "lodge-seva-sadan",
    name: "Seva Sadan Medical Lodge & Homestay",
    nearHospital: "Apollo Hospitals & HCG Cancer Centre (200m distance)",
    hospitalId: "hosp-apollo-ahmedabad",
    rating: 4.8,
    reviews: 320,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80",
    types: [
      { name: "Clean Dormitory Bed", pricePerNight: 350, icon: "Users" },
      { name: "Private Double AC Room", pricePerNight: 750, icon: "Home" },
      { name: "Family Suite with Kitchenette", pricePerNight: 1100, icon: "Heart" }
    ],
    amenities: [
      "Shared Kitchen for Patient Special Meals",
      "24/7 Hot Water & Elevator",
      "Free Electric Hospital Shuttle",
      "Clean RO Drinking Water",
      "Washing Machine & Laundry Area"
    ],
    distance: "200 meters (3 min walk to Apollo)"
  },
  {
    id: "lodge-wellviva-stays",
    name: "WellViva Care Homestays",
    nearHospital: "HCG Cancer Centre & CIMS Hospital",
    hospitalId: "hosp-hcg-ahmedabad",
    rating: 4.9,
    reviews: 185,
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=600&q=80",
    types: [
      { name: "Budget Patient AC Room", pricePerNight: 850, icon: "Home" },
      { name: "2-Bedroom Patient Family Apartment", pricePerNight: 1450, icon: "Users" }
    ],
    amenities: [
      "Private Kitchenette & Fridge",
      "Quiet Environment for Caregivers",
      "Doctor on Call",
      "Wheelchair Accessible Ramp"
    ],
    distance: "350 meters"
  },
  {
    id: "lodge-atithi-bhavan",
    name: "Heartland Atithi Care Lodge",
    nearHospital: "Fortis Hospital Mulund, Mumbai",
    hospitalId: "hosp-fortis-mumbai",
    rating: 4.7,
    reviews: 410,
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80",
    types: [
      { name: "Single Caregiver Dorm", pricePerNight: 450, icon: "User" },
      { name: "Standard Family Room", pricePerNight: 950, icon: "Home" }
    ],
    amenities: [
      "Pure Veg Meal Tiffin Facility",
      "24/7 Security",
      "Free High-speed Wi-Fi",
      "Proximity to Chemist & ATM"
    ],
    distance: "400 meters"
  }
];

export const INITIAL_CARE_JOURNEY = {
  journeyId: "HM-2026-8941",
  patientName: "Rameshwar Patel",
  age: 58,
  origin: "Mehsana, Gujarat",
  destinationHub: "Ahmedabad Tier-1 Medical Corridor",
  status: "In Transit & Reserved",
  steps: [
    { id: 1, title: "Local Doctor Referral", location: "Mehsana Primary Care", status: "completed", time: "10:15 AM Today" },
    { id: 2, title: "ICU Bed Booking Confirmed", location: "Apollo Hospital, ICU Bed #304", status: "active", time: "11:30 AM Today" },
    { id: 3, title: "Family Lodging Hold", location: "Seva Sadan Lodge, Room #104", status: "active", time: "11:35 AM Today" },
    { id: 4, title: "BiPAP Equipment Assigned", location: "Dispatch En Route to Apollo", status: "pending", time: "Est. 02:00 PM" },
    { id: 5, title: "Hospital Admission Check-in", location: "Apollo Triage Gate 2", status: "pending", time: "Est. 01:15 PM" }
  ],
  qrPassCode: "HM-APOLLO-ICU-304-SEVA104"
};
