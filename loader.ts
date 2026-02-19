import { register } from 'node:module';
import { pathToFileURL } from 'url';
import path from 'path';
import fs from 'fs';

const baseURL = pathToFileURL(process.cwd() + '/').href;

const getSourceRoot = () => {
  const hasDistArg = process.argv.some((arg) => arg.includes('/dist/') || arg.endsWith('dist'));
  if (hasDistArg && fs.existsSync(path.join(process.cwd(), 'dist'))) {
    return 'dist';
  }
  return 'src';
};

export function resolve(specifier, context, nextResolve) {
  if (specifier.startsWith('@/')) {
    const newPath = path.join(process.cwd(), getSourceRoot(), specifier.slice(2));
    return nextResolve(pathToFileURL(newPath).href);
  }
  return nextResolve(specifier);
}

// Register the loader
// register('./loader.ts', baseURL);
