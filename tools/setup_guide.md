# Guia de Configuração: WhatsApp Business & Google Sheets (n8n)

Este documento detalha o passo a passo para conectar o WhatsApp (via Meta Cloud API) e o Google Sheets ao seu sistema Katuta's no n8n.

## Parte 1: Configurando o WhatsApp (Meta Cloud API)

Para usar o WhatsApp oficial, você precisa criar um App no Meta for Developers.

### 1. Criar o App
1. Acesse [developers.facebook.com](https://developers.facebook.com/) e faça login.
2. Vá em **Meus Apps** > **Criar App**.
3. Selecione **Outro** > **Avançar**.
4. Selecione **Empresa** (Business) > **Avançar**.
5. Dê um nome ao App (ex: `Katuta Pizza Bot`) e insira seu e-mail.
6. Clique em **Criar App**.

### 2. Adicionar o Produto WhatsApp
1. No painel do app, procure por **WhatsApp** e clique em **Configurar**.
2. Na barra lateral esquerda, vá em **WhatsApp** > **Configuração da API**.

### 3. Pegar as Credenciais (Token e IDs)
Nesta tela "Configuração da API", você verá:
- **Token de acesso temporário**: Copie este código (ele dura 24h, ideal para testes).
- **Identificação do número de telefone**: (Phone Number ID).
- **Identificação da conta do WhatsApp Business**: (WABA ID).

> [!IMPORTANT]
> **Salve esses 3 códigos!** Você vai usá-los no n8n.

### 4. Configurar o Número de Teste
1. Role a tela até a seção "Enviar e receber mensagens".
2. No campo **Para**, adicione o **seu número de WhatsApp pessoal** que será usado para testar.
3. Você receberá um código de confirmação no seu WhatsApp. Insira no site.

### 5. Configurar o Webhook (Para Receber Mensagens)
1. No n8n, abra o workflow `Katuta-01-Reception`.
2. Dê um duplo clique no nó **Webhook WhatsApp**.
3. Copie a **URL de Produção** (ex: `https://seu-n8n.tunnel/webhook/katuta-webhook`).
4. Volte ao Meta Developers.
5. No menu lateral, vá em **WhatsApp** > **Configuração**.
6. Clique em **Editar** na seção Webhook.
7. Cole a URL do n8n.
8. No **Token de verificação**, invente uma senha (ex: `katutasecret123`) e coloque a mesma no n8n (se ele pedir, mas na versão simples webhook direto não pede).
9. Clique em **Verificar e Salvar**.
10. Em "Campos de Webhook", clique em **Gerenciar**.
11. Assine os eventos **messages**.

---

## Parte 2: Configurando o Google Sheets

Para o n8n escrever na sua planilha, precisamos de uma "Conta de Serviço" (Service Account) do Google.

### 1. Criar Projeto no Google Cloud
1. Acesse [console.cloud.google.com](https://console.cloud.google.com/).
2. Crie um **Novo Projeto** (ex: `Katuta Sheets`).

### 2. Ativar a API
1. No menu, vá em **APIs e Serviços** > **Biblioteca**.
2. Pesquise por **Google Sheets API**.
3. Clique em **Ativar**.
4. Pesquise também por **Google Drive API** e ative (para ler pastas se precisar).

### 3. Criar Credenciais
1. Vá em **APIs e Serviços** > **Credenciais**.
2. Clique em **Criar Credenciais** > **Conta de serviço**.
3. Dê um nome (ex: `n8n-bot`). Clique em **Criar e Continuar**.
4. Em "Papel", selecione **Editor** (Project > Editor). Clique em **Concluir**.

### 4. Gerar a Chave (JSON)
1. Clique no e-mail da conta de serviço que você acabou de criar (ex: `n8n-bot@katuta-sheets.iam.gserviceaccount.com`).
2. Vá na aba **Chaves**.
3. Clique em **Adicionar Chave** > **Criar nova chave**.
4. Escolha **JSON** e clique em **Criar**.
5. Um arquivo será baixado no seu computador. **Guarde-o com carinho!**

### 5. Configurar no n8n
1. No n8n, vá em **Credentials** > **Add Credential**.
2. Pesquise por **Google Sheets OAuth2 API** (ou Service Account se disponível, mas OAuth2 é o padrão moderno).
   - *Dica:* Se usar "Google Sheets OAuth2 API", você precisa configurar a "Tela de permissão OAuth" no Google Cloud.
   - *Dica Mais Fácil:* Use o tipo **Google API** e selecione "Service Account".
3. Copie o e-mail da conta de serviço (`...iam.gserviceaccount.com`) e coloque no campo "Service Account Email".
4. Abra o arquivo JSON que você baixou com o Bloco de Notas.
5. Copie todo o conteúdo e cole no campo "Private Key" do n8n.

### 6. Compartilhar a Planilha
> [!WARNING]
> Passo Crucial e frequentemente esquecido!

1. Abra sua planilha do Google Sheets ("Controle de Reservas").
2. Clique no botão **Compartilhar** (Share).
3. Cole o **e-mail da conta de serviço** (`n8n-bot@...`) que você criou.
4. Dê permissão de **Editor**.
5. Desmarque "Notificar pessoas" e clique em **Compartilhar**.

Pronto! Agora o robô tem permissão para escrever na sua planilha.
