import { useState, useCallback, useEffect } from "react";
import { ChevronLeft } from "lucide-react";
import { UserData, initialUserData } from "@/types/funnel";
import { ProgressBar } from "./ProgressBar";
import { ContinueButton } from "./ContinueButton";
import { FunnelService } from "@/lib/funnelService";

// Import all steps
import { WelcomeStep } from "./steps/WelcomeStep";
import { KnowsPilatesStep } from "./steps/KnowsPilatesStep";
import { EducationStep } from "./steps/EducationStep";
import { GoalsStep } from "./steps/GoalsStep";
import { BodyTypeStep } from "./steps/BodyTypeStep";
import { WeightDifficultyStep } from "./steps/WeightDifficultyStep";
import { LastSatisfiedStep } from "./steps/LastSatisfiedStep";
import { SocialProofStep } from "./steps/SocialProofStep";
import { LifeEventsStep } from "./steps/LifeEventsStep";
import { PhysicalPainsStep } from "./steps/PhysicalPainsStep";
import { ConfirmationStep } from "./steps/ConfirmationStep";
import { TargetAreasStep } from "./steps/TargetAreasStep";
import { ProgressPromiseStep } from "./steps/ProgressPromiseStep";
import { ActivityLevelStep } from "./steps/ActivityLevelStep";
import { DailyRoutineStep } from "./steps/DailyRoutineStep";
import { DailyWalkingStep } from "./steps/DailyWalkingStep";
import { StairsBreathingStep } from "./steps/StairsBreathingStep";
import { FlexibilityStep } from "./steps/FlexibilityStep";
import { SleepStep } from "./steps/SleepStep";
import { EnergyStep } from "./steps/EnergyStep";
import { HydrationStep } from "./steps/HydrationStep";
import { HealthyEatingStep } from "./steps/HealthyEatingStep";
import { AfterEatingStep } from "./steps/AfterEatingStep";
import { BadHabitsStep } from "./steps/BadHabitsStep";
import { AfterMealsStep } from "./steps/AfterMealsStep";
import { FoodHabitsStep } from "./steps/FoodHabitsStep";
import { HeightStep } from "./steps/HeightStep";
import { CurrentWeightStep } from "./steps/CurrentWeightStep";
import { TargetWeightStep } from "./steps/TargetWeightStep";
import { NameStep } from "./steps/NameStep";
import { LoadingStep } from "./steps/LoadingStep";
import { ResultsStep } from "./steps/ResultsStep";
import { WorkoutTimeStep } from "./steps/WorkoutTimeStep";
import { WorkoutDaysStep } from "./steps/WorkoutDaysStep";
import { ProtocolLoadingStep } from "./steps/ProtocolLoadingStep";
import { WeightProjectionStep } from "./steps/WeightProjectionStep";
import { OfferStep } from "./steps/OfferStep";

const TOTAL_STEPS = 37;

