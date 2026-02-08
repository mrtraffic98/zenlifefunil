import { StepContainer } from "../StepContainer";
import { OptionCard } from "../OptionCard";
import { UserData } from "@/types/funnel";

interface Props {
  data: UserData;
  onChange: (data: Partial<UserData>) => void;
}

const goals = [
  { id: "lose-weight", emoji: "🔥", label: "Perder peso" },
  { id: "posture", emoji: "🧍", label: "Mejorar postura" },
  { id: "strength", emoji: "💪", label: "Ganar fuerza" },
  { id: "stress", emoji: "😌", label: "Reducir estrés" },
  { id: "flexibility", emoji: "🤸", label: "Flexibilidad" },
  { id: "diastasis", emoji: "🩺", label: "Tratar diástasis" },
  { id: "menopause", emoji: "🌸", label: "Reducir síntomas de la menopausia" },
];

export const GoalsStep = ({ data, onChange }: Props) => {
  const toggleGoal = (goalId: string) => {
    const current = data.mainGoals || [];
    const updated = current.includes(goalId)
      ? current.filter(g => g !== goalId)
      : [...current, goalId];
    onChange({ mainGoals: updated });
  };

  return (
    <StepContainer
      title="¿Cuál es tu objetivo principal?"
      subtitle="Puedes seleccionar más de uno para personalizar tu plan."
    >
      <div className="space-y-3">
        {goals.map((goal) => (
          <OptionCard
            key={goal.id}
            emoji={goal.emoji}
            label={goal.label}
            selected={data.mainGoals?.includes(goal.id) || false}
            onClick={() => toggleGoal(goal.id)}
            multiSelect
          />
        ))}
      </div>
    </StepContainer>
  );
};
