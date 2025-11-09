// 构建内联版本的脚本
import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// 读取构建后的文件
const jsContent = readFileSync(resolve(__dirname, 'dist-single/memory-game.js'), 'utf-8');
const cssContent = readFileSync(resolve(__dirname, 'dist-single/style.css'), 'utf-8');

// 创建完整的 HTML
const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>记忆翻牌游戏</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: 'Arial', 'Microsoft YaHei', sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    #app {
      width: 100%;
    }
    
    /* 游戏样式 */
    ${cssContent}
  </style>
</head>
<body>
  <div id="app"></div>
  
  <script>
    ${jsContent}
  </script>
</body>
</html>`;

// 写入文件
writeFileSync(resolve(__dirname, 'game-standalone.html'), html, 'utf-8');

console.log('✅ 独立HTML文件已生成: game-standalone.html');
console.log('📝 可以直接在浏览器中打开此文件，无需服务器！');

