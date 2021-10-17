chrome.action.onClicked.addListener(function (tab) {
  chrome.windows.create({
    url: chrome.runtime.getURL('popup.html') + '?' + tab.id,
    type: 'popup',
    width: 400,
    height: 600,
  });
});

export {};
