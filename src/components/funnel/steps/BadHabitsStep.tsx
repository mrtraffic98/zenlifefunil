 import { StepContainer } from "../StepContainer";
 import { UserData } from "@/types/funnel";
 import { images } from "@/lib/imageUrls";

interface Props {
  data: UserData;
  onChange: (data: Partial<UserData>) => void;
  onNext?: () => void;
}

const options = [
  { id: "yes", emoji: "🥦", label: "Sí, siempre." },
  { id: "sometimes", emoji: "⚖️", label: "A veces." },
  { id: "no", emoji: "🍔", label: "No." },
];

export const BadHabitsStep = ({ data, onChange, onNext }: Props) => {
  const selectOption = (optionId: string) => {
    onChange({ badHabits: [optionId] });
    if (onNext) {
      setTimeout(() => onNext(), 150);
    }
  };

  return (
    <StepContainer title="¿Sigues una dieta saludable?">
      <div className="flex items-center gap-4">
        <div className="w-1/2 flex-shrink-0">
          <img 
             src={images.healthyDiet} 
            alt="Dieta saludable"
            className="w-full rounded-2xl"
          />
        </div>
        <div className="flex-1 space-y-2">
          {options.map((option) => (
            <div
              key={option.id}
              onClick={() => selectOption(option.id)}
              className={`flex items-center gap-3 p-3 rounded-2xl border-2 cursor-pointer transition-all ${
                data.badHabits?.includes(option.id)
                  ? "border-primary bg-primary/10"
                  : "border-border bg-card hover:border-primary/50"
              }`}
            >
              <span className="text-xl">{option.emoji}</span>
              <span className="font-bold text-foreground text-sm">{option.label}</span>
            </div>
          ))}
        </div>
      </div>
    </StepContainer>
  );
};
