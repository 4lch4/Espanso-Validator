export declare class IOUtil {
    private basePath;
    constructor(basePath: string);
    getPackageNames(): Promise<string[]>;
    getPackageVersions(name: string): Promise<string[]>;
}
