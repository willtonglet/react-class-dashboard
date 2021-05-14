import React, { useEffect, useState } from "react";
import { StyledProgress } from "./styles";

export interface ProgressProps {
  size: number;
  progress: number | string;
  strokeWidth: number;
  circleOneStroke?: string;
  circleTwoStroke?: string;
}

const Progress = (props: ProgressProps) => {
  const {
    size,
    progress,
    strokeWidth,
    circleOneStroke = "#e5e7eb",
    circleTwoStroke = "#2563eb",
  } = props;
  const [offset, setOffset] = useState(0);

  const center = size / 2;
  const radius = size / 2 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    const progressOffset = ((100 - Number(progress)) / 100) * circumference;
    setOffset(progressOffset);
  }, [setOffset, progress, circumference, offset]);

  return (
    <StyledProgress width={size} height={size}>
      <circle
        className="svg-circle-bg"
        stroke={circleOneStroke}
        cx={center}
        cy={center}
        r={radius}
        strokeWidth={strokeWidth}
      />
      <circle
        className="svg-circle"
        stroke={circleTwoStroke}
        cx={center}
        cy={center}
        r={radius}
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset.toString()}
      />
      <text
        x={`${center}`}
        y={`${center + 4}`}
        className="svg-circle-text fill-current dark:text-white"
      >
        {progress}%
      </text>
    </StyledProgress>
  );
};

export default Progress;
