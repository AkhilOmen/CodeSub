// URL of HackerRank Login "https://www.hackerrank.com/auth/login"

let puppeteer = require("puppeteer");
let EmialPassobj = require("./emailpass");
let AnswerObj = require("./Answer");
let deplay

let BrowserStartPromise = puppeteer.launch({
    headless: null,

    // slowMo: 1000,

    defaultViewport: null,

    args:["--start-maximized", "--disable-notifications"]

})

let page

BrowserStartPromise.then(function(browserObj){
    console.log("Opening Browser");

    let OpeningnewBrowserPromise = browserObj.newPage();
    return OpeningnewBrowserPromise;

}).then(function(newTab){
    console.log("Opening HackerRank Tab");
    page = newTab;

    let OpeningtheHackertabPromise = newTab.goto("https://www.hackerrank.com/auth/login");
    return OpeningtheHackertabPromise;

}).then(function(){
    console.log("Entering Login Credentials -> Email.Id");

    let EnteringEmailPromise = page.type("[placeholder='Your username or email']", EmialPassobj.Emial, {deplay: 50} );
    return EnteringEmailPromise;

}).then(function(){
    console.log("Entering Login Credentials -> Password");

    let EntringPassowrdPromise = page.type("[type='password']", EmialPassobj.Password, { delay: 50 } );
    return EntringPassowrdPromise;

}).then(function(){
    console.log("Press Enter -> Loging In");

    let PressEnterPromise = page.click("[class='ui-btn ui-btn-large ui-btn-primary auth-button ui-btn-styled']", {deplay: 100});
    return PressEnterPromise;

}).then(function(){
    console.log("Selecting the Course -> Interview Preparation Kit");
    
    let  waitandclickkitPromise = WaitAndClick("[class='ui-btn ui-btn-normal ui-btn-large ui-btn-primary ui-btn-link ui-btn-styled']", page);
    return waitandclickkitPromise; 

}).then(function(){
    console.log("Selecting the challenge -> warmup");

    let waitandclickchallengePromise = WaitAndClick("[class='ui-btn ui-btn-normal playlist-card-btn ui-btn-primary ui-btn-link ui-btn-styled']", page)[0];
    return waitandclickchallengePromise;

}).then(function(){
    console.log("Waiting for the Questions page to be opened");

    let waitforquestionPromise = page.waitFor(3000);
    return waitforquestionPromise;

}).then(function(){
    console.log("Creating an Arrray of Questions ");

    let SelectingProblemPromise = page.$$("[class='ui-btn ui-btn-normal primary-cta ui-btn-line-primary ui-btn-styled']",{deplay: 100});
    return SelectingProblemPromise;

}).then(function(Qarray){
    console.log("Selecting and Solving a Question, Total No of Questions: ", Qarray.length);
    
    let QuestionSolvePromise = QuestionSolver(page, Qarray[0], AnswerObj.answers);
    return QuestionSolvePromise;
    
}).then(function(){
    console.log("Question has been Solved");
})


function QuestionSolver(page, question, answer){

    return new Promise(function( resolve, reject){

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
            let TypeCodeInCheckBoxPromise = page.keyboard.type(answer, {delay: 50});
            return TypeCodeInCheckBoxPromise;
        }).then(function(){
            
        }).then(function(){
            let PressControlDownPromise = page.keyboard.down("Control");
            return PressControlDownPromise;
        }).then(function(){
            let PressAPromise = page.keyboard.press("A", { deplay: 100 });
            return PressAPromise;
        }).then(function(){
            let PressXPromise = page.keyboard.press("X", { deplay: 100 });
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
            let PressAPromise = page.keyboard.press("A", { deplay: 100 });
            return PressAPromise;
        }).then(function(){
            let PressXPromise = page.keyboard.press("V", { deplay: 100 });
            return PressXPromise;
        }).then(function(){
            let PressControlUpPromise = page.keyboard.up("Control");
            return PressControlUpPromise;
        }).then(function(){
            let SubmitCodePromise = page.click("[class='ui-btn ui-btn-normal ui-btn-primary pull-right hr-monaco-submit ui-btn-styled']", {deplay: 50});
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

            let ClicktheSelectorPromise = Spage.click(selector, {deplay: 100});
            return ClicktheSelectorPromise;

        }).then(function(){
            resolve();
        }).catch(function(err){
            reject(err);
        })
    })
}