 import { StepContainer } from "../StepContainer";
 import { UserData } from "@/types/funnel";
 import { images } from "@/lib/imageUrls";

interface Props {
  data: UserData;
  onChange: (data: Partial<UserData>) => void;
  onNext?: () => void;
}

const bodyGoals = [
   { id: "mince", image: images.goalMince, label: "Mince", scale: "scale-150" },
   { id: "definido", image: images.goalDefinido, label: "Definido", scale: "scale-150" },
   { id: "courbes", image: images.goalCourbes, label: "Courbes", scale: "scale-150" },
   { id: "atletico", image: images.goalAtletico, label: "Atlético", scale: "scale-150" },
];

export const ProgressPromiseStep = ({ data, onChange, onNext }: Props) => {
  const selectGoal = (goalId: string) => {
    onChange({ goalBodyType: goalId });
    if (onNext) {
      setTimeout(onNext, 150);
    }
  };

  return (
    <StepContainer
      title="¡Elige el tipo de cuerpo que quieres conseguir!"
      subtitle="Visualizar cómo quieres verte será tu motivación."
      textAlign="center"
    >
      <div className="grid grid-cols-2 gap-3">
        {bodyGoals.map((goal) => (
          <div
            key={goal.id}
            onClick={() => selectGoal(goal.id)}
            className={`flex flex-col items-center rounded-2xl border-2 cursor-pointer transition-all overflow-hidden ${
              data.goalBodyType === goal.id
                ? "border-primary bg-primary/10"
                : "border-border bg-card hover:border-primary/50"
            }`}
          >
            <div className="flex-1 flex items-end justify-center overflow-hidden">
              <img 
                src={goal.image} 
                alt={goal.label}
                className={`w-full h-auto object-cover object-bottom ${goal.scale}`}
              />
            </div>
            <div className="w-full bg-primary py-2">
              <span className="font-semibold text-primary-foreground text-sm text-center block">{goal.label}</span>
            </div>
          </div>
        ))}
      </div>
    </StepContainer>
  );
};
