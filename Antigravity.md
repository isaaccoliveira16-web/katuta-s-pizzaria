# Projeto Antigravity: Automação Inteligente com n8n

Este documento define o escopo e o planejamento para a criação de fluxos de trabalho avançados no n8n.

## 🎯 Objetivo
Desenvolver fluxos de trabalho (workflows) de alta qualidade no n8n, utilizando agentes inteligentes e integrações avançadas.

## 🛠️ Ferramentas e Recursos

## 🛠️ Ferramentas e Configuração

### 1. n8n MCP Server
**Objetivo**: Permitir que eu interaja diretamente com sua instância do n8n para criar, gerenciar e testar workflows.

## ✅ Instalação Concluída

O servidor MCP foi compilado com sucesso! Agora precisamos conectar tudo.

### 1. Configurar Credenciais (`.env`)
Eu criei um arquivo de configuração base. Você precisa adicionar suas chaves do n8n nele.
1.  Abra o arquivo: `tools/n8n-mcp/.env`
2.  Preencha:
    -   `N8N_API_URL`: Sua URL (ex: `http://localhost:5678`).
        *   **Nota para Docker**: Se estiver usando Docker, certifique-se de que a porta está mapeada (`-p 5678:5678`). Se `localhost` não funcionar, tente `http://127.0.0.1:5678`.
    -   `N8N_API_KEY`: Sua chave de API (Gere no n8n em: *Settings > Public API*)

### 2. Configurar seu Editor (Atualizado - Mais Seguro)
Para evitar problemas com caminhos e variáveis, criei um script de inicialização automático.
Atualize seu arquivo de configuração JSON para usar este script:

```json
{
  "mcpServers": {
    "n8n-mcp": {
      "command": "c:\\Users\\isaac\\OneDrive\\Desktop\\Antigravity 01\\tools\\n8n-mcp\\start.bat",
      "args": [],
      "env": {
        "MCP_MODE": "stdio",
        "LOG_LEVEL": "info",
        "DISABLE_CONSOLE_OUTPUT": "true"
      }
    }
  }
}
```

**Por que mudou?**
Este novo método (`start.bat`):
1.  Entra na pasta correta automaticamente (garantindo que o `.env` seja lido).
2.  Usa o Node.js que encontramos sem erros de caminho.
3.  É muito mais simples de configurar.

### 3. Verificar
1.  Salve a nova configuração.
2.  Reinicie o Editor.
3.  Me avise!

### 3. Verificar
Após salvar a configuração no seu editor:
1.  Reinicie o editor.
2.  Tente me pedir para "Listar os workflows do n8n" ou "Criar um workflow de teste".
3.  Se eu conseguir acessar as ferramentas, estaremos prontos!

#### 📋 Requisitos para Funcionamento (n8n API)

*   **N8N_API_URL**: A URL da sua instância n8n [](http://localhost:5678/).
*   **N8N_API_KEY**: Sua chave de API do n8n (eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJmZmYxYTI1YS01NjVmLTQzZGUtYTk0Yi0xYzAxYWM2MDY5ZTMiLCJpc3MiOiJuOG4iLCJhdWQiOiJwdWJsaWMtYXBpIiwiaWF0IjoxNzcwMjk3MjUwLCJleHAiOjE3NzI4NTI0MDB9.imRmcXfU-t7THXvM5dhNoVP765J8kKbz-75zQmIU9rc).

#### 🧰 Capacidades Principais
*   **Pesquisa**: Encontrar nós e templates (`search_nodes`, `search_templates`).
*   **Gerenciamento**: Criar e atualizar workflows (`n8n_create_workflow`, `n8n_update_full_workflow`).
*   **Execução**: Testar workflows e gatilhos (`n8n_test_workflow`).
*   **Validação**: Verificar erros comuns (`n8n_validate_workflow`).

### 2. n8n Skills
**Objetivo**: Fornecer diretrizes de "melhores práticas" para a criação de automações robustas.

#### 📚 As 7 Competências Essenciais
Utilizarei estas competências como base para todo desenvolvimento:

1.  **n8n Expression Syntax**: Uso correto de expressões (`{{ $json.body }}`), variáveis e tratamento de dados.
2.  **n8n MCP Tools Expert**: Uso eficiente das ferramentas do servidor MCP (Prioridade Alta).
3.  **n8n Workflow Patterns**: Aplicação de 5 padrões arquiteturais comprovados (Webhook, API, Banco de Dados, IA, Agendado).
4.  **n8n Validation Expert**: Interpretação e correção de erros de validação.
5.  **n8n Node Configuration**: Configuração consciente de dependências e tipos de conexão (especialmente para IA).
6.  **n8n Code JavaScript**: Padrões para nós de código JS e manipulação de objetos (`$input`, `$json`).
7.  **n8n Code Python**: Limitações e padrões para nós Python (uso de bibliotecas padrão).

## 🚀 Próximos Passos
1.  **Acesso**: Aguardo a confirmação da configuração do MCP Server no seu ambiente.
2.  **Planejamento**: Definir o primeiro workflow a ser criado (ex: uma automação simples para testar a integração).
3.  **Execução**: Utilizar as Skills para gerar o workflow e o MCP para implementá-lo na sua instância.
