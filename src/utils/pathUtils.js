import path from 'path';
import os from 'os';

let currentDir = os.homedir();
process.chdir(currentDir);

export function printCurrentDirectory() {
  console.log(`You are currently in ${process.cwd()}`);
}

export function safeResolve(newPath) {
  const resolved = path.resolve(process.cwd(), newPath);
  const root = path.parse(resolved).root;
  if (!resolved.startsWith(root)) {
    return process.cwd();
  }
  return resolved;
}
