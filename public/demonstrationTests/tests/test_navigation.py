import time

from pageObjects.Navigation import Navigation
from utilities.BaseClass import BaseClass


class TestNavigation(BaseClass):

    def test_navigation(self, driver):
        log = self.getLogger()
        navigation = Navigation(driver)
        time.sleep(2)
        navigation.authLink()
        log.info("Checking authentication link...")
        time.sleep(2)
        navigation.articlesLink()
        log.info("Checking articles link...")
        time.sleep(2)