// Adiciona um 'escutador' para saber em qual página estamos
document.addEventListener('DOMContentLoaded', () => {
    // Se estamos na página de login
    if (document.getElementById('loginForm')) {
        handleLoginPage();
    }
    // Se estamos na página do dashboard
    if (document.getElementById('uploadForm')) {
        handleDashboardPage();
    }
});

// Lógica da PÁGINA DE LOGIN
function handleLoginPage() {
    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Impede o recarregamento da página

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const messageDiv = document.getElementById('loginMessage');

        try {
            // Tenta fazer a requisição para o back-end de autenticação
            const response = await fetch('http://127.0.0.1:5001/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();

            if (response.ok) {
                // Se o login deu certo
                messageDiv.innerHTML = `<div class="alert alert-success">Login bem-sucedido! Redirecionando...</div>`;
                localStorage.setItem('accessToken', data.access_token); // Salva o token
                setTimeout(() => { window.location.href = 'dashboard.html'; }, 1000); // Redireciona
            } else {
                // Se o login deu errado
                messageDiv.innerHTML = `<div class="alert alert-danger">${data.msg}</div>`;
            }
        } catch (error) {
            messageDiv.innerHTML = `<div class="alert alert-danger">Erro de conexão com o servidor.</div>`;
        }
    });
}

// Lógica da PÁGINA DO DASHBOARD
function handleDashboardPage() {
    const token = localStorage.getItem('accessToken');
    // Se não houver token, expulsa o usuário para a página de login
    if (!token) {
        window.location.href = 'index.html';
        return;
    }

    const uploadForm = document.getElementById('uploadForm');
    const messageDiv = document.getElementById('uploadMessage');
    const logoutButton = document.getElementById('logoutButton');

    uploadForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const fileInput = document.getElementById('fileInput');

        if (fileInput.files.length === 0) {
            messageDiv.innerHTML = `<div class="alert alert-warning">Por favor, selecione um arquivo.</div>`;
            return;
        }

        const formData = new FormData();
        formData.append('file', fileInput.files[0]);

        messageDiv.innerHTML = `<div class="alert alert-info">Enviando arquivo...</div>`;

        try {
            // Tenta fazer a requisição para o back-end de upload
            const response = await fetch('http://127.0.0.1:5002/upload', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}` // Envia o token de autorização
                },
                body: formData
            });

            const data = await response.json();

            if (response.ok) {
                messageDiv.innerHTML = `<div class="alert alert-success">${data.msg}</div>`;
            } else {
                messageDiv.innerHTML = `<div class="alert alert-danger">${data.msg || 'Erro no envio.'}</div>`;
            }
        } catch (error) {
            messageDiv.innerHTML = `<div class="alert alert-danger">Erro de conexão com o servidor.</div>`;
        }
    });

    // Lógica do botão de Sair
    logoutButton.addEventListener('click', () => {
        localStorage.removeItem('accessToken'); // Remove o token
        window.location.href = 'index.html'; // Volta para o login
    });
}