# Configuração do Supabase para o Funil ZenLife

## 📋 Pré-requisitos

1. Acesso ao projeto Supabase: https://fvfqffxrlynjedqkriob.supabase.co
2. Credenciais já configuradas no código

## 🗄️ Executar Migration

### Opção 1: Via Dashboard do Supabase

1. Acesse o Dashboard do Supabase: https://supabase.com/dashboard
2. Selecione o projeto: `fvfqffxrlynjedqkriob`
3. Vá em **SQL Editor**
4. Abra o arquivo: `supabase/migrations/20250208000000_create_funnel_tables.sql`
5. Copie todo o conteúdo SQL
6. Cole no SQL Editor
7. Clique em **Run** para executar

### Opção 2: Via Supabase CLI

```bash
# Instalar Supabase CLI (se ainda não tiver)
npm install -g supabase

# Fazer login
supabase login

# Linkar ao projeto
supabase link --project-ref fvfqffxrlynjedqkriob

# Executar migrations
supabase db push
```

## 📊 Tabelas Criadas

### 1. `users`
Armazena informações básicas dos usuários:
- `id` (UUID, Primary Key)
- `email` (TEXT, Unique)
- `phone` (TEXT)
- `name` (TEXT)
- `age_range` (TEXT: '18-29', '30-39', '40-49', '50+')
- `created_at`, `updated_at` (Timestamps)

### 2. `funnel_responses`
Armazena todas as respostas do funil:
- **Personal Info**: name, age_range
- **Body Metrics**: height, current_weight, target_weight, body_type
- **Goals**: main_goals (JSONB), target_areas (JSONB), knows_pilates
- **Weight History**: weight_difficulty, last_satisfied, life_events (JSONB)
- **Physical Condition**: physical_pains (JSONB), daily_routine, daily_walking, etc.
- **Lifestyle**: sleep_hours, energy_level, hydration, food_habits (JSONB), etc.
- **Workout Preferences**: workout_time, workout_days
- **Calculated Fields**: bmi, bmi_category, metabolism_type, weight_to_lose, estimated_months
- **Metadata**: completed_at, current_step, created_at, updated_at

## 🔒 Segurança (RLS)

As tabelas têm Row Level Security (RLS) habilitado com políticas que permitem:
- ✅ Inserção pública (para usuários anônimos)
- ✅ Leitura e atualização das próprias respostas
- ✅ Usuários podem ler e atualizar seus próprios dados

## 🔍 Verificar se funcionou

Após executar a migration, verifique:

1. **No Dashboard do Supabase**:
   - Vá em **Table Editor**
   - Deve aparecer as tabelas `users` e `funnel_responses`

2. **Testar no código**:
   - Execute o funil
   - Abra o Console do navegador (F12)
   - Deve aparecer logs de salvamento sem erros

## 📝 Notas Importantes

- Os arrays (main_goals, target_areas, etc.) são armazenados como **JSONB**
- Campos calculados (BMI, categoria, etc.) são preenchidos automaticamente
- O `current_step` rastreia o progresso do usuário no funil
- O `completed_at` é preenchido quando o usuário chega no step 37 (Oferta)

## 🐛 Troubleshooting

### Erro: "relation already exists"
- As tabelas já existem, pode ignorar ou dropar e recriar

### Erro: "permission denied"
- Verifique se as políticas RLS estão corretas
- Verifique se está usando a chave anon_key correta

### Dados não estão sendo salvos
- Verifique o console do navegador para erros
- Verifique se a migration foi executada corretamente
- Verifique se as credenciais do Supabase estão corretas no código

