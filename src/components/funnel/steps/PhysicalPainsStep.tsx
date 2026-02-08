 import { StepContainer } from "../StepContainer";
 import { UserData } from "@/types/funnel";
 import { Check } from "lucide-react";
 import { images } from "@/lib/imageUrls";

interface Props {
  data: UserData;
  onChange: (data: Partial<UserData>) => void;
}

const options = [
   { id: "knees", image: images.painKnees, label: "Rodillas" },
   { id: "back", image: images.painBack, label: "Espalda" },
   { id: "legs", image: images.painHips, label: "Caderas" },
  { id: "none", emoji: "🚫", label: "Ninguna" },
];

export const PhysicalPainsStep = ({ data, onChange }: Props) => {
  const togglePain = (painId: string) => {
    if (painId === "none") {
      onChange({ physicalPains: ["none"] });
      return;
    }
    
    const current = data.physicalPains?.filter(p => p !== "none") || [];
    const updated = current.includes(painId)
      ? current.filter(p => p !== painId)
      : [...current, painId];
    onChange({ physicalPains: updated });
  };

  const isSelected = (id: string) => data.physicalPains?.includes(id);

  return (
    <StepContainer
      title="¿Tienes algún dolor físico?"
      subtitle="Adaptaremos los ejercicios para proteger estas áreas."
    >
      <div className="space-y-3">
        {options.map((option) => (
          <div
            key={option.id}
            onClick={() => togglePain(option.id)}
            className={`flex items-stretch gap-4 rounded-2xl border-2 cursor-pointer transition-all overflow-hidden ${
              isSelected(option.id)
                ? "border-primary bg-primary/10"
                : "border-border bg-card hover:border-primary/50"
            }`}
          >
            {/* Image or Emoji */}
            {'image' in option && option.image ? (
              <div className="w-20 h-20 flex-shrink-0 overflow-hidden flex items-end justify-center -mb-1">
                <img 
                  src={option.image} 
                  alt={option.label}
                  className="w-full h-full object-contain object-bottom"
                />
              </div>
            ) : (
              <div className="w-20 h-20 flex-shrink-0 flex items-center justify-center text-4xl">
                {option.emoji}
              </div>
            )}

            <div className="flex-1 flex items-center py-3">
              <span className="font-bold text-foreground">{option.label}</span>
            </div>

            {/* Checkbox */}
            <div className="flex items-center pr-4">
              <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                isSelected(option.id) 
                  ? "bg-primary border-primary" 
                  : "border-muted-foreground/40 bg-background"
              }`}>
                {isSelected(option.id) && (
                  <Check className="w-4 h-4 text-primary-foreground" />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </StepContainer>
  );
};
