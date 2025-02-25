import TelegramBot from "node-telegram-bot-api";
import { connectDatabase } from "./config/db";
import { createUser } from "./service/userService";

import dotenv from "dotenv";

dotenv.config();

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;

const BotMenu = [
  {
    command: "start",
    description: "💥 Start",
  },
  {
    command: "setting",
    description: "⚙️ setting",
  },
  {
    command: "position",
    description: "💰 Position",
  },
  {
    command: "referral",
    description: "📊 Referral Stats",
  },
  { command: "help", description: "❓ Help" },
];

// Start Inline Keyboard
const IK_START = [
  [
    {
      text: "⚙ Settings",
      callback_data: "SETTINGS",
    },
    {
      text: "🔎 Snipe",
      callback_data: "SNIPE",
    },
  ],
  [
    {
      text: "👨‍👩‍👧 Copy Trading",
      callback_data: "COPY_TRADING",
    },
    {
      text: "🗣 Language",
      callback_data: "LANGUAGE",
    },
  ],
];

const bot = new TelegramBot(TELEGRAM_BOT_TOKEN!, {
  polling: true,
  webHook: false,
  onlyFirstMatch: true,
  filepath: false,
});

const startBot = () => {
  // Connect Database
  connectDatabase();

  bot.setMyCommands(BotMenu);

  bot.onText(/^\/start$/, async (msg: TelegramBot.Message) => {
    console.log("🚀 input start cmd:");

    // const chatId = msg.chat.id;
    const user = msg.chat;
    await createUser({
      userid: user.id,
      username: user.username,
      first_name: user.first_name,
      last_name: user.last_name
    })

    const caption = "Welcome to lucky sniper bot!";
    await bot.sendMessage(msg.chat.id, caption, {
      parse_mode: "HTML",
      disable_web_page_preview: false,
      reply_markup: {
        inline_keyboard: IK_START,
      },
    });
  });
};

startBot();
