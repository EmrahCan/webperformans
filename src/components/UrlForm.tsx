import React from 'react';
import { Globe } from 'lucide-react';

interface UrlFormProps {
  url: string;
  onUrlChange: (url: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isAnalyzing: boolean;
}

export function UrlForm({ url, onUrlChange, onSubmit, isAnalyzing }: UrlFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) {
      alert('Please enter a valid URL');
      return;
    }
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      onUrlChange('https://' + url);
    }
    onSubmit(e);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 w-full max-w-4xl mx-auto mb-8">
      <div className="flex-grow">
        <label htmlFor="url" className="sr-only">URL</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
            <Globe className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            id="url"
            value={url}
            onChange={(e) => onUrlChange(e.target.value)}
            placeholder="Enter website URL (e.g., https://example.com)"
            className="w-full pl-10 pr-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            disabled={isAnalyzing}
          />
        </div>
      </div>
      <button
        type="submit"
        disabled={isAnalyzing}
        className="px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isAnalyzing ? 'Analyzing...' : 'Analyze'}
      </button>
    </form>
  );
}