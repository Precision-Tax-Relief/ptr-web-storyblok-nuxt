import fetch from 'node-fetch';
import { execSync } from 'child_process';

global.fetch = fetch;

let output = execSync('storyblok pull-components --space 1014492', { stdio: 'inherit' });
output += execSync('storyblok-generate-ts source=./components.1014492.json target=./types/component-types-sb')
