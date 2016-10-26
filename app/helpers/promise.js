/**
 * Wrapper for promises to make them cancelable. Example:
 * https://gist.github.com/rwhitmire/f4422e0284614b96ff8459fa1e2ce75b
 */

export function makeCancelable(promise) {
  let hasCanceled_ = false

  const wrappedPromise = new Promise((resolve, reject) => {
    promise.then((val) =>
      hasCanceled_ ? reject({isCanceled: true}) : resolve(val)
    )
    promise.catch((error) =>
      hasCanceled_ ? reject({isCanceled: true}) : reject(error)
    )
  })

  return {
    promise: wrappedPromise,
    cancel() {
      hasCanceled_ = true
    }
  }
}
