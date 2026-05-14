# prompt-generator-ai

Gerador automático de prompts para vídeos com gato e cachorro com voz consistente e lip sync perfeito.

## O que o app faz

- Gera JSON para prompts VEO3 em formato de podcast com gato e cachorro.
- Permite escolher estilo, modelo VEO, continuação de cena e imagem base.
- Cria um plano de automação para Instagram seguindo o fluxo: análise → IA decide → cria roteiro → cria prompt → gera vídeo → publica via API oficial.

## Observação sobre Instagram

A publicação automática deve ser feita fora do navegador, usando backend, n8n ou Make com OAuth, conta profissional e Instagram Graph API. O app gera o plano JSON e o roteiro, mas não guarda tokens nem senhas do Instagram no frontend.
