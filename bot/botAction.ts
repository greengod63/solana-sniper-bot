import TelegramBot from "node-telegram-bot-api";
import fs from "fs";

export async function sendIKSnipe(
  bot: TelegramBot,
  chatId: number,
  IK_SNIPE: any,
  caption?: string
) {
  const image = fs.createReadStream("./public/sniper.jpg");

  if (!caption) {
    caption = `⬇You can create a new snipe or check current active snipes!🔍`;
  }
  
  await bot.sendPhoto(chatId, image, {
    parse_mode: "HTML",
    caption: caption,
    reply_markup: {
      inline_keyboard: IK_SNIPE,
    },
  });
}
