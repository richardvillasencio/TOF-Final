import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 50"
      width="150"
      height="37.5"
      {...props}
    >
      <rect width="200" height="50" fill="transparent" />
      <text
        x="10"
        y="35"
        fontFamily="Poppins, sans-serif"
        fontSize="30"
        fontWeight="bold"
        fill="hsl(var(--primary))"
      >
        TubClone
        <animate
          attributeName="fill"
          values="hsl(var(--primary));hsl(var(--secondary-foreground));hsl(var(--primary))"
          dur="3s"
          repeatCount="indefinite"
        />
      </text>
    </svg>
  );
}


export function TubsOfFunLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg 
      viewBox="0 0 280 60" 
      width="200"
      height="43"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <defs>
        <style>
          {`
            .tubs-text { font-family: 'Poppins', sans-serif; font-size: 40px; font-weight: bold; }
            .orange-text { fill: #e77931; }
            .blue-text { fill: #0077c8; }
            .ripple { fill: none; stroke: #ffffff; stroke-width: 2; }
          `}
        </style>
      </defs>

      <text x="0" y="45" className="tubs-text orange-text">Tubs</text>
      <text x="110" y="45" className="tubs-text blue-text">of</text>
      <text x="160" y="45" className="tubs-text orange-text">Fun!</text>
      
      <g transform="translate(132, 48)">
        <circle className="ripple" r="5" opacity="0.8">
          <animate attributeName="r" from="5" to="45" dur="2s" begin="0s" repeatCount="indefinite" />
          <animate attributeName="opacity" from="0.8" to="0" dur="2s" begin="0s" repeatCount="indefinite" />
        </circle>
        <circle className="ripple" r="5" opacity="0.8">
          <animate attributeName="r" from="5" to="45" dur="2s" begin="0.5s" repeatCount="indefinite" />
          <animate attributeName="opacity" from="0.8" to="0" dur="2s" begin="0.5s" repeatCount="indefinite" />
        </circle>
        <circle className="ripple" r="5" opacity="0.8">
          <animate attributeName="r" from="5" to="45" dur="2s" begin="1s" repeatCount="indefinite" />
          <animate attributeName="opacity" from="0.8" to="0" dur="2s" begin="1s" repeatCount="indefinite" />
        </circle>
      </g>
    </svg>
  );
}


export function TubbyLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 80 100"
      width="80"
      height="100"
      {...props}
    >
      <g>
        {/* Scarf */}
        <path fill="#C83C3C" d="M22.5,73.5c-3.3,0-6-2.7-6-6V54.3c0-3.3,2.7-6,6-6h35c3.3,0,6,2.7,6,6v13.2c0,3.3-2.7,6-6,6H22.5z"/>
        <path fill="#A53131" d="M57.5,73.5c3.3,0,6-2.7,6-6V54.3c0-1.6-0.6-3.1-1.8-4.2l-3.5-3.5c-1.2-1.2-3.1-1.2-4.2,0L50.2,50c-1.2,1.2-1.2,3.1,0,4.2l3.5,3.5c1.2,1.2,1.8,2.7,1.8,4.2V73.5z"/>

        {/* Body */}
        <path fill="#FFFFFF" d="M40,10C20.7,10,5,25.7,5,45v28.5c0,4.1,3.4,7.5,7.5,7.5h55c4.1,0,7.5-3.4,7.5-7.5V45C75,25.7,59.3,10,40,10z"/>
        <path fill="#F0F0F0" d="M75,45v28.5c0,4.1-3.4,7.5-7.5,7.5H40V10C59.3,10,75,25.7,75,45z"/>

        {/* Face */}
        <circle fill="#2C2C2C" cx="28" cy="35" r="5"/>
        <circle fill="#2C2C2C" cx="52" cy="35" r="5"/>
        <path fill="#FFC107" d="M40,50c-5,0-9-4-9-9s4-9,9-9s9,4,9,9S45,50,40,50z"/>
        <path fill="#E0A800" d="M40,32c5,0,9,4,9,9s-4,9-9,9V32z"/>
        <path fill="#2C2C2C" d="M40,43c-2.8,0-5-2.2-5-5s2.2-5,5-5s5,2.2,5,5S42.8,43,40,43z"/>
        <circle fill="#FFFFFF" cx="42" cy="36" r="1.5"/>

        {/* Hat */}
        <path fill="#005CB9" d="M58.5,23.5c-2.5-5.5-8.2-9-14.5-9H40c-6.4,0-12,3.5-14.5,9H15v10h50V23.5H58.5z"/>
        <path fill="#004C97" d="M40,14.5c6.4,0,12,3.5,14.5,9H65v10H40V14.5z"/>
        <circle fill="#FFC107" cx="40" cy="11" r="7"/>
        <path fill="#E0A800" d="M40,4c3.9,0,7,3.1,7,7s-3.1,7-7,7V4z"/>

         {/* Paws */}
        <path fill="#FFFFFF" d="M12.5,85 C5.6,85,0,79.4,0,72.5v-5C0,64.1,2.2,61,5,61h5c2.8,0,5,3.1,5,6.5v12C15,82.8,13.9,85,12.5,85z"/>
        <path fill="#F0F0F0" d="M12.5,85 C13.9,85,15,82.8,15,80v-12c0-3.4-2.2-6.5-5-6.5h-2.5v18.5C9.4,85,10.9,85,12.5,85z"/>
        <path fill="#FFFFFF" d="M67.5,85c7.9,0,12.5-5.6,12.5-12.5v-5c0-3.4-2.2-6.5-5-6.5h-5c-2.8,0-5,3.1-5,6.5v12C65,82.8,66.1,85,67.5,85z"/>
        <path fill="#F0F0F0" d="M67.5,85c-1.4,0-2.5-2.2-2.5-5v-12c0-3.4,2.2-6.5,5-6.5h2.5v18.5C70.6,85,69.1,85,67.5,85z"/>
        
      </g>
    </svg>
  );
}