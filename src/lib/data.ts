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
    description: 'Discover how to build and maintain rich, healthy soil for your crops.',
    levels: [
      {
        level: 1,
        title: 'Stage 1: Assess Your Soil',
        description:
          'You\'re starting with a new plot of land. The soil looks compacted and lifeless. What is your first action to improve it?',
        choices: [
          {
            text: 'Add a thick layer of compost.',
            isCorrect: true,
            feedback:
              'Excellent choice! Compost is the best way to introduce organic matter, improve structure, and feed soil life.',
            action: 'add_compost',
          },
          {
            text: 'Till the soil aggressively.',
            isCorrect: false,
            feedback:
              'This can break up compaction temporarily but destroys the soil\'s natural structure and can lead to more problems.',
            action: 'till_soil',
          },
          {
            text: 'Do nothing and plant right away.',
            isCorrect: false,
            feedback: 'Planting in poor soil will lead to stunted growth and a disappointing harvest. Preparation is key!',
            action: 'do_nothing_soil',
          },
        ],
      },
      {
        level: 2,
        title: 'Stage 2: Planting',
        description:
          'Your soil is now rich with compost. It\'s time to plant. How do you proceed?',
        choices: [
          {
            text: 'Plant seeds at the appropriate depth and spacing.',
            isCorrect: true,
            feedback:
              'Perfect! Giving seeds the right conditions from the start helps ensure healthy germination and growth.',
            action: 'plant_seeds',
          },
          {
            text: 'Scatter all the seeds close together to save space.',
            isCorrect: false,
            feedback:
              'This will cause overcrowding, and your plants will struggle to get enough nutrients and sunlight, withering away.',
            action: 'plant_crowded',
          },
        ],
      },
      {
        level: 3,
        title: 'Stage 3: Harvest',
        description:
          'Thanks to your healthy soil, the plants have thrived. It\'s time to harvest your crops.',
        choices: [
          {
            text: 'Harvest the crops.',
            isCorrect: true,
            feedback:
              'Congratulations! Your focus on soil health has paid off with a bountiful, healthy harvest.',
            action: 'harvest',
          },
        ],
      },
    ],
  },
  {
    id: 'crop-growth',
    title: 'Crop Growth Cycle',
    description: 'Learn the 5 stages of growing a healthy crop, from seed to harvest.',
    levels: [
      {
        level: 1,
        title: 'Stage 1: Soil Preparation',
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
        title: 'Stage 2: Planting',
        description: 'Your soil is ready. How will you plant your certified organic seeds?',
        choices: [
          {
            text: 'Plant at the correct depth and spacing.',
            isCorrect: true,
            feedback: 'Perfect! This gives each plant the room and resources it needs to thrive.',
            action: 'plant_seeds',
          },
          {
            text: 'Plant the seeds much deeper than recommended to "protect" them.',
            isCorrect: false,
            feedback: 'Planting too deep can prevent seedlings from reaching the surface. They may not sprout.',
            action: 'plant_deep',
          },
        ],
      },
      {
        level: 3,
        title: 'Stage 3: Watering',
        description: 'Your seeds have been planted. How will you water them to encourage germination?',
        choices: [
          {
            text: 'Use a drip irrigation system for gentle, direct watering.',
            isCorrect: true,
            feedback: 'Excellent choice. Drip irrigation is efficient and prevents seeds from washing away. Your seeds have sprouted!',
            action: 'drip_irrigation',
          },
          {
            text: 'Flood the field to make sure they have plenty of water.',
            isCorrect: false,
            feedback: 'Oh no! You\'ve washed away the seeds and waterlogged the soil. The crop has failed.',
            action: 'flood',
          },
        ],
      },
      {
        level: 4,
        title: 'Stage 4: Weed Control',
        description: 'Your plants are growing, but so are weeds! What is the best organic approach?',
        choices: [
          {
            text: 'Remove weeds carefully by hand.',
            isCorrect: true,
            feedback: 'Great work! Removing weeds reduces competition for nutrients and water, allowing your crop to flourish.',
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
        title: 'Stage 5: Harvest',
        description: 'Your crops are mature and ready for picking. What do you do?',
        choices: [
          {
            text: 'Harvest the crops.',
            isCorrect: true,
            feedback: 'Success! You have successfully managed the crop from seed to harvest using sustainable practices.',
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
        title: 'Stage 1: First Sign of Trouble',
        description:
          'You spot a few aphids on your plants. The infestation is small. What is your first, proportional response?',
        choices: [
          {
            text: 'Introduce beneficial ladybugs.',
            isCorrect: true,
            feedback:
              'A perfect, targeted solution! Ladybugs are natural predators and will control the aphid population without chemicals.',
            action: 'add_ladybugs',
          },
          {
            text: 'Immediately spray with chemical pesticides.',
            isCorrect: false,
            feedback:
              'This is an overreaction for a small problem and harms the environment and your soil.',
            action: 'use_chemicals',
          },
          {
            text: 'Do nothing; it\'s only a few bugs.',
            isCorrect: false,
            feedback:
              'A small problem can quickly become a big one. The pests have multiplied, and your plant\'s growth is stunted.',
            action: 'do_nothing_pests',
          },
        ],
      },
      {
        level: 2,
        title: 'Stage 2: Harvest',
        description:
          'Thanks to your quick action with the ladybugs, your plants are healthy and pest-free.',
        choices: [
          {
            text: 'Harvest the crops.',
            isCorrect: true,
            feedback:
              'Congratulations! You\'ve successfully protected your crops using an eco-friendly method.',
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
        title: 'Stage 1: Choose Your System',
        description:
          'You need to irrigate your fields. Which system will you install for the most efficient water use?',
        choices: [
          {
            text: 'Install a drip irrigation system.',
            isCorrect: true,
            feedback:
              'Excellent! Drip irrigation delivers water directly to the roots, saving a huge amount of water compared to other methods.',
            action: 'drip_irrigation',
          },
          {
            text: 'Use high-volume overhead sprinklers.',
            isCorrect: false,
            feedback:
              'This method loses a lot of water to evaporation and is not very efficient. Your water level is lower than it could be.',
            action: 'sprinkler',
          },
        ],
      },
      {
        level: 2,
        title: 'Stage 2: Watering Schedule',
        description: 'Your drip system is in place. When is the best time to water your crops?',
        choices: [
          {
            text: 'Water early in the morning.',
            isCorrect: true,
            feedback: 'Correct! Watering in the morning reduces evaporation and allows the plants to absorb water before the heat of the day.',
            action: 'drip_irrigation',
          },
          {
            text: 'Water in the middle of the hot, windy afternoon.',
            isCorrect: false,
            feedback: 'This is the worst time to water. Much of your water will evaporate before it even reaches the plant roots.',
            action: 'fail_choice',
          },
        ],
      },
      {
        level: 3,
        title: 'Stage 3: Harvest',
        description:
          'By watering efficiently, you have conserved water and grown a healthy crop.',
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
