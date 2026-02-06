 import { StepContainer } from "../StepContainer";
 import { ImageOptionCard } from "../ImageOptionCard";
 import { UserData } from "@/types/funnel";
 import { images } from "@/lib/imageUrls";

interface Props {
  data: UserData;
  onChange: (data: Partial<UserData>) => void;
  onNext?: () => void;
}

const bodyTypes = [
   { id: "slim", label: "Delgado", image: images.bodyDelgado },
   { id: "medium", label: "Medio", image: images.bodyMedio },
   { id: "belly", label: "Barriga", image: images.bodyBarriga },
   { id: "overweight", label: "Sobrepeso", image: images.bodySobrepeso },
];

export const BodyTypeStep = ({ data, onChange, onNext }: Props) => {
  return (
    <StepContainer
      title="¿Cuál se parece más a tu tipo de cuerpo?"
      subtitle="Esto nos ayuda a adaptar los ejercicios a tu situación."
    >
      <div className="grid grid-cols-2 gap-2 max-w-xs mx-auto">
        {bodyTypes.map((type) => (
          <ImageOptionCard
            key={type.id}
            label={type.label}
            imageSrc={type.image}
            selected={data.bodyType === type.id}
            onClick={() => onChange({ bodyType: type.id })}
            onNext={onNext}
          />
        ))}
      </div>
    </StepContainer>
  );
};
