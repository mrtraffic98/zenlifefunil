import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface OptionCardProps {
  label: string;
  emoji?: string;
  description?: string;
  selected: boolean;
  onClick: () => void;
  onNext?: () => void;
  multiSelect?: boolean;
  className?: string;
  hideCheck?: boolean;
  emojiOnTop?: boolean;
  smallText?: boolean;
}

export const OptionCard = ({
  label,
  emoji,
  description,
  selected,
  onClick,
  onNext,
  multiSelect = false,
  className,
  hideCheck = false,
  emojiOnTop = false,
  smallText = false,
}: OptionCardProps) => {
  const handleClick = () => {
    onClick();
    if (!multiSelect && onNext) {
      setTimeout(() => onNext(), 150);
    }
  };
  
  if (emojiOnTop) {
    return (
      <button
        onClick={handleClick}
        className={cn(
          "w-full p-3 rounded-xl border text-center transition-all duration-200 animate-fade-in",
          "flex flex-col items-center gap-1",
          selected
            ? "border-primary bg-accent shadow-card"
            : "border-border bg-card hover:border-secondary",
          className
        )}
      >
        {emoji && (
          <span className="text-xl">{emoji}</span>
        )}
        <p className={cn(
          "text-sm font-semibold leading-tight",
          selected ? "text-primary" : "text-foreground"
        )}>
          {label}
        </p>
      </button>
    );
  }
  
  return (
    <button
      onClick={handleClick}
      className={cn(
        "w-full p-3.5 rounded-xl border text-left transition-all duration-200 animate-fade-in",
        "flex items-center gap-3",
        selected
          ? "border-primary bg-accent shadow-card"
          : "border-border bg-card hover:border-secondary",
        className
      )}
    >
      {emoji && (
        <span className="text-lg flex-shrink-0">{emoji}</span>
      )}
      <div className="flex-1 min-w-0">
        <p className={cn(
          "text-sm font-semibold",
          selected ? "text-primary" : "text-foreground"
        )}>
          {label}
        </p>
        {description && (
          <p className="text-xs font-normal text-muted-foreground mt-0.5 leading-snug">{description}</p>
        )}
      </div>
      {!hideCheck && (
        <div className={cn(
          "w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all",
          selected
            ? "border-primary bg-primary"
            : "border-muted-foreground/30 bg-transparent",
          multiSelect && "rounded-md"
        )}>
          {selected && <Check className="w-3 h-3 text-primary-foreground" />}
        </div>
      )}
    </button>
  );
};
