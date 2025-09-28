import { config } from 'dotenv';
config();

import '@/ai/flows/generate-crop-recommendations.ts';
import '@/ai/flows/analyze-field-scan-for-problems.ts';
import '@/ai/flows/answer-agronomy-questions.ts';