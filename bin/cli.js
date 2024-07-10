#!/usr/bin/env node

const path = require("path");
const fs = require("fs").promises; // Using promises version of fs for async/await
const { exec } = require("child_process");

const folderName = "node_test_ts";
const srcFolderPath = path.join(__dirname, folderName, "src");
const serverFilePath = path.join(srcFolderPath, "server.ts");
const tsConfigFile = "tsconfig.json";
const gitIgnoreFileName = ".gitignore";
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

const ignoreContent = `# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# production
/build

# misc
.DS_Store
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

npm-debug.log*
yarn-debug.log*
yarn-error.log*`

async function createFiles() {
    try {
        // Create folders recursively
        await fs.mkdir(path.join(__dirname, folderName), { recursive: true });
        await fs.mkdir(srcFolderPath, { recursive: true });

        // Write server.ts file
        await fs.writeFile(serverFilePath, fileContent);

        // Write tsconfig.json file
        await fs.writeFile(
            path.join(__dirname, folderName, tsConfigFile),
            tsConfigContent
        );

        // Write .gitignore file
        await fs.writeFile(
            path.join(__dirname, folderName, gitIgnoreFileName),
            ignoreContent
        );

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

async function execCommand(command) {
    return new Promise((resolve, reject) => {
        exec(command, (err, stdout, stderr) => {
            if (err) {
                reject(err);
            } else {
                // console.log(stdout);
                resolve();
            }
        });
    });
}

async function updatePackageJson(packageJsonPath) {
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
// export default createFiles;
createFiles();
