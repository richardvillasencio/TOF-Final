
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, CheckCircle, Clock, ChevronLeft, ChevronRight, Sparkles, Calendar, MapPin, User, Phone, Mail } from 'lucide-react';
import { createBooking } from '@/ai/flows/booking-flow';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export default function BookingPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('15 Mins');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    // Set a default date for the first load if it's in the past
    const today = new Date();
    today.setHours(0,0,0,0);
    if (selectedDate < today) {
        setSelectedDate(today);
    }
  }, []);

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

  const formatDate = (date: Date | undefined) => {
    if (!date) return '';
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
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
            <Card className="w-full max-w-lg text-center shadow-2xl">
                <CardHeader>
                    <div className="mx-auto bg-green-100 rounded-full p-3 w-fit">
                        <CheckCircle className="h-10 w-10 text-green-600" />
                    </div>
                    <CardTitle className="mt-4">All Set!</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">Thank you for your booking request for {formatDate(selectedDate)}. We will send a confirmation to your email shortly. We look forward to seeing you!</p>
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-40 w-80 h-80 bg-slate-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-4rem)]">
          
          {/* Left Side - Hero Content */}
          <div className={`space-y-8 transform transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'}`}>
            <div className="inline-flex items-center gap-2 bg-white/40 backdrop-blur-md rounded-full px-4 py-2 border border-white/60 shadow-lg">
              <Sparkles className="w-4 h-4 text-blue-600 animate-pulse" />
              <span className="text-sm text-slate-700 font-medium">Premium Experience</span>
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-slate-800 via-blue-800 to-slate-700 bg-clip-text text-transparent leading-tight">
              Schedule a Visit
            </h1>
            
            <div className="space-y-4">
              <p className="text-lg lg:text-xl text-slate-600 leading-relaxed">
                <span className="text-slate-800 font-semibold">WE INVITE YOU TO COME</span> and take a{' '}
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent font-bold">TEST DIP</span>{' '}
                in one of our beautiful{' '}
                <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent font-bold">HOT TUBS</span>{' '}
                to see why one is right for{' '}
                <span className="text-slate-800 font-semibold">YOUR HOME!</span>
              </p>
            </div>
            
            <div className="bg-white/30 backdrop-blur-xl rounded-3xl p-6 border border-white/40 shadow-xl space-y-4">
                <div>
                  <Label htmlFor="name" className="font-semibold text-slate-700">Full Name</Label>
                  <Input id="name" placeholder="John Doe" value={name} onChange={e => setName(e.target.value)} disabled={isLoading} className="bg-white/60 border-slate-300" />
                </div>
                <div>
                  <Label htmlFor="email" className="font-semibold text-slate-700">Email</Label>
                  <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} disabled={isLoading} className="bg-white/60 border-slate-300"/>
                </div>
                <div>
                  <Label htmlFor="phone" className="font-semibold text-slate-700">Phone Number (Optional)</Label>
                  <Input id="phone" placeholder="(555) 123-4567" value={phone} onChange={e => setPhone(e.target.value)} disabled={isLoading} className="bg-white/60 border-slate-300"/>
                </div>
            </div>

          </div>

          {/* Right Side - Booking Interface */}
          <div className={`transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'}`}>
            <div className="bg-white/30 backdrop-blur-xl rounded-3xl p-8 border border-white/40 shadow-2xl hover:bg-white/40 transition-all duration-500">
              
              <div className="flex items-center gap-3 mb-6">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-lg"></div>
                <h2 className="text-2xl font-bold text-slate-800">Book a showroom visit - Fargo Store</h2>
              </div>

              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <span className="text-slate-700 font-medium">Duration</span>
                </div>
                <div className="flex gap-2">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot}
                      onClick={() => setSelectedTime(slot)}
                      className={`px-3 py-1.5 rounded-lg font-medium transition-all duration-300 text-sm ${
                        selectedTime === slot
                          ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg scale-105'
                          : 'bg-white/40 text-slate-700 hover:bg-white/60 hover:scale-102 border border-white/40'
                      }`}
                      disabled={isLoading}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <div className="bg-white/20 rounded-xl p-4 border border-white/30 shadow-inner">
                  <div className="flex items-center justify-between mb-4">
                    <button
                      onClick={() => navigateMonth(-1)}
                      className="p-2 rounded-lg bg-white/30 hover:bg-white/50 transition-colors duration-200 border border-white/30"
                      disabled={isLoading}
                    >
                      <ChevronLeft className="w-4 h-4 text-slate-700" />
                    </button>
                    <h3 className="text-lg font-semibold text-slate-800">{monthName}</h3>
                    <button
                      onClick={() => navigateMonth(1)}
                      className="p-2 rounded-lg bg-white/30 hover:bg-white/50 transition-colors duration-200 border border-white/30"
                      disabled={isLoading}
                    >
                      <ChevronRight className="w-4 h-4 text-slate-700" />
                    </button>
                  </div>

                  <div className="grid grid-cols-7 gap-1 mb-2">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                      <div key={day} className="text-center text-xs font-medium text-slate-600 py-2">
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
                                ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg scale-110'
                                : day.getTime() < new Date().setHours(0, 0, 0, 0)
                                ? 'text-slate-400 cursor-not-allowed'
                                : 'text-slate-700 hover:bg-white/50 hover:text-slate-800 hover:scale-105'
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

               <div className="space-y-4 mb-6">
                {error && (
                    <Alert variant="destructive" className="mb-4 bg-red-100/50 border-red-400">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Booking Error</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}
              </div>
              
              <Button onClick={handleBooking} className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl active:scale-[0.98] group shadow-lg h-auto" size="lg" disabled={isLoading}>
                <span className="flex items-center justify-center gap-2">
                  <Sparkles className="w-5 h-5 group-hover:animate-spin transition-transform" />
                   {isLoading ? 'Checking Availability...' : 'Book Your Experience'}
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
