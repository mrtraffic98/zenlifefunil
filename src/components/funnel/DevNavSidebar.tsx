import { useState } from "react";
import { Menu, X, ChevronRight } from "lucide-react";

interface Props {
  currentStep: number;
  onStepChange: (step: number) => void;
  totalSteps: number;
}

const stepNames = [
  "1. Welcome (Edad)",
  "2. ¿Conoces Pilates?",
  "3. Educación",
  "4. Objetivos",
  "5. Tipo de cuerpo",
  "6. Dificultad peso",
  "7. Última vez satisfecha",
  "8. Social Proof",
  "9. Eventos de vida",
  "10. Dolores físicos",
  "11. Confirmación",
  "12. Áreas objetivo",
  "13. Promesa de progreso",
  "14. Nivel actividad",
  "15. Rutina diaria",
  "16. Caminata diaria",
  "17. Respiración escaleras",
  "18. Flexibilidad",
  "19. Sueño",
  "20. Energía",
  "21. Hidratación",
  "22. Alimentación sana",
  "23. Después de comer",
  "24. Malos hábitos",
  "25. Después comidas",
  "26. Hábitos alimenticios",
  "27. Altura",
  "28. Peso actual",
  "29. Peso objetivo",
  "30. Nombre",
  "31. Loading",
  "32. Resultados",
  "33. Hora entrenamiento",
  "34. Días entrenamiento",
  "35. Protocol Loading",
  "36. Proyección peso",
  "37. Oferta",
];

export const DevNavSidebar = ({ currentStep, onStepChange, totalSteps }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Hamburger button - always visible */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-3 right-3 z-50 p-2 bg-primary text-primary-foreground rounded-lg shadow-lg hover:bg-primary/90 transition-colors"
        aria-label="Abrir navegación"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-card border-l border-border z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="font-bold text-foreground text-sm">Dev Navigation</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 hover:bg-muted rounded-md transition-colors"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Current step indicator */}
        <div className="p-3 bg-primary/10 border-b border-border">
          <p className="text-xs text-muted-foreground">Paso actual:</p>
          <p className="font-semibold text-primary text-sm">{stepNames[currentStep - 1]}</p>
        </div>

        {/* Steps list */}
        <div className="overflow-y-auto h-[calc(100%-120px)]">
          {stepNames.map((name, index) => {
            const stepNum = index + 1;
            const isActive = stepNum === currentStep;
            
            return (
              <button
                key={stepNum}
                onClick={() => {
                  onStepChange(stepNum);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-2 px-4 py-2.5 text-left text-sm transition-colors ${
                  isActive
                    ? "bg-primary/20 text-primary font-medium border-l-2 border-primary"
                    : "text-foreground hover:bg-muted"
                }`}
              >
                <ChevronRight className={`w-3 h-3 flex-shrink-0 ${isActive ? "text-primary" : "text-muted-foreground"}`} />
                <span className="truncate">{name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};
