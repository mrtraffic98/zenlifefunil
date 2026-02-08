# 📊 Schema do Banco de Dados - ZenLife Funnel

Documentação completa do banco de dados Supabase para integração com o app.

---

## 🔑 Credenciais do Projeto Supabase

```
URL: https://fvfqffxrlynjedqkriob.supabase.co
Anon Key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ2ZnFmZnhybHluamVkcWtyaW9iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA1ODQ0OTksImV4cCI6MjA4NjE2MDQ5OX0.085wbwpYRtVArClyutBfTbeN41toZPKSkUiu2as07FM
```

---

## 📋 Tabelas Criadas

O banco de dados possui **2 tabelas principais**:

1. **`users`** - Informações básicas dos usuários
2. **`funnel_responses`** - Todas as respostas do funil de personalização

---

## 👤 Tabela: `users`

Armazena informações básicas e de identificação dos usuários.

### Estrutura da Tabela

| Campo | Tipo | Descrição | Constraints |
|-------|------|-----------|-------------|
| `id` | UUID | Identificador único do usuário | PRIMARY KEY, AUTO GENERATED |
| `email` | TEXT | Email do usuário | UNIQUE, NULLABLE |
| `phone` | TEXT | Telefone do usuário | NULLABLE |
| `name` | TEXT | Nome do usuário | NULLABLE |
| `age_range` | TEXT | Faixa etária | CHECK: '18-29', '30-39', '40-49', '50+' |
| `created_at` | TIMESTAMP | Data de criação | AUTO, DEFAULT NOW() |
| `updated_at` | TIMESTAMP | Data de atualização | AUTO UPDATE |

