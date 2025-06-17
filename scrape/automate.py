from selenium.webdriver.common.by import By
from time import sleep
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from bs4 import BeautifulSoup


class Automate:
    def __init__(self):
        options = webdriver.ChromeOptions()
        #options.add_argument('--headless')  # Roda sem abrir janela
        options.add_argument('--disable-gpu')
        self.driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)
        self.url = 'https://heycar.com.br/component/tags/tag/'
    

    def get_urls_by_brand(self, marca):
        self.driver.get(self.url + marca)
        sleep(1)
        self.driver.find_element(By.XPATH, '//*[@id="adminForm"]/fieldset/div[2]').click()
        sleep(1)
        self.driver.find_element(By.XPATH, '//*[@id="limit"]/option[9]').click()
        sleep(1)
        html = self.driver.page_source
        return self.get_url_list(html=html)    

    def get_url_list(self, html):
        soup = BeautifulSoup(html, 'html.parser')
        tabela = soup.find('table', class_='category table table-striped table-bordered table-hover')
        lista_urls = []

        if tabela:
            linhas = tabela.find_all('tr')
            for linha in linhas:
                a = linha.find('a')
                if a and a.get('href'):
                    href = a.get('href')
                    if 'ficha-tecnica' in href:  
                        lista_urls.append(f"https://heycar.com.br{href}")
        return lista_urls

