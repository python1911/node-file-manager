import { startCLI } from './cli.js';

const args = process.argv.slice(2);
const usernameArg = args.find(arg => arg.startsWith('--username='));
const username = usernameArg?.split('=')[1] || 'Anonymous';

console.log(`Welcome to the File Manager, ${username}!`);
startCLI(username);

process.on('SIGINT', () => {
  console.log(`\nThank you for using File Manager, ${username}, goodbye!`);
  process.exit();
});
