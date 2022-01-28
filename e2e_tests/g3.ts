import { browser, by, element, Key, logging, ExpectedConditions as EC, promise, until, ElementFinder } from 'protractor';
import { protractor } from 'protractor/built/ptor';
const fs = require('fs');


describe('Untitled Test Case', () => {

	async function writeScreenShot(data, filename) {
        var stream = fs.createWriteStream(filename);
        stream.write(new Buffer(data, 'base64'));
        stream.end();
    }
 

	it('should do something', async () => {
		let EC = protractor.ExpectedConditions;
		let main_iframe = element(by.id("main_iframe"));
		// let searchButton = element(by.css("button[title='Поиск клиента']"));
		// await browser.wait(EC.visibilityOf(searchButton), 5000);
		// await performDoubleClick(searchButton);
		// await browser.actions().click(searchButton).click(searchButton).perform();
		await browser.get("https://statserv.profintel.ru/v5/app/#/page/L3Y0L2NsaWVudHMvc2VhcmNoLw==");
		await browser.wait(EC.visibilityOf(main_iframe), 5000);
		await browser.switchTo().frame(element(by.id("main_iframe")).getWebElement());	
		// await browser.executeScript("return !!(window.angular || window.ng);")
    	// 	.then(async function(isAngular){
        // 		if(isAngular) {
		// 			console.log("Page is Angular");
		// 			await browser.waitForAngularEnabled(true);
        // 		}
        // 		else {
		// 			console.log("Page isn't Angular");
        // 		}
		// 	   });
		// process.exit();
		let searchInput = element(by.xpath("//input[@id='s']"));

		await browser.wait(EC.visibilityOf(searchInput), 5000);
		await searchInput.sendKeys("test");
		await element(by.css(".ui-state-default")).click();
		await browser.sleep(5000);

	});
});