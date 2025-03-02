import { getShortenedCA } from "../utils";

// Start Inline Keyboard
export const IK_START = [
  [
    {
      text: "📥 Buy",
      callback_data: "BUY",
    },
    {
      text: "📤 Sell",
      callback_data: "SELL",
    },
  ],
  [
    {
      text: "⚙ Settings",
      callback_data: "SETTINGS",
    },
  ],
  [
    {
      text: "🔎 Snipe",
      callback_data: "SNIPE_SETTINGS",
    },
  ],
];

// Snipe Inline Keyboard
export function getIKSnipe({
  token = null,
  slippage = 50,
  snipe_fee = 0.005,
  snipe_tip = 0.005,
  tp = null,
  sl = null,
  snipe_amount = null,
}: {
  token: string | null;
  slippage: number;
  snipe_fee: number;
  snipe_tip: number;
  tp: number | null;
  sl: number | null;
  snipe_amount: number | null;
}): any {
  const IK_SNIPE = [
    [
      {
        text: "🔙 Back",
        callback_data: "BACK",
      },
      {
        text: "🔃 Refresh",
        callback_data: "REFRESH",
      },
    ],
    [
      {
        text: `${token ? "🟢" : "🔴"} Token: ${
          token ? getShortenedCA(token) : "---"
        }`,
        callback_data: `TOKEN-${token}`,
      },
    ],
    [
      {
        text: `Snipe Fee: ${snipe_fee} SOL`,
        callback_data: `SNIPE_FEE-${snipe_fee}`,
      },
      {
        text: `Snipe Tip: ${snipe_tip} SOL`,
        callback_data: `SNIPE_TIP-${snipe_tip}`,
      },
    ],
    [
      {
        text: `Slippage: ${slippage}%`,
        callback_data: `SLIPPAGE-${slippage}%`,
      },
    ],
    [
      {
        text: `${tp ? "🟢" : "🔴"} Take Profit(TP): ${tp ? tp : "---"} %`,
        callback_data: `TP-${tp ? tp : "null"}`,
      },
      {
        text: `${sl ? "🟢" : "🔴"} Stop Loss(SL): ${sl ? sl : "---"} %`,
        callback_data: `SL-${sl ? sl : "null"}`,
      },
    ],
    [
      {
        text: `${snipe_amount == 0.2 ? "✅ " : ""}Snipe 0.2 SOL`,
        callback_data: `SNIPE-0.2`,
      },
      {
        text: `${snipe_amount == 0.5 ? "✅ " : ""}Snipe 0.5 SOL`,
        callback_data: `SNIPE-0.5`,
      },
    ],
    [
      {
        text: `${snipe_amount == 1 ? "✅ " : ""}Snipe 1 SOL`,
        callback_data: `SNIPE-1`,
      },
      {
        text: `${
          snipe_amount &&
          snipe_amount != 0.2 &&
          snipe_amount != 0.5 &&
          snipe_amount != 1
            ? "✅ "
            : ""
        }Snipe ${snipe_amount ? snipe_amount : "X"} SOL`,
        callback_data: `SNIPE-${snipe_amount}`,
      },
    ],
    [
      {
        text: `🎯 Create a snipe`,
        callback_data: `CREATE_SNIPE`,
      },
    ],
    [
      {
        text: `📃 Created Snipes`,
        callback_data: `LIST_SNIPE`,
      },
    ],
  ];

  return IK_SNIPE;
}
