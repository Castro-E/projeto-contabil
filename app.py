# app.py (VERSÃO FINAL E COMPLETA)
from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
import datetime
from functools import wraps

# --- Configuração Inicial ---
app = Flask(__name__)
app.config['SECRET_KEY'] = 'minha-chave-secreta-para-o-projeto-final'
CORS(app) 

# --- "Banco de Dados" em Memória ---
users = {}

# --- Decorador de Autenticação (O "Segurança" da API) ---
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        # Verifica se o token foi enviado no cabeçalho da requisição
        if 'Authorization' in request.headers:
            token = request.headers['Authorization'].split(" ")[1] # Pega o token depois de "Bearer "
        
        if not token:
            return jsonify({'message': 'Token está faltando!'}), 401
        
        try:
            # Decodifica o token para garantir que é válido
            data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
            current_user = users.get(data['user'])
        except:
            return jsonify({'message': 'Token é inválido ou expirado!'}), 401
        
        return f(current_user, *args, **kwargs)
    return decorated

# --- Rota de Registro (Pública) ---
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username, password = data.get('username'), data.get('password')
    if not username or not password: return jsonify({'message': 'Usuário e senha são obrigatórios!'}), 400
    if username in users: return jsonify({'message': 'Este nome de usuário já está em uso!'}), 400
    
    users[username] = {'password': generate_password_hash(password, method='pbkdf2:sha256')}
    return jsonify({'message': 'Usuário registrado com sucesso!'}), 201

# --- Rota de Login (Pública) ---
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username, password = data.get('username'), data.get('password')

    user = users.get(username)
    if not user or not check_password_hash(user['password'], password):
        return jsonify({'message': 'Credenciais inválidas!'}), 401

    token = jwt.encode({
        'user': username,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)
    }, app.config['SECRET_KEY'], algorithm="HS256")
    return jsonify({'token': token})

# --- Rota de Upload de Arquivo (PROTEGIDA) ---
@app.route('/processar-arquivo', methods=['POST'])
@token_required # <-- APLICA O "SEGURANÇA" AQUI
def processar_arquivo(current_user): # Recebe o usuário validado pelo token
    # 1. Verifica se um arquivo foi enviado na requisição
    if 'file' not in request.files:
        return jsonify({'message': 'Nenhum arquivo enviado'}), 400
    
    file = request.files['file']
    
    # 2. Verifica se o nome do arquivo não está vazio
    if file.filename == '':
        return jsonify({'message': 'Nenhum arquivo selecionado'}), 400
    
    # 3. Se deu tudo certo, retorna uma mensagem de sucesso COM O NOME DO ARQUIVO
    if file:
        print(f'Usuário "{current_user}" enviou o arquivo "{file.filename}"') # Log no terminal
        # AQUI entraria a lógica de automação com Pandas e PyAutoGUI
        return jsonify({'message': f'Arquivo "{file.filename}" recebido com sucesso!'}), 200

    return jsonify({'message': 'Erro inesperado no upload'}), 500

if __name__ == '__main__':
    if 'teste' not in users:
        users['teste'] = {'password': generate_password_hash('123', method='pbkdf2:sha256')}
        print("--- Servidor Iniciado ---")
        print("Usuário de teste criado -> usuário: 'teste', senha: '123'")
    app.run(debug=True, port=5000)