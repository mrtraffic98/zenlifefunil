import { StepContainer } from "../StepContainer";
import { UserData } from "@/types/funnel";

interface Props {
  data: UserData;
  onChange: (data: Partial<UserData>) => void;
}

const options = [
  { id: "late-eating", emoji: "🌙", label: "Como muy tarde" },
  { id: "too-much-salt", emoji: "🧂", label: "Como mucha sal." },
  { id: "too-much-sugar", emoji: "🧁", label: "No puedo dejar de comer azúcar." },
  { id: "too-many-carbs", emoji: "🍞", label: "Como muchos carbohidratos." },
  { id: "soda", emoji: "🥤", label: "No puedo vivir sin refrescos." },
  { id: "none", emoji: "❌", label: "Ninguna de las anteriores." },
];

export const FoodHabitsStep = ({ data, onChange }: Props) => {
  const toggleHabit = (habitId: string) => {
    if (habitId === "none") {
      onChange({ foodHabits: ["none"] });
      return;
    }
    
    const current = data.foodHabits?.filter(h => h !== "none") || [];
    const updated = current.includes(habitId)
      ? current.filter(h => h !== habitId)
      : [...current, habitId];
    onChange({ foodHabits: updated });
  };

  return (
    <StepContainer title="¿Tienes alguno de los siguientes malos hábitos alimenticios?">
      <div className="grid grid-cols-2 gap-3">
        {options.map((option) => (
          <div
            key={option.id}
            onClick={() => toggleHabit(option.id)}
            className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 cursor-pointer transition-all ${
              data.foodHabits?.includes(option.id)
                ? "border-primary bg-primary/10"
                : "border-border bg-card hover:border-primary/50"
            }`}
          >
            <span className="text-2xl">{option.emoji}</span>
            <span className="font-bold text-foreground text-xs text-center">{option.label}</span>
          </div>
        ))}
      </div>
    </StepContainer>
  );
};
