// @ts-check
const { defineConfig, devices } = require('@playwright/test');
const{on} = require('events');
const{config} = require('process');


module.exports = defineConfig({
  testDir: './tests',
  retries: 0,

  timeout: 30 * 1000,
  expect:{

    timeout: 5000

  },
  
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
   // trace: 'on-first-retry',
    browserName: 'chromium',
    headless: true,
    screenshot: 'on',
    video: 'retain-on-failure',
    trace: 'on', //off/on

  },



});

//module.exports = config;

