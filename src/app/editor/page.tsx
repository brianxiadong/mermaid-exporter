'use client';

import { useState } from 'react';
import { MermaidEditor } from '@/components/MermaidEditor';
import { MermaidPreview } from '@/components/MermaidPreview';
import { ExportPanel } from '@/components/ExportPanel';
import { ThemeSelector } from '@/components/ThemeSelector';
import { ExampleTemplates } from '@/components/ExampleTemplates';
import { Palette, Code, Eye } from 'lucide-react';

const defaultMermaidCode = `graph TD
    A[开始] --> B{是否登录?}
    B -->|是| C[显示主页]
    B -->|否| D[跳转登录页]
    D --> E[用户登录]
    E --> C
    C --> F[浏览内容]
    F --> G[结束]`;

export default function EditorPage() {
  const [mermaidCode, setMermaidCode] = useState(defaultMermaidCode);
  const [theme, setTheme] = useState('default');
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Mermaid 编辑器</h1>
        <p className="text-gray-600">创建和编辑 Mermaid 图表，实时预览效果</p>
      </div>

      {/* 工具栏 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <Palette className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">主题:</span>
            <ThemeSelector theme={theme} onThemeChange={setTheme} />
          </div>
          
          <div className="flex items-center gap-2">
            <ExampleTemplates onTemplateSelect={setMermaidCode} />
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <button
              onClick={() => setIsPreviewMode(!isPreviewMode)}
              className={`md:hidden flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isPreviewMode
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {isPreviewMode ? (
                <>
                  <Code className="w-4 h-4" />
                  编辑
                </>
              ) : (
                <>
                  <Eye className="w-4 h-4" />
                  预览
                </>
              )}
            </button>
            
            <ExportPanel mermaidCode={mermaidCode} theme={theme} />
          </div>
        </div>
      </div>

      {/* 编辑器和预览区域 */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* 编辑器 */}
        <div className={`${isPreviewMode ? 'hidden md:block' : 'block'}`}>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden h-[600px] md:h-[700px]">
            <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Code className="w-5 h-5" />
                代码编辑器
              </h2>
            </div>
            <div className="h-[calc(100%-60px)]">
              <MermaidEditor
                value={mermaidCode}
                onChange={setMermaidCode}
              />
            </div>
          </div>
        </div>

        {/* 预览区域 */}
        <div className={`${!isPreviewMode ? 'hidden md:block' : 'block'}`}>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden h-[600px] md:h-[700px]">
            <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Eye className="w-5 h-5" />
                实时预览
              </h2>
            </div>
            <div className="h-[calc(100%-60px)] overflow-auto">
              <MermaidPreview
                code={mermaidCode}
                theme={theme}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}