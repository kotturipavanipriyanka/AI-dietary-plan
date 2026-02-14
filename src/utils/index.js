// Page URL creator for routing
export function createPageUrl(pageName) {
  const routes = {
    'Dashboard': '/',
    'MealPlanner': '/meal-planner',
    'NutritionTracker': '/nutrition-tracker',
    'MedicalProfile': '/medical-profile'
  };
  
  return routes[pageName] || '/';
}