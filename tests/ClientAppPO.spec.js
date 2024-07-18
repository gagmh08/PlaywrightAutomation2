const {test, expect} = require('@playwright/test');

const {POManager} = require('../pageobjects/POManager');

//const  dataSet = JSON.parse(JSON.stringify((require("../utils/placeorderTestData.json"))));

//for (const data of dataSet)
{
test('Client Login ', async({page}) =>
    {

        const poManager = new POManager(page);
        const username = "gagmhn08@gmail.com";
        const password = "Gusney10"
        const productName = 'ZARA COAT 3';
        const products = page.locator('.card-body');
        const loginPage = poManager.getLoginPage(); 
      await loginPage.goTo();
       await loginPage.validLogin(username,password);
       const dashboardPage = poManager.getDashboardPage();
       await dashboardPage.searchProductAddCart(productName);
       await dashboardPage.navigateToCart();
    /*
    await page.locator("div li").first().waitFor();
    const bool = page.locator("h3:has-text('Zara Coat 3')").isVisible();
    expect(bool).toBeTruthy();
    await page.locator("text=Checkout").click();
    await page.locator("[placeholder*='Country']").pressSequentially("Hon", {delay:100});
    const dropdown = page.locator(".ta-results");
    await dropdown.waitFor();
    const optionsCount = await dropdown.locator("button").count();
    for(let i = 0; i < optionsCount; ++i)
        {
            const text = await dropdown.locator("button").nth(i).textContent();
            if(text === " Honduras")
            {
                await dropdown.locator("button").nth(i).click();
                break;
                
            }

        }
    await expect(page.locator("label[type='text']").first()).toHaveText(data.username);
    await page.locator(".btnn.action__submit.ng-star-inserted").click();
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(orderId);
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");
    for(let i = 0; i < await rows.count(); ++i){
 
     const rowOrderId = await rows.nth(i).locator("th").textContent();
     if(orderId.includes(rowOrderId)){
 
         await rows.nth(i).locator("button").first().click();
         break;
 
     }
 
    }
 
    const orderIdDetails = await page.locator(".col-text").textContent();
    expect(orderId.includes(orderIdDetails)).toBeTruthy();
  



    //await page.pause();
*/
        
       
    const cartPage = poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(productName);
    await cartPage.Checkout();

    const ordersReviewPage = poManager.getOrdersReviewPage();
    await ordersReviewPage.searchCountryAndSelect("Hon","Honduras");
    const orderId = await ordersReviewPage.SubmitAndGetOrderId();
   console.log(orderId);
   await dashboardPage.navigateToOrders();
   const ordersHistoryPage = poManager.getOrdersHistoryPage();
   await ordersHistoryPage.searchOrderAndSelect(orderId);
   expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();




    });
}