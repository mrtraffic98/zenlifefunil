 import { useEffect, useState } from "react";
 import { StepContainer } from "../StepContainer";
 import { Progress } from "@/components/ui/progress";
 import { Sparkles, Brain, Target, Dumbbell, ClipboardCheck } from "lucide-react";
 
 interface Props {
   onComplete: () => void;
 }
 
 const loadingSteps = [
   { icon: ClipboardCheck, text: "Analizando tus respuestas..." },
   { icon: Brain, text: "Procesando tu perfil único..." },
   { icon: Target, text: "Definiendo tus objetivos..." },
   { icon: Dumbbell, text: "Diseñando tu rutina personalizada..." },
   { icon: Sparkles, text: "Finalizando tu protocolo..." },
 ];
 
 export const ProtocolLoadingStep = ({ onComplete }: Props) => {
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
     }, 35);
 
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
           Preparando tu protocolo de entrenamiento...
         </h1>
         
         <p className="text-sm text-muted-foreground mb-8 animate-fade-in" key={currentStep}>
           {loadingSteps[currentStep].text}
         </p>
 
         <div className="w-full mb-8">
           <Progress value={progress} className="h-3" />
           <p className="text-sm text-muted-foreground mt-2">{progress}%</p>
         </div>
 
        <div className="mt-4">
          <p className="text-lg font-bold text-foreground leading-snug">
            En total, durante los últimos 6 meses, nuestras usuarias han perdido en promedio
          </p>
          <p className="text-2xl font-extrabold text-emerald-500 mt-3">
            más de 14 kg 🤩
          </p>
         </div>
       </div>
     </StepContainer>
   );
 };