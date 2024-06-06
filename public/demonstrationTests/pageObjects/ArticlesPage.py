from selenium.webdriver.common.by import By
from pageObjects.DetailsPage import DetailsPage
class ArticlesPage:
    def __init__(self, driver):
        self.driver = driver

    articlesList = (By.XPATH, "/html[1]/body[1]/div[1]/section[1]/div[1]/section[1]/section[1]/ul[1]")
    articlesFirstItem = (By.XPATH, "(//div[@id='article'])[1]")
    articleTitle = (By.XPATH, "(//div[@id='top'])[1]//h2")
    likeButton = (By.XPATH, "(//i)[1]")
    likeCounter = (By.XPATH, "(//div[@id='options'])[1]/div/p")
    commentCounter = (By.XPATH, "/html[1]/body[1]/div[1]/section[1]/div[1]/section[1]/section[1]/ul[1]/li[1]/div[3]/p[1]")
    creatorInfo = (By.XPATH, "(//div[@id='info'])[1]//p[2]")
    readMoreLink = (By.XPATH, "//li[1]//div[3]//a[1]")

    def getArticlesList(self):
        return self.driver.find_element(*ArticlesPage.articlesList)

    def getArticlesFirstItem(self):
        return self.driver.find_element(*ArticlesPage.articlesFirstItem)

    def getArticleTitle(self):
        return self.driver.find_element(*ArticlesPage.articleTitle)

    def getLikeButton(self):
        return self.driver.find_element(*ArticlesPage.likeButton)

    def getLikeCounter(self):
        return self.driver.find_element(*ArticlesPage.likeCounter)

    def getCommentCounter(self):
        return self.driver.find_element(*ArticlesPage.commentCounter)

    def getCreatorInfo(self):
        return self.driver.find_element(*ArticlesPage.creatorInfo)

    def articleDetails(self):
        self.driver.find_element(*ArticlesPage.readMoreLink).click()
        detailsPage = DetailsPage(self.driver)
        return detailsPage

