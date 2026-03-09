import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Dashboard from "./pages/Dashboard.jsx";
import MealPlanner from "./pages/MealPlanner.jsx";
import NutritionTracker from "./pages/NutritionTracker.jsx";
import MedicalProfile from "./pages/MedicalProfile.jsx";
import { ProfileProvider } from "./lib/ProfileContext.jsx";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ProfileProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/meal-planner" element={<MealPlanner />} />
            <Route path="/nutrition-tracker" element={<NutritionTracker />} />
            <Route path="/medical-profile" element={<MedicalProfile />} />
          </Routes>
        </Router>
      </ProfileProvider>
    </QueryClientProvider>
  );
}

export default App;