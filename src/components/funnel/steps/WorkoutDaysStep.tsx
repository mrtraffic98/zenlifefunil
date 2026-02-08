 import { StepContainer } from "../StepContainer";
 import { OptionCard } from "../OptionCard";
 import { UserData } from "@/types/funnel";
 import { images } from "@/lib/imageUrls";

interface Props {
  data: UserData;
  onChange: (data: Partial<UserData>) => void;
  onNext?: () => void;
}

const daysOptions = [
  { value: "1-2", label: "1 o 2 días.", icon: "📅" },
  { value: "3-5", label: "3 a 5 días.", icon: "📆" },
  { value: "todos", label: "Todos los días.", icon: "📆" },
];

export const WorkoutDaysStep = ({ data, onChange, onNext }: Props) => {
  return (
    <StepContainer title="¿Cuántos días a la semana deseas practicar?">
      <div className="flex gap-4 items-center">
        {/* Imagem à esquerda */}
        <div className="w-1/2 flex-shrink-0">
          <img 
             src={images.calendarWoman} 
            alt="Mujer con calendario" 
            className="w-full h-auto object-contain"
          />
        </div>
        
        {/* Opções à direita */}
        <div className="w-1/2 space-y-3">
          {daysOptions.map((option) => (
            <OptionCard
              key={option.value}
              label={option.label}
              selected={data.workoutDays === option.value}
              onClick={() => onChange({ workoutDays: option.value })}
              onNext={onNext}
              emoji={option.icon}
              emojiOnTop
              hideCheck
            />
          ))}
        </div>
      </div>
    </StepContainer>
  );
};
