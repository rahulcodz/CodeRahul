#!/usr/bin/env node
import { execSync } from 'child_process';
import { commandAnswer } from './command.js';
import chalk from 'chalk';

const runCommand = (command) => {
  try {
    execSync(`${command}`, { stdio: 'inherit' });
  } catch (e) {
    console.error('Failed to execute ${command}', e);
    return false;
  }
  return true;
};

(async function () {
  try {
    const repoName = process.argv[2];
    let gitCheckoutCommand;
    const installDepsCommand = `cd ${repoName} && npm install --legacy-peer-deps`;
    const command = await commandAnswer();

    if (command.typescript && command.databaseQuestion) {
      gitCheckoutCommand = `git clone --single-branch --branch node_ts_mongo_db_linter_formatter https://github.com/rahulcodz/InfinityNode.git ${repoName || '.'}`
    }

    if (command.typescript && !command.databaseQuestion) {
      gitCheckoutCommand = `git clone --single-branch --branch node_ts_linter_formatter https://github.com/rahulcodz/InfinityNode.git ${repoName || '.'}`
    }
    if (!command.typescript && command.databaseQuestion) {
      gitCheckoutCommand = `git clone --single-branch --branch node_js_mongo_db_linter_formatter https://github.com/rahulcodz/InfinityNode.git ${repoName || '.'}`
    }

    if (!command.typescript && !command.databaseQuestion) {
      gitCheckoutCommand = `git clone --single-branch --branch node_js_linter_formatter https://github.com/rahulcodz/InfinityNode.git ${repoName || '.'}`
    }

    console.log(`Setting up ${repoName}`);
    const checkedOut = await runCommand(gitCheckoutCommand);
    if (!checkedOut) process.exit(-1);
    
    console.log(`Adding dependencies for ${repoName}`);
    const installedDeps = await runCommand(installDepsCommand);
    if (!installedDeps) process.exit(-1);

    console.log(
      'Hurray! You are ready'
    );
    console.log(
      'Follow the following commands to start'
    );
    console.log(chalk.bold.bgBlue(`cd ${repoName}`));
    console.log(chalk.bold.bgGreen("Commands for interacting with application..."));
    console.log("development: " + chalk.blue(`npm run dev`));
    console.log((`build: ` + chalk.blue("npm run build")));
    console.log(`production: `  + chalk.blue("npm start"));
    console.log(`formatting: `  + chalk.blue("npm run format:write"));
    console.log(`linting: `  + chalk.blue("npm run lint:check"));
  } catch (error) {
    console.log(chalk.bgRed('Failed executing command: ') + error);
  }
})();
