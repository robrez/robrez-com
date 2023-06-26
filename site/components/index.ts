import '@robrez-com/x-hello/define.js';
import '@robrez-com/app-layout/define.js';
import { styles } from '@robrez-com/app-layout/src/styles.js';

const baseStyle = document.createElement('style');
baseStyle.textContent = styles.cssText;
const target = document.head || document.body || document;
target.appendChild(baseStyle);
