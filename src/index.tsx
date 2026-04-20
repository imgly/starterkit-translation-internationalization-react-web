/**
 * CE.SDK Translation & Internationalization Starterkit - React Entry Point
 *
 * Demonstrates dynamic locale switching in the design editor.
 * Switch between English and German to see the UI update in real-time.
 *
 * @see https://img.ly/docs/cesdk/web/ui-styling/localization/
 */

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import type { Configuration } from '@cesdk/cesdk-js';

import { App } from './app/App';

// ============================================================================
// Editor Configuration
// ============================================================================

export const editorConfig: Configuration = {
  userId: 'starterkit-translation-internationalization-user',

  featureFlags: {
    archiveSceneEnabled: true
  }

  // license: 'YOUR_LICENSE_KEY',
};

// ============================================================================
// React Root Initialization
// ============================================================================

const container = document.getElementById('root');

if (!container) {
  throw new Error('Root element not found');
}

const root = createRoot(container);

root.render(
  <StrictMode>
    <App editorConfig={editorConfig} />
  </StrictMode>
);
