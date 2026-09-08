/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef } from 'react';

export interface RecoverySettingItem {
  id: string;
  label: string;
  value: string;
  onNext: () => void;
  onPrev: () => void;
}

interface AndroidRecoveryMenuProps {
  selectedIndex: number;
  items: RecoverySettingItem[];
  compact?: boolean;
  onSelect?: (index: number) => void;
}

export const AndroidRecoveryMenu: React.FC<AndroidRecoveryMenuProps> = ({
  selectedIndex,
  items,
  compact = false,
  onSelect
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Automatically scroll selected item into view cleanly
  useEffect(() => {
    const activeEl = itemRefs.current[selectedIndex];
    if (activeEl && containerRef.current) {
      activeEl.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  }, [selectedIndex]);

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 z-40 bg-black p-1 sm:p-1.5 flex flex-col font-mono select-none overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent shadow-[inset_0_0_20px_rgba(0,0,0,1)] border border-[var(--color-lcd-primary)]/20"
    >
      {/* Settings List - Only Settings, Zero Title Bar, Zero Footer */}
      <div className="flex flex-col gap-[2px] sm:gap-[3px] py-0.5 min-h-full">
        {items.map((item, idx) => {
          const isSelected = idx === selectedIndex;

          return (
            <div
              key={item.id}
              ref={(el) => { itemRefs.current[idx] = el; }}
              onClick={() => {
                if (isSelected) {
                  item.onNext();
                } else {
                  onSelect?.(idx);
                }
              }}
              className="flex items-center justify-between px-2 py-1.5 rounded-[2px] leading-tight cursor-pointer transition-all bg-transparent"
            >
              {/* Item Label with Cursor - Highlighted with Player Theme */}
              <div className="flex items-center gap-1.5 min-w-0 truncate">
                <span className={`w-2.5 text-center font-bold flex-shrink-0 transition-all ${
                  isSelected 
                    ? 'text-[var(--color-lcd-primary)] font-black drop-shadow-[0_0_8px_var(--color-lcd-primary)] scale-110' 
                    : 'text-transparent'
                }`}>
                  {isSelected ? '>' : ' '}
                </span>
                <span className={`text-[8px] sm:text-[9px] uppercase tracking-wider truncate transition-all ${
                  isSelected
                    ? 'text-[var(--color-lcd-primary)] font-bold drop-shadow-[0_0_8px_var(--color-lcd-primary)]'
                    : 'text-[var(--color-lcd-primary)]/55 font-medium hover:text-[var(--color-lcd-primary)]/80'
                }`}>
                  {item.label}
                </span>
              </div>

              {/* Display Current Setting Value - Highlighted with Player Theme */}
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  item.onNext();
                }}
                className={`text-[8px] sm:text-[9px] tracking-wider whitespace-nowrap ml-2 flex-shrink-0 font-bold px-1.5 py-0.5 rounded transition-all active:scale-95 ${
                  isSelected 
                    ? 'text-[var(--color-lcd-secondary)] font-black drop-shadow-[0_0_8px_var(--color-lcd-secondary)]' 
                    : 'text-[var(--color-lcd-secondary)]/60 hover:text-[var(--color-lcd-secondary)]/85'
                }`}
                title="Click to change option"
              >
                [ {item.value} ]
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

