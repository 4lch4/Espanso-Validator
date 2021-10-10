"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IOUtil = void 0;
const fs_extra_1 = require("fs-extra");
const path_1 = require("path");
class IOUtil {
    constructor(basePath) {
        this.basePath = basePath;
        this.basePath = path_1.join(process.env.GITHUB_WORKSPACE || '.', 'packages');
    }
    async getPackageNames() {
        return await fs_extra_1.readdir(this.basePath);
    }
    async getPackageVersions(name) {
        const path = path_1.join(this.basePath, name);
        const versionFolders = await fs_extra_1.readdir(path);
        const directories = [];
        for (const folder of versionFolders) {
            const filePath = path_1.join(path, folder);
            const stats = await fs_extra_1.stat(filePath);
            if (stats.isDirectory()) {
                directories.push(folder);
            }
        }
        return directories;
    }
}
exports.IOUtil = IOUtil;
//# sourceMappingURL=IOUtil.js.map