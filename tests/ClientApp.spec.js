const {test, expect} = require('@playwright/test');


test('Enter RahulShetty Academy Lets Shop', async({browser}) =>

    {

        const context = await browser.newContext();
        const page = await context.newPage();
        const productName = 'Zara Coat 3';
        const products = page.locator('.card-body');
        await page.goto("https://rahulshettyacademy.com/client");

        const email = page.locator('#userEmail');
        const password = page.locator('#userPassword');
        const signIn = page.locator('#login');
        const cardTitle = page.locator('.card-body b');
       


       await email.fill("gagmhn08@gmail.com");
       await password.fill("Gusney10");
        await signIn.click();
        await page.waitForLoadState("networkidle");
        await page.locator('.card-body b').first().waitFor();
        const allTitleCards = await cardTitle.allTextContents();
        //console.log(await cardTitle.first().textContent());
        console.log(allTitleCards);
        const count = await products.count();
        for(let i = 0; i< count; ++i)
    {
            if(await products.nth(i).locator('b').textContent() === productName); 

        {
            await products.nth(i).locator('text= Add To Cart').click();
            break;
        }
    }

    await page.locator("[routerlink*='cart']").click();
    await page.locator("div li").first().waitFor();
    const bool = page.locator("h3:has-text('Zara Coat 3')").isVisible();
    expect(bool).toBeTruthy();
    await page.locator("text=Checkout").click();
    await page.locator("[placeholder*='Country']").pressSequentially("Hondu");
    const dropdown = page.locator(".ta-results");
    await dropdown.waitFor();
    const optionsCount = dropdown.locator("button").count();
    for(let i = 0; i < optionsCount; ++i)
        {
            const text = await dropdown.locator("button").nth(i).textContent();
            if(text === " Honduras")
            {
                await dropdown.locator("button").nth(i).click();
                break;

            }

        }
    await expect(page.locator("label[type='text']").first()).toHaveText("gagmhn08@gmail.com");
    await page.locator(".btnn").click();
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
  



    await page.pause();

        



    });