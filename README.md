# 🎮 记忆翻牌游戏

一个使用 Vue 3 编写的记忆翻牌小游戏，可以编译成独立的 JavaScript 文件，支持直接在浏览器中打开或通过 iframe 嵌入到其他网页。

## ✨ 特性

- 🎯 经典的记忆翻牌游戏玩法
- ⏱️ 实时计时和步数统计
- 🎨 现代化的渐变UI设计
- 📱 响应式布局，支持移动端
- 🚀 单文件打包，易于部署
- 🔗 支持 iframe 嵌入

## 🛠️ 技术栈

- Vue 3 (Composition API)
- Vite
- 原生 CSS（无额外依赖）

## 📦 安装与运行

### 1. 安装依赖

```bash
npm install
```

### 2. 开发模式运行

```bash
npm run dev
```

然后在浏览器中打开 `http://localhost:5173`

### 3. 构建生产版本

```bash
npm run build
```

构建完成后，生成的文件在 `dist` 目录中：
- `index.html` - 游戏页面
- `game.js` - 编译后的 JavaScript 文件
- `game.css` - 样式文件

## 🌐 使用方式

### 方式一：直接打开 HTML 文件

构建完成后，可以直接在浏览器中打开 `dist/index.html` 文件。

### 方式二：通过 iframe 嵌入

在其他网页中通过 iframe 嵌入游戏：

```html
<iframe 
  src="path/to/dist/index.html" 
  width="800" 
  height="900" 
  frameborder="0"
  style="border: none; border-radius: 10px; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
</iframe>
```

### 方式三：部署到服务器

将 `dist` 目录中的所有文件上传到任何静态文件托管服务（如 GitHub Pages、Netlify、Vercel 等）。

## 🎮 游戏规则

1. 点击卡片翻开
2. 找到两张相同的卡片进行配对
3. 记住卡片位置，用最少的步数和时间完成所有配对
4. 游戏结束后可以查看成绩并重新开始

## 📝 项目结构

```
.
├── index.html          # 入口 HTML 文件
├── package.json        # 项目配置和依赖
├── vite.config.js      # Vite 构建配置
├── src/
│   ├── main.js         # 应用入口
│   └── App.vue         # 游戏主组件
└── dist/               # 构建输出目录（执行 build 后生成）
    ├── index.html
    ├── game.js
    └── game.css
```

## 🔧 自定义配置

### 修改卡片数量

编辑 `src/App.vue` 文件中的 `emojis` 数组：

```javascript
const emojis = ['🍎', '🍌', '🍇', '🍊', '🍓', '🍒', '🥝', '🍑']
```

添加或删除表情符号即可改变游戏难度。

### 修改布局

在 `src/App.vue` 的样式部分修改 `.game-board` 的 `grid-template-columns`：

```css
.game-board {
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 4列布局 */
  gap: 15px;
}
```

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

---

祝你游戏愉快！🎉

