import {browser, element, by, ElementFinder, ProtractorExpectedConditions, protractor, Key} from 'protractor';
let log4js = require('log4js');
const logger = log4js.getLogger("ConnectionUrLicPage");

export class ConnectionUL {
    baseUrl : string = "https://statserv.profintel.ru/vx/app/ko";
    EC : ProtractorExpectedConditions = protractor.ExpectedConditions;
    searchInputElement : ElementFinder = element(by.xpath("//input[@aria-label='Адрес подключения' and @placeholder='Переулок Северный, 2а']"));
    firstClickableSearchElement : ElementFinder = element(by.xpath("//div[@class='v-menu__content theme--light menuable__content__active v-autocomplete__content']//div[@class='v-list theme--light']//div[1]//a"));
    possibilityULConnectionElement : ElementFinder = element(by.xpath("//div[@class='flex xs6 md6 lg6']/div[@class='v-card v-sheet theme--light']/div[2]//i[@class='v-icon material-icons theme--light red--text']"));

    async get() {
        await browser.get(this.baseUrl);
        await logger.info("On page");
    }

    /**
     * Проверка, что по данному адресу возможно подключение для ЮЛ
     * @param address адресс подключения
     */

    async checkUrLicConnection(address : string) {
        await logger.info("Checking connection ur lic: ", address)
        await browser.wait(this.EC.visibilityOf(this.searchInputElement), 5000);
        await this.searchInputElement.sendKeys(address);
        await browser.wait(this.EC.visibilityOf(this.firstClickableSearchElement), 5000);
        await this.firstClickableSearchElement.click();
        await browser.wait(this.EC.visibilityOf(this.possibilityULConnectionElement), 5000);
        expect(this.possibilityULConnectionElement.getText()).toMatch("check", "Ожидалось получить возможность подключения ЮР лиц, но получено невозможность.");

    }

    /**
     * Очистка поиска через CTRL + A + DEL
     */

    async clearInputSearchField() {
        logger.info("Clear search field");
        await this.searchInputElement.sendKeys(Key.chord(Key.CONTROL, 'a'));
        await this.searchInputElement.sendKeys(Key.DELETE);
        await browser.wait(this.EC.textToBePresentInElement(this.searchInputElement, ""), 5000);
    }

}