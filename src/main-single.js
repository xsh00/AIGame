import { createApp } from 'vue'
import App from './App.vue'

// 自动挂载函数
function mount(selector = '#app') {
  const container = typeof selector === 'string' 
    ? document.querySelector(selector) 
    : selector;
    
  if (!container) {
    console.error(`MemoryGame: 找不到挂载容器 "${selector}"`);
    return null;
  }
  
  const app = createApp(App);
  app.mount(container);
  return app;
}

// 自动初始化（如果页面已有 #app）
if (typeof window !== 'undefined') {
  // DOM 加载完成后自动挂载
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      const appElement = document.querySelector('#app');
      if (appElement) {
        mount(appElement);
      }
    });
  } else {
    // DOM 已加载
    const appElement = document.querySelector('#app');
    if (appElement) {
      mount(appElement);
    }
  }
}

// 导出供外部调用
if (typeof window !== 'undefined') {
  window.MemoryGame = {
    mount,
    version: '1.0.0'
  };
}

export { mount }
export default { mount }

