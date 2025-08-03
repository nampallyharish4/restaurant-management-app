
export interface MenuItem {
  id: number;
  name: string;
  category: string;
  halfPrice?: number;
  fullPrice: number;
  image: string;
  description: string;
  isVeg: boolean;
}

export const menuCategories = [
  'Veg Starters',
  'Non-Veg Starters',
  'Indian Veg Curries',
  'Indian Non-Veg Curries',
  'Tandoori Rotis',
  'Tandoori Non-Veg',
  'Veg Biryanis',
  'Non-Veg Biryanis',
  'Chinese Food',
];

export const menuData: MenuItem[] = [
  // Veg Starters
  {
    id: 1,
    name: 'Veg Manchuria',
    category: 'Veg Starters',
    fullPrice: 160,
    image:
      'https://res.cloudinary.com/dy4isewfc/image/upload/v1753091192/Kaveri/Veg%20Starters/432be9f374ad1d1efcd5f3bccd3aa0c1_rnrxx3.webp',
    description: '',
    isVeg: true,
  },
  {
    id: 2,
    name: 'Gobi Manchuria',
    category: 'Veg Starters',
    fullPrice: 180,
    image:
      'https://res.cloudinary.com/dy4isewfc/image/upload/v1753091335/Kaveri/Veg%20Starters/gobi-manchurian-is-a-crispy-fried-cauliflower-made-with-chiles-garlic-and-ginger-sauce_lt3oz4.webp',
    description: '',
    isVeg: true,
  },
  {
    id: 3,
    name: 'Paneer Manchuria',
    category: 'Veg Starters',
    fullPrice: 200,
    image:
      'https://res.cloudinary.com/dy4isewfc/image/upload/v1753091738/Kaveri/Veg%20Starters/Gobi-Manchurian-678x381_lupbzv.jpg',
    description: '',
    isVeg: true,
  },
  {
    id: 4,
    name: 'Paneer Sticks',
    category: 'Veg Starters',
    fullPrice: 220,
    image:
      'https://res.cloudinary.com/dy4isewfc/image/upload/v1753091888/Kaveri/Veg%20Starters/picture-paneer-tikka_871710-38290_yzarlu.jpg',
    description: '',
    isVeg: true,
  },
  {
    id: 5,
    name: 'Paneer Majestics',
    category: 'Veg Starters',
    fullPrice: 280,
    image:
      'https://res.cloudinary.com/dy4isewfc/image/upload/v1753092021/Kaveri/Veg%20Starters/5267292055_8cb361f400_ufcrdg.jpg',
    description: '',
    isVeg: true,
  },
  {
    id: 6,
    name: 'Aloo 65',
    category: 'Veg Starters',
    fullPrice: 130,
    image:
      'https://res.cloudinary.com/dy4isewfc/image/upload/v1753092174/Kaveri/Veg%20Starters/OIP_epe85l.webp',
    description: '',
    isVeg: true,
  },
  {
    id: 7,
    name: 'Spring Rolls',
    category: 'Veg Starters',
    fullPrice: 150,
    image:
      'https://res.cloudinary.com/dy4isewfc/image/upload/v1753092279/Kaveri/Veg%20Starters/vegetable-filled-spring-rolls-soy-sauce-hd-background-wallpaper-desktop-wallpaper_927498-8462_fdpqz8.jpg',
    description: '',
    isVeg: true,
  },
  {
    id: 8,
    name: 'Paneer Tikka',
    category: 'Veg Starters',
    fullPrice: 230,
    image:
      'https://res.cloudinary.com/dy4isewfc/image/upload/v1753092381/Kaveri/Veg%20Starters/paneer-tikka-is-indian-dish-made-from-chunks-cottage-cheese-marinated-spices-grilled-tandoor_466689-76784_dhvdfp.jpg',
    description: '',
    isVeg: true,
  },
  {
    id: 9,
    name: 'Chilli Paneer',
    category: 'Veg Starters',
    fullPrice: 230,
    image:
      'https://res.cloudinary.com/dy4isewfc/image/upload/v1753092489/Kaveri/Veg%20Starters/wp11413533_rmcj1r.jpg',
    description: '',
    isVeg: true,
  },
  {
    id: 10,
    name: 'Aloo Spring Rolls',
    category: 'Veg Starters',
    fullPrice: 150,
    image:
      'https://res.cloudinary.com/dy4isewfc/image/upload/v1753092646/Kaveri/Veg%20Starters/Baked-Veg-Spring-Rolls-6_zeqm3m.jpg',
    description: '',
    isVeg: true,
  },

  // Non-Veg Starters
  {
    id: 11,
    name: 'Chicken 65',
    category: 'Non-Veg Starters',
    fullPrice: 250,
    image:
      'https://res.cloudinary.com/dy4isewfc/image/upload/v1753092746/Kaveri/Non%20Veg%20Starter/Chicken-65-720x720_elvuvo.jpg',
    description: '',
    isVeg: false,
  },
  {
    id: 12,
    name: 'Chicken Manchuria',
    category: 'Non-Veg Starters',
    fullPrice: 250,
    image:
      'https://res.cloudinary.com/dy4isewfc/image/upload/v1753092977/Kaveri/Non%20Veg%20Starter/almostawake21_in_the_black_pan_glossy_saucy_consistency_curry_e01015af-7dec-4f3a-b88e-851fe9c53d58_0-768x768_si4ftl.webp',
    description: '',
    isVeg: false,
  },
  {
    id: 13,
    name: 'Chilli Chicken',
    category: 'Non-Veg Starters',
    fullPrice: 250,
    image:
      'https://www.licious.in/blog/wp-content/uploads/2022/04/shutterstock_1498639676-min.jpg',
    description: '',
    isVeg: false,
  },
  {
    id: 14,
    name: 'Pepper Chicken',
    category: 'Non-Veg Starters',
    fullPrice: 260,
    image:
      'https://res.cloudinary.com/dy4isewfc/image/upload/v1753093238/Kaveri/Non%20Veg%20Starter/black-pepper-chicken-750x1000_zxfkax.jpg',
    description: '',
    isVeg: false,
  },
  {
    id: 15,
    name: 'Kaju Chicken',
    category: 'Non-Veg Starters',
    fullPrice: 290,
    image:
      'https://res.cloudinary.com/dy4isewfc/image/upload/v1753093413/Kaveri/Non%20Veg%20Starter/maxresdefault_yh9ymx.jpg',
    description: '',
    isVeg: false,
  },
  {
    id: 16,
    name: 'Dragon Chicken',
    category: 'Non-Veg Starters',
    fullPrice: 260,
    image:
      'https://res.cloudinary.com/dy4isewfc/image/upload/v1753159637/Kaveri/Non%20Veg%20Starter/233e0ea2b6962e70cabad9c036e015de_c5zgrd.jpg',
    description: '',
    isVeg: false,
  },
  {
    id: 17,
    name: 'Chicken 555',
    category: 'Non-Veg Starters',
    fullPrice: 260,
    image:
      'https://res.cloudinary.com/dy4isewfc/image/upload/v1753159741/Kaveri/Non%20Veg%20Starter/chicken-555647aaad0971b5-5-1600_dmtzgz.jpg',
    description: '',
    isVeg: false,
  },
  {
    id: 18,
    name: 'Barbecue Chicken Wings',
    category: 'Non-Veg Starters',
    fullPrice: 200,
    image:
      'https://res.cloudinary.com/dy4isewfc/image/upload/v1753159834/Kaveri/Non%20Veg%20Starter/OIP_sfukeq.webp',
    description: '',
    isVeg: false,
  },
  {
    id: 19,
    name: 'Devil Chicken',
    category: 'Non-Veg Starters',
    fullPrice: 250,
    image:
      'https://res.cloudinary.com/dy4isewfc/image/upload/v1753159963/Kaveri/Non%20Veg%20Starter/OIP_vs4grv.webp',
    description: '',
    isVeg: false,
  },
  {
    id: 20,
    name: 'Chicken Majestic',
    category: 'Non-Veg Starters',
    fullPrice: 250,
    image:
      'https://res.cloudinary.com/dy4isewfc/image/upload/v1753160063/Kaveri/Non%20Veg%20Starter/9236788671_29b8425b58_z_rl455i.jpg',
    description: '',
    isVeg: false,
  },
  {
    id: 21,
    name: 'Chicken Spring Rolls',
    category: 'Non-Veg Starters',
    fullPrice: 200,
    image:
      'https://res.cloudinary.com/dy4isewfc/image/upload/v1753160221/Kaveri/Non%20Veg%20Starter/Baked-Veg-Spring-Rolls-6_gffjei.jpg',
    description: '',
    isVeg: false,
  },
  {
    id: 22,
    name: 'Chicken Fry',
    category: 'Non-Veg Starters',
    fullPrice: 170,
    image:
      'https://res.cloudinary.com/dy4isewfc/image/upload/v1753160418/Kaveri/Non%20Veg%20Starter/chicken-fry-andhra-kodi-vepudu-768x1152.jpg_rbujnw.webp',
    description: '',
    isVeg: false,
  },
  {
    id: 23,
    name: 'Chicken Ghee Roast',
    category: 'Non-Veg Starters',
    fullPrice: 280,
    image:
      'https://res.cloudinary.com/dy4isewfc/image/upload/v1753160476/Kaveri/Non%20Veg%20Starter/chicken_2Bghee_2Broast_2B10_pr0ftg.jpg',
    description: '',
    isVeg: false,
  },
  {
    id: 24,
    name: 'Botti Fry',
    category: 'Non-Veg Starters',
    fullPrice: 250,
    image:
      'https://res.cloudinary.com/dy4isewfc/image/upload/v1753160554/Kaveri/Non%20Veg%20Starter/Mutton-Botti_pvyj1n.webp',
    description: '',
    isVeg: false,
  },

  // Indian Veg Curries
  {
    id: 25,
    name: 'Dal Fry',
    category: 'Indian Veg Curries',
    halfPrice: 120,
    fullPrice: 300,
    image:
      'https://res.cloudinary.com/dy4isewfc/image/upload/v1753172676/Kaveri/Indian%20Veg%20Curries/Masoor-Ki-Khatti-Dal-2-1-768x1152_nuzipd.jpg',
    description: '',
    isVeg: true,
  },
  {
    id: 26,
    name: 'Dal Thadkha',
    category: 'Indian Veg Curries',
    halfPrice: 150,
    fullPrice: 300,
    image:
      'https://res.cloudinary.com/dy4isewfc/image/upload/v1753172749/Kaveri/Indian%20Veg%20Curries/OIP_cyh9gg.webp',
    description: '',
    isVeg: true,
  },
  {
    id: 27,
    name: 'Paneer Butter Masala',
    category: 'Indian Veg Curries',
    halfPrice: 180,
    fullPrice: 300,
    image:
      'https://res.cloudinary.com/dy4isewfc/image/upload/v1753172849/Kaveri/Indian%20Veg%20Curries/360_F_716752017_lXCS6ToclcncnWRmtXQtEQgqEFiOXPTE_hrtxt3.jpg',
    description: '',
    isVeg: true,
  },
  {
    id: 28,
    name: 'Palak Paneer',
    category: 'Indian Veg Curries',
    halfPrice: 220,
    fullPrice: 350,
    image:
      'https://res.cloudinary.com/dy4isewfc/image/upload/v1753172898/Kaveri/Indian%20Veg%20Curries/palak-paneer_662214-4176_doof60.jpg',
    description: '',
    isVeg: true,
  },
  {
    id: 29,
    name: 'Kadai Paneer',
    category: 'Indian Veg Curries',
    halfPrice: 200,
    fullPrice: 350,
    image:
      'https://res.cloudinary.com/dy4isewfc/image/upload/v1753172932/Kaveri/Indian%20Veg%20Curries/R.4675232e0f3b96297f73550774c48adf_a55ato.jpg',
    description: '',
    isVeg: true,
  },
  {
    id: 30,
    name: 'Kaju Tomato',
    category: 'Indian Veg Curries',
    halfPrice: 200,
    fullPrice: 350,
    image:
      'https://res.cloudinary.com/dy4isewfc/image/upload/v1753172991/Kaveri/Indian%20Veg%20Curries/c80f15e27763822c6057ccb15668acff_sijb8s.webp',
    description: '',
    isVeg: true,
  },
  {
    id: 31,
    name: 'Paneer Tikka Masala',
    category: 'Indian Veg Curries',
    halfPrice: 200,
    fullPrice: 350,
    image:
      'https://res.cloudinary.com/dy4isewfc/image/upload/v1753173032/Kaveri/Indian%20Veg%20Curries/191c4eff8c397430a92e09878145cc4a_yce9oj.jpg',
    description: '',
    isVeg: true,
  },
  {
    id: 32,
    name: 'Paneer Keema Masala',
    category: 'Indian Veg Curries',
    halfPrice: 180,
    fullPrice: 300,
    image:
      'https://res.cloudinary.com/dy4isewfc/image/upload/v1753173081/Kaveri/Indian%20Veg%20Curries/chicken-keema-masala-2-1160x1536_yybzy4.jpg',
    description: '',
    isVeg: true,
  },
  {
    id: 33,
    name: 'Ginger Paneer Masala',
    category: 'Indian Veg Curries',
    halfPrice: 160,
    fullPrice: 290,
    image:
      'https://res.cloudinary.com/dy4isewfc/image/upload/v1753173281/Kaveri/Indian%20Veg%20Curries/Paneer-Butter-Masala-500x500_ennqye.jpg',
    description: '',
    isVeg: true,
  },
  {
    id: 34,
    name: 'Capsicum Masala',
    category: 'Indian Veg Curries',
    halfPrice: 150,
    fullPrice: 250,
    image:
      'https://res.cloudinary.com/dy4isewfc/image/upload/v1753173351/Kaveri/Indian%20Veg%20Curries/capsicum-masala-1_drtjax.jpg',
    description: '',
    isVeg: true,
  },
  {
    id: 35,
    name: 'Aloo Palak',
    category: 'Indian Veg Curries',
    halfPrice: 150,
    fullPrice: 250,
    image:
      'https://res.cloudinary.com/dy4isewfc/image/upload/v1753173386/Kaveri/Indian%20Veg%20Curries/OIP_tnpq5v.webp',
    description: '',
    isVeg: true,
  },
  {
    id: 36,
    name: 'Matar Palak',
    category: 'Indian Veg Curries',
    halfPrice: 220,
    fullPrice: 350,
    image:
      'https://res.cloudinary.com/dy4isewfc/image/upload/v1753173509/Kaveri/Indian%20Veg%20Curries/palak-matar-curry-also-known-as-spinach-geen-peas-masala-sabzi-sabji-indian-food_466689-85445_vam2su.jpg',
    description: '',
    isVeg: true,
  },
  {
    id: 37,
    name: 'Kaju Paneer Butter Masala',
    category: 'Indian Veg Curries',
    halfPrice: 180,
    fullPrice: 250,
    image:
      'https://res.cloudinary.com/dy4isewfc/image/upload/v1753173725/Kaveri/Indian%20Veg%20Curries/delicious-paneer-butter-masala-photography_928503-851_zwh1ea.jpg',
    description: '',
    isVeg: true,
  },
  {
    id: 38,
    name: 'Mixed Veg Curry',
    category: 'Indian Veg Curries',
    fullPrice: 180,
    image:
      'https://res.cloudinary.com/dy4isewfc/image/upload/v1753173815/Kaveri/Indian%20Veg%20Curries/OIP_elwgoo.webp',
    description: '',
    isVeg: true,
  },

  // Indian Non-Veg Curries
  {
    id: 39,
    name: 'Chicken Masala',
    category: 'Indian Non-Veg Curries',
    halfPrice: 200,
    fullPrice: 360,
    image:
      'https://res.cloudinary.com/dy4isewfc/image/upload/v1753173896/Kaveri/indian%20Non%20veg%20Curries/2386980170_wy7veb.jpg',
    description: '',
    isVeg: false,
  },
  {
    id: 40,
    name: 'Butter Chicken',
    category: 'Indian Non-Veg Curries',
    halfPrice: 250,
    fullPrice: 400,
    image:
      'https://res.cloudinary.com/dy4isewfc/image/upload/v1753173968/Kaveri/indian%20Non%20veg%20Curries/indian-style-butter-chicken-bs9xov2ct2dfyuqi_eonqcr.jpg',
    description: '',
    isVeg: false,
  },
  {
    id: 41,
    name: 'Chicken Tikka Masala',
    category: 'Indian Non-Veg Curries',
    halfPrice: 250,
    fullPrice: 380,
    image:
      'https://res.cloudinary.com/dy4isewfc/image/upload/v1753207858/Kaveri/indian%20Non%20veg%20Curries/chicken-tikka-masala-for-the-grill-recipe-hero-2_1-cb493f49e30140efbffec162d5f2d1d7_yvexcs.jpg',
    description: '',
    isVeg: false,
  },
  {
    id: 42,
    name: 'Kadai Chicken',
    category: 'Indian Non-Veg Curries',
    halfPrice: 300,
    fullPrice: 450,
    image:
      'https://res.cloudinary.com/dy4isewfc/image/upload/v1753207980/Kaveri/indian%20Non%20veg%20Curries/chicken-vindaloo-indian-food-photography_753066-9208_d8svym.jpg',
    description: '',
    isVeg: false,
  },
  {
    id: 43,
    name: 'Afgani Chicken',
    category: 'Indian Non-Veg Curries',
    halfPrice: 250,
    fullPrice: 400,
    image:
      'https://res.cloudinary.com/dy4isewfc/image/upload/v1753208098/Kaveri/indian%20Non%20veg%20Curries/ai-square-20_d5lold.webp',
    description: '',
    isVeg: false,
  },
  {
    id: 44,
    name: 'Gongura Chicken',
    category: 'Indian Non-Veg Curries',
    halfPrice: 250,
    fullPrice: 400,
    image:
      'https://res.cloudinary.com/dy4isewfc/image/upload/v1753208308/Kaveri/indian%20Non%20veg%20Curries/Gemini_Generated_Image_blju8wblju8wblju_lourme.jpg',
    description: '',
    isVeg: false,
  },
  {
    id: 45,
    name: 'Punjabi Chicken',
    category: 'Indian Non-Veg Curries',
    halfPrice: 250,
    fullPrice: 400,
    image:
      'https://res.cloudinary.com/dy4isewfc/image/upload/v1753208392/Kaveri/indian%20Non%20veg%20Curries/OIP_ak4ndo.webp',
    description: '',
    isVeg: false,
  },
  {
    id: 46,
    name: 'Mutton Curry',
    category: 'Indian Non-Veg Curries',
    halfPrice: 350,
    fullPrice: 500,
    image:
      'https://res.cloudinary.com/dy4isewfc/image/upload/v1753208532/Kaveri/indian%20Non%20veg%20Curries/shutterstock_2205168763_fy32yh.jpg',
    description: '',
    isVeg: false,
  },
  {
    id: 47,
    name: 'Egg Burji',
    category: 'Indian Non-Veg Curries',
    fullPrice: 170,
    image:
      'https://res.cloudinary.com/dy4isewfc/image/upload/v1753208562/Kaveri/indian%20Non%20veg%20Curries/Egg-Bhurji-750x750_hbgacu.jpg',
    description: '',
    isVeg: false,
  },
  {
    id: 48,
    name: 'Egg Masala',
    category: 'Indian Non-Veg Curries',
    fullPrice: 160,
    image:
      'https://res.cloudinary.com/dy4isewfc/image/upload/v1753208690/Kaveri/indian%20Non%20veg%20Curries/OIP_qk6lnu.webp',
    description: '',
    isVeg: false,
  },

  // Tandoori Rotis
  {
    id: 49,
    name: 'Roti',
    category: 'Tandoori Rotis',
    fullPrice: 20,
    image:
      'https://res.cloudinary.com/dy4isewfc/image/upload/v1753209211/Kaveri/indian%20Non%20veg%20Curries/9ba060b2-plain-naan-bombay-scaled_gyet2v.jpg',
    description: '',
    isVeg: true,
  },
  {
    id: 50,
    name: 'Butter Roti',
    category: 'Tandoori Rotis',
    fullPrice: 30,
    image:
      'https://res.cloudinary.com/dy4isewfc/image/upload/v1753209073/Kaveri/indian%20Non%20veg%20Curries/Tandoori-Roti-500x500_yb6gkr.jpg',
    description: '',
    isVeg: true,
  },
  {
    id: 51,
    name: 'Plain Naan',
    category: 'Tandoori Rotis',
    fullPrice: 35,
    image:
      'https://res.cloudinary.com/dy4isewfc/image/upload/v1753209263/Kaveri/indian%20Non%20veg%20Curries/DIV02566-scaled_ikyfuu.jpg',
    description: '',
    isVeg: true,
  },
  {
    id: 52,
    name: 'Butter Naan',
    category: 'Tandoori Rotis',
    fullPrice: 40,
    image:
      'https://res.cloudinary.com/dy4isewfc/image/upload/v1753209520/Kaveri/indian%20Non%20veg%20Curries/OIP_ai8azj.webp',
    description: '',
    isVeg: true,
  },
  {
    id: 53,
    name: 'Rumali Roti',
    category: 'Tandoori Rotis',
    fullPrice: 35,
    image:
      'https://res.cloudinary.com/dy4isewfc/image/upload/v1753209665/Kaveri/indian%20Non%20veg%20Curries/fb6b3d3ae8f74da6a24eceb656e91c42_pe22yz.jpg',
    description: '',
    isVeg: true,
  },
  {
    id: 54,
    name: 'Garlic Naan',
    category: 'Tandoori Rotis',
    fullPrice: 45,
    image:
      'https://res.cloudinary.com/dy4isewfc/image/upload/v1753209755/Kaveri/indian%20Non%20veg%20Curries/maxresdefault_ndnv9k.jpg',
    description: '',
    isVeg: true,
  },
  {
    id: 55,
    name: 'Coriander Naan',
    category: 'Tandoori Rotis',
    fullPrice: 45,
    image:
      'https://res.cloudinary.com/dy4isewfc/image/upload/v1753209848/Kaveri/indian%20Non%20veg%20Curries/vegan-naan-bread-recipe-1-680x1020_e66amd.jpg',
    description: '',
    isVeg: true,
  },

  // Tandoori Non-Veg
  {
    id: 56,
    name: 'Tandoori Chicken Half',
    category: 'Tandoori Non-Veg',
    fullPrice: 300,
    image:
      'https://res.cloudinary.com/dy4isewfc/image/upload/v1753209964/Kaveri/Tandoori%20Non%20Veg/Tandoori-chicken-recipe_palates-desire_l60nvl.jpg',
    description: '',
    isVeg: false,
  },
  {
    id: 57,
    name: 'Tandoori Chicken Full',
    category: 'Tandoori Non-Veg',
    fullPrice: 470,
    image:
      'https://res.cloudinary.com/dy4isewfc/image/upload/v1753209960/Kaveri/Tandoori%20Non%20Veg/Tandoori-Chicken_uismu2.webp',
    description: '',
    isVeg: false,
  },
  {
    id: 58,
    name: 'Tangdi Kabab Half (2p)',
    category: 'Tandoori Non-Veg',
    fullPrice: 220,
    image:
      'https://res.cloudinary.com/dy4isewfc/image/upload/v1753210272/Kaveri/Tandoori%20Non%20Veg/tangri-kabab_c3ooyf.jpg',
    description: '',
    isVeg: false,
  },
  {
    id: 59,
    name: 'Tangdi Kabab Full (4p)',
    category: 'Tandoori Non-Veg',
    fullPrice: 400,
    image:
      'https://res.cloudinary.com/dy4isewfc/image/upload/v1753210266/Kaveri/Tandoori%20Non%20Veg/OIP_qlqv3k.webp',
    description: '',
    isVeg: false,
  },
  {
    id: 60,
    name: 'Chicken Tikka (8p)',
    category: 'Tandoori Non-Veg',
    fullPrice: 300,
    image:
      'https://res.cloudinary.com/dy4isewfc/image/upload/v1753210445/Kaveri/Tandoori%20Non%20Veg/R.5b5bd75b646fc132fa6997cd15bf8ef9_vna6h9.jpg',
    description: '',
    isVeg: false,
  },
  {
    id: 61,
    name: 'Chicken Lolipop (8p)',
    category: 'Tandoori Non-Veg',
    fullPrice: 240,
    image:
      'https://res.cloudinary.com/dy4isewfc/image/upload/v1753210483/Kaveri/Tandoori%20Non%20Veg/62a95eaacb8d206406f1d296_Chicken_20Lollipop_20Hero_204.3_ocpha1.jpg',
    description: '',
    isVeg: false,
  },

  // Veg Biryanis
  {
    id: 62,
    name: 'Veg Biryani',
    category: 'Veg Biryanis',
    halfPrice: 140,
    fullPrice: 200,
    image:
      'https://res.cloudinary.com/dy4isewfc/image/upload/v1753210817/Kaveri/Veg%20Biryanis/maxresdefault_zrbrrh.jpg',
    description: '',
    isVeg: true,
  },
  {
    id: 63,
    name: 'Paneer Biryani',
    category: 'Veg Biryanis',
    halfPrice: 220,
    fullPrice: 350,
    image:
      'https://res.cloudinary.com/dy4isewfc/image/upload/v1753210872/Kaveri/Veg%20Biryanis/paneer-tikka-masala-biryani_1170794-58098_d3ese6.jpg',
    description: '',
    isVeg: true,
  },
  {
    id: 64,
    name: 'Biryani Rice',
    category: 'Veg Biryanis',
    fullPrice: 120,
    image:
      'https://res.cloudinary.com/dy4isewfc/image/upload/v1753210963/Kaveri/Veg%20Biryanis/biryani-is-mixed-rice-dish_891336-913_cnklj3.jpg',
    description: '',
    isVeg: true,
  },
  {
    id: 65,
    name: 'Kaju Biryani',
    category: 'Veg Biryanis',
    halfPrice: 250,
    fullPrice: 400,
    image:
      'https://res.cloudinary.com/dy4isewfc/image/upload/v1753211133/Kaveri/Veg%20Biryanis/maxresdefault_mr1rmc.jpg',
    description: '',
    isVeg: true,
  },
  {
    id: 66,
    name: 'Kaju Paneer Biryani',
    category: 'Veg Biryanis',
    fullPrice: 300,
    image:
      'https://res.cloudinary.com/dy4isewfc/image/upload/v1753211176/Kaveri/Veg%20Biryanis/paneer-biryani-600x480_vafjtp.jpg',
    description: '',
    isVeg: true,
  },

  // Non-Veg Biryanis
  {
    id: 67,
    name: 'Chicken Dum Biryani',
    category: 'Non-Veg Biryanis',
    halfPrice: 180,
    fullPrice: 260,
    image:
      'https://res.cloudinary.com/dy4isewfc/image/upload/v1753251829/Kaveri/Non%20Veg%20Biryanis/pngtree-top-view-of-chicken-biryani-indian-food-delicious-ramadan-iftar-meal-image_15585911_osejhh.png',
    description: '',
    isVeg: false,
  },
  {
    id: 68,
    name: 'Chicken Fry Biryani',
    category: 'Non-Veg Biryanis',
    halfPrice: 160,
    fullPrice: 230,
    image:
      'https://res.cloudinary.com/dy4isewfc/image/upload/v1753252276/Kaveri/Non%20Veg%20Biryanis/360_F_749563627_F2Mp8ZfHaT2oyT96tXtXRJZ3TfJIHiZ5_nknedg.jpg',
    description: '',
    isVeg: false,
  },
  {
    id: 69,
    name: 'Fish Fry Biryani',
    category: 'Non-Veg Biryanis',
    halfPrice: 180,
    fullPrice: 250,
    image:
      'https://res.cloudinary.com/dy4isewfc/image/upload/v1753252607/Kaveri/Non%20Veg%20Biryanis/king-fish-biryani-with-raita-served-in-a-golden-dish-isolated-on-dark-background-side-view_scoljn.jpg',
    description: '',
    isVeg: false,
  },
  {
    id: 70,
    name: 'Mutton Biryani',
    category: 'Non-Veg Biryanis',
    fullPrice: 250,
    image:
      'https://res.cloudinary.com/dy4isewfc/image/upload/v1753252589/Kaveri/Non%20Veg%20Biryanis/88326f92464e4f855fb6656ad3154f3c_e40pjf.jpg',
    description: '',
    isVeg: false,
  },
  {
    id: 71,
    name: 'Egg Biryani',
    category: 'Non-Veg Biryanis',
    halfPrice: 140,
    fullPrice: 210,
    image:
      'https://res.cloudinary.com/dy4isewfc/image/upload/v1753252845/Kaveri/Non%20Veg%20Biryanis/OIP_zlirtk.webp',
    description: '',
    isVeg: false,
  },
  {
    id: 72,
    name: 'Chicken Biryani - Boneless',
    category: 'Non-Veg Biryanis',
    fullPrice: 220,
    image:
      'https://res.cloudinary.com/dy4isewfc/image/upload/v1753253317/Kaveri/Non%20Veg%20Biryanis/s356445637346226075_p126_i3_w2048_ot0ldp.jpg',
    description: '',
    isVeg: false,
  },
  {
    id: 73,
    name: 'Chicken Lolipop Biryani',
    category: 'Non-Veg Biryanis',
    fullPrice: 200,
    image:
      'https://res.cloudinary.com/dy4isewfc/image/upload/v1753253538/Kaveri/Non%20Veg%20Biryanis/OIP_v9icxx.webp',
    description: '',
    isVeg: false,
  },
  {
    id: 74,
    name: 'Punjabi Chicken Biryani',
    category: 'Non-Veg Biryanis',
    fullPrice: 250,
    image:
      'https://res.cloudinary.com/dy4isewfc/image/upload/v1753254891/Kaveri/Non%20Veg%20Biryanis/7309607-saffrontalkies-on-x-absolutely-original-hyderabadi-biryani-made-by-my-husband-raghav-joshi-experience-an-incredible-meal-at-forever-andhra-new-delhi-spice-up-your-weekend-kindly-check-out-forever-andhra_pgm3bv.jpg',
    description: '',
    isVeg: false,
  },
  {
    id: 75,
    name: 'Chicken Tangdi Biryani',
    category: 'Non-Veg Biryanis',
    fullPrice: 250,
    image:
      'https://res.cloudinary.com/dy4isewfc/image/upload/v1753254968/Kaveri/Non%20Veg%20Biryanis/8734267_j9i2xl.jpg',
    description: '',
    isVeg: false,
  },
  {
    id: 76,
    name: 'Chicken Dum Biryani Family Pack',
    category: 'Non-Veg Biryanis',
    fullPrice: 550,
    image:
      'https://res.cloudinary.com/dy4isewfc/image/upload/v1753251829/Kaveri/Non%20Veg%20Biryanis/pngtree-top-view-of-chicken-biryani-indian-food-delicious-ramadan-iftar-meal-image_15585911_osejhh.png',
    description: '',
    isVeg: false,
  },
  {
    id: 77,
    name: 'Chicken Dum Biryani Jumbo Pack',
    category: 'Non-Veg Biryanis',
    fullPrice: 750,
    image:
      'https://res.cloudinary.com/dy4isewfc/image/upload/v1753251829/Kaveri/Non%20Veg%20Biryanis/pngtree-top-view-of-chicken-biryani-indian-food-delicious-ramadan-iftar-meal-image_15585911_osejhh.png',
    description: '',
    isVeg: false,
  },
  {
    id: 78,
    name: 'Chicken Fry Biryani Family Pack',
    category: 'Non-Veg Biryanis',
    fullPrice: 650,
    image:
      'https://res.cloudinary.com/dy4isewfc/image/upload/v1753252276/Kaveri/Non%20Veg%20Biryanis/360_F_749563627_F2Mp8ZfHaT2oyT96tXtXRJZ3TfJIHiZ5_nknedg.jpg',
    description: '',
    isVeg: false,
  },
  {
    id: 79,
    name: 'Chicken Fry Biryani Jumbo Pack',
    category: 'Non-Veg Biryanis',
    fullPrice: 850,
    image:
      'https://res.cloudinary.com/dy4isewfc/image/upload/v1753252276/Kaveri/Non%20Veg%20Biryanis/360_F_749563627_F2Mp8ZfHaT2oyT96tXtXRJZ3TfJIHiZ5_nknedg.jpg',
    description: '',
    isVeg: false,
  },

  // Chinese Food
  {
    id: 80,
    name: 'Veg Fried Rice',
    category: 'Chinese Food',
    fullPrice: 160,
    image:
      'https://res.cloudinary.com/dy4isewfc/image/upload/v1753255249/Kaveri/Chinese%20Foods/5c54d05cca6ab7802eab031c_fried-rice-website-thumbnail-_ddbiaa_cbgd3x.png',
    description: '',
    isVeg: true,
  },
  {
    id: 81,
    name: 'Jeera Rice',
    category: 'Chinese Food',
    fullPrice: 160,
    image:
      'https://res.cloudinary.com/dy4isewfc/image/upload/v1753255391/Kaveri/Chinese%20Foods/Zeera-Rice-Recipe_ddjobx.jpg',
    description: '',
    isVeg: true,
  },
  {
    id: 82,
    name: 'Kaju Fried Rice',
    category: 'Chinese Food',
    fullPrice: 220,
    image:
      'https://res.cloudinary.com/dy4isewfc/image/upload/v1753255521/Kaveri/Chinese%20Foods/Untitled-design-21-1_u6fcre.png',
    description: '',
    isVeg: true,
  },
  {
    id: 83,
    name: 'Paneer Fried Rice',
    category: 'Chinese Food',
    fullPrice: 200,
    image:
      'https://res.cloudinary.com/dy4isewfc/image/upload/v1753255632/Kaveri/Chinese%20Foods/PaneerFriedRice_JPG_ns2l9g.png',
    description: '',
    isVeg: true,
  },
  {
    id: 84,
    name: 'Tomato Rice',
    category: 'Chinese Food',
    fullPrice: 160,
    image:
      'https://res.cloudinary.com/dy4isewfc/image/upload/v1753255789/Kaveri/Chinese%20Foods/South-Indian-Style-Tomato-Rice-500x500_kurpht.jpg',
    description: '',
    isVeg: true,
  },
  {
    id: 85,
    name: 'Pudina Rice',
    category: 'Chinese Food',
    fullPrice: 160,
    image:
      'https://res.cloudinary.com/dy4isewfc/image/upload/v1753255850/Kaveri/Chinese%20Foods/mint-rice-basmati-rice-cooked-with-fresh-pudina-leaves-garnished-with-peanuts-cashew-nuts-kaju_466689-16190_nbeyot.jpg',
    description: '',
    isVeg: true,
  },
  {
    id: 86,
    name: 'Curd Rice',
    category: 'Chinese Food',
    fullPrice: 140,
    image:
      'https://res.cloudinary.com/dy4isewfc/image/upload/v1753256004/Kaveri/Chinese%20Foods/curd-rice_uqjedy.jpg',
    description: '',
    isVeg: true,
  },
  {
    id: 87,
    name: 'Veg Manchurian Rice',
    category: 'Chinese Food',
    fullPrice: 180,
    image:
      'https://res.cloudinary.com/dy4isewfc/image/upload/v1753256086/Kaveri/Chinese%20Foods/ai-generated-a-plate-of-rice-and-meat-with-a-lemon-wedge-free-photo_fgjpkc.jpg',
    description: '',
    isVeg: true,
  },
  {
    id: 88,
    name: 'Egg Fried Rice',
    category: 'Chinese Food',
    fullPrice: 170,
    image:
      'https://res.cloudinary.com/dy4isewfc/image/upload/v1753256376/Kaveri/Chinese%20Foods/vw4o14d7c6541_ljqdk0.jpg',
    description: '',
    isVeg: false,
  },
  {
    id: 89,
    name: 'Chicken Fried Rice',
    category: 'Chinese Food',
    fullPrice: 180,
    image:
      'https://res.cloudinary.com/dy4isewfc/image/upload/v1753256443/Kaveri/Chinese%20Foods/chicken-fried-rice-restaurant-background-photography_1264082-31418_rj4mcm.jpg',
    description: '',
    isVeg: false,
  },
];
