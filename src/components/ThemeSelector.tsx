'use client';

interface ThemeSelectorProps {
  theme: string;
  onThemeChange: (theme: string) => void;
}

export function ThemeSelector({ theme, onThemeChange }: ThemeSelectorProps) {
  const themes = [
    { value: 'default', label: '默认' },
    { value: 'dark', label: '深色' },
    { value: 'forest', label: '森林' },
    { value: 'neutral', label: '中性' },
    { value: 'base', label: '基础' },
  ];

  return (
    <select
      value={theme}
      onChange={(e) => onThemeChange(e.target.value)}
      className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    >
      {themes.map((themeOption) => (
        <option key={themeOption.value} value={themeOption.value}>
          {themeOption.label}
        </option>
      ))}
    </select>
  );
}