import fs from 'fs';
import { remark } from 'remark';
import html from 'remark-html';

export async function parseMarkdown(filePath: string) {
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const processedContent = await remark().use(html).process(fileContent);
  return processedContent.toString();
}