import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

export const OS_EOL = /\r\n|\n/;

export const readLines = (
  filepath: string,
  dirname: string,
  { filterNulls = true } = {}
) => {
  const filedata = fs.readFileSync(path.join(dirname, filepath), 'utf-8');
  return parseLines(filedata, { filterNulls });
};

export const parseLines = (data: string, { filterNulls = true } = {}) => {
  const allLines = data.split(OS_EOL);
  if (filterNulls) {
    return allLines.filter(x => x);
  } else {
    return allLines;
  }
};
