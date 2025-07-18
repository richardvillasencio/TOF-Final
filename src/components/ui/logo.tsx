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
