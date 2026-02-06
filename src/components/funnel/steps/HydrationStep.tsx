 import { StepContainer } from "../StepContainer";
 import { OptionCard } from "../OptionCard";
 import { UserData } from "@/types/funnel";
 import { images } from "@/lib/imageUrls";

interface Props {
  data: UserData;
  onChange: (data: Partial<UserData>) => void;
  onNext?: () => void;
}

const options = [
  { id: "high", emoji: "🔋", label: "Altos y constantes" },
  { id: "low", emoji: "😴", label: "Bajos, me siento cansada" },
];

export const HydrationStep = ({ data, onChange, onNext }: Props) => {
  return (
    <StepContainer title="¿Cómo están tus niveles de energía durante el día?">
      <div className="flex gap-3 items-center">
        <div className="w-1/2 flex-shrink-0">
          <img 
             src={images.energyExercise} 
            alt="Energía"
            className="w-full h-auto object-contain"
          />
        </div>
        <div className="w-1/2 space-y-3">
          {options.map((option) => (
            <OptionCard
              key={option.id}
              emoji={option.emoji}
              label={option.label}
              selected={data.hydration === option.id}
              onClick={() => onChange({ hydration: option.id })}
              onNext={onNext}
              hideCheck
              emojiOnTop
            />
          ))}
        </div>
      </div>
    </StepContainer>
  );
};
