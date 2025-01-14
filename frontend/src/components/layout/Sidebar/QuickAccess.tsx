import React from 'react';
import { quickAccessItems } from "../../../constants/navigation";

interface QuickAccessProps {
  sidebarWidth: number;
}

type ColorOption = 'blue-500' | 'purple-500' | 'pink-500' | 'green-500' | 'orange-500' | 'cyan-500';

type ColorMap = {
  [key in ColorOption]: string;
};

const QuickAccess = ({ sidebarWidth }: QuickAccessProps) => {
  const colorMap: ColorMap = {
    'blue-500': 'group [&>svg]:text-blue-500 hover:bg-gradient-to-br hover:from-blue-400 hover:to-blue-600',
    'purple-500': 'group [&>svg]:text-purple-500 hover:bg-gradient-to-br hover:from-purple-400 hover:to-purple-600',
    'pink-500': 'group [&>svg]:text-pink-500 hover:bg-gradient-to-br hover:from-pink-400 hover:to-pink-600',
    'green-500': 'group [&>svg]:text-green-500 hover:bg-gradient-to-br hover:from-green-400 hover:to-green-600',
    'orange-500': 'group [&>svg]:text-orange-500 hover:bg-gradient-to-br hover:from-orange-400 hover:to-orange-600',
    'cyan-500': 'group [&>svg]:text-cyan-500 hover:bg-gradient-to-br hover:from-cyan-400 hover:to-cyan-600',
  };

  const getItemClasses = (color: string): string => {
    return colorMap[color as ColorOption] || '';
  };

  return (
    <div className="py-2">
      <div 
        className="grid gap-2.5" 
        style={{ 
          gridTemplateColumns: `repeat(${Math.floor((sidebarWidth - 32) / 70)}, 1fr)`,
        }}
      >
        {quickAccessItems.map((item, index) => {
          const numColumns = Math.floor((sidebarWidth - 32) / 70);
          const gapSpace = (numColumns - 1) * 10;
          const availableWidth = sidebarWidth - 32 - gapSpace;
          const iconWidth = Math.floor(availableWidth / numColumns);
          
          return (
            <button
              key={index}
              style={{ width: `${iconWidth}px` }}
              className={`h-12 rounded-lg flex items-center justify-center cursor-pointer relative overflow-hidden
                before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/10 before:to-transparent before:transition-opacity before:duration-300
                after:absolute after:inset-0 after:bg-gradient-to-br after:opacity-0 after:transition-opacity after:duration-300
                hover:after:opacity-100 group
                ${getItemClasses(item.color)}`}
            >
              <item.icon className="h-5 w-5 transition-all duration-300 relative z-10 group-hover:text-white" />
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuickAccess;