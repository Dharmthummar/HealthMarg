// HealthMarg Sourced Data - Loaded from updated Hospital List_Ahmedabad.xlsx (322 Verified Hospitals)
// CIN: U62011GJ2025PTC164160 | WellViva HealthTech India Pvt. Ltd.

import AHMEDABAD_HOSPITALS_RAW from './ahmedabad_hospitals.json';

export const PITCH_DATA = {
  company: "HealthMarg",
  parentCompany: "WellViva HealthTech India Pvt. Ltd.",
  cin: "U62011GJ2025PTC164160",
  tagline: "Connecting India's Heartland to Urban Healthcare",
  contact: {
    founder: "Naresh Tawde",
    phone: "+91 9820462984 / +91 9537995556",
    email: "info@healthmarg.in"
  }
};

// ?? All Specialties from Hospital List_Ahmedabad.xlsx ??
export const AHMEDABAD_SPECIALTIES = [
  "All Specialties",
  "Multispeciality Tertiary Care",
  "General & Laparoscopic Surgery",
  "Orthopaedics & Spine",
  "Ophthalmology / Eye Care",
  "Gynaecology & Maternity",
  "Cardiology & Cardiac Surgery"
];

// ?? 322 Verified Hospitals from Hospital List_Ahmedabad.xlsx ??
export const HOSPITALS = AHMEDABAD_HOSPITALS_RAW.map(h => ({
  ...h,
  get vacantBeds() { return this.bedCategories.reduce((s, b) => s + b.vacant, 0); },
  get icuVacant()  { return this.bedCategories.find(b => b.id === 'icu')?.vacant ?? 0; }
}));

// ?? DIAGNOSTIC TESTS (Pure product / machine photos, strictly NO humans) ??
export const DIAGNOSTIC_TESTS = [
  {
    id: "dt-petct",
    name: "PET-CT Whole Body Scan",
    category: "Nuclear Imaging",
    description: "Full-body oncology PET-CT scanner machine for cancer detection, staging & treatment monitoring.",
    cost: 22000,
    discountCost: 17500,
    reportTime: "Same Day (6 hrs)",
    fastingRequired: "6 hrs fasting before scan",
    image: "./assets/products/petct_scanner.jpg"
  },
  {
    id: "dt-mri",
    name: "3T Brain & Spine MRI",
    category: "Radiology",
    description: "High-field 3 Tesla silent MRI scanner bore for neuro, spine, joints & soft tissue imaging.",
    cost: 8500,
    discountCost: 6200,
    reportTime: "4-6 hours",
    fastingRequired: "No fasting needed",
    image: "./assets/products/mri_scanner.jpg"
  },
  {
    id: "dt-ct",
    name: "128-Slice CT Scan (Chest/Abdomen)",
    category: "CT Imaging",
    description: "128-Slice high-speed CT tomography scanner machine for trauma, angiogram, chest & abdomen.",
    cost: 5000,
    discountCost: 3800,
    reportTime: "2-3 hours",
    fastingRequired: "4 hrs fasting for contrast",
    image: "./assets/products/ct_scanner.jpg"
  },
  {
    id: "dt-echo",
    name: "2D Echo + Doppler Cardiology",
    category: "Cardiac Diagnostics",
    description: "Cardiac ultrasound system cart with multi-frequency probes for heart valve & ejection fraction analysis.",
    cost: 3500,
    discountCost: 2400,
    reportTime: "Instant (1 hr)",
    fastingRequired: "No fasting needed",
    image: "./assets/products/echo_ultrasound.jpg"
  },
  {
    id: "dt-path",
    name: "Comprehensive Blood Pathology Panel",
    category: "Pathology",
    description: "CBC, Liver (LFT), Kidney (KFT), Lipid, Thyroid, HbA1c & Vitamin D/B12 lab analyzer test panel.",
    cost: 2800,
    discountCost: 1650,
    reportTime: "12-24 hours",
    fastingRequired: "10-12 hrs fasting",
    image: "./assets/products/blood_tubes.jpg"
  }
];

