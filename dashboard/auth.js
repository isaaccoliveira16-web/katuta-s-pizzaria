// AUTENTICAÇÃO SIMPLES (Client-Side)
// Como não temos banco de dados no frontend estático, usamos isso.
// Em produção real, isso deveria ser via API. Para o MVP, serve.

const USERS = {
    'admin': { pass: 'katuta2024!', role: 'admin', name: 'Administrador' },
    'maicon': { pass: 'pizza123', role: 'viewer', name: 'Maicon' },
    'colab1': { pass: 'colab01', role: 'viewer', name: 'Colaboradora 1' },
    'colab2': { pass: 'colab02', role: 'viewer', name: 'Colaboradora 2' },
    'kaue': { pass: 'kaue123', role: 'viewer', name: 'Kauê' }
};

const SESSION_KEY = 'katuta_auth_user';

const Auth = {
    login: (username, password) => {
        const user = USERS[username.toLowerCase()];
        if (user && user.pass === password) {
            // Salva apenas dados não sensíveis na sessão
            const sessionData = {
                username: username,
                role: user.role,
                name: user.name,
                loginTime: new Date().getTime()
            };
            sessionStorage.setItem(SESSION_KEY, JSON.stringify(sessionData));
            return { success: true };
        }
        return { success: false, message: 'Usuário ou senha incorretos' };
    },

    logout: () => {
        sessionStorage.removeItem(SESSION_KEY);
        window.location.href = 'login.html';
    },

    checkAuth: () => {
        // AUTENTICAÇÃO TEMPORARIAMENTE DESATIVADA
        return { name: 'Admin (Sem Senha)', role: 'admin' };

        /* ORIGINAL CODE (Reativar Futuramente)
        const session = sessionStorage.getItem(SESSION_KEY);
        if (!session) {
            window.location.href = 'login.html';
            return null;
        }
        return JSON.parse(session);
        */
    },

    getUser: () => {
        const session = sessionStorage.getItem(SESSION_KEY);
        return session ? JSON.parse(session) : null;
    },

    // Permissões
    canEdit: () => {
        const user = Auth.getUser();
        return user && user.role === 'admin';
    }
};
