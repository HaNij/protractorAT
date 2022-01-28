import { browser, protractor, element, by } from "protractor";
let log4js = require('log4js');

var fs = require("fs");
var contents = fs.readFileSync("data/clients.json");
var jsonContent = JSON.parse(contents);

const logger = log4js.getLogger("ECC-5236");

describe("Test", () => {

    var find_element = element(by.id("quickSearchStr"))
    var iframe = element(by.id("main_iframe"));
    var pays_button_element = element(by.css("[rel='pays']"));
    var pay_text =  element(by.xpath("//table[@id='payments']//th[6]/div[@class='align-right']"));

    for (let element of jsonContent) {
       it("Проверка клиента: " + element.client_id, async () => {
            logger.info("Check client: " + element.client_id);
            let EC = protractor.ExpectedConditions;
            await browser.wait(EC.visibilityOf(find_element), 5000);
            await find_element.sendKeys(element.client_id);
            await browser.actions().sendKeys(protractor.Key.ENTER).perform();
            await browser.sleep(2000);
            await browser.wait(EC.presenceOf(iframe), 5000);
            await browser.switchTo().frame(iframe.getWebElement());
            await browser.wait(EC.visibilityOf(pays_button_element), 5000);
            await pays_button_element.click();
            await browser.wait(EC.visibilityOf(pay_text), 5000);
            let pay_int;
            await pay_text.getText().then(async (text) => {
                pay_int = parseInt(text);
            });
            await logger.info("Pay int " + pay_int);
            expect(pay_int >= 0).toBeTruthy();
            await browser.switchTo().defaultContent();
            await find_element.clear(); 
        });
    }

    xit("Test", async () => {
            let EC = protractor.ExpectedConditions;
            await browser.wait(EC.visibilityOf(find_element), 5000);
            await find_element.sendKeys(14603);
            await browser.actions().sendKeys(protractor.Key.ENTER).perform();
            await browser.sleep(2000);
            await browser.wait(EC.presenceOf(iframe), 5000);
            await browser.switchTo().frame(iframe.getWebElement());
            await browser.wait(EC.visibilityOf(pays_button_element), 5000);
            await pays_button_element.click();
            await browser.wait(EC.visibilityOf(pay_text));
            let pay_int;
            await pay_text.getText().then(async (text) => {
                pay_int = parseInt(text);
            });
            await logger.info("Pay int " + pay_int);
            if (expect(pay_int > 0).toBeTruthy()){
                await browser.sleep(5000);
            }
            await logger.info("Client " + 201395 + " ok");
            await browser.switchTo().defaultContent();
            await find_element.clear();
    });

});