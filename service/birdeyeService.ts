import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const BIRDEYE_API_KEY = process.env.BIRDEYE_API_KEY;

/********************************** Token Data Example
{
    "data": {
        "address": "EZ6QdXHkzi7MKj2u3Fwd7gUbq2pgJTDW1CbhoMhxpump",
        "decimals": 6,
        "symbol": "TTB",
        "name": "Trump The Builder",
        "marketCap": 4757.61438649097,
        "fdv": 4757.61438649097,
        "extensions": {
            "twitter": "https://x.com/realDonaldTrump",
            "website": "https://x.com/realDonaldTrump",
            "description": "Just A Building Trump"
        },
        "logoURI": "https://ipfs.io/ipfs/QmYKZitwMVAtUqRTNEA7C5VKVvMQzWii6d2h75Wohcw5rE",
        "liquidity": 0.435679538309231,
        "lastTradeUnixTime": 1739926864,
        "lastTradeHumanTime": "2025-02-19T01:01:04",
        "price": 0.0000047576190138903505,
        "history30mPrice": null,
        "priceChange30mPercent": null,
        "history1hPrice": null,
        "priceChange1hPercent": null,
        "history2hPrice": null,
        "priceChange2hPercent": null,
        "history4hPrice": null,
        "priceChange4hPercent": null,
        "history6hPrice": null,
        "priceChange6hPercent": null,
        "history8hPrice": null,
        "priceChange8hPercent": null,
        "history12hPrice": null,
        "priceChange12hPercent": null,
        "history24hPrice": null,
        "priceChange24hPercent": null,
        "uniqueWallet30m": 0,
        "uniqueWalletHistory30m": 0,
        "uniqueWallet30mChangePercent": null,
        "uniqueWallet1h": 0,
        "uniqueWalletHistory1h": 0,
        "uniqueWallet1hChangePercent": null,
        "uniqueWallet2h": 0,
        "uniqueWalletHistory2h": 0,
        "uniqueWallet2hChangePercent": null,
        "uniqueWallet4h": 0,
        "uniqueWalletHistory4h": 0,
        "uniqueWallet4hChangePercent": null,
        "uniqueWallet8h": 0,
        "uniqueWalletHistory8h": 0,
        "uniqueWallet8hChangePercent": null,
        "uniqueWallet24h": 0,
        "uniqueWalletHistory24h": 0,
        "uniqueWallet24hChangePercent": null,
        "supply": 999999027.370757,
        "totalSupply": 999999027.370757,
        "mc": 4757.61438649097,
        "circulatingSupply": 999999027.370757,
        "realMc": 4757.61438649097,
        "holder": 1,
        "trade30m": 0,
        "tradeHistory30m": 0,
        "trade30mChangePercent": null,
        "sell30m": 0,
        "sellHistory30m": 0,
        "sell30mChangePercent": null,
        "buy30m": 0,
        "buyHistory30m": 0,
        "buy30mChangePercent": null,
        "v30m": 0,
        "v30mUSD": 0,
        "vHistory30m": 0,
        "vHistory30mUSD": 0,
        "v30mChangePercent": null,
        "vBuy30m": 0,
        "vBuy30mUSD": 0,
        "vBuyHistory30m": 0,
        "vBuyHistory30mUSD": 0,
        "vBuy30mChangePercent": null,
        "vSell30m": 0,
        "vSell30mUSD": 0,
        "vSellHistory30m": 0,
        "vSellHistory30mUSD": 0,
        "vSell30mChangePercent": null,
        "trade1h": 0,
        "tradeHistory1h": 0,
        "trade1hChangePercent": null,
        "sell1h": 0,
        "sellHistory1h": 0,
        "sell1hChangePercent": null,
        "buy1h": 0,
        "buyHistory1h": 0,
        "buy1hChangePercent": null,
        "v1h": 0,
        "v1hUSD": 0,
        "vHistory1h": 0,
        "vHistory1hUSD": 0,
        "v1hChangePercent": null,
        "vBuy1h": 0,
        "vBuy1hUSD": 0,
        "vBuyHistory1h": 0,
        "vBuyHistory1hUSD": 0,
        "vBuy1hChangePercent": null,
        "vSell1h": 0,
        "vSell1hUSD": 0,
        "vSellHistory1h": 0,
        "vSellHistory1hUSD": 0,
        "vSell1hChangePercent": null,
        "trade2h": 0,
        "tradeHistory2h": 0,
        "trade2hChangePercent": null,
        "sell2h": 0,
        "sellHistory2h": 0,
        "sell2hChangePercent": null,
        "buy2h": 0,
        "buyHistory2h": 0,
        "buy2hChangePercent": null,
        "v2h": 0,
        "v2hUSD": 0,
        "vHistory2h": 0,
        "vHistory2hUSD": 0,
        "v2hChangePercent": null,
        "vBuy2h": 0,
        "vBuy2hUSD": 0,
        "vBuyHistory2h": 0,
        "vBuyHistory2hUSD": 0,
        "vBuy2hChangePercent": null,
        "vSell2h": 0,
        "vSell2hUSD": 0,
        "vSellHistory2h": 0,
        "vSellHistory2hUSD": 0,
        "vSell2hChangePercent": null,
        "trade4h": 0,
        "tradeHistory4h": 0,
        "trade4hChangePercent": null,
        "sell4h": 0,
        "sellHistory4h": 0,
        "sell4hChangePercent": null,
        "buy4h": 0,
        "buyHistory4h": 0,
        "buy4hChangePercent": null,
        "v4h": 0,
        "v4hUSD": 0,
        "vHistory4h": 0,
        "vHistory4hUSD": 0,
        "v4hChangePercent": null,
        "vBuy4h": 0,
        "vBuy4hUSD": 0,
        "vBuyHistory4h": 0,
        "vBuyHistory4hUSD": 0,
        "vBuy4hChangePercent": null,
        "vSell4h": 0,
        "vSell4hUSD": 0,
        "vSellHistory4h": 0,
        "vSellHistory4hUSD": 0,
        "vSell4hChangePercent": null,
        "trade8h": 0,
        "tradeHistory8h": 0,
        "trade8hChangePercent": null,
        "sell8h": 0,
        "sellHistory8h": 0,
        "sell8hChangePercent": null,
        "buy8h": 0,
        "buyHistory8h": 0,
        "buy8hChangePercent": null,
        "v8h": 0,
        "v8hUSD": 0,
        "vHistory8h": 0,
        "vHistory8hUSD": 0,
        "v8hChangePercent": null,
        "vBuy8h": 0,
        "vBuy8hUSD": 0,
        "vBuyHistory8h": 0,
        "vBuyHistory8hUSD": 0,
        "vBuy8hChangePercent": null,
        "vSell8h": 0,
        "vSell8hUSD": 0,
        "vSellHistory8h": 0,
        "vSellHistory8hUSD": 0,
        "vSell8hChangePercent": null,
        "trade24h": 0,
        "tradeHistory24h": 0,
        "trade24hChangePercent": null,
        "sell24h": 0,
        "sellHistory24h": 0,
        "sell24hChangePercent": null,
        "buy24h": 0,
        "buyHistory24h": 0,
        "buy24hChangePercent": null,
        "v24h": 0,
        "v24hUSD": 0,
        "vHistory24h": 0,
        "vHistory24hUSD": 0,
        "v24hChangePercent": null,
        "vBuy24h": 0,
        "vBuy24hUSD": 0,
        "vBuyHistory24h": 0,
        "vBuyHistory24hUSD": 0,
        "vBuy24hChangePercent": null,
        "vSell24h": 0,
        "vSell24hUSD": 0,
        "vSellHistory24h": 0,
        "vSellHistory24hUSD": 0,
        "vSell24hChangePercent": null,
        "numberMarkets": 1
    },
    "success": true
}
***********************************/

export async function getTokenOverview(tokenAddress: string) {
  const res = await axios.get(
    "https://public-api.birdeye.so/defi/token_overview",
    {
      params: { address: tokenAddress },
      headers: {
        accept: "application/json",
        "x-chain": "solana",
        "x-api-key": BIRDEYE_API_KEY,
      },
    }
  );
  if (res.data?.success) {
    return res.data?.data;
  } else {
    return null;
  }
}

export async function getWalletTokenList(walletAddress: string) {
  const res = await axios.get(
    "https://public-api.birdeye.so/v1/wallet/token_list",
    {
      params: { wallet: walletAddress },
      headers: {
        accept: "application/json",
        "x-chain": "solana",
        "x-api-key": BIRDEYE_API_KEY,
      },
    }
  );
  if (res.data?.success) {
    return res.data?.data;
  } else {
    return null;
  }
}