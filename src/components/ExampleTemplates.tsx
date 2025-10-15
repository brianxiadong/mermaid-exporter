'use client';

import { useState } from 'react';
import { FileText, ChevronDown } from 'lucide-react';

interface ExampleTemplatesProps {
  onTemplateSelect: (code: string) => void;
}

export function ExampleTemplates({ onTemplateSelect }: ExampleTemplatesProps) {
  const [isOpen, setIsOpen] = useState(false);

  const templates = [
    {
      name: '流程图',
      code: `graph TD
    A[开始] --> B{是否登录?}
    B -->|是| C[显示主页]
    B -->|否| D[跳转登录页]
    D --> E[用户登录]
    E --> C
    C --> F[浏览内容]
    F --> G[结束]`
    },
    {
      name: '时序图',
      code: `sequenceDiagram
    participant A as 用户
    participant B as 前端
    participant C as 后端
    participant D as 数据库

    A->>B: 登录请求
    B->>C: 验证用户信息
    C->>D: 查询用户数据
    D-->>C: 返回用户信息
    C-->>B: 验证结果
    B-->>A: 登录成功`
    },
    {
      name: '类图',
      code: `classDiagram
    class User {
        +String name
        +String email
        +login()
        +logout()
    }
    
    class Admin {
        +String permissions
        +manageUsers()
    }
    
    class Product {
        +String title
        +Number price
        +getDetails()
    }
    
    User <|-- Admin
    User --> Product : purchases`
    },
    {
      name: '甘特图',
      code: `gantt
    title 项目开发计划
    dateFormat  YYYY-MM-DD
    section 需求分析
    需求收集           :done,    des1, 2024-01-01,2024-01-05
    需求分析           :done,    des2, 2024-01-06, 3d
    section 设计阶段
    UI设计            :active,  des3, 2024-01-10, 5d
    架构设计           :         des4, after des2, 3d
    section 开发阶段
    前端开发           :         dev1, 2024-01-20, 10d
    后端开发           :         dev2, 2024-01-20, 8d`
    },
    {
      name: '饼图',
      code: `pie title 用户设备分布
    "桌面端" : 45
    "移动端" : 35
    "平板" : 15
    "其他" : 5`
    },
    {
      name: '状态图',
      code: `stateDiagram-v2
    [*] --> 未登录
    未登录 --> 已登录: 登录成功
    已登录 --> 未登录: 退出登录
    已登录 --> 浏览中: 开始浏览
    浏览中 --> 购物车: 添加商品
    购物车 --> 结算: 确认订单
    结算 --> 已登录: 支付完成
    浏览中 --> 已登录: 返回首页`
    }
  ];

  const handleTemplateSelect = (template: typeof templates[0]) => {
    onTemplateSelect(template.code);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium text-gray-700 transition-colors"
      >
        <FileText className="w-4 h-4" />
        示例模板
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-20">
            <div className="py-2">
              {templates.map((template, index) => (
                <button
                  key={index}
                  onClick={() => handleTemplateSelect(template)}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  {template.name}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}