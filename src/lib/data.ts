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
    id: 'crop-growth',
    title: 'Crop Growth Cycle',
    description: 'Learn the 5 stages of growing a healthy crop, from seed to harvest.',
    levels: [
      {
        level: 1,
        title: 'Level 1: Seed Selection',
        description: 'You are starting a new season. Which seeds will you choose for your land?',
        choices: [
          {
            text: 'Certified organic seeds from a reputable local supplier.',
            isCorrect: true,
            feedback: 'Great start! Certified seeds ensure quality and are adapted to local conditions.',
          },
          {
            text: 'Cheaper, uncertified seeds from an unknown online store.',
            isCorrect: false,
            feedback: 'Risky choice. Uncertified seeds may have poor germination rates or carry diseases.',
          },
          {
            text: 'Last year\'s leftover seeds stored in a damp shed.',
            isCorrect: false,
            feedback: 'Poor storage can ruin seeds. It\'s best to start with fresh, properly stored ones.',
          },
        ],
      },
      {
        level: 2,
        title: 'Level 2: Planting',
        description: 'It\'s time to plant your seeds. What\'s the best method?',
        choices: [
          {
            text: 'Plant seeds at the correct depth and spacing according to the seed packet.',
            isCorrect: true,
            feedback: 'Perfect! Proper spacing and depth give each plant the room and resources it needs to thrive.',
          },
          {
            text: 'Scatter all the seeds in one area to save time.',
            isCorrect: false,
            feedback: 'This will cause overcrowding. Plants will compete for sunlight, water, and nutrients, leading to a poor harvest.',
          },
          {
            text: 'Plant the seeds much deeper than recommended to protect them.',
            isCorrect: false,
            feedback: 'Planting too deep can prevent seedlings from reaching the surface and sunlight.',
          },
        ],
      },
      {
        level: 3,
        title: 'Level 3: Germination & Watering',
        description: 'Your seeds have sprouted! How will you water them?',
        choices: [
          {
            text: 'Water deeply but infrequently, allowing the soil to dry slightly between waterings.',
            isCorrect: true,
            feedback: 'Correct! This encourages deep root growth and makes plants more drought-resistant.',
          },
          {
            text: 'Water them a little bit every day.',
            isCorrect: false,
            feedback: 'Frequent, shallow watering can lead to weak, shallow roots.',
          },
          {
            text: 'Flood the field with as much water as possible.',
            isCorrect: false,
            feedback: 'Overwatering can drown the roots and lead to rot and disease.',
          },
        ],
      },
      {
        level: 4,
        title: 'Level 4: Growth & Care',
        description: 'Your plants are growing, but so are some weeds. What do you do?',
        choices: [
          {
            text: 'Remove weeds by hand or with a hoe.',
            isCorrect: true,
            feedback: 'Excellent organic practice! Removing weeds reduces competition for resources.',
          },
          {
            text: 'Apply a chemical weed killer.',
            isCorrect: false,
            feedback: 'Chemical herbicides are not permitted in organic farming and can harm your soil.',
          },
          {
            text: 'Let the weeds grow; they are also plants.',
            isCorrect: false,
            feedback: 'Weeds will steal vital nutrients, water, and sunlight from your crops, reducing your yield.',
          },
        ],
      },
      {
        level: 5,
        title: 'Level 5: Harvest',
        description: 'Your crops are ready! When is the best time to harvest?',
        choices: [
          {
            text: 'Harvest in the early morning when vegetables are cool and crisp.',
            isCorrect: true,
            feedback: 'You\'ve done it! Harvesting at the right time ensures the best flavor and shelf life. Congratulations on a successful season!',
          },
          {
            text: 'Harvest in the middle of a hot day.',
            isCorrect: false,
            feedback: 'Harvesting in heat can cause produce to wilt and lose quality.',
          },
          {
            text: 'Wait another month to see if they get bigger.',
            isCorrect: false,
            feedback: 'Waiting too long can result in overripe, woody, or bitter produce.',
          },
        ],
      },
    ],
  },
  {
    id: 'pest-control',
    title: 'Pest Control Challenge',
    description: 'Test your knowledge of organic pest control methods.',
    levels: [
      {
        level: 1,
        title: 'Pest Invasion!',
        description:
          'You notice small, yellow insects on the underside of your tomato plant leaves. They seem to be multiplying quickly. What is your first organic-approved action?',
        choices: [
          {
            text: 'Spray with a strong chemical pesticide.',
            isCorrect: false,
            feedback: 'Incorrect. Chemical pesticides are not allowed in organic farming and can harm beneficial insects.',
          },
          {
            text: 'Introduce ladybugs to the area.',
            isCorrect: true,
            feedback: 'Excellent choice! Ladybugs are natural predators of aphids and a great organic pest control method.',
          },
          {
            text: 'Ignore them and hope they go away.',
            isCorrect: false,
            feedback: 'Not a good idea. Pests can quickly destroy a crop if left unchecked.',
          },
        ],
      },
    ],
  },
  {
    id: 'water-management',
    title: 'Water Management',
    description: 'Learn how to use water efficiently on your farm.',
    levels: [
      {
        level: 1,
        title: 'Choosing an Irrigation System',
        description: 'You need to set up irrigation for your vegetable beds. Which system is most water-efficient?',
        choices: [
          {
            text: 'Drip irrigation system.',
            isCorrect: true,
            feedback: 'Correct! Drip irrigation delivers water directly to the plant roots, minimizing evaporation and saving water.',
          },
          {
            text: 'Overhead sprinklers.',
            isCorrect: false,
            feedback: 'Sprinklers can lose a lot of water to evaporation, especially on windy or hot days.',
          },
          {
            text: 'Watering by hand with a hose without a nozzle.',
            isCorrect: false,
            feedback: 'This method is often inefficient and can lead to overwatering or underwatering.',
          },
        ],
      },
    ],
  },
  {
    id: 'soil-health',
    title: 'Soil Health Sim',
    description: 'Discover how to build and maintain rich, healthy soil.',
    levels: [
      {
        level: 1,
        title: 'Improving Soil Structure',
        description: 'Your soil is hard and compacted. What is the best organic method to improve it for planting?',
        choices: [
          {
            text: 'Add compost and other organic matter.',
            isCorrect: true,
            feedback: 'Exactly! Compost improves soil structure, aeration, and nutrient content, making it a superfood for your soil.',
          },
          {
            text: 'Till the soil repeatedly until it is a fine powder.',
            isCorrect: false,
            feedback: 'Over-tilling can destroy soil structure and lead to erosion.',
          },
          {
            text: 'Add sand to the soil.',
            isCorrect: false,
            feedback: 'Adding sand to clay soil without enough organic matter can create a concrete-like substance. Compost is the key.',
          },
        ],
      },
    ],
  },
];
