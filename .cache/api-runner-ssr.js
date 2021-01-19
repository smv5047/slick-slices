var plugins = [{
      plugin: require('/Users/stevenvandenburg/Desktop/Projects/slick-slices-FE/node_modules/gatsby-plugin-styled-components/gatsby-ssr'),
      options: {"plugins":[]},
    },{
      plugin: require('/Users/stevenvandenburg/Desktop/Projects/slick-slices-FE/node_modules/gatsby-source-sanity/gatsby-ssr'),
      options: {"plugins":[],"projectId":"i8pmz3lb","dataset":"production","watchMode":true,"token":"skalQfJM588UMsdKkwyhXo3X8EPDHusnt0AOGCaj519b54uIpvd5pt6UrzqyslNBZIMsJum96fgpSVeiWYFCrJ0qNmjswwY6xROg0iC955O462Yqt4IvQqbscm0bPJlWKO4eU6e93tu5ZW1BS60q8h6Jr5cUFWCpnhGNIEK9fVSkmLVDL06G"},
    },{
      plugin: require('/Users/stevenvandenburg/Desktop/Projects/slick-slices-FE/gatsby-ssr'),
      options: {"plugins":[]},
    }]
// During bootstrap, we write requires at top of this file which looks like:
// var plugins = [
//   {
//     plugin: require("/path/to/plugin1/gatsby-ssr.js"),
//     options: { ... },
//   },
//   {
//     plugin: require("/path/to/plugin2/gatsby-ssr.js"),
//     options: { ... },
//   },
// ]

const apis = require(`./api-ssr-docs`)

// Run the specified API in any plugins that have implemented it
module.exports = (api, args, defaultReturn, argTransform) => {
  if (!apis[api]) {
    console.log(`This API doesn't exist`, api)
  }

  // Run each plugin in series.
  // eslint-disable-next-line no-undef
  let results = plugins.map(plugin => {
    if (!plugin.plugin[api]) {
      return undefined
    }
    const result = plugin.plugin[api](args, plugin.options)
    if (result && argTransform) {
      args = argTransform({ args, result })
    }
    return result
  })

  // Filter out undefined results.
  results = results.filter(result => typeof result !== `undefined`)

  if (results.length > 0) {
    return results
  } else {
    return [defaultReturn]
  }
}
