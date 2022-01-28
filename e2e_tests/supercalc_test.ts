import { element, browser, by, promise } from "protractor";

describe("Main", () => {
    
    var first = element(by.xpath('/html/body/div/div/form/input[1]'));
    var second = element(by.xpath('/html/body/div/div/form/input[2]'));
    var button_go = element(by.xpath('//*[@id="gobutton"]'));
    var result = element(by.xpath("/html/body/div/div/form/h2"));
    var operation = element(by.xpath('/html/body/div/div/form/select'));

    var history_time = element(by.xpath('/html/body/div/table/tbody/tr[1]/td[1]'));
    var history_expression = element(by.xpath('/html/body/div/table/tbody/tr[1]/td[2]'));
    var history_result = element(by.xpath('/html/body/div/table/tbody/tr[1]/td[3]'));

    var history_table = element.all(by.xpath('/html/body/div[2]/table'));
    
    const URL = "http://juliemr.github.io/protractor-demo/";

    beforeAll(async function() {
        await browser.waitForAngularEnabled(true);
        await browser.get(URL);
    });

    it ("should be title", async () => {
        await expect(await browser.getTitle()).toEqual("Super Calculator");
    });
    it("add", async () => {
        
        await first.sendKeys("1");
        await second.sendKeys('3');
        await button_go.click();
        
        await expect(await result.getText()).toEqual('4');
    });

    it ("minus", async () => {
        debugger;
        var selectDropdownbyNum = async function ( element, optionNum ) {
            if (optionNum) {
              var options = await element.all(by.tagName('option'));   
              await options[optionNum].click();
            }
          };
        await selectDropdownbyNum(operation, 4);
        await first.sendKeys("1");
        await second.sendKeys('3');
        await button_go.click();
        console.log(Date.now());
        await expect(await result.getText()).toEqual('-2');
    });

    it ("check history add", async () => {
        let rows = await history_table.all(by.tagName('tr'));
        let cells = await history_table.all(by.tagName('td')); 
        
    });
});