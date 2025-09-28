import type { Produce } from '@/components/marketplace/produce-grid';
import type { Mission } from '@/components/dashboard/missions-card';
import type { Farmer } from '@/components/leaderboard/leaderboard-table';
import { Award, Leaf, Shield, Droplets } from 'lucide-react';
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
    rank: 1,
    name: 'Aarav Sharma',
    village: 'Namchi',
    xp: 1250,
    badge: Award,
  },
  {
    rank: 2,
    name: 'Priya Gurung',
    village: 'Gyalshing',
    xp: 1100,
    badge: Shield,
  },
  {
    rank: 3,
    name: 'Rohan Tamang',
    village: 'Mangan',
    xp: 1050,
    badge: Leaf,
  },
  {
    rank: 4,
    name: 'Anika Rai',
    village: 'Soreng',
    xp: 980,
  },
  {
    rank: 5,
    name: 'Vikram Chettri',
    village: 'Pakyong',
    xp: 950,
  },
];

export const marketplaceProduce: Produce[] = [
  { id: 'tomatoes', name: 'Organic Tomatoes', price: 'Rs 120/kg' },
  { id: 'carrots', name: 'Garden Carrots', price: 'Rs 80/kg' },
  { id: 'lettuce', name: 'Green Leaf Lettuce', price: 'Rs 150/kg' },
  { id: 'broccoli', name: 'Fresh Broccoli', price: 'Rs 180/kg' },
  { id: 'potatoes', name: 'Sikkim Potatoes', price: 'Rs 60/kg' },
  { id: 'corn', name: 'Sweet Corn', price: 'Rs 90/kg' },
];