### Exemplo de Dados

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "email": "usuario@example.com",
  "phone": "+5511999999999",
  "name": "Maria Silva",
  "age_range": "30-39",
  "created_at": "2025-02-08T10:00:00Z",
  "updated_at": "2025-02-08T10:00:00Z"
}
```

---

## 📝 Tabela: `funnel_responses`

Armazena **todas as respostas coletadas durante o funil de personalização**. Esta é a tabela principal que contém os dados para personalizar a experiência do usuário no app.

### Estrutura da Tabela

#### 🔗 Relacionamentos
| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | UUID | Identificador único da resposta | PRIMARY KEY |
| `user_id` | UUID | Referência ao usuário | FOREIGN KEY → users(id) |

#### 👤 Informações Pessoais
| Campo | Tipo | Descrição | Valores Possíveis |
|-------|------|-----------|-------------------|
| `name` | TEXT | Nome completo | Qualquer texto |
| `age_range` | TEXT | Faixa etária selecionada | '18-29', '30-39', '40-49', '50+' |

#### 📏 Métricas Corporais
| Campo | Tipo | Descrição | Range |
|-------|------|-----------|-------|
| `height` | INTEGER | Altura em centímetros | 140-200 cm |
| `current_weight` | DECIMAL(5,2) | Peso atual em kg | 40-150 kg |
| `target_weight` | DECIMAL(5,2) | Peso objetivo em kg | 40-150 kg |
| `body_type` | TEXT | Tipo de corpo | 'slim', 'medium', 'belly', 'overweight' |
| `goal_body_type` | TEXT | Tipo de corpo desejado | Qualquer texto |

#### 🎯 Objetivos e Experiência
| Campo | Tipo | Descrição | Formato |
|-------|------|-----------|---------|
| `knows_pilates` | BOOLEAN | Conhece Pilates? | true/false/null |
| `main_goals` | JSONB | Objetivos principais | Array: ['lose-weight', 'posture', 'strength', 'stress', 'flexibility', 'diastasis', 'menopause'] |
| `target_areas` | JSONB | Áreas do corpo a trabalhar | Array: ['arms', 'belly', 'legs', 'glutes', 'back', 'full-body'] |

#### ⚖️ Histórico de Peso
| Campo | Tipo | Descrição | Valores Possíveis |
|-------|------|-----------|-------------------|
| `weight_difficulty` | TEXT | Dificuldade com peso | 'hard-lose', 'easy-both', 'hard-gain' |
| `last_satisfied` | TEXT | Última vez satisfeita | 'less-1-year', '1-2-years', 'more-3-years', 'never' |
| `life_events` | JSONB | Eventos que influenciaram | Array: ['slow-metabolism', 'stress', 'work-family', 'emotional', 'none'] |

#### 🏃 Condição Física
| Campo | Tipo | Descrição | Valores Possíveis |
|-------|------|-----------|-------------------|
| `physical_pains` | JSONB | Dores físicas | Array: ['knees', 'back', 'legs', 'none'] |
| `activity_level` | TEXT | Nível de atividade | Qualquer texto |
| `daily_routine` | TEXT | Rotina diária | 'sedentary', 'light', 'moderate', 'active', 'extreme' |
| `daily_walking` | TEXT | Caminhada diária | 'sitting', 'breaks', 'standing' |
| `stairs_breathing` | TEXT | Respiração ao subir escadas | 'less-20', '20-60', 'more-60' |
| `flexibility` | TEXT | Flexibilidade | 'very-flexible', 'starting', 'not-sure', 'not-much' |

#### 💤 Estilo de Vida
| Campo | Tipo | Descrição | Valores Possíveis |
|-------|------|-----------|-------------------|
| `sleep_hours` | TEXT | Horas de sono | 'less-5', '5-6', '7-8', 'more-8' |
| `energy_level` | TEXT | Nível de energia | 'high', 'low' |
| `hydration` | TEXT | Hidratação diária | 'only-coffee', 'less-2', '3-6', 'more-10' |
| `healthy_eating` | TEXT | Alimentação saudável | Qualquer texto |
| `after_eating_feeling` | TEXT | Sensação após comer | 'sleepy', 'energy', 'only-coffee', 'less-2', '3-6', 'more-10' |
| `bad_habits` | JSONB | Maus hábitos | Array: ['yes', 'sometimes', 'no'] |
| `food_habits` | JSONB | Hábitos alimentares | Array: ['late-eating', 'too-much-salt', 'too-much-sugar', 'too-many-carbs', 'soda', 'none'] |

#### 🏋️ Preferências de Treino
| Campo | Tipo | Descrição | Valores Possíveis |
|-------|------|-----------|-------------------|
| `workout_time` | TEXT | Tempo disponível | '10', '15', '30', '60' (minutos) |
| `workout_days` | TEXT | Dias por semana | '1-2', '3-5', 'todos' |

#### 📊 Campos Calculados (Preenchidos Automaticamente)
| Campo | Tipo | Descrição |
|-------|------|-----------|
| `bmi` | DECIMAL(4,2) | Índice de Massa Corporal calculado |
| `bmi_category` | TEXT | Categoria do IMC: 'Bajo peso', 'Normal', 'Sobrepeso', 'Obesidad' |
| `metabolism_type` | TEXT | Tipo de metabolismo: 'Lento', 'Mixto', 'Rápido', 'Normal' |
| `weight_to_lose` | DECIMAL(5,2) | Peso a perder (current_weight - target_weight) |
| `estimated_months` | INTEGER | Meses estimados para alcançar objetivo (baseado em 4kg/mês) |

#### 📅 Metadados
| Campo | Tipo | Descrição |
|-------|------|-----------|
| `completed_at` | TIMESTAMP | Data/hora de conclusão do funil |
| `current_step` | INTEGER | Step atual do funil (1-37) |
| `created_at` | TIMESTAMP | Data de criação |
| `updated_at` | TIMESTAMP | Data de última atualização |

---

## 📦 Exemplo Completo de Dados

### Exemplo de `funnel_responses`

```json
{
  "id": "660e8400-e29b-41d4-a716-446655440000",
  "user_id": "550e8400-e29b-41d4-a716-446655440000",
  
  "name": "Maria Silva",
  "age_range": "30-39",
  
  "height": 165,
  "current_weight": 75.5,
  "target_weight": 65.0,
  "body_type": "belly",
  "goal_body_type": "medium",
  
  "knows_pilates": false,
  "main_goals": ["lose-weight", "posture", "strength"],
  "target_areas": ["belly", "legs", "glutes"],
  
  "weight_difficulty": "hard-lose",
  "last_satisfied": "more-3-years",
  "life_events": ["work-family", "stress"],
  
  "physical_pains": ["back", "knees"],
  "activity_level": "Moderadamente activo",
  "daily_routine": "moderate",
  "daily_walking": "sitting",
  "stairs_breathing": "20-60",
  "flexibility": "starting",
  
  "sleep_hours": "7-8",
  "energy_level": "low",
  "hydration": "3-6",
  "healthy_eating": null,
  "after_eating_feeling": "sleepy",
  "bad_habits": ["sometimes"],
  "food_habits": ["too-much-sugar", "too-many-carbs"],
  
  "workout_time": "15",
  "workout_days": "3-5",
  
  "bmi": 27.7,
  "bmi_category": "Sobrepeso",
  "metabolism_type": "Lento",
  "weight_to_lose": 10.5,
  "estimated_months": 3,
  
  "completed_at": "2025-02-08T10:30:00Z",
  "current_step": 37,
  "created_at": "2025-02-08T10:00:00Z",
  "updated_at": "2025-02-08T10:30:00Z"
}
```

---

## 🔍 Queries Úteis para o App

### Buscar resposta completa do funil por ID

```sql
SELECT * FROM funnel_responses 
WHERE id = '660e8400-e29b-41d4-a716-446655440000';
```

### Buscar todas as respostas de um usuário

```sql
SELECT * FROM funnel_responses 
WHERE user_id = '550e8400-e29b-41d4-a716-446655440000'
ORDER BY created_at DESC;
```

### Buscar resposta mais recente de um usuário

```sql
SELECT * FROM funnel_responses 
WHERE user_id = '550e8400-e29b-41d4-a716-446655440000'
ORDER BY created_at DESC
LIMIT 1;
```

### Buscar usuários por faixa etária

```sql
SELECT * FROM users 
WHERE age_range = '30-39';
```

### Buscar respostas completas (com completed_at preenchido)

```sql
SELECT * FROM funnel_responses 
WHERE completed_at IS NOT NULL
ORDER BY completed_at DESC;
```

### Estatísticas de objetivos mais comuns

```sql
SELECT 
  jsonb_array_elements_text(main_goals) as goal,
  COUNT(*) as count
