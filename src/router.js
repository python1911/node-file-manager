import { handleNavigation } from './navigation.js';
import { handleFileOps } from './fileOps.js';
import { handleOsInfo } from './osInfo.js';
import { handleHash } from './hash.js';
import { handleCompression } from './compress.js';

export async function handleCommand(input) {
  try {
    const [command, ...args] = input.trim().split(' ');

    if (['up', 'cd', 'ls'].includes(command)) {
      await handleNavigation(command, args);
    } else if (['cat', 'add', 'rn', 'cp', 'mv', 'rm', 'mkdir'].includes(command)) {
      await handleFileOps(command, args);
    } else if (command === 'os') {
      await handleOsInfo(args);
    } else if (command === 'hash') {
      await handleHash(args);
    } else if (['compress', 'decompress'].includes(command)) {
      await handleCompression(command, args);
    } else {
      console.log('Invalid input');
    }

  } catch (err) {
    console.log('Operation failed');
  }
}
