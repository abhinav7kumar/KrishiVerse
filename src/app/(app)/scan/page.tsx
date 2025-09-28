import { FieldScanner } from '@/components/scan/field-scanner';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ScanLine } from 'lucide-react';

export default function ScanPage() {
  return (
    <div className="mx-auto max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-headline text-3xl">
            <ScanLine className="h-8 w-8 text-primary" />
            AI-Powered Farm Scan
          </CardTitle>
          <CardDescription>
            Upload a photo of your crop to detect pests, diseases, and
            deficiencies in real-time.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FieldScanner />
        </CardContent>
      </Card>
    </div>
  );
}
