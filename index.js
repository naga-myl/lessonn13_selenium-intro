// we want to pull our builder,key,by and until from  the selenium library
const {Builder, By ,Key, until} = require('selenium-webdriver');
//we should import should() from chai
const should =require('chai') .should();

async function googlesearch()
{
    //create new instance of firefox

  let driver =await new Builder().forBrowser('firefox').build();

    try{
        //go to google.com
await driver.get('https://www.google.com');

//find the accept cookies button
let cookieButton =await driver.findElements(By.css('.QS5gu.sy4vM'));

//click the accepts cookie button 
await cookieButton[1].click();
//wait until the element is located, in this case search  bar
await driver.wait(until.elementsLocated(By.name('q')),10000);
//selenium is too fast,better wait 1 second /1000 ms
await driver.sleep(1000);
//write something in the search bar and push keys
await driver.findElement(By.name('q')).sendKeys('Selenium', Key.ENTER);
//wait  until the elemments are loctaed
await driver.wait(until.elementsLocated(By.css('h3')),10000);
//get the lnink text
let firstlink =await driver.findElement(By.css('h3'));
let linktext =await firstlink.getText();
console.log(linktext);


//assert link text
linktext.should.equal('Selenium');
if(linktext==='Selenium')
{
    await firstlink.click();

}
else
{
    console.log('first link is not selenium.');

}
//wait until site loads
await driver.wait (until.titleContains('Selenium'),10000);
//get the titile
let title=await driver.getTitle();
//assert the  title
title.should.include('Selenium');

    }
   catch (error) {
    console.log(error);
    
  }
  finally{
    console.log('test ran succesfuly');
    await driver.quit();
  }
}
googlesearch();
/* another way of calling function 
(
    async function googlesearch()
{

})
*/

