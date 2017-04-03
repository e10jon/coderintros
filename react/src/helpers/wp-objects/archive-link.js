import { getFirst, tryOrReturn, getRelativePath } from 'helpers/wp-objects'

export default class {
  constructor (raw) { this.raw = getFirst(raw) }

  exists () { return !!this.raw }
  id () { return tryOrReturn(() => this.raw.title) }
  path () { return tryOrReturn(() => getRelativePath(this.raw.link), '/') }
  title () { return tryOrReturn(() => this.raw.title) }
}
