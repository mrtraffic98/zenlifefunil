 import { useState, useEffect } from "react";
 import { UserData } from "@/types/funnel";
 import { images } from "@/lib/imageUrls";

interface Props {
  data: UserData;
  onChange: (data: Partial<UserData>) => void;
  onSelect: () => void;
}

const ageOptions = [
   { id: "18-29", label: "18 - 29 años", image: images.age1829 },
   { id: "30-39", label: "30 - 39 años", image: images.age3039 },
   { id: "40-49", label: "40 - 49 años", image: images.age4049 },
   { id: "50+", label: "+ 50 años", image: images.age50plus },
];

const testimonials = [
   { name: "Martha Torres Gutiérrez", text: "¡Fantástico! Empecé hoy y terminé exhausta. 💪🎉", image: images.profileMartha },
   { name: "Rose Vega", text: "Duro pero entretenido, me Gsuto", image: images.profileRose },
   { name: "Nancy Perez Romero", text: "Listo, primer día logrado !! Con mucho esfuerzo", image: images.profileNancy },
   { name: "Claudia Ibeth Ramos Espinoza", text: "Estoy muriendo y eso que hago yoga. Muy buena la clase", image: images.profileClaudia },
];

export const WelcomeStep = ({ data, onChange, onSelect }: Props) => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSelect = (ageId: string) => {
    onChange({ ageRange: ageId });
    onSelect();
  };

  return (
    <div className="flex-1 px-5 py-6 overflow-y-auto flex flex-col justify-center">
      <div className="max-w-sm mx-auto w-full">
        {/* Logo */}
        <div className="flex justify-center mb-3">
           <img src={images.logo} alt="ZenLife" className="h-8" />
        </div>

        {/* Title */}
        <div className="text-center mb-2">
          <h1 className="text-base font-black text-foreground leading-tight tracking-tight">
            PLAN <span className="text-primary">PERSONALIZADO</span> DE PILATES EN LA PARED CON ADRIANA CARDOZO
          </h1>
        </div>

        {/* Subtitles */}
        <div className="text-center mb-3">
          <p className="text-muted-foreground text-xs font-medium tracking-wide">BASADO EN TU EDAD</p>
          <p className="text-primary text-xs font-bold mt-1 tracking-wider">PRUEBA DE 1 MINUTO</p>
        </div>

        {/* Instruction */}
        <p className="text-center text-sm font-medium text-muted-foreground mb-4">
          Selecciona tu edad para comenzar
        </p>

        {/* Age Grid */}
        <div className="grid grid-cols-2 gap-2.5 mb-4">
          {ageOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => handleSelect(option.id)}
              className="flex flex-col items-center bg-card rounded-xl overflow-hidden border-2 border-border hover:border-primary transition-all duration-200 shadow-soft"
            >
              <div className="w-full aspect-square bg-muted flex items-center justify-center overflow-hidden">
                {option.image ? (
                  <img 
                    src={option.image} 
                    alt={option.label}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-3xl opacity-30">👤</div>
                )}
              </div>
              <div className="w-full py-2 bg-primary text-primary-foreground text-sm font-semibold text-center">
                {option.label}
              </div>
            </button>
          ))}
        </div>

        {/* Warning */}
        <div className="text-center mb-4">
          <p className="text-xs text-primary leading-relaxed font-medium">
            <span className="font-bold">Atención:</span> ofrecemos solo <span className="font-bold">una consulta por persona.</span> Si sales, perderás tu turno.
          </p>
        </div>

        {/* Testimonial Slider */}
        <div className="bg-card rounded-xl p-3 border border-border mb-4 overflow-hidden shadow-soft">
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
          >
            {testimonials.map((testimonial, index) => (
              <div key={index} className="min-w-full flex items-center gap-3">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-0.5 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-yellow-400 text-xs">★</span>
                    ))}
                  </div>
                  <p className="font-bold text-xs text-foreground">{testimonial.name}</p>
                  <p className="text-xs font-normal text-muted-foreground line-clamp-2">{testimonial.text}</p>
                </div>
              </div>
            ))}
          </div>
          {/* Dots */}
          <div className="flex justify-center gap-1.5 mt-2">
            {testimonials.map((_, index) => (
              <div 
                key={index} 
                className={`w-1.5 h-1.5 rounded-full transition-colors ${
                  index === currentTestimonial ? 'bg-primary' : 'bg-muted-foreground/30'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-xs text-muted-foreground leading-relaxed font-normal">
            Al hacer clic, aceptas los Términos, <span className="text-primary font-medium">Política de privacidad</span> y <span className="text-primary font-medium">Política de cookies</span>.
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            <span className="font-bold">ZenLife 2025 ©</span>
          </p>
        </div>
      </div>
    </div>
  );
};