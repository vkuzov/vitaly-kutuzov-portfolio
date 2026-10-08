import { readFile, mkdir, writeFile } from 'node:fs/promises';

// Static entry points let direct case links work without an SPA fallback.
const projects = JSON.parse(await readFile(new URL('../src/data/projects.json', import.meta.url), 'utf8'));
const html = await readFile(new URL('../dist/index.html', import.meta.url), 'utf8');
const escape = value => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
for (const project of projects) {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(project.slug)) throw new Error(`Invalid project slug: ${project.slug}`);
  const directory = new URL(`../dist/projects/${project.slug}/`, import.meta.url);
  await mkdir(directory, { recursive: true });
  const page = html.replace(/<title>.*?<\/title>/s, `<title>${escape(project.title)} — кейс | Виталий Кутузов</title>`).replace(/<meta name="description" content="[^"]*"\s*\/>/, `<meta name="description" content="${escape(project.summary)}" />`);
  await writeFile(new URL('index.html', directory), page);
}
await writeFile(new URL('../dist/404.html', import.meta.url), html);
console.log(`Built ${projects.length} static case entry point(s).`);
