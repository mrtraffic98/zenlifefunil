import { StepContainer } from "../StepContainer";
import { OptionCard } from "../OptionCard";
import { UserData } from "@/types/funnel";

interface Props {
  data: UserData;
  onChange: (data: Partial<UserData>) => void;
  onNext?: () => void;
}

const options = [
  { id: "very-hard", emoji: "🥵", label: "Me quedo sin aliento y ni puedo hablar." },
  { id: "bit-hard", emoji: "😮", label: "Me quedo un poco sin aliento, pero puedo hablar." },
  { id: "normal", emoji: "🙂", label: "Me siento bien después de subir las escaleras." },
  { id: "easy", emoji: "😄", label: "Me siento genial..." },
];

export const FlexibilityStep = ({ data, onChange, onNext }: Props) => {
  return (
    <StepContainer title="¿Te falta el aire al subir escaleras?">
      <div className="space-y-3">
        {options.map((option) => (
          <OptionCard
            key={option.id}
            emoji={option.emoji}
            label={option.label}
            selected={data.flexibility === option.id}
            onClick={() => onChange({ flexibility: option.id })}
            onNext={onNext}
          />
        ))}
      </div>
    </StepContainer>
  );
};
