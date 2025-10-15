# Mermaid 在线图表导出器

一个基于 Next.js 的在线 Mermaid 图表编辑和导出工具，支持实时预览、多主题切换和 SVG/PNG 导出功能。

## 功能特性

- 🎨 **实时编辑预览** - Monaco Editor 提供专业的代码编辑体验
- 🎯 **多种图表类型** - 支持流程图、时序图、类图、状态图、甘特图、饼图等
- 🌈 **多主题支持** - 内置多种 Mermaid 主题，满足不同设计需求
- 📱 **响应式设计** - 完美适配桌面端和移动端
- 💾 **多格式导出** - 支持 SVG 和 PNG 格式导出
- 📚 **示例模板** - 提供丰富的图表模板，快速上手
- 🚀 **零配置部署** - 一键部署到 Vercel

## 技术栈

- **前端框架**: Next.js 13+ (App Router)
- **开发语言**: TypeScript
- **样式框架**: Tailwind CSS
- **代码编辑器**: Monaco Editor
- **图表渲染**: Mermaid.js
- **图标库**: Lucide React
- **部署平台**: Vercel

## 快速开始

### 环境要求

- Node.js 16.8+ 
- pnpm 或 npm

### 安装依赖

```bash
# 使用 pnpm (推荐)
pnpm install

# 或使用 npm
npm install
```

### 开发环境

```bash
# 启动开发服务器
pnpm dev

# 或使用 npm
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

### 构建部署

```bash
# 构建生产版本
pnpm build

# 启动生产服务器
pnpm start
```

## 项目结构

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API 路由
│   │   └── export/        # 导出 API
│   ├── editor/            # 编辑器页面
│   ├── help/              # 帮助页面
│   ├── globals.css        # 全局样式
│   ├── layout.tsx         # 根布局
│   └── page.tsx           # 首页
├── components/            # React 组件
│   ├── ExampleTemplates.tsx
│   ├── ExportPanel.tsx
│   ├── MermaidEditor.tsx
│   ├── MermaidPreview.tsx
│   ├── Navigation.tsx
│   └── ThemeSelector.tsx
└── lib/                   # 工具函数
```

## 部署到 Vercel

### 方法一：通过 Vercel CLI

```bash
# 安装 Vercel CLI
npm i -g vercel

# 部署
vercel
```

### 方法二：通过 Git 集成

1. 将代码推送到 GitHub/GitLab/Bitbucket
2. 在 [Vercel](https://vercel.com) 导入项目
3. 自动部署完成

### 环境变量配置

复制 `.env.example` 为 `.env.local` 并配置相应变量：

```bash
cp .env.example .env.local
```

## 使用指南

### 基本操作

1. **编辑代码** - 在左侧编辑器中输入 Mermaid 代码
2. **实时预览** - 右侧自动显示图表预览
3. **切换主题** - 使用主题选择器更换图表样式
4. **选择模板** - 从示例模板快速开始
5. **导出图表** - 选择格式和尺寸导出图片

### 支持的图表类型

- **流程图** (Flowchart)
- **时序图** (Sequence Diagram)  
- **类图** (Class Diagram)
- **状态图** (State Diagram)
- **甘特图** (Gantt Chart)
- **饼图** (Pie Chart)

### 移动端使用

- 使用顶部切换按钮在编辑和预览模式间切换
- 支持触摸操作和手势缩放
- 优化的移动端界面布局

## 开发指南

### 添加新主题

在 `ThemeSelector.tsx` 中添加新主题选项：

```typescript
const themes = [
  { value: 'default', label: '默认' },
  { value: 'dark', label: '深色' },
  { value: 'your-theme', label: '你的主题' },
];
```

### 添加新模板

在 `ExampleTemplates.tsx` 中添加新的示例模板：

```typescript
const templates = [
  {
    name: '你的模板',
    code: `graph TD
    A[开始] --> B[结束]`
  },
];
```

### 自定义样式

修改 `globals.css` 中的 CSS 变量和媒体查询来自定义样式。

## 常见问题

### Q: 图表不显示或显示错误？
A: 检查 Mermaid 语法是否正确，参考帮助页面的语法指南。

### Q: 导出的图片质量不佳？
A: 尝试增加导出尺寸，或选择 SVG 格式获得矢量图形。

### Q: 移动端编辑体验不佳？
A: 建议在桌面端进行复杂编辑，移动端主要用于查看和简单修改。

## 贡献指南

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 致谢

- [Mermaid.js](https://mermaid-js.github.io/) - 强大的图表生成库
- [Monaco Editor](https://microsoft.github.io/monaco-editor/) - VS Code 同款编辑器
- [Next.js](https://nextjs.org/) - React 全栈框架
- [Tailwind CSS](https://tailwindcss.com/) - 实用优先的 CSS 框架