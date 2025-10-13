"use client";
import { useState, useRef, useEffect } from "react";

type Position = "top" | "bottom" | "left" | "right";

type Props = {
  text: string;
  position?: Position;
  children: React.ReactNode;
};

const DynamicTooltip = ({ text, position = "top", children }: Props) => {
  const [visible, setVisible] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const parentRef = useRef<HTMLDivElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);

  const calculatePosition = () => {
    if (!parentRef.current || !tooltipRef.current) return;

    const parentRect = parentRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();

    let top = 0;
    let left = 0;

    switch (position) {
      case "top":
        top = -tooltipRect.height - 8;
        left = parentRect.width / 2 - tooltipRect.width / 2;
        break;
      case "bottom":
        top = parentRect.height + 8;
        left = parentRect.width / 2 - tooltipRect.width / 2;
        break;
      case "left":
        top = parentRect.height / 2 - tooltipRect.height / 2;
        left = -tooltipRect.width - 8;
        break;
      case "right":
        top = parentRect.height / 2 - tooltipRect.height / 2;
        left = parentRect.width + 8;
        break;
    }

    // Prevent overflow
    const parentLeft = parentRect.left + left;
    const parentRight = parentLeft + tooltipRect.width;
    const overflowX = parentRight > window.innerWidth ? window.innerWidth - parentRight - 8 : 0;
    left += overflowX;

    setCoords({ top, left });
  };

  useEffect(() => {
    if (visible) {
      calculatePosition();
      window.addEventListener("scroll", calculatePosition);
      window.addEventListener("resize", calculatePosition);
    }
    return () => {
      window.removeEventListener("scroll", calculatePosition);
      window.removeEventListener("resize", calculatePosition);
    };
  }, [visible, position]);

  return (
    <div
      ref={parentRef}
      className="relative inline-block"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && (
        <div
          ref={tooltipRef}
          style={{ top: coords.top, left: coords.left }}
          className="absolute z-50 bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap"
        >
          {text}
        </div>
      )}
    </div>
  );
};

export default DynamicTooltip;
