import LocationMap from '@/components/location-map';
import { Phone, Mail, Clock } from 'lucide-react';

type Location = {
  name: string;
  address: string;
  phone: string;
  email: string;
  hours: string[];
  cityForMap: 'Fargo' | 'Lakeville';
};

export type LocationsSectionProps = {
  id: string;
  title: string;
  locations: Location[];
};

export function LocationsSection({ id, title, locations }: LocationsSectionProps) {
  return (
    <section data-studio-id={id} className="py-16 sm:py-24">
      <div className="container mx-auto px-4">
        <h2 data-studio-id={`${id}/title`} className="text-3xl font-bold mb-6">{title}</h2>
        <div data-studio-id={`${id}/locations`} data-studio-id-mode="reorder" className="space-y-12">
          {locations.map((location, index) => (
            <div key={index} data-studio-id={`${id}/locations/${index}`} className="grid sm:grid-cols-2 gap-8 items-center">
              <div>
                <h3 data-studio-id={`${id}/locations/${index}/name`} className="text-2xl font-bold mb-4">{location.name}</h3>
                <div className="space-y-3 text-muted-foreground">
                  <p data-studio-id={`${id}/locations/${index}/address`} dangerouslySetInnerHTML={{ __html: location.address.replace(/\n/g, '<br/>') }} />
                  <a href={`tel:${location.phone}`} className="flex items-center gap-3 hover:text-primary"><Phone size={16} /> <span data-studio-id={`${id}/locations/${index}/phone`}>{location.phone}</span></a>
                  <a href={`mailto:${location.email}`} className="flex items-center gap-3 hover:text-primary"><Mail size={16} /> <span data-studio-id={`${id}/locations/${index}/email`}>{location.email}</span></a>
                  <div className="flex items-start gap-3">
                    <Clock size={16} className="mt-1" />
                    <div data-studio-id={`${id}/locations/${index}/hours`} data-studio-id-mode="reorder">
                      <strong>Hours:</strong>
                      {location.hours.map((line, hourIndex) => (
                        <p key={hourIndex} data-studio-id={`${id}/locations/${index}/hours/${hourIndex}`}>{line}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="rounded-lg overflow-hidden shadow-lg h-64 sm:h-auto">
                <LocationMap city={location.cityForMap} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
