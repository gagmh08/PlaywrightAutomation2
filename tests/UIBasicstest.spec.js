const {test, expect} = require('@playwright/test');


test('@Web Browser Context Playwright test', async ({browser}) =>
{

//chrome

    
    const context = await browser.newContext();
    const page = await context.newPage();
    page.route('**/*.{jpg,png,jpeg}', route=> route.abort());
    const userName = page.locator('#username');
    const signIn = page.locator('#signInBtn');
    const cardTitles = page.locator(".card-body a");
    page.on('request', request=> console.log(request.url()));
    page.on('response', response => console.log(response.url(), response.status()));
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());
    //css, xpath

    await userName.fill("rahulshetty");
    await page.locator('#password').fill("learning");
    await signIn.click();
    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText("Incorrect");

    await userName.fill("");
    await userName.fill("rahulshettyacademy");
    await signIn.click();
    console.log(await cardTitles.first().textContent());
    console.log(await cardTitles.nth(1).textContent());
    const allTitles = await cardTitles.allTextContents();
    console.log(allTitles);








});

test('Page Playwright test', async ({page}) =>
    {
    

        await page.goto("https:google.com");
        //get title - assertion

        console.log(await page.title());

        await expect(page).toHaveTitle("Google");
    
    
    });

test('Enter RahulShetty Academy Lets Shop', async({page}) =>

    {
        await page.goto("https://rahulshettyacademy.com/client");

        const email = page.locator('#userEmail');
        const password = page.locator('#userPassword');
        const signIn = page.locator('#login');
        const cardTitle = page.locator('.card-body b');
       


       await email.fill("gagmhn08@gmail.com");
       await password.fill("Gusney10");
        await signIn.click();
        //await page.waitForLoadState("networkidle");
        await page.locator('.card-body b').first().waitFor();
        const allTitleCards = await cardTitle.allTextContents();
        //console.log(await cardTitle.first().textContent());
        console.log(allTitleCards);
        



    });

    test('@Web UI Controls', async ({page}) =>
        {
        
            await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
            const userName = page.locator('#username');
            const signIn = page.locator('#signInBtn');
            const documentLink = page.locator('.blinkingText');
            const dropDown = page.locator('select.form-control');
            await dropDown.selectOption('consult');
            await page.locator('.checkmark').last().click();
            await page.locator('#okayBtn').click();
            console.log(await page.locator('.checkmark').last().isChecked());
            await expect(page.locator('.checkmark').last()).toBeChecked();
            await page.locator('#terms').click();
            await expect(page.locator('#terms')).toBeChecked();
            await page.locator('#terms').uncheck();
            expect(await page.locator('#terms').isChecked()).toBeFalsy();
            await expect(documentLink).toHaveAttribute('class', 'blinkingText');

            //assertion



            //await page.pause();
      
        
        
        });


        test('Child windows handling', async ({browser}) =>
            {
                const context = await browser.newContext();
                const page = await context.newPage();
                const userName = page.locator('#username');
                await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
                const documentLink = page.locator('.blinkingText');
                
                
                const [newPage] =await Promise.all(
                    [

                    context.waitForEvent('page'),//Listen for any new page
                    documentLink.click(),


                    ])//new page is opened

                //await newPage.waitForLoadState('load');

                const text = await newPage.locator(".im-para.red").textContent();
                const arrayText = text.split('@');
                const domain = arrayText[1].split(" ")[0];
                console.log(domain);

                await page.locator("#username").fill(domain);
                //await page.pause();
                console.log(await page.locator("#username").textContent());
                






            });



test('test', async ({ page }) => {
  await page.goto('https://www.google.com/');
  await page.getByLabel('Buscar', { exact: true }).click();
  await page.getByLabel('Buscar', { exact: true }).fill('rahul shetty academy');
  await page.getByRole('link', { name: 'Rahul Shetty Academy:' }).click();
  await page.getByRole('link', { name: 'Courses', exact: true }).click();
  await page.frameLocator('iframe[title="Widget containing a Cloudflare security challenge"]').getByLabel('Verify you are human').check();
  await page.frameLocator('iframe[title="Widget containing a Cloudflare security challenge"]').getByLabel('Verify you are human').check();
  await page.goto('https://courses.rahulshettyacademy.com/courses');
  await page.goto('https://rahulshettyacademy.com/');
  await page.getByRole('heading', { name: 'Courses', exact: true }).click();
  await page.getByRole('heading', { name: 'Courses', exact: true }).click();
  await page.getByRole('link', { name: 'Mentorship' }).click();
});

    