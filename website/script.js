// ========================
// NAVEGAÇÃO SUAVE (click nos botões)
// ========================
document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = btn.getAttribute('href').substring(1);
        const target = document.getElementById(targetId);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ========================
// NAVEGAÇÃO MOBILE (Hamburger)
// ========================
const hamburger = document.getElementById('hamburger-btn');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    // Fecha menu ao clicar em um link
    navLinks.querySelectorAll('.nav-btn').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
}

// Configurar Data Mínima (Hoje)
const today = new Date().toISOString().split('T')[0];
document.getElementById('data_reserva').value = today;
document.getElementById('data_reserva').min = today;

// Validar Dias da Semana (Bloquear Segunda-feira)
document.getElementById('data_reserva').addEventListener('change', function () {
    const date = new Date(this.value);
    const day = date.getUTCDay(); // 0 = Domingo, 1 = Segunda, ...

    if (day === 1) { // Segunda-feira
        alert('A pizzaria fecha às segundas-feiras! Por favor, escolha outra data.');
        this.value = '';
    }
});

// ========================
// CÁLCULO TOTAL DE PESSOAS (PAX)
// ========================
function calcularPax() {
    const adultos = parseInt(document.getElementById('adultos').value) || 0;
    const c6_10 = parseInt(document.getElementById('criancas_6_10').value) || 0;
    const c0_5 = parseInt(document.getElementById('criancas_0_5').value) || 0;
    const total = adultos + c6_10 + c0_5;
    document.getElementById('total-pax').innerText = total;
}

['adultos', 'criancas_6_10', 'criancas_0_5'].forEach(id => {
    document.getElementById(id).addEventListener('input', calcularPax);
});
// Inicializa
calcularPax();

document.getElementById('reserva-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const btn = document.getElementById('btn-submit');
    const status = document.getElementById('status-message');
    const adultos = parseInt(document.getElementById('adultos').value) || 0;
    const criancas_meia = parseInt(document.getElementById('criancas_6_10').value) || 0;
    const criancas_free = parseInt(document.getElementById('criancas_0_5').value) || 0;
    const totalPax = adultos + criancas_meia + criancas_free;

    if (totalPax === 0) {
        alert("Por favor, informe a quantidade de pessoas.");
        btn.disabled = false;
        return;
    }

    const formData = {
        nome_cliente: document.getElementById('nome_cliente').value,
        pax: totalPax,
        adultos: adultos,
        criancas_6_10: criancas_meia,
        criancas_0_5: criancas_free,
        whatsapp_id: document.getElementById('ddi').value + document.getElementById('whatsapp').value.replace(/\D/g, ''),
        data_reserva: document.getElementById('data_reserva').value,
        hora: document.getElementById('hora').value
    };

    // Estágio de Processamento
    btn.disabled = true;
    btn.innerText = 'Processando...';
    status.innerHTML = '<p style="color: var(--secondary)">Enviando seu pedido ao Katutinha...</p>';

    try {
        // PRODUÇÃO: Webhook via Túnel Público (ngrok)
        // ⚠️ IMPORTANTE: Se reiniciar o ngrok, a URL muda! Atualize aqui.
        const N8N_BASE = 'https://disaffectedly-vibrative-rafael.ngrok-free.dev';

        let response = await fetch(N8N_BASE + '/webhook/reserva-motor-webhook', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Bypass-Tunnel-Reminder': 'true'
            },
            body: JSON.stringify(formData)
        });

        // Tenta TESTE se PRODUÇÃO falhar
        if (response.status === 404) {
            response = await fetch(N8N_BASE + '/webhook-test/reserva-motor-webhook', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Bypass-Tunnel-Reminder': 'true'
                },
                body: JSON.stringify(formData)
            });
        }

        if (response.ok) {
            const data = await response.json();
            status.innerHTML = `<div class="success-msg">
                <h3>🍕 Reserva Confirmada!</h3>
            </div>`;
            document.getElementById('reserva-form').reset();
            // Restaurar data de hoje após reset
            document.getElementById('data_reserva').value = new Date().toISOString().split('T')[0];
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
