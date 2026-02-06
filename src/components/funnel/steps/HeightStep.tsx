import { StepContainer } from "../StepContainer";
import { RulerSlider } from "../RulerSlider";
import { UserData } from "@/types/funnel";

interface Props {
  data: UserData;
  onChange: (data: Partial<UserData>) => void;
}

export const HeightStep = ({ data, onChange }: Props) => {
  return (
    <StepContainer>
      <RulerSlider
        value={data.height}
        onChange={(height) => onChange({ height })}
        min={140}
        max={200}
        unit="cm"
        title="Escribe tu altura:"
        infoTitle="Calculando tu índice de masa corporal"
        infoText="El IMC se utiliza ampliamente como un factor de riesgo para el desarrollo o la prevalencia de diversos problemas de salud."
      />
    </StepContainer>
  );
};