// ?? MEDICAL EQUIPMENT RENTALS (Pure Dealer Product Shots, Strictly NO humans) ??
export const MEDICAL_EQUIPMENT = [
  {
    id: "eq-nebulizer",
    name: "Compressor Mesh Nebulizer Machine",
    category: "Respiratory & Asthma Care",
    dealer: "Omron Healthcare Authorized Dealer",
    specs: "Heavy-duty compressor nebulizer with adult & pediatric masks, medicine cup & vapor mist tube. For asthma, bronchitis, COPD & cough relief.",
    rentalPerDay: 80,
    rentalPerMonth: 1200,
    deposit: 1000,
    deliveryTime: "Within 2 hours",
    rating: 4.9,
    image: "./assets/products/nebulizer.jpg"
  },
  {
    id: "eq-bipap",
    name: "BiPAP Machine (Auto-CPAP & Humidifier)",
    category: "Non-Invasive Ventilation",
    dealer: "ResMed Medical Solutions",
    specs: "ResMed AirCurve 10 Auto-BiPAP with heated humidifier, full face mask & climate tubing. For sleep apnea, COPD & post-extubation support.",
    rentalPerDay: 350,
    rentalPerMonth: 7500,
    deposit: 5000,
    deliveryTime: "Within 3 hours",
    rating: 4.8,
    image: "./assets/products/bipap.jpg"
  },
  {
    id: "eq-o2",
    name: "10L Medical Oxygen Concentrator",
    category: "Oxygen Therapy",
    dealer: "Philips Respironics Authorized",
    specs: "Philips EverFlo 10 Litre/min medical oxygen concentrator with continuous 93% ? 3% purity. Dual output with oxygen tubing & nasal cannula.",
    rentalPerDay: 450,
    rentalPerMonth: 9000,
    deposit: 8000,
    deliveryTime: "Within 3 hours",
    rating: 4.9,
    image: "./assets/products/oxygen_concentrator.jpg"
  },
  {
    id: "eq-icubed",
    name: "5-Function Motorized Hospital ICU Bed",
    category: "Hospital Beds",
    dealer: "Paramount Bed Dealer Hub",
    specs: "Full motorized 5-function electric bed with remote, Trendelenburg tilt, ABS side rails, high-density waterproof mattress & IV stand.",
    rentalPerDay: 800,
    rentalPerMonth: 14000,
    deposit: 15000,
    deliveryTime: "Within 5 hours",
    rating: 4.7,
    image: "./assets/products/icu_bed.jpg"
  },
  {
    id: "eq-wheelchair",
    name: "Foldable Motorized Mobility Wheelchair",
    category: "Mobility Aid",
    dealer: "Karma Mobility India",
    specs: "Lightweight foldable wheelchair with 360? joystick controller, electromagnetic brake, anti-tip rear wheels & padded seat cushion.",
    rentalPerDay: 250,
    rentalPerMonth: 4500,
    deposit: 6000,
    deliveryTime: "Same Day",
    rating: 4.6,
    image: "./assets/products/wheelchair.jpg"
  }
];

// ?? FAMILY LODGINGS near Ahmedabad Hospital Corridors ??
export const FAMILY_LODGINGS = [
  {
    id: "lodge-seva-care",
    name: "Ahmedabad Care Homestay",
    nearHospital: "Near Central Hospital Hub, Ahmedabad",
    distance: "3 min walk (210m)",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1586105251261-72a756497a11?auto=format&fit=crop&w=800&q=80",
    amenities: ["Pure Veg Tiffin", "Hot Water", "24/7 Security", "Hospital Shuttle", "Laundry"],
    types: [
      { name: "Dormitory Bed (6-sharing)", pricePerNight: 300 },
      { name: "Triple Sharing Room",       pricePerNight: 550 },
      { name: "Twin Sharing Room",         pricePerNight: 750 },
      { name: "Private AC Room",           pricePerNight: 1100 }
    ]
  },
  {
    id: "lodge-memnagar-dharamshala",
    name: "Ahmedabad Seva Dharamshala",
    nearHospital: "Opp. Multi-Specialty Hospital Zone",
    distance: "7 min walk (500m)",
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=800&q=80",
    amenities: ["Free Meals for Patients", "Temple", "Clean Bathrooms", "Parking"],
    types: [
      { name: "Free Bed (for BPL families)", pricePerNight: 0 },
      { name: "Donation-Based Room",         pricePerNight: 200 },
      { name: "Basic AC Room",               pricePerNight: 600 }
    ]
  }
];

// ?? REFERRAL PASS ??
export const INITIAL_CARE_JOURNEY = {
  journeyId: "HM-2025-0047",
  qrPassCode: "HM-0047-AHMD",
  patientName: "Patient Name",
  origin: "Your Location",
  steps: [
    { id: 1, title: "Referral Initiated",      location: "Local Clinic / ASHA Worker",            time: "10:00", status: "completed" },
    { id: 2, title: "HealthMarg Pass Issued",  location: "HealthMarg Digital Platform",           time: "10:15", status: "completed" },
    { id: 3, title: "Bed Hold Confirmed",      location: "Hospital Triage Desk, Ahmedabad",       time: "10:30", status: "active" },
    { id: 4, title: "Patient in Transit",      location: "En Route via Ambulance / Train",        time: "13:00", status: "pending" },
    { id: 5, title: "Gate Check-In",           location: "Hospital Emergency Gate, Ahmedabad",    time: "15:45", status: "pending" },
    { id: 6, title: "Ward / ICU Admission",   location: "Hospital Ward / ICU",                   time: "16:00", status: "pending" }
  ]
};
