import { register } from 'node:module';
import { pathToFileURL } from 'url';
import path from 'path';

const baseURL = pathToFileURL(process.cwd() + '/').href;

export function resolve(specifier, context, nextResolve) {
  if (specifier.startsWith('@/')) {
    const newPath = path.join(process.cwd(), 'src', specifier.slice(2));
    return nextResolve(pathToFileURL(newPath).href);
  }
  return nextResolve(specifier);
}

// Register the loader
register('./loader.js', baseURL);
