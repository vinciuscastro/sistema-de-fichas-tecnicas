import os
import json
import re
import requests
from bs4 import BeautifulSoup
from constants import *
from automate import Automate

data_json = True
gerar_big_json = True

if not data_json:
    automate = Automate()

def formatter_car_name(frase, brand):
    try:
        frase = frase.replace("ë", "e")
        brand = brand.replace("-", " ")
        idx = frase.lower().index(brand.lower()) + len(brand)
        frase = frase[idx:].strip()
        return frase
    except Exception:
        return frase

def extract_table_data(tabela):
    chave_valor = {}
    for linha in tabela.find_all('tr'):
        colunas = linha.find_all('td')
        if len(colunas) == 2:
            chave = colunas[0].get_text(strip=True)
            valor = colunas[1].get_text(strip=True)
            chave_valor[chave] = valor
    return chave_valor

def analize_html(soup, brand, url, big_json=None):
    dados_json = {}

    div = soup.find('div', class_='article-full-image float-left')
    img_tag = div.find('img') if div else None
    if img_tag and 'src' in img_tag.attrs:
        dados_json["IMAGEM"] = URL_BASE + img_tag['src']

    for tabela in soup.find_all('table'):
        nome_tag = tabela.find('h1')
        if nome_tag:
            nome_carro = formatter_car_name(nome_tag.get_text(strip=True), brand)
            nome_carro = re.sub(r'\s+', '-', nome_carro).replace('/', '').lower()

            dados_json.update({
                "NOME": nome_carro,
                "ANO": nome_carro.split('-')[-1],
                "MARCA": brand,
                "MODELO": nome_carro.split('-')[0]
            })

            dados_json["ESPECIFICACAO"] = extract_table_data(tabela)
            if not dados_json["ESPECIFICACAO"]:
                return None

        for categoria in CAR_ITEMS:
            if categoria in tabela.text:
                dados_json[categoria] = extract_table_data(tabela)
                break

    if "IMAGEM" not in dados_json:
        return None

    os.makedirs(f"data/fichas/{brand}", exist_ok=True)
    with open(f"data/fichas/{brand}/{dados_json['NOME']}.json", "w", encoding="utf-8") as f:
        json.dump(dados_json, f, indent=4, ensure_ascii=False)

    if gerar_big_json and big_json is not None:
        big_json["modelos"][dados_json["NOME"]] = dados_json
        os.makedirs("data/bigs", exist_ok=True)
        with open(f"data/bigs/{brand}.json", "w", encoding="utf-8") as f:
            json.dump(big_json, f, indent=4, ensure_ascii=False)

    return dados_json

for brand in BRANDS:
    if os.path.exists(f"data/fichas/{brand}"):
        continue

    big_json = {"marca": brand, "modelos": {}} if gerar_big_json else None

    if not data_json:
        lista_urls = automate.get_urls_by_brand(brand)
        os.makedirs("data/urls", exist_ok=True)
        with open(f"data/urls/{brand}_urls.json", "w", encoding="utf-8") as f:
            json.dump(lista_urls, f, indent=4, ensure_ascii=False)
    else:
        with open(f"data/urls/{brand}_urls.json", "r", encoding="utf-8") as f:
            lista_urls = json.load(f)

    for url in lista_urls:
        try:
            response = requests.get(url, headers=HEADERS)
            if response.status_code == 200:
                soup = BeautifulSoup(response.content, 'html.parser')
                analize_html(soup, brand, url, big_json)
        except Exception as e:
            print(f"[Erro] URL: {url} - {e}")
