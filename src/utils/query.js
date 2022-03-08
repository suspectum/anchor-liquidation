export function _query(lcd, contractAddress, queryMsg) {
  return lcd.wasm.contractQuery(contractAddress, queryMsg);
}
