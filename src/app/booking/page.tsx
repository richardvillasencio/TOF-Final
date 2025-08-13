
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, CheckCircle, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { createBooking } from '@/ai/flows/booking-flow';

export default function BookingPage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('15 Mins');
  const timeSlots = ['15 Mins', '30 Mins', '45 Mins', '60 Mins'];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const navigateMonth = (direction: number) => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(currentMonth.getMonth() + direction);
    setCurrentMonth(newMonth);
  };
  
  const days = getDaysInMonth(currentMonth);
  const monthName = currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

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

    try {
      const result = await createBooking({
        name,
        email,
        phone,
        selectedDate: selectedDate.toISOString(),
      });

      if (result.success) {
        setIsSuccess(true);
        toast({
          title: 'Booking Request Sent!',
          description: result.message,
        });
      } else {
        throw new Error(result.message);
      }

    } catch (err: any) {
        const errorMessage = err.message || 'An unexpected error occurred.';
        setError(errorMessage);
        toast({
            title: 'Booking Failed',
            description: errorMessage,
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
      <Card className="max-w-4xl mx-auto shadow-2xl">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-3">
             <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-lg"></div>
             Book a showroom visit - Fargo Store
          </CardTitle>
          <CardDescription>
            Choose a date and time that works for you. We look forward to seeing you!
          </CardDescription>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Your Details</h3>
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
             <div className="pt-4">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-5 h-5 text-primary" />
                  <span className="text-card-foreground font-medium">Visit Duration</span>
                </div>
                <div className="flex gap-2">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot}
                      onClick={() => setSelectedTime(slot)}
                      className={`px-3 py-1.5 rounded-lg font-medium transition-all duration-300 text-sm ${
                        selectedTime === slot
                          ? 'bg-primary text-primary-foreground shadow-md scale-105'
                          : 'bg-muted text-muted-foreground hover:bg-secondary'
                      }`}
                      disabled={isLoading}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
          </div>
          
           <div>
            <div className="bg-muted/50 rounded-xl p-4 border shadow-inner">
                {/* Calendar Header */}
                <div className="flex items-center justify-between mb-4">
                <button
                    onClick={() => navigateMonth(-1)}
                    className="p-2 rounded-lg hover:bg-muted-foreground/10 transition-colors duration-200"
                    disabled={isLoading}
                >
                    <ChevronLeft className="w-4 h-4 text-card-foreground" />
                </button>
                <h3 className="text-lg font-semibold text-card-foreground">{monthName}</h3>
                <button
                    onClick={() => navigateMonth(1)}
                    className="p-2 rounded-lg hover:bg-muted-foreground/10 transition-colors duration-200"
                    disabled={isLoading}
                >
                    <ChevronRight className="w-4 h-4 text-card-foreground" />
                </button>
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-1 mb-2">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                    <div key={day} className="text-center text-xs font-medium text-muted-foreground py-2">
                    {day}
                    </div>
                ))}
                </div>
                
                <div className="grid grid-cols-7 gap-1">
                {days.map((day, index) => (
                    <div key={index} className="h-10 flex items-center justify-center">
                    {day && (
                        <button
                        onClick={() => setSelectedDate(day)}
                        className={`w-8 h-8 rounded-lg text-sm font-medium transition-all duration-200 ${
                            selectedDate && day.toDateString() === selectedDate.toDateString()
                            ? 'bg-primary text-primary-foreground shadow-lg scale-110'
                            : day.getTime() < new Date().setHours(0, 0, 0, 0)
                            ? 'text-muted-foreground/50 cursor-not-allowed'
                            : 'text-card-foreground hover:bg-muted-foreground/10 hover:text-card-foreground hover:scale-105'
                        }`}
                        disabled={isLoading || day.getTime() < new Date().setHours(0, 0, 0, 0)}
                        >
                        {day.getDate()}
                        </button>
                    )}
                    </div>
                ))}
                </div>
            </div>
            </div>
        </CardContent>
        <CardFooter className="flex-col items-stretch p-6 bg-muted/30">
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
