import fs from 'fs'

export const extractCssAndJsFromManifest = () => {
  try {
    const assetManifest = JSON.parse(fs.readFileSync(`${process.env.NODE_ENV === 'development' ? '' : 'dist/browser/'}webpack-manifest.json`))
    const cssUrls = Object.keys(assetManifest).filter(k => /\.css$/.test(k)).map(k => ({id: k, url: assetManifest[k]}))
    const jsUrls = Object.keys(assetManifest).filter(k => /\.js$/.test(k)).map(k => ({id: k, url: assetManifest[k]}))
    return [cssUrls, jsUrls]
  } catch (err) {
    // the manifest is probably still compiling
    return []
  }
}

export const convertCssUrlsToInlineStyles = cssUrls => {
  if (!cssUrls) {
    return
  }

  const inlineCss = []
  if (process.env.NODE_ENV !== 'development') {
    cssUrls.forEach(({id, url}) => {
      const css = fs.readFileSync(`.${url}`, 'utf8').replace(/sourceMappingURL=/, 'sourceMappingURL=/dist/browser/')
      inlineCss.push({id, css})
    })
  }
  return inlineCss
}
