//import type {  PlatformPath } from 'path';
import path from 'path/posix';

const relativePath = (base: string, p: string): string => {
  const relativePath: string = path.relative(base, p);
  if (p.endsWith('/') && !relativePath.endsWith('/') && relativePath !== '') {
    return `${relativePath}/`;
  }
  return relativePath;
};

export default relativePath;
