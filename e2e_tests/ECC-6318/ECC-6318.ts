import { browser,element,by, protractor, ElementFinder, ProtractorExpectedConditions } from "protractor";
import { DocumentPage } from "../../pages/documentPage.po";

let log4js = require('log4js');

const logger = log4js.getLogger("ECC-6318");

describe ("Проверка балансодержателей", function() {

    const documentPage = new DocumentPage();

    it("Стоимость и актуальность валидны", async () => {
        let EC : ProtractorExpectedConditions = protractor.ExpectedConditions;
        let mainIframeElement : ElementFinder= element(by.id("main_iframe"));

        await logger.info("get to https://statserv.profintel.ru/v5/app/#/page/L3Y0L2RvY3VtZW50cy9yZWdpc3RyeU1haW4vMjIyODMxLw==");
        await browser.get("https://statserv.profintel.ru/v5/app/#/page/L3Y0L2RvY3VtZW50cy9yZWdpc3RyeU1haW4vNzg3MTIv");
        expect(await browser.getCurrentUrl()).toBe("https://statserv.profintel.ru/v5/app/#/page/L3Y0L2RvY3VtZW50cy9yZWdpc3RyeU1haW4vNzg3MTIv", "WebDriver не перешел на страницу, либо неправильно указана страница.");
        try {
            await browser.wait(EC.visibilityOf(mainIframeElement), 5000);
            await browser.switchTo().frame(await mainIframeElement.getWebElement());   
        } catch (error) {
            await logger.error(error);
            await browser.refresh();
            await browser.sleep(5000);
            await browser.switchTo().frame(await mainIframeElement.getWebElement());
        }

        await browser.wait(EC.visibilityOf(documentPage.mainTableElement), 5000);
        await logger.info(await documentPage.isCostValid());
        await logger.info(await documentPage.isRelevanceValid());
    });
});