import { createBrotliCompress, createBrotliDecompress } from 'zlib';
import { createReadStream, createWriteStream } from 'fs';

export async function handleCompression(command, args) {
  try {
    const [source, destination] = args;
    const input = createReadStream(source);
    const output = createWriteStream(destination);

    if (command === 'compress') {
      const brotli = createBrotliCompress();
      input.pipe(brotli).pipe(output);
    } else {
      const brotli = createBrotliDecompress();
      input.pipe(brotli).pipe(output);
    }
  } catch {
    console.log('Operation failed');
  }
}
