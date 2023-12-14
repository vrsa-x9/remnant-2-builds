// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`
const fs = require('fs')



module.exports = function (api) {
  api.loadSource(({ addCollection }) => {
    // Use the Data Store API here: https://gridsome.org/docs/data-store-api/
  })

  api.createPages(({ createPage }) => {
    // Use the Pages API here: https://gridsome.org/docs/pages-api/
    createPage({
      path: '/build/:id(\\d+)',
      component: './src/templates/Build.vue'
    })
  })

  


  api.afterBuild(({ redirects }) => {
    // Redirect rules
    if (redirects) {
      let rules = []
      for (const rule of redirects) {
        rules.push(`${rule.from}\t${rule.to}\t${rule.status}`)
      }
      fs.appendFileSync('./dist/_redirects', rules.join('\n'))
    }
  }) 
}
