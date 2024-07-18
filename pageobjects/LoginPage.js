class LoginPage{

    constructor(page)

    {
    this.page = page;    
    this.signInButton = page.locator('#login');
    this.userName = page.locator('#userEmail');
    this.userPassword = page.locator('#userPassword');

    }
   async  goTo()
    {
        await this.page.goto("https://www.microsoft.com/en-us/microsoft-365/outlook/log-in");

    }
   async  validLogin(username, password)
    {

        await this.userName.fill(username);
        await this.userPassword.fill(password);
         await this.signInButton.click();
         await this.page.waitForLoadState("networkidle");

    }
}
module.exports = {LoginPage};