// @flow

type Opts = {
  eventCategory?: string,
  eventAction?: string,
  eventLabel?: string,
  eventValue?: number,
  hitType?: string,
  socialNetwork?: string,
  socialAction?: string,
  socialTarget?: string
}

export default function (opts: Opts) {
  opts.hitType = opts.hitType || 'event'
  window.ga('send', opts)
}
