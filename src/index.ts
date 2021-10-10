import * as core from '@actions/core'
import { IOUtil } from './lib'
const ioUtil = new IOUtil(process.env.GITHUB_WORKSPACE || '.')

const main = async () => {
  try {
    core.setOutput('timeStart', new Date().toTimeString())

    const packageNames = await ioUtil.getPackageNames()

    for (let x = 0; x < packageNames.length; x++) {
      const packageName = packageNames[x]
      const latestVersion = await ioUtil.getLatestVersionNumber(packageName)
      const packageFiles = await ioUtil.getPackageFiles(packageName, latestVersion)

      core.info(`packageFiles.join()...${packageFiles.join('\n')}`)
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
