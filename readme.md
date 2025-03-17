# Lucky Solana Sniper bot

## Features
- ⚡️ Typescript
- ⚛️ Telegram Bot using node-telegram-bot-api
- ✨ Birdeye API
- 💨 Solana Web3


## Getting Started

### 1. Clone this template using one of the three ways

```bash
git clone https://github.com/greengod63/solana-sniper-bot.git
cd solana-sniper-bot
```

### 2. Install dependencies

I used **npm** as a node package manager.

```bash
npm install
```

### 3. Set .env
Create a `.env` file in the project root:
```env
TELEGRAM_BOT_TOKEN=""
BIRDEYE_API_KEY=""
SOLANA_RPC_URL=""
BOT_WALLET_PUBLIC_KEY=""
```

> **💡 Pro Tip:** 
> - Obtain an API key from Helius or another Solana RPC provider for optimal performance
> - Default RPC endpoints are available as fallback options

### 4. Configure project

`config` folder contains several main config settings for this project.

### 5. Run the project

You can start the server using this command:

```bash
npm start
```

### 6. Project Structure
- `index.ts`: Main code for this project.
- `config/`: Contains the settings for this project.
- `bot/`: Contains the code such as `MessageHandler` or `CallBackQueryHandler` to control the Telegram bot.
- `components/`: Defines InlineKeyboards that are main parts of Telegram Bot UI.
- `module/`: Defines MongoDB Schema.
- `service/`: CRUD actions to interact with MongoDB.
- `public/`: Public Assets such as images.
- `swap/`: Buy/Sell Script SPL tokens on Solana.
- `utils/`: Various useful functions.
- `.env`: Needed Env values.
- `package.json`: Project metadata and dependencies.
- `tsconfig.json`: TypeScript configuration file.

## Contributing
Contributions are welcome! Please fork the repository and submit a pull request with your improvements.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a pull request

## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Tips
`hYn1ZbfAdhSgwezgVADHR6nNzGWe7F71JGVdFvqk8L3`


> **🎯 This is not a completed project. Now I am developing continuously.** 
