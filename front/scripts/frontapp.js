/**
 * @file Main frontend application file.
 */

// Google Analytics
import './analytics';

// Load styling
import '../styles/boot.scss';

import sectionNew from './section-new';

sectionNew.saveListener();

console.log('Hi!');
