import React, { createContext, useContext, useEffect, useState } from 'react';

const PROFILE_STORAGE_KEY = 'nutricare_profile_v1';

const defaultProfile = {
  age: '',
  weight: '',
  height: '',
  calorieTarget: '',
  conditions: [],
  preferences: [],
  allergies: [],
  medications: ''
};

const ProfileContext = createContext({
  profile: defaultProfile,
  setProfile: () => {},
  updateProfile: () => {}
});

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(defaultProfile);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(PROFILE_STORAGE_KEY);
      if (stored) {
        setProfile(JSON.parse(stored));
      }
    } catch (e) {
      console.warn('Failed to load profile from localStorage', e);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
    } catch (e) {
      console.warn('Failed to save profile to localStorage', e);
    }
  }, [profile]);

  const updateProfile = (update) => {
    setProfile((prev) => ({ ...prev, ...update }));
  };

  return (
    <ProfileContext.Provider value={{ profile, setProfile, updateProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const ctx = useContext(ProfileContext);
  if (!ctx) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return ctx;
};
