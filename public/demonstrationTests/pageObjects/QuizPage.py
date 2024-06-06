from selenium.webdriver.common.by import By
class QuizPage:
    def __init__(self, driver):
        self.driver = driver

    questionsList = (By.XPATH, "//form//ul")
    submitButton = (By.XPATH, "//button")
    errorMessage = (By.XPATH, "//p[@class='text-red-500']")

    def getQuestionsList(self):
        return self.driver.find_element(*QuizPage.questionsList)

    def getSubmitButton(self):
        return self.driver.find_element(*QuizPage.submitButton)

    def getErrorMessage(self):
        return self.driver.find_element(*QuizPage.errorMessage)