const readline = require('readline');
const fs = require('fs').promises;
const fetch = require('node-fetch');
const { v4: generateUUID } = require('uuid');
require('colors');

const DISCORD_API_URL = "https://api.discord.gx.games/v1/direct-fulfillment";
const DISCORD_BASE_URL = "https://discord.com/billing/partner-promotions";
const PROMOTION_ID = "1180231712274387115";
const OUTPUT_FILE_NAME = 'nitro.txt';

async function requestDiscordAPI(uuid) {
  const requestBody = { partnerUserId: uuid };

  try {
    const response = await fetch(DISCORD_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      throw new Error('[ERROR] Your IP is rate limited. Please change it to continue using the program."'.green);

    }

    return await response.json();
  } catch (error) {
    console.error("Error:", error.message);
  }
}

async function generateAndShowPromoUrl() {
  const uuid = generateUUID();
  const apiResponse = await requestDiscordAPI(uuid);

  if (apiResponse) {
    const promoUrl = `${DISCORD_BASE_URL}/${PROMOTION_ID}/${apiResponse.token}`;
    console.log('[SUCCESS] Nitro code generated and saved'.green);
    await appendToFile(promoUrl);
  }
}

async function appendToFile(data) {
  try {
    await fs.stat(OUTPUT_FILE_NAME);
  } catch (error) {
    await fs.writeFile(OUTPUT_FILE_NAME, '');
  }

  await fs.appendFile(OUTPUT_FILE_NAME, data + '\n');
}

async function claimNitroRewards() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const numberOfNitroCodes = await new Promise((resolve) => {
    rl.question("How many Nitro codes do you want to generate? ", (answer) => {
      resolve(parseInt(answer, 10));
      rl.close();
    });
  });

  if (!Number.isInteger(numberOfNitroCodes) || numberOfNitroCodes <= 0) {
    console.error("Invalid input. Please enter a positive integer greater than 0.");
    return;
  }

  for (let i = 0; i < numberOfNitroCodes; i++) {
    await generateAndShowPromoUrl();
    await new Promise(resolve => setTimeout(resolve, 1));
  }
}

claimNitroRewards();
