import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";

interface SliderInputProps {
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  unit: string;
  label: string;
  className?: string;
}

export const SliderInput = ({
  value,
  onChange,
  min,
  max,
  step = 1,
  unit,
  label,
  className,
}: SliderInputProps) => {
  return (
    <div className={cn("w-full space-y-6", className)}>
      <div className="text-center">
        <p className="text-muted-foreground text-sm mb-2">{label}</p>
        <div className="flex items-baseline justify-center gap-1">
          <span className="text-5xl font-bold text-primary">{value}</span>
          <span className="text-xl text-muted-foreground">{unit}</span>
        </div>
      </div>
      
      <div className="px-4">
        <Slider
          value={[value]}
          onValueChange={([v]) => onChange(v)}
          min={min}
          max={max}
          step={step}
          className="w-full"
        />
        <div className="flex justify-between mt-2 text-xs text-muted-foreground">
          <span>{min} {unit}</span>
          <span>{max} {unit}</span>
        </div>
      </div>
    </div>
  );
};
