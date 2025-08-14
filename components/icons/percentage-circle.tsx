import React from "react";

interface PercentageCircleProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
}

const PercentageCircle: React.FC<PercentageCircleProps> = ({
  percentage,
  size = 29,
  strokeWidth = 2.5,
  color = "#FF3B30",
}) => {
  const trackColor = "rgba(255, 255, 255, 0.5)";
  const radius = (size - strokeWidth) / 2;

  const gradientStyle = {
    background: `conic-gradient(${color} ${percentage * 3.6}deg, transparent 0deg)`,
  };

  const maskImage = `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}"><circle cx="${size / 2}" cy="${size / 2}" r="${radius}" fill="none" stroke="white" stroke-width="${strokeWidth}" /></svg>')`;

  const maskStyle: React.CSSProperties = {
    maskImage: maskImage,
    WebkitMaskImage: maskImage,
    maskSize: "100% 100%",
    WebkitMaskSize: "100% 100%",
  };

  return (
    <div
      className="relative flex items-center justify-center"
      style={{
        width: `${size}px`,
        height: `${size}px`,
      }}
    >
      <div
        className="absolute w-full h-full"
        style={{
          backgroundColor: trackColor,
          ...maskStyle,
        }}
      ></div>

      <div
        className="absolute w-full h-full"
        style={{
          ...gradientStyle,
          ...maskStyle,
          transform: "rotate(-90deg)",
        }}
      ></div>

      <p className="z-10 text-xs font-semibold text-white">{percentage}</p>
    </div>
  );
};

export default PercentageCircle;
