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
            .tubs-text { font-family: 'Poppins', sans-serif; font-size: 40px; font-weight: bold; fill: #e77931; }
            .fun-text { font-family: 'Poppins', sans-serif; font-size: 40px; font-weight: bold; fill: #e77931; }
            .ripple { fill: none; stroke: white; stroke-width: 2; }
          `}
        </style>
      </defs>

      <text x="0" y="40" className="tubs-text">Tubs of</text>
      <text x="155" y="40" className="fun-text">Fun!</text>
      
      <g transform="translate(180, 48)">
        <circle className="ripple" r="5">
          <animate attributeName="r" from="5" to="45" dur="2s" begin="0s" repeatCount="indefinite" />
          <animate attributeName="opacity" from="1" to="0" dur="2s" begin="0s" repeatCount="indefinite" />
        </circle>
        <circle className="ripple" r="5">
          <animate attributeName="r" from="5" to="45" dur="2s" begin="0.5s" repeatCount="indefinite" />
          <animate attributeName="opacity" from="1" to="0" dur="2s" begin="0.5s" repeatCount="indefinite" />
        </circle>
        <circle className="ripple" r="5">
          <animate attributeName="r" from="5" to="45" dur="2s" begin="1s" repeatCount="indefinite" />
          <animate attributeName="opacity" from="1" to="0" dur="2s" begin="1s" repeatCount="indefinite" />
        </circle>
      </g>
    </svg>
  );
}