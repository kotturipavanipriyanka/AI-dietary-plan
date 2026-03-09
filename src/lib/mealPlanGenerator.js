/**
 * Generates a meal plan based on a user profile.
 * This function is intentionally deterministic and lightweight; it is meant to
 * show how medical conditions and preferences can influence meal recommendations.
 */

const BASE_MEALS = [
  {
    id: 'chia-pudding',
    type: 'Breakfast',
    name: 'Chia Seed Pudding with Almond Milk',
    icon: '🥣',
    time: '15 min',
    calories: 350,
    protein: 12,
    carbs: 50,
    fat: 15,
    tags: ['low-glycemic', 'high-fiber', 'dairy-free', 'vegan'],
    ingredients: ['chia seeds', 'almond milk', 'berries', 'vanilla'],
    description:
      'A creamy, satisfying pudding made with nutrient-rich chia seeds and unsweetened almond milk, topped with sliced berries.'
  },
  {
    id: 'quinoa-salad',
    type: 'Lunch',
    name: 'Quinoa Spinach Salad',
    icon: '🥗',
    time: '20 min',
    calories: 420,
    protein: 18,
    carbs: 45,
    fat: 18,
    tags: ['low-glycemic', 'high-fiber', 'vegetarian', 'gluten-free'],
    ingredients: ['quinoa', 'spinach', 'cucumber', 'tomato', 'tahini'],
    description:
      'A refreshing salad packed with protein-rich quinoa, fresh spinach, and crunchy vegetables, dressed in a lemon-tahini vinaigrette.'
  },
  {
    id: 'tofu-stirfry',
    type: 'Dinner',
    name: 'Stir-Fried Tofu and Vegetables',
    icon: '🥦',
    time: '30 min',
    calories: 500,
    protein: 28,
    carbs: 40,
    fat: 22,
    tags: ['dairy-free', 'vegan', 'low-sodium'],
    ingredients: ['tofu', 'broccoli', 'bell pepper', 'soy sauce', 'ginger'],
    description:
      'A quick and colorful stir-fry with tofu and a mix of fresh vegetables served over brown rice.'
  },
  {
    id: 'hummus-snack',
    type: 'Snack',
    name: 'Hummus & Veggie Sticks',
    icon: '🥕',
    time: '10 min',
    calories: 200,
    protein: 8,
    carbs: 20,
    fat: 12,
    tags: ['vegetarian', 'gluten-free', 'dairy-free'],
    ingredients: ['chickpeas', 'tahini', 'carrot', 'cucumber'],
    description:
      'A healthy snack featuring creamy hummus paired with crunchy veggie sticks.'
  },
  {
    id: 'salmon-bowl',
    type: 'Dinner',
    name: 'Baked Salmon Bowl with Roasted Veggies',
    icon: '🐟',
    time: '35 min',
    calories: 520,
    protein: 38,
    carbs: 35,
    fat: 25,
    tags: ['low-glycemic', 'high-protein', 'low-sodium'],
    ingredients: ['salmon', 'broccoli', 'sweet potato', 'lemon'],
    description:
      'A balanced dinner bowl featuring baked salmon with roasted vegetables and quinoa.'
  },
  {
    id: 'turkey-wrap',
    type: 'Lunch',
    name: 'Turkey & Avocado Wrap',
    icon: '🌯',
    time: '15 min',
    calories: 430,
    protein: 30,
    carbs: 35,
    fat: 18,
    tags: ['high-protein', 'low-glycemic'],
    ingredients: ['turkey', 'avocado', 'lettuce', 'whole wheat tortilla'],
    description:
      'A satisfying wrap filled with lean turkey, creamy avocado, and fresh greens.'
  },
  {
    id: 'oatmeal',
    type: 'Breakfast',
    name: 'Oatmeal with Berries and Nuts',
    icon: '🥣',
    time: '10 min',
    calories: 360,
    protein: 12,
    carbs: 55,
    fat: 12,
    tags: ['high-fiber', 'low-glycemic'],
    ingredients: ['oats', 'berries', 'walnuts', 'almond milk'],
    description:
      'A warm bowl of oatmeal topped with berries and nuts for extra fiber and healthy fats.'
  },
  {
    id: 'protein-smoothie',
    type: 'Snack',
    name: 'Green Protein Smoothie',
    icon: '🥤',
    time: '5 min',
    calories: 210,
    protein: 15,
    carbs: 18,
    fat: 9,
    tags: ['high-protein', 'low-glycemic', 'dairy-free'],
    ingredients: ['spinach', 'banana', 'protein powder', 'almond milk'],
    description:
      'A nutrient-packed smoothie with greens, protein powder, and almond milk to keep you energized.'
  }
];

