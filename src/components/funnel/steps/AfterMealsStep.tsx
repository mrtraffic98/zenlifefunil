 import { StepContainer } from "../StepContainer";
 import { UserData } from "@/types/funnel";
 import { images } from "@/lib/imageUrls";

interface Props {
  data: UserData;
  onChange: (data: Partial<UserData>) => void;
  onNext?: () => void;
}

const options = [
  { id: "sleepy", emoji: "🔋", label: "Siento sueño justo después de comer." },
  { id: "energy", emoji: "⚡", label: "¡Siempre me siento con energía!" },
];

export const AfterMealsStep = ({ data, onChange, onNext }: Props) => {
  const selectOption = (optionId: string) => {
    onChange({ afterEatingFeeling: optionId });
    if (onNext) {
      setTimeout(() => onNext(), 150);
    }
  };

  return (
    <StepContainer title="¿Cómo te sientes después de las comidas?">
      <div className="flex items-center gap-4">
        <div className="w-1/2 flex-shrink-0">
          <img 
             src={images.afterMealsWoman} 
            alt="Después de las comidas"
            className="w-full rounded-2xl"
          />
        </div>
        <div className="flex-1 space-y-2">
          {options.map((option) => (
            <div
              key={option.id}
              onClick={() => selectOption(option.id)}
              className={`flex flex-col items-center gap-1 p-3 rounded-2xl border-2 cursor-pointer transition-all ${
                data.afterEatingFeeling === option.id
                  ? "border-primary bg-primary/10"
                  : "border-border bg-card hover:border-primary/50"
              }`}
            >
              <span className="text-2xl">{option.emoji}</span>
              <span className="font-bold text-foreground text-xs text-center">{option.label}</span>
            </div>
          ))}
        </div>
      </div>
    </StepContainer>
  );
};
