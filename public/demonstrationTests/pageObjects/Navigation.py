from selenium.webdriver.common.by import By
from pageObjects.ArticlesPage import ArticlesPage
from pageObjects.AuthPage import AuthPage
# from pageObjects.TestsPage import TestsPage
from pageObjects.QuizPage import QuizPage

class Navigation:
    def __init__(self, driver):
        self.driver = driver

    ArticlesLink = (By.XPATH, "//a[contains(text(),'Artykuły')]")
    QuizLink = (By.XPATH, "//a[normalize-space()='Quiz']")
    TestsLink = (By.XPATH, "//a[normalize-space()='Testy']")
    CreateArticleLink = (By.XPATH, "//a[contains(text(),'Utwórz Artykuł')]")
    CreateQuestionLink = (By.XPATH, "//a[normalize-space()='Utwórz Pytania do Quizu']")
    AuthLink = (By.XPATH, "//a[contains(text(),'Zaloguj się')]")
    LogOutLink = (By.XPATH, "//p[contains(text(),'Wyloguj się')]")
    DarkModeButton = (By.XPATH, "//p[normalize-space()='Dark Mode']")
    UserName = (By.XPATH, "/html[1]/body[1]/div[1]/section[1]/header[1]/nav[1]/p[1]")

    def articlesLink(self):
        self.driver.find_element(*Navigation.ArticlesLink).click()
        articlesPage = ArticlesPage(self.driver)
        return articlesPage

    def quizLink(self):
        self.driver.find_element(*Navigation.QuizLink).click()
        quizPage = QuizPage(self.driver)
        return quizPage

    # def testsLink(self):
    #     self.driver.find_element(*Navigation.TestsLink).click()
    #     testsPage = TestsPage(self.driver)
    #     return testsPage

    # def createArticleLink(self):
    #     self.driver.find_element(*Navigation.CreateArticleLink).click()
    #     createArticlePage = CreateArticlePage(self.driver)
    #     return createArticlePage
    #
    # def createQuestionLink(self):
    #     self.driver.find_element(*Navigation.CreateQuestionLink).click()
    #     createQuizPage = CreateQuizPage(self.driver)
    #     return createQuizPage

    def authLink(self):
        self.driver.find_element(*Navigation.AuthLink).click()
        authPage = AuthPage(self.driver)
        return authPage

    def logOutLink(self):
        self.driver.find_element(*Navigation.LogOutLink).click()
        articlesPage = ArticlesPage(self.driver)
        return articlesPage

    def changeDarkMode(self):
        return self.driver.find_element(*Navigation.DarkModeButton).click()

    def getUserName(self):
        return self.driver.find_element(*Navigation.UserName)

