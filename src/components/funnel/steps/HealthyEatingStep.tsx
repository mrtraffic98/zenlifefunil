 import { StepContainer } from "../StepContainer";
 import { ContinueButton } from "../ContinueButton";
 import { images } from "@/lib/imageUrls";

interface Props {
  onNext?: () => void;
}

export const HealthyEatingStep = ({ onNext }: Props) => {
  return (
    <StepContainer centered textAlign="left">
      <div className="max-w-sm mx-auto">
        <h1 className="text-xl font-bold text-foreground leading-tight mb-3">
          El pilates en la pared te ayudará a sentirte con más energía durante el día.
        </h1>
        
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
          Nuestros ejercicios <span className="font-bold text-foreground">fortalecen tus músculos, mejoran tu postura y aumentan tu conciencia corporal.</span>
        </p>

        <p className="text-sm text-muted-foreground italic leading-relaxed mb-4">
          Queremos que tengas mucha energía y vitalidad a lo largo de tu día ¡y que vivas tu vida al máximo!
        </p>

        <img 
           src={images.pilatesWoman} 
          alt="Ejercicio de pilates"
          className="w-3/5 mx-auto rounded-2xl mb-4"
        />

        <ContinueButton onClick={onNext} className="mt-4" />
      </div>
    </StepContainer>
  );
};
