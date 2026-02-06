import { StepContainer } from "../StepContainer";
import { OptionCard } from "../OptionCard";
import { UserData } from "@/types/funnel";

interface Props {
  data: UserData;
  onChange: (data: Partial<UserData>) => void;
  onNext?: () => void;
}

const options = [
  { id: "only-coffee", emoji: "☕", label: "Solo bebo té y café." },
  { id: "less-2", emoji: "💧", label: "Menos de 2 vasos de agua." },
  { id: "3-6", emoji: "💦", label: "De 3 a 6 vasos de agua." },
  { id: "more-10", emoji: "🌊", label: "Más de 10 vasos de agua." },
];

export const AfterEatingStep = ({ data, onChange, onNext }: Props) => {
  return (
    <StepContainer title="¿Cuánta agua sueles beber en un día?">
      <div className="space-y-3">
        {options.map((option) => (
          <OptionCard
            key={option.id}
            emoji={option.emoji}
            label={option.label}
            selected={data.afterEatingFeeling === option.id}
            onClick={() => onChange({ afterEatingFeeling: option.id })}
            onNext={onNext}
          />
        ))}
      </div>
    </StepContainer>
  );
};
