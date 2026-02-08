 import { StepContainer } from "../StepContainer";
 import { ContinueButton } from "../ContinueButton";
 import { images } from "@/lib/imageUrls";

interface Props {
  onNext?: () => void;
}

export const EducationStep = ({ onNext }: Props) => {
  return (
    <StepContainer
      title=""
      subtitle=""
      textAlign="left"
    >
      <h1 className="text-xl font-extrabold text-foreground leading-tight mb-3 tracking-tight">
        ¡El pilates en la pared es una opción de acondicionamiento físico fácil y eficaz!
      </h1>
      
      <p className="text-muted-foreground text-sm leading-snug">
        Nuestro programa te ayuda a ponerte en forma <span className="font-bold text-foreground">sin necesidad de usar ningún equipo en casa</span>. ¡Solo necesitas una pared y unos minutos al día!
      </p>

      <p className="text-muted-foreground text-sm mt-3">
        ¡Los ejercicios son sencillos y divertidos!
      </p>

      <div className="mt-4">
        <img 
           src={images.wallPilates} 
          alt="Pilates en la pared" 
          className="w-4/5 mx-auto rounded-2xl"
        />
      </div>

      <div className="mt-1">
        <ContinueButton onClick={onNext} />
      </div>
    </StepContainer>
  );
};
