import time
from pageObjects.Navigation import Navigation
from utilities.BaseClass import BaseClass


class TestLike(BaseClass):

    def test_like(self, driver):
        log = self.getLogger()
        navigation = Navigation(driver)
        authPage = navigation.authLink()
        log.info("Setting User Credentials...")
        authPage.getEmail().send_keys("test@gmail.com")
        authPage.getPassword().send_keys("Temp#23")
        log.info("Authenticating...")
        articlesPage = authPage.submitAuth()
        log.info("Checking Like functionality...")
        likes = articlesPage.getLikeCounter().text
        log.info("Liking article...")
        articlesPage.getLikeButton().click()
        time.sleep(2)
        likes2 = articlesPage.getLikeCounter().text
        assert(likes != likes2)
        log.info("Unliking article...")
        articlesPage.getLikeButton().click()
        time.sleep(2)
        likes3 = articlesPage.getLikeCounter().text
        assert (likes == likes3)