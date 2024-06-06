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
        time.sleep(2)
        log.info("Checking Quiz Access...")
        quizPage = navigation.quizLink()
        time.sleep(2)
        quizPage.getSubmitButton().click()
        assert (quizPage.getErrorMessage())