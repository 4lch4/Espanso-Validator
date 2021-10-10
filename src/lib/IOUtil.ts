import { readdir, stat } from 'fs-extra'
import { join } from 'path'

export class IOUtil {
  constructor(private basePath: string) {
    this.basePath = join(process.env.GITHUB_WORKSPACE || '.', 'packages')
  }

  async getPackageNames(): Promise<string[]> {
    return await readdir(this.basePath)
  }

  async getPackageVersions(name: string) {
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
