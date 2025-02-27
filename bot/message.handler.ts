import TelegramBot from "node-telegram-bot-api";
import { hasUser } from "../service/userService";
import { isValidSolanaAddress } from "../utils";
import { BotCaption } from "../config/constants";
import { getIKSnipe } from "../components/inlineKeyboard";
import { sendIKSnipe } from "./botAction";

let snipe_config:any = {
  token: null,
  slippage: 50,
  snipe_fee: 0.005,
  snipe_tip: 0.005,
  tp: null,
  sl: null,
  snipe_amount: null,
}

export async function messageHandler(
  bot: TelegramBot,
  msg: TelegramBot.Message
) {
  try {
    if (!msg.text) return;

    const chatId = msg.chat.id;
    const existingUser = await hasUser(chatId);
    if (!existingUser) {
      return;
    }
    // console.log("hello------------->", msg.text, msg)
    const { reply_to_message } = msg;
    if (reply_to_message && reply_to_message.text) {
      const { text } = reply_to_message;
      
      const regex = /^[0-9]+(\.[0-9]+)?$/;
      const isNumber = regex.test(msg.text) === true;
      const reply_message_id = reply_to_message.message_id;

      switch (text) {
        case BotCaption.strInputTokenAddress:
        case BotCaption.strInvalidSolanaTokenAddress:
          const isCA = await isValidSolanaAddress(msg.text);
          if (isCA) {
            snipe_config.token = msg.text;
            const IK_SNIPE = getIKSnipe(snipe_config);
            sendIKSnipe(bot, chatId, IK_SNIPE);
          } else {
            await bot.deleteMessage(chatId, msg.message_id);
            await bot.deleteMessage(chatId, reply_message_id);

            await bot.sendMessage(chatId, BotCaption.strInvalidSolanaTokenAddress, {
              parse_mode: "HTML",
              reply_markup: {
                force_reply: true,
                selective: true,
              },
            });
            return;
          }
      }
    } else {
      const isCA = await isValidSolanaAddress(msg.text);
      if (isCA) {
        console.log("CA------------->", msg.text);
      } else {
        return;
      }
    }
  } catch (error) {}
}
