# app.py (VERSÃO DE EMERGÊNCIA - GARANTIDA)
from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
import datetime
from functools import wraps

app = Flask(__name__)
app.config['SECRET_KEY'] = 'uma-chave-qualquer-so-para-funcionar'
CORS(app) 
users = {}

@app.route('/')
def index():
    return jsonify({'status': 'O servidor backend está online e funcionando!'})

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username, password = data.get('username'), data.get('password')
    if not username or not password: return jsonify({'message': 'Usuário e senha são obrigatórios!'}), 400
    if username in users: return jsonify({'message': 'Este nome de usuário já está em uso!'}), 400
    users[username] = {'password': generate_password_hash(password, method='pbkdf2:sha256')}
    return jsonify({'message': 'Usuário registrado com sucesso!'}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username, password = data.get('username'), data.get('password')
    user = users.get(username)
    if not user or not check_password_hash(user['password'], password):
        return jsonify({'message': 'Credenciais inválidas!'}), 401
    token = jwt.encode({'user': username, 'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)}, app.config['SECRET_KEY'], algorithm="HS256")
    return jsonify({'token': token})

if __name__ == '__main__':
    if 'teste' not in users:
        users['teste'] = {'password': generate_password_hash('123', method='pbkdf2:sha256')}
    print("--- SERVIDOR DE EMERGÊNCIA INICIADO ---")
    print("--- Usuário: 'teste', Senha: '123' ---")
    print("--- ACESSE O ARQUIVO index.html NO NAVEGADOR, NÃO O IP DO SERVIDOR ---")
    app.run(debug=True, port=5000)