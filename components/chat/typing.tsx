"use client";

export interface TypingProps {
  size?: "small" | "medium" | "large";
}

const SIZE_CONFIG = {
  small: {
    width: 30,
    height: 16,
    viewBox: "0 0 30 16",
    circleRadius: 2.5,
    circlePositions: [5, 15, 25],
    centerY: 8,
  },
  medium: {
    width: 38,
    height: 20,
    viewBox: "0 0 38 20",
    circleRadius: 3.5,
    circlePositions: [6.5, 19, 31.5],
    centerY: 10,
  },
  large: {
    width: 46,
    height: 24,
    viewBox: "0 0 46 24",
    circleRadius: 4,
    circlePositions: [8, 24, 40],
    centerY: 12,
  },
} as const;

export function Typing({ size = "large" }: TypingProps) {
  const config = SIZE_CONFIG[size];

  return (
    <svg
      width={config.width}
      height={config.height}
      viewBox={config.viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx={config.circlePositions[0]}
        cy={config.centerY}
        r={config.circleRadius}
        fill="#888"
      >
        <animate
          attributeName="cy"
          values={`${config.centerY};${config.centerY - 4};${config.centerY}`}
          dur="0.6s"
          repeatCount="indefinite"
          begin="0s"
        />
      </circle>
      <circle
        cx={config.circlePositions[1]}
        cy={config.centerY}
        r={config.circleRadius}
        fill="#888"
      >
        <animate
          attributeName="cy"
          values={`${config.centerY};${config.centerY - 4};${config.centerY}`}
          dur="0.6s"
          repeatCount="indefinite"
          begin="0.2s"
        />
      </circle>
      <circle
        cx={config.circlePositions[2]}
        cy={config.centerY}
        r={config.circleRadius}
        fill="#888"
      >
        <animate
          attributeName="cy"
          values={`${config.centerY};${config.centerY - 4};${config.centerY}`}
          dur="0.6s"
          repeatCount="indefinite"
          begin="0.4s"
        />
      </circle>
    </svg>
  );
}
