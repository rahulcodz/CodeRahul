# Create Node Project

This is a **Node+Express+Typescript** StarterPack


Step 1:
```bash
  npm init -y
```
Step 2:
```bash
  npm install --save-dev typescript
```
Step 3:
```bash
  npx tsc --init
```
Step 4: Add this data in `tsconfig.json`
```javascript
{
  "compilerOptions": {
    "target": "es2016",
    "module": "commonjs",
    "rootDir": "./src",
    "outDir": "./dist",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,  
    "strict": true,
    "skipLibCheck": true
  }
}
```
Step 5:
```bash
  npm install express
```
Step 6:
```bash
  npm install --save-dev ts-node nodemon @types/express @types/node
```
Step 7: Create a `src` folder and create `index.ts` file inside it. And add this code in `index.ts` file.
```javascript
  import express from 'express';

  const app = express();
  const port = 3000;

  app.get('/', (req, res) => {
    res.send('Hello, World!');
  });

  app.listen(port, () => {
    return console.log(`Express server is listening at http://localhost:${port} 🚀`);
  });
```
Step 8: Add this code in scripts section of `package.json`
```json
  "start": "tsc && node dist/index.js",
  "dev": "nodemon src/index.ts"
```
Step 9: Run this command to run the project
```bash
  npm run dev
```