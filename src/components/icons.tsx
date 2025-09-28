import type { SVGProps } from 'react';

export const Logo = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12 22c-2 0-4.5-1.5-4.5-5 0-2.5 1-4 3-5.5" />
    <path d="M12 22c2 0 4.5-1.5 4.5-5 0-2.5-1-4-3-5.5" />
    <path d="M15.5 11c-3.2 2.3-3.2 5.5 0 0" />
    <path d="M12 11.5V14" />
    <path d="M11 2c-2.3 2.3-3 5.5-1 8" />
    <path d="M13 2c2.3 2.3 3 5.5 1 8" />
  </svg>
);
