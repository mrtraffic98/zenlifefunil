export interface UserData {
  // Personal info
  name: string;
  ageRange: string;
  
  // Body metrics
  height: number;
  currentWeight: number;
  targetWeight: number;
  bodyType: string;
  goalBodyType: string;
  
  // Goals and experience
  knowsPilates: boolean | null;
  mainGoals: string[];
  targetAreas: string[];
  
  // Weight history
  weightDifficulty: string;
  lastSatisfied: string;
  lifeEvents: string[];
  
  // Physical condition
  physicalPains: string[];
  activityLevel: string;
  dailyRoutine: string;
  dailyWalking: string;
  stairsBreathing: string;
  flexibility: string;
  
  // Lifestyle
  sleepHours: string;
  energyLevel: string;
  hydration: string;
  healthyEating: string;
  afterEatingFeeling: string;
  badHabits: string[];
  foodHabits: string[];
  workoutTime: string;
  workoutDays: string;
}

export const initialUserData: UserData = {
  name: '',
  ageRange: '',
  height: 165,
  currentWeight: 70,
  targetWeight: 60,
  bodyType: '',
  goalBodyType: '',
  knowsPilates: null,
  mainGoals: [],
  targetAreas: [],
  weightDifficulty: '',
  lastSatisfied: '',
  lifeEvents: [],
  physicalPains: [],
  activityLevel: '',
  dailyRoutine: '',
  dailyWalking: '',
  stairsBreathing: '',
  flexibility: '',
  sleepHours: '',
  energyLevel: '',
  hydration: '',
  healthyEating: '',
  afterEatingFeeling: '',
  badHabits: [],
  foodHabits: [],
  workoutTime: '',
  workoutDays: '',
};

export const calculateBMI = (weight: number, heightCm: number): number => {
  const heightM = heightCm / 100;
  return Math.round((weight / (heightM * heightM)) * 10) / 10;
};

export const getBMICategory = (bmi: number): string => {
  if (bmi < 18.5) return 'Bajo peso';
  if (bmi < 25) return 'Normal';
  if (bmi < 30) return 'Sobrepeso';
  return 'Obesidad';
};

export const getMetabolismType = (data: UserData): string => {
  if (data.weightDifficulty === 'hard-lose') return 'Lento';
  if (data.weightDifficulty === 'easy-both') return 'Mixto';
  if (data.weightDifficulty === 'hard-gain') return 'Rápido';
  return 'Normal';
};
