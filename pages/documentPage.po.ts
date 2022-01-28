import {browser, element, by, ExpectedConditions, ElementFinder} from 'protractor';
let log4js = require('log4js');
const logger = log4js.getLogger("DocumentPage");

/**
 * Класс страницы документа клиента
 */


export class DocumentPage {
    costElement : ElementFinder = element(by.xpath("//table[@class='view']//tr[14]//td"));
    relevanceElement : ElementFinder = element(by.xpath("//table[@class='view']//tr[22]//td//img"));
    mainTableElement : ElementFinder = element(by.xpath("//table[@class='view']"));

    async isCostValid() {
        await logger.info(`isCostValid element: ${await this.costElement.getText()}`);
        return await this.costElement.getText() == '0' ? false : true;
    }

    async isRelevanceValid() {
        console.log("Test");
        await logger.info(`isRelevanceValid element: ${await this.relevanceElement.getAttribute('title')}`);
        return await this.relevanceElement.getAttribute('title') == "Да" ? true : false;
    }

}