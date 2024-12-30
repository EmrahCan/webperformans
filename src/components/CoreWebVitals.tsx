import React from 'react';
import { MetricCard } from './MetricCard';

export function CoreWebVitals() {
  return (
    <>
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Core Web Vitals</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard
          label="Largest Contentful Paint (LCP)"
          value="0.9s"
          description="LCP measures loading performance. It marks the point in the page load timeline when the main content has likely loaded. For a good user experience, aim for an LCP of 2.5 seconds or less."
          status="good"
        />
        <MetricCard
          label="First Contentful Paint (FCP)"
          value="1.2s"
          description="FCP measures the time from when the page starts loading to when any part of the page's content is rendered on the screen. It is an important user-centric metric for measuring perceived load speed."
          status="good"
        />
        <MetricCard
          label="Total Blocking Time (TBT)"
          value="150ms"
          description="TBT measures the total amount of time that a page is blocked from responding to user input, such as mouse clicks, screen taps, or keyboard presses. A low TBT helps ensure that the page is usable."
          status="good"
        />
      </div>
    </>
  );
}