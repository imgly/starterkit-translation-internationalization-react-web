/**
 * App Component - Translation & Internationalization Starterkit
 *
 * Main application component that demonstrates dynamic locale switching
 * in the CE.SDK design editor. Users can switch between English and German
 * locales using the i18n runtime API.
 *
 * @see https://img.ly/docs/cesdk/web/ui-styling/localization/
 */

import { useCallback, useRef, useState } from 'react';
import { CreativeEditor } from '@cesdk/cesdk-js/react';
import type CreativeEditorSDK from '@cesdk/cesdk-js';
import type { Configuration } from '@cesdk/cesdk-js';

import { initTranslationInternationalizationEditor } from '../imgly';

import { LocaleSwitcher, type Locale } from './LocaleSwitcher';
import styles from './App.module.css';

interface AppProps {
  editorConfig: Configuration;
}

/**
 * Get the browser's preferred locale (en or de), defaulting to 'en'
 */
function getBrowserLocale(): Locale {
  const browserLang = navigator.language.split('-')[0];
  return browserLang === 'de' ? 'de' : 'en';
}

/**
 * App Component
 *
 * Renders the locale switcher and the Creative Editor.
 * When the locale changes, the editor updates dynamically using the i18n API.
 */
export function App({ editorConfig }: AppProps) {
  const [selectedLocale, setSelectedLocale] =
    useState<Locale>(getBrowserLocale());
  const cesdkRef = useRef<CreativeEditorSDK | null>(null);
  const initialLocaleRef = useRef<Locale>(getBrowserLocale());

  // ============================================================================
  // Locale Change Handler
  // ============================================================================

  const handleLocaleChange = useCallback((newLocale: Locale) => {
    setSelectedLocale(newLocale);

    // Use i18n runtime API to change locale without recreating the editor
    if (cesdkRef.current) {
      cesdkRef.current.i18n.setLocale(newLocale);
    }
  }, []);

  // ============================================================================
  // Editor Initialization
  // ============================================================================

  const handleEditorInit = useCallback(async (cesdk: CreativeEditorSDK) => {
    // Store reference for locale switching
    cesdkRef.current = cesdk;

    // Debug access (remove in production)
    (window as unknown as { cesdk: CreativeEditorSDK }).cesdk = cesdk;

    // Set the initial locale using the i18n API
    cesdk.i18n.setLocale(initialLocaleRef.current);

    // Initialize the translation & internationalization editor
    await initTranslationInternationalizationEditor(cesdk);
  }, []);

  // ============================================================================
  // Render
  // ============================================================================

  return (
    <div className={styles.appContainer}>
      {/* Locale Switcher */}
      <LocaleSwitcher
        selectedLocale={selectedLocale}
        onLocaleChange={handleLocaleChange}
      />

      {/* Creative Editor */}
      <div className={styles.cesdkWrapper}>
        <CreativeEditor config={editorConfig} init={handleEditorInit} />
      </div>
    </div>
  );
}
