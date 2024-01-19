import { defineConfig } from "cypress";
import 'dotenv/config'
import cypressEnv from './cypress.env.json';


export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
    },
    baseUrl: cypressEnv.baseUrl,
    video: true,
    videoCompression: 32,
    supportFile: false,
    },
});
