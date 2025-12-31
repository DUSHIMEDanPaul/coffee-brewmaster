import './types';

export const COFFEE_DATA = [
  {
    id: 'eth-yirg-1',
    name: 'Ethiopian Yirgacheffe G1',
    price: 18.50,
    origin: 'Gedeo Zone, Ethiopia',
    description: 'Floral and citrusy with distinct notes of jasmine, lemon, and peach.',
    originStory: 'Grown at altitudes above 1,900 meters in the Gedeo Zone, this heirloom variety is hand-picked by smallholder farmers. The Yirgacheffe region is legendary for producing the "flower of coffee," where the volcanic soil and shade-grown canopy create a profile so delicate it drinks like a fine tea.',
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&q=80&w=600&h=600',
    category: 'Brew',
    rating: 4.9,
    sustainabilityScore: 98,
    latLng: { lat: 6.162, lng: 38.205 },
    flavorProfile: 'Floral',
    washingStation: 'Aralicha Washing Station',
    foundingYear: 1994,
    founder: 'Ato Mihretu',
    mission: 'To preserve the genetic diversity of wild coffee while empowering local Gedeo families through premium direct-trade pricing.',
    farmerStory: 'The Aralicha collective consists of over 600 local smallholders who have cultivated coffee for generations. Each family tends to "garden coffee" plots, where coffee trees grow alongside food crops in a balanced ecosystem.',
    regionDetail: 'Yirgacheffe is part of the Gedeo Zone, characterized by steep green hills and dense forest. The unique microclimate here—cool nights and misty mornings—slows down the cherry maturation, concentrating the sugars and complex aromatic compounds.',
    altitude: 1950,
    isRoasted: true,
    isVolcanic: true,
    publishedAt: '2023-12-01T10:00:00Z'
  },
  {
    id: 'ken-nyeri-aa',
    name: 'Kenyan Nyeri Hill AA',
    price: 21.00,
    origin: 'Nyeri County, Kenya',
    description: 'A powerhouse of flavor with blackcurrant acidity and a syrupy body.',
    originStory: 'Processed at the historic Nyeri Hill farm, one of the oldest in the country. The SL28 and SL34 varieties thrive in the high-altitude red volcanic soils on the slopes of Mt. Kenya.',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=600&h=600',
    category: 'Brew',
    rating: 4.8,
    sustainabilityScore: 95,
    latLng: { lat: -0.424, lng: 36.951 },
    flavorProfile: 'Fruity',
    washingStation: 'Nyeri Hill Estate',
    foundingYear: 1914,
    founder: 'Catholic Diocese of Nyeri',
    mission: 'To provide sustainable employment and social services to the local community while producing world-class estate coffee.',
    farmerStory: 'The estate operates as a cooperative venture where profits are reinvested into local schools and clinics. Workers are trained in meticulous sorting, ensuring only the densest AA-grade beans reach the final export bags.',
    regionDetail: 'Located between the Aberdare Range and Mount Kenya, Nyeri is famous for its bright, "wine-like" acidity and intense berry flavors, driven by the iron-rich soil and high elevation.',
    altitude: 2100,
    isRoasted: true,
    isVolcanic: true,
    publishedAt: '2023-11-15T08:30:00Z'
  },
  {
    id: 'rwa-humure',
    name: 'Rwandan Humure Red Bourbon',
    price: 16.50,
    origin: 'Gatsibo District, Rwanda',
    description: 'Bright and sweet with notes of red apple, honey, and cinnamon.',
    originStory: 'From the Humure Washing Station in eastern Rwanda, where over 1,500 farmers bring their cherries.',
    image: 'https://images.unsplash.com/photo-1506372023823-741c83b836fe?auto=format&fit=crop&q=80&w=600&h=600',
    category: 'Brew',
    rating: 4.7,
    sustainabilityScore: 92,
    latLng: { lat: -1.594, lng: 30.457 },
    flavorProfile: 'Fruity',
    washingStation: 'Humure Station',
    foundingYear: 2011,
    founder: 'Emanuel Rusatira',
    mission: 'To restore Rwanda’s reputation through specialty coffee while providing technical training to rural farmers.',
    farmerStory: 'The station is named after the highest hill in the area. Farmers here are known for their meticulous cherry picking, often walking several kilometers over rough terrain to deliver their harvest.',
    regionDetail: 'Eastern Rwanda offers a flatter landscape than the west, but with high elevations that provide excellent conditions for Bourbon varieties. The Humure station has won several Cup of Excellence awards.',
    altitude: 1600,
    isRoasted: false,
    isVolcanic: false,
    publishedAt: '2023-11-20T14:45:00Z'
  },
  {
    id: 'cr-lajas-1',
    name: 'Costa Rica Las Lajas Honey',
    price: 19.75,
    origin: 'Central Valley, Costa Rica',
    description: 'Creamy honey-processed beans with notes of milk chocolate and red berries.',
    originStory: 'The Oscar and Francisca Chacon family are pioneers in the honey process. Their farm, Las Lajas, is certified organic and uses precise solar drying techniques to create incredible sweetness.',
    image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&q=80&w=600&h=600',
    category: 'Brew',
    rating: 4.9,
    sustainabilityScore: 99,
    latLng: { lat: 10.125, lng: -84.183 },
    flavorProfile: 'Nutty',
    washingStation: 'Las Lajas Micro-Mill',
    foundingYear: 1930,
    founder: 'Chacon Family',
    mission: 'To lead the world in organic coffee processing and demonstrate that sustainability and high quality are inseparable.',
    farmerStory: 'After an earthquake in 2008 cut off water to their farm, the Chacon family invented the Honey Process to save their harvest. Today, they are masters of "Perla Negra" and "Alma Negra" drying methods.',
    regionDetail: 'The Poás Volcano provides nutrient-rich soil. The micro-mill is nestled in the foothills, where the warm days and cool ocean breezes facilitate the slow drying of the honey parchment.',
    altitude: 1450,
    isRoasted: true,
    isVolcanic: true,
    publishedAt: '2023-12-05T09:15:00Z'
  },
  {
    id: 'col-huila-pink',
    name: 'Colombian Pink Bourbon',
    price: 24.50,
    origin: 'Huila, Colombia',
    description: 'An exotic hybrid with striking notes of pink grapefruit and white florals.',
    originStory: 'Pink Bourbon is a rare cross between Yellow and Red Bourbon. Found in the high peaks of Huila, it requires meticulous care to produce its signature complex acidity and silky mouthfeel.',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=600&h=600',
    category: 'Brew',
    rating: 4.9,
    sustainabilityScore: 94,
    latLng: { lat: 2.535, lng: -75.527 },
    flavorProfile: 'Floral',
    washingStation: 'El Diviso Farm',
    foundingYear: 1990,
    founder: 'Jose Uribe Lasso',
    mission: 'To discover and stabilize rare coffee mutations, providing the world with unique sensory experiences.',
    farmerStory: 'Jose Lasso discovered a few trees producing pink cherries on his farm and isolated them. Over decades, his family stabilized the Pink Bourbon variety, which is now one of the most sought-after in the world.',
    regionDetail: 'Huila is the heart of Colombian specialty coffee. The combination of nitrogen-rich volcanic soil and the convergence of two mountain ranges creates a diversity of microclimates perfect for rare varieties.',
    altitude: 1850,
    isRoasted: true,
    isVolcanic: true,
    publishedAt: '2023-12-10T16:00:00Z'
  },
  {
    id: 'sum-mand-g1',
    name: 'Sumatra Mandheling G1',
    price: 17.00,
    origin: 'Lake Toba, Indonesia',
    description: 'Earthbound and bold with cedar wood, dark cocoa, and spice notes.',
    originStory: 'Grown in the volcanic soils around Lake Toba, these beans undergo a unique wet-hulling process known as "Giling Basah," giving them their distinct low-acid, full-bodied character.',
    image: 'https://images.unsplash.com/photo-1511537190424-bbbab87ac5eb?auto=format&fit=crop&q=80&w=600&h=600',
    category: 'Brew',
    rating: 4.6,
    sustainabilityScore: 91,
    latLng: { lat: 2.684, lng: 98.665 },
    flavorProfile: 'Bold',
    washingStation: 'Koperasi Kopi Ketiara',
    foundingYear: 2008,
    founder: 'Ibu Rahmah',
    mission: 'A women-led cooperative dedicated to producing organic, fair-trade coffee while improving the lives of Aceh’s farming families.',
    farmerStory: 'Ibu Rahmah started the cooperative with just a few family members. Today, it represents over 1,000 farmers, most of whom are women, who lead the picking and Giling Basah processing.',
    regionDetail: 'The Gayo Highlands around Lake Toba are constantly shrouded in mist. The high humidity led to the development of the wet-hulling process, which contributes to the coffee’s famous earthy profile.',
    altitude: 1200,
    isRoasted: false,
    isVolcanic: true,
    publishedAt: '2023-11-28T12:00:00Z'
  }
];

