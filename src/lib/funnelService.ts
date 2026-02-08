import { supabase } from '@/integrations/supabase/client';
import { UserData, calculateBMI, getBMICategory, getMetabolismType } from '@/types/funnel';

export interface FunnelResponse {
  id?: string;
  user_id?: string;
  name: string;
  age_range: string;
  height: number;
  current_weight: number;
  target_weight: number;
  body_type: string;
  goal_body_type?: string;
  knows_pilates: boolean | null;
  main_goals: string[];
  target_areas: string[];
  weight_difficulty: string;
  last_satisfied: string;
  life_events: string[];
  physical_pains: string[];
  activity_level?: string;
  daily_routine: string;
  daily_walking: string;
  stairs_breathing: string;
  flexibility: string;
  sleep_hours: string;
  energy_level: string;
  hydration: string;
  healthy_eating?: string;
  after_eating_feeling: string;
  bad_habits: string[];
  food_habits: string[];
  workout_time: string;
  workout_days: string;
  current_step?: number;
}

export class FunnelService {
  /**
   * Salva ou atualiza as respostas do funil
   */
  static async saveFunnelResponse(
    userData: UserData,
    userId?: string,
    responseId?: string
  ): Promise<{ success: boolean; id?: string; error?: string }> {
    try {
      // Calcular campos derivados
      const bmi = calculateBMI(userData.currentWeight, userData.height);
      const bmiCategory = getBMICategory(bmi);
      const metabolismType = getMetabolismType(userData);
      const weightToLose = userData.currentWeight - userData.targetWeight;
      const estimatedMonths = weightToLose > 0 ? Math.ceil(weightToLose / 4) : 0;

      // Preparar dados para inserção
      const responseData: any = {
        user_id: userId || null,
        name: userData.name || null,
        age_range: userData.ageRange || null,
        height: userData.height || null,
        current_weight: userData.currentWeight || null,
        target_weight: userData.targetWeight || null,
        body_type: userData.bodyType || null,
        goal_body_type: userData.goalBodyType || null,
        knows_pilates: userData.knowsPilates,
        main_goals: userData.mainGoals || [],
        target_areas: userData.targetAreas || [],
        weight_difficulty: userData.weightDifficulty || null,
        last_satisfied: userData.lastSatisfied || null,
        life_events: userData.lifeEvents || [],
        physical_pains: userData.physicalPains || [],
        activity_level: userData.activityLevel || null,
        daily_routine: userData.dailyRoutine || null,
        daily_walking: userData.dailyWalking || null,
        stairs_breathing: userData.stairsBreathing || null,
        flexibility: userData.flexibility || null,
        sleep_hours: userData.sleepHours || null,
        energy_level: userData.energyLevel || null,
        hydration: userData.hydration || null,
        healthy_eating: userData.healthyEating || null,
        after_eating_feeling: userData.afterEatingFeeling || null,
        bad_habits: userData.badHabits || [],
        food_habits: userData.foodHabits || [],
        workout_time: userData.workoutTime || null,
        workout_days: userData.workoutDays || null,
        bmi: bmi || null,
        bmi_category: bmiCategory || null,
        metabolism_type: metabolismType || null,
        weight_to_lose: weightToLose > 0 ? weightToLose : 0,
        estimated_months: estimatedMonths,
        completed_at: new Date().toISOString(),
      };

      let result;

      if (responseId) {
        // Atualizar resposta existente
        result = await supabase
          .from('funnel_responses')
          .update(responseData)
          .eq('id', responseId)
          .select()
          .single();
      } else {
        // Criar nova resposta
        result = await supabase
          .from('funnel_responses')
          .insert(responseData)
          .select()
          .single();
      }

      if (result.error) {
        console.error('Error saving funnel response:', result.error);
        return { success: false, error: result.error.message };
      }

      return { success: true, id: result.data.id };
    } catch (error: any) {
      console.error('Exception saving funnel response:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Salva progresso parcial do funil (a cada step)
   */
  static async saveProgress(
    userData: UserData,
    currentStep: number,
    userId?: string,
    responseId?: string
  ): Promise<{ success: boolean; id?: string; error?: string }> {
    try {
      const responseData: any = {
        current_step: currentStep,
        user_id: userId || null,
      };

      // Adicionar apenas campos que já foram preenchidos
      if (userData.name) responseData.name = userData.name;
      if (userData.ageRange) responseData.age_range = userData.ageRange;
      if (userData.height) responseData.height = userData.height;
      if (userData.currentWeight) responseData.current_weight = userData.currentWeight;
      if (userData.targetWeight) responseData.target_weight = userData.targetWeight;
      if (userData.bodyType) responseData.body_type = userData.bodyType;
      if (userData.knowsPilates !== null && userData.knowsPilates !== undefined) {
        responseData.knows_pilates = userData.knowsPilates;
      }
      if (userData.mainGoals?.length) responseData.main_goals = userData.mainGoals;
      if (userData.targetAreas?.length) responseData.target_areas = userData.targetAreas;
      if (userData.weightDifficulty) responseData.weight_difficulty = userData.weightDifficulty;
      if (userData.lastSatisfied) responseData.last_satisfied = userData.lastSatisfied;
      if (userData.lifeEvents?.length) responseData.life_events = userData.lifeEvents;
      if (userData.physicalPains?.length) responseData.physical_pains = userData.physicalPains;
      if (userData.dailyRoutine) responseData.daily_routine = userData.dailyRoutine;
      if (userData.dailyWalking) responseData.daily_walking = userData.dailyWalking;
      if (userData.stairsBreathing) responseData.stairs_breathing = userData.stairsBreathing;
      if (userData.flexibility) responseData.flexibility = userData.flexibility;
      if (userData.sleepHours) responseData.sleep_hours = userData.sleepHours;
      if (userData.energyLevel) responseData.energy_level = userData.energyLevel;
      if (userData.hydration) responseData.hydration = userData.hydration;
      if (userData.afterEatingFeeling) responseData.after_eating_feeling = userData.afterEatingFeeling;
      if (userData.badHabits?.length) responseData.bad_habits = userData.badHabits;
      if (userData.foodHabits?.length) responseData.food_habits = userData.foodHabits;
      if (userData.workoutTime) responseData.workout_time = userData.workoutTime;
      if (userData.workoutDays) responseData.workout_days = userData.workoutDays;

      // Calcular campos se tiver dados suficientes
      if (userData.currentWeight && userData.height) {
        const bmi = calculateBMI(userData.currentWeight, userData.height);
        const bmiCategory = getBMICategory(bmi);
        const metabolismType = getMetabolismType(userData);
        const weightToLose = userData.currentWeight - (userData.targetWeight || userData.currentWeight);
        const estimatedMonths = weightToLose > 0 ? Math.ceil(weightToLose / 4) : 0;

        responseData.bmi = bmi;
        responseData.bmi_category = bmiCategory;
        responseData.metabolism_type = metabolismType;
        responseData.weight_to_lose = weightToLose > 0 ? weightToLose : 0;
        responseData.estimated_months = estimatedMonths;
      }

      let result;

      if (responseId) {
        result = await supabase
          .from('funnel_responses')
          .update(responseData)
          .eq('id', responseId)
          .select()
          .single();
      } else {
        result = await supabase
          .from('funnel_responses')
          .insert(responseData)
          .select()
          .single();
      }

      if (result.error) {
        console.error('Error saving progress:', result.error);
        return { success: false, error: result.error.message };
      }

      return { success: true, id: result.data.id };
    } catch (error: any) {
      console.error('Exception saving progress:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Busca resposta do funil por ID
   */
  static async getFunnelResponse(responseId: string) {
    const { data, error } = await supabase
      .from('funnel_responses')
      .select('*')
      .eq('id', responseId)
      .single();

    if (error) {
      console.error('Error fetching funnel response:', error);
      return null;
    }

    return data;
  }

  /**
   * Busca todas as respostas de um usuário
   */
  static async getUserResponses(userId: string) {
    const { data, error } = await supabase
      .from('funnel_responses')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching user responses:', error);
      return [];
    }

    return data || [];
  }
}

