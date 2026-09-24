# Changelog — Clearix AR Vision

## 2026-09-23 — Hospedagem: Netlify → Cloudflare (virada)

- **Endereço oficial:** `https://arvision.clearix.app.br` (Worker `clearix-arvision`). Legado: `https://clearixarvision.netlify.app` (Netlify, só até desligar; nada aponta mais para ele).
- **Login:** Hub oficial `https://app.clearix.app.br`; este app troca o ticket de SSO lá com segredo PRÓPRIO (`SSO_EXCHANGE_SHARED_SECRET` no app = `SSO_EXCHANGE_SECRET_CLEARIX_AR_VISION` no Hub).
- **Como foi feito:** decisão do dono 23/09 ("todos dentro do Cloudflare da Clearix"); `@opennextjs/cloudflare` (Next 15) + `wrangler.jsonc` + build local com variáveis públicas explícitas + `wrangler deploy`; o build estava quebrado desde 07/2026 por um `export type` de tipos inexistentes em `src/types/index.ts` (removido). `iam.clearix_apps.url_production` virado (antigo em `url_legacy`).
- **Status na virada:** publicado 23/09 21h25, testado logado pelo Hub novo 23h20 (dashboard, Prova Virtual, Medir PD, Catálogo no menu).
- **Onde está tudo:** `Cockpit/infra/virada-cloudflare-2026-09-23.md`, `Cockpit/infra/runbook-migrar-app-para-cloudflare.md`, ADR-0059/0060, R-042.


## Não lançado
- Estrutura `docs/` criada (scaffold padrão DIGIAI).
