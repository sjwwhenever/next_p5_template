# next p5 template

[English](#english) | [中文](#中文)

<a name="english"></a>

A clean, minimal template for creating interactive p5.js sketches with Next.js. Features an intuitive UI with icon controls, real-time parameter adjustments, and export capabilities.

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![p5.js](https://img.shields.io/badge/p5.js-1.10-pink?style=flat-square&logo=p5.js)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8?style=flat-square&logo=tailwindcss)

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/next_p5_template.git
cd next_p5_template
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) to see your sketch

## 🤖 AI-Assisted Development

This template is optimized for AI-assisted coding workflows. Use AI coding assistants to rapidly prototype and iterate on your p5.js sketches.

### Recommended AI Tools

#### Claude Code
[Claude Code](https://claude.com/claude-code) is Anthropic's official CLI for Claude, perfect for iterative development.

**Example prompts for Claude Code:**
- "Add a trail effect to the bouncing circle"
- "Create a new sketch with particle physics"
- "Add color cycling based on mouse position"
- "Implement a grid of interactive shapes"

#### Kimi K2 (kimi-cc)
[Kimi K2](https://github.com/LLM-Red-Team/kimi-cc) is another powerful AI coding assistant.

### Tips for AI-Assisted p5.js Development

1. **Be Specific**: Describe visual effects in detail
   - ❌ "Make it look cool"
   - ✅ "Add a trailing fade effect with 10% opacity background refresh"

2. **Iterate Incrementally**: Build features step by step
   - Start with basic shape
   - Add movement
   - Add interactivity
   - Add visual effects

3. **Reference p5.js Concepts**: Use p5.js terminology
   - "Use `lerp()` for smooth transitions"
   - "Implement Perlin noise for organic movement"
   - "Add easing with `sin()` and `cos()`"

4. **Ask for Explanations**: Understanding helps you build better
   - "Explain how this particle system works"
   - "What does the deltaTime normalization do?"

5. **Export and Share**: Save your configurations
   - Use the Export button to save sketch parameters
   - Share JSON configs with your team or across sessions

## 🎨 Customizing Your Sketch

### 1. Edit the Sketch Logic
Modify `app/sketches/TemplateSketch.ts` to create your own p5.js animation:

```typescript
const sketch = (p: p5) => {
  p.setup = () => {
    // Initialize your sketch
  };

  p.draw = () => {
    // Draw your animation
  };
};
```

### 2. Add Custom Parameters
Update `app/types/sketch.ts` to define new properties:

```typescript
export interface SketchProps {
  // Add your custom parameters
  myParameter: number;
}

export const defaultSketchParams: SketchProps = {
  myParameter: 42,
};
```

### 3. Update UI Controls
Modify `app/components/GuiPanel.tsx` to add controls for your new parameters:

```typescript
<input
  type="range"
  value={params.myParameter}
  onChange={(e) => onParamChange({ myParameter: Number(e.target.value) })}
/>
```

## 🛠️ Built With

- **[Next.js 16](https://nextjs.org/)** - React framework for production
- **[p5.js](https://p5js.org/)** - Creative coding library
- **[React 19](https://react.dev/)** - UI component library
- **[Tailwind CSS v4](https://tailwindcss.com/)** - Utility-first CSS framework
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Lucide React](https://lucide.dev/)** - Icon library

## 📦 Deployment

### Vercel (Recommended)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/next_p5_template)

### Manual Deployment
```bash
npm run build
npm start
```

## 📚 Learn More

- [p5.js Reference](https://p5js.org/reference/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## 👤 Author

**sjwwhenever (不可兼容)**

- GitHub: [@sjwwhenever](https://github.com/sjwwhenever)
- Website: [sjwwhenever.xyz](https://sjwwhenever.xyz)
- Email: sjwwhenever@gmail.com

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/) and [p5.js](https://p5js.org/)
- Icons by [Lucide](https://lucide.dev/)
- Inspired by the creative coding community

---

<a name="中文"></a>

# next p5 模板

[English](#english) | [中文](#中文)

一个简洁、极简的模板，用于使用 Next.js 创建交互式 p5.js 动画。具有直观的图标控制界面、实时参数调整和导出功能。

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![p5.js](https://img.shields.io/badge/p5.js-1.10-pink?style=flat-square&logo=p5.js)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8?style=flat-square&logo=tailwindcss)

## 🚀 快速开始

### 环境要求
- Node.js 18+ 已安装
- npm 或 yarn 包管理器

### 安装步骤

1. 克隆仓库：
```bash
git clone https://github.com/yourusername/next_p5_template.git
cd next_p5_template
```

2. 安装依赖：
```bash
npm install
```

3. 运行开发服务器：
```bash
npm run dev
```

4. 打开 [http://localhost:3000](http://localhost:3000) 查看你的动画

## 🤖 AI 辅助开发

此模板针对 AI 辅助编程工作流进行了优化。使用 AI 编程助手快速原型设计和迭代你的 p5.js 动画。

### 推荐的 AI 工具

#### Claude Code
[Claude Code](https://claude.com/claude-code) 是 Anthropic 官方的 Claude CLI 工具，非常适合迭代开发。

**Claude Code 示例提示词：**
- "为弹跳的圆圈添加拖尾效果"
- "创建一个带粒子物理的新动画"
- "根据鼠标位置添加颜色循环"
- "实现一个交互式图形网格"

#### Kimi K2 (kimi-cc)
[Kimi K2](https://github.com/LLM-Red-Team/kimi-cc) 是另一个强大的 AI 编程助手。

### AI 辅助 p5.js 开发技巧

1. **具体描述**：详细描述视觉效果
   - ❌ "让它看起来酷炫"
   - ✅ "添加 10% 不透明度背景刷新的拖尾淡出效果"

2. **逐步迭代**：分步骤构建功能
   - 从基本形状开始
   - 添加运动
   - 添加交互性
   - 添加视觉效果

3. **使用 p5.js 术语**：使用 p5.js 专业术语
   - "使用 `lerp()` 实现平滑过渡"
   - "使用 Perlin 噪声实现有机运动"
   - "使用 `sin()` 和 `cos()` 添加缓动效果"

4. **寻求解释**：理解有助于你构建得更好
   - "解释这个粒子系统是如何工作的"
   - "deltaTime 归一化是做什么的？"

5. **导出和分享**：保存你的配置
   - 使用导出按钮保存动画参数
   - 与团队分享或跨会话共享 JSON 配置

## 🎨 自定义你的动画

### 1. 编辑动画逻辑
修改 `app/sketches/TemplateSketch.ts` 来创建你自己的 p5.js 动画：

```typescript
const sketch = (p: p5) => {
  p.setup = () => {
    // 初始化你的动画
  };

  p.draw = () => {
    // 绘制你的动画
  };
};
```

### 2. 添加自定义参数
更新 `app/types/sketch.ts` 来定义新属性：

```typescript
export interface SketchProps {
  // 添加你的自定义参数
  myParameter: number;
}

export const defaultSketchParams: SketchProps = {
  myParameter: 42,
};
```

### 3. 更新 UI 控件
修改 `app/components/GuiPanel.tsx` 为你的新参数添加控件：

```typescript
<input
  type="range"
  value={params.myParameter}
  onChange={(e) => onParamChange({ myParameter: Number(e.target.value) })}
/>
```

## 🛠️ 技术栈

- **[Next.js 16](https://nextjs.org/)** - React 生产框架
- **[p5.js](https://p5js.org/)** - 创意编程库
- **[React 19](https://react.dev/)** - UI 组件库
- **[Tailwind CSS v4](https://tailwindcss.com/)** - 实用优先的 CSS 框架
- **[TypeScript](https://www.typescriptlang.org/)** - 类型安全的 JavaScript
- **[Lucide React](https://lucide.dev/)** - 图标库

## 📦 部署

### Vercel（推荐）
[![使用 Vercel 部署](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/next_p5_template)

### 手动部署
```bash
npm run build
npm start
```

## 📚 了解更多

- [p5.js 参考文档](https://p5js.org/reference/)
- [Next.js 文档](https://nextjs.org/docs)
- [Tailwind CSS 文档](https://tailwindcss.com/docs)

## 👤 作者

**sjwwhenever (不可兼容)**

- GitHub: [@sjwwhenever](https://github.com/sjwwhenever)
- 网站: [sjwwhenever.xyz](https://sjwwhenever.xyz)
- 邮箱: sjwwhenever@gmail.com

## 📄 许可证

本项目是开源的，使用 [MIT 许可证](LICENSE)。

## 🙏 致谢

- 使用 [Next.js](https://nextjs.org/) 和 [p5.js](https://p5js.org/) 构建
- 图标来自 [Lucide](https://lucide.dev/)
- 灵感来自创意编程社区

---

Made with ❤️ by [sjwwhenever](https://github.com/sjwwhenever)
