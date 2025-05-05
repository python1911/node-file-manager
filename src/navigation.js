import fs from 'fs/promises';
import path from 'path';
import { printCurrentDirectory, safeResolve } from './utils/pathUtils.js';

export async function handleNavigation(command, args) {
  if (command === 'up') {
    const parent = path.dirname(process.cwd());
    const root = path.parse(process.cwd()).root;
    if (process.cwd() !== root) process.chdir(parent);
  } else if (command === 'cd') {
    const target = safeResolve(args[0]);
    try {
      const stat = await fs.stat(target);
      if (stat.isDirectory()) process.chdir(target);
      else throw new Error();
    } catch {
      console.log('Operation failed');
    }
  } else if (command === 'ls') {
    try {
      const files = await fs.readdir(process.cwd(), { withFileTypes: true });
      const dirs = files.filter(f => f.isDirectory()).map(f => [f.name, 'directory']);
      const ffiles = files.filter(f => f.isFile()).map(f => [f.name, 'file']);
      const sorted = [...dirs, ...ffiles].sort((a, b) => a[0].localeCompare(b[0]));
      console.table(sorted.map(([Name, Type]) => ({ Name, Type })));
    } catch {
      console.log('Operation failed');
    }
  }
}
