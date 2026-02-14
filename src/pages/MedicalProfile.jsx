import React, { useState } from 'react';
import Layout from '../Layout';
import { 
  User,
  Heart,
  Pill,
  AlertCircle,
  Save,
  CheckCircle,
  Apple,
  Scale,
  Ruler
} from "lucide-react";

export default function MedicalProfile() {
  const [conditions, setConditions] = useState([]);
  const [allergies, setAllergies] = useState([]);
  const [allergyInput, setAllergyInput] = useState('');

  const conditionsList = [
    'Diabetes Type 1',
    'Diabetes Type 2',
    'Hypertension',
    'High Cholesterol',
    'Celiac Disease',
    'Kidney Disease',
    'Heart Disease',
    'Obesity'
  ];

  const toggleCondition = (condition) => {
    setConditions(prev => 
      prev.includes(condition) 
        ? prev.filter(c => c !== condition)
        : [...prev, condition]
    );
  };

  const addAllergy = () => {
    if (allergyInput.trim() && !allergies.includes(allergyInput.trim())) {
      setAllergies([...allergies, allergyInput.trim()]);
      setAllergyInput('');
    }
  };

  const removeAllergy = (allergy) => {
    setAllergies(allergies.filter(a => a !== allergy));
  };

  return (
    <Layout currentPageName="MedicalProfile">
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30 p-6">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Medical Profile</h1>
            <p className="text-slate-600 mt-1">
              Manage your health information for personalized meal recommendations
            </p>
          </div>

          {/* Profile Form */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 divide-y divide-slate-100">
            
            {/* Basic Info */}
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-emerald-100">
                  <User className="w-5 h-5 text-emerald-600" />
                </div>
                <h2 className="text-lg font-semibold text-slate-900">Basic Information</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Age</label>
                  <input
                    type="number"
                    placeholder="Enter your age"
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Weight (kg)</label>
                  <div className="relative">
                    <input
                      type="number"
                      placeholder="70"
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                    <Scale className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Height (cm)</label>
                  <div className="relative">
                    <input
                      type="number"
                      placeholder="175"
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                    <Ruler className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Daily Calorie Target</label>
                  <input
                    type="number"
                    placeholder="2000"
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>
            </div>

            {/* Medical Conditions */}
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-red-100">
                  <Heart className="w-5 h-5 text-red-600" />
                </div>
                <h2 className="text-lg font-semibold text-slate-900">Medical Conditions</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {conditionsList.map((condition) => (
                  <label 
                    key={condition}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 cursor-pointer border border-slate-200 transition-colors"
                  >
                    <input 
                      type="checkbox" 
                      checked={conditions.includes(condition)}
                      onChange={() => toggleCondition(condition)}
                      className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500" 
                    />
                    <span className="text-slate-700">{condition}</span>
                  </label>
                ))}
              </div>

              {conditions.length > 0 && (
                <div className="mt-4 p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                  <p className="text-sm font-medium text-emerald-900">Selected Conditions:</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {conditions.map(condition => (
                      <span key={condition} className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm">
                        {condition}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Dietary Preferences */}
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-emerald-100">
                  <Apple className="w-5 h-5 text-emerald-600" />
                </div>
                <h2 className="text-lg font-semibold text-slate-900">Dietary Preferences</h2>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {['Vegetarian', 'Vegan', 'Gluten Free', 'Dairy Free', 'Low Sodium', 'Keto'].map((pref) => (
                  <label 
                    key={pref}
                    className="flex items-center gap-2 p-3 rounded-lg hover:bg-slate-50 cursor-pointer border border-slate-200"
                  >
                    <input type="checkbox" className="w-4 h-4 text-emerald-600 rounded" />
                    <span className="text-sm text-slate-700">{pref}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Allergies */}
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-amber-100">
                  <AlertCircle className="w-5 h-5 text-amber-600" />
                </div>
                <h2 className="text-lg font-semibold text-slate-900">Food Allergies</h2>
              </div>
              
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={allergyInput}
                  onChange={(e) => setAllergyInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addAllergy()}
                  placeholder="e.g., Peanuts, Shellfish..."
                  className="flex-1 px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <button 
                  onClick={addAllergy}
                  className="px-6 py-2 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  Add
                </button>
              </div>
              
              {allergies.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {allergies.map((allergy) => (
                    <span 
                      key={allergy}
                      className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-sm border border-amber-200"
                    >
                      {allergy}
                      <button
                        onClick={() => removeAllergy(allergy)}
                        className="hover:text-amber-900"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Medications */}
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-blue-100">
                  <Pill className="w-5 h-5 text-blue-600" />
                </div>
                <h2 className="text-lg font-semibold text-slate-900">Current Medications</h2>
              </div>
              
              <textarea
                placeholder="List your current medications..."
                rows={4}
                className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

          </div>

          {/* Save Button */}
          <div className="flex items-center justify-end gap-4">
            <button className="px-6 py-3 text-slate-600 hover:text-slate-900 font-medium transition-colors">
              Cancel
            </button>
            <button className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg shadow-lg shadow-emerald-200 transition-colors">
              <Save className="w-4 h-4" />
              Save Profile
            </button>
          </div>

          {/* Info Card */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <p className="font-semibold text-blue-900 mb-1">Coming Soon</p>
                <p className="text-sm text-blue-700">
                  Profile saving functionality with secure data storage and personalized meal plan generation based on your health profile.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </Layout>
  );
}