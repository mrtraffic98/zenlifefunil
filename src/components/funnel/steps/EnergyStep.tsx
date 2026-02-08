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
  { id: "less-5", emoji: "😢", label: "Menos de 5 horas." },
  { id: "5-6", emoji: "😐", label: "Entre 5 y 6 horas" },
  { id: "7-8", emoji: "😉", label: "Entre 7 y 8 horas." },
  { id: "more-8", emoji: "😁", label: "Más de 8 horas." },
];

export const EnergyStep = ({ data, onChange, onNext }: Props) => {
  return (
    <StepContainer title="¿Cuántas horas duermes por noche?">
      <div className="grid grid-cols-2 gap-3 mb-5">
        {options.map((option) => (
          <OptionCard
            key={option.id}
            emoji={option.emoji}
            label={option.label}
            selected={data.energyLevel === option.id}
            onClick={() => onChange({ energyLevel: option.id })}
            onNext={onNext}
            hideCheck
            smallText
          />
        ))}
      </div>
      <img 
         src={images.sleepPillow} 
        alt="Dormir"
        className="w-full max-w-xs mx-auto rounded-2xl"
      />
    </StepContainer>
  );
};
