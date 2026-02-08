 import { StepContainer } from "../StepContainer";
 import { OptionCard } from "../OptionCard";
 import { UserData } from "@/types/funnel";
 import { images } from "@/lib/imageUrls";

interface Props {
  data: UserData;
  onChange: (data: Partial<UserData>) => void;
  onNext?: () => void;
}

const timeOptions = [
  { value: "10", label: "10 minutos al día" },
  { value: "15", label: "15 minutos al día" },
  { value: "30", label: "30 minutos al día" },
  { value: "60", label: "60 minutos al día" },
];

export const WorkoutTimeStep = ({ data, onChange, onNext }: Props) => {
  return (
    <StepContainer title="¿Cuánto tiempo deseas dedicar a tu cuerpo?">
      <div className="flex gap-4 items-center">
        {/* Imagem à esquerda */}
        <div className="w-1/2 flex-shrink-0">
          <img 
             src={images.workoutTimeWoman} 
            alt="Mujer fitness" 
            className="w-full h-auto object-contain"
          />
        </div>
        
        {/* Opções à direita */}
        <div className="w-1/2 space-y-3">
          {timeOptions.map((option) => (
            <OptionCard
              key={option.value}
              label={option.label}
              selected={data.workoutTime === option.value}
              onClick={() => onChange({ workoutTime: option.value })}
              onNext={onNext}
              hideCheck
            />
          ))}
        </div>
      </div>
    </StepContainer>
  );
};
