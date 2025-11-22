import requests
import json
import sys
from dotenv import load_dotenv
import random
import os
from flask import Flask, jsonify, request
from flask_cors import CORS

load_dotenv()

# Configuração da API
API_KEY = os.getenv('rapidapi-key')
API_HOST = os.getenv('rapidapi-host')

headers = {
    "x-rapidapi-key": API_KEY,
    "x-rapidapi-host": API_HOST
}

app = Flask(__name__)
CORS(app)  # Habilita CORS para requisições do frontend


def obter_tendencias_vagas(termo_busca):
    """
    Faz uma requisição para a API JSearch (RapidAPI)
    e retorna uma lista de dicionários padronizados.
    """
    url = "https://jsearch.p.rapidapi.com/search"

    querystring = {
        "query": termo_busca,
        "page": "1",
        "num_pages": "1"
    }

    try:
        response = requests.get(url, headers=headers, params=querystring)
        dados = response.json()

        lista_vagas = dados.get("data", [])
        vagas_formatadas = []

        for item in lista_vagas:
            vaga = {
                "titulo": item.get("job_title"),
                "empresa": item.get("employer_name"),
                "local": item.get("job_city"),
                "plataforma": item.get("job_publisher"),
                "modalidade": item.get("job_is_remote"),
                "salario": item.get("job_salary", "Não informado"),
                "tipo_carga_horaria": item.get("job_employment_type"),
                "beneficios": item.get("job_benefits", []),
                "descricao": item.get("job_description", "Descrição não disponível"),
                "crescimento": random.randint(1, 10),
                "link": item.get("job_apply_link"),
                "opcoes_aplicacao": item.get("apply_options", [])
            }

            vagas_formatadas.append(vaga)

        return vagas_formatadas

    except Exception as erro:
        return {"erro": str(erro)}


def filtrar_vagas(lista_vagas, termo_filtro):
    """
    Filtra vagas com base no termo fornecido pelo usuário.
    """
    vagas_filtradas = []
    termo = termo_filtro.lower()

    for vaga in lista_vagas:
        titulo = str(vaga["titulo"]).lower()
        empresa = str(vaga["empresa"]).lower()
        local = str(vaga["local"]).lower()

        if termo in titulo or termo in empresa or termo in local:
            vagas_filtradas.append(vaga)

    return vagas_filtradas


def calcular_crescimento_total(lista_vagas, indice=0):
    """
    Soma recursivamente a taxa de crescimento
    de todas as vagas da lista.
    """
    # Caso base
    if indice == len(lista_vagas):
        return 0

    crescimento_atual = lista_vagas[indice].get("crescimento", 0)

    # Caso recursivo
    return crescimento_atual + calcular_crescimento_total(lista_vagas, indice + 1)


@app.route('/api/vagas', methods=['GET'])
def api_vagas():
    """
    Endpoint para obter vagas com base em termo de busca.
    Query params:
    - termo_busca (obrigatório): termo para buscar vagas
    - termo_filtro (opcional): termo para filtrar vagas
    """
    termo_busca = request.args.get('termo_busca', '')
    termo_filtro = request.args.get('termo_filtro', '')

    if not termo_busca:
        return jsonify({"erro": "Termo de busca não fornecido"}), 400

    # 1. Buscar vagas
    vagas = obter_tendencias_vagas(termo_busca)

    # Se houve erro na API
    if isinstance(vagas, dict) and "erro" in vagas:
        return jsonify(vagas), 500

    # 2. Aplicar filtro, se houver
    if termo_filtro.strip() != "":
        vagas = filtrar_vagas(vagas, termo_filtro)

    # 3. Calcular crescimento total
    total_crescimento = calcular_crescimento_total(vagas)

    # 4. Retorno final em JSON
    resultado = {
        "total_vagas": len(vagas),
        "vagas": vagas,
        "crescimento_total": total_crescimento,
        "termo_busca": termo_busca,
        "termo_filtro": termo_filtro
    }

    return jsonify(resultado), 200


@app.route('/api/health', methods=['GET'])
def health_check():
    """
    Endpoint para verificar se a API está funcionando.
    """
    return jsonify({"status": "API está funcionando corretamente"}), 200


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
