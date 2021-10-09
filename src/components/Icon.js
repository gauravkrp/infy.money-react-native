import { createIconSetFromIcoMoon } from '@expo/vector-icons';
// import icoMoonConfig from '../../icoMoonSelection.json';
// export default createIconSetFromIcoMoon(icoMoonConfig);

const Icon = createIconSetFromIcoMoon(
  require('../../assets/icomoon/selection.json'),
  'IcoMoon',
  'icomoon.ttf'
);

export default Icon;
