// @flow

/* global SENTRY_DSN_REACT */

import React from 'react'
import NextDocument, {Head, Main, NextScript} from 'next/document'

import favicons from '../helpers/favicons'
import {fbInit, gaInit} from '../helpers/raw'

class Document extends NextDocument {
  static displayName = 'Document'

  render () {
    const {siteData} = this.props.__NEXT_DATA__.props

    return (
      <html>
        <Head>
          <meta
            content={siteData.facebook_app_id}
            property='fb:app_id'
          />

          <meta
            content='width=device-width,initial-scale=1'
            name='viewport'
          />

          <link
            href='https://fonts.googleapis.com/css?family=Lora:400,700|Overpass:400,800'
            rel='stylesheet'
          />

          {favicons(siteData.images)}

          {SENTRY_DSN_REACT && [
            <script
              crossOrigin='anonymous'
              key='SentryLoadJS'
              src='https://cdn.ravenjs.com/3.16.1/raven.min.js'
            />,
            <script
              dangerouslySetInnerHTML={{__html: `Raven.config('${SENTRY_DSN_REACT}').install();`}}
              key='SentryConfig'
            />
          ]}

          <script
            dangerouslySetInnerHTML={{__html: gaInit(siteData.ga_tracking_id, {
              autoLink: siteData.sites
            })}}
          />
          <script
            async
            src='/static/js/autotrack.custom.js'
          />
        </Head>

        <body>
          <div id='fb-root' />
          <script dangerouslySetInnerHTML={{__html: fbInit(siteData.facebook_app_id)}} />

          <Main />

          <NextScript />
        </body>
      </html>
    )
  }
}

export default Document
