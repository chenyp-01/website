// 扫描 docs 下 markdown 中代码块外裸露的组件标签（会被 Vue 编译器解析导致构建失败）
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const docs = path.resolve(__dirname, '../docs');
const files = [];
(function walk(d) {
  for (const f of fs.readdirSync(d)) {
    const p = path.join(d, f);
    if (fs.statSync(p).isDirectory()) walk(p);
    else if (f.endsWith('.md')) files.push(p);
  }
})(docs);

// 组件标签：首字母大写（PascalCase），或 van-/自定义短横线组件；后跟空白、> 或 /
const re = /<\/?[A-Z][A-Za-z0-9-]*(?=[\s/>])|<\/?[a-z][a-z0-9]*-[a-z]/;

for (const file of files) {
  const lines = fs.readFileSync(file, 'utf8').split('\n');
  let inFence = false;
  lines.forEach((line, i) => {
    // 支持缩进的代码围栏
    if (/^\s*```/.test(line)) { inFence = !inFence; return; }
    if (inFence) return;
    // 去掉行内代码后再检测
    const stripped = line.replace(/`[^`]*`/g, '');
    if (re.test(stripped)) {
      console.log(`${path.relative(docs, file)}:${i + 1}: ${line.trim()}`);
    }
  });
}
