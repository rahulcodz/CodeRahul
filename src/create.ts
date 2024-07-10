import { exec, ExecException } from "child_process";
import fs from "fs";
import path from "path"

export const createFiles = async function () {
    // . or directory name 
    // if directory name cd dir or current
    const folderName = 'myFolder';
    const fileName = 'index.ts';
    const fileContent = `console.log('Hello from index.ts');`;
    await fs.mkdir(path.join(__dirname, folderName), (err) => {
        if (err && err.code !== 'EEXIST') {
            console.error('Error creating folder:', err);
            return;
        }

        console.log(`Folder '${folderName}' created successfully.`);

        // Create file
        // fs.writeFile(path.join(__dirname, folderName, fileName), fileContent, (err) => {
        //     if (err) {
        //         console.error('Error creating file:', err);
        //         return;
        //     }
        //     console.log(`File '${fileName}' created successfully.`);
        // });
    });
    await exec('cd src/myFolder/ && pwd', (err, stdout, stderr) => {
        if (err) {
            console.error('Error changing directory:', err);
            return;
        }

        // stdout contains the output of the 'pwd' command (current directory)
        console.log('Current directory:', stdout.trim());

        // Now you can execute other commands within this directory
        // For example, listing files in the current directory
        exec('ls', (err, stdout, stderr) => {
            if (err) {
                console.error('Error listing files:', err);
                return;
            }
            console.log('Files in myFolder:');
            console.log(stdout);
        });
        exec('npm init --yes', (err: ExecException | null, stdout: string, stderr: string) => {
            if (err) {
                console.error('Error installing nodemon:', err);
                return;
            }
            console.log('package.json initiated.');
            // console.log(stdout);
        });
    });
    // await exec('npm init --yes', (err: ExecException | null, stdout: string, stderr: string) => {
    //     if (err) {
    //         console.error('Error installing nodemon:', err);
    //         return;
    //     }
    //     console.log('package.json initiated.');
    //     // console.log(stdout);
    // });

};
