import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface ImageOptionCardProps {
  label: string;
  imageSrc?: string;
  icon?: React.ReactNode;
  selected: boolean;
  onClick: () => void;
  onNext?: () => void;
  className?: string;
}

export const ImageOptionCard = ({
  label,
  imageSrc,
  icon,
  selected,
  onClick,
  onNext,
  className,
}: ImageOptionCardProps) => {
  const handleClick = () => {
    onClick();
    if (onNext) {
      setTimeout(() => onNext(), 150);
    }
  };
  return (
    <button
      onClick={handleClick}
      className={cn(
        "relative flex flex-col items-center pt-0 px-0 pb-0 rounded-2xl border-2 transition-all duration-300 overflow-hidden",
        "shadow-soft hover:shadow-card animate-scale-in",
        selected
          ? "border-primary bg-accent"
          : "border-border bg-card hover:border-secondary",
        className
      )}
    >
      {selected && (
        <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-primary flex items-center justify-center z-10">
          <Check className="w-3.5 h-3.5 text-primary-foreground" />
        </div>
      )}
      
      {imageSrc ? (
        <div className="w-full flex-1 flex items-start justify-center pt-2 px-2">
          <img 
            src={imageSrc} 
            alt={label} 
            className="w-full h-auto object-contain object-top"
          />
        </div>
      ) : icon ? (
        <div className="w-full flex-1 flex items-center justify-center text-4xl py-4">
          {icon}
        </div>
      ) : null}
      
      <div className="w-full py-2 bg-primary text-primary-foreground text-sm font-semibold text-center">
        {label}
      </div>
    </button>
  );
};
