export const copy2clipboard = (text: string) => {
  return `<code class="text-entity-code clickable" role="textbox" tabindex="0" data-entity-type="MessageEntityCode">${text}</code>`;
};

export const isValidSolanaAddress = async (ca: string) => {
  // Remove any whitespace and potential URL components
  const cleanCA = ca.trim().split("/").pop() || "";

  // Solana address regex pattern - matches 32-44 base58 characters
  const contractAddressMatch = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/;

  return contractAddressMatch.test(cleanCA);
};

export const getShortenedCA = (ca: string) => {
  // Get the first 6 letters
  const firstSixLetters = ca.slice(0, 6);

  // Get the last 6 letters
  const lastSixLetters = ca.slice(-6);

  return firstSixLetters + "..." + lastSixLetters;
};

export const isValidSnipeConfig = (snipe_config: any) => {
  if (
    snipe_config.token != null &&
    snipe_config.slippage > 0.0 &&
    snipe_config.snipe_fee > 0.0 &&
    snipe_config.snipe_tip > 0.0 &&
    snipe_config.tp != null &&
    snipe_config.sl != null &&
    snipe_config.snipe_amount != null
  ) {
    return true;
  } else {
    return false;
  }
};
