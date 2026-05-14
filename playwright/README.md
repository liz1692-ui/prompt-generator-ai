# Módulo ANALISTA INSTAGRAM

Este módulo inicia a automação real de análise de Reels usando Playwright, com delays humanos, sessão persistida e exportação para JSON/Supabase.

## Importante

- Use apenas contas e perfis que você tem autorização para analisar.
- Não rode em alta frequência. O coletor usa delays humanos e limite por perfil por padrão.
- Não salve senha no código. Use `.env` local ou secrets do n8n/Docker.
- Campos como views, likes, música e duração dependem do layout, idioma, permissões da conta e disponibilidade pública no Instagram.

## Arquivos

- `login.js` — faz login seguro e salva o estado da sessão em `playwright/.auth/instagram.json`.
- `collect-reels.js` — acessa perfis configurados, captura links de Reels recentes e chama o parser.
- `parser.js` — normaliza texto, hashtags, números compactos, metadados, horário e duração.
- `save-json.js` — salva o payload em JSON e envia para Supabase quando configurado.
- `examples/reels-capture.example.json` — exemplo do formato final capturado.

## Configuração

```bash
cp .env.example .env
npm install
npx playwright install chromium
```

Preencha no `.env`:

```bash
IG_USERNAME=seu_usuario
IG_PASSWORD=sua_senha
IG_TARGET_PROFILES=perfil1,perfil2
SUPABASE_URL=https://xxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=xxxx
SUPABASE_TABLE=instagram_reels
```

## Rodar

```bash
npm run ig:login
npm run ig:collect
```

O JSON será salvo no caminho definido por `IG_OUTPUT_FILE`, por padrão `playwright/data/reels-capture.json`.

## n8n

Use um node **Execute Command** com:

```bash
npm run ig:collect
```

Recomendação para n8n:

1. Salvar `.env` como credenciais/secrets do ambiente.
2. Rodar `npm run ig:login` manualmente quando a sessão expirar.
3. Agendar `npm run ig:collect` com intervalo conservador.
4. Ler `playwright/data/reels-capture.json` no próximo node ou usar a tabela Supabase.

## Supabase

Tabela sugerida:

```sql
create table if not exists instagram_reels (
  reel_url text primary key,
  profile text,
  collected_at timestamptz,
  views bigint,
  likes bigint,
  comments bigint,
  hashtags text[],
  description text,
  music text,
  published_at timestamptz,
  duration_seconds integer,
  raw jsonb
);
```
