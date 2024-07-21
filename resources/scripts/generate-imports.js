import fs from 'fs/promises';
import path from 'path';

const __dirname = path.resolve();
const folderPath = path.resolve(__dirname, './src/components');

export async function generateImports() {
  try {
    const files = await fs.readdir(folderPath);

    const astroFiles = files.filter((file) => file.endsWith('.astro'));
    const imports = astroFiles.map((file) => {
      const componentName = path.parse(file).name;
      return `import ${componentName} from "./src/components/${file}";`;
    }).join('\n');

    const exportStatement = `export { ${astroFiles.map((file) => path.parse(file).name).join(', ')} };`;

    const content = `${imports}\n\n${exportStatement}\n`;

    await fs.writeFile('./imports.d.ts', content);
  } catch (err) {
    console.error('Error generating imports:', err);
  }
}

generateImports();
