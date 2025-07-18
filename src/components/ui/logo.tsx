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
