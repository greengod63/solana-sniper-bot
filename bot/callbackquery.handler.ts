import TelegramBot from "node-telegram-bot-api";
import { hasUser, createUser } from "../service/userService";
import { getIKSnipe } from "../components/inlineKeyboard";
import fs from "fs";
import { BotCaption } from "../config/constants";
import { sendIKSnipe } from "./botAction";

export async function callbackQueryHandler(
  bot: TelegramBot,
  cb_query: TelegramBot.CallbackQuery
) {
  const cb_query_cmd = cb_query.data;
  const chatId = cb_query.message?.chat.id;
  const messageId = cb_query.message?.message_id || 0;
  if (!cb_query_cmd || !chatId) return;

  let user;
  const existingUser = await hasUser(chatId);
  if (existingUser) {
    console.log("User already exist: ", chatId);
    user = existingUser;
  } else {
    console.log("New User: ", chatId);
    user = await createUser({
      userid: chatId,
      username: cb_query.from.username,
      first_name: cb_query.from.first_name,
      last_name: cb_query.from.last_name,
    });
  }

  switch (cb_query_cmd.split("-")[0]) {
    case "SNIPE": // Snipe Button
      const IK_SNIPE = getIKSnipe({});
      sendIKSnipe(bot, chatId, IK_SNIPE);
      break;
    case "BACK": //Back Button
      bot.deleteMessage(chatId, messageId);
      return;
    case "TOKEN": //Token Button
        await bot.sendMessage(chatId, BotCaption.strInputTokenAddress, {
          parse_mode: "HTML",
          reply_markup: {
            force_reply: true,
            selective: true
          },
        });
      break;
    default:
      break;
  }
}
