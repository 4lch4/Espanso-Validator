import { readdir, readFile, stat } from 'fs-extra'
import { join } from 'path'

function sortVersions(versionA: string, versionB: string): number {
  const [majorA, minorA, patchA] = versionA.split('.')
  const [majorB, minorB, patchB] = versionB.split('.')

  if (majorA !== majorB) {
    return Number(majorA) - Number(majorB)
  }

  if (minorA !== minorB) {
    return Number(minorA) - Number(minorB)
  }

  return Number(patchA) - Number(patchB)
}

export class IOUtil {
  private basePath: string

  constructor() {
    this.basePath = join(process.env.GITHUB_WORKSPACE || '.', 'packages')
  }

  async getPackageNames(): Promise<string[]> {
    return await readdir(this.basePath)
  }

  async getLatestVersionNumber(packageName: string): Promise<string> {
    const versions = await this.getPackageVersions(packageName)
    const sortedVersions = versions.sort(sortVersions)

    return sortedVersions[sortedVersions.length - 1]
  }

  getFolderPath(packageName: string, version: string): string {
    return join(this.basePath, packageName, version)
  }

  async getPackageFiles(packageName: string, version: string) {
    const path = join(this.basePath, packageName, version)

    return await readdir(path)
  }

  async getFileContent(
    packageName: string,
    version: string,
    fileName: string
  ): Promise<string> {
    return await readFile(
      join(this.basePath, packageName, version, fileName),
      'UTF-8'
    )
  }

  async getPackageVersions(name: string): Promise<string[]> {
    const path = join(this.basePath, name)
    const versionFolders = await readdir(path)
    const directories = []

    for (const folder of versionFolders) {
      const filePath = join(path, folder)
      const stats = await stat(filePath)

      if (stats.isDirectory()) {
        directories.push(folder)
      }
    }

    return directories
  }
}
