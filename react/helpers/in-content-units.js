// @flow

import React from 'react'
import {renderToStaticMarkup} from 'react-dom/server'

import Ad from '../components/ad'
import Suggest from '../components/in-content/suggest'

const units = [
  [
    <Ad
      className='my3 mx-auto'
      height={250}
      key='Ad1'
      showAt={['xs', 'sm']}
      width={300}
    />,
    <Ad
      className='my3'
      height={200}
      key='Ad2'
      showAt={['md', 'lg']}
      width='100%'
    />
  ],
  <Suggest key='Suggest' />,
  [
    <Ad
      className='my3 mx-auto'
      height={250}
      key='Ad3'
      showAt={['xs', 'sm']}
      width={300}
    />,
    <Ad
      className='my3'
      height={200}
      key='Ad4'
      showAt={['md', 'lg']}
      width='100%'
    />
  ]
]

const interval = 3

export default function (content: string, {skip = false}: Object) {
  if (skip) {
    return content
  }

  const contentEls = content.match(/(<p.*?>.+?<\/p>)/gi)

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
