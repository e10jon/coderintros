// @flow

import React from 'react'
import {renderToStaticMarkup} from 'react-dom/server'

import Suggest from '../components/in-content/suggest'

const units = [
  <Suggest key='Suggest' />
]

const interval = 5

export default function (content: ?string) {
  if (!content) {
    return content
  }

  const contentEls = content.match(/<([A-Z][A-Z0-9]*)\b[^>]*>(.*?)<\/\1>/gi)

  if (!contentEls) {
    return content
  }

  const finalEls = []
  let unitI = 0

  contentEls.every((el, i) => {
    if (unitI < units.length && i >= interval && i % interval === 0) {
      const unit = units[unitI]

      if (Array.isArray(unit)) {
        unit.forEach(u => {
          finalEls.push(renderToStaticMarkup(u))
        })
      } else {
        finalEls.push(renderToStaticMarkup(unit))
      }

      unitI += 1
    }

    finalEls.push(el)

    return true
  })

  return finalEls.join('')
}
