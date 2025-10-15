import Link from 'next/link';
import { FileText, Download, Palette, Smartphone, ArrowRight } from 'lucide-react';

export default function Home() {
  const features = [
    {
      icon: FileText,
      title: 'Mermaid 语法支持',
      description: '支持流程图、时序图、甘特图等多种图表类型，语法简单易学'
    },
    {
      icon: Download,
      title: 'SVG 导出',
      description: '一键导出高质量 SVG 格式图表，支持自定义尺寸和背景'
    },
    {
      icon: Palette,
      title: '多主题支持',
      description: '内置多种精美主题，满足不同场景的视觉需求'
    },
    {
      icon: Smartphone,
      title: '响应式设计',
      description: '完美适配桌面和移动设备，随时随地创建图表'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Hero Section */}
      <div className="text-center py-16">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Mermaid 在线图表导出器
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          简单、快速、专业的在线 Mermaid 图表创建和导出工具。
          支持多种图表类型，实时预览，一键导出高质量 SVG 格式。
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/editor"
            className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 flex items-center gap-2"
          >
            开始创建
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/help"
            className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
          >
            查看文档
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          核心功能
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Demo Section */}
      <div className="py-16 bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            快速开始
          </h2>
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                简单三步，创建专业图表
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                    1
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">输入 Mermaid 代码</h4>
                    <p className="text-gray-600 text-sm">使用简单的文本语法描述你的图表</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                    2
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">实时预览</h4>
                    <p className="text-gray-600 text-sm">即时查看图表效果，支持多种主题</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                    3
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">导出 SVG</h4>
                    <p className="text-gray-600 text-sm">一键导出高质量矢量图格式</p>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <Link
                  href="/editor"
                  className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
                >
                  立即体验
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <h4 className="font-medium text-gray-900 mb-3">示例代码：</h4>
              <pre className="text-sm text-gray-700 bg-white p-4 rounded border overflow-x-auto">
{`graph TD
    A[开始] --> B{是否登录?}
    B -->|是| C[显示主页]
    B -->|否| D[跳转登录页]
    D --> E[用户登录]
    E --> C`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
