// Header Scroll Effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.add('scrolled'); // Force for styling logic if needed, actually let's toggle properly
    }
});

window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
}); // Close menu when clicking a link

// --- Chatbot Logic ---
const chatToggle = document.getElementById('chatToggle');
const chatWidget = document.getElementById('chatWidget');
const chatClose = document.getElementById('chatClose');
const chatInput = document.getElementById('chatInput');
const chatSend = document.getElementById('chatSend');
const chatBody = document.getElementById('chatBody');

// Toggle Chat
chatToggle.addEventListener('click', () => {
    chatWidget.classList.add('active');
    setTimeout(() => chatInput.focus(), 300);
});

chatClose.addEventListener('click', () => {
    chatWidget.classList.remove('active');
});

// Add message to DOM
function addMessage(text, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message', sender);
    msgDiv.textContent = text;
    chatBody.appendChild(msgDiv);
    chatBody.scrollTop = chatBody.scrollHeight; // Auto-scroll
}

// Handle Send
function handleSend() {
    const text = chatInput.value.trim();
    if (text === '') return;

    // User message
    addMessage(text, 'user');
    chatInput.value = '';

    // n8n Webhook Connection (Real Backend)
    // IMPORTANT: Substitua esta URL pela URL de Webhook de Teste ou Produção do seu n8n
    const N8N_WEBHOOK_URL = 'http://localhost:5678/webhook/waas-chatbot';
    // Em produção via Pinggy: 'https://seu-subdominio.free.pinggy.link/webhook/waas-chatbot'

    const typingMsgId = 'typing-' + Date.now();

    // Indicador de digitação
    addMessage('Digitando...', 'bot');
    const lastMsg = chatBody.lastChild;
    lastMsg.id = typingMsgId;
    lastMsg.style.fontStyle = 'italic';
    lastMsg.style.opacity = '0.7';

    // Envio real via POST
    fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            message: text,
            sessionId: 'waas-user-' + Math.random().toString(36).substr(2, 9) // ID simples de sessão
        })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro na comunicação com o servidor.');
            }
            return response.json();
        })
        .then(data => {
            // Remove a mensagem de digitaçao
            const typingMsg = document.getElementById(typingMsgId);
            if (typingMsg) typingMsg.remove();

            // A resposta do n8n deve conter um campo "reply" no JSON final
            const botReply = data.reply || data.message || "Desculpe, não entendi o retorno do servidor.";
            addMessage(botReply, 'bot');
        })
        .catch(error => {
            console.error('Erro no Webhook:', error);
            const typingMsg = document.getElementById(typingMsgId);
            if (typingMsg) typingMsg.remove();
            addMessage('Desculpe, meu sistema está offline no momento. Tente novamente mais tarde, ou chame no WhatsApp.', 'bot');
        });
}

chatSend.addEventListener('click', handleSend);
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSend();
});

// Close menu when clicking a link
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});
