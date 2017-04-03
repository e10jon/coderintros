import URL from 'url'

import ArchiveLink from 'helpers/wp-objects/archive-link'
import Comment from 'helpers/wp-objects/comment'
import Image from 'helpers/wp-objects/image'
import Post from 'helpers/wp-objects/post'
import Taxonomy from 'helpers/wp-objects/taxonomy'
import User from 'helpers/wp-objects/user'

export const getFirst = raw => Array.isArray(raw) ? raw[0] : raw

export const getRelativePath = inputUrl => {
  const parsed = URL.parse(inputUrl)
  return `${parsed.path}${parsed.search || ''}${parsed.hash || ''}`
}

export const tryOrReturn = (func, catchVal) => {
  try {
    return func()
  } catch (e) {
    return catchVal || null
  }
}

export { ArchiveLink, Comment, Image, Post, Taxonomy, User }
