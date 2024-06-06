import re
import time
from pageObjects.Navigation import Navigation
from utilities.BaseClass import BaseClass
from selenium.webdriver.common.by import By


class TestComments(BaseClass):

    def test_comments(self, driver):
        log = self.getLogger()
        navigation = Navigation(driver)
        articlesPage = navigation.articlesLink()
        log.info("Counting comments in article view...")
        commentsText = articlesPage.getCommentCounter().text
        comments = int(re.search(r'\d+', commentsText).group())
        log.info("Counting comments in details view...")
        detailsPage = articlesPage.articleDetails()
        time.sleep(2)
        commentsList = detailsPage.getCommentsList()
        comments2 = len(commentsList.find_elements(By.TAG_NAME, 'li'))
        log.info("Comparing counted comments...")
        assert (comments == comments2)