import { receiverDriver, snappDriver, tapsiDriver } from 'src/shared/drivers';
import { isSnapp, isTapsi } from 'src/shared/host-utils';

if (isTapsi(window.location.href)) {
  receiverDriver(tapsiDriver);
}
if (isSnapp(window.location.href)) {
  receiverDriver(snappDriver);
}

export {};
