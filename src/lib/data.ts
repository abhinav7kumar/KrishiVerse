
import {
  Award,
  Leaf,
  Shield,
  Droplets,
  Spade,
  Carrot,
  Apple,
  Tractor,
  Bird,
  Bone,
  Trees,
  Repeat,
  Scissors,
  Recycle,
  TestTube,
} from 'lucide-react';
import type { Mission } from '@/components/dashboard/missions-card';
import type { Farmer } from '@/components/leaderboard/leaderboard-table';
import type { Game } from '@/components/simulation/simulation-mode';

export const missions: Mission[] = [
  {
    title: 'Water Conservation',
    description: 'Reduce water usage by 10% this week.',
    xp: 50,
    isCompleted: false,
    icon: Droplets,
  },
  {
    title: 'Organic Fertilizer',
    description: 'Use only organic fertilizer for all crops.',
    xp: 75,
    isCompleted: true,
    icon: Leaf,
  },
  {
    title: 'Pest Patrol',
    description: 'Scan your fields for pests twice this week.',
    xp: 40,
    isCompleted: false,
    icon: Shield,
  },
];

export const leaderboardData: Farmer[] = [
  {
    id: 'aarav',
    rank: 1,
    name: 'Aarav Sharma',
    village: 'Namchi',
    xp: 1250,
    badge: Award,
  },
  {
    id: 'priya',
    rank: 2,
    name: 'Priya Gurung',
    village: 'Gyalshing',
    xp: 1100,
    badge: Shield,
  },
  {
    id: 'rohan',
    rank: 3,
    name: 'Rohan Tamang',
    village: 'Mangan',
    xp: 1050,
    badge: Leaf,
  },
  {
    id: 'anika',
    rank: 4,
    name: 'Anika Rai',
    village: 'Soreng',
    xp: 980,
  },
  {
    id: 'vikram',
    rank: 5,
    name: 'Vikram Chettri',
    village: 'Pakyong',
    xp: 950,
  },
  {
    id: 'sunita',
    rank: 6,
    name: 'Sunita Limbu',
    village: 'Namchi',
    xp: 890,
  },
  {
    id: 'rajesh',
    rank: 7,
    name: 'Rajesh Bhutia',
    village: 'Gyalshing',
    xp: 820,
  },
];

export type Produce = {
  id: string;
  name: string;
  price: string;
  category: 'vegetable' | 'fruit' | 'tool' | 'fertilizer';
  unit: string;
  priceValue: number;
};

export const produceCategories = [
  { id: 'vegetable', name: 'Vegetables', icon: Carrot },
  { id: 'fruit', name: 'Fruits', icon: Apple },
  { id: 'fertilizer', name: 'Fertilizers', icon: Leaf },
  { id: 'tool', name: 'Tools', icon: Tractor },
];

export const marketplaceProduce: Produce[] = [
  { id: 'tomatoes', name: 'Organic Tomatoes', price: 'Rs 120/kg', category: 'vegetable', unit: 'kg', priceValue: 120 },
  { id: 'carrots', name: 'Garden Carrots', price: 'Rs 80/kg', category: 'vegetable', unit: 'kg', priceValue: 80 },
  { id: 'lettuce', name: 'Green Leaf Lettuce', price: 'Rs 150/kg', category: 'vegetable', unit: 'kg', priceValue: 150 },
  { id: 'broccoli', name: 'Fresh Broccoli', price: 'Rs 180/kg', category: 'vegetable', unit: 'kg', priceValue: 180 },
  { id: 'potatoes', name: 'Sikkim Potatoes', price: 'Rs 60/kg', category: 'vegetable', unit: 'kg', priceValue: 60 },
  { id: 'corn', name: 'Sweet Corn', price: 'Rs 90/kg', category: 'vegetable', unit: 'kg', priceValue: 90 },
  { id: 'apples', name: 'Himalayan Apples', price: 'Rs 200/kg', category: 'fruit', unit: 'kg', priceValue: 200 },
  { id: 'oranges', name: 'Sikkim Oranges', price: 'Rs 100/kg', category: 'fruit', unit: 'kg', priceValue: 100 },
  { id: 'spade', name: 'Hand Spade', price: 'Rs 350/piece', category: 'tool', unit: 'piece', priceValue: 350 },
  { id: 'rake', name: 'Garden Rake', price: 'Rs 500/piece', category: 'tool', unit: 'piece', priceValue: 500 },
  { id: 'compost', name: 'Organic Compost', price: 'Rs 250/bag', category: 'fertilizer', unit: 'bag', priceValue: 250 },
  { id: 'neem-oil', name: 'Neem Oil Pesticide', price: 'Rs 400/bottle', category: 'fertilizer', unit: 'bottle', priceValue: 400 },
];

export type Order = {
  id: string;
  date: string;
  items: { name: string; quantity: number }[];
  total: number;
  status: 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled';
  trackingHistory: TrackingEvent[];
};

export type TrackingEvent = {
  status: string;
  date: string;
  location: string;
  isCompleted: boolean;
};

