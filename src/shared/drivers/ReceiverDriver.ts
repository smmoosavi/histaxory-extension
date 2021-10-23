import { Driver, DriverAction } from './type';

export function receiverDriver(realDriver: Driver) {
  chrome.runtime.onMessage.addListener(function (
    request: DriverAction,
    sender,
    sendResponse,
  ) {
    switch (request.type) {
      case 'go-to-history-page': {
        realDriver.goToHistoryPage().then((res) => sendResponse(res));
        break;
      }
      case 'load-items': {
        realDriver.loadItems().then((res) => sendResponse(res));
        break;
      }
      case 'load-more': {
        realDriver.loadMore(request.payload.n).then((res) => sendResponse(res));
        break;
      }
      case 'handle-item': {
        realDriver
          .handleItem(request.payload.id)
          .then((res) => sendResponse(res));
        break;
      }
      case 'close-item': {
        realDriver.closeItem().then((res) => sendResponse(res));
        break;
      }
    }

    return true;
  });
}
