// Runs in <head> before first paint so the page never flashes the wrong theme.
// A saved choice ("light" | "dark") wins; otherwise the CSS follows prefers-color-scheme.
export const THEME_STORAGE_KEY = "at-portfolio-theme";

export const themeBootScript = `(function(){document.documentElement.setAttribute("data-js","");try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");if(t==="light"||t==="dark"){document.documentElement.setAttribute("data-theme",t);}}catch(e){}})();`;
