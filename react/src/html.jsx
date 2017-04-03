import React, { PropTypes } from 'react'
import serialize from 'serialize-javascript'

const Html = props => {
  const { helmet, inlineCss, rootString, finalState, resolvedData, cssUrls, jsUrls } = props

  return (
    <html>
      <head>
        <meta charSet='utf-8' />
        <meta
          content='width=device-width,minimum-scale=1,initial-scale=1,maximum-scale=1,shrink-to-fit=no,user-scalable=no'
          name='viewport'
        />
        {helmet.title.toComponent()}
        {helmet.meta.toComponent()}
        {helmet.link.toComponent()}
        {helmet.script.toComponent()}
        {inlineCss.map(({id, css}) => (
          <style
            dangerouslySetInnerHTML={{__html: css}}
            key={`InlineCSS${id}`}
          />
        ))}
      </head>
      <body>
        <div
          dangerouslySetInnerHTML={{__html: rootString}}
          id='root'
        />
        <script
          dangerouslySetInnerHTML={{__html: `window.__state = ${serialize(finalState)};`}}
          type='text/javascript'
        />
        <script
          dangerouslySetInnerHTML={{__html: `window.__REACT_RESOLVER_PAYLOAD__ = ${serialize(resolvedData)};`}}
          type='text/javascript'
        />
        {(inlineCss.length ? [] : cssUrls).map(({id, url}) => (
          <link
            href={url}
            key={`CssUrl${id}`}
            rel='stylesheet'
            type='text/css'
          />
        ))}
        {jsUrls.map(({id, url}) => (
          <script
            key={`JsUrl${id}`}
            src={url}
            type='text/javascript'
          />
        ))}
      </body>
    </html>
  )
}

Html.propTypes = {
  cssUrls: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  finalState: PropTypes.shape().isRequired,
  helmet: PropTypes.shape().isRequired,
  inlineCss: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  jsUrls: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  resolvedData: PropTypes.shape().isRequired,
  rootString: PropTypes.string.isRequired
}

export default Html
