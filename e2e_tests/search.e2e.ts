import { browser, by, element, Key, logging, ExpectedConditions as EC, protractor } from 'protractor';

describe('Untitled Test Case', () => {

	it('should do something', async () => {
        let EC = protractor.ExpectedConditions;
        debugger;
        await browser.get('https://statserv.profintel.ru/v5/app/#/page/L3Y0L2NsaWVudHMvc2VhcmNoLw==');
        let main_iframe = element(by.id("main_iframe"));
        await browser.sleep(1000);
        await browser.switchTo().frame(main_iframe.getWebElement());
        await browser.wait(EC.visibilityOf(element(by.id("s"))), 5000);
        await element(by.id("s")).sendKeys('test');
        await element(by.linkText("Поиск")).click();
        await browser.wait(EC.visibilityOf(element(by.linkText("215624"))), 5000);
        await element(by.linkText("215624")).click();
        await browser.wait(EC.visibilityOf(element(by.xpath("//span[contains(.,'_Test (id: 215624)')]"))), 5000);
        !expect(element(by.xpath("//span[contains(.,'_Test (id: 215624)')]")).getText()).toMatch("");
	});
});

describe("test", () => {

        it('it')
        it('it2')
        it('it3')
});