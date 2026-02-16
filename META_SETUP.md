# Configuração da API do WhatsApp (Meta)

Siga este guia para obter suas credenciais e conectar o n8n ao WhatsApp.

### Passo 1: Pegar as Credenciais

1.  Acesse o [Painel do Desenvolvedor Meta](https://developers.facebook.com/).
2.  Entre no seu App (que você criou para o WhatsApp).
3.  No menu lateral esquerdo, vá em **WhatsApp** > **Configuração da API** (API Setup).
4.  Nesta tela você encontrará:
    *   **Phone Number ID**: Um número longo (ex: `100523456789...`). Copie e guarde.
    *   **Temporary Access Token**: Um código gigante que começa com `EAAG...`. Copie e guarde.
        *   *Nota: Esse token dura 24h. Para produção, precisaremos gerar um permanente depois, mas serve para testar agora.*

### Passo 2: Configurar o n8n

1.  Abra o seu **n8n**.
2.  Vá no fluxo **Katuta-04-WhatsApp-Flow** (ou Recepção).
3.  Clique no node **Responder via Meta** (o último verdinho do WhatsApp).
4.  Role até **Credentials** e selecione "Create New" (ou Edit se já tiver).
5.  Preencha:
    *   **Access Token**: Cole o código `EAAG...`
    *   **Phone Number ID**: Cole o ID numérico.
    *   **Business Account ID**: (Opcional, geralmente não precisa para enviar).
6.  Salve!

### Passo 3: Configurar o Webhook (Para Receber Mensagens)

1.  No n8n, abra o node inicial **Webhook Chat** (ou Webhook WhatsApp).
2.  Copie a URL de **Production** (ou Test se estiver usando túnel).
    *   Deve ser algo como: `https://seu-n8n.com/webhook/katuta-chat-flow`
3.  Volte no Painel da Meta.
4.  No menu lateral, vá em **WhatsApp** > **Configuração** (Configuration).
5.  Em **Webhook**, clique em "Edit".
6.  Cole a URL do n8n.
7.  No "Verify Token", você pode colocar qualquer coisa (ex: `katuta123`), mas precisa configurar isso no n8n também para validar (se o n8n pedir).
    *   *Dica: O n8n geralmente valida automaticamente se o método for GET. Se der erro de validação, me avise.*
8.  Em **Webhook Fields**, clique em "Manage" e marque:
    *   `messages` (Isso é o principal!)

### Teste Final 🚀

1.  Mande um "Oi" para o número de teste da Meta.
2.  Veja se o n8n recebeu!

Se tiver dúvidas em algum passo específico, me mande um print!
