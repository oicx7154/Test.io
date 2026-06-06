import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CookieUtil = {
  set(name: string, value: string, days: number) {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
  },

  get(name: string): string | null {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? decodeURIComponent(match[2]) : null;
  },

  remove(name: string) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=Lax`;
  },
};

function applyAnalytics() {
  CookieUtil.set('lx_session_id', `sess_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`, 1);
  CookieUtil.set('lx_page_views', String(parseInt(CookieUtil.get('lx_page_views') || '0') + 1), 365);
  CookieUtil.set('lx_first_visit', CookieUtil.get('lx_first_visit') || new Date().toISOString(), 365);
  CookieUtil.set('lx_last_visit', new Date().toISOString(), 365);
  CookieUtil.set('lx_referrer', document.referrer || 'direct', 30);
  CookieUtil.set('lx_screen', `${screen.width}x${screen.height}`, 30);
  CookieUtil.set('lx_language', navigator.language, 30);
  CookieUtil.set('lx_timezone', Intl.DateTimeFormat().resolvedOptions().timeZone, 30);
}

function removeAnalytics() {
  ['lx_session_id', 'lx_page_views', 'lx_first_visit', 'lx_last_visit', 'lx_referrer', 'lx_screen', 'lx_language', 'lx_timezone'].forEach(CookieUtil.remove);
}

function applyFunctional() {
  CookieUtil.set('lx_theme', CookieUtil.get('lx_theme') || 'dark', 365);
  CookieUtil.set('lx_sidebar', CookieUtil.get('lx_sidebar') || 'expanded', 365);
  CookieUtil.set('lx_last_page', window.location.hash || '#', 30);
  CookieUtil.set('lx_font_size', CookieUtil.get('lx_font_size') || 'normal', 365);
  CookieUtil.set('lx_notifications', CookieUtil.get('lx_notifications') || 'enabled', 365);
}

function removeFunctional() {
  ['lx_theme', 'lx_sidebar', 'lx_last_page', 'lx_font_size', 'lx_notifications'].forEach(CookieUtil.remove);
}

function applyConsent(prefs: { necessary: boolean; analytics: boolean; functional: boolean }) {
  CookieUtil.set('lx_consent', JSON.stringify({ ...prefs, ts: Date.now() }), 365);
  CookieUtil.set('lx_consent_date', new Date().toISOString(), 365);

  if (prefs.analytics) {
    applyAnalytics();
  } else {
    removeAnalytics();
  }

  if (prefs.functional) {
    applyFunctional();
  } else {
    removeFunctional();
  }
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: false,
    functional: false,
  });

  useEffect(() => {
    const consentCookie = CookieUtil.get('lx_consent');
    if (consentCookie) {
      try {
        const saved = JSON.parse(consentCookie);
        setPreferences({ necessary: true, analytics: !!saved.analytics, functional: !!saved.functional });
        applyConsent({ necessary: true, analytics: !!saved.analytics, functional: !!saved.functional });
      } catch {
        const timer = setTimeout(() => setVisible(true), 1500);
        return () => clearTimeout(timer);
      }
    } else {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptAll = () => {
    const prefs = { necessary: true, analytics: true, functional: true };
    setPreferences(prefs);
    applyConsent(prefs);
    setVisible(false);
  };

  const rejectAll = () => {
    const prefs = { necessary: true, analytics: false, functional: false };
    setPreferences(prefs);
    applyConsent(prefs);
    setVisible(false);
  };

  const savePreferences = () => {
    applyConsent(preferences);
    setVisible(false);
  };

  const togglePreference = (key: 'analytics' | 'functional') => {
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const cookieDetails = [
    {
      key: 'necessary' as const,
      label: '必要 Cookie',
      desc: '网站正常运行所必需的 Cookie，包括 Cookie 同意记录 (lx_consent)、同意日期 (lx_consent_date)。无法关闭。',
      locked: true,
      cookies: ['lx_consent', 'lx_consent_date'],
    },
    {
      key: 'analytics' as const,
      label: '分析 Cookie',
      desc: '收集匿名使用数据以帮助我们改善网站，包括会话 ID、页面浏览次数、首次/最近访问时间、来源页面、屏幕分辨率、语言和时区。',
      locked: false,
      cookies: ['lx_session_id', 'lx_page_views', 'lx_first_visit', 'lx_last_visit', 'lx_referrer', 'lx_screen', 'lx_language', 'lx_timezone'],
    },
    {
      key: 'functional' as const,
      label: '功能 Cookie',
      desc: '记住您的偏好设置，包括主题、侧边栏状态、上次访问页面、字体大小和通知开关，提供更好的个性化体验。',
      locked: false,
      cookies: ['lx_theme', 'lx_sidebar', 'lx_last_page', 'lx_font_size', 'lx_notifications'],
    },
  ];

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="fixed bottom-0 left-0 right-0 z-[9999] p-4 md:p-6"
        >
          <div className="max-w-4xl mx-auto bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden">
            <div className="p-5 md:p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-xl">🍪</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-bold text-lg mb-1.5">Cookie 使用提示</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    我们使用 Cookie 来提升您的浏览体验、分析网站流量并记住您的偏好设置。点击「全部接受」即表示您同意我们使用所有 Cookie。您也可以自定义偏好设置。
                  </p>
                </div>
              </div>

              <AnimatePresence>
                {showSettings && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-5 space-y-3">
                      {cookieDetails.map((item) => (
                        <div
                          key={item.key}
                          onClick={() => { if (!item.locked) togglePreference(item.key as 'analytics' | 'functional'); }}
                          className={`p-3.5 bg-white/5 rounded-xl border transition-all ${
                            item.locked
                              ? 'border-white/5 cursor-default'
                              : 'border-white/5 hover:border-white/10 cursor-pointer'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex-1 min-w-0 pr-4">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-white font-medium text-sm">{item.label}</span>
                                {item.locked && (
                                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 border border-green-500/30">
                                    必需
                                  </span>
                                )}
                              </div>
                              <p className="text-slate-500 text-xs leading-relaxed">{item.desc}</p>
                              <div className="flex flex-wrap gap-1 mt-2">
                                {item.cookies.map((c) => (
                                  <span key={c} className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-500 font-mono">
                                    {c}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <div className={`w-11 h-6 rounded-full border flex items-center px-0.5 transition-all duration-300 shrink-0 ${
                              item.locked
                                ? 'bg-green-500/30 border-green-500/40 cursor-not-allowed'
                                : preferences[item.key]
                                  ? 'bg-indigo-500/30 border-indigo-500/40'
                                  : 'bg-slate-700/50 border-slate-600/50'
                            }`}>
                              <div className={`w-5 h-5 rounded-full transition-all duration-300 ${
                                item.locked
                                  ? 'bg-green-400 translate-x-5'
                                  : preferences[item.key]
                                    ? 'bg-indigo-400 translate-x-5'
                                    : 'bg-slate-400 translate-x-0'
                              }`} />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-5">
                <button
                  onClick={() => setShowSettings(!showSettings)}
                  className="px-4 py-2.5 text-sm font-medium text-slate-400 hover:text-white border border-white/10 hover:border-white/20 rounded-xl transition-all"
                >
                  {showSettings ? '隐藏设置' : '⚙️ Cookie 设置'}
                </button>

                <div className="flex-1" />

                {showSettings ? (
                  <button
                    onClick={savePreferences}
                    className="px-5 py-2.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl transition-all"
                  >
                    保存偏好
                  </button>
                ) : (
                  <button
                    onClick={rejectAll}
                    className="px-5 py-2.5 text-sm font-medium text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all"
                  >
                    仅必要
                  </button>
                )}

                <button
                  onClick={acceptAll}
                  className="px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 rounded-xl transition-all shadow-lg shadow-indigo-500/25"
                >
                  全部接受
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
