# Projeto Aplicado Multiplataforma: Automação AC Fiscal

Projeto desenvolvido para a disciplina de Projeto Aplicado Multiplataforma da Universidade de Fortaleza (UNIFOR).

## Equipe

* Inácio de Oliveira Menezes – 2318205 [cite: 19]
* Miguel Ângelo Russo Neto - 2315291 [cite: 19]
* Maurício Viana de Freitas – 2314676 [cite: 19]
* Esthefan de Castro Souza - 2318048 [cite: 19]

## 1. Problema

O projeto aborda dois desafios críticos enfrentados pelo setor contábil:
* A conferência manual e de alto custo de Notas Fiscais Eletrônicas (NFEs) junto a órgãos como a SEFAZ[cite: 21, 22].
* A falta de integração automática dos valores desses documentos com os sistemas contábeis, o que afeta a precisão de balanços e DREs[cite: 23, 24].

## 2. Objetivo da Solução

Automatizar o processo de conferência e integração de NFEs para aumentar a segurança, minimizar erros e reduzir a sobrecarga operacional das equipes de contabilidade[cite: 25]. A solução foi projetada como um sistema de microserviços[cite: 26].

## 3. Público-Alvo

* Empresas e escritórios de contabilidade que buscam automatizar seus processos[cite: 29].
* O projeto foi validado em apresentações para o **Escritório de Contabilidade PHP** e para o setor de **Controladoria e Contabilidade do Fortaleza Esporte Clube**[cite: 30, 31]. (Isso é muito importante, mostra que vocês cumpriram a etapa de apresentação!)

## 4. Tecnologias Utilizadas

* **Backend:** Python, Flask [cite: 52]
* **Automação:** PyAutoGUI [cite: 52]
* **Manipulação de Dados:** Pandas, Openpyxl [cite: 52]
* **Entrada de Dados:** API do Google Sheets [cite: 52]
* **Banco de Dados:** MySQL [cite: 52]
* **Testes de API:** Postman [cite: 11]

## 5. Como Executar o Projeto

**(Mesmo que não esteja 100% funcional, descreva como DEVERIA ser executado. Isso mostra que você sabe o que fazer.)**

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/Castro-E/projeto-contabil.git](https://github.com/Castro-E/projeto-contabil.git)
    cd projeto-contabil
    ```
2.  **Crie um ambiente virtual (recomendado):**
    ```bash
    python -m venv venv
    source venv/bin/activate  # No Windows: venv\Scripts\activate
    ```
3.  **Instale as dependências:**
    (CRIE ESTE ARQUIVO AGORA! No seu terminal, na pasta do projeto, rode `pip freeze > requirements.txt`)
    ```bash
    pip install -r requirements.txt
    ```
4.  **Configure o Banco de Dados:**
    * Descreva aqui os passos para criar o banco de dados MySQL e as tabelas (vocês têm o diagrama no documento da Etapa 1)[cite: 53].

5.  **Inicie o servidor backend:**
    ```bash
    python nome_do_arquivo_principal.py
    ```

## 6. Como Testar

A API pode ser testada utilizando o **Postman**[cite: 11].
* **Endpoint de Exemplo:** `POST /api/processar_nfe`
* **Body (Exemplo):** `{ "url_google_sheet": "https://docs.google.com/spreadsheets/d/..." }`