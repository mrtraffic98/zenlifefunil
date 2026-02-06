import { StepContainer } from "../StepContainer";
import { UserData } from "@/types/funnel";
import { ChevronRight } from "lucide-react";

interface Props {
  data: UserData;
  onChange: (data: Partial<UserData>) => void;
  onNext?: () => void;
}

const options = [
  { id: "sedentary", label: "Sedentario", bars: 1 },
  { id: "light", label: "Un poco activo!", bars: 2 },
  { id: "moderate", label: "Moderadamente activo", bars: 3 },
  { id: "active", label: "Muy activo", bars: 4 },
  { id: "extreme", label: "Extremadamente activo!", bars: 5 },
];

const ActivityBars = ({ level }: { level: number }) => {
  return (
    <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
      <div className="flex items-end gap-0.5 h-6">
        {[1, 2, 3, 4, 5].map((bar) => (
          <div
            key={bar}
            className={`w-1.5 rounded-sm transition-all ${
              bar <= level ? "bg-primary" : "bg-muted-foreground/30"
            }`}
            style={{ height: `${bar * 4 + 4}px` }}
          />
        ))}
      </div>
    </div>
  );
};

export const DailyRoutineStep = ({ data, onChange, onNext }: Props) => {
  const handleClick = (id: string) => {
    onChange({ dailyRoutine: id });
    if (onNext) {
      setTimeout(() => onNext(), 150);
    }
  };

  return (
    <StepContainer title="¿Cuál es tu nivel de actividad?">
      <div className="space-y-3">
        {options.map((option) => (
          <div
            key={option.id}
            onClick={() => handleClick(option.id)}
            className={`flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all ${
              data.dailyRoutine === option.id
                ? "border-primary bg-primary/10"
                : "border-border bg-card hover:border-primary/50"
            }`}
          >
            <ActivityBars level={option.bars} />
            <span className="font-bold text-foreground flex-1">{option.label}</span>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </div>
        ))}
      </div>
    </StepContainer>
  );
};
