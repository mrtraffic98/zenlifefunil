 import { StepContainer } from "../StepContainer";
 import { UserData, calculateBMI, getMetabolismType } from "@/types/funnel";
 import { User, Flame, Armchair, Dumbbell, CheckCircle, AlertTriangle } from "lucide-react";
 import { images } from "@/lib/imageUrls";

interface Props {
  data: UserData;
}

const getBMIPosition = (bmi: number): number => {
  const minBMI = 15;
  const maxBMI = 40;
  const position = ((bmi - minBMI) / (maxBMI - minBMI)) * 100;
  return Math.max(0, Math.min(100, position));
};

const getBMIInfo = (bmi: number): { title: string; description: string; isWarning: boolean } => {
  if (bmi < 18.5) return { title: "IMC bajo:", description: "Necesitas ganar masa muscular de forma saludable.", isWarning: false };
  if (bmi <= 24.9) return { title: "IMC normal:", description: "Buen IMC inicial para tonificar y obtener tu cuerpo soñado.", isWarning: false };
  if (bmi <= 29.9) return { title: "IMC medio:", description: "Con el programa adecuado, puedes transformar tu cuerpo.", isWarning: true };
  return { title: "IMC alto:", description: "¡Es el momento perfecto para comenzar tu transformación!", isWarning: true };
};

const getBodyType = (data: UserData): string => {
  if (data.bodyType === 'delgado') return "Ectomorfo";
  if (data.bodyType === 'medio') return "Mesomorfo";
  if (data.bodyType === 'sobrepeso' || data.bodyType === 'barriga') return "Endomorfo";
  return "Mesomorfo";
};

const getLifestyle = (data: UserData): string => {
  if (data.dailyRoutine === 'sitting' && data.dailyWalking === 'less-30') return "Sedentario";
  if (data.dailyRoutine === 'standing' || data.dailyWalking === 'more-60') return "Activo";
  if (data.dailyWalking === '30-60') return "Moderadamente activo";
  return "Poco activo";
};

const getFitnessLevel = (data: UserData): string => {
  const breathingScore = data.stairsBreathing === 'no-problem' ? 2 : data.stairsBreathing === 'little-tired' ? 1 : 0;
  const flexibilityScore = data.flexibility === 'very-flexible' ? 2 : data.flexibility === 'normal' ? 1 : 0;
  const pilatesScore = data.knowsPilates ? 1 : 0;
  const totalScore = breathingScore + flexibilityScore + pilatesScore;
  if (totalScore >= 4) return "Avanzado";
  if (totalScore >= 2) return "Intermedio";
  return "Básico";
};

const getMetabolismDescription = (data: UserData): string => {
  const metabolism = getMetabolismType(data);
  if (metabolism === 'Lento') return "Moderado, desafiante para definir";
  if (metabolism === 'Rápido') return "Rápido, fácil de mantener";
  if (metabolism === 'Mixto') return "Mixto, adaptable";
  return "Equilibrado";
};

const getResultsImage = (bmi: number): string => {
   if (bmi < 18.5) return images.resultsSlimWoman;
   if (bmi <= 24.9) return images.resultsNormalWoman;
   if (bmi <= 29.9) return images.resultsMediumWoman;
   return images.resultsHighWoman;
};

export const ResultsStep = ({ data }: Props) => {
  const bmi = calculateBMI(data.currentWeight, data.height);
  const bmiPosition = getBMIPosition(bmi);
  const bmiInfo = getBMIInfo(bmi);
  const resultsImage = getResultsImage(bmi);
  const bodyType = getBodyType(data);
  const lifestyle = getLifestyle(data);
  const fitnessLevel = getFitnessLevel(data);
  const metabolismDesc = getMetabolismDescription(data);

  return (
    <StepContainer textAlign="left">
      <div className="space-y-4 pb-20">
        <p className="text-sm font-semibold text-foreground">
          Índice de Masa Corporal (IMC)
        </p>
        
        <div className="relative pt-8">
          <div 
            className="absolute top-0 transform -translate-x-1/2 z-10"
            style={{ left: `${bmiPosition}%` }}
          >
            <div className="bg-foreground text-background px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap">
              O Seu - {bmi.toFixed(2)}
            </div>
          </div>
          
          <div className="flex justify-between text-xs text-muted-foreground mb-1 px-1">
            <span>15</span>
            <span>18.5</span>
            <span>25</span>
            <span>30</span>
            <span>40</span>
          </div>
          
          <div className="relative h-2.5 rounded-full overflow-hidden bg-gradient-to-r from-blue-400 via-green-400 via-yellow-400 to-red-500">
            <div 
              className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full border-2 border-muted shadow-lg"
              style={{ left: `calc(${bmiPosition}% - 8px)` }}
            />
          </div>
          
          <div className="flex justify-between text-xs text-muted-foreground mt-1 px-1">
            <span>Bajo peso</span>
            <span className="font-semibold text-foreground">Normal</span>
            <span>Sobrepeso</span>
            <span>Obesidad</span>
          </div>
        </div>

        <div className={`rounded-xl p-3 border ${
          bmiInfo.isWarning 
            ? 'bg-yellow-50 dark:bg-yellow-950/30 border-yellow-300 dark:border-yellow-700' 
            : 'bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800'
        }`}>
          <div className="flex items-start gap-2">
            {bmiInfo.isWarning ? (
              <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            ) : (
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            )}
            <div>
              <p className="text-sm font-semibold text-foreground">{bmiInfo.title}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{bmiInfo.description}</p>
            </div>
          </div>
        </div>

        <div className="flex gap-4 items-center">
          <div className="flex-1 space-y-3">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-primary flex-shrink-0" />
              <div>
                <p className="text-sm text-muted-foreground">Tipo de cuerpo</p>
                <p className="text-sm font-semibold text-foreground">{bodyType}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Armchair className="w-5 h-5 text-primary flex-shrink-0" />
              <div>
                <p className="text-sm text-muted-foreground">Estilo de vida</p>
                <p className="text-sm font-semibold text-foreground">{lifestyle}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Dumbbell className="w-5 h-5 text-primary flex-shrink-0" />
              <div>
                <p className="text-sm text-muted-foreground">Nivel de fitness</p>
                <p className="text-sm font-semibold text-foreground">{fitnessLevel}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-primary flex-shrink-0" />
              <div>
                <p className="text-sm text-muted-foreground">Metabolismo</p>
                <p className="text-sm font-semibold text-foreground">{metabolismDesc}</p>
              </div>
            </div>
          </div>

          <div className="w-36 flex-shrink-0 flex items-center">
            <img src={resultsImage} alt="Mujer fitness" className="w-full h-auto object-contain" />
          </div>
        </div>
      </div>
    </StepContainer>
  );
};