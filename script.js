// script.js (VERSÃO FINAL E COMPLETA PARA ENTREGA)

const API_URL = 'http://127.0.0.1:5000';

// --- CONTROLE PRINCIPAL ---
// Este trecho decide qual função rodar, dependendo da página que o usuário abriu.
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('loginForm')) {
        handleLoginPage();
    }
    if (document.getElementById('registerForm')) {
        handleRegisterPage();
    }
    if (document.getElementById('uploadForm')) {
        handleDashboardPage();
    }
});

// --- PÁGINA DE LOGIN ---
function handleLoginPage() {
    const loginForm = document.getElementById('loginForm');
    const messageDiv = document.getElementById('messageDiv');

    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message);
            
            // Se o login der certo, salva o token e vai para o dashboard
            localStorage.setItem('accessToken', data.token);
            window.location.href = 'dashboard.html';

        } catch (error) {
            messageDiv.innerHTML = `<div class="alert alert-danger">${error.message}</div>`;
        }
    });
}

// --- PÁGINA DE REGISTRO ---
function handleRegisterPage() {
    const registerForm = document.getElementById('registerForm');
    const messageDiv = document.getElementById('messageDiv');

    registerForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch(`${API_URL}/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message);

            // Se o cadastro der certo, avisa e manda para a página de login
            messageDiv.innerHTML = `<div class="alert alert-success">${data.message} Redirecionando para o login...</div>`;
            setTimeout(() => { window.location.href = 'index.html'; }, 2000);

        } catch (error) {
            messageDiv.innerHTML = `<div class="alert alert-danger">${error.message}</div>`;
        }
    });
}

// --- PÁGINA DO DASHBOARD ---
function handleDashboardPage() {
    // Se não tiver token, expulsa o usuário da página
    const token = localStorage.getItem('accessToken');
    if (!token) {
        window.location.href = 'index.html';
        return;
    }

    const uploadForm = document.getElementById('uploadForm');
    const messageDiv = document.getElementById('messageDiv');
    const logoutButton = document.getElementById('logoutButton');
    const submitButton = uploadForm.querySelector('button[type="submit"]');

    // Lógica do botão de sair
    logoutButton.addEventListener('click', () => {
        localStorage.removeItem('accessToken');
        window.location.href = 'index.html';
    });

    // Lógica do formulário de upload
    uploadForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        submitButton.disabled = true;
        submitButton.innerHTML = 'Enviando...';
        messageDiv.innerHTML = '';

        const fileInput = document.getElementById('fileInput');
        if (fileInput.files.length === 0) {
            messageDiv.innerHTML = `<div class="alert alert-warning">Por favor, selecione um arquivo.</div>`;
            submitButton.disabled = false;
            submitButton.innerHTML = 'Enviar';
            return;
        }

        const formData = new FormData();
        formData.append('file', fileInput.files[0]);

        try {
            const response = await fetch(`${API_URL}/processar-arquivo`, {
                method: 'POST',
                body: formData
            });
            
            const data = await response.json();
            if (!response.ok) throw new Error(data.message);
            
            messageDiv.innerHTML = `<div class="alert alert-success">${data.message}</div>`;
            uploadForm.reset(); 
            setTimeout(() => { messageDiv.innerHTML = ''; }, 5000);

        } catch (error) {
            messageDiv.innerHTML = `<div class="alert alert-danger">${error.message}</div>`;
        } finally {
            submitButton.disabled = false;
            submitButton.innerHTML = 'Enviar';
        }
    });
}