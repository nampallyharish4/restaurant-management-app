import { MenuItem } from '../types/Menu';

export const menuData: MenuItem[] = [
  // Veg Starters
  {
    id: 101,
    name: 'Crispy Corn',
    category: 'Veg Starters',
    fullPrice: 150,
    image:
      'https://res.cloudinary.com/dy4isewfc/image/upload/v1753091192/Kaveri/Veg%20Starters/432be9f374ad1d1efcd5f3bccd3aa0c1_rnrxx3.webp',
    description: 'Crispy fried corn tossed with spices.',
    isVeg: true,
  },
  {
    id: 102,
    name: 'Paneer 65',
    category: 'Veg Starters',
    fullPrice: 180,
    image:
      'https://res.cloudinary.com/dy4isewfc/image/upload/v1753092381/Kaveri/Veg%20Starters/paneer-tikka-is-indian-dish-made-from-chunks-cottage-cheese-marinated-spices-grilled-tandoor_466689-76784_dhvdfp.jpg',
    description: 'Spicy fried paneer cubes.',
    isVeg: true,
  },
  // Non-Veg Starters
  {
    id: 201,
    name: 'Chicken Lollipop',
    category: 'Non-Veg Starters',
    fullPrice: 220,
    image:
      'https://res.cloudinary.com/dy4isewfc/image/upload/v1753210483/Kaveri/Tandoori%20Non%20Veg/62a95eaacb8d206406f1d296_Chicken_20Lollipop_20Hero_204.3_ocpha1.jpg',
    description: 'Fried chicken wings in spicy sauce.',
    isVeg: false,
  },
  {
    id: 202,
    name: 'Fish Fingers',
    category: 'Non-Veg Starters',
    fullPrice: 240,
    image:
      'https://res.cloudinary.com/dy4isewfc/image/upload/v1753092977/Kaveri/Non%20Veg%20Starter/almostawake21_in_the_black_pan_glossy_saucy_consistency_curry_e01015af-7dec-4f3a-b88e-851fe9c53d58_0-768x768_si4ftl.webp',
    description: 'Crispy fried fish sticks.',
    isVeg: false,
  },
  // Indian Veg Curries
  {
    id: 301,
    name: 'Dal Makhani',
    category: 'Indian Veg Curries',
    fullPrice: 180,
    image:
      'https://res.cloudinary.com/dy4isewfc/image/upload/v1753172676/Kaveri/Indian%20Veg%20Curries/Masoor-Ki-Khatti-Dal-2-1-768x1152_nuzipd.jpg',
    description: 'Creamy black lentil curry.',
    isVeg: true,
  },
  {
    id: 302,
    name: 'Aloo Gobi',
    category: 'Indian Veg Curries',
    fullPrice: 160,
    image:
      'https://res.cloudinary.com/dy4isewfc/image/upload/v1753173351/Kaveri/Indian%20Veg%20Curries/capsicum-masala-1_drtjax.jpg',
    description: 'Potato and cauliflower curry.',
    isVeg: true,
  },
  // Indian Non-Veg Curries
  {
    id: 401,
    name: 'Egg Curry',
    category: 'Indian Non-Veg Curries',
    fullPrice: 170,
    image:
      'https://res.cloudinary.com/dy4isewfc/image/upload/v1753208562/Kaveri/indian%20Non%20veg%20Curries/Egg-Bhurji-750x750_hbgacu.jpg',
    description: 'Boiled eggs in spicy gravy.',
    isVeg: false,
  },
  {
    id: 402,
    name: 'Mutton Rogan Josh',
    category: 'Indian Non-Veg Curries',
    fullPrice: 320,
    image:
      'https://res.cloudinary.com/dy4isewfc/image/upload/v1753208532/Kaveri/indian%20Non%20veg%20Curries/shutterstock_2205168763_fy32yh.jpg',
    description: 'Rich mutton curry.',
    isVeg: false,
  },
  // Tandoori Rotis
  {
    id: 501,
    name: 'Tandoori Roti',
    category: 'Tandoori Rotis',
    fullPrice: 30,
    image:
      'https://res.cloudinary.com/dy4isewfc/image/upload/v1753209211/Kaveri/indian%20Non%20veg%20Curries/9ba060b2-plain-naan-bombay-scaled_gyet2v.jpg',
    description: 'Whole wheat flatbread.',
    isVeg: true,
  },
  {
    id: 502,
    name: 'Butter Naan',
    category: 'Tandoori Rotis',
    fullPrice: 40,
    image:
      'https://res.cloudinary.com/dy4isewfc/image/upload/v1753209520/Kaveri/indian%20Non%20veg%20Curries/OIP_ai8azj.webp',
    description: 'Soft naan with butter.',
    isVeg: true,
  },
  // Tandoori Non-Veg
  {
    id: 601,
    name: 'Tandoori Chicken',
    category: 'Tandoori Non-Veg',
    fullPrice: 320,
    image:
      'https://res.cloudinary.com/dy4isewfc/image/upload/v1753209964/Kaveri/Tandoori%20Non%20Veg/Tandoori-chicken-recipe_palates-desire_l60nvl.jpg',
    description: 'Chicken marinated and roasted in tandoor.',
    isVeg: false,
  },
  {
    id: 602,
    name: 'Tangdi Kabab',
    category: 'Tandoori Non-Veg',
    fullPrice: 260,
    image:
      'https://res.cloudinary.com/dy4isewfc/image/upload/v1753210272/Kaveri/Tandoori%20Non%20Veg/tangri-kabab_c3ooyf.jpg',
    description: 'Grilled chicken drumsticks.',
    isVeg: false,
  },
  // Veg Biryanis
  {
    id: 701,
    name: 'Veg Dum Biryani',
    category: 'Veg Biryanis',
    fullPrice: 180,
    image:
      'https://res.cloudinary.com/dy4isewfc/image/upload/v1753210817/Kaveri/Veg%20Biryanis/maxresdefault_zrbrrh.jpg',
    description: 'Aromatic rice with vegetables.',
    isVeg: true,
  },
  {
    id: 702,
    name: 'Paneer Biryani',
    category: 'Veg Biryanis',
    fullPrice: 220,
    image:
      'https://res.cloudinary.com/dy4isewfc/image/upload/v1753210872/Kaveri/Veg%20Biryanis/paneer-tikka-masala-biryani_1170794-58098_d3ese6.jpg',
    description: 'Biryani with paneer cubes.',
    isVeg: true,
  },
  // Non-Veg Biryanis
  {
    id: 801,
    name: 'Chicken Dum Biryani',
    category: 'Non-Veg Biryanis',
    fullPrice: 260,
    image:
      'https://res.cloudinary.com/dy4isewfc/image/upload/v1753251829/Kaveri/Non%20Veg%20Biryanis/pngtree-top-view-of-chicken-biryani-indian-food-delicious-ramadan-iftar-meal-image_15585911_osejhh.png',
    description: 'Classic chicken biryani.',
    isVeg: false,
  },
  {
    id: 802,
    name: 'Egg Biryani',
    category: 'Non-Veg Biryanis',
    fullPrice: 210,
    image:
      'https://res.cloudinary.com/dy4isewfc/image/upload/v1753252845/Kaveri/Non%20Veg%20Biryanis/OIP_zlirtk.webp',
    description: 'Biryani with boiled eggs.',
    isVeg: false,
  },
  // Chinese Food
  {
    id: 901,
    name: 'Veg Fried Rice',
    category: 'Chinese Food',
    fullPrice: 160,
    image:
      'https://res.cloudinary.com/dy4isewfc/image/upload/v1753255249/Kaveri/Chinese%20Foods/5c54d05cca6ab7802eab031c_fried-rice-website-thumbnail-_ddbiaa_cbgd3x.png',
    description: 'Fried rice with vegetables.',
    isVeg: true,
  },
  {
    id: 902,
    name: 'Chicken Manchurian',
    category: 'Chinese Food',
    fullPrice: 200,
    image:
      'https://res.cloudinary.com/dy4isewfc/image/upload/v1753092977/Kaveri/Non%20Veg%20Starter/almostawake21_in_the_black_pan_glossy_saucy_consistency_curry_e01015af-7dec-4f3a-b88e-851fe9c53d58_0-768x768_si4ftl.webp',
    description: 'Chicken balls in Manchurian sauce.',
    isVeg: false,
  },
];
