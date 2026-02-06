import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

interface ContinueButtonProps {
  onClick: () => void;
  disabled?: boolean;
  text?: string;
  variant?: 'primary' | 'success';
  className?: string;
}

export const ContinueButton = ({ 
  onClick, 
  disabled = false, 
  text = "Continuar",
  variant = 'primary',
  className 
}: ContinueButtonProps) => {
  return (
    <div className={cn(
      "fixed bottom-0 left-0 right-0 p-4 pb-6 flex justify-center bg-gradient-to-t from-background via-background to-transparent",
      className
    )}>
      <button
        onClick={onClick}
        disabled={disabled}
        className={cn(
          "max-w-sm w-full py-4 px-6 rounded-2xl font-bold text-base flex items-center justify-center gap-2 transition-all duration-300",
          "shadow-button active:scale-[0.98]",
          variant === 'primary' && "gradient-cta text-primary-foreground",
          variant === 'success' && "gradient-success text-success-foreground",
          disabled && "opacity-50 cursor-not-allowed shadow-none"
        )}
      >
        {text}
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
};
