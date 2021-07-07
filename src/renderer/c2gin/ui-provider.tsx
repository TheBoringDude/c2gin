import React, { createContext, ReactNode, useState } from 'react';

type UIProviderContextProps = {
  children: ReactNode;
};

type UIModes = 'dark' | 'light' | string;

type UIContextProps = {
  mode: UIModes;
  toggleMode: () => void;
};

const getInitTheme = (): UIModes => {
  if (typeof window !== 'undefined' && window.localStorage) {
    const storedPrefs = window.localStorage.getItem('theme');
    if (typeof storedPrefs === 'string') {
      return storedPrefs;
    }

    const userMedia = window.matchMedia('(prefers-color-scheme: light)');
    if (!userMedia.matches) {
      return 'dark';
    }
  }

  return 'light';
};

const setClassTHeme = (t: string) => {
  const root = window.document.documentElement;
  root.classList.remove(t === 'dark' ? 'light' : 'dark');
  root.classList.add(t);
  window.localStorage.setItem('theme', t);
};

const handleTheme = () => {
  const t = getInitTheme();
  setClassTHeme(t);

  return t;
};

const UIContext = createContext<UIContextProps>({
  mode: 'light',
  toggleMode: () => {},
});

const UIProvider = ({ children }: UIProviderContextProps) => {
  const [mode, setMode] = useState<UIModes>(handleTheme());

  /* mode toggle - dark / light */
  const toggleMode = () => {
    const isDark = mode === 'dark';
    const t = isDark ? 'light' : 'dark';

    setClassTHeme(t);
    setMode(t);
  };

  return (
    <UIContext.Provider value={{ mode, toggleMode }}>
      {children}
    </UIContext.Provider>
  );
};

export default UIProvider;
export { UIContext };
