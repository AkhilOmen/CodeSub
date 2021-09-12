// URL of HackerRank Login "https://www.hackerrank.com/auth/login"
// Enter you Email and password in EmailPassobj

let puppeteer = require("puppeteer");
let EmialPassobj = require("./emailpass");
let AnswerObj = require("./Answer");

let page;

(async function fn(){

    let BrowserStartPromise = puppeteer.launch({
        headless: null,
    
        // slowMo: 1000,
    
        defaultViewport: null,
    
        args:["--start-maximized", "--disable-notifications"]
    
    })

    let browserObj = await BrowserStartPromise;
    console.log("Browser Opened");

    page = await browserObj.newPage();
    await page.goto("https://www.hackerrank.com/auth/login");

    await page.type("[placeholder='Your username or email']", EmialPassobj.Emial, {delay: 50} );
    await page.type("[type='password']", EmialPassobj.Password, {delay: 50} );
    await page.click("[class='ui-btn ui-btn-large ui-btn-primary auth-button ui-btn-styled']", {delay: 100});
    await WaitAndClick("[class='ui-btn ui-btn-normal ui-btn-large ui-btn-primary ui-btn-link ui-btn-styled']", page);
    await WaitAndClick("[class='ui-btn ui-btn-normal playlist-card-btn ui-btn-primary ui-btn-link ui-btn-styled']", page)[0];
    await page.waitFor(3000);
    let QuestionArr = await page.$$("[class='ui-btn ui-btn-normal primary-cta ui-btn-line-primary ui-btn-styled']",{delay: 100});
    await QuestionSolver(page, QuestionArr[0], AnswerObj.answers);
    
    console.log("Question has been Solved");

})();


function QuestionSolver(page, question, answer){

    return new Promise(function( resolve, reject ){

        let clickthequestionpromise = question.click();

        clickthequestionpromise.then(function(){
            let waitForEditorToBeFocusedpromise = WaitAndClick(".monaco-editor.no-user-select.vs", page);
            return waitForEditorToBeFocusedpromise;
        }).then(function(){
            let UsecheckboxPromise = WaitAndClick("[class='checkbox-wrap']", page);
            return UsecheckboxPromise;
        }).then(function(){
            return page.waitFor(2000);
        }).then(function(){
            let TypeCodeInCheckBoxPromise = page.keyboard.type(answer, {delay: 10});
            return TypeCodeInCheckBoxPromise;
        }).then(function(){
            let PressControlDownPromise = page.keyboard.down("Control");
            return PressControlDownPromise;
        }).then(function(){
            let PressAPromise = page.keyboard.press("A", { delay: 100 });
            return PressAPromise;
        }).then(function(){
            let PressXPromise = page.keyboard.press("X", { delay: 100 });
            return PressXPromise;
        }).then(function(){
            let PressControlUpPromise = page.keyboard.up("Control");
            return PressControlUpPromise;
        }).then(function(){
            let waitForEditorToBeFocusedpromise2 = WaitAndClick(".monaco-editor.no-user-select.vs", page);
            return waitForEditorToBeFocusedpromise2;
        }).then(function(){
            let PressControlDownPromise = page.keyboard.down("Control");
            return PressControlDownPromise;
        }).then(function(){
            let PressAPromise = page.keyboard.press("A", { delay: 100 });
            return PressAPromise;
        }).then(function(){
            let PressXPromise = page.keyboard.press("V", { delay: 100 });
            return PressXPromise;
        }).then(function(){
            let PressControlUpPromise = page.keyboard.up("Control");
            return PressControlUpPromise;
        }).then(function(){
            let SubmitCodePromise = page.click("[class='ui-btn ui-btn-normal ui-btn-primary pull-right hr-monaco-submit ui-btn-styled']", {delay: 100});
            return SubmitCodePromise;
        }).then(function(){
            resolve();
        }).catch(function(err){
            reject(err);
        })

    })
}


function WaitAndClick(selector, Spage){

    return new Promise(function(resolve, reject){
        let WaitfortheselectorPromise = Spage.waitForSelector(selector, {visilbe: true});

        WaitfortheselectorPromise.then(function(){

            let ClicktheSelectorPromise = Spage.click(selector, {delay: 100});
            return ClicktheSelectorPromise;

        }).then(function(){
            resolve();
        }).catch(function(err){
            reject(err);
        })
    })
}
