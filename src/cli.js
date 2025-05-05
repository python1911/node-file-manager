import readline from 'readline';
import { handleCommand } from './router.js';
import { printCurrentDirectory } from './utils/pathUtils.js';

export function startCLI(username) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  printCurrentDirectory();

  rl.on('line', async (line) => {
    const trimmed = line.trim();
    if (trimmed === '.exit') {
      console.log(`Thank you for using File Manager, ${username}, goodbye!`);
      process.exit();
    }
    await handleCommand(trimmed);
    printCurrentDirectory();
  });
}