const CONDITION_TAG_MAP = {
  'Diabetes Type 1': ['low-glycemic', 'high-fiber'],
  'Diabetes Type 2': ['low-glycemic', 'high-fiber'],
  'Hypertension': ['low-sodium'],
  'High Cholesterol': ['low-sodium'],
  'Celiac Disease': ['gluten-free'],
  'Kidney Disease': ['low-sodium'],
  'Heart Disease': ['low-sodium'],
  'Lactose Intolerant': ['dairy-free'],
  'Obesity': ['low-glycemic', 'high-fiber']
};

const PREFERENCE_TAG_MAP = {
  Vegetarian: ['vegetarian'],
  Vegan: ['vegan'],
  'Gluten Free': ['gluten-free'],
  'Dairy Free': ['dairy-free'],
  'Low Sodium': ['low-sodium'],
  Keto: ['low-carb']
};

export function generateMealPlan(profile) {
  const {
    conditions = [],
    preferences = [],
    allergies = [],
    calorieTarget: profileCalorieTarget
  } = profile || {};

  const calorieTarget = Number(profileCalorieTarget) || 2000;

  // Determine required tags based on conditions and preferences.
  const requiredTags = new Set();

  conditions.forEach((condition) => {
    const tags = CONDITION_TAG_MAP[condition] || [];
    tags.forEach((t) => requiredTags.add(t));
  });

  preferences.forEach((preference) => {
    const tags = PREFERENCE_TAG_MAP[preference] || [];
    tags.forEach((t) => requiredTags.add(t));
  });

  const allergyLower = allergies.map((a) => a.toLowerCase());
  const avoidsAllergens = (meal) => {
    if (!meal.ingredients) return false;
    return meal.ingredients.some((ingredient) =>
      allergyLower.some((allergy) => ingredient.toLowerCase().includes(allergy))
    );
  };

  const matchesTags = (meal) => {
    if (requiredTags.size === 0) return true;
    return Array.from(requiredTags).every((tag) => meal.tags.includes(tag));
  };

  // Pick one meal for each slot (Breakfast/Lunch/Dinner/Snack) based on available meals.
  const slots = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];

  const mealsBySlot = slots.map((slot) => {
    const candidates = BASE_MEALS.filter(
      (meal) =>
        meal.type === slot &&
        !avoidsAllergens(meal) &&
        matchesTags(meal)
    );

    if (candidates.length) {
      // Choose meal closest to the target calories for this slot.
      const slotTarget = getCaloriesForSlot(slot, calorieTarget);
      return chooseClosestMealByCalories(candidates, slotTarget);
    }

    // If no match, fallback to any meal for that slot (excluding allergens)
    const fallback = BASE_MEALS.filter(
      (meal) => meal.type === slot && !avoidsAllergens(meal)
    );
    return fallback[0] || null;
  }).filter(Boolean);

  const totals = mealsBySlot.reduce(
    (acc, meal) => {
      acc.calories += meal.calories;
      acc.protein += meal.protein;
      acc.carbs += meal.carbs;
      acc.fat += meal.fat;
      return acc;
    },
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );

  const insightLines = [];
  insightLines.push(`Daily target: ${calorieTarget} kcal.`);

  if (conditions.includes('Diabetes Type 1') || conditions.includes('Diabetes Type 2')) {
    insightLines.push('This plan focuses on low-glycemic ingredients and consistent carbohydrate portions.');
  }
  if (conditions.includes('Lactose Intolerant')) {
    insightLines.push('Dairy has been avoided to support lactose intolerance.');
  }
  if (preferences.includes('Vegan')) {
    insightLines.push('Meals are tailored to your vegan preferences.');
  }
  if (preferences.includes('Gluten Free')) {
    insightLines.push('Gluten has been avoided to match your dietary preference.');
  }

  return {
    meals: mealsBySlot,
    totals,
    insight: insightLines.join(' ')
  };
}

function getCaloriesForSlot(slot, dailyTarget) {
  // Approximate distribution: Breakfast 25%, Lunch 30%, Dinner 30%, Snack 15%
  const distribution = {
    Breakfast: 0.25,
    Lunch: 0.3,
    Dinner: 0.3,
    Snack: 0.15
  };
  const ratio = distribution[slot] || 0.25;
  return Math.round(dailyTarget * ratio);
}

function chooseClosestMealByCalories(meals, targetCalories) {
  return meals.reduce((best, meal) => {
    if (!best) return meal;
    const currentDiff = Math.abs(meal.calories - targetCalories);
    const bestDiff = Math.abs(best.calories - targetCalories);
    return currentDiff < bestDiff ? meal : best;
  }, null);
}
