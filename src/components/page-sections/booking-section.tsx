
'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';

export function BookingSection() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <section className="relative py-24 bg-cover bg-center" style={{ backgroundImage: "url('https://placehold.co/1920x800.png')" }} data-ai-hint="couple relaxing outdoors">
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="relative container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Schedule a Visit</h2>
            <p className="text-lg max-w-md">
              WE INVITE YOU TO COME and take a <b className="font-bold">TEST DIP</b> in one of our beautiful <b className="font-bold">HOT TUBS</b> to see why one is right for <b className="font-bold">YOUR HOME!</b>
            </p>
          </div>
          <div>
            <Card className="overflow-hidden shadow-2xl">
              <CardContent className="p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="w-full bg-background"
                />
              </CardContent>
            </Card>
            <Button className="w-full mt-4 text-lg py-6" variant="accent">
                Book Now
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
