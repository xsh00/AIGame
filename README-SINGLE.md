# 🎮 单文件版本说明

## 两种构建方案对比

### 方案一：标准 Web 应用（当前 `npm run build`）

```
dist/
├── index.html  ← 入口文件
├── game.js     ← 应用代码
└── game.css    ← 样式文件
```

**使用方式：**
```html
<!-- 直接打开 index.html 或部署整个 dist 目录 -->
```

**优点：**
- ✅ 符合标准 Web 结构
- ✅ 浏览器缓存优化
- ✅ 可直接打开使用

**适用场景：**
- 独立网页应用
- 需要 SEO 的页面
- 传统 Web 部署

---

### 方案二：单文件 SDK（`npm run build:single`）

```
dist-single/
└── memory-game.js  ← 包含所有内容的单文件
```

**使用方式：**

#### 方式 1：自动挂载
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>我的页面</title>
</head>
<body>
  <!-- 1. 提供挂载点 -->
  <div id="app"></div>
  
  <!-- 2. 引入 JS 文件（会自动挂载） -->
  <script src="memory-game.js"></script>
</body>
</html>
```

#### 方式 2：手动挂载到自定义容器
```html
<!DOCTYPE html>
<html>
<body>
  <div id="my-game-container"></div>
  
  <script src="memory-game.js"></script>
  <script>
    // 手动挂载到指定容器
    MemoryGame.mount('#my-game-container');
  </script>
</body>
</html>
```

#### 方式 3：通过 CDN 引入
```html
<div id="app"></div>
<script src="https://your-cdn.com/memory-game.js"></script>
```

**优点：**
- ✅ 真正的单文件部署
- ✅ 便于作为组件嵌入其他网站
- ✅ 支持 CDN 托管
- ✅ 可作为 SDK 分发

**适用场景：**
- 作为第三方组件嵌入
- CDN 分发
- iframe 嵌入
- 博客/CMS 插件

---

## 构建命令

### 构建标准版本（三文件）
```bash
npm run build
# 输出到 dist/ 目录
```

### 构建单文件版本
```bash
npm run build:single
# 输出到 dist-single/ 目录
```

---

## 文件大小对比

### 标准版本
```
index.html:  ~1 KB
game.js:     ~80 KB (gzipped: ~30 KB)
game.css:    ~3 KB (gzipped: ~1 KB)
总计:        ~84 KB (gzipped: ~31 KB)
```

### 单文件版本
```
memory-game.js: ~85 KB (gzipped: ~32 KB)
总计:           ~85 KB (gzipped: ~32 KB)
```

**结论：** 文件大小几乎相同，但单文件版本更便于分发和集成。

---

## API 参考

### `MemoryGame.mount(selector)`

挂载游戏到指定容器。

**参数：**
- `selector`: CSS 选择器字符串或 DOM 元素

**返回：**
- Vue 应用实例

**示例：**
```javascript
// 使用选择器
MemoryGame.mount('#app');

// 使用 DOM 元素
const container = document.getElementById('game');
MemoryGame.mount(container);
```

---

## 实际使用示例

### 在 WordPress 中使用
```html
<!-- 在文章或页面中添加 -->
<div id="memory-game"></div>
<script src="/wp-content/uploads/memory-game.js"></script>
<script>
  MemoryGame.mount('#memory-game');
</script>
```

### 在 React 应用中使用
```jsx
import { useEffect, useRef } from 'react';

function GameComponent() {
  const containerRef = useRef(null);
  
  useEffect(() => {
    // 动态加载脚本
    const script = document.createElement('script');
    script.src = '/memory-game.js';
    script.onload = () => {
      window.MemoryGame.mount(containerRef.current);
    };
    document.body.appendChild(script);
    
    return () => {
      document.body.removeChild(script);
    };
  }, []);
  
  return <div ref={containerRef} />;
}
```

### 在普通 HTML 页面的特定位置嵌入
```html
<!DOCTYPE html>
<html>
<body>
  <header>
    <h1>我的网站</h1>
  </header>
  
  <main>
    <section>
      <h2>游戏区域</h2>
      <!-- 游戏嵌入在这里 -->
      <div id="game-area" style="max-width: 800px; margin: 0 auto;"></div>
    </section>
  </main>
  
  <footer>
    <p>版权所有 © 2025</p>
  </footer>
  
  <script src="memory-game.js"></script>
  <script>
    MemoryGame.mount('#game-area');
  </script>
</body>
</html>
```

---

## 注意事项

1. **样式作用域：** 单文件版本的样式使用了 scoped CSS，不会影响页面其他元素

2. **容器要求：** 挂载容器需要在脚本执行前存在于 DOM 中

3. **多实例：** 可以在同一页面挂载多个游戏实例
   ```javascript
   MemoryGame.mount('#game1');
   MemoryGame.mount('#game2');
   ```

4. **浏览器兼容性：** 支持所有现代浏览器（Chrome, Firefox, Safari, Edge）

---

## 选择建议

**使用标准版本（三文件）如果：**
- 作为独立网页应用
- 需要更好的缓存策略
- 开发阶段调试

**使用单文件版本如果：**
- 需要嵌入到其他网站
- 作为第三方组件分发
- 通过 CDN 托管
- 简化部署流程

---

## 测试

构建完成后测试：

```bash
# 1. 构建单文件版本
npm run build:single

# 2. 使用浏览器打开
example-single.html
```

