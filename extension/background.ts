let indexTabId: number;

chrome.action.onClicked.addListener(async () => {
  if (indexTabId) return;
  const { id } = await chrome.tabs.create({
    url: "index.html",
  });

  indexTabId = id;
});

chrome.tabs.onRemoved.addListener((tabId) => {
  if (indexTabId === tabId) indexTabId = undefined;
});
