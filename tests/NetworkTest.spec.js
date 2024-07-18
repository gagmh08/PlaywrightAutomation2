const { test, expect, request } = require('@playwright/test');
const { APIUtils } = require('../utils/APIUtils');
const loginPayLoad = { userEmail: "gagmhn08@gmail.com", userPassword: "Gusney10" }
const orderPayLoad = {
    orders: [
        {
            country: "Honduras",
            productOrderedId: "6581cade9fd99c85e8ee7ff5"
        }
    ]
}
const fakePayLoadOrders = { data: [], message: "No Orders" };


let response;

test.beforeAll(async () => {
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginPayLoad);
    response = await apiUtils.createOrder(orderPayLoad);


})



//test1, test2, test3

test('@Client App login', async ({ page }) => {
    //js file- Login js, DashboardPage


    page.addInitScript(value => {

        window.localStorage.setItem('token', value);
    }, response.token);


    await page.goto("https://rahulshettyacademy.com/client");

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
        async route => {

            const response = await page.request.fetch(route.request());
            let body = JSON.stringify(fakePayLoadOrders);
            route.fulfill(
                {
                    response,
                    body,
                }
            );
            //intercepting response - API response->{playwright fakeresponse}->browser

        });

    await page.waitForLoadState('networkidle');
    await page.waitForSelector(".btn.btn-custom[routerlink='/dashboard/myorders']");
    await page.locator(".btn.btn-custom[routerlink='/dashboard/myorders']").click();
    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*");
    await page.pause();
    console.log(await page.locator(".mt-4").textContent());


});
