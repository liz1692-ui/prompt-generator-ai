# prompt-generator-ai

Gerador automático de prompts para vídeos com gato e cachorro com voz consistente e lip sync perfeito.

## Como ver o app

### Opção 1 — pelo GitHub Pages

1. Entre no repositório `liz1692-ui/prompt-generator-ai`.
2. Clique em **Actions** e rode o workflow **Deploy static site to GitHub Pages** se ele ainda não tiver rodado.
3. Depois, abra **Settings → Pages** e acesse o link publicado do site.
4. A tela nova aparece no próprio app, na seção **🚀 Automação Instagram**, abaixo dos botões de estilo.

> Se você estiver na tela inicial do GitHub, como no print, clique primeiro no repositório `liz1692-ui/prompt-generator-ai` na coluna **Top repositories**. A mudança não aparece na home do GitHub.

### Opção 2 — no computador

1. Baixe ou clone este repositório.
2. Abra o arquivo `index.html` no navegador.
3. Se quiser servir localmente, rode:

```bash
python3 -m http.server 4173
```

Depois acesse `http://127.0.0.1:4173/index.html`.

## Módulo ANALISTA INSTAGRAM

A automação real fica em `playwright/` e foi preparada para Playwright, Docker, n8n, JSON local e Supabase.

```bash
cp .env.example .env
npm install
npx playwright install chromium
npm run ig:login
npm run ig:collect
```

Leia o guia completo em [`playwright/README.md`](playwright/README.md).

## O que o app faz

- Gera JSON para prompts VEO3 em formato de podcast com gato e cachorro.
- Permite escolher estilo, modelo VEO, continuação de cena e imagem base.
- Cria um plano de automação para Instagram seguindo o fluxo: análise → IA decide → cria roteiro → cria prompt → gera vídeo → publica via API oficial.
- Coleta Reels recentes com delays humanos e salva dados em JSON/Supabase pelo módulo `playwright/`.

## Observação sobre Instagram

A publicação automática deve ser feita fora do navegador, usando backend, n8n ou Make com OAuth, conta profissional e Instagram Graph API. O app gera o plano JSON e o roteiro, mas não guarda tokens nem senhas do Instagram no frontend.
