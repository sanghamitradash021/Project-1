export const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dmenponou/image/upload';
export const CLOUDINARY_UPLOAD_PRESET = 'image_upload';

export const DEFAULT_FORM_DATA = {
    title: '',
    description: '',
    ingredients: '',
    instructions: '',
    preparationTime: '',
    difficulty: 'medium',
    mealType: 'lunch',
    cuisine: 'indian',
    image: null as File | null,
};

export const DIFFICULTY_OPTIONS = [
    { value: 'easy', label: 'Easy' },
    { value: 'medium', label: 'Medium' },
    { value: 'hard', label: 'Hard' },
];

export const MEAL_TYPE_OPTIONS = [
    { value: 'breakfast', label: 'Breakfast' },
    { value: 'lunch', label: 'Lunch' },
    { value: 'dinner', label: 'Dinner' },
    { value: 'snack', label: 'Snack' },
    { value: 'dessert', label: 'Dessert' },
];

export const CUISINE_OPTIONS = [
    { value: 'indian', label: 'Indian' },
    { value: 'italian', label: 'Italian' },
    { value: 'chinese', label: 'Chinese' },
    { value: 'mexican', label: 'Mexican' },
    { value: 'japanese', label: 'Japanese' },
    { value: 'thai', label: 'Thai' },
    { value: 'american', label: 'American' },
    { value: 'anglo-indian', label: 'Anglo-Indian' },
];

export const API_ENDPOINTS = {
    CREATE_RECIPE: 'http://localhost:3000/api/recipes/create',
};
