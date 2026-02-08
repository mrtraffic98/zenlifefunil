import { StepContainer } from "../StepContainer";
import { OptionCard } from "../OptionCard";
import { UserData } from "@/types/funnel";

interface Props {
  data: UserData;
  onChange: (data: Partial<UserData>) => void;
  onNext?: () => void;
}

const options = [
  { id: "sitting", emoji: "🪑", label: "Paso la mayor parte del tiempo sentada." },
  { id: "breaks", emoji: "🧎", label: "Hago pausas activas." },
  { id: "standing", emoji: "🚶", label: "Normalmente estoy de pie." },
];

export const DailyWalkingStep = ({ data, onChange, onNext }: Props) => {
  return (
    <StepContainer title="¿Cómo describirías tu día a día?">
      <div className="space-y-3">
        {options.map((option) => (
          <OptionCard
            key={option.id}
            emoji={option.emoji}
            label={option.label}
            selected={data.dailyWalking === option.id}
            onClick={() => onChange({ dailyWalking: option.id })}
            onNext={onNext}
          />
        ))}
      </div>
    </StepContainer>
  );
};
