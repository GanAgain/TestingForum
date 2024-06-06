import time
from selenium.webdriver.common.by import By
from pageObjects.Navigation import Navigation
from utilities.BaseClass import BaseClass


class TestDarkMode(BaseClass):

    def test_darkmode(self, driver):
        log = self.getLogger()
        navigation = Navigation(driver)
        time.sleep(2)
        background = driver.find_element(By.CSS_SELECTOR, '.document')
        background_color = background.value_of_css_property('background-color')
        log.info("switching on darkmode...")
        navigation.changeDarkMode()
        time.sleep(3)
        background_color2 = background.value_of_css_property('background-color')
        assert (background_color2 != background_color)
        log.info("switching off darkmode...")
        navigation.changeDarkMode()
        time.sleep(3)
        background_color3 = background.value_of_css_property('background-color')
        assert (background_color2 != background_color3 and background_color == background_color3)