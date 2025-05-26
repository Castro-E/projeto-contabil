// VERSÃO DE TESTE DO SCRIPT - NÃO PRECISA DO BACK-END

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('loginForm')) {
        handleLoginPage_TEST();
    }
    if (document.getElementById('uploadForm')) {
        handleDashboardPage_TEST();
    }
});

// SIMULAÇÃO DA PÁGINA DE LOGIN
function handleLoginPage_TEST() {
    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Impede o recarregamento da página

        const messageDiv = document.getElementById('loginMessage');
        
        // --- SIMULAÇÃO ---
        // Fingimos que o login deu certo
        messageDiv.innerHTML = `<div class="alert alert-success">Login simulado com sucesso! Redirecionando...</div>`;
        localStorage.setItem('accessToken', 'token_de_teste_falso'); // Salva um token falso
        
        // Espera 1 segundo e redireciona para o dashboard
        setTimeout(() => { window.location.href = 'dashboard.html'; }, 1000); 
    });
}

// SIMULAÇÃO DA PÁGINA DO DASHBOARD
function handleDashboardPage_TEST() {
    const token = localStorage.getItem('accessToken');
    if (!token) {
        // Se não houver token (mesmo o falso), expulsa o usuário
        window.location.href = 'index.html';
        return;
    }

    const uploadForm = document.getElementById('uploadForm');
    const messageDiv = document.getElementById('uploadMessage');
    const logoutButton = document.getElementById('logoutButton');

    uploadForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const fileInput = document.getElementById('fileInput');

        if (fileInput.files.length === 0) {
            messageDiv.innerHTML = `<div class="alert alert-warning">Por favor, selecione um arquivo.</div>`;
            return;
        }

        // --- SIMULAÇÃO ---
        // Fingimos que o upload deu certo
        messageDiv.innerHTML = `<div class="alert alert-info">Enviando arquivo (simulação)...</div>`;
        setTimeout(() => {
            messageDiv.innerHTML = `<div class="alert alert-success">Arquivo processado com sucesso! (simulação)</div>`;
        }, 1500); // Espera 1.5 segundos para mostrar a mensagem final
    });

    logoutButton.addEventListener('click', () => {
        localStorage.removeItem('accessToken');
        window.location.href = 'index.html';
    });
}