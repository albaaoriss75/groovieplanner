
export type Language = 'en' | 'bg';

export interface UserPreferences {
  name: string;
  age: string;
  primaryGoal: string;
  focusArea: 'Health' | 'Career' | 'Relationships' | 'Learning' | 'Mindfulness';
  currentHabits: string;
  targetHabits: string;
  timeCommitment: 'low' | 'medium' | 'high';
}

export interface PlanOutput {
  title: string;
  summary: string;
  dailyRoutine: {
    morning: string[];
    afternoon: string[];
    evening: string[];
  };
  habits: string[];
  milestones: string[];
  quote: string;
}

export interface Translation {
  heroTitle: string;
  heroSub: string;
  ctaButton: string;
  learnMore: string;
  formTitle: string;
  nameLabel: string;
  ageLabel: string;
  goalLabel: string;
  focusLabel: string;
  currentHabitsLabel: string;
  targetHabitsLabel: string;
  commitmentLabel: string;
  generateButton: string;
  loading: string;
  planTitle: string;
  routineTitle: string;
  habitsTitle: string;
  milestonesTitle: string;
  morning: string;
  afternoon: string;
  evening: string;
}
