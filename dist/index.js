"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const lib_1 = require("./lib");
const ioUtil = new lib_1.IOUtil(process.env.GITHUB_WORKSPACE || '.');
const main = async () => {
    try {
        core.setOutput('timeStart', new Date().toTimeString());
        const packageNames = await ioUtil.getPackageNames();
        for (let x = 0; x < packageNames.length; x++) {
            const packageName = packageNames[x];
            const content = await ioUtil.getPackageVersions(packageName);
            core.info(content.join('\n'));
        }
        core.setOutput('fileCount', packageNames.length);
    }
    catch (error) {
        core.setFailed(error.message);
    }
};
main()
    .then(() => core.info('done'))
    .catch(err => console.error(err));
//# sourceMappingURL=index.js.map