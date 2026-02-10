# Enterprise Architecture Patterns for n8n

Este documento define os padrões de construção para automações de missão crítica em escala corporativa.

## 1. Idempotência e Resiliência
*   **Unique Execution IDs**: Todo workflow deve tentar gerar ou capturar um ID único (ex: ID da NF, Hash do e-mail) para evitar processamento duplicado.
*   **Check-before-Action**: Antes de realizar uma ação (ex: registrar no banco), o fluxo deve verificar se a ação já foi concluída anteriormente.
*   **Exponential Backoff**: Implementação de retentativas automáticas com tempos crescentes em caso de falha de APIs externas.

## 2. Padrão Microservices
*   **Workflows Modulares**: Fluxos gigantes devem ser quebrados em sub-fluxos menores chamados via nó `Execute Workflow`.
*   **Separation of Concerns**: Um workflow para extração de dados, outro para lógica de negócios, outro para entrega final.

## 3. Nomenclatura e Documentação
*   **Naming Convention**: `[Tipo] Nome do Nó - Função Específica` (ex: `[HTTP] Stripe API - Criar Cliente`).
*   **Sticky Notes**: Uso obrigatório de notas explicativas agrupando áreas lógicas (Auth, Transformation, Output).

## 4. Gerenciamento de Estado
*   **Context Persistence**: Uso de bancos de dados externos (PostgreSQL/Redis) em vez de depender apenas de variáveis temporárias para fluxos que duram dias.
