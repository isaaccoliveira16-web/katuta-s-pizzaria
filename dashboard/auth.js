// AUTENTICAÇÃO REAL (Integração n8n + Google Sheets)
// Este módulo agora verifica o usuário contra a base de dados em tempo real.

const AUTH_API_URL = "http://localhost:5678/webhook/katuta-auth";
const CREATE_USER_API_URL = "http://localhost:5678/webhook/katuta-create-user";
const SESSION_KEY = 'katuta_auth_user';

const Auth = {
    /**
     * Faz login chamando a API do n8n (Google Sheets)
     */
    login: async (username, password) => {
        try {
            const response = await fetch(AUTH_API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            if (!response.ok) {
                return { success: false, message: 'Erro ao se conectar com o servidor.' };
            }

            const data = await response.json();

            // O n8n deve retornar um array ou o primeiro item
            const result = Array.isArray(data) ? data[0] : data;

            if (result && result.success) {
                const sessionData = {
                    username: username,
                    role: result.role,
                    name: result.name,
                    loginTime: new Date().getTime()
                };
                sessionStorage.setItem(SESSION_KEY, JSON.stringify(sessionData));
                return { success: true };
            }

            return { success: false, message: result?.message || 'Usuário ou senha inválidos' };

        } catch (error) {
            console.error("Erro na autenticação:", error);
            // FALLBACK DE SEGURANÇA LOCAL (apenas caso o n8n esteja fora do ar e precise entrar de emergência)
            if (username === 'admin' && password === 'katuta2025!') {
                sessionStorage.setItem(SESSION_KEY, JSON.stringify({ username: 'admin', role: 'admin', name: 'Master' }));
                return { success: true, message: 'Fallback local ativado (n8n offline).' };
            }
            return { success: false, message: 'Erro de conexão HTTP.' };
        }
    },

    /**
     * Cria um novo usuário na planilha (Somente Admins)
     */
    createUser: async (newUsername, newPassword, newName, newRole) => {
        if (!Auth.canEdit()) {
            return { success: false, message: 'Permissão negada. Apenas Admins podem criar usuários.' };
        }

        try {
            const response = await fetch(CREATE_USER_API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: newUsername,
                    password: newPassword,
                    name: newName,
                    role: newRole,
                    adminUser: Auth.getUser().username // Registro de quem criou
                })
            });

            if (!response.ok) throw new Error('Falha na requisição');

            const data = await response.json();
            const result = Array.isArray(data) ? data[0] : data;

            return { success: true, message: result?.message || 'Usuário criado com sucesso!' };

        } catch (error) {
            console.error("Erro ao criar usuário:", error);
            return { success: false, message: 'Erro de conexão com a API de usuários.' };
        }
    },

    logout: () => {
        sessionStorage.removeItem(SESSION_KEY);
        window.location.href = 'login.html';
    },

    checkAuth: () => {
        const session = sessionStorage.getItem(SESSION_KEY);
        if (!session) {
            window.location.href = '/dashboard/login.html';
            return null;
        }
        return JSON.parse(session);
    },

    getUser: () => {
        const session = sessionStorage.getItem(SESSION_KEY);
        return session ? JSON.parse(session) : null;
    },

    canEdit: () => {
        const user = Auth.getUser();
        return user && user.role === 'admin';
    }
};
