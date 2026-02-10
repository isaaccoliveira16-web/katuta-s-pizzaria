# Monitoring & Observability

Padrões para garantir que nada passe despercebido em produção.

## 1. Global Error Handling
*   **Error Workflow**: Todo ambiente deve ter um workflow de erro centralizado que captura falhas e as envia para um canal de triagem (Slack/Discord/Ops).
*   **Execution Metadata**: Logs de erro devem conter: Nome do Workflow, Link da Execução, Nó da Falha e Payload de Entrada.

## 2. Observabilidade
*   **Transaction ID**: Gerar um ID único no gatilho para rastrear o dado em toda a cadeia de micro-serviços.
*   **Health Checks**: Endpoints dedicados para verificar se os serviços integrados (DB, API) estão online.

## 3. Logging Profissional
*   **Log Levels**:
    *   `INFO`: Início e fim de passos importantes.
    *   `WARN`: Falhas não críticas (retentativas).
    *   `ERROR`: Interrupção do fluxo.
*   **Structured Logs**: Logs em formato JSON para facilitar a análise em ferramentas de BI.
