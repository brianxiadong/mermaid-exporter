'use client';

import { useRef } from 'react';
import Editor from '@monaco-editor/react';

interface MermaidEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export function MermaidEditor({ value, onChange }: MermaidEditorProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const editorRef = useRef<any>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleEditorDidMount = (editor: any, monaco: any) => {
    editorRef.current = editor;

    // 注册 Mermaid 语言
    monaco.languages.register({ id: 'mermaid' });

    // 设置 Mermaid 语法高亮
    monaco.languages.setMonarchTokensProvider('mermaid', {
      tokenizer: {
        root: [
          [/\b(graph|flowchart|sequenceDiagram|classDiagram|stateDiagram|erDiagram|journey|gantt|pie|gitgraph)\b/, 'keyword'],
          [/\b(TD|TB|BT|RL|LR)\b/, 'keyword'],
          [/\b(participant|actor|note|loop|alt|else|opt|par|and|rect|activate|deactivate)\b/, 'keyword'],
          [/\b(title|dateFormat|axisFormat|section|click|class|classDef)\b/, 'keyword'],
          [/-->|---|\||\||==|\.\.|::|->|<->/, 'operator'],
          [/\[[^\]]*\]/, 'string'],
          [/\([^)]*\)/, 'string'],
          [/\{[^}]*\}/, 'string'],
          [/"[^"]*"/, 'string'],
          [/'[^']*'/, 'string'],
          [/%%.*$/, 'comment'],
          [/\d+/, 'number'],
        ],
      },
    });

    // 设置主题
    monaco.editor.defineTheme('mermaidTheme', {
      base: 'vs',
      inherit: true,
      rules: [
        { token: 'keyword', foreground: '0066cc', fontStyle: 'bold' },
        { token: 'operator', foreground: '666666' },
        { token: 'string', foreground: '008000' },
        { token: 'comment', foreground: '999999', fontStyle: 'italic' },
        { token: 'number', foreground: 'ff6600' },
      ],
      colors: {
        'editor.background': '#ffffff',
        'editor.foreground': '#333333',
      },
    });

    monaco.editor.setTheme('mermaidTheme');
  };

  return (
    <div className="h-full">
      <Editor
        height="100%"
        language="mermaid"
        value={value}
        onChange={(newValue) => onChange(newValue || '')}
        onMount={handleEditorDidMount}
        options={{
          minimap: { enabled: typeof window !== 'undefined' && window.innerWidth > 768 },
          scrollBeyondLastLine: false,
          fontSize: typeof window !== 'undefined' && window.innerWidth > 640 ? 14 : 12,
          lineNumbers: 'on',
          wordWrap: 'on',
          automaticLayout: true,
          tabSize: 2,
          insertSpaces: true,
          folding: true,
          lineDecorationsWidth: typeof window !== 'undefined' && window.innerWidth > 640 ? 10 : 5,
          lineNumbersMinChars: typeof window !== 'undefined' && window.innerWidth > 640 ? 3 : 2,
          renderLineHighlight: 'line',
          selectOnLineNumbers: true,
          roundedSelection: false,
          readOnly: false,
          cursorStyle: 'line',
          scrollbar: {
            vertical: 'auto',
            horizontal: 'auto',
            verticalScrollbarSize: 8,
            horizontalScrollbarSize: 8,
          },
        }}
      />
    </div>
  );
}