// Cross-version launcher for Practice Corner
// Ensures Node.js v20 LTS is used when available so native modules (better-sqlite3) work seamlessly
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const isWatch = process.argv.includes('--watch');
const target = process.argv[2] === 'seed' ? 'seed.js' : 'server.js';
const targetScript = path.join(__dirname, target);

const node20 = 'C:\\Users\\hp\\AppData\\Local\\Programs\\nodejs\\node.exe';
const nodeBin = (!process.version.startsWith('v20.') && fs.existsSync(node20)) ? node20 : process.execPath;

const args = [];
if (isWatch) args.push('--watch');
args.push(targetScript);

const child = spawn(nodeBin, args, {
  stdio: 'inherit',
  cwd: __dirname,
  env: {
    ...process.env,
    PATH: `C:\\Users\\hp\\AppData\\Local\\Programs\\nodejs;${process.env.PATH}`
  }
});

child.on('exit', (code, signal) => {
  process.exit(code !== null ? code : (signal ? 1 : 0));
});

