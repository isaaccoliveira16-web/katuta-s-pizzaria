document.getElementById('reserva-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const btn = document.getElementById('btn-submit');
    const status = document.getElementById('status-message');
    const formData = {
        nome_cliente: document.getElementById('nome_cliente').value,
        pax: document.getElementById('pax').value,
        kids: document.getElementById('kids').value,
        whatsapp_id: document.getElementById('whatsapp').value,
        hora: document.getElementById('hora').value
    };

    // Estágio de Processamento
    btn.disabled = true;
    btn.innerText = 'Processando...';
    status.innerHTML = '<p style="color: var(--secondary)">Enviando seu pedido ao Katutinha...</p>';

    try {
        // Tenta PRODUÇÃO (Workflow ATIVO) - Usando Tunnel Público para teste externo
        let response = await fetch('https://huge-chairs-argue.loca.lt/webhook/reserva-motor-webhook', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });

        // Tenta TESTE se PRODUÇÃO falhar
        if (response.status === 404) {
            response = await fetch('https://huge-chairs-argue.loca.lt/webhook-test/reserva-motor-webhook', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
        }

        if (response.ok) {
            const data = await response.json();
            status.innerHTML = `<div class="success-msg">
                <h3>🍕 Reserva Confirmada!</h3>
                <p>${data.output || 'Sucesso! Verifique a sua planilha.'}</p>
            </div>`;
            document.getElementById('reserva-form').reset();
        } else {
            throw new Error('Sem resposta do n8n');
        }
    } catch (error) {
        status.innerHTML = `<p style="color: #ff4444"><b>O Katutinha não respondeu:</b><br>
        1. Abra o n8n.<br>
        2. Clique em <b>"Execute Workflow"</b> no fluxo Katuta-03.</p>`;
    } finally {
        btn.disabled = false;
        btn.innerText = 'Confirmar Reserva';
    }
});
