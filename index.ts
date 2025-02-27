import TelegramBot from "node-telegram-bot-api";
import { connectDatabase } from "./config/db";
import { createUser, hasUser } from "./service/userService";
import { IK_START, getIKSnipe } from "./components/inlineKeyboard";
import { messageHandler } from "./bot/message.handler";
import { callbackQueryHandler } from "./bot/callbackquery.handler";
import fs from "fs";

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

    const chatId = msg.chat.id;
    let user;
    const existingUser = await hasUser(chatId);
    if (existingUser) {
      console.log("User already exist: ", chatId);
      user = existingUser;
    }
    else {
      console.log("New User: ", chatId);

      const userChat = msg.chat;
      user = await createUser({
        userid: userChat.id,
        username: userChat.username,
        first_name: userChat.first_name,
        last_name: userChat.last_name
      });
    }

    const image = fs.createReadStream("./public/sniper.jpg");
    const caption = `Welcome to <b>Lucky Sniper</b> Bot!✨\n⬇You can deposit SOL to your wallet and start sniping!🔍\n\n💰Your Wallet:\n<code>${user.public_key}</code>`;
    await bot.sendPhoto(msg.chat.id, image, {
      parse_mode: "HTML",
      caption: caption,
      reply_markup: {
        inline_keyboard: IK_START,
      },
    });
  });

  bot.onText(/^\/snipe/, async (msg: TelegramBot.Message) => {
    const chatId = msg.chat.id;
    let user;
    // const existingUser = await hasUser(chatId);
    // if (existingUser) {
    //   console.log("User already exist: ", chatId);
    //   user = existingUser;
    //   const IK_SNIPE = getIKSnipe();
    //   const image = fs.createReadStream("./public/sniper.jpg");
    //   const caption = `Welcome to <b>Lucky Sniper</b> Bot!✨\n⬇You can deposit SOL to your wallet and start sniping!🔍\n\n💰Your Wallet:\n<code>${user.public_key}</code>`;
    //   await bot.sendPhoto(msg.chat.id, image, {
    //     parse_mode: "HTML",
    //     caption: caption,
    //     reply_markup: {
    //       inline_keyboard: IK_SNIPE,
    //     },
    //   });
    // }
    // else{
    //   await bot.sendMessage(chatId, "Please start the bot first using /start");
    //   return;
    // }
  });

  bot.on("message", (msg: TelegramBot.Message) => {
    console.log("message handler");
    // bot.sendMessage(msg.chat.id, "hhhhhhhh");
    messageHandler(bot, msg);
  });

  bot.on("callback_query", async (cb_query: TelegramBot.CallbackQuery) => {
    console.log("callback_query handler");
    callbackQueryHandler(bot, cb_query);
  });
};

startBot();
