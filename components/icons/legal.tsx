import React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
}

export const RegalIcon: React.FC<IconProps> = ({ size = 24, className, color, ...props }) => {
  return (
    <svg
      width={size}
      height={size + 1}
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={color ? { color } : undefined}
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.6427 6.54098C13.6427 5.7893 13.0361 5.18164 12.2857 5.18164C11.5363 5.18164 10.9297 5.7893 10.9297 6.54098C10.9297 7.29074 11.5363 7.89939 12.2857 7.89939C13.0361 7.89939 13.6427 7.29074 13.6427 6.54098Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.9546 6.76269L4.15234 7.89839M20.4268 5.17773L13.6245 6.31343"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.44531 20.8379H19.1284"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.47656 18.3423H15.1019M12.2892 18.3423V7.90039"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.875 14.8968L6.43087 9.65137L9.01645 14.8968C7.5157 16.9637 4.84867 16.7928 3.875 14.8968Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.9844 12.9202L18.5402 7.6748L21.1258 12.9202C19.6251 14.9861 16.958 14.8162 15.9844 12.9202Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
