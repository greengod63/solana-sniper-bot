import TelegramBot from "node-telegram-bot-api";
import { hasUser } from "../service/userService";
import { isValidSolanaAddress } from "../utils";
import { BotCaption } from "../config/constants";
import { getIKSnipe } from "../components/inlineKeyboard";
import { sendIKSnipe } from "./botAction";
import { getTokenInformation } from "../service/birdeyeService";

export async function messageHandler(
  bot: TelegramBot,
  msg: TelegramBot.Message,
  userSnipeConfig: Map<number, any>
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

      console.log("isNumber------------>,", isNumber, text);
      const reply_message_id = reply_to_message.message_id;

      switch (text) {
        case BotCaption.strInputTokenAddress:
        case BotCaption.strInvalidSolanaTokenAddress:
          const isCA = await isValidSolanaAddress(msg.text);
          if (isCA) {
            const snipe_config = userSnipeConfig.get(chatId);
            console.log("Message snipe_config: ", snipe_config);
            const updated_config = { ...snipe_config, token: msg.text };
            userSnipeConfig.set(chatId, updated_config);
            // snipe_config.token = msg.text;
            const IK_SNIPE = getIKSnipe(updated_config);
            sendIKSnipe(bot, chatId, IK_SNIPE);
          } else {
            await bot.deleteMessage(chatId, msg.message_id);
            await bot.deleteMessage(chatId, reply_message_id);

            await bot.sendMessage(
              chatId,
              BotCaption.strInvalidSolanaTokenAddress,
              {
                parse_mode: "HTML",
                reply_markup: {
                  force_reply: true,
                  selective: true,
                },
              }
            );
            return;
          }
          break;
        case BotCaption.SET_PRIORITY_FEE.replace(/<[^>]*>/g, ""):
          console.log("priority fee");
          if (isNumber) {
            const snipe_config = userSnipeConfig.get(chatId);
            const updated_config = {
              ...snipe_config,
              snipe_fee: parseFloat(msg.text),
            };
            console.log("Message snipe_config: ", updated_config);
            userSnipeConfig.set(chatId, updated_config);
            const IK_SNIPE = getIKSnipe(updated_config);
            sendIKSnipe(bot, chatId, IK_SNIPE);
          } else {
            await bot.deleteMessage(chatId, msg.message_id);
            await bot.deleteMessage(chatId, reply_message_id);

            await bot.sendMessage(chatId, BotCaption.strInvalidInput);
          }
          break;
        case BotCaption.SET_JITOTIP.replace(/<[^>]*>/g, ""):
          console.log("jito tip");
          if (isNumber) {
            const snipe_config = userSnipeConfig.get(chatId);
            const updated_config = {
              ...snipe_config,
              snipe_tip: parseFloat(msg.text),
            };
            console.log("Message snipe_config: ", updated_config);
            userSnipeConfig.set(chatId, updated_config);
            const IK_SNIPE = getIKSnipe(updated_config);
            sendIKSnipe(bot, chatId, IK_SNIPE);
          } else {
            await bot.deleteMessage(chatId, msg.message_id);
            await bot.deleteMessage(chatId, reply_message_id);

            await bot.sendMessage(chatId, BotCaption.strInvalidInput);
          }
          break;
        case BotCaption.SET_SLIPPAGE.replace(/<[^>]*>/g, ""):
          console.log("slippage");
          if (isNumber) {
            const snipe_config = userSnipeConfig.get(chatId);
            const updated_config = {
              ...snipe_config,
              slippage: parseFloat(msg.text),
            };
            console.log("Message snipe_config: ", updated_config);
            userSnipeConfig.set(chatId, updated_config);
            const IK_SNIPE = getIKSnipe(updated_config);
            sendIKSnipe(bot, chatId, IK_SNIPE);
          } else {
            await bot.deleteMessage(chatId, msg.message_id);
            await bot.deleteMessage(chatId, reply_message_id);

            await bot.sendMessage(chatId, BotCaption.strInvalidInput);
          }
          break;
        case BotCaption.SET_TakeProfit.replace(/<[^>]*>/g, ""):
          console.log("take profit");
          if (isNumber) {
            const snipe_config = userSnipeConfig.get(chatId);
            const updated_config = {
              ...snipe_config,
              tp: parseFloat(msg.text),
            };
            console.log("Message snipe_config: ", updated_config);
            userSnipeConfig.set(chatId, updated_config);
            const IK_SNIPE = getIKSnipe(updated_config);
            sendIKSnipe(bot, chatId, IK_SNIPE);
          } else {
            await bot.deleteMessage(chatId, msg.message_id);
            await bot.deleteMessage(chatId, reply_message_id);

            await bot.sendMessage(chatId, BotCaption.strInvalidInput);
          }
          break;
        case BotCaption.SET_StopLoss.replace(/<[^>]*>/g, ""):
          console.log("priority fee");
          if (isNumber) {
            const snipe_config = userSnipeConfig.get(chatId);
            const updated_config = {
              ...snipe_config,
              sl: parseFloat(msg.text),
            };
            console.log("Message snipe_config: ", updated_config);
            userSnipeConfig.set(chatId, updated_config);
            const IK_SNIPE = getIKSnipe(updated_config);
            sendIKSnipe(bot, chatId, IK_SNIPE);
          } else {
            await bot.deleteMessage(chatId, msg.message_id);
            await bot.deleteMessage(chatId, reply_message_id);

            await bot.sendMessage(chatId, BotCaption.strInvalidInput);
          }
          break;
        case BotCaption.SET_SNIPE_AMOUNT.replace(/<[^>]*>/g, ""):
          console.log("snipe amount");
          if (isNumber) {
            const snipe_config = userSnipeConfig.get(chatId);
            const updated_config = {
              ...snipe_config,
              snipe_amount: parseFloat(msg.text),
            };
            console.log("Message snipe_config: ", updated_config);
            userSnipeConfig.set(chatId, updated_config);
            const IK_SNIPE = getIKSnipe(updated_config);
            sendIKSnipe(bot, chatId, IK_SNIPE);
          } else {
            await bot.deleteMessage(chatId, msg.message_id);
            await bot.deleteMessage(chatId, reply_message_id);

            await bot.sendMessage(chatId, BotCaption.strInvalidInput);
          }
          break;
      }
    } else {
      const isCA = await isValidSolanaAddress(msg.text);
      if (isCA) {
        const tokenInfo = await getTokenInformation(msg.text);
        
        const caption = `Name (Symbol): ${tokenInfo.name} (${tokenInfo.symbol})\nPrice: ${tokenInfo.price}\nMarketCap: ${tokenInfo.marketCap}`;

        const snipe_config = userSnipeConfig.get(chatId);
        console.log("Message snipe_config: ", snipe_config);
        const updated_config = { ...snipe_config, token: msg.text };
        userSnipeConfig.set(chatId, updated_config);
        // snipe_config.token = msg.text;
        const IK_SNIPE = getIKSnipe(updated_config);
        sendIKSnipe(bot, chatId, IK_SNIPE, caption);
      } else {
        return;
      }
    }
  } catch (error) {}
}
