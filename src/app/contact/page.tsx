import Image from 'next/image';
import { ContactForm } from '@/components/contact-form';
import LocationMap from '@/components/location-map';
import { Phone, Mail, Clock } from 'lucide-react';

export default function ContactPage() {
  return (
    <div>
      <section className="bg-primary text-primary-foreground py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold">Get In Touch</h1>
          <p className="mt-4 text-lg max-w-3xl mx-auto text-blue-100">We're here to help! Contact us with any questions or visit one of our showrooms.</p>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-3xl font-bold mb-2">Send Us a Message</h2>
              <p className="text-muted-foreground mb-6">Fill out the form below and we'll get back to you as soon as possible.</p>
              <ContactForm />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Locations</h2>
              <div className="space-y-12">
                {/* Fargo Location */}
                <div className="grid sm:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-2xl font-bold mb-4">Fargo, ND</h3>
                    <div className="space-y-3 text-muted-foreground">
                      <p>1234 Main St<br/>Fargo, ND 58103</p>
                      <a href="tel:701-234-7727" className="flex items-center gap-3 hover:text-primary"><Phone size={16} />(701) 234-7727</a>
                      <a href="mailto:fargo@tubclone.com" className="flex items-center gap-3 hover:text-primary"><Mail size={16} />fargo@tubclone.com</a>
                      <div className="flex items-start gap-3">
                        <Clock size={16} className="mt-1"/>
                        <div>
                            <strong>Hours:</strong><br/>
                            Mon-Fri: 9am - 6pm<br/>
                            Saturday: 10am - 4pm<br/>
                            Sunday: Closed
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-lg overflow-hidden shadow-lg h-64 sm:h-auto">
                    <LocationMap city="Fargo" />
                  </div>
                </div>

                {/* Lakeville Location */}
                <div className="grid sm:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-2xl font-bold mb-4">Lakeville, MN</h3>
                    <div className="space-y-3 text-muted-foreground">
                      <p>5678 Market Ave<br/>Lakeville, MN 55044</p>
                      <a href="tel:952-435-4096" className="flex items-center gap-3 hover:text-primary"><Phone size={16} />(952) 435-4096</a>
                      <a href="mailto:lakeville@tubclone.com" className="flex items-center gap-3 hover:text-primary"><Mail size={16} />lakeville@tubclone.com</a>
                      <div className="flex items-start gap-3">
                        <Clock size={16} className="mt-1"/>
                        <div>
                            <strong>Hours:</strong><br/>
                            Mon-Fri: 10am - 7pm<br/>
                            Saturday: 10am - 5pm<br/>
                            Sunday: 12pm - 4pm
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-lg overflow-hidden shadow-lg h-64 sm:h-auto">
                    <LocationMap city="Lakeville" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
