 import { useState, useEffect, useRef } from "react";
 import { UserData } from "@/types/funnel";
 import { images } from "@/lib/imageUrls";
 import appDemoGif from "@/assets/app-demo.gif";
 import testimonialVideo1 from "@/assets/testimonial-video-1.mp4";
 import testimonialVideo2 from "@/assets/testimonial-video-2.mp4";
 import testimonialVideo3 from "@/assets/testimonial-video-3.mp4";
import { 
  Shield, 
  Clock, 
  Check, 
  Star, 
  Zap,
  Gift,
  Lock,
  CreditCard,
  ChevronLeft,
  ChevronRight,
  PlayCircle,
  MessageSquare
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface Props {
  data: UserData;
}

export const OfferStep = ({ data }: Props) => {
  const [timeLeft, setTimeLeft] = useState(5 * 60); // 5 minutes
  const [headerTimeLeft, setHeaderTimeLeft] = useState(10 * 60); // 10 minutes for header timer
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentBenefitSlide, setCurrentBenefitSlide] = useState(0);
  const [currentVideoSlide, setCurrentVideoSlide] = useState(0);
  const [currentResultsSlide, setCurrentResultsSlide] = useState(0);
  const [selectedPlan, setSelectedPlan] = useState('4-weeks');
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const testimonialVideos = [
    testimonialVideo1,
    testimonialVideo2,
    testimonialVideo3
  ];

  const nextVideoSlide = () => setCurrentVideoSlide((prev) => (prev + 1) % testimonialVideos.length);
  const prevVideoSlide = () => setCurrentVideoSlide((prev) => (prev - 1 + testimonialVideos.length) % testimonialVideos.length);

  // Results testimonials data
  const resultsTestimonials = [
    { image: images.testimonialYuli, name: "Yuli Cristina Suárez", age: 25 },
    { image: images.testimonialMariaJose, name: "María José García", age: 42 },
    { image: images.testimonialLaura, name: "Laura Martínez", age: 31 },
    { image: images.testimonialCarolina, name: "Carolina López", age: 28 },
    { image: images.testimonialSandra, name: "Sandra Ruiz", age: 45 },
    { image: images.testimonialAndrea, name: "Andrea Fernández", age: 35 },
    { image: images.testimonialGabriela, name: "Gabriela Santos", age: 29 },
  ];

  const nextResultsSlide = () => setCurrentResultsSlide((prev) => (prev + 1) % resultsTestimonials.length);
  const prevResultsSlide = () => setCurrentResultsSlide((prev) => (prev - 1 + resultsTestimonials.length) % resultsTestimonials.length);

   // Benefits slider data
   const benefitsSlides = [
     {
      image: images.benefitWeightLossTransformation,
      title: "Pérdida de Peso",
      description: "El exceso de peso representa grandes riesgos para nuestra longevidad, autoestima y salud en general. Puedes deshacerte del exceso de grasa haciendo Pilates en la Pared regularmente. La práctica te ayudará a quemar calorías y crear el déficit energético necesario para quemar grasa."
     },
    {
      image: images.benefitStrengthTransformation,
      title: "Aumentar tu Fuerza",
      description: "¿Te sientes constantemente sin energía o fuerza para hacer las cosas que solías hacer? Un plan de entrenamiento personalizado te ayudará a sentirte con más energía y aumentar tu fuerza rápidamente con solo 10 minutos al día."
    },
    {
      image: images.benefitDiastasisTransformation,
      title: "Curar la Diástasis",
      description: "El pilates es un excelente aliado cuando se trata de curar la diástasis. Con ejercicios que fortalecen tu core y abdomen, logra \"cerrar\" los músculos que están separados. ¡Los resultados son increíbles!"
    },
    {
      image: images.benefitPostureTransformation,
      title: "Mejorar la Postura",
      description: "La investigación ha demostrado que las personas con mejor postura son vistas como más atractivas. Además, mantener una postura correcta reduce significativamente el dolor en las articulaciones y la espalda. Tu plan personalizado incluye ejercicios destinados a mejorar tu postura."
    },
    {
      image: images.benefitBackPainTransformation,
      title: "Reducción del Dolor de Espalda",
      description: "Como dice el refrán, eres tan viejo como tu columna. Miles de personas han eliminado con éxito su dolor de espalda haciendo Pilates en la Pared, ¡y tú puedes ser la próxima!"
    },
    {
      image: images.benefitStressAnxietyTransformation,
      title: "Menos Estrés y Ansiedad",
      description: "Los niveles elevados de estrés y ansiedad pueden llevar al aumento de peso, depresión y mucho más. Una práctica saludable de yoga puede aliviar los síntomas de estrés y permitirte vivir una vida más plena."
    },
    {
      image: images.benefitQualityLifeTransformation,
      title: "Mejorar la Calidad de Vida",
      description: "Además de transformar el cuerpo, Pilates en la Pared contribuye a una vida más equilibrada, brindando beneficios como más energía, menos dolores y una sensación de bienestar general, aumentando tu longevidad y calidad de vida."
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const headerTimer = setInterval(() => {
      setHeaderTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(headerTimer);
  }, []);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const headerMinutes = Math.floor(headerTimeLeft / 60);
  const headerSeconds = headerTimeLeft % 60;

  // Student comments data - all 4 displayed at once
  const studentComments = [
    { name: "Martha Torres Gutiérrez", comment: "¡Fantástico! Empecé hoy y terminé exhausta. 💪🎉", rating: 5, image: images.profileMartha },
    { name: "Rose Vega", comment: "Duro pero entretenido, me Gsuto", rating: 5, image: images.profileRose },
    { name: "Nancy Perez Romero", comment: "Listo, primer día logrado !! Con mucho esfuerzo", rating: 5, image: images.profileNancy },
    { name: "Claudia Ibeth Ramos Espinoza", comment: "Estoy muriendo y eso que hago yoga. Muy buena la clase", rating: 5, image: images.profileClaudia },
  ];

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % studentComments.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + studentComments.length) % studentComments.length);
  const nextBenefitSlide = () => setCurrentBenefitSlide((prev) => (prev + 1) % benefitsSlides.length);
  const prevBenefitSlide = () => setCurrentBenefitSlide((prev) => (prev - 1 + benefitsSlides.length) % benefitsSlides.length);

  // Auto-play comment slider
  useEffect(() => {
    const autoPlay = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % studentComments.length);
    }, 4000);
    return () => clearInterval(autoPlay);
  }, [studentComments.length]);

  // Auto-play benefits slider
  useEffect(() => {
    const autoPlayBenefits = setInterval(() => {
      setCurrentBenefitSlide((prev) => (prev + 1) % benefitsSlides.length);
    }, 5000);
    return () => clearInterval(autoPlayBenefits);
  }, [benefitsSlides.length]);

  const whyItWorks = [
    {
      emoji: "😊",
      title: "No necesitas equipos",
      description: "El Pilates en la Pared combina los principios del Pilates tradicional con la practicidad de usar la pared como soporte, lo que hace que los ejercicios sean más accesibles y efectivos, incluso para quienes nunca han entrenado antes."
    },
    {
      emoji: "🔥",
      title: "Activa el modo quema de grasa",
      description: "Con solo 10 minutos de Pilates en la Pared, podrás acelerar tu metabolismo y activar el modo de quema de grasa constante, permitiéndote perder todo el peso necesario en hasta 26 días de forma natural."
    },
    {
      emoji: "😊",
      title: "Es simple y fácil de hacer",
      description: "La pared te ayuda a mantener el equilibrio y proporciona un soporte extra, permitiéndote realizar los movimientos de manera segura, sin riesgo de lesiones. El método es fácil de aplicar, efectivo para perder peso y se puede hacer en cualquier lugar de tu casa."
    }
  ];

  const idealFor = [
    {
      icon: "📋",
      title: "Para quienes quieren perder peso",
      items: [
        { emoji: "🍔", text: "Perder peso sin dietas extremas" },
        { emoji: "💪", text: "Mejorar la energía y el bienestar" },
        { emoji: "🤰", text: "Post-embarazo" }
      ]
    },
    {
      icon: "⏱️",
      title: "Para quienes no tienen tiempo",
      items: [
        { emoji: "👨‍👩‍👧", text: "Madres con hijos en casa" },
        { emoji: "⏰", text: "Mujeres con solo 15 min/día" },
        { emoji: "📱", text: "No hay tiempo para ir al gimnasio" }
      ]
    },
    {
      icon: "🎯",
      title: "Para situaciones específicas",
      items: [
        { emoji: "🏠", text: "Curar diástasis" },
        { emoji: "👵", text: "Personas mayores" },
        { emoji: "🦴", text: "Curar la osteoporosis" },
        { emoji: "🏋️", text: "Retomar la rutina de entrenamiento" }
      ]
    }
  ];

  const whatYouGet = [
    { emoji: "📋", title: "Plan completo de entrenamiento de Pilates en la Pared", description: "Asistencia del día 1 al día 28." },
    { emoji: "🎬", title: "Videos enseñando los movimientos.", description: "Entrenadores personales preparados para mostrar la postura correcta de cada ejercicio." },
    { emoji: "🧘", title: "Guías de Estiramientos Pre y Post entrenamiento.", description: "Videos demostrativos para mejorar la flexibilidad." },
    { emoji: "🥗", title: "Plan de Alimentación Saludable.", description: "Para potenciar aún más tus resultados." },
    { emoji: "💬", title: "Sesiones de Consultoría con Instructores.", description: "Para que puedas resolver todas tus dudas." },
    { emoji: "🌸", title: "Guía de Técnicas de Relajación.", description: "Eliminando todo el estrés acumulado." }
  ];

  const bonuses = [
     { name: "Formas Naturales de Superar la Menopausia", price: "$45.00", image: images.bonusMenopausia },
     { name: "Guía Eliminando la Celulitis", price: "$39.00", image: images.bonusCelulitis },
     { name: "Recetas Fit - Acelerador de Resultados", price: "$17.00", image: images.bonusRecetas }
  ];

  const planItems = [
    "Acceso vitalicio a tu plan personalizado de pilates en la pared",
    "Estiramientos antes y después de los entrenamientos",
    "Técnicas de relajación",
    "Bono 01: Formas naturales de superar la menopausia",
    "Bono 02: Guía para eliminar la celulitis",
    "Bono 03: Guía para eliminar la flacidez",
    "Bono 4: Guía para el dolor de espalda y su alivio: material completo.",
    "Bono 5: Zumos detox fáciles de preparar en casa.",
    "Bono 6: Recetas saladas fitness para perder peso de forma deliciosa.",
    "Bono 7: Comida y cena fitness para mantener la concentración."
  ];

  const savingsItems = [
    { name: "Cirugía bariátrica", value: "$5,000.00" },
    { name: "Clases particulares de pilates", value: "$2,500.00" },
    { name: "Dolor de espalda - Consultas con quiropráctico", value: "$1,900.00" },
    { name: "Fuerza mejorada - Membresía anual del gimnasio", value: "$1,000.00" },
    { name: "Taller de meditación", value: "$900.00" },
    { name: "Mayor esperanza de vida", value: "¡Invaluable!" },
    { name: "Una vida más feliz con menos dolor", value: "¡Invaluable!" }
  ];

  const stats = [
    { percentage: 96, color: "#22c55e", description: "¡El 96% de nuestras alumnas notan la diferencia en los primeros 18 días!" },
    { percentage: 93, color: "#3b82f6", description: "¡El 93% de las mujeres logran alcanzar sus objetivos!" },
    { percentage: 99, color: "#f97316", description: "¡El 99% de las mujeres recomiendan nuestro programa a una amiga!" }
  ];

  const faqs = [
    { 
      question: "¿Es el método seguro para quienes nunca han entrenado antes?", 
      icon: "🏋️",
      answer: "¡Absolutamente! Nuestro método fue diseñado pensando en principiantes. Todos los ejercicios son de bajo impacto, guiados paso a paso y adaptados a tu nivel. La pared te brinda el soporte necesario para mantener la postura correcta y evitar lesiones. Miles de mujeres que nunca habían hecho ejercicio ya están transformando su cuerpo de forma segura."
    },
    { 
      question: "¿Necesito experiencia previa en Pilates?", 
      icon: "✈️",
      answer: "No necesitas ninguna experiencia previa. Nuestro programa está estructurado desde cero, con instrucciones claras y videos detallados. Cada ejercicio tiene variaciones para que puedas progresar a tu ritmo. Ya seas principiante o tengas experiencia, el programa se adapta a ti."
    },
    { 
      question: "¿Cuánto tiempo al día necesito para ver resultados?", 
      icon: "⏰",
      answer: "Con solo 10 a 15 minutos al día puedes empezar a notar cambios. Nuestras rutinas están diseñadas para ser cortas pero efectivas, perfectas para mujeres ocupadas. La consistencia es clave: dedicando unos minutos diarios verás resultados visibles en pocas semanas."
    },
    { 
      question: "Seguridad de tus datos", 
      icon: "🛡️",
      answer: "Tu privacidad es nuestra prioridad. Utilizamos encriptación de nivel bancario (SSL 256-bit) para proteger toda tu información personal y de pago. Nunca compartimos tus datos con terceros y cumplimos con todas las regulaciones internacionales de protección de datos."
    },
    { 
      question: "Garantía de devolución del dinero en 30 días", 
      icon: "✅",
      answer: "Estamos tan seguros de que amarás el programa que ofrecemos una garantía de satisfacción de 30 días. Si por cualquier razón no estás satisfecha con los resultados, simplemente contáctanos y te devolvemos el 100% de tu dinero, sin preguntas ni complicaciones."
    },
    { 
      question: "Compra segura", 
      icon: "🔒",
      answer: "Tu compra está 100% protegida. Utilizamos procesadores de pago certificados internacionalmente y tecnología de seguridad avanzada. Puedes pagar con tarjeta de crédito, débito o PayPal con total tranquilidad. El cargo aparecerá de forma discreta en tu estado de cuenta."
    },
    { 
      question: "¿Cuánto tiempo tendré acceso?", 
      icon: "♾️",
      answer: "Dependiendo del plan que elijas, tendrás acceso completo durante 1, 4 o 12 semanas. Durante ese tiempo podrás acceder ilimitadamente a todos los videos, guías y materiales bonus. Podrás repetir las rutinas cuantas veces quieras y avanzar a tu propio ritmo."
    },
    { 
      question: "¿Cómo recibiré mi acceso?", 
      icon: "📩",
      answer: "Inmediatamente después de completar tu compra, recibirás un email con tus credenciales de acceso y un enlace directo a la plataforma. Podrás comenzar tu transformación en cuestión de minutos. También puedes acceder desde cualquier dispositivo: celular, tablet o computadora."
    }
  ];

  return (
    <div className="min-h-screen bg-background pb-6">
      <div className="px-4 pt-6 max-w-lg mx-auto">

        {/* Emotional headline */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-foreground mb-3">
            ¡{data.name}!<br />
            ¡Tu Plan de Pilates Está Listo!
          </h1>
        </div>

        {/* Transformation Comparison Section */}
        {(() => {
          // Calculate BMI
          const heightInMeters = data.height / 100;
          const bmi = data.currentWeight / (heightInMeters * heightInMeters);
          
          // Determine image and fat level based on BMI
          let currentImage = images.resultsNormalWoman;
          let fatLevel = "Normal";
          let progressBars = 2; // How many bars are filled
          
          if (bmi < 18.5) {
            currentImage = images.resultsSlimWoman;
            fatLevel = "Baja";
            progressBars = 1;
          } else if (bmi >= 18.5 && bmi < 25) {
            currentImage = images.resultsNormalWoman;
            fatLevel = "Normal";
            progressBars = 2;
          } else if (bmi >= 25 && bmi < 30) {
            currentImage = images.resultsMediumWoman;
            fatLevel = "Alta";
            progressBars = 2;
          } else {
            currentImage = images.resultsHighWoman;
            fatLevel = "Muy Alta";
            progressBars = 3;
          }
          
          return (
            <div className="mb-8">
              {/* Header Tabs */}
              <div className="bg-card rounded-xl border border-border overflow-hidden shadow-soft">
                <div className="grid grid-cols-2 divide-x divide-border bg-muted/30">
                  <div className="py-3 text-center">
                    <span className="text-sm font-semibold text-foreground">Ahora</span>
                  </div>
                  <div className="py-3 text-center">
                    <span className="text-sm font-extrabold text-foreground">Tu objetivo</span>
                  </div>
                </div>

                {/* Body Images Comparison */}
                <div className="grid grid-cols-2 items-end relative py-4">
                  {/* Before Image - Based on BMI */}
                  <div className="flex justify-center">
                    <img 
                      src={currentImage} 
                      alt="Estado actual" 
                      className="h-40 object-contain"
                    />
                  </div>
                  
                  {/* Animated Arrow */}
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                    <span className="text-4xl text-primary font-bold inline-block animate-[bounceRight_1s_ease-in-out_infinite]">»</span>
                  </div>
                  
                  {/* After Image */}
                  <div className="flex justify-center">
                    <img 
                      src={images.goalObjective} 
                      alt="Tu objetivo" 
                      className="h-40 object-contain"
                    />
                  </div>
                </div>

                {/* Stats Comparison */}
                <div className="grid grid-cols-2 divide-x divide-border border-t border-border">
                  {/* Before Stats */}
                  <div className="p-4 space-y-4">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Grasa corporal</p>
                      <p className="text-sm font-extrabold text-foreground">{fatLevel}</p>
                    </div>
                    <div className="border-t border-border pt-4">
                      <p className="text-xs text-muted-foreground mb-1">Masa muscular</p>
                      <p className="text-sm font-extrabold text-foreground">Muy baja</p>
                    </div>
                    <div className="border-t border-border pt-4">
                      <p className="text-xs text-muted-foreground mb-1">Nivel de Pilates</p>
                      <p className="text-sm font-extrabold text-foreground">Principiante</p>
                    </div>
                    {/* Progress bars for Nivel de Pilates */}
                    <div className="flex gap-1.5">
                      <div className="h-1.5 w-6 rounded-full bg-foreground"></div>
                    </div>
                  </div>

                  {/* After Stats */}
                  <div className="p-4 space-y-4">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Grasa corporal</p>
                      <p className="text-sm font-extrabold text-foreground">Baja</p>
                    </div>
                    <div className="border-t border-border pt-4">
                      <p className="text-xs text-muted-foreground mb-1">Masa muscular</p>
                      <p className="text-sm font-extrabold text-foreground">Alta</p>
                    </div>
                    <div className="border-t border-border pt-4">
                      <p className="text-xs text-muted-foreground mb-1">Nivel de Pilates</p>
                      <p className="text-sm font-extrabold text-foreground">Avanzado</p>
                    </div>
                    {/* Progress bars */}
                    <div className="flex gap-1.5">
                      <div className="h-1.5 flex-1 rounded-full bg-foreground"></div>
                      <div className="h-1.5 flex-1 rounded-full bg-foreground"></div>
                      <div className="h-1.5 flex-1 rounded-full bg-foreground"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })()}

        {/* Plan Highlights Section - Personalized */}
        <div className="mb-8 bg-card rounded-xl border border-border p-5 shadow-soft">
          <h2 className="text-lg font-extrabold text-foreground mb-5">
            Aspectos destacados de tu plan
          </h2>
          
          <div className="space-y-4">
            {/* Workout at home */}
            <div className="flex items-start gap-4 justify-start">
              <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center text-foreground/70">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 14v1"/><path d="M9 8v2"/><path d="M15 12v3"/><path d="M15 8v1"/></svg>
              </div>
              <div className="flex-1">
                <p className="text-sm font-extrabold text-foreground">Entrenamientos fáciles en casa</p>
                <p className="text-xs text-muted-foreground">
                  {(() => {
                    const goals = data.mainGoals || [];
                    const goalLabels: string[] = [];
                    
                    if (goals.includes('lose-weight')) goalLabels.push('perder peso');
                    if (goals.includes('posture')) goalLabels.push('mejorar postura');
                    if (goals.includes('strength')) goalLabels.push('ganar fuerza');
                    if (goals.includes('stress')) goalLabels.push('reducir estrés');
                    if (goals.includes('flexibility')) goalLabels.push('mejorar flexibilidad');
                    if (goals.includes('diastasis')) goalLabels.push('tratar diástasis');
                    if (goals.includes('menopause')) goalLabels.push('reducir síntomas de la menopausia');
                    
                    if (goalLabels.length === 0) {
                      return 'Para perder peso y tonificar tu cuerpo';
                    } else if (goalLabels.length === 1) {
                      return `Para ${goalLabels[0]}`;
                    } else if (goalLabels.length === 2) {
                      return `Para ${goalLabels[0]} y ${goalLabels[1]}`;
                    } else {
                      return `Para ${goalLabels.slice(0, 2).join(', ')} y más`;
                    }
                  })()}
                </p>
              </div>
            </div>

            {/* Experience level */}
            <div className="flex items-start gap-4 justify-start">
              <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center text-foreground/70">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              </div>
              <div className="flex-1">
                <p className="text-sm font-extrabold text-foreground">
                  {data.knowsPilates ? 'Ejercicios para nivel intermedio' : 'Ejercicios para principiantes'}
                </p>
                <p className="text-xs text-muted-foreground">
                  {data.knowsPilates 
                    ? 'Para llevar tu práctica al siguiente nivel'
                    : 'Para un cuerpo más fuerte y mejor forma'}
                </p>
              </div>
            </div>

            {/* Routine duration */}
            <div className="flex items-start gap-4 justify-start">
              <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center text-foreground/70">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              </div>
              <div className="flex-1">
                <p className="text-sm font-extrabold text-foreground">
                  Rutinas de {data.workoutTime === '5-10' ? '5-10' : data.workoutTime === '10-15' ? '10-15' : data.workoutTime === '15-20' ? '15-20' : '10-20'} minutos
                </p>
                <p className="text-xs text-muted-foreground">
                  {data.workoutDays === '1-2' ? '1-2 días' : data.workoutDays === '3-4' ? '3-4 días' : data.workoutDays === '5-6' ? '5-6 días' : '3-5 días'} por semana que se adaptan a tu agenda
                </p>
              </div>
            </div>

            {/* No equipment */}
            <div className="flex items-start gap-4 justify-start">
              <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center text-foreground/70">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              </div>
              <div className="flex-1">
                <p className="text-sm font-extrabold text-foreground">Sin equipamientos</p>
                <p className="text-xs text-muted-foreground">Todo lo que necesitas es una pared y nuestro plan</p>
              </div>
            </div>

            {/* Meal plan */}
            <div className="flex items-start gap-4 justify-start">
              <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center text-foreground/70">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z"/><line x1="6" x2="18" y1="17" y2="17"/></svg>
              </div>
              <div className="flex-1">
                <p className="text-sm font-extrabold text-foreground">Plan de comidas personalizado</p>
                <p className="text-xs text-muted-foreground">
                  {data.healthyEating === 'always' || data.healthyEating === 'often'
                    ? 'Recetas saludables para potenciar tus resultados'
                    : 'Con recetas rápidas y deliciosas para mejorar tu alimentación'}
                </p>
              </div>
            </div>

            {/* Expert tips */}
            <div className="flex items-start gap-4 justify-start">
              <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center text-foreground/70">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/></svg>
              </div>
              <div className="flex-1">
                <p className="text-sm font-extrabold text-foreground">Consejos y trucos de especialistas</p>
                <p className="text-xs text-muted-foreground">
                  {data.physicalPains.length > 0 && !data.physicalPains.includes('none')
                    ? 'Para mejorar tu bienestar y aliviar dolores'
                    : 'Para mejorar tu estilo de vida y mantener la forma'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Transformation Headline */}
        <div className="mb-6 text-center">
          <h2 className="text-xl font-extrabold text-foreground">
            Comienza hoy tu transformación, aprovecha tu descuento exclusivo
          </h2>
        </div>

        {/* Pricing Plans Section */}
        <div className="mb-8">
          <div className="space-y-3">
            {/* Plan 1 - 1 Week */}
            <div 
              onClick={() => setSelectedPlan('1-week')}
              className={`relative bg-card rounded-xl border-2 p-4 cursor-pointer transition-all ${
                selectedPlan === '1-week' ? 'border-primary' : 'border-border'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                  selectedPlan === '1-week' ? 'border-primary bg-primary' : 'border-muted-foreground'
                }`}>
                  {selectedPlan === '1-week' && <Check className="w-3 h-3 text-primary-foreground" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-extrabold text-foreground">Prueba de 1 semana</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    <span className="line-through">$19.90</span> → <span className="font-semibold text-foreground">$5.90</span>
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-extrabold text-foreground">$0.84</p>
                  <p className="text-xs text-muted-foreground">por día</p>
                </div>
              </div>
            </div>

            {/* Plan 2 - 4 Weeks - Most Popular */}
            <div 
              onClick={() => setSelectedPlan('4-weeks')}
              className={`relative bg-card rounded-xl border-2 overflow-hidden cursor-pointer transition-all border-primary animate-pulse-soft ${
                selectedPlan === '4-weeks' ? 'shadow-card' : ''
              }`}
            >
              {/* Most Popular Badge */}
              <div className="bg-primary text-primary-foreground text-center py-1.5">
                <span className="text-xs font-bold uppercase tracking-wide">Más Popular</span>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-4">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                    selectedPlan === '4-weeks' ? 'border-primary bg-primary' : 'border-muted-foreground'
                  }`}>
                    {selectedPlan === '4-weeks' && <Check className="w-3 h-3 text-primary-foreground" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-extrabold text-foreground">Plan de 4 Semanas</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      <span className="line-through">$39.99</span> → <span className="font-semibold text-foreground">$9.90</span>
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-extrabold text-foreground">$0.35</p>
                    <p className="text-xs text-muted-foreground">por día</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Plan 3 - 12 Weeks */}
            <div 
              onClick={() => setSelectedPlan('12-weeks')}
              className={`relative bg-card rounded-xl border-2 p-4 cursor-pointer transition-all ${
                selectedPlan === '12-weeks' ? 'border-primary' : 'border-border'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                  selectedPlan === '12-weeks' ? 'border-primary bg-primary' : 'border-muted-foreground'
                }`}>
                  {selectedPlan === '12-weeks' && <Check className="w-3 h-3 text-primary-foreground" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-extrabold text-foreground">Plan de 12 Semanas</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    <span className="line-through">$119.90</span> → <span className="font-semibold text-foreground">$19.90</span>
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-extrabold text-foreground">$0.24</p>
                  <p className="text-xs text-muted-foreground">por día</p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <a 
            href={
              selectedPlan === '1-week' ? 'https://att.trk.healthnewsclub.com/click/1' :
              selectedPlan === '4-weeks' ? 'https://att.trk.healthnewsclub.com/click/2' :
              'https://att.trk.healthnewsclub.com/click/3'
            }
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full mt-4 py-4 rounded-full font-bold text-base bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg active:scale-[0.98] transition-all uppercase text-center animate-pulse-ring"
          >
            OBTENER MI PLAN
          </a>
        </div>

        {/* Student Comments Slider */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-center mb-4">
            Lo que dicen nuestras alumnas
          </h2>

          {/* Comments Slider */}
          <div className="relative">
            <div className="overflow-hidden rounded-2xl">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {studentComments.map((student, index) => (
                  <div key={index} className="min-w-full px-1">
                    <div className="bg-card rounded-2xl p-4 border border-border shadow-soft">
                      {/* Avatar and stars */}
                      <div className="flex items-center gap-3 mb-3">
                        <img 
                          src={student.image} 
                          alt={student.name}
                          className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                        />
                        <div>
                          <span className="font-bold text-sm block">{student.name}</span>
                          <div className="flex items-center gap-0.5">
                            {[...Array(student.rating)].map((_, i) => (
                              <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      {/* Comment */}
                      <p className="text-sm text-foreground leading-relaxed">"{student.comment}"</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 w-8 h-8 rounded-full bg-card border border-border shadow-soft flex items-center justify-center hover:bg-muted transition-colors"
            >
              <ChevronLeft className="w-4 h-4 text-foreground" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 w-8 h-8 rounded-full bg-card border border-border shadow-soft flex items-center justify-center hover:bg-muted transition-colors"
            >
              <ChevronRight className="w-4 h-4 text-foreground" />
            </button>

            {/* Dots indicator */}
            <div className="flex justify-center gap-2 mt-4">
              {studentComments.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    currentSlide === index ? 'bg-primary' : 'bg-muted'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Benefits Slider */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-center mb-4">
            Descubre los beneficios del Pilates en la Pared:
          </h2>
          <div className="relative">
            <div className="overflow-hidden rounded-2xl">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentBenefitSlide * 100}%)` }}
              >
                {benefitsSlides.map((slide, index) => (
                  <div key={index} className="min-w-full px-1">
                    <div className="bg-card rounded-2xl shadow-soft border border-border overflow-hidden">
                      <img 
                        src={slide.image} 
                        alt={slide.title}
                        className="w-full h-56 object-cover"
                      />
                      <div className="p-4 text-center">
                        <h3 className="text-base font-extrabold text-foreground mb-2">{slide.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{slide.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Arrows */}
            <button 
              onClick={prevBenefitSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-muted transition-colors z-10"
            >
              <ChevronLeft className="w-5 h-5 text-foreground" />
            </button>
            <button 
              onClick={nextBenefitSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-muted transition-colors z-10"
            >
              <ChevronRight className="w-5 h-5 text-foreground" />
            </button>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-4">
            {benefitsSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentBenefitSlide(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  currentBenefitSlide === index ? 'bg-primary' : 'bg-muted'
                }`}
              />
            ))}
          </div>
        </div>


        {/* Why it works section */}
        <div className="bg-muted/50 rounded-2xl p-6 mb-8">
          <h2 className="text-xl font-bold text-center mb-6">
            ¿Por qué funciona el Pilates en la Pared?
          </h2>
          <div className="space-y-6">
            {whyItWorks.map((item, index) => (
              <div key={index}>
                <h3 className="font-bold text-center mb-2">
                  {item.emoji} {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed text-center">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Ideal for section */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-center mb-6">
            Pilates en la Pared <span className="font-normal">es ideal para:</span>
          </h2>
          <div className="space-y-4">
            {idealFor.map((category, index) => (
              <div key={index} className="bg-card rounded-xl p-4 shadow-soft border border-border">
                <div className="text-2xl mb-2">{category.icon}</div>
                <h3 className="font-bold mb-3">{category.title}</h3>
                <div className="space-y-2">
                  {category.items.map((item, i) => (
                    <p key={i} className="text-sm flex items-center gap-2">
                      <span>{item.emoji}</span> {item.text}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* How to Access Section */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-center mb-4">
            ¿Cómo recibiré <span className="text-primary">mi acceso</span> a todo esto?
          </h2>
          <p className="text-center text-muted-foreground text-sm mb-4">
            Justo después de completar tu registro, recibirás un correo electrónico inmediato con <strong className="text-foreground">tu acceso a nuestra Área de Alumnas</strong>.
          </p>
          <p className="text-center text-muted-foreground text-sm mb-6">
            Dentro de nuestra Área de Alumnas, recibirás todas tus clases organizadas, una clase para cada día de la semana, <strong className="text-foreground">¡solo dale play y comienza!</strong>
          </p>
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <img 
              src={images.appAccessDemo}
              alt="Demo del app"
              className="w-full h-auto"
            />
          </div>
        </div>

        {/* Results Carousel */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-center mb-6">
            Resultados de los que nos <span className="text-primary">enorgullecemos:</span>
          </h2>
          <div className="relative">
            <div className="overflow-hidden rounded-2xl">
              <div 
                className="flex transition-transform duration-300 ease-in-out"
                style={{ transform: `translateX(-${currentResultsSlide * 100}%)` }}
              >
                {resultsTestimonials.map((testimonial, index) => (
                  <div key={index} className="min-w-full">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-full h-auto rounded-2xl"
                    />
                    <p className="text-center font-semibold mt-4">
                      {testimonial.name} - {testimonial.age} Años
                    </p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Navigation Arrows */}
            <button 
              onClick={prevResultsSlide}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white transition-colors"
              aria-label="Anterior"
            >
              <ChevronLeft className="w-5 h-5 text-foreground" />
            </button>
            <button 
              onClick={nextResultsSlide}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white transition-colors"
              aria-label="Siguiente"
            >
              <ChevronRight className="w-5 h-5 text-foreground" />
            </button>
          </div>
          
          {/* Dots */}
          <div className="flex justify-center gap-2 mt-4">
            {resultsTestimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentResultsSlide(index)}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${
                  index === currentResultsSlide ? 'bg-primary' : 'bg-muted'
                }`}
                aria-label={`Ir al testimonio ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Secondary Offer Block */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-center mb-6 text-foreground">
            No dejes para mañana lo que puedes empezar a cambiar <span className="text-primary">hoy!</span>
          </h2>
          
          <div className="space-y-3">
            {/* Plan 1 - 1 Week */}
            <div 
              onClick={() => setSelectedPlan('1-week')}
              className={`relative bg-card rounded-xl border-2 p-4 cursor-pointer transition-all ${
                selectedPlan === '1-week' ? 'border-primary' : 'border-border'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                  selectedPlan === '1-week' ? 'border-primary bg-primary' : 'border-muted-foreground'
                }`}>
                  {selectedPlan === '1-week' && <Check className="w-3 h-3 text-primary-foreground" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-extrabold text-foreground">Prueba de 1 semana</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    <span className="line-through">$19.90</span> → <span className="font-semibold text-foreground">$5.90</span>
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-extrabold text-foreground">$0.84</p>
                  <p className="text-xs text-muted-foreground">por día</p>
                </div>
              </div>
            </div>

            {/* Plan 2 - 4 Weeks - Most Popular */}
            <div 
              onClick={() => setSelectedPlan('4-weeks')}
              className={`relative bg-card rounded-xl border-2 p-4 cursor-pointer transition-all ${
                selectedPlan === '4-weeks' ? 'border-primary animate-pulse-ring' : 'border-primary'
              }`}
            >
              {/* Most Popular Badge */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold px-4 py-1 rounded-full whitespace-nowrap">
                MÁS POPULAR
              </div>
              <div className="pt-2">
                <div className="flex items-center gap-4">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                    selectedPlan === '4-weeks' ? 'border-primary bg-primary' : 'border-muted-foreground'
                  }`}>
                    {selectedPlan === '4-weeks' && <Check className="w-3 h-3 text-primary-foreground" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-extrabold text-foreground">Plan de 4 Semanas</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      <span className="line-through">$39.99</span> → <span className="font-semibold text-foreground">$9.90</span>
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-extrabold text-foreground">$0.35</p>
                    <p className="text-xs text-muted-foreground">por día</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Plan 3 - 12 Weeks */}
            <div 
              onClick={() => setSelectedPlan('12-weeks')}
              className={`relative bg-card rounded-xl border-2 p-4 cursor-pointer transition-all ${
                selectedPlan === '12-weeks' ? 'border-primary' : 'border-border'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                  selectedPlan === '12-weeks' ? 'border-primary bg-primary' : 'border-muted-foreground'
                }`}>
                  {selectedPlan === '12-weeks' && <Check className="w-3 h-3 text-primary-foreground" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-extrabold text-foreground">Plan de 12 Semanas</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    <span className="line-through">$119.90</span> → <span className="font-semibold text-foreground">$19.90</span>
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-extrabold text-foreground">$0.24</p>
                  <p className="text-xs text-muted-foreground">por día</p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <a 
            href={
              selectedPlan === '1-week' ? 'https://att.trk.healthnewsclub.com/click/1' :
              selectedPlan === '4-weeks' ? 'https://att.trk.healthnewsclub.com/click/2' :
              'https://att.trk.healthnewsclub.com/click/3'
            }
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full mt-4 py-4 rounded-full font-bold text-base bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg active:scale-[0.98] transition-all uppercase text-center animate-pulse-ring"
          >
            OBTENER MI PLAN
          </a>
        </div>

        {/* Results Stats */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-center mb-6">
            Resultados reales, comprobados por quienes ya viven la transformación
          </h2>
          <div className="grid grid-cols-3 gap-3">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="relative w-20 h-20 mx-auto mb-3">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    <circle
                      cx="18"
                      cy="18"
                      r="15.915"
                      fill="none"
                      stroke="#e5e7eb"
                      strokeWidth="3"
                    />
                    <circle
                      cx="18"
                      cy="18"
                      r="15.915"
                      fill="none"
                      stroke={stat.color}
                      strokeWidth="3"
                      strokeDasharray={`${stat.percentage} ${100 - stat.percentage}`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center text-lg font-bold">
                    {stat.percentage}%
                  </span>
                </div>
                <p className="text-xs text-muted-foreground leading-tight">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Savings Table */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-center mb-4">
            {data.name}<br />
            Mira todo lo que estás ahorrando con el Pilates en la Pared!
          </h2>
          <div className="bg-card rounded-xl overflow-hidden shadow-soft">
            {savingsItems.map((item, index) => (
              <div key={index} className={`flex justify-between items-center p-3 ${index % 2 === 0 ? 'bg-card' : 'bg-muted/30'}`}>
                <div className="flex items-center gap-2">
                  <span className="text-destructive">✓</span>
                  <span className="text-sm">{item.name}</span>
                </div>
                <span className={`font-bold ${item.value.includes("Invaluable") ? "text-destructive" : "text-destructive"}`}>
                  {item.value}
                </span>
              </div>
            ))}
            <div className="bg-muted/50 p-3 flex justify-between items-center font-bold">
              <span>Valor total del paquete</span>
              <span className="text-destructive text-xl">$11,300.00</span>
            </div>
            <div className="p-3 flex justify-between items-center">
              <span className="font-semibold">Precio del plan</span>
              <span className="text-muted-foreground line-through">$9.90</span>
            </div>
            <div className="bg-card p-3 flex justify-between items-center border-t-2 border-primary">
              <span className="text-2xl font-black">AHORRO</span>
              <span className="text-3xl font-black text-green-500">$11,290.10</span>
            </div>
          </div>

          <a 
            href="https://att.trk.healthnewsclub.com/click/2"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full mt-4 py-4 px-6 rounded-full font-bold text-lg bg-green-500 hover:bg-green-600 text-white shadow-lg active:scale-[0.98] transition-all text-center"
          >
            COMENZAR AHORA
          </a>

          <p className="text-center text-sm text-amber-600 mt-3 flex items-center justify-center gap-1">
            <span>💰</span> ¡El valor se convierte automáticamente a la moneda de tu país!
          </p>
        </div>

        {/* FAQ Section */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-center mb-6">
            Preguntas <span className="font-normal">frecuentes:</span>
          </h2>
          <Accordion type="single" collapsible className="space-y-2">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`faq-${index}`} className="bg-card rounded-lg border-none shadow-soft">
                <AccordionTrigger className="px-4 py-3 hover:no-underline text-left">
                  <span className="flex items-center gap-2 text-sm">
                    <span>{faq.icon}</span> {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-3 text-sm text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Testimonials section - Video slider */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-center mb-6">
            Descubre lo que nuestras alumnas <span className="font-normal">tienen para decir.</span>
          </h2>
          
          <div className="relative">
            <div className="overflow-hidden rounded-2xl">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentVideoSlide * 100}%)` }}
              >
                {testimonialVideos.map((video, index) => (
                  <div key={index} className="min-w-full px-1">
                    <video
                      ref={(el) => (videoRefs.current[index] = el)}
                      src={video}
                      className="w-full rounded-2xl"
                      controls
                      playsInline
                      preload="metadata"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Arrows */}
            <button 
              onClick={prevVideoSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-muted transition-colors z-10"
            >
              <ChevronLeft className="w-5 h-5 text-foreground" />
            </button>
            <button 
              onClick={nextVideoSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-muted transition-colors z-10"
            >
              <ChevronRight className="w-5 h-5 text-foreground" />
            </button>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-4">
            {testimonialVideos.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentVideoSlide(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  currentVideoSlide === index ? 'bg-primary' : 'bg-muted'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Final Offer Block */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-center mb-6">
            Tu última oportunidad para alcanzar tus objetivos, <span className="text-primary">¿vas a seguir insatisfecha contigo misma hasta cuándo?</span>
          </h2>
          
          <div className="space-y-3">
            {/* 1 Week Plan */}
            <div 
              onClick={() => setSelectedPlan('1-week')}
              className={`relative bg-card rounded-xl p-4 cursor-pointer transition-all border-2 ${
                selectedPlan === '1-week' ? 'border-primary' : 'border-transparent'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  selectedPlan === '1-week' ? 'border-primary bg-primary' : 'border-muted-foreground'
                }`}>
                  {selectedPlan === '1-week' && <Check className="w-3 h-3 text-primary-foreground" />}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-sm">Prueba de 1 semana</p>
                  <p className="text-xs text-muted-foreground">
                    <span className="line-through">$19.90</span> → <span className="font-bold text-foreground">$5.90</span>
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-black">$0.84</p>
                  <p className="text-xs text-muted-foreground">por día</p>
                </div>
              </div>
            </div>

            {/* 4 Weeks Plan - Most Popular */}
            <div 
              onClick={() => setSelectedPlan('4-weeks')}
              className={`relative bg-card rounded-xl p-4 cursor-pointer transition-all border-2 ${
                selectedPlan === '4-weeks' ? 'border-primary animate-pulse-ring' : 'border-primary'
              }`}
            >
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
                  MÁS POPULAR
                </span>
              </div>
              <div className="flex items-center gap-3 mt-1">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  selectedPlan === '4-weeks' ? 'border-primary bg-primary' : 'border-muted-foreground'
                }`}>
                  {selectedPlan === '4-weeks' && <Check className="w-3 h-3 text-primary-foreground" />}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-sm">Plan de 4 Semanas</p>
                  <p className="text-xs text-muted-foreground">
                    <span className="line-through">$39.99</span> → <span className="font-bold text-foreground">$9.90</span>
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-black">$0.35</p>
                  <p className="text-xs text-muted-foreground">por día</p>
                </div>
              </div>
            </div>

            {/* 12 Weeks Plan */}
            <div 
              onClick={() => setSelectedPlan('12-weeks')}
              className={`relative bg-card rounded-xl p-4 cursor-pointer transition-all border-2 ${
                selectedPlan === '12-weeks' ? 'border-primary' : 'border-transparent'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  selectedPlan === '12-weeks' ? 'border-primary bg-primary' : 'border-muted-foreground'
                }`}>
                  {selectedPlan === '12-weeks' && <Check className="w-3 h-3 text-primary-foreground" />}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-sm">Plan de 12 Semanas</p>
                  <p className="text-xs text-muted-foreground">
                    <span className="line-through">$119.90</span> → <span className="font-bold text-foreground">$19.90</span>
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-black">$0.24</p>
                  <p className="text-xs text-muted-foreground">por día</p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <a 
            href={
              selectedPlan === '1-week' ? 'https://att.trk.healthnewsclub.com/click/1' :
              selectedPlan === '4-weeks' ? 'https://att.trk.healthnewsclub.com/click/2' :
              'https://att.trk.healthnewsclub.com/click/3'
            }
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full mt-4 py-4 rounded-full font-bold text-base bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg active:scale-[0.98] transition-all uppercase text-center animate-pulse-ring"
          >
            OBTENER MI PLAN
          </a>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-muted-foreground mb-6">
          <p className="mb-4">
            Al hacer clic en cualquiera de las opciones, aceptas los Términos de uso y servicio, la{" "}
            <span className="font-bold">Política de privacidad, la Política de suscripción y la Política de cookies.</span>
          </p>
          <p className="mb-4">Todos los derechos reservados <strong>ZenLife 2025 ©</strong></p>
          
          {/* Logo */}
          <div className="flex justify-center mt-4">
             <img src={images.logo} alt="ZenLife" className="h-10" />
          </div>
        </div>
      </div>
    </div>
  );
};
