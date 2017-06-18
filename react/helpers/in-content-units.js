// @flow

import React from 'react'
import {renderToStaticMarkup} from 'react-dom/server'

import Ad from '../components/ad'
import Suggest from '../components/in-content/suggest'

const units = [
  [
    <Ad
      height={250}
      hideAt={['md', 'lg']}
      key='Ad1'
      width={300}
    />,
    <Ad
      height={200}
      hideAt={['xs', 'sm']}
      key='Ad2'
      width='100%'
    />
  ],
  <Suggest key='Suggest' />,
  [
    <Ad
      height={250}
      hideAt={['md', 'lg']}
      key='Ad3'
      width={300}
    />,
    <Ad
      height={200}
      hideAt={['xs', 'sm']}
      key='Ad4'
      width='100%'
    />
  ]
]

const interval = 3

export default function (content: string) {
  const contentEls = content.match(/(<p.*?>.+?<\/p>)/gi)
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
