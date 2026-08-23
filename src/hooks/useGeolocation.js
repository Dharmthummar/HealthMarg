import { useState, useEffect } from 'react';

// Exact GPS coordinates of Sterling Hospitals, Memnagar, Ahmedabad-380052
export const STERLING_COORDS = { lat: 23.0588, lng: 72.5520 };

function haversineKm(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

async function reverseGeocode(lat, lng) {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`,
      { headers: { 'Accept-Language': 'en' } }
    );
    const data = await res.json();
    const addr = data?.address || {};
    return addr.city || addr.town || addr.village || addr.county || addr.state || `${lat.toFixed(2)}N, ${lng.toFixed(2)}E`;
  } catch {
    return `${lat.toFixed(2)}N, ${lng.toFixed(2)}E`;
  }
}

export default function useGeolocation() {
  const [state, setState] = useState({
    lat: null, lng: null, city: null, distanceKm: null,
    loading: true, error: null, permissionDenied: false,
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      setState(s => ({ ...s, loading: false, error: 'Geolocation not supported.' }));
      return;
    }
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude: lat, longitude: lng } = position.coords;
        const distanceKm = haversineKm(lat, lng, STERLING_COORDS.lat, STERLING_COORDS.lng);
        const city = await reverseGeocode(lat, lng);
        setState({ lat, lng, city, distanceKm: Math.round(distanceKm), loading: false, error: null, permissionDenied: false });
      },
      (err) => {
        setState(s => ({
          ...s, loading: false,
          error: err.code === 1 ? 'Location access denied. Please enable in browser.' : 'Unable to detect location.',
          permissionDenied: err.code === 1,
        }));
      },
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 300000 }
    );
  }, []);

  return state;
}
