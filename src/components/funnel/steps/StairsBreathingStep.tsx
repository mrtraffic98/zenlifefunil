 import { StepContainer } from "../StepContainer";
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
  { id: "less-20", emoji: "😬", label: "Menos de 20 min" },
  { id: "20-60", emoji: "🙂", label: "20 a 60 min" },
  { id: "more-60", emoji: "😁", label: "Más de 60 min" },
];

export const StairsBreathingStep = ({ data, onChange, onNext }: Props) => {
  const handleSelect = (id: string) => {
    onChange({ stairsBreathing: id });
    if (onNext) {
      setTimeout(() => onNext(), 150);
    }
  };

  return (
    <StepContainer title="¿Cuánto tiempo sueles caminar en un día normal?">
      <div className="flex justify-center mb-4">
        <img 
           src={images.walkingWoman} 
          alt="Mujer caminando" 
          className="w-48 h-auto object-contain"
        />
      </div>
      <div className="grid grid-cols-3 gap-2">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => handleSelect(option.id)}
            className={cn(
              "relative flex flex-col items-center justify-center p-3 rounded-2xl border-2 transition-all duration-300",
              "shadow-soft hover:shadow-card animate-scale-in aspect-square",
              data.stairsBreathing === option.id
                ? "border-primary bg-accent"
                : "border-border bg-card hover:border-secondary"
            )}
          >
            {data.stairsBreathing === option.id && (
              <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                <Check className="w-3 h-3 text-primary-foreground" />
              </div>
            )}
            <span className="text-3xl mb-2">{option.emoji}</span>
            <span className="text-xs font-medium text-center text-foreground leading-tight">
              {option.label}
            </span>
          </button>
        ))}
      </div>
    </StepContainer>
  );
};
