export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  cookTime: string;
  isPopular?: boolean;
  isNew?: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export const categories: Category[] = [
  { id: 'all', name: 'Todo', icon: 'silverware-fork-knife' },
  { id: 'entradas', name: 'Entradas', icon: 'food-variant' },
  { id: 'platos', name: 'Platos Principales', icon: 'food' },
  { id: 'bebidas', name: 'Bebidas', icon: 'cup' },
  { id: 'postres', name: 'Postres', icon: 'cupcake' },
];

export const products: Product[] = [
  // Entradas
  {
    id: '1',
    name: 'Empanadas Colombianas',
    description: 'Deliciosas empanadas rellenas de carne o pollo con papa y hogao',
    price: 8000,
    image: '🥟',
    category: 'entradas',
    rating: 4.8,
    cookTime: '15 min',
    isPopular: true,
  },
  {
    id: '2',
    name: 'Arepas con Queso',
    description: 'Arepas artesanales con queso derretido',
    price: 6000,
    image: '🫓',
    category: 'entradas',
    rating: 4.6,
    cookTime: '10 min',
  },
  {
    id: '3',
    name: 'Patacones con Hogao',
    description: 'Patacones crujientes con hogao casero',
    price: 7000,
    image: '🍌',
    category: 'entradas',
    rating: 4.5,
    cookTime: '12 min',
  },
  
  // Platos Principales
  {
    id: '4',
    name: 'Bandeja Paisa',
    description: 'Plato típico con frijoles, arroz, chicharrón, huevo, aguacate y arepa',
    price: 28000,
    image: '🍛',
    category: 'platos',
    rating: 4.9,
    cookTime: '25 min',
    isPopular: true,
  },
  {
    id: '5',
    name: 'Sancocho de Gallina',
    description: 'Sopa tradicional con gallina criolla, papa, yuca y plátano',
    price: 25000,
    image: '🍲',
    category: 'platos',
    rating: 4.8,
    cookTime: '30 min',
  },
  {
    id: '6',
    name: 'Ajiaco Santafereño',
    description: 'Sopa cremosa con tres tipos de papa, pollo y mazorca',
    price: 23000,
    image: '🥘',
    category: 'platos',
    rating: 4.7,
    cookTime: '30 min',
    isNew: true,
  },
  {
    id: '7',
    name: 'Lechona Tolimense',
    description: 'Cerdo relleno con arroz, arveja y especias al estilo tolimense',
    price: 22000,
    image: '🐷',
    category: 'platos',
    rating: 4.9,
    cookTime: '20 min',
    isPopular: true,
  },
  {
    id: '8',
    name: 'Tamal Tolimense',
    description: 'Tamal envuelto en hoja de plátano con carne, pollo y cerdo',
    price: 18000,
    image: '🫔',
    category: 'platos',
    rating: 4.6,
    cookTime: '15 min',
  },
  {
    id: '9',
    name: 'Mojarra Frita',
    description: 'Mojarra frita completa con arroz de coco, patacón y ensalada',
    price: 26000,
    image: '🐟',
    category: 'platos',
    rating: 4.7,
    cookTime: '25 min',
  },
  
  // Bebidas
  {
    id: '10',
    name: 'Limonada Natural',
    description: 'Limonada fresca con hielo y menta',
    price: 5000,
    image: '🍋',
    category: 'bebidas',
    rating: 4.5,
    cookTime: '5 min',
  },
  {
    id: '11',
    name: 'Jugo de Lulo',
    description: 'Jugo natural de lulo colombiano',
    price: 6000,
    image: '🍊',
    category: 'bebidas',
    rating: 4.7,
    cookTime: '5 min',
    isNew: true,
  },
  {
    id: '12',
    name: 'Agua de Panela con Limón',
    description: 'Bebida tradicional de panela con limón',
    price: 4000,
    image: '☕',
    category: 'bebidas',
    rating: 4.4,
    cookTime: '5 min',
  },
  {
    id: '13',
    name: 'Mazamorra con Panela',
    description: 'Bebida caliente de maíz con panela',
    price: 5500,
    image: '🥤',
    category: 'bebidas',
    rating: 4.6,
    cookTime: '5 min',
  },
  
  // Postres
  {
    id: '14',
    name: 'Obleas con Arequipe',
    description: 'Obleas crujientes con arequipe y queso',
    price: 7000,
    image: '🥞',
    category: 'postres',
    rating: 4.8,
    cookTime: '5 min',
    isPopular: true,
  },
  {
    id: '15',
    name: 'Postre de Natas',
    description: 'Postre tradicional de natas con dulce de brevas',
    price: 8000,
    image: '🍮',
    category: 'postres',
    rating: 4.7,
    cookTime: '5 min',
  },
  {
    id: '16',
    name: 'Arroz con Leche',
    description: 'Cremoso arroz con leche y canela',
    price: 6500,
    image: '🍚',
    category: 'postres',
    rating: 4.6,
    cookTime: '5 min',
  },
  {
    id: '17',
    name: 'Brevas con Arequipe',
    description: 'Brevas dulces bañadas en arequipe',
    price: 7500,
    image: '🍑',
    category: 'postres',
    rating: 4.5,
    cookTime: '5 min',
  },
];