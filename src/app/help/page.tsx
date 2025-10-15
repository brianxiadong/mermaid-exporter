import { FileText, GitBranch, Users, BarChart3, PieChart, Calendar } from 'lucide-react';

export default function HelpPage() {
  const chartTypes = [
    {
      icon: GitBranch,
      name: '流程图 (Flowchart)',
      description: '展示流程和决策路径',
      syntax: 'graph TD',
      example: `graph TD
    A[开始] --> B{条件判断}
    B -->|是| C[执行操作]
    B -->|否| D[其他操作]
    C --> E[结束]
    D --> E`
    },
    {
      icon: Users,
      name: '时序图 (Sequence Diagram)',
      description: '展示对象间的交互时序',
      syntax: 'sequenceDiagram',
      example: `sequenceDiagram
    participant A as 用户
    participant B as 系统
    A->>B: 发送请求
    B-->>A: 返回响应`
    },
    {
      icon: FileText,
      name: '类图 (Class Diagram)',
      description: '展示类之间的关系',
      syntax: 'classDiagram',
      example: `classDiagram
    class Animal {
        +String name
        +eat()
    }
    class Dog {
        +bark()
    }
    Animal <|-- Dog`
    },
    {
      icon: BarChart3,
      name: '状态图 (State Diagram)',
      description: '展示状态转换',
      syntax: 'stateDiagram-v2',
      example: `stateDiagram-v2
    [*] --> 待机
    待机 --> 运行: 启动
    运行 --> 待机: 停止
    运行 --> [*]: 关闭`
    },
    {
      icon: Calendar,
      name: '甘特图 (Gantt Chart)',
      description: '展示项目时间线',
      syntax: 'gantt',
      example: `gantt
    title 项目计划
    dateFormat YYYY-MM-DD
    section 开发
    需求分析 :2024-01-01, 3d
    编码实现 :2024-01-04, 5d`
    },
    {
      icon: PieChart,
      name: '饼图 (Pie Chart)',
      description: '展示数据占比',
      syntax: 'pie',
      example: `pie title 数据分布
    "A" : 45
    "B" : 35
    "C" : 20`
    }
  ];

  const syntaxGuide = [
    {
      title: '基本语法',
      items: [
        { syntax: 'A --> B', description: '箭头连接' },
        { syntax: 'A --- B', description: '直线连接' },
        { syntax: 'A -.-> B', description: '虚线箭头' },
        { syntax: 'A ==> B', description: '粗箭头' },
      ]
    },
    {
      title: '节点形状',
      items: [
        { syntax: 'A[矩形]', description: '矩形节点' },
        { syntax: 'B(圆角矩形)', description: '圆角矩形节点' },
        { syntax: 'C{菱形}', description: '菱形节点' },
        { syntax: 'D((圆形))', description: '圆形节点' },
      ]
    },
    {
      title: '标签和样式',
      items: [
        { syntax: 'A -->|标签| B', description: '连接线标签' },
        { syntax: 'classDef className fill:#f9f,stroke:#333', description: '定义样式类' },
        { syntax: 'class A className', description: '应用样式类' },
        { syntax: 'click A "http://example.com"', description: '添加链接' },
      ]
    }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">帮助文档</h1>
        <p className="text-gray-600">学习 Mermaid 语法，创建专业图表</p>
      </div>

      {/* 图表类型 */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">支持的图表类型</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {chartTypes.map((chart, index) => {
            const Icon = chart.icon;
            return (
              <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{chart.name}</h3>
                    <p className="text-sm text-gray-600">{chart.description}</p>
                  </div>
                </div>
                <div className="mb-3">
                  <span className="text-sm font-medium text-gray-700">语法关键字:</span>
                  <code className="ml-2 px-2 py-1 bg-gray-100 rounded text-sm font-mono text-blue-600">
                    {chart.syntax}
                  </code>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-700 block mb-2">示例:</span>
                  <pre className="text-xs bg-gray-50 p-3 rounded border overflow-x-auto">
                    <code>{chart.example}</code>
                  </pre>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 语法指南 */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">语法指南</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {syntaxGuide.map((section, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{section.title}</h3>
              <div className="space-y-3">
                {section.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="border-b border-gray-100 pb-3 last:border-b-0">
                    <code className="block text-sm font-mono text-blue-600 bg-gray-50 px-2 py-1 rounded mb-1">
                      {item.syntax}
                    </code>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 使用技巧 */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">使用技巧</h2>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">编辑技巧</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                  <span>使用有意义的节点 ID，便于维护和理解</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                  <span>适当使用空行分隔不同的逻辑块</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                  <span>使用注释 (%% 注释内容) 说明复杂逻辑</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                  <span>保持图表简洁，避免过于复杂的结构</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">导出建议</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                  <span>SVG 格式适合网页展示和打印</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                  <span>根据用途选择合适的尺寸和背景色</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                  <span>深色主题适合演示，浅色主题适合文档</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                  <span>导出前检查预览效果，确保布局正确</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 常见问题 */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">常见问题</h2>
        <div className="space-y-4">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Q: 图表显示语法错误怎么办？</h3>
            <p className="text-gray-600">
              A: 请检查语法是否正确，特别注意关键字拼写、括号匹配和连接符号。可以参考示例模板或重新输入。
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Q: 如何让图表更美观？</h3>
            <p className="text-gray-600">
              A: 尝试不同的主题，使用合适的节点形状，添加有意义的标签，保持布局简洁清晰。
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Q: 导出的图片质量不好？</h3>
            <p className="text-gray-600">
              A: SVG 是矢量格式，可以无损缩放。如果需要位图，建议设置较大的尺寸再导出。
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}