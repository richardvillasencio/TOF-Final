
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, CheckCircle } from 'lucide-react';

export default function BookingPage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleBooking = async () => {
    if (!selectedDate || !name || !email) {
      toast({
        title: 'Missing Information',
        description: 'Please fill out your name, email, and select a date.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    setError(null);
    setIsSuccess(false);

    // This is where we will call our Firebase Function in the next step.
    // For now, we'll simulate the process.
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate a "not available" response for a specific day (e.g., all Tuesdays)
      if (selectedDate.getDay() === 2) {
        throw new Error('Sorry, that date is unavailable. Please choose another date.');
      }

      // If successful:
      setIsSuccess(true);
      toast({
        title: 'Booking Request Sent!',
        description: "We've received your request and will confirm via email shortly.",
      });

    } catch (err: any) {
        setError(err.message);
        toast({
            title: 'Booking Failed',
            description: err.message || 'An unexpected error occurred.',
            variant: 'destructive',
        });
    } finally {
        setIsLoading(false);
    }
  };
  
  if (isSuccess) {
    return (
        <div className="container mx-auto px-4 py-16 flex items-center justify-center min-h-[60vh]">
            <Card className="w-full max-w-lg text-center">
                <CardHeader>
                    <div className="mx-auto bg-green-100 rounded-full p-3 w-fit">
                        <CheckCircle className="h-10 w-10 text-green-600" />
                    </div>
                    <CardTitle className="mt-4">All Set!</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">Thank you for your booking request for {selectedDate?.toLocaleDateString()}. We will send a confirmation to your email shortly. We look forward to seeing you!</p>
                </CardContent>
                <CardFooter>
                     <Button className="w-full" onClick={() => {
                         setIsSuccess(false);
                         setName('');
                         setEmail('');
                         setPhone('');
                         setSelectedDate(new Date());
                     }}>Book Another Visit</Button>
                </CardFooter>
            </Card>
        </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Schedule a Showroom Visit</CardTitle>
          <CardDescription>
            Choose a date and time that works for you. We look forward to seeing you!
          </CardDescription>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" placeholder="John Doe" value={name} onChange={e => setName(e.target.value)} disabled={isLoading} />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} disabled={isLoading}/>
            </div>
            <div>
              <Label htmlFor="phone">Phone Number (Optional)</Label>
              <Input id="phone" placeholder="(555) 123-4567" value={phone} onChange={e => setPhone(e.target.value)} disabled={isLoading}/>
            </div>
          </div>
          <div className="flex justify-center">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border"
              disabled={isLoading}
            />
          </div>
        </CardContent>
        <CardFooter className="flex-col items-stretch">
            {error && (
                <Alert variant="destructive" className="mb-4">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Booking Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}
            <Button onClick={handleBooking} className="w-full" size="lg" disabled={isLoading}>
                {isLoading ? 'Checking Availability...' : 'Request Booking'}
            </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
