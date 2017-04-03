import { getFirst, tryOrReturn } from 'helpers/wp-objects'

export default class {
  constructor (raw) { this.raw = getFirst(raw) }

  alt () { return tryOrReturn(() => this.raw.alt) }
  exists () { return !!this.raw }
  src () { return tryOrReturn(() => this.raw.src) }
}
