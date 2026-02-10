# Security & Backend Best Practices

Diretrizes de segurança e estrutura de backend para grandes empresas.

## 1. Gestão de Segredos
*   **Environment Variables**: Nunca colocar chaves no código. Uso estrito de arquivos `.env` ou Vaults externos.
*   **Credential Scoping**: Usar chaves de API com as permissões mínimas necessárias (*Least Privilege*).

## 2. Integridade de Dados
*   **Sanitization**: Todo input vindo de Webhooks deve ser validado antes de ser usado em nós de Código ou Banco de Dados.
*   **PII Masking**: Dados sensíveis (CPF, senhas) devem ser mascarados em logs e notificações de erro.

## 3. Autenticação Moderna
*   **OAuth2 Flow**: Preferência por fluxos de renovação de token automáticos.
*   **JWT Validation**: Verificação de assinaturas e expiração em todos os serviços customizados.

## 4. Backend Resiliente
*   **Rate Limiting**: Proteção de endpoints para evitar sobrecarga.
*   **CORS Strict**: Configuração rígida de origens permitidas para sites frontend.
