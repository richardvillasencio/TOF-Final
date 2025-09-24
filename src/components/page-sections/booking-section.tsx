
'use client';

import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, User, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

export function BookingSection() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('15 Mins');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
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
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const formatDate = (date: Date) => {
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
            
            <h1 className="text-6xl font-bold bg-gradient-to-r from-slate-800 via-blue-800 to-slate-700 bg-clip-text text-transparent leading-tight">
              Schedule a Visit
            </h1>
            
            <div className="space-y-6">
              <p className="text-xl text-slate-600 leading-relaxed">
                <span className="text-slate-800 font-semibold">WE INVITE YOU TO COME</span> and take a{' '}
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent font-bold">TEST DIP</span>{' '}
                in one of our beautiful{' '}
                <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent font-bold">HOT TUBS</span>{'_'}
                to see why one is right for{' '}
                <span className="text-slate-800 font-semibold">YOUR HOME!</span>
              </p>
            </div>

            {/* Floating cards with stats */}
            <div className="flex gap-4 pt-4">
              {[
                { label: 'Premium Models', value: '50+', delay: '0s' },
                { label: 'Expert Guidance', value: '100%', delay: '0.2s' },
                { label: 'Customer Satisfaction', value: '99%', delay: '0.4s' }
              ].map((stat, index) => (
                <div 
                  key={index}
                  className="bg-white/50 backdrop-blur-lg rounded-xl p-4 border border-white/40 shadow-lg hover:bg-white/60 transition-all duration-300 hover:scale-105"
                  style={{ animationDelay: stat.delay }}
                >
                  <div className="text-2xl font-bold text-slate-800">{stat.value}</div>
                  <div className="text-sm text-slate-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Booking Interface */}
          <div className={`transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'}`}>
            <div className="bg-white/30 backdrop-blur-xl rounded-3xl p-8 border border-white/40 shadow-2xl hover:bg-white/40 transition-all duration-500">
              
              {/* Header */}
              <div className="flex items-center gap-3 mb-8">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-lg"></div>
                <h2 className="text-2xl font-bold text-slate-800">Book a showroom visit - Fargo Store</h2>
              </div>

              {/* Duration Selection */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <span className="text-slate-700 font-medium">Duration</span>
                </div>
                <div className="flex gap-2">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot}
                      onClick={() => setSelectedTime(slot)}
                      className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                        selectedTime === slot
                          ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg scale-105'
                          : 'bg-white/40 text-slate-700 hover:bg-white/60 hover:scale-102 border border-white/40'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              {/* Date Display */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <span className="text-slate-700 font-medium">Selected Date</span>
                </div>
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-3 border border-blue-200 shadow-sm">
                  <span className="text-slate-800 font-semibold">{formatDate(selectedDate)}</span>
                </div>
              </div>

              {/* Calendar */}
              <div className="mb-8">
                <div className="bg-white/20 rounded-xl p-4 border border-white/30 shadow-inner">
                  {/* Calendar Header */}
                  <div className="flex items-center justify-between mb-4">
                    <button
                      onClick={() => navigateMonth(-1)}
                      className="p-2 rounded-lg bg-white/30 hover:bg-white/50 transition-colors duration-200 border border-white/30"
                    >
                      <ChevronLeft className="w-4 h-4 text-slate-700" />
                    </button>
                    <h3 className="text-lg font-semibold text-slate-800">{monthName}</h3>
                    <button
                      onClick={() => navigateMonth(1)}
                      className="p-2 rounded-lg bg-white/30 hover:bg-white/50 transition-colors duration-200 border border-white/30"
                    >
                      <ChevronRight className="w-4 h-4 text-slate-700" />
                    </button>
                  </div>

                  {/* Calendar Grid */}
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
                              day.toDateString() === selectedDate.toDateString()
                                ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg scale-110'
                                : day.getTime() < new Date().setHours(0, 0, 0, 0)
                                ? 'text-slate-400 cursor-not-allowed'
                                : 'text-slate-700 hover:bg-white/50 hover:text-slate-800 hover:scale-105'
                            }`}
                            disabled={day.getTime() < new Date().setHours(0, 0, 0, 0)}
                          >
                            {day.getDate()}
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Location and Staff */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  <span className="text-slate-700 font-medium">America/Chicago (CDT)</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5 text-blue-600" />
                  <span className="text-blue-600 font-medium">Josh Flemmer</span>
                </div>
              </div>

              {/* Book Button */}
              <Link href="/booking" className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl active:scale-[0.98] group shadow-lg inline-block text-center">
                <span className="flex items-center justify-center gap-2">
                  <Sparkles className="w-5 h-5 group-hover:animate-spin transition-transform" />
                  Book Your Experience
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
