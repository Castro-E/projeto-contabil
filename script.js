// script.js

// ... (o resto do seu script.js continua igual aqui em cima) ...

function handleDashboardPage() {
    const token = localStorage.getItem('accessToken');
    if (!token) {
        window.location.href = 'index.html';
        return;
    }

    const uploadForm = document.getElementById('uploadForm');
    const messageDiv = document.getElementById('messageDiv');
    const logoutButton = document.getElementById('logoutButton');
    // Pega uma referência ao botão de submit para podermos desativá-lo
    const submitButton = uploadForm.querySelector('button[type="submit"]');

    logoutButton.addEventListener('click', () => {
        localStorage.removeItem('accessToken');
        window.location.href = 'index.html';
    });

    uploadForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        // --- MELHORIA DE UX COMEÇA AQUI ---
        // 1. Desabilita o botão e muda o texto para dar feedback ao usuário
        submitButton.disabled = true;
        submitButton.innerHTML = 'Enviando...';
        // Limpa mensagens antigas
        messageDiv.innerHTML = '';

        const fileInput = document.getElementById('fileInput');
        if (fileInput.files.length === 0) {
            messageDiv.innerHTML = `<div class="alert alert-warning">Por favor, selecione um arquivo.</div>`;
            submitButton.disabled = false; // Reabilita o botão se não houver arquivo
            submitButton.innerHTML = 'Enviar';
            return;
        }

        const formData = new FormData();
        formData.append('file', fileInput.files[0]);

        try {
            const response = await fetch(`${API_URL}/processar-arquivo`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` },
                body: formData
            });
            
            const data = await response.json();
            if (!response.ok) throw new Error(data.message);
            
            // Exibe a mensagem de sucesso que veio do backend
            messageDiv.innerHTML = `<div class="alert alert-success">${data.message}</div>`;
            
            // 2. Limpa o formulário, incluindo o campo do arquivo
            uploadForm.reset(); 

            // 3. Faz a mensagem de sucesso desaparecer após 5 segundos
            setTimeout(() => {
                messageDiv.innerHTML = '';
            }, 5000);

        } catch (error) {
            messageDiv.innerHTML = `<div class="alert alert-danger">${error.message}</div>`;
        } finally {
            // 4. SEMPRE reabilita o botão no final, seja em caso de sucesso ou erro
            submitButton.disabled = false;
            submitButton.innerHTML = 'Enviar';
        }
    });
}