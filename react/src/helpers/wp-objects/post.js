import dateFormat from 'date-fns/format'
import striptags from 'striptags'

import {
  Comment,
  getFirst,
  getRelativePath,
  Image,
  Taxonomy,
  tryOrReturn,
  User
} from 'helpers/wp-objects'

export default class {
  constructor (raw) { this.raw = getFirst(raw) }

  author () { return tryOrReturn(() => new User(this.raw._embedded.author), new User()) }
  categories () { return tryOrReturn(() => this.raw._embedded['wp:term'].find(a => a[0].taxonomy === 'category').map(raw => new Taxonomy(raw)), []) }
  comments () { return tryOrReturn(() => this.raw._embedded.replies[0].map(raw => new Comment(raw)), []) }
  commentStatus () { return tryOrReturn(() => this.raw.comment_status) }
  content () { return tryOrReturn(() => this.raw.content.rendered) }
  date (format) { return tryOrReturn(() => dateFormat(this.raw.date, format || 'MMM DD, YYYY')) }
  excerpt () { return tryOrReturn(() => striptags(this.raw.excerpt.rendered)) }
  exists () { return !!this.raw }
  featuredImage (sizes) {
    return tryOrReturn(() => {
      const size = (Array.isArray(sizes) ? sizes : [sizes]).find(size => this.raw._embedded['wp:featuredmedia'][0].media_details.sizes[size])
      return new Image({
        src: this.raw._embedded['wp:featuredmedia'][0].media_details.sizes[size].source_url,
        alt: this.raw._embedded['wp:featuredmedia'][0].alt_text
      })
    }, new Image())
  }
  id () { return tryOrReturn(() => this.raw.id) }
  link () { return tryOrReturn(() => this.raw.link) }
  navTitle () { return tryOrReturn(() => this.raw.nav_title || this.title()) }
  path () { return tryOrReturn(() => getRelativePath(this.raw.link), '/') }
  subtitle () { return tryOrReturn(() => this.raw.subtitle) }
  tags () { return tryOrReturn(() => this.raw._embedded['wp:term'].find(a => a[0].taxonomy === 'post_tag').map(raw => new Taxonomy(raw)), []) }
  title () { return tryOrReturn(() => this.raw.title.rendered) }
  type () { return tryOrReturn(() => this.raw.type) }
}
