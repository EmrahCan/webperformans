import React from 'react';
import { Smartphone, Monitor } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import type { DeviceType } from '../types/analysis';

interface DeviceSelectorProps {
  selectedDevice: DeviceType;
  onDeviceChange: (device: DeviceType) => void;
}

export function DeviceSelector({ selectedDevice, onDeviceChange }: DeviceSelectorProps) {
  const { t } = useLanguage();

  return (
    <div className="flex gap-2 mb-4">
      <button
        onClick={() => onDeviceChange('desktop')}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
          selectedDevice === 'desktop'
            ? 'bg-blue-100 text-blue-700'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }`}
      >
        <Monitor className="w-5 h-5" />
        <span>{t('deviceSelector.desktop')}</span>
      </button>
      <button
        onClick={() => onDeviceChange('mobile')}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
          selectedDevice === 'mobile'
            ? 'bg-blue-100 text-blue-700'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }`}
      >
        <Smartphone className="w-5 h-5" />
        <span>{t('deviceSelector.mobile')}</span>
      </button>
    </div>
  );
}