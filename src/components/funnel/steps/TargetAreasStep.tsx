 import { StepContainer } from "../StepContainer";
 import { UserData } from "@/types/funnel";
 import { images } from "@/lib/imageUrls";

interface Props {
  data: UserData;
  onChange: (data: Partial<UserData>) => void;
}

const areas = [
   { id: "arms", image: images.targetArms, label: "Brazos", scale: "scale-[1.35] translate-x-4", align: "items-end" },
   { id: "belly", image: images.targetBelly, label: "Barriga", scale: "scale-[1.6]", align: "items-end" },
   { id: "legs", image: images.targetLegs, label: "Piernas", scale: "scale-150", align: "items-end" },
   { id: "glutes", image: images.targetGlutes, label: "Glúteos", scale: "scale-150", align: "items-end" },
   { id: "back", image: images.targetBack, label: "Espalda", scale: "scale-150", align: "items-end" },
   { id: "full-body", image: images.targetFullbody, label: "Cuerpo", scale: "scale-150", align: "items-end" },
];

export const TargetAreasStep = ({ data, onChange }: Props) => {
  const toggleArea = (areaId: string) => {
    if (areaId === "full-body") {
      onChange({ targetAreas: ["full-body"] });
      return;
    }
    
    const current = data.targetAreas?.filter(a => a !== "full-body") || [];
    const updated = current.includes(areaId)
      ? current.filter(a => a !== areaId)
      : [...current, areaId];
    onChange({ targetAreas: updated });
  };

  return (
    <StepContainer
      title="¿Qué áreas deseas trabajar?"
      subtitle="Selecciona las zonas que más te gustaría mejorar."
    >
      <div className="grid grid-cols-3 gap-3">
        {areas.map((area) => (
          <div
            key={area.id}
            onClick={() => toggleArea(area.id)}
            className={`flex flex-col items-center rounded-2xl border-2 cursor-pointer transition-all overflow-hidden ${
              data.targetAreas?.includes(area.id)
                ? "border-primary bg-primary/10"
                : "border-border bg-card hover:border-primary/50"
            }`}
          >
            <div className={`flex-1 flex ${area.align} justify-center overflow-hidden`}>
              <img 
                src={area.image} 
                alt={area.label}
                className={`w-full h-auto object-cover ${area.align === "items-end" ? "object-bottom" : "object-top"} ${area.scale}`}
              />
            </div>
            <div className="w-full bg-primary py-2">
              <span className="font-semibold text-primary-foreground text-sm text-center block">{area.label}</span>
            </div>
          </div>
        ))}
      </div>
    </StepContainer>
  );
};
