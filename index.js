const core = require('@actions/core')
const github = require('@actions/github')
const { readdir, stat } = require('fs-extra')
const { join } = require('path')
const packagesDir = join(process.env.GITHUB_WORKSPACE, 'packages')

const main = async () => {
  try {
    // `who-to-greet` input defined in action metadata file
    core.info(`attempting with packagesDir = ${packagesDir}`)
    const nameToGreet = core.getInput('who-to-greet')
    console.log(`Hello ${nameToGreet}!`)

    const time = new Date().toTimeString()
    core.setOutput('time', time)

    const packageNames = await readdir(packagesDir)

    core.info(`Found ${packageNames.length} packages...`)

    for (const packageName in packageNames) {
      const packagePath = join(packagesDir, packageName)
      const packageStat = await stat(packagePath)

      core.info(`Found package ${packageName} with size ${packageStat.size}`)
    }

    core.setOutput('fileCount', files.length)

    // Get the JSON webhook payload for the event that triggered the workflow
    const payload = JSON.stringify(github.context.payload, undefined, 2)
    console.log(`The event payload: ${payload}`)
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
