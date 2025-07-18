interface LocationMapProps {
  city: 'Fargo' | 'Lakeville';
}

const mapEmbedUrls = {
  Fargo: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d86663.13210427306!2d-96.8610729513672!3d46.864619700000005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x52c8cb8c1a176217%3A0x23c70624b4557763!2sFargo%2C%20ND!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus',
  Lakeville: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d90895.00844962231!2d-93.30847255136718!3d44.6659778!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87f617414524a299%3A0x92a5a5cac19f187!2sLakeville%2C%20MN!5e0!3m2!1sen!2sus!4v1700000000001!5m2!1sen!2sus',
};

export default function LocationMap({ city }: LocationMapProps) {
  return (
    <iframe
      src={mapEmbedUrls[city]}
      width="100%"
      height="100%"
      style={{ border: 0 }}
      allowFullScreen={false}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      title={`Map of ${city} location`}
    ></iframe>
  );
}
