<template>
    <div class="home-container">
      <!-- 导航栏 -->
      <nav class="navbar">
        <div class="container">
          <div class="logo">Vue3+TS Pro</div>
          <ul class="nav-links">
            <li><a href="#home">首页</a></li>
            <li><a href="#features">功能</a></li>
            <li><a href="#pricing">定价</a></li>
            <li><a href="#contact">联系我们</a></li>
            <li><a href="#" class="btn-primary">立即试用</a></li>
          </ul>
          <div class="mobile-menu-btn" @click="toggleMobileMenu">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </nav>
  
      <!-- 移动端导航 -->
      <div class="mobile-menu" v-show="isMobileMenuOpen">
        <ul>
          <li><a href="#home" @click="toggleMobileMenu">首页</a></li>
          <li><a href="#features" @click="toggleMobileMenu">功能</a></li>
          <li><a href="#pricing" @click="toggleMobileMenu">定价</a></li>
          <li><a href="#contact" @click="toggleMobileMenu">联系我们</a></li>
          <li><a href="#" class="btn-primary">立即试用</a></li>
        </ul>
      </div>
  
      <!-- 英雄区 -->
      <section class="hero" id="home">
        <div class="container">
          <div class="hero-content">
            <h1>基于 Vue3 + TS 的<br>高性能前端解决方案</h1>
            <p>开箱即用的企业级框架，兼顾性能与开发体验，助力业务快速落地</p>
            <div class="hero-btns">
              <a href="#" class="btn-primary">开始使用</a>
              <a href="#" class="btn-secondary">查看文档</a>
            </div>
          </div>
          <div class="hero-img">
            <img src="https://picsum.photos/800/600?random=1" alt="Vue3+TS 解决方案" />
          </div>
        </div>
      </section>
  
      <!-- 功能区 -->
      <section class="features" id="features">
        <div class="container">
          <div class="section-title">
            <h2>核心功能</h2>
            <p>为企业级应用量身打造</p>
          </div>
          <div class="features-grid">
            <div class="feature-card" v-for="(item, index) in features" :key="index">
              <div class="feature-icon">
                <span :style="{ backgroundColor: item.color }">{{ item.icon }}</span>
              </div>
              <h3>{{ item.title }}</h3>
              <p>{{ item.desc }}</p>
            </div>
          </div>
        </div>
      </section>
  
      <!-- 页脚 -->
      <footer class="footer">
        <div class="container">
          <div class="footer-top">
            <div class="footer-logo">Vue3+TS Pro</div>
            <div class="footer-links">
              <div class="link-group">
                <h4>产品</h4>
                <ul>
                  <li><a href="#">功能</a></li>
                  <li><a href="#">定价</a></li>
                  <li><a href="#">更新日志</a></li>
                </ul>
              </div>
              <div class="link-group">
                <h4>文档</h4>
                <ul>
                  <li><a href="#">快速开始</a></li>
                  <li><a href="#">API 参考</a></li>
                  <li><a href="#">常见问题</a></li>
                </ul>
              </div>
              <div class="link-group">
                <h4>关于我们</h4>
                <ul>
                  <li><a href="#">团队介绍</a></li>
                  <li><a href="#">联系我们</a></li>
                  <li><a href="#">隐私政策</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div class="footer-bottom">
            <p>© 2025 Vue3+TS Pro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  
  // 移动端菜单控制
  const isMobileMenuOpen = ref(false);
  const toggleMobileMenu = () => {
    isMobileMenuOpen.value = !isMobileMenuOpen.value;
  };
  
  // 功能区数据
  const features = ref([
    {
      title: "TypeScript 全支持",
      desc: "严格类型校验，减少线上 Bug，提升代码可维护性",
      icon: "✓",
      color: "#42b983",
    },
    {
      title: "Vite 极速构建",
      desc: "热更新秒级响应，打包速度提升 10 倍以上",
      icon: "⚡",
      color: "#ff6b6b",
    },
    {
      title: "组件化开发",
      desc: "基于 Composition API，组件复用性更高",
      icon: "🧩",
      color: "#4dabf7",
    },
    {
      title: "响应式适配",
      desc: "兼容 PC、平板、手机等多端设备",
      icon: "📱",
      color: "#9775fa",
    },
    {
      title: "性能优化",
      desc: "按需加载、分包策略，首屏加载更快",
      icon: "🚀",
      color: "#ff9a76",
    },
    {
      title: "生态完善",
      desc: "无缝集成 Pinia、Vue Router、Element Plus 等",
      icon: "🌐",
      color: "#3bc9db",
    },
  ]);
  </script>
  
  <style lang="scss" scoped>
  // 全局样式重置
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Inter", system-ui, -apple-system, sans-serif;
  }
  
  .container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }
  
  // 导航栏
  .navbar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background: #fff;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    z-index: 999;
    padding: 16px 0;
  
    .container {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  
    .logo {
      font-size: 20px;
      font-weight: 700;
      color: #42b983;
    }
  
    .nav-links {
      display: flex;
      list-style: none;
      align-items: center;
      gap: 32px;
  
      li {
        a {
          text-decoration: none;
          color: #333;
          font-weight: 500;
          transition: color 0.3s;
  
          &:hover {
            color: #42b983;
          }
  
          &.btn-primary {
            background: #42b983;
            color: #fff;
            padding: 8px 20px;
            border-radius: 4px;
            transition: background 0.3s;
  
            &:hover {
              background: #359469;
            }
          }
        }
      }
    }
  
    .mobile-menu-btn {
      display: none;
      flex-direction: column;
      gap: 4px;
      cursor: pointer;
  
      span {
        width: 24px;
        height: 2px;
        background: #333;
        border-radius: 2px;
      }
    }
  }
  
  // 移动端菜单
  .mobile-menu {
    position: fixed;
    top: 70px;
    left: 0;
    width: 100%;
    background: #fff;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    z-index: 998;
    padding: 20px 0;
  
    ul {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 20px;
      align-items: center;
  
      li {
        a {
          text-decoration: none;
          color: #333;
          font-weight: 500;
  
          &.btn-primary {
            background: #42b983;
            color: #fff;
            padding: 8px 20px;
            border-radius: 4px;
          }
        }
      }
    }
  }
  
  // 英雄区
  .hero {
    margin-top: 70px;
    padding: 80px 0;
    background: linear-gradient(135deg, #f5f7fa 0%, #e4eaf5 100%);
  
    .container {
      display: flex;
      align-items: center;
      gap: 40px;
    }
  
    .hero-content {
      flex: 1;
  
      h1 {
        font-size: 48px;
        line-height: 1.2;
        color: #333;
        margin-bottom: 24px;
  
        br {
          display: none;
        }
      }
  
      p {
        font-size: 18px;
        color: #666;
        margin-bottom: 32px;
        line-height: 1.5;
      }
  
      .hero-btns {
        display: flex;
        gap: 16px;
  
        a {
          text-decoration: none;
          padding: 12px 24px;
          border-radius: 4px;
          font-weight: 600;
          transition: all 0.3s;
        }
  
        .btn-primary {
          background: #42b983;
          color: #fff;
  
          &:hover {
            background: #359469;
            transform: translateY(-2px);
          }
        }
  
        .btn-secondary {
          background: #fff;
          color: #42b983;
          border: 1px solid #42b983;
  
          &:hover {
            background: #f0f8f4;
            transform: translateY(-2px);
          }
        }
      }
    }
  
    .hero-img {
      flex: 1;
  
      img {
        width: 100%;
        border-radius: 8px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
      }
    }
  }
  
  // 功能区
  .features {
    padding: 80px 0;
  
    .section-title {
      text-align: center;
      margin-bottom: 60px;
  
      h2 {
        font-size: 36px;
        color: #333;
        margin-bottom: 16px;
      }
  
      p {
        font-size: 18px;
        color: #666;
      }
    }
  
    .features-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 30px;
    }
  
    .feature-card {
      padding: 30px;
      background: #fff;
      border-radius: 8px;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
      transition: transform 0.3s;
  
      &:hover {
        transform: translateY(-5px);
      }
  
      .feature-icon {
        margin-bottom: 20px;
  
        span {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          color: #fff;
          font-size: 20px;
        }
      }
  
      h3 {
        font-size: 20px;
        color: #333;
        margin-bottom: 12px;
      }
  
      p {
        color: #666;
        line-height: 1.5;
      }
    }
  }
  
  // 页脚
  .footer {
    background: #f8f9fa;
    padding: 60px 0 20px;
  
    .footer-top {
      display: flex;
      justify-content: space-between;
      margin-bottom: 40px;
      padding-bottom: 40px;
      border-bottom: 1px solid #eee;
    }
  
    .footer-logo {
      font-size: 24px;
      font-weight: 700;
      color: #42b983;
      margin-top: 8px;
    }
  
    .footer-links {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 40px;
    }
  
    .link-group {
      h4 {
        font-size: 16px;
        color: #333;
        margin-bottom: 16px;
        font-weight: 600;
      }
  
      ul {
        list-style: none;
  
        li {
          margin-bottom: 8px;
  
          a {
            text-decoration: none;
            color: #666;
            transition: color 0.3s;
  
            &:hover {
              color: #42b983;
            }
          }
        }
      }
    }
  
    .footer-bottom {
      text-align: center;
      color: #999;
      font-size: 14px;
    }
  }
  
  // 响应式适配
  @media (max-width: 992px) {
    .navbar .nav-links {
      display: none;
    }
  
    .navbar .mobile-menu-btn {
      display: flex;
    }
  
    .hero .container {
      flex-direction: column;
      text-align: center;
    }
  
    .hero-content .hero-btns {
      justify-content: center;
    }
  
    .features-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  
  @media (max-width: 768px) {
    .hero h1 {
      font-size: 36px;
  
      br {
        display: block;
      }
    }
  
    .features-grid {
      grid-template-columns: 1fr;
    }
  
    .footer-top {
      flex-direction: column;
      gap: 40px;
    }
  
    .footer-links {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  
  @media (max-width: 576px) {
    .footer-links {
      grid-template-columns: 1fr;
    }
  }
  </style>