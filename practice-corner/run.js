// Cross-platform launcher for Practice Corner
const { spawn } = require('child_process');
const path = require('path');

const isWatch = process.argv.includes('--watch');
const target = process.argv[2] === 'seed' ? 'seed.js' : 'server.js';
const targetScript = path.join(__dirname, target);

const args = [];
if (isWatch) args.push('--watch');
args.push(targetScript);

const child = spawn(process.execPath, args, {
  stdio: 'inherit',
  cwd: __dirname,
  env: process.env
});

child.on('exit', (code, signal) => {
  process.exit(code !== null ? code : (signal ? 1 : 0));
});