export const simFarmGames: Game[] = [
  {
    id: 'soil-health',
    title: 'Soil Health Sim',
    description: 'Learn to build and maintain rich, healthy soil for your crops.',
    levels: [
      {
        level: 1,
        title: 'Initial Assessment',
        description: "You're starting with a new plot of land. The soil is compacted, pale, and shows signs of erosion. What's your foundational strategy?",
        choices: [
          {
            text: 'Add a thick layer of diverse compost.',
            isCorrect: true,
            feedback: 'Excellent! Compost adds vital organic matter, kick-starts microbial life, and improves soil structure immediately.',
            action: 'add_compost',
          },
          {
            text: 'Deep till the soil to loosen it up.',
            isCorrect: false,
            feedback: 'While it seems logical, deep tilling destroys the fragile soil ecosystem, breaks up fungal networks, and releases stored carbon. The soil structure is further weakened.',
            action: 'till_soil',
          },
          {
            text: 'Apply a high-nitrogen chemical fertilizer.',
            isCorrect: false,
            feedback: 'This is a short-term fix that does nothing for soil structure or long-term health. It can also harm microbial life.',
            action: 'use_chemicals',
          },
        ],
      },
      {
        level: 2,
        title: 'Cover Cropping',
        description: 'The main season is over. The field is bare. How will you protect and improve your soil during the off-season?',
        choices: [
          {
            text: 'Plant a diverse cover crop mix (e.g., clover, vetch, rye).',
            isCorrect: true,
            feedback: 'A superb choice. The mix of legumes (clover, vetch) will fix atmospheric nitrogen, while the rye will add significant biomass and prevent erosion. This is a powerful soil-building technique.',
            action: 'plant_cover_crop',
          },
          {
            text: 'Leave the soil bare to "rest".',
            isCorrect: false,
            feedback: 'Bare soil is vulnerable. Wind and rain will erode your precious topsoil, and without living roots, the soil biology will suffer.',
            action: 'set_health:-20',
          },
           {
            text: 'Cover the field with a plastic tarp.',
            isCorrect: false,
            feedback: 'This prevents erosion but suffocates the soil, killing beneficial organisms and halting the natural processes that build fertility.',
            action: 'set_health:-10',
          },
        ],
      },
      {
        level: 3,
        title: 'Incorporating Cover Crops',
        description: "It's time to prepare for the main planting season. Your cover crop is lush and tall. What do you do?",
        choices: [
            {
                text: 'Use a roller-crimper to flatten the cover crop, creating a natural mulch.',
                isCorrect: true,
                feedback: 'Advanced technique! This "green manure" method smothers weeds, conserves water, and slowly releases nutrients as it decomposes. You plant directly into the mulch.',
                action: 'mulch:true'
            },
            {
                text: 'Till the cover crop into the soil.',
                isCorrect: false,
                feedback: 'This is a common method, but it still involves tilling, which disturbs the soil life you\'ve worked to build. Some benefit is lost.',
                action: 'set_health:-5'
            },
            {
                text: 'Cut and remove the cover crop for animal feed.',
                isCorrect: false,
                feedback: 'While you get feed, you\'re removing all the valuable organic matter and nutrients from the field. The primary soil-building benefit is lost.',
                action: 'set_nutrients_n:-20'
            }
        ]
      },
       {
        level: 4,
        title: 'Nutrient Management',
        description: 'You\'ve planted your main crop (heavy-feeding tomatoes) into the mulch. Mid-season, the lower leaves start to yellow. What\'s your diagnosis and action?',
        choices: [
            {
                text: 'It\'s likely a nitrogen deficiency. Top-dress with a nitrogen-rich amendment like feather meal or well-rotted chicken manure.',
                isCorrect: true,
                feedback: 'Correct diagnosis and action. Heavy feeders need a mid-season boost, and using a slow-release organic source feeds the soil and the plant.',
                action: 'add_npk'
            },
            {
                text: 'The plants need more water.',
                isCorrect: false,
                feedback: 'While possible, the mulch is already helping conserve water. The specific yellowing pattern strongly points to a nutrient issue. The problem persists.',
                action: 'fail_choice'
            },
            {
                text: 'Spray the leaves with a liquid chemical fertilizer.',
                isCorrect: false,
                feedback: 'This is a "foliar feeding" shortcut. It might green up the leaves temporarily but does not address the root cause in the soil and is not a sustainable organic practice.',
                action: 'use_chemicals'
            }
        ]
      },
      {
        level: 5,
        title: 'Post-Harvest',
        description: 'You\'ve had a great harvest! What do you do with the tomato plant residues?',
        choices: [
            {
                text: 'Chop them and leave them on the surface to decompose, or add to a compost pile.',
                isCorrect: true,
                feedback: 'Excellent! You\'re returning organic matter and nutrients back to the soil, completing the cycle and building fertility for next year.',
                action: 'add_compost'
            },
            {
                text: 'Pull everything out and burn it to prevent disease.',
                isCorrect: false,
                feedback: 'This is an extreme measure. You\'re removing all that valuable biomass and releasing carbon into the atmosphere. Only do this if there was a severe, non-compostable disease.',
                action: 'fail_choice'
            }
        ]
      },
      {
        level: 6,
        title: 'Sustainable Success',
        description: 'Years of focusing on soil health have paid off. Your soil is dark, crumbly, and full of life. It holds water well and provides most of the nutrients your crops need.',
        choices: [
            {
                text: 'Continue the cycle of composting and cover cropping.',
                isCorrect: true,
                feedback: 'You have mastered the art of soil stewardship. This is the foundation of a truly resilient and productive organic farm.',
                action: 'harvest'
            }
        ]
      }
    ],
  },
  {
    id: 'crop-growth',
    title: 'Crop Growth Cycle',
    description: 'Learn the stages of growing a healthy crop, from seed to harvest.',
    levels: [
      {
        level: 1,
        title: 'Soil Preparation',
        description: 'You are starting a new season. Your soil is unprepared. What is your first step?',
        choices: [
          {
            text: 'Prepare the soil by adding compost.',
            isCorrect: true,
            feedback: 'Great start! Healthy soil is the foundation of healthy plants.',
            action: 'add_compost',
          },
          {
            text: 'Till the soil until it is fine dust.',
            isCorrect: false,
            feedback: 'Over-tilling destroys soil structure and can lead to erosion. The soil becomes damaged.',
            action: 'till_soil',
          },
        ],
      },
      {
        level: 2,
        title: 'Planting',
        description: 'Your soil is ready. How will you plant your certified organic seeds?',
        choices: [
          {
            text: 'Plant at the correct depth and spacing.',
            isCorrect: true,
            feedback: 'Perfect! This gives each plant the room and resources it needs to thrive.',
            action: 'plant_seeds',
          },
          {
            text: 'Plant the seeds much deeper than recommended.',
            isCorrect: false,
            feedback: 'Planting too deep can prevent seedlings from reaching the surface. They may not sprout.',
            action: 'plant_deep',
          },
           {
            text: 'Plant the seeds very close together to maximize space.',
            isCorrect: false,
            feedback: 'Overcrowding leads to intense competition for light, water, and nutrients, resulting in stunted plants.',
            action: 'plant_crowded',
          },
        ],
      },
      {
        level: 3,
        title: 'Watering',
        description: 'Your seeds have sprouted. How will you water them to encourage strong root development?',
        choices: [
          {
            text: 'Use a drip irrigation system for gentle, deep watering.',
            isCorrect: true,
            feedback: 'Excellent! Drip irrigation is efficient and encourages roots to grow deep in search of water, making them more drought-resilient.',
            action: 'drip_irrigation',
          },
          {
            text: 'Flood the field to make sure they have plenty of water.',
            isCorrect: false,
            feedback: 'Oh no! You\'ve waterlogged the soil and drowned the young seedlings. The crop has failed.',
            action: 'flood',
          },
          {
            text: 'Lightly sprinkle with a hose every day.',
            isCorrect: false,
            feedback: 'This encourages shallow roots, making the plants weak and highly dependent on daily watering. They will suffer in dry conditions.',
            action: 'set_health:-15',
          },
        ],
      },
      {
        level: 4,
        title: 'Weed Control',
        description: 'Your plants are growing, but so are weeds! What is the best organic approach?',
        choices: [
          {
            text: 'Apply a thick layer of straw mulch around the plants.',
            isCorrect: true,
            feedback: 'Great strategy! Mulching smothers most weeds, conserves soil moisture, and keeps the soil cool.',
            action: 'mulch:true',
          },
          {
            text: 'Apply a strong chemical herbicide.',
            isCorrect: false,
            feedback: 'This is not an organic method! The chemicals have damaged your soil\'s health and killed beneficial organisms.',
            action: 'use_chemicals',
          },
           {
            text: 'Let the weeds grow; they provide ground cover.',
            isCorrect: false,
            feedback: 'The weeds are now out-competing your crop for water, sunlight, and nutrients. Your plants are stunted.',
            action: 'set_weeds:true',
          },
        ],
      },
        {
        level: 5,
        title: 'Pest Identification',
        description: 'You notice small holes in the leaves of your plants. What do you do first?',
        choices: [
          {
            text: 'Inspect the plants closely (under leaves, on stems) to identify the pest.',
            isCorrect: true,
            feedback: 'Correct. Proper identification is the first step to effective and targeted control. You find aphids.',
            action: 'set_pests:true',
          },
          {
            text: 'Spray a broad-spectrum organic pesticide immediately.',
            isCorrect: false,
            feedback: 'This might kill the pest, but it could also harm beneficial insects that could have controlled the pest naturally. It\'s better to identify first.',
            action: 'fail_choice',
          },
        ],
      },
       {
        level: 6,
        title: 'Pest Management',
        description: 'You\'ve found aphids. How do you handle them organically?',
        choices: [
          {
            text: 'Introduce ladybugs, a natural predator.',
            isCorrect: true,
            feedback: 'Excellent choice! The ladybugs are a biological control and will manage the aphid population without chemicals.',
            action: 'add_ladybugs',
          },
          {
            text: 'Ignore them. A few bugs won\'t hurt.',
            isCorrect: false,
            feedback: 'The aphid population exploded, stunting your plants\' growth and transmitting diseases. Your final harvest will be significantly reduced.',
            action: 'do_nothing_pests',
          },
        ],
      },
      {
        level: 7,
        title: 'Flowering & Fruiting',
        description: 'Your plants are beginning to flower. What do they need most at this stage?',
         choices: [
          {
            text: 'A fertilizer higher in Phosphorus (P) and Potassium (K).',
            isCorrect: true,
            feedback: 'Exactly! These nutrients are crucial for flower development and producing a strong harvest. You add some bone meal and kelp.',
            action: 'set_growth:4',
          },
          {
            text: 'A large dose of Nitrogen (N).',
            isCorrect: false,
            feedback: 'Too much nitrogen at this stage encourages lots of leafy growth at the expense of fruits and flowers. Your plants are bushy but not productive.',
            action: 'set_nutrients_n:100',
          },
        ],
      },
      {
        level: 8,
        title: 'Harvest',
        description: 'Your crops are mature and ready for picking. Your careful management has paid off.',
        choices: [
          {
            text: 'Harvest the crops.',
            isCorrect: true,
            feedback: 'Success! You have successfully managed the crop from seed to harvest.',
            action: 'harvest',
          },
        ],
      },
    ],
  },
  {
    id: 'pest-control',
    title: 'Pest Control Challenge',
    description: 'Practice identifying and managing common pests with organic methods.',
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
              'While this can work, it\'s expensive, labor-intensive, and prevents beneficial pollinating insects from reaching your crops.',
            action: 'fail_choice',
          },
        ],
      },
      {
        level: 2,
        title: 'Companion Planting',
        description: 'You are planting tomatoes. What can you plant alongside them to help repel pests like hornworms?',
        choices: [
            {
                text: 'Plant basil and marigolds around the tomatoes.',
                isCorrect: true,
                feedback: 'Excellent! Basil is known to repel tomato hornworms and whiteflies, while marigolds deter nematodes and other pests. This is a classic companion planting combination.',
                action: 'plant_seeds'
            },
            {
                text: 'Plant corn next to them.',
                isCorrect: false,
                feedback: 'This is not an ideal pairing. Both are heavy feeders, and corn can attract other pests like corn earworms.',
                action: 'fail_choice'
            },
            {
                text: 'Plant more tomatoes to ensure some survive.',
                isCorrect: false,
                feedback: 'A monoculture is a magnet for pests. This lack of diversity will likely make your pest problem worse, not better.',
                action: 'fail_choice'
            }
        ]
      },
      {
        level: 3,
        title: 'Aphid Infestation',
        description: 'You find a cluster of aphids on your kale plants. The infestation is localized. What is your initial response?',
        choices: [
          {
            text: 'A strong jet of water from a hose.',
            isCorrect: true,
            feedback: 'Simple, effective, and free! For a small infestation, this is often enough to dislodge the aphids without harming beneficials.',
            action: 'set_pests:false'
          },
          {
            text: 'Spray with a homemade soap solution.',
            isCorrect: true,
            feedback: 'A good organic option. Insecticidal soap works by dissolving the aphid\'s outer protective layer. You proceed to the next challenge.',
            action: 'set_pests:false'
          },
          {
            text: 'Do nothing, it\'s just a few bugs.',
            isCorrect: false,
            feedback: 'Aphids reproduce incredibly quickly. A small problem has now become a major infestation, and they are spreading to other plants.',
            action: 'do_nothing_pests'
          }
        ]
      },
      {
        level: 4,
        title: 'Beneficial Insects',
        description: 'The aphid problem persists, though it is under control. How can you establish a long-term, natural solution?',
        choices: [
            {
                text: 'Plant flowers like alyssum and dill to attract ladybugs and lacewings.',
                isCorrect: true,
                feedback: 'Fantastic! You\'re creating a habitat for the natural predators of aphids. This "biological control" is a key to sustainable farming.',
                action: 'add_beneficials:30'
            },
            {
                text: 'Buy and release a box of ladybugs.',
                isCorrect: false,
                feedback: 'While this can provide a temporary fix, they will fly away if you don\'t have the right habitat (flowers, water) for them. Building a habitat is the better long-term strategy.',
                action: 'add_beneficials:10'
            },
            {
                text: 'Continue spraying with soap every day.',
                isCorrect: false,
                feedback: 'While organic, constant spraying can still stress the plant and is a sign that your garden ecosystem is out of balance.',
                action: 'fail_choice'
            }
        ]
      },
      {
        level: 5,
        title: 'Cabbage Worms',
        description: 'You see beautiful white moths fluttering around your broccoli, and soon after, you find small green caterpillars eating the leaves.',
        choices: [
            {
                text: 'Use a floating row cover over the broccoli at the start of the season.',
                isCorrect: true,
                feedback: 'Prevention is the best cure! A row cover acts as a physical barrier, preventing the moths from laying eggs on your plants in the first place.',
                action: 'set_pests:false'
            },
            {
                text: 'Spray with Bt (Bacillus thuringiensis).',
                isCorrect: true,
                feedback: 'A great organic choice. Bt is a naturally occurring bacteria that specifically targets caterpillars and is harmless to other insects, animals, and humans.',
                action: 'set_pests:false'
            },
             {
                text: 'Hand-pick the caterpillars off the plants.',
                isCorrect: true,
                feedback: 'Labor-intensive but 100% effective and organic if the infestation isn\'t too large. You get it under control.',
                action: 'set_pests:false'
            }
        ]
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
    description: 'Learn to use water wisely to conserve resources and grow healthy plants.',
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
              'Correct! Drip irrigation minimizes evaporation and runoff by delivering water directly to the plant\'s root zone, often saving 30-50% more water than sprinklers.',
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
            action: 'set_water:40',
          },
        ],
      },
      {
        level: 2,
        title: 'Timing is Everything',
        description: 'You have your drip system installed. When is the most effective time of day to run it?',
        choices: [
          {
            text: 'Early morning (before 8 AM).',
            isCorrect: true,
            feedback: 'Perfect. Watering in the cool morning hours minimizes evaporation and allows the water to soak in deeply before the sun gets hot. This is the most efficient time.',
            action: 'set_water:80',
          },
          {
            text: 'Mid-day (12 PM - 2 PM).',
            isCorrect: false,
            feedback: 'This is the worst time. Evaporation is at its peak, and water droplets on leaves can act like magnifying glasses, scorching the plants.',
            action: 'set_water:30',
          },
          {
            text: 'Late evening (after 6 PM).',
            isCorrect: false,
            feedback: 'This is better than mid-day, but leaving foliage wet overnight can create the perfect environment for fungal diseases like powdery mildew to develop.',
            action: 'set_health:-10',
          },
        ],
      },
      {
        level: 3,
        title: 'Conserving Soil Moisture',
        description: 'A heatwave is forecasted. How can you help your soil retain moisture and protect your plants?',
        choices: [
            {
                text: 'Apply a 2-3 inch layer of organic mulch (straw, wood chips).',
                isCorrect: true,
                feedback: 'Excellent move. Mulch acts like a sponge, soaking up water and releasing it slowly. It also insulates the soil, keeping roots cool and drastically reducing evaporation.',
                action: 'mulch:true'
            },
            {
                text: 'Just water more often.',
                isCorrect: false,
                feedback: 'This is a temporary solution that wastes water. Without addressing evaporation, you are fighting a losing battle and risk creating shallow-rooted plants.',
                action: 'set_water:50'
            },
            {
                text: 'Remove all surrounding plants to reduce competition.',
                isCorrect: false,
                feedback: 'This exposes more bare soil to the sun, increasing overall soil temperature and evaporation. A diversity of plants can create a more resilient microclimate.',
                action: 'fail_choice'
            }
        ]
      },
      {
        level: 4,
        title: 'Reading the Plants',
        description: 'It\'s been a few days since you last watered. How do you decide if it\'s time to water again?',
        choices: [
            {
                text: 'Check the soil moisture 2-4 inches below the surface.',
                isCorrect: true,
                feedback: 'This is the most reliable method. If the soil is dry at that depth, it\'s time to water. This ensures you are watering based on the plant\'s actual needs.',
                action: 'set_water:60'
            },
            {
                text: 'Wait until the plants look wilted.',
                isCorrect: false,
                feedback: 'Wilting is a sign of stress. While plants can recover, repeatedly waiting for this signal weakens them and reduces yield. It\'s better to be proactive.',
                action: 'set_health:-20'
            },
            {
                text: 'Stick to a strict schedule, like every other day.',
                isCorrect: false,
                feedback: 'A rigid schedule doesn\'t account for weather changes (rain, heatwaves) or the plant\'s life stage. It often leads to over or under-watering.',
                action: 'fail_choice'
            }
        ]
      },
      {
        level: 5,
        title: 'Rainwater Harvesting',
        description: 'The monsoon season is approaching. How can you leverage this natural resource for future use?',
        choices: [
            {
                text: 'Install rain barrels connected to rooftops and build swales on contour in the garden.',
                isCorrect: true,
                feedback: 'Brilliant! You are now capturing and storing a free resource. Rain barrels provide stored water, and swales help rainwater infiltrate the soil slowly instead of running off.',
                action: 'set_water:100'
            },
            {
                text: 'Ensure your drainage system quickly removes all rainwater.',
                isCorrect: false,
                feedback: 'You\'re treating a valuable resource as a waste product. Your goal should be to slow, spread, and sink rainwater into your landscape.',
                action: 'fail_choice'
            }
        ]
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
];
