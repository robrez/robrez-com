const devServer = require('@web/dev-server');
const playwright = require('playwright');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const startDevServer = devServer.startDevServer;

const argv = yargs(hideBin(process.argv)).argv;

const spaRouterMiddleware = (_context, next) => {
  return next();
};

/**
 * Goal - static generate PDF resume at build time
 */

/** @type {import('@web/dev-server').DevServerConfig} */
const devServerConfig = {
  port: 8011,
  open: false,
  rootDir: 'site/dist-dev',
  nodeResolve: true,
  watch: false,
  plugins: [],
  middleware: [spaRouterMiddleware]
};

async function startServer(argv) {
  const server = await startDevServer({
    config: devServerConfig,
    readCliArgs: false,
    readFileConfig: false
  });
  return server;
}

async function genpdf(argv) {
  const browser = await playwright.chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  // await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  const url = `http://localhost:8011/resume/index.html`;
  console.log(url);
  await page.goto(url, {
    waitUntil: 'networkidle'
  });
  await page.evaluate(() => {
    const el = document.querySelector('rr-app-layout');
    if (el) {
      el.removeAttribute('randomize-brand-color');
      el.setAttribute('brand-color', 'blue');
    }
  });

  await page.pdf({
    path: `./site/src/assets/resume.pdf`,
    margin: {
      top: '0.4in',
      bottom: '0.4in',
      left: '0.4in',
      right: '0.4in'
    }
  });
  await browser.close();
}

async function main(argv) {
  const server = await startServer(argv);

  try {
    await genpdf(argv);
  } catch (e) {
    console.error(e);
  }

  await server.stop();
}

main(argv);
