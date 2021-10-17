export function isSnapp(url: string) {
  return url.startsWith('https://app.snapp.taxi/');
}
export function isTapsi(url: string) {
  return url.startsWith('https://app.tapsi.cab/');
}

export function isTargetHost(url: string) {
  return isSnapp(url) || isTapsi(url);
}
