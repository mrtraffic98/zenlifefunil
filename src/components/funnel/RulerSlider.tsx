import { useRef, useState, useEffect } from "react";

interface RulerSliderProps {
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  unit: string;
  title: string;
  infoTitle?: string;
  infoText?: string;
}

export const RulerSlider = ({
  value,
  onChange,
  min,
  max,
  unit,
  title,
  infoTitle,
  infoText,
}: RulerSliderProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const range = max - min;
  const tickCount = Math.min(range + 1, 41); // Max 41 ticks for display
  const tickStep = range / (tickCount - 1);

  const handleInteraction = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, x / rect.width));
    const newValue = Math.round(min + percentage * range);
    onChange(newValue);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    handleInteraction(e.clientX);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    handleInteraction(e.touches[0].clientX);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) handleInteraction(e.clientX);
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging) handleInteraction(e.touches[0].clientX);
    };
    const handleEnd = () => setIsDragging(false);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleEnd);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleEnd);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleEnd);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleEnd);
    };
  }, [isDragging]);

  const indicatorPosition = ((value - min) / range) * 100;

  // Generate visible tick labels (show 5 labels)
  const labelStep = Math.floor(range / 4);
  const labels = [min, min + labelStep, min + labelStep * 2, min + labelStep * 3, max];

  return (
    <div className="w-full">
      <h2 className="text-xl font-bold text-foreground text-center mb-6">{title}</h2>

      {/* Value display */}
      <div className="text-center mb-6">
        <span className="text-5xl font-bold text-foreground">{value}</span>
        <span className="text-2xl text-muted-foreground ml-1">{unit}</span>
      </div>

      {/* Ruler container */}
      <div
        ref={containerRef}
        className="relative w-full h-16 cursor-pointer select-none touch-none"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        {/* Tick marks */}
        <div className="absolute inset-x-0 top-0 h-10 flex items-end justify-between">
          {Array.from({ length: tickCount }).map((_, i) => {
            const tickValue = Math.round(min + i * tickStep);
            const isMajor = tickValue % 10 === 0;
            const isNearIndicator = Math.abs(tickValue - value) < tickStep * 2;
            return (
              <div
                key={i}
                className={`w-px transition-all ${
                  isNearIndicator ? "bg-primary" : "bg-muted-foreground/40"
                }`}
                style={{ height: isMajor ? "24px" : "12px" }}
              />
            );
          })}
        </div>

        {/* Indicator */}
        <div
          className="absolute top-0 w-0.5 h-10 bg-foreground transition-all"
          style={{ left: `${indicatorPosition}%`, transform: "translateX(-50%)" }}
        >
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-8 border-l-transparent border-r-transparent border-t-foreground" />
        </div>

        {/* Labels */}
        <div className="absolute inset-x-0 bottom-0 flex justify-between text-xs text-muted-foreground">
          {labels.map((label, i) => (
            <span key={i}>{label}</span>
          ))}
        </div>
      </div>

      <p className="text-center text-sm text-muted-foreground mt-2">Arrastra para ajustar</p>

      {/* Info box */}
      {infoTitle && infoText && (
        <div className="mt-6 p-4 bg-blue-50 rounded-2xl">
          <p className="text-sm font-medium text-foreground flex items-center gap-2">
            <span>☝️</span> {infoTitle}
          </p>
          <p className="text-xs text-muted-foreground mt-1">{infoText}</p>
        </div>
      )}
    </div>
  );
};
