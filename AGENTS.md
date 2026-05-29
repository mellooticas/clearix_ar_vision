# AGENTS.md — clearix_ar_vision

> **Porta de entrada padronizada** para qualquer agente IA (Claude, Cursor, Cline, Copilot, Aider) entrando neste app. Convenção definida em [ADR-0024](../../Cockpit/ADR/ADR-0024-agents-md-por-app-aguardando-design-system.md).
>
> Criado em 2026-05-25 (replicação do padrão piloto `clearix_hub/AGENTS.md`).

---

## 1. O que é (1 frase)

Prova virtual de armações (Realidade Aumentada) + medição digital (pupilometria por câmera) do ecossistema Clearix — câmera + MediaPipe Vision + Three.js renderizando armação 3D no rosto do cliente.

## 2. Posição na DIGIAI

- **Verdade Canônica que rege:** *"Clearix é a prioridade máxima da DIGIAI"* (MÁXIMO)
- **Fase atual do app:** Produção / pre-1.0 (`version: 0.1.0`) — ficha canônica registra AR Vision entre módulos com pendências ativas
- **Prioridade na matriz:** **MÉDIA** (diferencial comercial — não bloqueia operação básica)
- **Categoria portfólio:** PRODUTO-ÂNCORA (parte do Clearix)
- **Pacote comercial:** add-on / pacotes Crescimento e Completo

## 3. Onde está a verdade (leituras obrigatórias antes de editar)

- **Spec da suíte:** [`../../Cockpit/Spec/clearix_eco_full.md`](../../Cockpit/Spec/clearix_eco_full.md) §2 + §7.1 (AR Vision em pendências ativas) + §13
- **ADRs aplicáveis:**
  - [ADR-0001 v3](../../Cockpit/ADR/ADR-0001-clearix-db-isolamento.md) — isolamento DB Clearix
  - [ADR-0022](../../Cockpit/ADR/ADR-0022-pricing-clearix-corrigido-4-pacotes.md) — pricing
- **Regras Harness críticas:**
  - **R-003** — não commit sem pedido
  - **R-004** — ação destrutiva exige confirmação
  - **R-005** — UI verificada no navegador (essencial: câmera só funciona em HTTPS real)
  - **R-009** — banco Clearix isolado
  - **R-010** — Pergunta de Ouro
  - **R-013** — schema obrigatório de cadastros de pessoa (medição vinculada ao cliente)
  - **R-014** — design system Clearix Lens obrigatório
  - **R-024** — Baseline AppSec (OWASP Top 10): RLS · parametrized queries · webhooks com signature · headers de segurança · `dangerouslySetInnerHTML` e `execute_sql` interpolado bloqueados por hook T-005
- **Documentação do app:** [`docs/`](docs/) ou `clearix_docs/apps/clearix_ar_vision/`

## 4. Stack + dev

- **Stack:** Next.js 15.5 + React 19.1 + TypeScript 5 + Tailwind 4 + Supabase SSR + React Query + **`@mediapipe/tasks-vision` 0.10** (face landmarks) + **`@react-three/fiber` 9** + **`@react-three/drei` 10** + Three.js 0.171 + Zustand + Zod + react-hook-form + sonner
- **Porta dev:** turbopack (Next.js padrão 3000) — usar `-p` para evitar conflito
- **URL produção:** **`https://clearixarvision.netlify.app`** (padrão da suíte — ⚠️ a confirmar)
- **Como rodar:** `npm run dev` (turbopack)
- **Hospedagem:** Netlify (`@netlify/plugin-nextjs` 5.15)
- **CI/CD:** confirmar via `netlify.toml`

## 5. Banco + permissões

- **Projeto Supabase:** `mhgbuplnxtfgipbemchb`
- **MCP Supabase tem acesso direto?** **✅ Sim**
- **Schemas que o app toca:**
  - Schema próprio AR/medição (`ar_vision` ou cross com `clinical`) — ⚠️ confirmar
  - `inventory` (read) — disponibilidade das armações que aparecem na prova
  - `iam` (read) — tenants/stores/users via JWT
