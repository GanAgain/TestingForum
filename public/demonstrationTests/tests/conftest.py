import pytest
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
driver = None

def pytest_addoption(parser):
    parser.addoption(
        "--browser_name",
        action="store",
        default="chrome"
    )

@pytest.fixture()
def driver(request):
    global driver
    browser_name = request.config.getoption("--browser_name")
    if browser_name == "chrome":
        options = webdriver.ChromeOptions()
        options.add_experimental_option("detach", True)
        service_obj = Service()
        driver = webdriver.Chrome(options=options, service=service_obj)
    elif browser_name == "firefox":
        options = webdriver.FirefoxOptions()
        service_obj = Service()
        driver = webdriver.Firefox(options=options, service=service_obj)

    driver.implicitly_wait(3)
    driver.get("http://localhost:8080/articles")
    driver.maximize_window()
    yield driver
    driver.quit()

@pytest.mark.hookwrapper
def pytest_runtest_makereport(item):
    pytest_html=item.config.pluginmanager.getplugin('html')
    outcome = yield
    report = outcome.get_result()
    extra = getattr(report, 'extra', [])

    if report.when == 'call' or report.when == "setup":
        xfail = hasattr(report, 'wasxfail')
        if (report.skipped and xfail) or (report.failed and not xfail):
            file_name = report.nodeid.replace("::", "_")+".png"
            _capture_screenshot(file_name)
            if file_name:
                html = '<div><img src="%s" alt="screenshot" style="width:304px;height:228px;" '\
                    'onclick="window.open(this.src)" align="right"/></div>' % file_name
                extra.append(pytest_html.extras.html(html))
            report.extra = extra

def _capture_screenshot(name):
    driver.save_screenshot(name)
