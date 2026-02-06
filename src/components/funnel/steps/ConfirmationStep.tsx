 import { StepContainer } from "../StepContainer";
 import { ContinueButton } from "../ContinueButton";
 import { UserData } from "@/types/funnel";
 import { images } from "@/lib/imageUrls";

interface Props {
  data: UserData;
  onNext?: () => void;
}

const painMessages: Record<string, { title: string; description: string }> = {
  knees: {
    title: "rodillas",
    description: "Adaptaremos los ejercicios para proteger tus rodillas, evitando movimientos de alto impacto y fortaleciendo los músculos que las sostienen."
  },
  back: {
    title: "espalda",
    description: "Nos enfocaremos en fortalecer tu core y mejorar tu postura para aliviar y prevenir el dolor de espalda."
  },
  legs: {
    title: "caderas",
    description: "Trabajaremos la flexibilidad y fortalecimiento de tus caderas con ejercicios suaves y efectivos."
  },
  none: {
    title: "",
    description: "Nuestros ejercicios fortalecen todo tu cuerpo y evitan que tengas esos problemas."
  }
};

export const ConfirmationStep = ({ data, onNext }: Props) => {
  const pains = data.physicalPains || [];
  const hasNoPain = pains.includes("none") || pains.length === 0;
  
  const getPersonalizedMessage = () => {
    if (hasNoPain) {
      return "Nuestros ejercicios fortalecen todo tu cuerpo y evitan que tengas esos problemas.";
    }
    
    const painAreas = pains
      .filter(p => p !== "none")
      .map(p => painMessages[p]?.title)
      .filter(Boolean);
    
    if (painAreas.length === 1) {
      return `Adaptaremos los ejercicios para cuidar tus ${painAreas[0]}. ${painMessages[pains[0]]?.description || ""}`;
    }
    
    if (painAreas.length === 2) {
      return `Adaptaremos los ejercicios para cuidar tus ${painAreas[0]} y ${painAreas[1]}. Cada movimiento será pensado para fortalecer sin causar molestias.`;
    }
    
    return `Adaptaremos los ejercicios para cuidar tus ${painAreas.slice(0, -1).join(", ")} y ${painAreas[painAreas.length - 1]}. Cada movimiento será pensado para fortalecer sin causar molestias.`;
  };

  return (
    <StepContainer textAlign="left">
      <div className="text-left max-w-sm mx-auto">
        <h1 className="text-xl font-extrabold text-foreground mb-4">
          ¡Perfecto, entendido!
        </h1>
        
        <p className="text-muted-foreground text-sm leading-relaxed mb-6">
          {getPersonalizedMessage()}
        </p>

        <p className="text-foreground font-semibold text-sm leading-relaxed mb-6">
          ¡Una rutina de ejercicio fácil y constante significa una vida sana y feliz!
        </p>

        <img 
           src={images.confirmationTrainer} 
          alt="Entrenadora ZenLife"
          className="w-full max-w-xs"
        />

        <ContinueButton onClick={onNext} className="mt-6" />
      </div>
    </StepContainer>
  );
};
