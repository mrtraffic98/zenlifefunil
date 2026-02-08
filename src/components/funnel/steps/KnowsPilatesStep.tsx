 import { StepContainer } from "../StepContainer";
 import { UserData } from "@/types/funnel";
 import { cn } from "@/lib/utils";
 import { Check, X } from "lucide-react";
 import { images } from "@/lib/imageUrls";

interface Props {
  data: UserData;
  onChange: (data: Partial<UserData>) => void;
  onNext?: () => void;
}

interface OptionProps {
  icon: "check" | "x";
  label: string;
  selected: boolean;
  onClick: () => void;
  onNext?: () => void;
}

const AnswerOption = ({ icon, label, selected, onClick, onNext }: OptionProps) => {
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
        "flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all duration-300 w-full",
        "shadow-soft hover:shadow-card",
        selected
          ? "border-primary bg-accent"
          : "border-border bg-card hover:border-secondary"
      )}
    >
      {icon === "check" ? (
        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mb-2">
          <Check className="w-5 h-5 text-primary" />
        </div>
      ) : (
        <div className="w-8 h-8 rounded-full bg-destructive/20 flex items-center justify-center mb-2">
          <X className="w-5 h-5 text-destructive" />
        </div>
      )}
      <p className={cn(
        "text-sm font-bold text-center leading-tight",
        selected ? "text-primary" : "text-foreground"
      )}>
        {label}
      </p>
    </button>
  );
};

export const KnowsPilatesStep = ({ data, onChange, onNext }: Props) => {
  return (
    <StepContainer
      title="¿Conoces Pilates en la Pared?"
      subtitle=""
    >
      <div className="flex gap-3 items-stretch mt-2">
        {/* Image on the left */}
        <div className="flex-shrink-0 w-[45%]">
          <img 
             src={images.pilatesWoman} 
            alt="Pilates en la pared" 
            className="w-full h-full object-cover object-top rounded-2xl"
          />
        </div>
        
        {/* Options on the right */}
        <div className="flex-1 flex flex-col gap-3 justify-center">
          <AnswerOption
            icon="check"
            label="Sí, lo practico regularmente"
            selected={data.knowsPilates === true}
            onClick={() => onChange({ knowsPilates: true })}
            onNext={onNext}
          />
          <AnswerOption
            icon="x"
            label="No, nunca lo he probado..."
            selected={data.knowsPilates === false}
            onClick={() => onChange({ knowsPilates: false })}
            onNext={onNext}
          />
        </div>
      </div>
    </StepContainer>
  );
};
