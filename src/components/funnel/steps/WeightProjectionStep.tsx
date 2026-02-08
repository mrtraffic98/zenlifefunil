 import { useMemo } from "react";
 import { StepContainer } from "../StepContainer";
 import { UserData } from "@/types/funnel";
 import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, ReferenceDot } from "recharts";
 
 interface Props {
   data: UserData;
   onNext?: () => void;
 }
 
 export const WeightProjectionStep = ({ data, onNext }: Props) => {
   const userName = data.name || "Usuario";
   const currentWeight = data.currentWeight || 70;
   const targetWeight = data.targetWeight || 60;
   
   // Calculate target date (4 weeks from now)
   const targetDate = useMemo(() => {
     const date = new Date();
     date.setDate(date.getDate() + 28);
     return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'long' });
   }, []);
 
   // Generate chart data points for weight loss curve
   const chartData = useMemo(() => {
     const weightDiff = currentWeight - targetWeight;
     return [
       { week: "Hoy", weight: currentWeight, label: "start" },
       { week: "S02", weight: currentWeight - (weightDiff * 0.35) },
       { week: "S03", weight: currentWeight - (weightDiff * 0.65) },
       { week: "Semana 04", weight: targetWeight, label: "end" },
     ];
   }, [currentWeight, targetWeight]);
 
   return (
     <StepContainer>
       <div className="text-center max-w-sm mx-auto px-2">
         <h1 className="text-2xl font-extrabold text-foreground mb-2 leading-tight">
           {userName}, El último plan que necesitarás para ponerte en forma.
         </h1>
         
         <p className="text-sm text-muted-foreground mb-4">
           Basado en tu perfil, hemos creado un protocolo exclusivo para ti.
         </p>
 
         <p className="text-base font-semibold text-primary mb-6">
           Prevemos que alcanzarás tu objetivo el {targetDate}
         </p>
 
         <div className="text-left mb-2">
           <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide">
             PROCESO DE QUEMA DE GRASA
           </p>
         </div>
 
         <div className="relative w-full h-64 mb-6">
           <ResponsiveContainer width="100%" height="100%">
             <AreaChart
               data={chartData}
               margin={{ top: 30, right: 30, left: 10, bottom: 10 }}
             >
               <defs>
                 <linearGradient id="weightGradient" x1="0" y1="0" x2="1" y2="0">
                   <stop offset="0%" stopColor="#ef4444" />
                   <stop offset="50%" stopColor="#f59e0b" />
                   <stop offset="100%" stopColor="#22c55e" />
                 </linearGradient>
                 <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                   <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.3} />
                   <stop offset="100%" stopColor="#22c55e" stopOpacity={0.1} />
                 </linearGradient>
               </defs>
               <XAxis 
                 dataKey="week" 
                 axisLine={false}
                 tickLine={false}
                 tick={{ fontSize: 12, fill: '#9ca3af' }}
               />
               <YAxis hide domain={['dataMin - 5', 'dataMax + 5']} />
               <Area
                 type="monotone"
                 dataKey="weight"
                 stroke="url(#weightGradient)"
                 strokeWidth={4}
                 fill="url(#areaGradient)"
               />
               <ReferenceDot
                 x="Hoy"
                 y={currentWeight}
                 r={8}
                 fill="white"
                 stroke="#1f2937"
                 strokeWidth={3}
               />
               <ReferenceDot
                 x="Semana 04"
                 y={targetWeight}
                 r={8}
                 fill="white"
                 stroke="#22c55e"
                 strokeWidth={3}
               />
             </AreaChart>
           </ResponsiveContainer>
           
           {/* Start label */}
           <div className="absolute top-4 left-2">
             <div className="bg-foreground text-background text-xs font-bold px-2 py-1 rounded-md">
               Tú: {currentWeight}Kg
             </div>
           </div>
           
           {/* End label */}
           <div className="absolute bottom-16 right-0">
             <div className="bg-foreground text-background text-xs font-bold px-2 py-1 rounded-md">
               Objetivo: {targetWeight}
             </div>
           </div>
         </div>
       </div>
     </StepContainer>
   );
 };