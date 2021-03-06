import * as core from '@actions/core'
import { IOUtil, validatePackageFiles } from './lib'
const ioUtil = new IOUtil()

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
      const { success, error } = validatePackageFiles(packageFiles)


      if (success) {
        core.debug(`${packageName} is valid`)
      } else {
        core.debug(`${packageName} is invalid - ${error}`)
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
