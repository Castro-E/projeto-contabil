# Projeto Aplicado Multiplataforma: Automação Contábil

![Status](https://img.shields.io/badge/status-funcional-brightgreen)

Projeto desenvolvido para a disciplina de Projeto Aplicado Multiplataforma do curso de Análise e Desenvolvimento de Sistemas da Universidade de Fortaleza (UNIFOR). O objetivo é automatizar processos de contabilidade para aumentar a eficiência e reduzir erros manuais.

## 📝 Equipe

* **Inácio de Oliveira Menezes** – 2318205
* **Miguel Ângelo Russo Neto** - 2315291
* **Maurício Viana de Freitas** – 2314676
* **Esthefan de Castro Souza** - 2318048

## 🎯 Objetivo do Projeto

A solução visa automatizar a conferência de Notas Fiscais Eletrônicas (NFEs) e sua integração com sistemas contábeis[cite: 20, 23]. O processo, antes manual, é otimizado através de uma aplicação web que processa os dados e se integra com o sistema Fortes AC, minimizando erros e sobrecarga operacional[cite: 22, 25].

## ✨ Funcionalidades

* **API Backend Segura:** Desenvolvida em Python com Flask, servindo endpoints para as operações da aplicação[cite: 1, 52].
* **Autenticação por Token:** Sistema de login que gera tokens JWT para garantir que apenas usuários autorizados acessem rotas protegidas[cite: 2].
* **Segurança de Senhas:** As senhas dos usuários são armazenadas de forma segura utilizando hashing (pbkdf2:sha256)[cite: 54].
* **Frontend Responsivo:** Interface de usuário desenvolvida com HTML, CSS e JavaScript, utilizando Bootstrap para garantir a compatibilidade com diferentes tamanhos de tela[cite: 6, 11].
* **Cadastro de Usuários:** Permite que novos usuários criem contas no sistema.
* **Upload de Arquivos:** Funcionalidade para que usuários logados enviem arquivos (`.xlsx`, `.csv`) para processamento no backend[cite: 7].

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Propósito |
| :--- | :--- |
| **Python** | Linguagem principal do backend [cite: 52] |
| **Flask** | Framework para a construção da API [cite: 52] |
| **Flask-CORS** | Permite a comunicação segura entre frontend e backend |
| **PyJWT** | Geração e validação de tokens de autenticação [cite: 2] |
| **Werkzeug** | Hashing de senhas para armazenamento seguro [cite: 54] |
| **HTML5 / CSS3**| Estrutura e estilo do frontend |
| **JavaScript** | Lógica e interatividade do lado do cliente (navegador) |
| **Bootstrap** | Framework CSS para responsividade [cite: 11] |
| **Git & GitHub** | Controle de versão e hospedagem do código [cite: 13] |

## 🚀 Como Executar o Projeto

Para garantir que o frontend e o backend se comuniquem corretamente, a aplicação deve ser executada com **dois servidores locais simultaneamente**. Siga os passos abaixo.

### Pré-requisitos
* [Python 3](https://www.python.org/downloads/) instalado.
* [Git](https://git-scm.com/downloads/) instalado.

### 1. Clonar o Repositório
```bash
git clone [https://github.com/Castro-E/projeto-contabil.git](https://github.com/Castro-E/projeto-contabil.git)
cd projeto-contabil