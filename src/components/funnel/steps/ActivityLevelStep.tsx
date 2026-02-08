 import { StepContainer } from "../StepContainer";
 import { useEffect, useState } from "react";
 import { Star } from "lucide-react";
 import { images } from "@/lib/imageUrls";

const milestones = [
  { 
    days: 10, 
    percent: 30, 
    color: "bg-red-500", 
    title: "En 10 días...", 
    description: "¡Vas a notar la diferencia!" 
  },
  { 
    days: 18, 
    percent: 60, 
    color: "bg-yellow-400", 
    title: "En 18 días...", 
    description: "Los demás notarán la diferencia." 
  },
  { 
    days: 30, 
    percent: 90, 
    color: "bg-green-500", 
    title: "En 30 días...", 
    description: "Tendrás un nuevo cuerpo." 
  },
];

const testimonials = [
  {
    name: "María G.",
     image: images.testimonialMaria,
    text: "¡Increíble! En solo 2 semanas ya noté cambios en mi postura y menos dolor de espalda.",
    rating: 5,
  },
  {
    name: "Carmen L.",
     image: images.testimonialCarmen,
    text: "Nunca pensé que ejercicios tan simples pudieran dar resultados tan rápidos. ¡Lo recomiendo!",
    rating: 5,
  },
  {
    name: "Ana P.",
     image: images.testimonialAna,
    text: "A mis 52 años encontré el ejercicio perfecto. Sin impacto y con resultados visibles.",
    rating: 5,
  },
];

export const ActivityLevelStep = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <StepContainer centered>
      <div className="text-center max-w-sm mx-auto">
        <h1 className="text-xl font-bold text-foreground leading-tight mb-3">
          ¡Con nuestro programa, podrás ver tus{" "}
          <span className="text-foreground">resultados desde los primeros días!</span>
        </h1>
        
        <p className="text-sm text-muted-foreground leading-relaxed mb-6">
          El pilates en la pared, además de ayudarte a alcanzar tus objetivos, te mostrará lo{" "}
          <span className="font-bold text-foreground">
            increíble que es tu cuerpo y todo lo que realmente puede hacer, ¡usando solo una pared!
          </span>
        </p>

        <div className="grid grid-cols-3 gap-3 mb-6">
          {milestones.map((milestone) => (
            <div
              key={milestone.days}
              className="bg-card rounded-2xl p-3 shadow-soft"
            >
              <div className="flex flex-col items-center">
                <div className="relative mb-2">
                  <span className="text-sm font-bold text-foreground">{milestone.percent}%</span>
                  <div className="w-12 h-24 bg-muted rounded-lg mt-1 overflow-hidden flex flex-col justify-end">
                    <div 
                      className={`w-full ${milestone.color} rounded-t-sm transition-all`}
                      style={{ height: `${milestone.percent}%` }}
                    />
                  </div>
                </div>
                
                <p className="font-bold text-foreground text-xs">{milestone.title}</p>
                <p className="text-muted-foreground text-xs text-center leading-tight mt-1">
                  {milestone.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials slider */}
        <div className="bg-card rounded-2xl p-4 shadow-soft mb-4 min-h-[140px]">
          <div className="flex items-center gap-3 mb-3">
            <img 
              src={testimonials[currentTestimonial].image} 
              alt={testimonials[currentTestimonial].name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="text-left">
              <p className="text-sm font-bold text-foreground">
                {testimonials[currentTestimonial].name}
              </p>
              <div className="flex gap-0.5">
                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
            </div>
          </div>
          <p className="text-sm text-muted-foreground italic">
            "{testimonials[currentTestimonial].text}"
          </p>
          
          {/* Dots indicator */}
          <div className="flex justify-center gap-2 mt-3">
            {testimonials.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentTestimonial ? "bg-primary w-4" : "bg-muted-foreground/30"
                }`}
              />
            ))}
          </div>
        </div>

        <p className="text-sm text-muted-foreground italic">
          Continúa respondiendo para recibir tu protocolo de Pilates en la Pared.
        </p>
      </div>
    </StepContainer>
  );
};
