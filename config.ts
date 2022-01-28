import { Config, element, by, browser } from "protractor";
import { LoginPage } from "./pages/loginPage.po";
let log4js = require('log4js');
let SpecReporter = require('jasmine-spec-reporter').SpecReporter;
var retry = require('protractor-retry').retry;
var HtmlReporter = require('protractor-beautiful-reporter');

// Конфиг
exports.config = {
    framework: 'jasmine',
    jasmineNodeOpts: {
        showColors: true,
        includeStackTrace: true,
        defaultTimeoutInterval: 9999999,
    },
    // Protractor использует драйвера Chrome или Firefox на текущем сервере.
    directConnect: true,
    // Selenium promise manager is now deprecated. Поэтому отключаем.
    SELENIUM_PROMISE_MANAGER: false,
    // Настройки драйвера браузера
    capabilities: {
        browserName: "chrome",
        chromeOptions: {
            args: [
                // Отключаем запуск вкладок в безопасном режиме 
                "--no-sandbox",
                // Отключить использование /dev/shm shared memory 64MB для увеличения памяти в docker
                "--disable-dev-shm-usage", 
                "--ignore-certificate-errors",
                "--disable-infobars",
                '--disable-extensions',
                'verbose',
                'log-path=/tmp/chromedriver.log'
                ],
                prefs: {
                    // disable chrome's annoying password manager
                    'profile.password_manager_enabled': false,
                    'credentials_enable_service': false,
                    'password_manager_enabled': false
                }
        }
    },

    // Файлы автотестов, которые будут запускаться.
    specs : [
        "e2e_tests/ECC-6760/*"
    ],

    // Подготовительная часть скрипта
    onPrepare: async function() {

        retry.onPrepare();
        
        var failFast = require('jasmine-fail-fast');
        const logger = log4js.getLogger("protractor-log");
        var path = require("path");
        var fs = require('fs');

        // Получить название запускаемого файла автотеста.
        var config = await browser.getProcessedConfig()
        var fullName = config.specs[0];
        var fileName = fullName.substring(fullName.lastIndexOf('/')+1).replace(/\.[^/.]+$/, "");

        // Путь до отчетов
        // var reportPath : string = "reports/" + fileName;
        (global as any).reportPath = "reports/" + fileName;
        var reportLog = (global as any).reportPath + "/logs/"        
        jasmine.getEnv().addReporter(new SpecReporter({
            spec: {
                displayStacktrace: true
            }
        }));

        // jasmine.getEnv().addReporter(failFast.init());

        jasmine.getEnv().addReporter(new HtmlReporter({
            preserveDirectory: false,
            takeScreenShotsOnlyForFailedSpecs: false,
            screenshotsSubfolder: 'images',
            jsonsSubfolder: 'jsons',
            baseDirectory: (global as any).reportPath,
            docName: 'index.html',
            clientDefaults:{
                showTotalDurationIn: "header",                  
                totalDurationFormat: "ms" 
            },

            pathBuilder: function pathBuilder(spec, descriptions, results, capabilities) {

                var validDescriptions = descriptions.map(function (description) {
                    return description.replace('/', '@');
                });

                return path.join(
                    validDescriptions.join('-'),
                );
            }
        }).getJasmine2Reporter());
        
        // Т.к все файлы удаляются при перезапуске теста - создаем директории отчета для текущего автотеста и для логов.
        if (!fs.existsSync((global as any).reportPath)) {
            fs.mkdirSync((global as any).reportPath);
            fs.mkdirSync(reportLog);
        }

        log4js.configure({
            "appenders": [
                { type: "log4js-protractor-appender-file", filename: (global as any).reportPath + "/logs/log_report.log" }
            ]
        });

        logger.info("Started tests");
        browser.manage().window().maximize();
        // Важная вещь, отключаем синхронизацию для правильной обработки non-angular сайтов.
        browser.ignoreSynchronization = true;

        //   Авторизация
        const userData = require('../data/userData.json');
        const loginPage = new LoginPage();
        await loginPage.get();
        await loginPage.login(userData.savinov);

        logger.info("Successful authorization")
    },

    onCleanUp: async function (results) {
        retry.onCleanUp(results);
        const child = require('child_process');
        child.execSync('scp -r '+ (global as any).reportPath +' savinov@10.30.29.9:~/sites/report/www/');
    },

    afterLaunch: function() {
        // Перезапуск автотеста при невыполнения теста.
        // return retry.afterLaunch(3);
    },

};