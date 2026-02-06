import { useEffect, useState } from "react";
import { StepContainer } from "../StepContainer";
import { Progress } from "@/components/ui/progress";
import { Sparkles, Brain, Target, Dumbbell, Calculator } from "lucide-react";

interface Props {
  onComplete: () => void;
}

const loadingSteps = [
  { icon: Brain, text: "Analizando tu perfil..." },
  { icon: Calculator, text: "Calculando tu IMC..." },
  { icon: Target, text: "Calculando tus objetivos..." },
  { icon: Dumbbell, text: "Creando tu rutina personalizada..." },
  { icon: Sparkles, text: "Finalizando tu protocolo..." },
];

export const LoadingStep = ({ onComplete }: Props) => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 1;
      });
    }, 40);

    return () => clearInterval(interval);
  }, [onComplete]);

  useEffect(() => {
    if (progress < 20) setCurrentStep(0);
    else if (progress < 40) setCurrentStep(1);
    else if (progress < 60) setCurrentStep(2);
    else if (progress < 80) setCurrentStep(3);
    else setCurrentStep(4);
  }, [progress]);

  const CurrentIcon = loadingSteps[currentStep].icon;

  return (
    <StepContainer centered>
      <div className="text-center max-w-sm mx-auto">
        <div className="w-24 h-24 mx-auto mb-8 rounded-full gradient-primary flex items-center justify-center animate-pulse-soft shadow-button">
          <CurrentIcon className="w-12 h-12 text-primary-foreground" />
        </div>

        <h1 className="text-xl font-extrabold text-foreground mb-2">
          Calculando tu IMC...
        </h1>
        
        <p className="text-sm text-muted-foreground mb-8 animate-fade-in" key={currentStep}>
          {loadingSteps[currentStep].text}
        </p>

        <div className="w-full mb-8">
          <Progress value={progress} className="h-3" />
          <p className="text-sm text-muted-foreground mt-2">{progress}%</p>
        </div>

        <div className="p-4 bg-accent rounded-2xl">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-primary">+14kg</span> es el promedio que nuestras usuarias pierden
          </p>
        </div>
      </div>
    </StepContainer>
  );
};
