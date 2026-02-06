 import { StepContainer } from "../StepContainer";
 import { OptionCard } from "../OptionCard";
 import { UserData } from "@/types/funnel";
 import { images } from "@/lib/imageUrls";
 import { cn } from "@/lib/utils";
 import { Check } from "lucide-react";

interface Props {
  data: UserData;
  onChange: (data: Partial<UserData>) => void;
  onNext?: () => void;
}

const options = [
  { id: "very-flexible", emoji: "🤸", label: "Bastante flexible" },
  { id: "starting", emoji: "🧘", label: "Estoy comenzando" },
  { id: "not-sure", emoji: "🤷", label: "No estoy segura" },
  { id: "not-much", emoji: "🧍", label: "No mucho" },
];

export const SleepStep = ({ data, onChange, onNext }: Props) => {
  const handleSelect = (id: string) => {
    onChange({ sleepHours: id });
    if (onNext) {
      setTimeout(() => onNext(), 150);
    }
  };

  return (
    <StepContainer title="¿Te consideras flexible?">
      <div className="flex gap-3 items-center">
        <div className="flex-shrink-0 w-44">
          <img 
             src={images.flexibilityStretch} 
            alt="Flexibilidad"
            className="w-full h-auto object-contain"
          />
        </div>
        <div className="flex-1 space-y-2">
          {options.map((option) => (
            <button
              key={option.id}
              onClick={() => handleSelect(option.id)}
              className={cn(
                "relative flex items-center gap-2 w-full p-3 rounded-xl border-2 transition-all duration-300",
                "shadow-soft hover:shadow-card animate-scale-in",
                data.sleepHours === option.id
                  ? "border-primary bg-accent"
                  : "border-border bg-card hover:border-secondary"
              )}
            >
              {data.sleepHours === option.id && (
                <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-primary flex items-center justify-center">
                  <Check className="w-2.5 h-2.5 text-primary-foreground" />
                </div>
              )}
              <span className="text-lg">{option.emoji}</span>
              <span className="text-sm font-semibold text-foreground leading-tight">
                {option.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </StepContainer>
  );
};
