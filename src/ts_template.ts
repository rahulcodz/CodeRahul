const path = require("path");
const fs = require("fs").promises; // Using promises version of fs for async/await
const { exec } = require("child_process");

const folderName = ".";
const srcFolderPath = path.join(__dirname, folderName, "src");
const serverFilePath = path.join(srcFolderPath, "server.ts");
const tsConfigFile = "tsconfig.json";
const tsConfigContent = `{
  "compilerOptions": {
    "target": "es6",
    "module": "commonjs",
    "rootDir": "src",
    "outDir": "dist",
    "strict": true,
    "esModuleInterop": true
  },
  "include": ["src/**/*.ts"],
  "exclude": ["node_modules"]
}`;
const fileContent = `import express from 'express';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log("Server started");
});`;

async function createFiles() {
    try {
        // Create folders recursively
        await fs.mkdir(path.join(__dirname, folderName), { recursive: true });
        await fs.mkdir(srcFolderPath, { recursive: true });

        // Write server.ts file
        await fs.writeFile(serverFilePath, fileContent);
        console.log(`File 'server.ts' created successfully.`);

        // Write tsconfig.json file
        await fs.writeFile(
            path.join(__dirname, folderName, tsConfigFile),
            tsConfigContent
        );
        console.log(`File 'tsconfig.json' created successfully.`);

        // Initialize npm and install packages
        console.log("Initializing npm and installing packages...");
        await execCommand(`cd ${folderName} && npm init --yes`);
        await execCommand(
            `cd ${folderName} && npm i express typescript ts-node @types/node`
        );
        await execCommand(`cd ${folderName} && npm i nodemon @types/express -D`);

        // Update package.json scripts
        const packageJsonPath = path.join(__dirname, folderName, "package.json");
        await updatePackageJson(packageJsonPath);

        console.log("Setup completed successfully.");
    } catch (err) {
        console.error("Error during setup:", err);
    }
}

async function execCommand(command: string) {
    return new Promise<void>((resolve, reject) => {
        exec(command, (err: any, stdout: any, stderr: any) => {
            if (err) {
                reject(err);
            } else {
                // console.log(stdout);
                resolve();
            }
        });
    });
}

async function updatePackageJson(packageJsonPath: any) {
    try {
        const data = await fs.readFile(packageJsonPath, "utf8");
        const packageJson = JSON.parse(data);

        packageJson.scripts.build = "tsc";
        packageJson.scripts.start = "node dist/server.js";
        packageJson.scripts.dev = "nodemon --exec ts-node src/server.ts";

        await fs.writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2));
        console.log("Updated package.json successfully.");
    } catch (err) {
        console.error("Error updating package.json:", err);
    }
}

// Call the function to create files and setup the project
export default createFiles;
