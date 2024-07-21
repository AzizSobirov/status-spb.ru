import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { generateImports } from './generate-imports.js';

// Helper to get the current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get the component name from command line arguments
const componentName = process.argv[2];

// Validate the component name
if (!componentName) {
  console.log('Please provide a component name.');
  process.exit(1);
}

// Ensure the component name has the correct extension
const componentFileName = componentName.endsWith('.astro') ? componentName : `The${componentName.charAt(0).toUpperCase() + componentName.slice(1)}.astro`;
const componentPath = path.join(__dirname, '../../', 'src', 'components', componentFileName);

// Component template content
const componentContent = `---
import {Section, H2} from "starter-kit";
---

<Section name="${componentName.toLowerCase()}">
  <H2>${componentName}</H2>
</Section>
`;

const greenBgWhiteText = '\x1b[42m\x1b[37m'; // Green background, white text
const reset = '\x1b[0m'; // Reset to default colors

async function createComponent() {
  try {
    await fs.writeFile(componentPath, componentContent);
    console.log(`${greenBgWhiteText}Component ${componentFileName} created successfully!${reset}`);
    generateImports()
  } catch (err) {
    console.log(`Error creating component: ${err}`);
  }
}

createComponent();
