 import { StepContainer } from "../StepContainer";
 import { ContinueButton } from "../ContinueButton";
 import { Star, Users, Trophy } from "lucide-react";
 import { useEffect, useState } from "react";
 import {
   Carousel,
   CarouselContent,
   CarouselItem,
   type CarouselApi,
 } from "@/components/ui/carousel";
 import { images } from "@/lib/imageUrls";

const testimonials = [
   { image: images.testimonial1, name: "Ana", weight: "-18kg" },
   { image: images.testimonial2, name: "Juliana", weight: "-15kg" },
   { image: images.testimonial3, name: "Márcia", weight: "-22kg" },
];

interface Props {
  onNext?: () => void;
}

export const SocialProofStep = ({ onNext }: Props) => {
  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    if (!api) return;

    const interval = setInterval(() => {
      api.scrollNext();
    }, 3000);

    return () => clearInterval(interval);
  }, [api]);

  return (
    <StepContainer centered textAlign="left">
      <div className="text-center">
        <h1 className="text-xl font-extrabold text-foreground mb-2">
          Somos ZenLife 💖
        </h1>
        <p className="text-sm text-muted-foreground mb-8">
          Y ya he ayudado a más de <span className="font-bold text-primary">250 mil mujeres</span> a superar sus dificultades con mi programa de pilates en la pared
        </p>

        <Carousel className="w-full mb-8" opts={{ loop: true }} setApi={setApi}>
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index}>
                <div className="relative">
                  <img 
                    src={testimonial.image} 
                    alt={`Transformação de ${testimonial.name}`}
                    className="w-full rounded-2xl shadow-soft"
                  />
                  <div className="absolute bottom-3 left-3 bg-primary/90 text-primary-foreground px-3 py-1 rounded-full text-sm font-bold">
                    {testimonial.name}: {testimonial.weight}
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="w-12 h-12 mx-auto rounded-full gradient-primary flex items-center justify-center mb-2">
              <Users className="w-6 h-6 text-primary-foreground" />
            </div>
            <p className="text-lg font-semibold text-primary">250K+</p>
            <p className="text-xs text-muted-foreground">Usuarias</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 mx-auto rounded-full gradient-primary flex items-center justify-center mb-2">
              <Star className="w-6 h-6 text-primary-foreground" />
            </div>
            <p className="text-lg font-semibold text-primary">4.9</p>
            <p className="text-xs text-muted-foreground">Calificación</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 mx-auto rounded-full gradient-primary flex items-center justify-center mb-2">
              <Trophy className="w-6 h-6 text-primary-foreground" />
            </div>
            <p className="text-lg font-semibold text-primary">14kg</p>
            <p className="text-xs text-muted-foreground">Promedio</p>
          </div>
        </div>

        <ContinueButton onClick={onNext} className="mt-6" />
      </div>
    </StepContainer>
  );
};
