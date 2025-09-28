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
        title: 'Assess Your Soil',
        description:
          "You're starting with a new plot of land. The soil looks compacted and lifeless. What's your first action?",
        choices: [
          {
            text: 'Add a thick layer of compost.',
            isCorrect: true,
            feedback:
              'Excellent! Compost introduces organic matter, improves structure, and feeds soil life.',
            action: 'add_compost',
          },
          {
            text: 'Till the soil aggressively.',
            isCorrect: false,
            feedback:
              'This destroys the soil\'s natural structure and can cause more problems. Soil health has decreased.',
            action: 'till_soil',
          },
        ],
      },
      {
        level: 2,
        title: 'Cover Cropping',
        description: 'The main season is over. How will you protect your soil until the next planting?',
        choices: [
          {
            text: 'Plant a cover crop like clover.',
            isCorrect: true,
            feedback: 'Smart move! Cover crops prevent erosion, suppress weeds, and add organic matter when tilled back in.',
            action: 'set_growth:1',
          },
          {
            text: 'Leave the soil bare.',
            isCorrect: false,
            feedback: 'Bare soil is vulnerable to erosion from wind and rain, and nutrient loss. Soil health has taken a hit.',
            action: 'set_health:80',
          },
        ],
      },
      {
        level: 3,
        title: 'Nutrient Check',
        description: 'Your plants look a bit yellow. What could be the issue?',
        choices: [
            {
                text: 'It might be a Nitrogen deficiency.',
                isCorrect: true,
                feedback: 'Correct! Yellowing leaves (chlorosis) are a classic sign of nitrogen deficiency.',
                action: 'add_npk'
            },
            {
                text: 'They probably have too much water.',
                isCorrect: false,
                feedback: 'While possible, yellowing is more directly linked to nutrient issues. Your plants continue to struggle.',
                action: 'set_health:60'
            }
        ]
      },
       {
        level: 4,
        title: 'Feeding The Soil',
        description: 'You\'ve identified a nitrogen deficiency. How will you address it organically?',
        choices: [
            {
                text: 'Add a nitrogen-rich organic fertilizer like blood meal.',
                isCorrect: true,
                feedback: 'Perfect. You\'re feeding the soil and giving the plants the specific nutrient they need.',
                action: 'add_npk'
            },
            {
                text: 'Apply a generic chemical fertilizer.',
                isCorrect: false,
                feedback: 'This is not an organic approach and can harm the delicate soil ecosystem. Soil health is damaged.',
                action: 'use_chemicals'
            }
        ]
      },
      {
        level: 5,
        title: 'Crop Rotation',
        description: 'You\'ve harvested your leafy greens. What will you plant next in the same spot?',
        choices: [
            {
                text: 'Plant legumes like beans or peas.',
                isCorrect: true,
                feedback: 'Excellent rotation! Legumes are nitrogen-fixers; they will replenish the nitrogen that the leafy greens used up.',
                action: 'plant_seeds'
            },
            {
                text: 'Plant more leafy greens.',
                isCorrect: false,
                feedback: 'Planting the same crop repeatedly depletes specific nutrients and encourages pests and diseases.',
                action: 'fail_choice'
            }
        ]
      },
      {
        level: 6,
        title: 'Final Harvest',
        description: 'Thanks to your diligent soil management, your new crops are thriving.',
        choices: [
            {
                text: 'Harvest your healthy crops.',
                isCorrect: true,
                feedback: 'Success! Your focus on long-term soil health has resulted in a sustainable, productive farm.',
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
        ],
      },
      {
        level: 3,
        title: 'Watering',
        description: 'Your seeds have been planted. How will you water them to encourage germination?',
        choices: [
          {
            text: 'Use a drip irrigation system for gentle, direct watering.',
            isCorrect: true,
            feedback: 'Excellent! Drip irrigation is efficient and prevents seeds from washing away.',
            action: 'drip_irrigation',
          },
          {
            text: 'Flood the field to make sure they have plenty of water.',
            isCorrect: false,
            feedback: 'Oh no! You\'ve waterlogged the soil. The crop has failed.',
            action: 'flood',
          },
        ],
      },
      {
        level: 4,
        title: 'Weed Control',
        description: 'Your plants are growing, but so are weeds! What is the best organic approach?',
        choices: [
          {
            text: 'Remove weeds carefully by hand.',
            isCorrect: true,
            feedback: 'Great work! Removing weeds reduces competition for nutrients and water.',
            action: 'hand_weed',
          },
          {
            text: 'Apply a strong chemical herbicide.',
            isCorrect: false,
            feedback: 'This is not organic! The chemicals have damaged your soil\'s health.',
            action: 'use_chemicals',
          },
        ],
      },
        {
        level: 5,
        title: 'Pest Identification',
        description: 'You notice small holes in the leaves of your plants. What do you do first?',
        choices: [
          {
            text: 'Inspect the plants closely to identify the pest.',
            isCorrect: true,
            feedback: 'Correct. Proper identification is the first step to effective and targeted control.',
            action: 'set_pests:true',
          },
          {
            text: 'Spray a broad-spectrum organic pesticide immediately.',
            isCorrect: false,
            feedback: 'This might kill the pest, but it could also harm beneficial insects. Identification is key.',
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
            feedback: 'Excellent choice! The ladybugs will control the aphid population naturally.',
            action: 'add_ladybugs',
          },
          {
            text: 'Ignore them. A few bugs won\'t hurt.',
            isCorrect: false,
            feedback: 'The aphid population exploded, stunting your plants\' growth and reducing your final harvest.',
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
            text: 'Phosphorus (P) and Potassium (K) for flower and fruit development.',
            isCorrect: true,
            feedback: 'Exactly! These nutrients are crucial for producing a strong harvest.',
            action: 'set_growth:4',
          },
          {
            text: 'A large dose of Nitrogen (N).',
            isCorrect: false,
            feedback: 'Too much nitrogen at this stage encourages leafy growth at the expense of fruits and flowers.',
            action: 'fail_choice',
          },
        ],
      },
      {
        level: 8,
        title: 'Harvest',
        description: 'Your crops are mature and ready for picking. What do you do?',
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
        title: 'First Sign of Trouble',
        description:
          'You spot a few aphids on your plants. The infestation is small. What is your first response?',
        choices: [
          {
            text: 'Introduce beneficial ladybugs.',
            isCorrect: true,
            feedback:
              'A perfect, targeted solution! Ladybugs are natural predators and will control the aphid population.',
            action: 'add_ladybugs',
          },
          {
            text: 'Immediately spray with chemical pesticides.',
            isCorrect: false,
            feedback:
              'This is an overreaction and harms the environment and your soil. Soil health damaged.',
            action: 'use_chemicals',
          },
        ],
      },
      {
        level: 2,
        title: 'Companion Planting',
        description: 'Now that the aphids are gone, how can you help prevent them from coming back?',
        choices: [
            {
                text: 'Plant marigolds and garlic nearby.',
                isCorrect: true,
                feedback: 'Excellent idea! These plants are known to naturally repel many pests, including aphids.',
                action: 'set_growth:4'
            },
            {
                text: 'Do nothing, the ladybugs will handle it.',
                isCorrect: false,
                feedback: 'While ladybugs help, proactive prevention is a core part of organic pest management.',
                action: 'fail_choice'
            }
        ]
      },
      {
        level: 3,
        title: 'A New Threat',
        description: 'You notice a different kind of damage - large chunks eaten from leaves. You find a caterpillar.',
        choices: [
          {
            text: 'Hand-pick the caterpillars off the plants.',
            isCorrect: true,
            feedback: 'A simple but effective and completely organic solution for larger pests like caterpillars.',
            action: 'set_pests:false'
          },
          {
            text: 'Spray the whole crop with a strong pesticide.',
            isCorrect: false,
            feedback: 'Again, this is an overreaction that harms beneficial insects and your soil.',
            action: 'use_chemicals'
          }
        ]
      },
      {
        level: 4,
        title: 'Fungal Foe',
        description: 'After a few rainy days, you see a white, powdery substance on the leaves. It\'s powdery mildew.',
        choices: [
            {
                text: 'Spray with a mix of milk and water.',
                isCorrect: true,
                feedback: 'A surprising but effective organic fungicide! The proteins in milk have an antiseptic effect.',
                action: 'set_health:100'
            },
            {
                text: 'Remove the affected leaves and hope for the best.',
                isCorrect: false,
                feedback: 'This might slow it down, but the fungal spores have likely already spread. The mildew continues to grow.',
                action: 'do_nothing_pests'
            }
        ]
      },
      {
        level: 5,
        title: 'Attracting Pollinators',
        description: 'Your plants are healthy. How can you ensure a good fruit yield?',
        choices: [
            {
                text: 'Plant flowers like borage and lavender nearby.',
                isCorrect: true,
                feedback: 'Great! These flowers attract bees and other pollinators, which are essential for many crops to produce fruit.',
                action: 'set_growth:5'
            },
            {
                text: 'The wind will take care of pollination.',
                isCorrect: false,
                feedback: 'While some plants are wind-pollinated, many require insects. Actively attracting them is a better strategy.',
                action: 'fail_choice'
            }
        ]
      },
      {
        level: 6,
        title: 'Harvest',
        description:
          'Your integrated pest management strategy has worked! Your plants are healthy and ready for harvest.',
        choices: [
          {
            text: 'Harvest the crops.',
            isCorrect: true,
            feedback:
              "Congratulations! You've protected your crops using a variety of eco-friendly methods.",
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
        title: 'Choose Your System',
        description:
          'You need to irrigate your fields. Which system will you install for the most efficient water use?',
        choices: [
          {
            text: 'Install a drip irrigation system.',
            isCorrect: true,
            feedback:
              'Excellent! Drip irrigation delivers water directly to the roots, saving a huge amount of water.',
            action: 'drip_irrigation',
          },
          {
            text: 'Use high-volume overhead sprinklers.',
            isCorrect: false,
            feedback:
              'This method loses a lot of water to evaporation and is not very efficient.',
            action: 'sprinkler',
          },
        ],
      },
      {
        level: 2,
        title: 'Watering Schedule',
        description: 'Your drip system is in place. When is the best time to water your crops?',
        choices: [
          {
            text: 'Water early in the morning.',
            isCorrect: true,
            feedback: 'Correct! Watering in the morning reduces evaporation and allows plants to absorb water before the heat of the day.',
            action: 'set_water:70',
          },
          {
            text: 'Water in the middle of the hot, windy afternoon.',
            isCorrect: false,
            feedback: 'This is the worst time to water. Much of your water will evaporate before it reaches the plant roots.',
            action: 'set_water:30',
          },
        ],
      },
      {
        level: 3,
        title: 'Mulching',
        description: 'It\'s getting hot and the ground is drying out quickly. How can you conserve soil moisture?',
        choices: [
            {
                text: 'Apply a layer of straw or wood chip mulch.',
                isCorrect: true,
                feedback: 'Perfect. Mulch acts like a blanket, keeping the soil cool and reducing water evaporation.',
                action: 'mulch'
            },
            {
                text: 'Water more frequently.',
                isCorrect: false,
                feedback: 'This just uses more water and doesn\'t solve the underlying problem of evaporation.',
                action: 'set_water:40'
            }
        ]
      },
      {
        level: 4,
        title: 'Drought Conditions',
        description: 'There has been no rain for weeks and water is being rationed. Your plants are starting to wilt.',
        choices: [
            {
                text: 'Water deeply but less frequently.',
                isCorrect: true,
                feedback: 'This is the right strategy. It encourages plants to develop deeper roots, making them more resilient.',
                action: 'set_water:60'
            },
            {
                text: 'Give them a light sprinkle every day.',
                isCorrect: false,
                feedback: 'This encourages shallow roots, making the plants more vulnerable to drought in the long run.',
                action: 'set_health:60'
            }
        ]
      },
      {
        level: 5,
        title: 'Rainwater Harvesting',
        description: 'The monsoon is coming. How can you prepare to take advantage of the rain?',
        choices: [
            {
                text: 'Set up rain barrels and swales to capture and store rainwater.',
                isCorrect: true,
                feedback: 'Fantastic planning! Storing rainwater gives you a free, sustainable source of water for the dry season.',
                action: 'set_water:100'
            },
            {
                text: 'Hope your fields get enough water.',
                isCorrect: false,
                feedback: 'This is a missed opportunity to capture a valuable resource for later use.',
                action: 'fail_choice'
            }
        ]
      },
      {
        level: 6,
        title: 'Harvest',
        description:
          'By watering efficiently and planning ahead, you have conserved water and grown a healthy crop.',
        choices: [
          {
            text: 'Harvest the crops.',
            isCorrect: true,
            feedback:
              'Well done! Your smart water management has led to a successful harvest while conserving a precious resource.',
            action: 'harvest',
          },
        ],
      },
    ],
  },
];
