import TelegramBot from "node-telegram-bot-api";
import { hasUser, createUser } from "../service/userService";
import { getIKSnipe } from "../components/inlineKeyboard";
import fs from "fs";
import { BotCaption } from "../config/constants";
import { sendIKSnipe } from "./botAction";
import { createSwap } from "../service/swapService";
import { isValidSnipeConfig } from "../utils";

export async function callbackQueryHandler(
  bot: TelegramBot,
  cb_query: TelegramBot.CallbackQuery,
  userSnipeConfig: Map<number, any>
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
    case "SNIPE_SETTINGS": // Snipe Button
      const snipe_config = userSnipeConfig.get(chatId);
      console.log("Callback snipe_config: ", snipe_config);

      const IK_SNIPE = getIKSnipe(snipe_config);
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
          selective: true,
        },
      });
      break;
    case "SNIPE_FEE": //Snipe fee Button
      await bot.sendMessage(chatId, BotCaption.SET_PRIORITY_FEE, {
        parse_mode: "HTML",
        reply_markup: {
          force_reply: true,
          selective: true,
        },
      });
      break;
    case "SNIPE_TIP": //Snipe tip Button
      await bot.sendMessage(chatId, BotCaption.SET_JITOTIP, {
        parse_mode: "HTML",
        reply_markup: {
          force_reply: true,
          selective: true,
        },
      });
      break;
    case "SLIPPAGE": //Slippage Button
      await bot.sendMessage(chatId, BotCaption.SET_SLIPPAGE, {
        parse_mode: "HTML",
        reply_markup: {
          force_reply: true,
          selective: true,
        },
      });
      break;
    case "TP": //TP Button
      await bot.sendMessage(chatId, BotCaption.SET_TakeProfit, {
        parse_mode: "HTML",
        reply_markup: {
          force_reply: true,
          selective: true,
        },
      });
      break;
    case "SL": //SL Button
      await bot.sendMessage(chatId, BotCaption.SET_StopLoss, {
        parse_mode: "HTML",
        reply_markup: {
          force_reply: true,
          selective: true,
        },
      });
      break;
    case "SNIPE": //Snipe-[x] Button
      const amount = cb_query_cmd.split("-")[1];
      if (amount == "0.2" || amount == "0.5" || amount == "1") {
        const snipe_config = userSnipeConfig.get(chatId);
        const updated_config = {
          ...snipe_config,
          snipe_amount: parseFloat(amount),
        };
        console.log("Message snipe_config: ", updated_config);
        userSnipeConfig.set(chatId, updated_config);
        const IK_SNIPE = getIKSnipe(updated_config);
        sendIKSnipe(bot, chatId, IK_SNIPE);
      } else {
        await bot.sendMessage(chatId, BotCaption.SET_SNIPE_AMOUNT, {
          parse_mode: "HTML",
          reply_markup: {
            force_reply: true,
            selective: true,
          },
        });
      }
      break;
    case "REFRESH": //Refresh Button
      // Snipe Config Init
      const init_snipe_config: any = {
        token: null,
        slippage: 50,
        snipe_fee: 0.005,
        snipe_tip: 0.005,
        tp: null,
        sl: null,
        snipe_amount: null,
      };

      console.log("Message snipe_config Refresh: ", init_snipe_config);
      userSnipeConfig.set(chatId, init_snipe_config);
      const INIT_IK_SNIPE = getIKSnipe(init_snipe_config);
      sendIKSnipe(bot, chatId, INIT_IK_SNIPE);
      break;
    case "CREATE_SNIPE": //Create Snipe Button
      const new_snipe_config = userSnipeConfig.get(chatId);
      const isValid = isValidSnipeConfig(new_snipe_config);
      if (isValid) {
        await createSwap(new_snipe_config, chatId)
      } else {
        await bot.sendMessage(chatId, BotCaption.SNIPE_CONFIG_FAILED, {
          parse_mode: "HTML",
        });
      }
      break;
    default:
      break;
  }
}
