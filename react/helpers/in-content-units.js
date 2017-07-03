// @flow

import React from 'react'
import {renderToStaticMarkup} from 'react-dom/server'
import stripTags from 'striptags'

import Newsletter from '../components/in-content/newsletter'
import Suggest from '../components/in-content/suggest'

const createUnits = (context?: Object) => [
  <Suggest key='Suggest' />,
  <Newsletter
    formAction={context && context.siteData && context.siteData.mailchimp_newsletter_url}
    frequencyGroup={context && context.siteData && context.siteData.mailchimp_frequency_group}
    key='Newsletter'
  />
]

// after how many chars should we insert a unit?
const charsInterval = 2000

const createWrappedUnit = (unit: Object) => <div className='my3 clear'>{unit}</div>

export default function (content: ?string, {context}: {context?: Object} = {}) {
  if (!content) {
    return content
  }

  // match all of the children-level elements (p, div, blockquote, etc)
  const contentEls = content.match(/<([A-Z][A-Z0-9]*)\b[^>]*>(.*?)<\/\1>/gi)

  if (!contentEls) {
    return content
  }

  const units = createUnits(context)
  const finalEls = []
  let [unitI, charsI] = [0, 0]

  contentEls.every((el, i) => {
    if (unitI < units.length && charsI >= charsInterval) {
      const unit = units[unitI]

      if (Array.isArray(unit)) {
        unit.forEach(u => {
          finalEls.push(renderToStaticMarkup(createWrappedUnit(u)))
        })
      } else {
        finalEls.push(renderToStaticMarkup(createWrappedUnit(unit)))
      }

      unitI += 1
      charsI = 0
    } else {
      charsI += stripTags(el).length
    }

    finalEls.push(el)

    return true
  })

  return finalEls.join('')
}
