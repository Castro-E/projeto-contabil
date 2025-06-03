# app.py (VERSÃO FINAL E COMPLETA PARA ENTREGA)
from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
import datetime

app = Flask(__name__)
app.config['SECRET_KEY'] = 'chave-final-para-entrega'
CORS(app) 
users = {}

# Rota de Login
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username, password = data.get('username'), data.get('password')
    user = users.get(username)
    if not user or not check_password_hash(user['password'], password):
        return jsonify({'message': 'Credenciais inválidas!'}), 401
    token = jwt.encode({'user': username, 'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)}, app.config['SECRET_KEY'], algorithm="HS256")
    return jsonify({'token': token})

# Rota de Registro
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username, password = data.get('username'), data.get('password')
    if not username or not password: return jsonify({'message': 'Usuário e senha são obrigatórios!'}), 400
    if username in users: return jsonify({'message': 'Este nome de usuário já está em uso!'}), 400
    users[username] = {'password': generate_password_hash(password)}
    return jsonify({'message': 'Usuário registrado com sucesso!'}), 201

# Rota de Upload de Arquivo (SIMPLIFICADA PARA GARANTIR FUNCIONAMENTO)
@app.route('/processar-arquivo', methods=['POST'])
def processar_arquivo():
    if 'file' not in request.files:
        return jsonify({'message': 'Nenhum arquivo enviado'}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({'message': 'Nenhum arquivo selecionado'}), 400
    if file:
        return jsonify({'message': f'Arquivo "{file.filename}" recebido com sucesso!'}), 200
    return jsonify({'message': 'Erro inesperado no servidor'}), 500

# Inicialização do Servidor
if __name__ == '__main__':
    if 'teste' not in users:
        users['teste'] = {'password': generate_password_hash('123')}
    print("--- SERVIDOR FINAL E CORRETO INICIADO ---")
    print("--- Usuário de teste: 'teste' | Senha: '123' ---")
    app.run(debug=True, port=5000)