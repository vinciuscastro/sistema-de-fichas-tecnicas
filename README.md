# Fichás Técnicas

Projeto dividido em duas frentes: uma aplicação backend desenvolvida em Python, responsável por coletar e tratar dados técnicos de veículos por meio de web scraping, e uma aplicação frontend em React que exibe essas informações com recursos de busca e filtragem. O objetivo é fornecer uma base de dados rica e acessível sobre aproximadamente 10 mil carros, organizada em um sistema simples e navegável.

## Funcionalidades
- [x] Coleta automatizada de dados: uso de Selenium e Bs4 para raspagem de sites automotivos.
- [x]  Limpeza e estruturação: aplicação de técnicas de regex para padronização dos dados e armazenamento em formato JSON.
- [x]  Exibição por marca e modelo: dados organizados por fabricante, modelo e ano.
- [x] Filtros dinâmicos no frontend: busca por marca, modelo, ano e outras características técnicas.
- [x] Exibição de imagens dos veículos.
- [ ] Possibilidade de comparação entre modelos.
- [ ] Uso de API para obtenção de dados.

## Layout
O layout do aplicativo foi desenvolvido com base no Material Design, seguindo as diretrizes do Google. O design foi pensado para ser acessível e inclusivo, com uma paleta de cores contrastantes e fontes legíveis.

## Protótipo
O protótipo do aplicativo foi desenvolvido no Figma e pode ser acessado [aqui](https://www.figma.com/design/doDYkngAHltqjDwAO5ik72/Prot%C3%B3tipo-Final).

## Tecnologias
- **Backend**
  - Python
  - Selenium
  - Requests
  - BeautifulSoup
  - Regex

- **Frontend**
  - React

## Organização dos Dados

- data/urls/: contém arquivos JSON separados por marca (ex: chevrolet.json, fiat.json, etc.), cada um com a lista de URLs das fichas técnicas dos carros daquela marca. Essas URLs foram obtidas via web scraping com Selenium.

- data/bigs/: JSONs consolidados por marca, onde cada arquivo reúne todas as informações técnicas dos veículos daquela fabricante. Esses dados foram coletados com requests + BeautifulSoup, utilizando as URLs da pasta urls/.