FROM funnel_responses
WHERE main_goals IS NOT NULL
GROUP BY goal
ORDER BY count DESC;
```

---

## 🔐 Segurança (RLS Policies)

### Tabela `users`
- ✅ **INSERT**: Público pode inserir (para signups anônimos)
- ✅ **SELECT**: Usuários podem ler seus próprios dados
- ✅ **UPDATE**: Usuários podem atualizar seus próprios dados

### Tabela `funnel_responses`
- ✅ **INSERT**: Público pode inserir (usuários anônimos podem preencher funil)
- ✅ **SELECT**: Público pode ler (para permitir recuperação de dados)
- ✅ **UPDATE**: Público pode atualizar (para salvar progresso)

---

## 📱 Como Usar no App

### 1. Buscar dados do usuário logado

```typescript
import { supabase } from '@/integrations/supabase/client';

// Buscar resposta mais recente do usuário
const { data, error } = await supabase
  .from('funnel_responses')
  .select('*')
  .eq('user_id', userId)
  .order('created_at', { ascending: false })
  .limit(1)
  .single();
```

### 2. Personalizar experiência baseado nos dados

```typescript
// Exemplo: Personalizar treinos baseado em physical_pains
if (response.physical_pains?.includes('back')) {
  // Mostrar exercícios adaptados para dor nas costas
}

// Exemplo: Ajustar intensidade baseado em activity_level
if (response.daily_routine === 'sedentary') {
  // Começar com treinos mais leves
}

// Exemplo: Personalizar duração baseado em workout_time
const workoutDuration = parseInt(response.workout_time); // 10, 15, 30 ou 60 minutos
```

### 3. Usar campos calculados

```typescript
// BMI já calculado
const bmi = response.bmi; // Ex: 27.7

// Categoria do IMC
const category = response.bmi_category; // 'Sobrepeso'

// Metabolismo
const metabolism = response.metabolism_type; // 'Lento'

// Meta de peso
const weightToLose = response.weight_to_lose; // 10.5 kg
const monthsToGoal = response.estimated_months; // 3 meses
```

### 4. Trabalhar com arrays JSONB

```typescript
// Objetivos principais
const goals = response.main_goals; // ['lose-weight', 'posture', 'strength']
if (goals.includes('lose-weight')) {
  // Mostrar conteúdo sobre perda de peso
}

// Áreas alvo
const targetAreas = response.target_areas; // ['belly', 'legs', 'glutes']
// Criar rotina focada nessas áreas

// Dores físicas
const pains = response.physical_pains; // ['back', 'knees']
// Evitar exercícios que agravem essas dores
```

---

## 🎯 Mapeamento de Valores

### `body_type`
- `slim` → Delgado
- `medium` → Medio
- `belly` → Barriga
- `overweight` → Sobrepeso

### `weight_difficulty`
- `hard-lose` → Dificuldade para perder peso
- `easy-both` → Sobe e perde peso facilmente
- `hard-gain` → Dificuldade para ganhar peso

### `daily_routine`
- `sedentary` → Sedentário
- `light` → Pouco ativo
- `moderate` → Moderadamente ativo
- `active` → Muito ativo
- `extreme` → Extremamente ativo

### `workout_time`
- `10` → 10 minutos por dia
- `15` → 15 minutos por dia
- `30` → 30 minutos por dia
- `60` → 60 minutos por dia

### `workout_days`
- `1-2` → 1 ou 2 dias por semana
- `3-5` → 3 a 5 dias por semana
- `todos` → Todos os dias

---

## 📊 Índices Criados

Para melhor performance, foram criados os seguintes índices:

- `idx_funnel_responses_user_id` - Busca rápida por usuário
- `idx_funnel_responses_created_at` - Ordenação por data
- `idx_users_email` - Busca rápida por email
- `idx_users_created_at` - Ordenação por data

---

## ⚡ Triggers Automáticos

### Auto-update de `updated_at`
Ambas as tabelas têm triggers que atualizam automaticamente o campo `updated_at` sempre que um registro é modificado.

---

## 🚀 Próximos Passos para o App

1. **Autenticação**: Integrar autenticação do Supabase para vincular `user_id`
2. **Perfil do Usuário**: Criar tela de perfil mostrando dados do funil
3. **Personalização**: Usar os dados para personalizar:
   - Rotinas de exercícios
   - Duração dos treinos
   - Intensidade baseada no nível de atividade
   - Exercícios adaptados para dores físicas
   - Foco nas áreas alvo selecionadas
4. **Progresso**: Criar sistema de acompanhamento usando `weight_to_lose` e `estimated_months`
5. **Recomendações**: Usar `bmi_category` e `metabolism_type` para recomendações personalizadas

---

**Última atualização**: 2025-02-08

