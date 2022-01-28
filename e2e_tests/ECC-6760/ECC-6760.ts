import { browser, protractor, element, by, ElementFinder, ProtractorExpectedConditions, Key } from "protractor";
import { ConnectionUL } from "../../pages/connectionUrLic.po";
let log4js = require('log4js');

var fs = require("fs");
var contents = fs.readFileSync("data/addresses.json");
var jsonContent = JSON.parse(contents);

const logger = log4js.getLogger("ECC-6760");

describe("Проверка адресов", function() {

    const connectionULPage = new ConnectionUL();

    it ("Загрузка страницы проверки подключения", async () => {
        await connectionULPage.get();
        expect(await browser.getCurrentUrl()).toBe(connectionULPage.baseUrl);
        logger.info("Go to page is OK");
    });

    for (let element of jsonContent) {
        it("Проверка: " + element.address, async () => {
            await connectionULPage.checkUrLicConnection(element.address);
            await connectionULPage.clearInputSearchField();
        });
    }
});