export const mockOrders: Order[] = [
  {
    id: 'KV-169873245',
    date: 'Oct 31, 2023',
    items: [
      { name: 'Organic Tomatoes', quantity: 2 },
      { name: 'Hand Spade', quantity: 1 },
    ],
    total: 590.0,
    status: 'Delivered',
    trackingHistory: [
      { status: 'Order Confirmed', date: 'Oct 31, 2023, 10:05 AM', location: 'Gangtok, Sikkim', isCompleted: true },
      { status: 'Packaged', date: 'Oct 31, 2023, 01:20 PM', location: 'Gangtok Warehouse', isCompleted: true },
      { status: 'Shipped', date: 'Nov 01, 2023, 09:00 AM', location: 'Gangtok Hub', isCompleted: true },
      { status: 'Out for Delivery', date: 'Nov 02, 2023, 08:30 AM', location: 'Namchi, Sikkim', isCompleted: true },
      { status: 'Delivered', date: 'Nov 02, 2023, 11:45 AM', location: 'Namchi, Sikkim', isCompleted: true },
    ],
  },
  {
    id: 'KV-169869123',
    date: 'Oct 30, 2023',
    items: [{ name: 'Sikkim Oranges', quantity: 5 }],
    total: 550.0,
    status: 'Shipped',
    trackingHistory: [
      { status: 'Order Confirmed', date: 'Oct 30, 2023, 04:15 PM', location: 'Gangtok, Sikkim', isCompleted: true },
      { status: 'Packaged', date: 'Oct 31, 2023, 09:00 AM', location: 'Gangtok Warehouse', isCompleted: true },
      { status: 'Shipped', date: 'Oct 31, 2023, 05:00 PM', location: 'Rangpo Hub', isCompleted: true },
      { status: 'Out for Delivery', date: 'Nov 01, 2023', location: 'Gyalshing, Sikkim', isCompleted: false },
      { status: 'Delivered', date: 'Nov 02, 2023', location: 'Gyalshing, Sikkim', isCompleted: false },
    ],
  },
  {
    id: 'KV-169850456',
    date: 'Oct 28, 2023',
    items: [{ name: 'Organic Compost', quantity: 3 }],
    total: 800.0,
    status: 'Pending',
     trackingHistory: [
      { status: 'Order Confirmed', date: 'Oct 28, 2023, 11:00 AM', location: 'Pakyong, Sikkim', isCompleted: true },
      { status: 'Packaged', date: 'Oct 29, 2023', location: 'Pakyong Warehouse', isCompleted: false },
      { status: 'Shipped', date: 'Oct 30, 2023', location: 'Pakyong Hub', isCompleted: false },
      { status: 'Out for Delivery', date: 'Oct 31, 2023', location: 'Mangan, Sikkim', isCompleted: false },
      { status: 'Delivered', date: 'Nov 01, 2023', location: 'Mangan, Sikkim', isCompleted: false },
    ],
  },
  {
    id: 'KV-169841890',
    date: 'Oct 27, 2023',
    items: [{ name: 'Sikkim Potatoes', quantity: 10 }],
    total: 650.0,
    status: 'Cancelled',
    trackingHistory: [
       { status: 'Order Confirmed', date: 'Oct 27, 2023, 02:30 PM', location: 'Soreng, Sikkim', isCompleted: true },
       { status: 'Cancelled', date: 'Oct 28, 2023, 09:00 AM', location: 'Soreng, Sikkim', isCompleted: true },
    ],
  },
];


