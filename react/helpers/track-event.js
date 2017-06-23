// @flow

export default function (opts: {eventCategory: string, eventAction: string, eventLabel?: string, eventValue?: number, hitType?: string} = {eventCategory: 'default', eventAction: 'default'}) {
  opts.hitType = 'event'
  window.ga('send', opts)
}