- **RLS por `tenant_id`:** ✅ ativo (medições/sessões de prova não cruzam tenant)
- **JWT custom claims:** `tenant_id` + `store_id`
- **Auth provider:** SSO via Clearix Hub
- **Storage:** Supabase Storage (modelos 3D + snapshots de prova)

## 6. Comandos

### ✅ Verde (rodar sem confirmar)

- `npm run dev` — sobe dev (turbopack)
- `npm run build` — build Next.js
- `npm run lint` — eslint
- `npm run start` — start production local
- `npm run typecheck` — `tsc --noEmit`

### 🟡 Confirma antes

- `npm install <pacote>` — nova dependência (cuidado: 3D + Vision já são bundle pesado)
- Adicionar novo modelo 3D ao bucket Storage (custo + bandwidth)
- DDL em schema próprio

### 🔴 Nunca sem permissão explícita (R-003, R-004, R-011)

- `git push` / `git commit`
- DELETE em medição salva (pode estar referenciada em pedido)
- Salvar foto/vídeo do cliente sem consentimento LGPD explícito
- Compartilhar medição entre tenants (ferramenta de prova é por tenant)
- `dangerouslySetInnerHTML` sem DOMPurify (hook T-005 bloqueia — R-024)
- `execute_sql` com template literal interpolado (hook T-005 bloqueia — R-024)

## 7. Design System Clearix Lens (obrigatório por R-014)

**Cor canônica deste app:** `#D946EF` (fuchsia-500) — sotaque visual do AR Vision

**Antes de criar/editar UI, leia:**
- [`../../Cockpit/clearix_design/assets/AGENT_GUIDE.md`](../../Cockpit/clearix_design/assets/AGENT_GUIDE.md)
- Tokens: [`../../Cockpit/clearix_design/assets/tokens/`](../../Cockpit/clearix_design/assets/tokens/)

**5 regras inegociáveis:**
1. action-primary = **blue-500** light / **blue-300** dark (fuchsia é só sotaque — **NUNCA usar fuchsia como ação**)
2. Só **Inter** + **JetBrains Mono**
3. Filtros multi-valor SEMPRE tri-state
4. **PT-BR 100%** + tom humano (telas de prova devem reduzir ansiedade — cliente está com câmera ligada)
5. WCAG AA mínimo

## 8. NÃO fazer (antipatterns específicos deste app)

- Solicitar câmera sem prompt explicativo claro (LGPD + UX)
- Salvar frames da câmera sem consentimento opt-in
- Auth custom — sempre SSO Hub
- Esquecer R-014 e usar libs UI sem tokens
- Carregar modelo 3D pesado sem skeleton + fallback
- Confiar 100% na medição IA — sempre permitir override manual do profissional
- Subir modelo proprietário no repo (Git LFS no máximo, preferir Storage)

## 9. Secrets

- **Onde:** `.env.local`
- **Variáveis exigidas:**
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `SUPABASE_SERVICE_ROLE_KEY`
  - `NEXT_PUBLIC_SIS_GATEWAY_URL`
  - `SSO_EXCHANGE_SHARED_SECRET`
- **NUNCA commitar `.env*`**

## 10. Pendências conhecidas

- [ ] Spec §7.1 — AR Vision entre módulos com pendência operacional ativa
- [ ] Confirmar URL produção
- [ ] Política LGPD para uso da câmera (consentimento + retenção de imagens)
- [ ] Validar precisão da pupilometria contra medição manual em ambiente real
- [ ] Otimizar bundle (Three + MediaPipe = ~5MB+)

---

## Notas para quem mantém este arquivo

- **Última atualização:** 2026-05-25
- **Owner deste arquivo:** quem mantém AR Vision

> Em caso de dúvida, **pause e pergunte ao humano**. AR Vision usa câmera do cliente — LGPD nível alto + UX delicada.
