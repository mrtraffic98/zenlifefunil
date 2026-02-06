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
  { id: "less-1-year", label: "Menos de 1 año..." },
  { id: "1-2-years", label: "Hace 1 o 2 años..." },
  { id: "more-3-years", label: "Hace más de 3 años..." },
  { id: "never", label: "Nunca..." },
];

export const LastSatisfiedStep = ({ data, onChange, onNext }: Props) => {
  return (
    <StepContainer
      title="¿Cuándo fue la última vez que estuviste satisfecha con tu cuerpo?"
      subtitle="Ese placer de verse en el espejo."
    >
      <div className="flex gap-3 items-start">
        <div className="flex-shrink-0 w-40 md:w-48 -mt-2">
          <img 
             src={images.lastSatisfiedWoman} 
            alt="Mujer en espejo" 
            className="w-full h-auto object-contain"
          />
        </div>
        <div className="flex-1 space-y-2 pt-4">
          {options.map((option) => (
            <OptionCard
              key={option.id}
              label={option.label}
              selected={data.lastSatisfied === option.id}
              onClick={() => onChange({ lastSatisfied: option.id })}
              onNext={onNext}
              hideCheck
            />
          ))}
        </div>
      </div>
    </StepContainer>
  );
};
