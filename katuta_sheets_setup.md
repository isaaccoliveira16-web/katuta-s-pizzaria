# Guia de Configuração: Google Sheets - Katuta's Pizzaria

Para o funcionamento correto do sistema, crie uma planilha Google com as seguintes duas abas:

## Aba 1: `Mesas`
Esta aba controla a ocupação física do restaurante.
- **Colunas**:
    - `Mesa_ID`: (1 a 50)
    - `Capacidade`: (Fixar em 4)
    - `Status`: (LIVRE ou RESERVADO)
    - `WhatsApp`: (Número do cliente se reservado)
    - `Link_Helper`: (Fórmula: `=HIPERLINKS(...)` opcional)

> [!TIP]
> **Formatação Condicional**:
> 1. Selecione a coluna `Status`.
> 2. Formatar > Formatação Condicional.
> 3. Regra 1: "O texto é exatamente" `RESERVADO` -> Cor de preenchimento Vermelha.
> 4. Regra 2: "O texto é exatamente" `LIVRE` -> Cor de preenchimento Verde.

## Aba 2: `Controle_Reservas`
Registro histórico de quem reservou.
- **Colunas**:
    - `Reserva_ID`: (ID gerado pelo n8n)
    - `Nome_Cliente`: (Capturado pela Katutinha)
    - `WhatsApp`: (Número de origem)
    - `Qtd_Pessoas`: (Número informado)
    - `Mesas_Alocadas`: (Ex: "Mesa 1, Mesa 2")
    - `Timestamp`: (Data e hora da reserva)
    - `Status`: (Ativa / Concluída / Cancelada)
