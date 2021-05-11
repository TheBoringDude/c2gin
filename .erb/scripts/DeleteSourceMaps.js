import path from 'path';
import rimraf from 'rimraf';

export default function deleteSourceMaps() {
  rimraf.sync(path.join(__dirname, '../../src/renderer/dist/*.js.map'));
  rimraf.sync(path.join(__dirname, '../../src/main/*.js.map'));
}
