export interface Defer<T> {
  promise: Promise<T>;
  resolve: (value: T | PromiseLike<T>) => void;
  reject: (reason?: any) => void;
}

export function defer<T>(): Defer<T> {
  const deferred: Defer<T> = {} as Defer<T>;
  deferred.promise = new Promise<T>(function (resolve, reject) {
    deferred.resolve = resolve;
    deferred.reject = reject;
  });
  return deferred;
}
