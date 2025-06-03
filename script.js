// script.js (VERSÃO FINAL E COMPLETA - CORRIGIDA)

const API_URL = 'http://127.0.0.1:5000';

// Este trecho decide qual função rodar, dependendo da página
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

// FUNÇÃO DE LOGIN (ESTAVA FALTANDO)
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
            
            localStorage.setItem('accessToken', data.token);
            window.location.href = 'dashboard.html';

        } catch (error) {
            messageDiv.innerHTML = `<div class="alert alert-danger">${error.message}</div>`;
        }
    });
}

// FUNÇÃO DE REGISTRO (ESTAVA FALTANDO)
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

            messageDiv.innerHTML = `<div class="alert alert-success">${data.message} Redirecionando para o login...</div>`;
            setTimeout(() => { window.location.href = 'index.html'; }, 2000);

        } catch (error) {
            messageDiv.innerHTML = `<div class="alert alert-danger">${error.message}</div>`;
        }
    });
}

// FUNÇÃO DO DASHBOARD (A ÚNICA QUE VOCÊ TINHA)
function handleDashboardPage() {
    const token = localStorage.getItem('accessToken');
    if (!token) {
        window.location.href = 'index.html';
        return;
    }

    const uploadForm = document.getElementById('uploadForm');
    const messageDiv = document.getElementById('messageDiv');
    const logoutButton = document.getElementById('logoutButton');
    const submitButton = uploadForm.querySelector('button[type="submit"]');

    logoutButton.addEventListener('click', () => {
        localStorage.removeItem('accessToken');
        window.location.href = 'index.html';
    });

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
            // A rota de upload no app.py não precisa mais de token na versão de emergência
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