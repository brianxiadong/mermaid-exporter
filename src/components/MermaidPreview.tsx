'use client';

import { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';
import { AlertCircle, Loader2 } from 'lucide-react';

interface MermaidPreviewProps {
  code: string;
  theme: string;
}

export function MermaidPreview({ code, theme }: MermaidPreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // 初始化 Mermaid
    mermaid.initialize({
      startOnLoad: false,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      theme: theme as any,
      securityLevel: 'loose',
      fontFamily: 'Arial, sans-serif',
      fontSize: 14,
      flowchart: {
        useMaxWidth: true,
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
        useMaxWidth: true,
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
  }, [theme]);

  useEffect(() => {
    const renderDiagram = async () => {
      if (!containerRef.current || !code.trim()) {
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        // 清空容器
        containerRef.current.innerHTML = '';

        // 生成唯一 ID
        const id = `mermaid-${Date.now()}`;
        
        // 验证语法
        const isValid = await mermaid.parse(code);
        
        if (isValid) {
          // 渲染图表
          const { svg } = await mermaid.render(id, code);
          containerRef.current.innerHTML = svg;
        }
      } catch (err) {
        console.error('Mermaid render error:', err);
        setError(err instanceof Error ? err.message : '图表渲染失败');
      } finally {
        setIsLoading(false);
      }
    };

    const timeoutId = setTimeout(renderDiagram, 300);
    return () => clearTimeout(timeoutId);
  }, [code, theme]);

  return (
    <div className="h-96 relative">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-50 bg-opacity-75 z-10">
          <div className="flex items-center gap-2 text-gray-600">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>渲染中...</span>
          </div>
        </div>
      )}

      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-red-50 z-10">
          <div className="flex items-center gap-2 text-red-600 bg-white px-4 py-2 rounded-lg shadow-sm border border-red-200">
            <AlertCircle className="w-5 h-5" />
            <div>
              <div className="font-medium">语法错误</div>
              <div className="text-sm text-red-500">{error}</div>
            </div>
          </div>
        </div>
      )}

      <div
        ref={containerRef}
        className="w-full h-full overflow-auto p-4 flex items-center justify-center"
        style={{ minHeight: '100%' }}
      />

      {!code.trim() && !isLoading && (
        <div className="absolute inset-0 flex items-center justify-center text-gray-400">
          <div className="text-center">
            <div className="text-lg font-medium mb-2">开始编写 Mermaid 代码</div>
            <div className="text-sm">在左侧编辑器中输入代码，这里将显示实时预览</div>
          </div>
        </div>
      )}
    </div>
  );
}