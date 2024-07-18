const {test, expect, request} = require('@playwright/test');
const {APIUtils} =  require('../utils/APIUtils.js');
const loginPayLoad = {userEmail: "gagmhn08@gmail.com", userPassword: "Gusney10"}
const orderPayLoad = {orders:[
  {
    country: "Honduras",
    productOrderedId: "6581cade9fd99c85e8ee7ff5"
  }
]}


let response;

test.beforeAll( async ()=>
{
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginPayLoad);
    response = await apiUtils.createOrder(orderPayLoad);
   

})



    //test1, test2, test3

test('@API Client App login', async ({ page }) => {
    //js file- Login js, DashboardPage

  
    page.addInitScript(value => {

        window.localStorage.setItem('token', value);
    }, response.token );
  
    
    await page.goto("https://rahulshettyacademy.com/client");

    await page.locator(".btn.btn-custom[routerlink='/dashboard/myorders']").click();
    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");
    for(let i = 0; i < await rows.count(); ++i){
 
     const rowOrderId = await rows.nth(i).locator("th").textContent();
     if(response.orderId.includes(rowOrderId)){
 
         await rows.nth(i).locator("button").first().click();
         break;
 
     }
 
    }
 
    const orderIdDetails = await page.locator(".col-text").textContent();
    await page.pause();
    expect(response.orderId.includes(orderIdDetails)).toBeTruthy();
 });
