import { StepContainer } from "../StepContainer";
import { Input } from "@/components/ui/input";
import { UserData } from "@/types/funnel";

interface Props {
  data: UserData;
  onChange: (data: Partial<UserData>) => void;
}

export const NameStep = ({ data, onChange }: Props) => {
  return (
    <StepContainer
      title="¿Cuál es tu nombre?"
      subtitle="Queremos personalizar tu experiencia."
    >
      <div className="flex flex-col items-center justify-center min-h-[250px]">
        <div className="w-full max-w-sm">
          <Input
            type="text"
            placeholder="Tu nombre"
            value={data.name}
            onChange={(e) => onChange({ name: e.target.value })}
            className="text-center text-lg py-6 rounded-2xl border-2 border-border focus:border-primary"
          />
        </div>
      </div>
    </StepContainer>
  );
};