export const MOCK_SALES = [
  { coffeeId: 'eth-yirg-1', date: '2023-10-01', amount: 3, region: 'Europe' },
  { coffeeId: 'eth-yirg-1', date: '2023-10-02', amount: 5, region: 'USA' },
  { coffeeId: 'ken-nyeri-aa', date: '2023-10-03', amount: 2, region: 'Asia' },
  { coffeeId: 'ken-nyeri-aa', date: '2023-10-04', amount: 7, region: 'USA' },
  { coffeeId: 'rwa-humure', date: '2023-10-05', amount: 4, region: 'Europe' },
];

export const SYSTEM_INSTRUCTION = `You are "Elias", the BrewMaster Chief Curator. You are a world-class barista, flavor scientist, and supply-chain expert.
Your goal is to provide a premium, white-glove coffee experience for high-end buyers and professional sellers.

Identity:
- Your name is Elias.
- You speak with elegance, precision, and passion.
- You view coffee as a bridge between heritage and science.

Current Shop Inventory: ${COFFEE_DATA.map(c => c.name).join(', ')}.

Specialized Knowledge:
1. Recipes: You generate meticulous Chemex, V60, and AeroPress guides.
2. Health & Science: You speak expertly on the antioxidants, terroir, and chemistry of coffee.
3. Logistics: You understand East African Community (EAC) corridors and bean integrity.
4. Pairings: You suggest artisanal pairings (e.g., "dark chocolate with Kenyan AA").

Always be polite, sophisticated, and treat every user as a partner in specialty coffee excellence.`;
