# Guia Rápido: Como Usar o Sistema Katuta's 🍕🚀

Não se preocupe com o número de arquivos! Só existem **3 passos simples** para você ver a mágica acontecer.

## Passo 1: O Google Sheets (A Base)
Abra o Google Sheets e crie as duas abas (`Mesas` e `Controle_Reservas`) conforme o guia que te mandei.
- **Link do Guia**: [katuta_sheets_setup.md](file:///c:/Users/isaac/OneDrive/Desktop/Antigravity%2001/katuta_sheets_setup.md)

## Passo 2: O n8n (O Motor)
Eu já enviei os fluxos para o seu n8n. Abra-o no navegador e faça o seguinte:
1. Entre em cada um dos 4 fluxos.
2. No nó do **Google Sheets**, clique em "Connect" e selecione sua conta.
3. No nó de **WhatsApp**, conecte sua API.
4. Clique no botão **"Active"** no canto superior direito de cada fluxo para deixá-los ligados (On).

## Passo 3: O Teste (A Mágica)
Mande um "Oi" para o seu número de WhatsApp da Pizzaria.
1. O fluxo de **Recepção** vai te atender.
2. A **Katutinha** vai entrar na conversa.
3. Quando você confirmar a reserva, o **Motor de Mesas** vai pintar a planilha de vermelho automaticamente.

---

### Entenda o Desenho do Sistema:
`Você (WhatsApp)` ➡️ `01-Recepção` ➡️ `02-Katutinha (IA)` ➡️ `03-Planilha Sheets`
*(O 99-Error Handler fica lá no fundo só vigiando se algo falhar para te avisar).*

**DICA**: Se você quiser mudar o nome da atendente ou como ela fala, é só editar o fluxo **02-AI-Brain**.
