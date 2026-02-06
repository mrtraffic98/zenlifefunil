import { StepContainer } from "../StepContainer";
import { RulerSlider } from "../RulerSlider";
import { UserData } from "@/types/funnel";

interface Props {
  data: UserData;
  onChange: (data: Partial<UserData>) => void;
}

export const CurrentWeightStep = ({ data, onChange }: Props) => {
  return (
    <StepContainer>
      <RulerSlider
        value={data.currentWeight}
        onChange={(currentWeight) => onChange({ currentWeight })}
        min={40}
        max={150}
        unit="kg"
        title="Escribe tu peso actual:"
        infoTitle="Tu peso es información confidencial"
        infoText="Esta información nos ayuda a crear un plan personalizado para ti."
      />
    </StepContainer>
  );
};
