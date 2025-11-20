import requests
import json
import sys
from dotenv import load_dotenv
import random
import os

load_dotenv()

API_KEY = os.getenv('rapidapi-key')
API_HOST = os.getenv('rapidapi-host')

headers = {
    "x-rapidapi-key": API_KEY,
    "x-rapidapi-host": API_HOST
}


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
                "beneficios": item.get("job_benefits"),
                "crescimento": random.randint(1, 10)
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


def main():
    # Recebe argumentos da linha de comando
    if len(sys.argv) < 2:
        print(json.dumps({"erro": "Termo de busca não fornecido"}))
        return

    termo_busca = sys.argv[1]
    termo_filtro = sys.argv[2] if len(sys.argv) > 2 else ""

    # Busca as vagas
    vagas = obter_tendencias_vagas(termo_busca)

    # Se houve erro, retorna
    if isinstance(vagas, dict) and "erro" in vagas:
        print(json.dumps(vagas))
        return

    # Filtra se necessário
    if termo_filtro.strip() != "":
        vagas = filtrar_vagas(vagas, termo_filtro)

    # Calcula crescimento total
    total_crescimento = calcular_crescimento_total(vagas)

    # Retorna resultado em JSON
    resultado = {
        "total_vagas": len(vagas),
        "vagas": vagas,
        "crescimento_total": total_crescimento,
        "termo_busca": termo_busca,
        "termo_filtro": termo_filtro
    }

    print(json.dumps(resultado))


if __name__ == '__main__':
    main()