export const FunnelApp = () => {
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState<UserData>(initialUserData);
  const [isLoading, setIsLoading] = useState(false);
  const [responseId, setResponseId] = useState<string | null>(null);

  const updateUserData = useCallback((data: Partial<UserData>) => {
    setUserData((prev) => ({ ...prev, ...data }));
  }, []);

  // Função para salvar progresso no Supabase
  const saveProgress = useCallback(async (currentStep: number) => {
    try {
      const result = await FunnelService.saveProgress(
        userData,
        currentStep,
        undefined, // userId - pode ser obtido do auth depois
        responseId || undefined
      );
      
      if (result.success && result.id) {
        setResponseId(result.id);
      } else if (result.error) {
        console.warn('Error saving progress:', result.error);
      }
    } catch (error) {
      console.error('Exception saving progress:', error);
    }
  }, [userData, responseId]);

  const nextStep = () => {
    if (step < TOTAL_STEPS) {
      const newStep = step + 1;
      setStep(newStep);
      // Salvar progresso após mudar de step
      saveProgress(newStep);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep((prev) => prev - 1);
    }
  };

  const canContinue = (): boolean => {
    switch (step) {
      case 2: return userData.knowsPilates !== null;
      case 4: return userData.mainGoals.length > 0;
      case 5: return userData.bodyType !== '';
      case 6: return userData.weightDifficulty !== '';
      case 7: return userData.lastSatisfied !== '';
      case 9: return userData.lifeEvents.length > 0;
      case 10: return userData.physicalPains.length > 0;
      case 12: return userData.targetAreas.length > 0;
      // case 14 is now informational, no validation needed
      case 15: return userData.dailyRoutine !== '';
      case 16: return userData.dailyWalking !== '';
      case 17: return userData.stairsBreathing !== '';
      case 18: return userData.flexibility !== '';
      case 19: return userData.sleepHours !== '';
      case 20: return userData.energyLevel !== '';
      case 21: return userData.hydration !== '';
      // case 22 is now informational, no validation needed
      case 23: return userData.afterEatingFeeling !== '';
      case 24: return userData.badHabits.length > 0;
      case 25: return userData.afterEatingFeeling !== ''; // After meals step
      case 26: return userData.foodHabits.length > 0; // Food habits step
      case 30: return userData.name.trim().length > 0;
      case 33: return userData.workoutTime !== '';
      case 34: return userData.workoutDays !== '';
      // case 35 is loading - no validation
      // case 36 is projection - manual advance
      default: return true;
    }
  };

  const handleAgeSelect = () => {
    nextStep();
  };

  const handleLoadingComplete = () => {
    setIsLoading(false);
    nextStep();
  };

  // Salvar resposta completa quando chegar no step final
  useEffect(() => {
    if (step === 37) { // OfferStep - final step
      FunnelService.saveFunnelResponse(userData, undefined, responseId || undefined)
        .then(result => {
          if (result.success && result.id) {
            setResponseId(result.id);
            console.log('Funnel response saved successfully:', result.id);
          } else if (result.error) {
            console.error('Error saving final response:', result.error);
          }
        });
    }
  }, [step, userData, responseId]);

  // Salvar progresso inicial quando selecionar idade
  useEffect(() => {
    if (step === 2 && userData.ageRange) {
      saveProgress(2);
    }
  }, [step, userData.ageRange, saveProgress]);

  const renderStep = () => {
    switch (step) {
      case 1: return <WelcomeStep data={userData} onChange={updateUserData} onSelect={handleAgeSelect} />;
      case 2: return <KnowsPilatesStep data={userData} onChange={updateUserData} onNext={nextStep} />;
      case 3: return <EducationStep onNext={nextStep} />;
      case 4: return <GoalsStep data={userData} onChange={updateUserData} />;
      case 5: return <BodyTypeStep data={userData} onChange={updateUserData} onNext={nextStep} />;
      case 6: return <WeightDifficultyStep data={userData} onChange={updateUserData} onNext={nextStep} />;
      case 7: return <LastSatisfiedStep data={userData} onChange={updateUserData} onNext={nextStep} />;
      case 8: return <SocialProofStep onNext={nextStep} />;
      case 9: return <LifeEventsStep data={userData} onChange={updateUserData} />;
      case 10: return <PhysicalPainsStep data={userData} onChange={updateUserData} />;
      case 11: return <ConfirmationStep data={userData} onNext={nextStep} />;
      case 12: return <TargetAreasStep data={userData} onChange={updateUserData} />;
      case 13: return <ProgressPromiseStep data={userData} onChange={updateUserData} onNext={nextStep} />;
      case 14: return <ActivityLevelStep />;
      case 15: return <DailyRoutineStep data={userData} onChange={updateUserData} onNext={nextStep} />;
      case 16: return <DailyWalkingStep data={userData} onChange={updateUserData} onNext={nextStep} />;
      case 17: return <StairsBreathingStep data={userData} onChange={updateUserData} onNext={nextStep} />;
      case 18: return <FlexibilityStep data={userData} onChange={updateUserData} onNext={nextStep} />;
      case 19: return <SleepStep data={userData} onChange={updateUserData} onNext={nextStep} />;
      case 20: return <EnergyStep data={userData} onChange={updateUserData} onNext={nextStep} />;
      case 21: return <HydrationStep data={userData} onChange={updateUserData} onNext={nextStep} />;
      case 22: return <HealthyEatingStep onNext={nextStep} />;
      case 23: return <AfterEatingStep data={userData} onChange={updateUserData} onNext={nextStep} />;
      case 24: return <BadHabitsStep data={userData} onChange={updateUserData} onNext={nextStep} />;
      case 25: return <AfterMealsStep data={userData} onChange={updateUserData} onNext={nextStep} />;
      case 26: return <FoodHabitsStep data={userData} onChange={updateUserData} />;
      case 27: return <HeightStep data={userData} onChange={updateUserData} />;
      case 28: return <CurrentWeightStep data={userData} onChange={updateUserData} />;
      case 29: return <TargetWeightStep data={userData} onChange={updateUserData} />;
      case 30: return <NameStep data={userData} onChange={updateUserData} />;
      case 31: return <LoadingStep onComplete={handleLoadingComplete} />;
      case 32: return <ResultsStep data={userData} />;
      case 33: return <WorkoutTimeStep data={userData} onChange={updateUserData} onNext={nextStep} />;
      case 34: return <WorkoutDaysStep data={userData} onChange={updateUserData} onNext={nextStep} />;
      case 35: return <ProtocolLoadingStep onComplete={handleLoadingComplete} />;
      case 36: return <WeightProjectionStep data={userData} />;
      case 37: return <OfferStep data={userData} />;
      default: return <WelcomeStep data={userData} onChange={updateUserData} onSelect={handleAgeSelect} />;
    }
  };

  // Welcome step has its own layout (no progress bar, no button)
  if (step === 1) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        {renderStep()}
      </div>
    );
  }

  // Loading steps don't show button or back
  if (step === 31 || step === 35) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <ProgressBar currentStep={step - 1} totalSteps={TOTAL_STEPS - 3} />
        {renderStep()}
      </div>
    );
  }

  // Offer step has its own layout
  if (step === 37) {
    return (
      <>
        <OfferStep data={userData} />
      </>
    );
  }

  // Header with back button
  const Header = () => (
    <div className="flex items-center px-4 pt-3">
      <button 
        onClick={prevStep}
        className="p-1.5 -ml-1.5 rounded-full hover:bg-muted transition-colors"
        aria-label="Volver"
      >
        <ChevronLeft className="w-5 h-5 text-muted-foreground" />
      </button>
      <div className="flex-1">
        <ProgressBar currentStep={step} totalSteps={TOTAL_STEPS - 3} className="px-0 pt-0" />
      </div>
    </div>
  );

  // Steps that auto-advance (single choice) don't need continue button
  const singleChoiceSteps = [2, 3, 5, 6, 7, 8, 11, 13, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 33, 34, 35];
  const showContinueButton = !singleChoiceSteps.includes(step);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      {renderStep()}
      {showContinueButton && (
        <ContinueButton 
          onClick={nextStep} 
          disabled={!canContinue()}
          variant="primary"
          text="CONTINUAR"
        />
      )}
    </div>
  );
};
