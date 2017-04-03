import {
  getFirst,
  getRelativePath,
  Image,
  tryOrReturn
} from 'helpers/wp-objects'

export default class {
  constructor (raw) { this.raw = getFirst(raw) }

  description () { return tryOrReturn(() => this.raw.description) }
  exists () { return !!this.raw }
  id () { return tryOrReturn(() => this.raw.id) }
  link () { return tryOrReturn(() => this.raw.link) }
  name () { return tryOrReturn(() => this.raw.name) }
  path () { return tryOrReturn(() => getRelativePath(this.raw.link), '/') }
  profilePicture (size) {
    return tryOrReturn(() => {
      return new Image({
        src: this.raw.profile_picture.sizes[size].source_url,
        alt: this.raw.profile_picture.alt_text
      })
    }, new Image())
  }
  url () { return tryOrReturn(() => this.raw.url) }
}
