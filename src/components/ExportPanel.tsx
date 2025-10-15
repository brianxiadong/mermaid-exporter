'use client';

import { useState } from 'react';
import { Download, Settings, Loader2 } from 'lucide-react';
import mermaid from 'mermaid';

interface ExportPanelProps {
  mermaidCode: string;
  theme: string;
}

export function ExportPanel({ mermaidCode, theme }: ExportPanelProps) {
  const [isExporting, setIsExporting] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [exportSettings, setExportSettings] = useState({
    width: 800,
    height: 600,
    backgroundColor: 'transparent'
  });

  const handleExport = async () => {
    if (!mermaidCode.trim()) {
      alert('请先输入 Mermaid 代码');
      return;
    }

    setIsExporting(true);

    try {
      // 初始化 Mermaid
      mermaid.initialize({
        startOnLoad: false,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        theme: theme as any,
        securityLevel: 'loose',
        fontFamily: 'Arial, sans-serif',
        fontSize: 14,
        flowchart: {
          useMaxWidth: false,
          htmlLabels: true,
          curve: 'basis',
        },
        sequence: {
          diagramMarginX: 50,
          diagramMarginY: 10,
          actorMargin: 50,
          width: 150,
          height: 65,
          boxMargin: 10,
          boxTextMargin: 5,
          noteMargin: 10,
          messageMargin: 35,
          mirrorActors: true,
          bottomMarginAdj: 1,
          useMaxWidth: false,
        },
        gantt: {
          titleTopMargin: 25,
          barHeight: 20,
          fontSize: 11,
          gridLineStartPadding: 35,
          leftPadding: 75,
          topPadding: 50,
          rightPadding: 75,
        },
      });

      // 验证 Mermaid 语法
      const isValid = await mermaid.parse(mermaidCode);
      if (!isValid) {
        throw new Error('Mermaid 语法无效');
      }

      // 生成 SVG
      const { svg } = await mermaid.render(`mermaid-export-${Date.now()}`, mermaidCode);

      // 修改 SVG 以应用设置
      let modifiedSvg = svg;
      
      // 应用背景色
      if (exportSettings.backgroundColor && exportSettings.backgroundColor !== 'transparent') {
        modifiedSvg = modifiedSvg.replace(
          '<svg',
          `<svg style="background-color: ${exportSettings.backgroundColor}"`
        );
      }

      // 应用尺寸设置
      if (exportSettings.width || exportSettings.height) {
        const widthAttr = exportSettings.width ? `width="${exportSettings.width}"` : '';
        const heightAttr = exportSettings.height ? `height="${exportSettings.height}"` : '';
        modifiedSvg = modifiedSvg.replace(
          /<svg[^>]*>/,
          (match) => {
            let result = match;
            if (exportSettings.width) {
              result = result.includes('width=') 
                ? result.replace(/width="[^"]*"/, widthAttr)
                : result.replace('<svg', `<svg ${widthAttr}`);
            }
            if (exportSettings.height) {
              result = result.includes('height=')
                ? result.replace(/height="[^"]*"/, heightAttr)
                : result.replace('<svg', `<svg ${heightAttr}`);
            }
            return result;
          }
        );
      }

      // 直接下载 SVG
      const blob = new Blob([modifiedSvg], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'mermaid-chart.svg';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

    } catch (error) {
      console.error('Export error:', error);
      alert('导出失败：' + (error instanceof Error ? error.message : '未知错误'));
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="relative">
      <div className="flex items-center gap-2">
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium text-gray-700 transition-colors"
        >
          <Settings className="w-4 h-4" />
          设置
        </button>

        <button
          onClick={handleExport}
          disabled={isExporting || !mermaidCode.trim()}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white rounded-lg text-sm font-medium transition-colors"
        >
          {isExporting ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Download className="w-4 h-4" />
          )}
          {isExporting ? '导出中...' : '导出 SVG'}
        </button>
      </div>

      {showSettings && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setShowSettings(false)}
          />
          <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-20 p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">导出设置</h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    宽度 (px)
                  </label>
                  <input
                    type="number"
                    value={exportSettings.width}
                    onChange={(e) => setExportSettings(prev => ({
                      ...prev,
                      width: parseInt(e.target.value) || 800
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min="100"
                    max="4000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    高度 (px)
                  </label>
                  <input
                    type="number"
                    value={exportSettings.height}
                    onChange={(e) => setExportSettings(prev => ({
                      ...prev,
                      height: parseInt(e.target.value) || 600
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min="100"
                    max="4000"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  背景颜色
                </label>
                <select
                  value={exportSettings.backgroundColor}
                  onChange={(e) => setExportSettings(prev => ({
                    ...prev,
                    backgroundColor: e.target.value
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="transparent">透明</option>
                  <option value="white">白色</option>
                  <option value="#f8f9fa">浅灰</option>
                  <option value="#343a40">深灰</option>
                  <option value="black">黑色</option>
                </select>
              </div>


            </div>
          </div>
        </>
      )}
    </div>
  );
}