import dateFormat from 'date-fns/format'

import { getFirst, tryOrReturn, getRelativePath } from 'helpers/wp-objects'

export default class {
  constructor (raw) { this.raw = getFirst(raw) }

  authorName () { return tryOrReturn(() => this.raw.author_name) }
  content () { return tryOrReturn(() => this.raw.content.rendered) }
  date (format) { return tryOrReturn(() => dateFormat(this.raw.date, format || 'MMM DD, YYYY')) }
  exists () { return !!this.raw }
  id () { return tryOrReturn(() => this.raw.id) }
  path () { return tryOrReturn(() => getRelativePath(this.raw.link), '/') }
}
