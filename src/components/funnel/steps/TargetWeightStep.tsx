import { StepContainer } from "../StepContainer";
import { RulerSlider } from "../RulerSlider";
import { UserData } from "@/types/funnel";

interface Props {
  data: UserData;
  onChange: (data: Partial<UserData>) => void;
}

export const TargetWeightStep = ({ data, onChange }: Props) => {
  const weightToLose = data.currentWeight - data.targetWeight;
  const months = Math.ceil(weightToLose / 4);

  return (
    <StepContainer>
      <RulerSlider
        value={data.targetWeight}
        onChange={(targetWeight) => onChange({ targetWeight })}
        min={40}
        max={data.currentWeight > 40 ? data.currentWeight : 100}
        unit="kg"
        title="Escribe tu peso objetivo:"
        infoTitle={weightToLose > 0 ? `Meta: -${weightToLose}kg` : "Define tu meta"}
        infoText={weightToLose > 0 
          ? `Perder hasta 4kg por mes es saludable. Tu objetivo puede alcanzarse en aproximadamente ${months} ${months === 1 ? 'mes' : 'meses'}.`
          : "Define el peso que te gustaría alcanzar."
        }
      />
    </StepContainer>
  );
};