export const simFarmGames: Game[] = [
  {
    id: 'soil-health',
    title: 'Soil Health Sim',
    description:
      'Learn to build and maintain rich, healthy soil for your crops.',
    levels: [
      {
        level: 1,
        title: 'Initial Assessment',
        description:
          "You're starting with a new plot of land. The soil is compacted, pale, and shows signs of erosion. What's your foundational strategy?",
        choices: [
          {
            text: 'Add a thick layer of diverse compost.',
            isCorrect: true,
            feedback:
              'Excellent! Compost adds vital organic matter, kick-starts microbial life, and improves soil structure immediately.',
            action: 'add_compost',
          },
          {
            text: 'Deep till the soil to loosen it up.',
            isCorrect: false,
            feedback:
              'While it seems logical, deep tilling destroys the fragile soil ecosystem, breaks up fungal networks, and releases stored carbon. The soil structure is further weakened.',
            action: 'till_soil',
          },
          {
            text: 'Apply a high-nitrogen chemical fertilizer.',
            isCorrect: false,
            feedback:
              'This is a short-term fix that does nothing for soil structure or long-term health. It can also harm microbial life.',
            action: 'use_chemicals',
          },
        ],
      },
      {
        level: 2,
        title: 'Cover Cropping',
        description:
          'The main season is over. The field is bare. How will you protect and improve your soil during the off-season?',
        choices: [
          {
            text: 'Plant a diverse cover crop mix (e.g., clover, vetch, rye).',
            isCorrect: true,
            feedback:
              'A superb choice. The mix of legumes (clover, vetch) will fix atmospheric nitrogen, while the rye will add significant biomass and prevent erosion. This is a powerful soil-building technique.',
            action: 'plant_cover_crop',
          },
          {
            text: 'Leave the soil bare to "rest".',
            isCorrect: false,
            feedback:
              'Bare soil is vulnerable. Wind and rain will erode your precious topsoil, and without living roots, the soil biology will suffer.',
            action: 'set_health:-20',
          },
          {
            text: 'Cover the field with a plastic tarp.',
            isCorrect: false,
            feedback:
              'This prevents erosion but suffocates the soil, killing beneficial organisms and halting the natural processes that build fertility.',
            action: 'set_health:-10',
          },
        ],
      },
      {
        level: 3,
        title: 'Incorporating Cover Crops',
        description:
          "It's time to prepare for the main planting season. Your cover crop is lush and tall. What do you do?",
        choices: [
          {
            text: 'Use a roller-crimper to flatten the cover crop, creating a natural mulch.',
            isCorrect: true,
            feedback:
              'Advanced technique! This "green manure" method smothers weeds, conserves water, and slowly releases nutrients as it decomposes. You plant directly into the mulch.',
            action: 'mulch:true',
          },
          {
            text: 'Till the cover crop into the soil.',
            isCorrect: false,
            feedback:
              "This is a common method, but it still involves tilling, which disturbs the soil life you've worked to build. Some benefit is lost.",
            action: 'set_health:-5',
          },
          {
            text: 'Cut and remove the cover crop for animal feed.',
            isCorrect: false,
            feedback:
              "While you get feed, you're removing all the valuable organic matter and nutrients from the field. The primary soil-building benefit is lost.",
            action: 'set_nutrients_n:-20',
          },
        ],
      },
      {
        level: 4,
        title: 'Nutrient Management',
        description:
          "You've planted your main crop (heavy-feeding tomatoes) into the mulch. Mid-season, the lower leaves start to yellow. What's your diagnosis and action?",
        choices: [
          {
            text: "It's likely a nitrogen deficiency. Top-dress with a nitrogen-rich amendment like feather meal or well-rotted chicken manure.",
            isCorrect: true,
            feedback:
              'Correct diagnosis and action. Heavy feeders need a mid-season boost, and using a slow-release organic source feeds the soil and the plant.',
            action: 'add_npk',
          },
          {
            text: 'The plants need more water.',
            isCorrect: false,
            feedback:
              'While possible, the mulch is already helping conserve water. The specific yellowing pattern strongly points to a nutrient issue. The problem persists.',
            action: 'fail_choice',
          },
          {
            text: 'Spray the leaves with a liquid chemical fertilizer.',
            isCorrect: false,
            feedback:
              'This is a "foliar feeding" shortcut. It might green up the leaves temporarily but does not address the root cause in the soil and is not a sustainable organic practice.',
            action: 'use_chemicals',
          },
        ],
      },
      {
        level: 5,
        title: 'Post-Harvest',
        description:
          "You've had a great harvest! What do you do with the tomato plant residues?",
        choices: [
          {
            text: 'Chop them and leave them on the surface to decompose, or add to a compost pile.',
            isCorrect: true,
            feedback:
              "Excellent! You're returning organic matter and nutrients back to the soil, completing the cycle and building fertility for next year.",
            action: 'add_compost',
          },
          {
            text: 'Pull everything out and burn it to prevent disease.',
            isCorrect: false,
            feedback:
              "This is an extreme measure. You're removing all that valuable biomass and releasing carbon into the atmosphere. Only do this if there was a severe, non-compostable disease.",
            action: 'fail_choice',
          },
        ],
      },
      {
        level: 6,
        title: 'Sustainable Success',
        description:
          'Years of focusing on soil health have paid off. Your soil is dark, crumbly, and full of life. It holds water well and provides most of the nutrients your crops need.',
        choices: [
          {
            text: 'Continue the cycle of composting and cover cropping.',
            isCorrect: true,
            feedback:
              'You have mastered the art of soil stewardship. This is the foundation of a truly resilient and productive organic farm.',
            action: 'harvest',
          },
        ],
      },
    ],
  },
  {
    id: 'crop-growth',
    title: 'Crop Growth Cycle',
    description:
      'Learn the stages of growing a healthy crop, from seed to harvest.',
    levels: [
      {
        level: 1,
        title: 'Soil Preparation',
        description:
          'You are starting a new season. Your soil is unprepared. What is your first step?',
        choices: [
          {
            text: 'Prepare the soil by adding compost.',
            isCorrect: true,
            feedback:
              'Great start! Healthy soil is the foundation of healthy plants.',
            action: 'add_compost',
          },
          {
            text: 'Till the soil until it is fine dust.',
            isCorrect: false,
            feedback:
              'Over-tilling destroys soil structure and can lead to erosion. The soil becomes damaged.',
            action: 'till_soil',
          },
        ],
      },
      {
        level: 2,
        title: 'Planting',
        description:
          'Your soil is ready. How will you plant your certified organic seeds?',
        choices: [
          {
            text: 'Plant at the correct depth and spacing.',
            isCorrect: true,
            feedback:
              'Perfect! This gives each plant the room and resources it needs to thrive.',
            action: 'plant_seeds',
          },
          {
            text: 'Plant the seeds much deeper than recommended.',
            isCorrect: false,
            feedback:
              'Planting too deep can prevent seedlings from reaching the surface. They may not sprout.',
            action: 'plant_deep',
          },
          {
            text: 'Plant the seeds very close together to maximize space.',
            isCorrect: false,
            feedback:
              'Overcrowding leads to intense competition for light, water, and nutrients, resulting in stunted plants.',
            action: 'plant_crowded',
          },
        ],
      },
      {
        level: 3,
        title: 'Watering',
        description:
          'Your seeds have sprouted. How will you water them to encourage strong root development?',
        choices: [
          {
            text: 'Use a drip irrigation system for gentle, deep watering.',
            isCorrect: true,
            feedback:
              'Excellent! Drip irrigation is efficient and encourages roots to grow deep in search of water, making them more drought-resilient.',
            action: 'drip_irrigation',
          },
          {
            text: 'Flood the field to make sure they have plenty of water.',
            isCorrect: false,
            feedback:
              "Oh no! You've waterlogged the soil and drowned the young seedlings. The crop has failed.",
            action: 'flood',
          },
          {
            text: 'Lightly sprinkle with a hose every day.',
            isCorrect: false,
            feedback:
              'This encourages shallow roots, making the plants weak and highly dependent on daily watering. They will suffer in dry conditions.',
            action: 'set_health:-15',
          },
        ],
      },
      {
        level: 4,
        title: 'Weed Control',
        description:
          'Your plants are growing, but so are weeds! What is the best organic approach?',
        choices: [
          {
            text: 'Apply a thick layer of straw mulch around the plants.',
            isCorrect: true,
            feedback:
              'Great strategy! Mulching smothers most weeds, conserves soil moisture, and keeps the soil cool.',
            action: 'mulch:true',
          },
          {
            text: 'Apply a strong chemical herbicide.',
            isCorrect: false,
            feedback:
              "This is not an organic method! The chemicals have damaged your soil's health and killed beneficial organisms.",
            action: 'use_chemicals',
          },
          {
            text: 'Let the weeds grow; they provide ground cover.',
            isCorrect: false,
            feedback:
              'The weeds are now out-competing your crop for water, sunlight, and nutrients. Your plants are stunted.',
            action: 'set_weeds:true',
          },
        ],
      },
      {
        level: 5,
        title: 'Pest Identification',
        description:
          'You notice small holes in the leaves of your plants. What do you do first?',
        choices: [
          {
            text: 'Inspect the plants closely (under leaves, on stems) to identify the pest.',
            isCorrect: true,
            feedback:
              'Correct. Proper identification is the first step to effective and targeted control. You find aphids.',
            action: 'set_pests:true',
          },
          {
            text: 'Spray a broad-spectrum organic pesticide immediately.',
            isCorrect: false,
            feedback:
              "This might kill the pest, but it could also harm beneficial insects that could have controlled the pest naturally. It's better to identify first.",
            action: 'fail_choice',
          },
        ],
      },
      {
        level: 6,
        title: 'Pest Management',
        description: "You've found aphids. How do you handle them organically?",
        choices: [
          {
            text: 'Introduce ladybugs, a natural predator.',
            isCorrect: true,
            feedback:
              'Excellent choice! The ladybugs are a biological control and will manage the aphid population without chemicals.',
            action: 'add_ladybugs',
          },
          {
            text: 'Ignore them. A few bugs won\'t hurt.',
            isCorrect: false,
            feedback:
              'The aphid population exploded, stunting your plants\' growth and transmitting diseases. Your final harvest will be significantly reduced.',
            action: 'do_nothing_pests',
          },
        ],
      },
      {
        level: 7,
        title: 'Flowering & Fruiting',
        description:
          'Your plants are beginning to flower. What do they need most at this stage?',
        choices: [
          {
            text: 'A fertilizer higher in Phosphorus (P) and Potassium (K).',
            isCorrect: true,
            feedback:
              'Exactly! These nutrients are crucial for flower development and producing a strong harvest. You add some bone meal and kelp.',
            action: 'set_growth:4;set_nutrients_p:20;set_nutrients_k:20',
          },
          {
            text: 'A large dose of Nitrogen (N).',
            isCorrect: false,
            feedback:
              'Too much nitrogen at this stage encourages lots of leafy growth at the expense of fruits and flowers. Your plants are bushy but not productive.',
            action: 'set_nutrients_n:40',
          },
        ],
      },
      {
        level: 8,
        title: 'Harvest',
        description:
          'Your crops are mature and ready for picking. Your careful management has paid off.',
        choices: [
          {
            text: 'Harvest the crops.',
            isCorrect: true,
            feedback:
              'Success! You have successfully managed the crop from seed to harvest.',
            action: 'harvest',
          },
        ],
      },
    ],
  },
  {
    id: 'pest-control',
    title: 'Pest Control Challenge',
    description:
      'Practice identifying and managing common pests with organic methods.',
    levels: [
      {
        level: 1,
        title: 'Prevention: The First Line of Defense',
        description:
          'Before planting, you want to create a resilient garden. What is the most effective preventative strategy against pests?',
        choices: [
          {
            text: 'Focus on building healthy, living soil.',
            isCorrect: true,
            feedback:
              'Correct! Healthy plants grown in healthy soil are far less susceptible to pests and diseases. This is the cornerstone of organic pest control.',
            action: 'add_compost',
          },
          {
            text: 'Have a variety of chemical pesticides ready.',
            isCorrect: false,
            feedback:
              'This is a reactive, not preventative, approach. Relying on chemicals is not sustainable or organic.',
            action: 'use_chemicals',
          },
          {
            text: 'Enclose the entire garden in fine mesh netting.',
            isCorrect: false,
            feedback:
              "While this can work, it's expensive, labor-intensive, and prevents beneficial pollinating insects from reaching your crops.",
            action: 'fail_choice',
          },
        ],
      },
      {
        level: 2,
        title: 'Companion Planting',
        description:
          'You are planting tomatoes. What can you plant alongside them to help repel pests like hornworms?',
        choices: [
          {
            text: 'Plant basil and marigolds around the tomatoes.',
            isCorrect: true,
            feedback:
              'Excellent! Basil is known to repel tomato hornworms and whiteflies, while marigolds deter nematodes and other pests. This is a classic companion planting combination.',
            action: 'plant_seeds;add_beneficials:10',
          },
          {
            text: 'Plant corn next to them.',
            isCorrect: false,
            feedback:
              'This is not an ideal pairing. Both are heavy feeders, and corn can attract other pests like corn earworms.',
            action: 'fail_choice',
          },
          {
            text: 'Plant more tomatoes to ensure some survive.',
            isCorrect: false,
            feedback:
              'A monoculture is a magnet for pests. This lack of diversity will likely make your pest problem worse, not better.',
            action: 'set_pests:true',
          },
        ],
      },
      {
        level: 3,
        title: 'Aphid Infestation',
        description:
          'You find a cluster of aphids on your kale plants. The infestation is localized. What is your initial response?',
        choices: [
          {
            text: 'A strong jet of water from a hose.',
            isCorrect: true,
            feedback:
              'Simple, effective, and free! For a small infestation, this is often enough to dislodge the aphids without harming beneficials.',
            action: 'set_pests:false',
          },
          {
            text: 'Spray with a homemade soap solution.',
            isCorrect: true,
            feedback:
              "A good organic option. Insecticidal soap works by dissolving the aphid's outer protective layer. You proceed to the next challenge.",
            action: 'set_pests:false',
          },
          {
            text: "Do nothing, it's just a few bugs.",
            isCorrect: false,
            feedback:
              'Aphids reproduce incredibly quickly. A small problem has now become a major infestation, and they are spreading to other plants.',
            action: 'do_nothing_pests',
          },
        ],
      },
      {
        level: 4,
        title: 'Beneficial Insects',
        description:
          'The aphid problem persists, though it is under control. How can you establish a long-term, natural solution?',
        choices: [
          {
            text: 'Plant flowers like alyssum and dill to attract ladybugs and lacewings.',
            isCorrect: true,
            feedback:
              "Fantastic! You're creating a habitat for the natural predators of aphids. This \"biological control\" is a key to sustainable farming.",
            action: 'add_beneficials:30',
          },
          {
            text: 'Buy and release a box of ladybugs.',
            isCorrect: false,
            feedback:
              "While this can provide a temporary fix, they will fly away if you don't have the right habitat (flowers, water) for them. Building a habitat is the better long-term strategy.",
            action: 'add_beneficials:10',
          },
          {
            text: 'Continue spraying with soap every day.',
            isCorrect: false,
            feedback:
              "While organic, constant spraying can still stress the plant and is a sign that your garden ecosystem is out of balance.",
            action: 'fail_choice',
          },
        ],
      },
      {
        level: 5,
        title: 'Cabbage Worms',
        description:
          'You see beautiful white moths fluttering around your broccoli, and soon after, you find small green caterpillars eating the leaves.',
        choices: [
          {
            text: 'Use a floating row cover over the broccoli at the start of the season.',
            isCorrect: true,
            feedback:
              'Prevention is the best cure! A row cover acts as a physical barrier, preventing the moths from laying eggs on your plants in the first place.',
            action: 'set_pests:false',
          },
          {
            text: 'Spray with Bt (Bacillus thuringiensis).',
            isCorrect: true,
            feedback:
              'A great organic choice. Bt is a naturally occurring bacteria that specifically targets caterpillars and is harmless to other insects, animals, and humans.',
            action: 'set_pests:false',
          },
          {
            text: 'Hand-pick the caterpillars off the plants.',
            isCorrect: true,
            feedback:
              "Labor-intensive but 100% effective and organic if the infestation isn't too large. You get it under control.",
            action: 'set_pests:false',
          },
        ],
      },
      {
        level: 6,
        title: 'Ecosystem Harmony',
        description:
          'Your garden is thriving. You see ladybugs, bees, and spiders. You find a few chewed leaves, but no major infestations.',
        choices: [
          {
            text: 'Recognize this as a balanced ecosystem and continue monitoring.',
            isCorrect: true,
            feedback:
              "Congratulations! You've achieved the ultimate goal of organic pest control: a resilient, balanced ecosystem where pests are kept in check naturally. A few pests are part of the system, providing food for beneficials.",
            action: 'harvest',
          },
        ],
      },
    ],
  },
  {
    id: 'water-management',
    title: 'Water Management',
    description:
      'Learn to use water wisely to conserve resources and grow healthy plants.',
    levels: [
      {
        level: 1,
        title: 'System Selection',
        description:
          'You are setting up a new vegetable garden. Which irrigation system offers the highest water efficiency?',
        choices: [
          {
            text: 'Drip Irrigation system.',
            isCorrect: true,
            feedback:
              "Correct! Drip irrigation minimizes evaporation and runoff by delivering water directly to the plant's root zone, often saving 30-50% more water than sprinklers.",
            action: 'drip_irrigation',
          },
          {
            text: 'Overhead Sprinkler system.',
            isCorrect: false,
            feedback:
              'This is inefficient. A significant amount of water is lost to evaporation, especially on windy or hot days, and it can promote fungal diseases on leaves.',
            action: 'sprinkler',
          },
          {
            text: 'Hand watering with a hose and nozzle.',
            isCorrect: false,
            feedback:
              'While it can be targeted, hand watering is often inconsistent, time-consuming, and can lead to shallow watering, which encourages weak root systems.',
            action: 'set_water:-10',
          },
        ],
      },
      {
        level: 2,
        title: 'Timing is Everything',
        description:
          'You have your drip system installed. When is the most effective time of day to run it?',
        choices: [
          {
            text: 'Early morning (before 8 AM).',
            isCorrect: true,
            feedback:
              'Perfect. Watering in the cool morning hours minimizes evaporation and allows the water to soak in deeply before the sun gets hot. This is the most efficient time.',
            action: 'set_water:30',
          },
          {
            text: 'Mid-day (12 PM - 2 PM).',
            isCorrect: false,
            feedback:
              'This is the worst time. Evaporation is at its peak, and water droplets on leaves can act like magnifying glasses, scorching the plants.',
            action: 'set_water:-20;set_health:-10',
          },
          {
            text: 'Late evening (after 6 PM).',
            isCorrect: false,
            feedback:
              "This is better than mid-day, but leaving foliage wet overnight can create the perfect environment for fungal diseases like powdery mildew to develop.",
            action: 'set_health:-10',
          },
        ],
      },
      {
        level: 3,
        title: 'Conserving Soil Moisture',
        description:
          'A heatwave is forecasted. How can you help your soil retain moisture and protect your plants?',
        choices: [
          {
            text: 'Apply a 2-3 inch layer of organic mulch (straw, wood chips).',
            isCorrect: true,
            feedback:
              'Excellent move. Mulch acts like a sponge, soaking up water and releasing it slowly. It also insulates the soil, keeping roots cool and drastically reducing evaporation.',
            action: 'mulch:true',
          },
          {
            text: 'Just water more often.',
            isCorrect: false,
            feedback:
              'This is a temporary solution that wastes water. Without addressing evaporation, you are fighting a losing battle and risk creating shallow-rooted plants.',
            action: 'set_water:-20',
          },
          {
            text: 'Remove all surrounding plants to reduce competition.',
            isCorrect: false,
            feedback:
              'This exposes more bare soil to the sun, increasing overall soil temperature and evaporation. A diversity of plants can create a more resilient microclimate.',
            action: 'fail_choice',
          },
        ],
      },
      {
        level: 4,
        title: 'Reading the Plants',
        description:
          "It's been a few days since you last watered. How do you decide if it's time to water again?",
        choices: [
          {
            text: 'Check the soil moisture 2-4 inches below the surface.',
            isCorrect: true,
            feedback:
              "This is the most reliable method. If the soil is dry at that depth, it's time to water. This ensures you are watering based on the plant's actual needs.",
            action: 'set_water:20',
          },
          {
            text: 'Wait until the plants look wilted.',
            isCorrect: false,
            feedback:
              "Wilting is a sign of stress. While plants can recover, repeatedly waiting for this signal weakens them and reduces yield. It's better to be proactive.",
            action: 'set_health:-20',
          },
          {
            text: 'Stick to a strict schedule, like every other day.',
            isCorrect: false,
            feedback:
              "A rigid schedule doesn't account for weather changes (rain, heatwaves) or the plant's life stage. It often leads to over or under-watering.",
            action: 'fail_choice',
          },
        ],
      },
      {
        level: 5,
        title: 'Rainwater Harvesting',
        description:
          'The monsoon season is approaching. How can you leverage this natural resource for future use?',
        choices: [
          {
            text: 'Install rain barrels connected to rooftops and build swales on contour in the garden.',
            isCorrect: true,
            feedback:
              'Brilliant! You are now capturing and storing a free resource. Rain barrels provide stored water, and swales help rainwater infiltrate the soil slowly instead of running off.',
            action: 'set_water:30',
          },
          {
            text: 'Ensure your drainage system quickly removes all rainwater.',
            isCorrect: false,
            feedback:
              "You're treating a valuable resource as a waste product. Your goal should be to slow, spread, and sink rainwater into your landscape.",
            action: 'fail_choice',
          },
        ],
      },
      {
        level: 6,
        title: 'Water-Wise Harvest',
        description:
          'Your wise water management has paid off. Your plants are healthy and productive, and your water bill is low.',
        choices: [
          {
            text: 'Harvest your bountiful, efficiently-grown crops.',
            isCorrect: true,
            feedback:
              'Congratulations! You have demonstrated mastery of sustainable water management, a critical skill for any modern farmer.',
            action: 'harvest',
          },
        ],
      },
    ],
  },
  {
    id: 'agroforestry',
    title: 'Agroforestry Sim',
    description:
      'Integrate trees and crops to create a resilient, multi-layered farm ecosystem.',
    levels: [
      {
        level: 1,
        title: 'Initial Design',
        description:
          "You're converting a conventional field to an agroforestry system. What's your first move?",
        choices: [
          {
            text: 'Plant rows of nitrogen-fixing trees (like Gliricidia) with wide alleys for future crops.',
            isCorrect: true,
            feedback:
              "Excellent start! This 'alley cropping' system immediately begins improving soil fertility and creating a beneficial microclimate.",
            action: 'plant_cover_crop',
          },
          {
            text: 'Plant a dense forest of mixed trees.',
            isCorrect: false,
            feedback:
              'This will become a forest, not a farm. Agroforestry is about integrating trees WITH crops, not replacing them entirely.',
            action: 'fail_game',
          },
          {
            text: 'Plant a single row of fruit trees at the edge of the field.',
            isCorrect: false,
            feedback:
              "It's a start, but it's more of a windbreak than a true agroforestry system. The benefits will be minimal.",
            action: 'fail_choice',
          },
        ],
      },
      {
        level: 2,
        title: 'First Pruning',
        description:
          'Your nitrogen-fixing trees are growing vigorously. What do you do with them?',
        choices: [
          {
            text: 'Prune them and use the leafy branches as mulch for the crop alleys ("chop and drop").',
            isCorrect: true,
            feedback:
              "Perfect! You're recycling nutrients, suppressing weeds, and building organic matter right where your crops will need it.",
            action: 'mulch:true',
          },
          {
            text: 'Let them grow as tall as possible to maximize shade.',
            isCorrect: false,
            feedback:
              'Too much shade will prevent you from growing most sun-loving annual crops in the alleys.',
            action: 'fail_choice',
          },
          {
            text: 'Cut them down and sell them for firewood.',
            isCorrect: false,
            feedback:
              "You've removed a key component of your system! The idea is to manage them for continuous nutrient cycling.",
            action: 'set_health:-30',
          },
        ],
      },
      {
        level: 3,
        title: 'Understory Planting',
        description:
          'The trees are established. The alleys are mulched. What do you plant in the understory?',
        choices: [
          {
            text: 'A shade-tolerant crop like ginger or turmeric, which also enjoys the rich soil.',
            isCorrect: true,
            feedback:
              "A brilliant choice. You're stacking functions by choosing a crop that thrives in the specific microclimate you've created.",
            action: 'plant_seeds',
          },
          {
            text: 'Sun-loving corn.',
            isCorrect: false,
            feedback:
              "The corn struggles. It's too shaded by the established trees and can't reach its full potential.",
            action: 'set_health:-20',
          },
          {
            text: 'Nothing. Keep the alleys clear.',
            isCorrect: false,
            feedback:
              'A missed opportunity! The space is perfect for another layer of productivity in your system.',
            action: 'fail_choice',
          },
        ],
      },
      {
        level: 4,
        title: 'Adding Diversity',
        description:
          'Your system is functional but could be more diverse. What do you add?',
        choices: [
          {
            text: 'Introduce flowering shrubs along the tree lines to attract pollinators and beneficial insects.',
            isCorrect: true,
            feedback:
              'Yes! This increases resilience, provides pest control, and can even become another harvestable product.',
            action: 'add_beneficials:40',
          },
          {
            text: 'Pave the alleys for easier access.',
            isCorrect: false,
            feedback:
              'This destroys the soil you have worked so hard to build and removes productive space.',
            action: 'fail_game',
          },
        ],
      },
      {
        level: 5,
        title: 'Long-Term Yield',
        description:
          'Years later, your system is mature. The trees are providing nuts, the shrubs are providing berries, and the annual crops in the alleys are thriving.',
        choices: [
          {
            text: 'Harvest your diverse and resilient yields.',
            isCorrect: true,
            feedback:
              "Congratulations! You've built a complex, multi-layered agroforestry system that is productive, resilient, and ecologically sound.",
            action: 'harvest',
          },
        ],
      },
    ],
  },
  {
    id: 'crop-rotation',
    title: 'Crop Rotation Challenge',
    description:
      'Master the art of crop rotation to break pest cycles and manage soil nutrients.',
    levels: [
      {
        level: 1,
        title: 'Year 1: The Foundation',
        description:
          "You're planning a 4-year rotation for a single plot. What's a good crop to start with to build fertility?",
        choices: [
          {
            text: 'Legumes (Beans, Peas) - to fix nitrogen in the soil.',
            isCorrect: true,
            feedback:
              'A classic start! Legumes have a special relationship with bacteria that pulls nitrogen from the air and stores it in the soil.',
            action: 'set_nutrients_n:20;plant_seeds',
          },
          {
            text: 'Heavy Feeders (Corn, Tomatoes) - to get a big harvest right away.',
            isCorrect: false,
            feedback:
              "This will deplete your soil's existing nutrients, making the following years much harder. It's better to build fertility first.",
            action: 'set_nutrients_n:-20;plant_seeds',
          },
        ],
      },
      {
        level: 2,
        title: 'Year 2: Following the Legumes',
        description:
          'You just harvested your beans. The soil is now nitrogen-rich. What should you plant next to take advantage of this?',
        choices: [
          {
            text: 'Leafy Greens (Lettuce, Spinach) - they love nitrogen!',
            isCorrect: true,
            feedback:
              'Perfect! The nitrogen from the legumes will fuel vigorous, leafy growth for a fantastic harvest.',
            action: 'next_year;plant_seeds',
          },
          {
            text: 'More Legumes (Soybeans) - you can never have too much nitrogen.',
            isCorrect: false,
            feedback:
              "This isn't optimal. You're not taking advantage of the free nitrogen for a different crop, and you risk building up legume-specific pests and diseases.",
            action: 'fail_choice',
          },
        ],
      },
      {
        level: 3,
        title: 'Year 3: After the Greens',
        description:
          'The leafy greens have been harvested. The nitrogen is partially used up. What comes next in the sequence?',
        choices: [
          {
            text: 'Fruiting Crops (Tomatoes, Peppers) - they are heavy feeders and will use the remaining fertility.',
            isCorrect: true,
            feedback:
              'Good choice. They will thrive on the remaining nutrients and their different growth habit will help disrupt pest cycles.',
            action: 'next_year;plant_seeds',
          },
          {
            text: 'Root Crops (Carrots, Radishes) - they need loose soil.',
            isCorrect: false,
            feedback:
              "This is a valid choice, but fruiting crops are generally heavier feeders and will make better use of the available fertility at this stage.",
            action: 'fail_choice',
          },
        ],
      },
      {
        level: 4,
        title: 'Year 4: The Final Step',
        description: 'You just harvested the tomatoes. The soil has been worked hard for two years. What do you plant now?',
        choices: [
          {
            text: 'Root Crops (Carrots, Beets) - they break up soil and scavenge for deeper nutrients.',
            isCorrect: true,
            feedback: 'Excellent. Root crops will help improve soil structure, and they are generally light feeders, which is perfect for this stage.',
            action: 'next_year;plant_seeds',
          },
          {
            text: 'More Fruiting Crops (Squash) - let\'s get another big harvest!',
            isCorrect: false,
            feedback: 'The soil is too depleted for another round of heavy feeders. Your squash plants will be stunted and unproductive.',
            action: 'fail_choice',
          }
        ]
      },
       {
        level: 5,
        title: 'Completing the Cycle',
        description: 'You have completed the four-year rotation. The final step before starting over is critical.',
        choices: [
          {
            text: 'Plant a winter cover crop to rest and rejuvenate the soil before starting with legumes again.',
            isCorrect: true,
            feedback: 'Perfect! You have mastered the principles of crop rotation, ensuring long-term soil health and productivity.',
            action: 'harvest',
          },
          {
            text: 'Leave the field fallow (empty).',
            isCorrect: false,
            feedback: 'This leaves the soil exposed to erosion and does little to actively rebuild fertility.',
            action: 'fail_choice',
          }
        ]
      }
    ],
  },
   {
    id: 'weed-management',
    title: 'Weed Management',
    description: 'Learn sustainable and organic techniques to manage weeds effectively.',
    levels: [
      {
        level: 1,
        title: 'Pre-Emergent Strategy',
        description: 'You are preparing a bed for carrots, which are slow to germinate. How do you get a head start on weeds?',
        choices: [
          {
            text: 'Use the "stale seedbed" technique: prepare the bed, water it to sprout weeds, then kill them with shallow hoeing before planting.',
            isCorrect: true,
            feedback: 'A clever, proactive strategy! You\'ve eliminated the first flush of weeds, giving your carrots a clean start.',
            action: 'set_weeds:false',
          },
          {
            text: 'Cover the bed with black plastic for a few weeks before planting.',
            isCorrect: true,
            feedback: 'This "solarization" technique heats the soil, killing weed seeds and some pathogens. Very effective!',
            action: 'set_weeds:false',
          },
          {
            text: 'Spray a pre-emergent chemical herbicide.',
            isCorrect: false,
            feedback: 'This is not an organic method and can have long-lasting negative effects on soil life.',
            action: 'use_chemicals',
          }
        ]
      },
      {
        level: 2,
        title: 'Mulching',
        description: 'Your tomato plants are established. Weeds are starting to pop up between them. What\'s your move?',
        choices: [
          {
            text: 'Apply a thick layer of straw or wood chip mulch.',
            isCorrect: true,
            feedback: 'Excellent. Mulch blocks sunlight, preventing most weed seeds from germinating. It also conserves water and improves the soil.',
            action: 'mulch:true',
          },
          {
            text: 'Diligently pull every weed by hand every day.',
            isCorrect: false,
            feedback: 'While effective, this is extremely labor-intensive. A good mulch layer would save you hours of work.',
            action: 'fail_choice',
          },
           {
            text: 'Use a weed-whacker to cut them down.',
            isCorrect: false,
            feedback: 'This just trims the tops. The roots are left intact, and the weeds will grow back quickly, possibly stronger than before.',
            action: 'set_weeds:true',
          }
        ]
      },
      {
        level: 3,
        title: 'The Right Tool',
        description: 'Tiny thread-like weeds are emerging in your rows of lettuce. They are too small to pull. What tool do you use?',
        choices: [
          {
            text: 'A stirrup hoe (or hula hoe), used just below the surface to sever the weeds.',
            isCorrect: true,
            feedback: 'The perfect tool for the job! It allows you to quickly and easily eliminate weeds at this stage with minimal soil disturbance.',
            action: 'set_weeds:false',
          },
          {
            text: 'A large garden hoe, chopping deeply.',
            isCorrect: false,
            feedback: 'This is too aggressive. You risk damaging the shallow roots of your lettuce and bringing new weed seeds to the surface.',
            action: 'set_health:-10',
          },
          {
            text: 'A propane torch to flame-weed them.',
            isCorrect: false,
            feedback: 'Flame weeding can be effective, but it\'s risky this close to delicate lettuce plants. You might cook your crop!',
            action: 'set_health:-30',
          }
        ]
      },
      {
        level: 4,
        title: 'Living Mulch',
        description: 'You are growing tall corn. The space between the rows is bare and getting weedy. How can you use this space productively?',
        choices: [
          {
            text: 'Interplant a low-growing cover crop like clover.',
            isCorrect: true,
            feedback: 'Fantastic! The clover will act as a "living mulch," outcompeting weeds and fixing nitrogen for the corn at the same time.',
            action: 'plant_cover_crop',
          },
          {
            text: 'Cover the area with landscape fabric.',
            isCorrect: false,
            feedback: 'This will control weeds, but it\'s a missed opportunity to build soil and add biodiversity.',
            action: 'fail_choice',
          }
        ]
      },
       {
        level: 5,
        title: 'Weed-Free Harvest',
        description: 'Your integrated approach has kept weeds in check all season, allowing your crops to thrive without competition.',
        choices: [
          {
            text: 'Enjoy your clean and abundant harvest.',
            isCorrect: true,
            feedback: 'Congratulations! You have demonstrated a sophisticated understanding of organic weed management.',
            action: 'harvest',
          }
        ]
      }
    ]
  },
  {
    id: 'composting',
    title: 'Composting Masterclass',
    description: 'Learn to create nutrient-rich compost from farm and kitchen waste.',
    levels: [
      {
        level: 1,
        title: 'The Basic Recipe',
        description: 'To start a good compost pile, you need a balance of "Greens" (Nitrogen) and "Browns" (Carbon). What is a good ratio to start with?',
        choices: [
          {
            text: 'Roughly equal parts Greens and Browns by volume.',
            isCorrect: true,
            feedback: 'A great starting point! This provides a balanced diet for the microorganisms that will break down the material.',
            action: 'add_compost',
          },
          {
            text: 'All Greens (e.g., grass clippings, kitchen scraps).',
            isCorrect: false,
            feedback: 'Your pile will quickly become a slimy, smelly mess. Without Carbon, it will putrefy instead of compost.',
            action: 'fail_game',
          },
           {
            text: 'All Browns (e.g., dry leaves, wood chips).',
            isCorrect: false,
            feedback: 'Your pile will sit there for years without breaking down. The microbes need Nitrogen to fuel their work.',
            action: 'fail_choice',
          }
        ]
      },
      {
        level: 2,
        title: 'What NOT to Add',
        description: 'You are collecting materials for your pile. Which of these should you leave out?',
        choices: [
          {
            text: 'Meat, bones, and oily foods.',
            isCorrect: true,
            feedback: 'Correct. These materials can attract pests, create foul odors, and harbor pathogens. They are best avoided in a simple compost pile.',
            action: 'add_compost',
          },
          {
            text: 'Eggshells and coffee grounds.',
            isCorrect: false,
            feedback: 'These are excellent additions! Eggshells add calcium and coffee grounds are a great source of nitrogen.',
            action: 'fail_choice',
          }
        ]
      },
      {
        level: 3,
        title: 'Managing the Pile',
        description: 'Your pile is built. What are the two other key ingredients for successful composting?',
        choices: [
          {
            text: 'Water and Air.',
            isCorrect: true,
            feedback: 'Exactly! The pile should be as moist as a wrung-out sponge, and it needs to be turned occasionally to incorporate oxygen for the aerobic bacteria.',
            action: 'add_compost',
          },
          {
            text: 'Sunlight and Soil.',
            isCorrect: false,
            feedback: 'Compost piles can get hot on their own; direct sun can dry them out. While adding a bit of soil can introduce microbes, it\'s not essential like water and air.',
            action: 'fail_choice',
          },
        ]
      },
      {
        level: 4,
        title: 'Hot Composting',
        description: 'Your pile is getting hot in the center! This is a good sign. What does this heat do?',
        choices: [
          {
            text: 'It speeds up decomposition and kills weed seeds and pathogens.',
            isCorrect: true,
            feedback: 'Yes! This is the major advantage of a well-managed "hot" pile. It produces finished compost much faster and results in a safer, cleaner product.',
            action: 'add_compost',
          },
          {
            text: 'It means the pile is about to catch fire.',
            isCorrect: false,
            feedback: 'While compost can get very hot (up to 160°F/70°C), it\'s extremely rare for a backyard pile to spontaneously combust. It\'s a sign of vigorous microbial activity.',
            action: 'fail_choice',
          }
        ]
      },
       {
        level: 5,
        title: 'Finished Product',
        description: 'After several weeks, your pile has transformed. How do you know when the compost is ready to use?',
        choices: [
          {
            text: 'It is dark, crumbly, and smells earthy like a forest floor.',
            isCorrect: true,
            feedback: 'Perfect! You have successfully created "black gold" to enrich your soil.',
            action: 'harvest',
          },
          {
            text: 'It still has recognizable food scraps in it.',
            isCorrect: false,
            feedback: 'Not yet. If you can still see what you put in, it needs more time to break down.',
            action: 'fail_choice',
          }
        ]
      }
    ]
  }
];
