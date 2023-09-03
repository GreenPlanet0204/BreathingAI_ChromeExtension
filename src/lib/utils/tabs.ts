export async function getCurrentTab() {
  let queryOptions = {
    active: true,
    lastFocusedWindow: true,
    currentWindow: true,
  };
  // `tab` will either be a `tabs.Tab` instance or `undefined`.
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

export async function getAllTabs() {
  let queryOptions = {};
  // `tab` will either be a `tabs.Tab` instance or `undefined`.
  let tabs = await chrome.tabs.query(queryOptions);
  return tabs;
}
