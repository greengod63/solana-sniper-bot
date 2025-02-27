import TelegramBot from 'node-telegram-bot-api';
import fs from 'fs';

export async function sendIKSnipe(bot: TelegramBot, chatId: number, IK_SNIPE: any) {
  const image = fs.createReadStream("./public/sniper.jpg");
  const caption = `⬇You can create a new snipe or check current active snipes!🔍`;
  await bot.sendPhoto(chatId, image, {
    parse_mode: "HTML",
    caption: caption,
    reply_markup: {
      inline_keyboard: IK_SNIPE,
    },
  });
}
