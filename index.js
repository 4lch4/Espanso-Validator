const core = require('@actions/core')
const github = require('@actions/github')
const { readdir, stat } = require('fs-extra')
const { join } = require('path')
const packagesDir = join(process.env.GITHUB_WORKSPACE, 'packages')

const main = async () => {
  try {
    core.debug(`attempting with packagesDir = ${packagesDir}`)

    core.setOutput('timeStart', new Date().toTimeString())

    const packageNames = await readdir(packagesDir)

    core.info(`Found ${packageNames.length} packages...`)

    for (let x = 0; x < packageNames.length; x++) {
      const packageName = packageNames[x]
      const packageDir = join(packagesDir, packageName)
      const packageStat = await stat(packageDir)

      core.info(`Found package ${packageName} with size ${packageStat.size}`)
    }

    // for (const packageName of packageNames) {
    //   const packagePath = join(packagesDir, packageName)
    //   core.debug(`attempting with packagePath = ${packagePath}`)
    //   const packageStat = await stat(packagePath)

    //   core.debug(`Found package ${packageName} with size ${packageStat.size}`)
    // }

    core.setOutput('fileCount', packageNames.length) 
  } catch (error) {
    core.setFailed(error.message)
  }
}

main()
  .then(res => {
    core.info(res)
    core.info('done')
  })
  .catch(err => console.error(err))
