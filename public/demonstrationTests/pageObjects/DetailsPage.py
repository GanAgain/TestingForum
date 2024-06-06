from selenium.webdriver.common.by import By
class DetailsPage:
    def __init__(self, driver):
        self.driver = driver

    articleTitle = (By.XPATH, "//div[@id='content']//section//div//h2")
    content = (By.XPATH, "//p[@id='articleContent']")
    commentsList = (By.XPATH, "(//ul)[2]")


    def getContent(self):
        return self.driver.find_element(*DetailsPage.content)

    def getCommentsList(self):
        return self.driver.find_element(*DetailsPage.commentsList)

    def getArticleTitle(self):
        return self.driver.find_element(*DetailsPage.articleTitle)
