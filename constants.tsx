
import { Translation, Language } from './types';

export const TRANSLATIONS: Record<Language, Translation> = {
  en: {
    heroTitle: "Groovie AI Planner",
    heroSub: "Retro vibes meet futuristic planning. Level up your life with personalized AI growth routines.",
    ctaButton: "Start Your Journey",
    learnMore: "Learn More",
    formTitle: "Design Your Future",
    nameLabel: "What's your name?",
    ageLabel: "How old are you?",
    goalLabel: "What is your main goal right now?",
    focusLabel: "Primary Focus Area",
    currentHabitsLabel: "List some current habits (good or bad)",
    targetHabitsLabel: "What habits do you want to build?",
    commitmentLabel: "How much time can you commit daily?",
    generateButton: "Generate Groovie Plan",
    loading: "Synthesizing your grooviest life plan...",
    planTitle: "Your Personalized Growth Path",
    routineTitle: "The Groovie Routine",
    habitsTitle: "Habit Stack",
    milestonesTitle: "Upcoming Milestones",
    morning: "Morning Energy",
    afternoon: "Mid-Day Flow",
    evening: "Evening Zen",
  },
  bg: {
    heroTitle: "Groovie AI Планировчик",
    heroSub: "Ретро стил срещу футуристично планиране. Подобрете живота си с персонализирани AI рутини за растеж.",
    ctaButton: "Започнете своето пътуване",
    learnMore: "Научи повече",
    formTitle: "Планирайте своето бъдеще",
    nameLabel: "Как се казвате?",
    ageLabel: "На колко години сте?",
    goalLabel: "Каква е основната ви цел в момента?",
    focusLabel: "Основна сфера на фокус",
    currentHabitsLabel: "Избройте текущи навици (добри или лоши)",
    targetHabitsLabel: "Какви навици искате да изградите?",
    commitmentLabel: "Колко време можете да отделяте дневно?",
    generateButton: "Генерирай Groovie План",
    loading: "Синтезиране на вашия най-добър план...",
    planTitle: "Вашият персонализиран път към растеж",
    routineTitle: "Groovie Рутината",
    habitsTitle: "Навици за изграждане",
    milestonesTitle: "Предстоящи етапи",
    morning: "Утринна Енергия",
    afternoon: "Дневен Поток",
    evening: "Вечерен Дзен",
  }
};

export const FOCUS_AREAS = [
  'Health', 'Career', 'Relationships', 'Learning', 'Mindfulness'
];

export const COMMITMENT_LEVELS = [
  { value: 'low', label: { en: '30 mins (Quick)', bg: '30 мин (Бързо)' } },
  { value: 'medium', label: { en: '1-2 hours (Steady)', bg: '1-2 часа (Стабилно)' } },
  { value: 'high', label: { en: '3+ hours (Hardcore)', bg: '3+ часа (Усилено)' } }
];
