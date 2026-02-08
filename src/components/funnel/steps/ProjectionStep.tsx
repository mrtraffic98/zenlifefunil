import { StepContainer } from "../StepContainer";
import { UserData } from "@/types/funnel";
import { TrendingDown } from "lucide-react";

interface Props {
  data: UserData;
}

export const ProjectionStep = ({ data }: Props) => {
  const weightToLose = data.currentWeight - data.targetWeight;
  const weeks = Math.ceil(weightToLose / 1); // ~1kg per week
  
  // Generate projection points
  const points = [];
  for (let i = 0; i <= 4; i++) {
    const week = Math.round((weeks / 4) * i);
    const weight = Math.round(data.currentWeight - (weightToLose / 4) * i);
    points.push({ week, weight });
  }

  // Calculate target date
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + weeks * 7);
  const formattedDate = targetDate.toLocaleDateString('es-ES', { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  });

  return (
    <StepContainer textAlign="left">
      <div className="text-center mb-6">
        <h1 className="text-xl font-extrabold text-foreground mb-2">
          Tu proyección de resultados 📈
        </h1>
        <p className="text-sm text-muted-foreground">
          Así será tu transformación siguiendo el protocolo ZenLife
        </p>
      </div>

      {/* Simple Chart */}
      <div className="bg-card rounded-2xl p-5 shadow-card mb-6">
        <div className="h-48 relative">
          {/* Y-axis labels */}
          <div className="absolute left-0 top-0 bottom-0 w-12 flex flex-col justify-between text-xs text-muted-foreground">
            <span>{data.currentWeight}kg</span>
            <span>{Math.round((data.currentWeight + data.targetWeight) / 2)}kg</span>
            <span>{data.targetWeight}kg</span>
          </div>
          
          {/* Chart area */}
          <div className="ml-14 h-full relative">
            {/* Grid lines */}
            <div className="absolute inset-0 flex flex-col justify-between">
              {[0, 1, 2].map((i) => (
                <div key={i} className="border-t border-dashed border-muted" />
              ))}
            </div>
            
            {/* Line chart simulation */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="hsl(var(--primary))" />
                  <stop offset="100%" stopColor="hsl(var(--secondary))" />
                </linearGradient>
                <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
                </linearGradient>
              </defs>
              {/* Area fill */}
              <path
                d="M 0 10 Q 25 15 50 40 T 100 90 L 100 100 L 0 100 Z"
                fill="url(#areaGradient)"
              />
              {/* Line */}
              <path
                d="M 0 10 Q 25 15 50 40 T 100 90"
                fill="none"
                stroke="url(#lineGradient)"
                strokeWidth="3"
                strokeLinecap="round"
              />
              {/* End point */}
              <circle cx="100" cy="90" r="4" fill="hsl(var(--primary))" />
            </svg>
          </div>
        </div>
        
        {/* X-axis */}
        <div className="ml-14 flex justify-between text-xs text-muted-foreground mt-2">
          <span>Hoy</span>
          <span>Semana {Math.round(weeks/2)}</span>
          <span>{formattedDate.split(' ').slice(0, 2).join(' ')}</span>
        </div>
      </div>

      <div className="flex items-center gap-3 p-4 bg-accent rounded-2xl">
        <TrendingDown className="w-8 h-8 text-primary" />
        <div>
          <p className="font-semibold text-foreground">
            Meta: {formattedDate}
          </p>
          <p className="text-sm text-muted-foreground">
            -{weightToLose}kg en aproximadamente {weeks} semanas
          </p>
        </div>
      </div>
    </StepContainer>
  );
};
