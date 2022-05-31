import '@robrez-com/x-hello/define.js';
import './app/define.js';
import { styles } from '../components/app/lib/styles.js';

const baseStyle = document.createElement('style');
baseStyle.textContent = styles.cssText;
const target = document.head || document.body || document;
target.appendChild(baseStyle);
