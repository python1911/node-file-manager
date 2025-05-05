import fs from 'fs/promises';
import { createReadStream, createWriteStream } from 'fs';
import path from 'path';

export async function handleFileOps(command, args) {
  try {
    switch (command) {
      case 'cat': {
        const stream = createReadStream(args[0], 'utf-8');
        stream.pipe(process.stdout);
        stream.on('end', () => process.stdout.write('\n'));
        break;
      }
      case 'add': {
        const filePath = path.join(process.cwd(), args[0]);
        await fs.writeFile(filePath, '');
        break;
      }
      case 'mkdir': {
        const dirPath = path.join(process.cwd(), args[0]);
        await fs.mkdir(dirPath);
        break;
      }
      case 'rn': {
        const oldPath = args[0];
        const newPath = path.join(path.dirname(oldPath), args[1]);
        await fs.rename(oldPath, newPath);
        break;
      }
      case 'cp': {
        const [source, dest] = args;
        const read = createReadStream(source);
        const base = path.basename(source);
        const write = createWriteStream(path.join(dest, base));
        await new Promise((res, rej) => read.pipe(write).on('finish', res).on('error', rej));
        break;
      }
      case 'mv': {
        const [src, dst] = args;
        const read = createReadStream(src);
        const write = createWriteStream(path.join(dst, path.basename(src)));
        await new Promise((res, rej) => read.pipe(write).on('finish', res).on('error', rej));
        await fs.unlink(src);
        break;
      }
      case 'rm': {
        await fs.rm(args[0]);
        break;
      }
    }
  } catch {
    console.log('Operation failed');
  }
}
