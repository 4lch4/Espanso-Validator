import * as core from '@actions/core'
import { IOUtil, validatePackageFiles } from './lib'
const ioUtil = new IOUtil(process.env.GITHUB_WORKSPACE || '.')

const main = async () => {
  try {
    core.setOutput('timeStart', new Date().toTimeString())

    const packageNames = await ioUtil.getPackageNames()

    for (let x = 0; x < packageNames.length; x++) {
      const packageName = packageNames[x]
      const latestVersion = await ioUtil.getLatestVersionNumber(packageName)
      const packageFiles = await ioUtil.getPackageFiles(
        packageName,
        latestVersion
      )
      const validated = validatePackageFiles(packageFiles)

      if (validated.success) {
        core.info(`${packageName} is valid`)
      } else {
        core.info(`${packageName} is invalid + ${validated.error}`)
      }
    }

    core.setOutput('fileCount', packageNames.length)
  } catch (error) {
    // @ts-ignore
    core.setFailed(error.message)
  }
}

main()
  .then(() => core.info('done'))
  .catch(err => console.error(err))
