import { browser, by, element, Key, logging, ExpectedConditions as EC, protractor, ExpectedConditions } from 'protractor';
let log4js = require('log4js');

describe ('Проверка', () => {
    let EC = protractor.ExpectedConditions;
    let main_iframe = element(by.tagName("iframe"))
    let sell_button = element(by.xpath("//a[.='Продажа']"))
    let sell_tittle = element(by.xpath("//h3[@class='ng-binding']"))
    let name_pattern_select = element(by.css("span[name='tmpl_type'] .k-input"))
    let personal_account_select = element(by.css("span[name='tmpl'] .k-input"))
    const logger = log4js.getLogger("protractor-log");
    
    it('Нажатие кнопки "Продажа"', async () => {
        await logger.info("Go to site");
        await browser.get("https://savinov_ks:ks2601290@g3.savinov.dev.main/v5/app/#/page/L3Y0L2NsaWVudHMvc2hvdy8xLzE3NzgzOC8=");
        await browser.waitForAngular();
        await browser.wait(EC.presenceOf(main_iframe), 10000);
        await logger.info("Switch to iframe");
        await browser.switchTo().frame(main_iframe.getWebElement());
        await logger.info("Wait for sell_button");
        await browser.wait(EC.presenceOf(sell_button), 10000)
        .catch( async () => {
            logger.error("No such window: iframe bug reload script");
        });
        await logger.info("Click sell_button");
        await sell_button.click();
    });

    it('Наименование шаблона', async () => {
        await logger.info("Switch to defualtContent");
        await browser.switchTo().defaultContent();
        await logger.info("Wait for sell_title");
        await browser.wait(EC.visibilityOf(sell_tittle), 10000);
        await logger.info("Click to name pattern");
        await name_pattern_select.click();
        await browser.wait(EC.elementToBeClickable(element(by.xpath('//ul/li[@class="k-item"][text()="Возврат оборудования на склад."]'))), 5000);
        await element(by.xpath('//ul/li[@class="k-item"][text()="Возврат оборудования на склад."]')).click();
    });

    it('Лицевой счет', async () => {
        await logger.info("Click personal account");
        await browser.switchTo().defaultContent();
        // await browser.wait(EC.elementToBeClickable(personal_account_select), 10000);
        await browser.sleep(5000);
        await personal_account_select.click();
        await browser.wait(EC.elementToBeClickable(element(by.xpath('//ul/li[@class="k-item"][text()="Видеонаблюдение. Разовый платеж."]'))), 5000);
        await element(by.xpath('//ul/li[@class="k-item"][text()="Видеонаблюдение. Разовый платеж."]')).click();
        debugger;
    });
});
