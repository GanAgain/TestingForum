from selenium.webdriver.common.by import By
from pageObjects.ArticlesPage import ArticlesPage

class AuthPage:
    def __init__(self, driver):
        self.driver = driver

    emailInput = (By.XPATH, "//input[@id='email']")
    passwordInput = (By.XPATH, "//input[@id='password']")
    # authSubmitButton = (By.XPATH, "//button[@class='bg-project-green font-bold cursor-pointer text-white border-none rounded-full px-4 py-2 ml-auto mb-4 flex mt-4']")
    authSubmitButton = (By.XPATH, "//button[1]")
    authChangeButton = (By.XPATH, "//button[@type='button']")

    def getEmail(self):
        return self.driver.find_element(*AuthPage.emailInput)

    def getPassword(self):
        return self.driver.find_element(*AuthPage.passwordInput)

    def getChangeAuth(self):
        return self.driver.find_element(*AuthPage.authChangeButton)

    def submitAuth(self):
        self.driver.find_element(*AuthPage.authSubmitButton).click()
        articlesPage = ArticlesPage(self.driver)
        return articlesPage

