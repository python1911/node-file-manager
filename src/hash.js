import { createHash } from 'crypto';
import { createReadStream } from 'fs';

export async function handleHash(args) {
  try {
    const hash = createHash('sha256');
    const stream = createReadStream(args[0]);
    stream.on('error', () => console.log('Operation failed'));
    stream.on('end', () => process.stdout.write('\n'));
    stream.pipe(hash).setEncoding('hex').pipe(process.stdout);
  } catch {
    console.log('Operation failed');
  }
}
