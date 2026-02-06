import { StepContainer } from "../StepContainer";
import { OptionCard } from "../OptionCard";
import { UserData } from "@/types/funnel";

interface Props {
  data: UserData;
  onChange: (data: Partial<UserData>) => void;
}

const options = [
  { id: "slow-metabolism", emoji: "🐢", label: "Metabolismo lento" },
  { id: "stress", emoji: "😰", label: "Estrés constante" },
  { id: "work-family", emoji: "👨‍👩‍👧", label: "Trabajo y/o familia" },
  { id: "emotional", emoji: "💔", label: "Problemas emocionales" },
  { id: "none", emoji: "✨", label: "Ninguna de las anteriores" },
];

export const LifeEventsStep = ({ data, onChange }: Props) => {
  const toggleEvent = (eventId: string) => {
    if (eventId === "none") {
      onChange({ lifeEvents: ["none"] });
      return;
    }
    
    const current = data.lifeEvents?.filter(e => e !== "none") || [];
    const updated = current.includes(eventId)
      ? current.filter(e => e !== eventId)
      : [...current, eventId];
    onChange({ lifeEvents: updated });
  };

  return (
    <StepContainer
      title="¿Qué eventos de vida influyeron en tu peso?"
      subtitle="Selecciona todos los que apliquen."
    >
      <div className="space-y-3">
        {options.map((option) => (
          <OptionCard
            key={option.id}
            emoji={option.emoji}
            label={option.label}
            selected={data.lifeEvents?.includes(option.id) || false}
            onClick={() => toggleEvent(option.id)}
            multiSelect={option.id !== "none"}
          />
        ))}
      </div>
    </StepContainer>
  );
};
