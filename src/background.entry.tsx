import { isTargetHost } from 'src/shared/host-utils';

chrome.action.onClicked.addListener(function (tab) {
  if (!isTargetHost(tab.url ?? '')) {
    return;
  }
  chrome.windows.create({
    url:
      chrome.runtime.getURL('popup.html') + '?' + tab.windowId + '/' + tab.id,
    type: 'popup',
    width: 400,
    height: 600,
  });
});

export {};
