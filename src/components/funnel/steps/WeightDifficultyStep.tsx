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
  { id: "hard-lose", emoji: "😟", label: "Me resulta difícil perder peso." },
  { id: "easy-both", emoji: "😌", label: "Subo y pierdo peso sin esfuerzo." },
  { id: "hard-gain", emoji: "🥺", label: "Tengo dificultad para ganar peso." },
];

export const WeightDifficultyStep = ({ data, onChange, onNext }: Props) => {
  return (
    <StepContainer
      title="¿Cuál es tu experiencia con tu cuerpo?"
      textAlign="left"
    >
      <div className="flex gap-3 items-start">
        <div className="flex-1 space-y-2">
          {options.map((option) => (
            <OptionCard
              key={option.id}
              emoji={option.emoji}
              label={option.label}
              selected={data.weightDifficulty === option.id}
              onClick={() => onChange({ weightDifficulty: option.id })}
              onNext={onNext}
              hideCheck
              emojiOnTop
            />
          ))}
        </div>
        <div className="flex-shrink-0 w-44 md:w-52 -mt-4">
          <img 
             src={images.weightDifficultyWoman} 
            alt="Mujer en balanza" 
            className="w-full h-auto object-contain"
          />
        </div>
      </div>
    </StepContainer>
  );
};
