import time
from pageObjects.Navigation import Navigation
from utilities.BaseClass import BaseClass


class TestAuth(BaseClass):

    def test_auth(self, driver):
        log = self.getLogger()
        navigation = Navigation(driver)
        authPage = navigation.authLink()
        log.info("Setting User Credentials...")
        authPage.getEmail().send_keys("test@gmail.com")
        authPage.getPassword().send_keys("Temp#23")
        log.info("Authenticating...")
        authPage.submitAuth()
        log.info("Checking Quiz Access...")
        navigation.quizLink()
        log.info("Checking UserName Display...")
        assert (navigation.getUserName())
        log.info("Logging-out...")
        navigation.logOutLink()
        navigation.authLink()