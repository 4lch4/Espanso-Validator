import { readdir, stat } from 'fs-extra'
import { join } from 'path'

function sortVersions(versionA: string, versionB: string): number {
  const [a, b] = [versionA, versionB].map(v => v.split('.').map(Number))
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      return a[i] - b[i]
    }
  }
  return 0
}

export class IOUtil {
  constructor(private basePath: string) {
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
