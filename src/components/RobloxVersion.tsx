import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, RefreshCw, Monitor, AlertCircle, Clock, Cpu } from 'lucide-react';

interface PastVersionInfo {
  Windows: string;
  WindowsDate: string;
  Mac: string;
  MacDate: string;
}

interface VersionInfo {
  windows: string;
  windowsDate: string;
  mac: string;
  macDate: string;
}

// Custom Apple/Mac icon since lucide-react doesn't have one
function AppleIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 5-4 5-8 0-3-1.56-5.08-4-5.08-1.5 0-2.5.78-4 .78h-2c-1.5 0-2.5-.78-4-.78C4.56 8.92 3 10.94 3 13.94c0 4 2 8 5 8 1.25 0 2.5-1.06 4-1.06Z" />
      <path d="M12 7.84c0-2.5 2-4.5 4-4.84" />
    </svg>
  );
}

function VersionCard({
  platform,
  color,
  icon: Icon,
  currentVersion,
  currentDate,
  pastVersion,
  pastDate,
  loading,
  formatDate,
  binaryType,
}: {
  platform: string;
  color: 'green' | 'blue';
  icon: React.FC<{ className?: string }>;
  currentVersion: string;
  currentDate: string;
  pastVersion?: string;
  pastDate?: string;
  loading: boolean;
  formatDate: (s: string) => string;
  binaryType: string;
}) {
  const colorClasses = {
    green: {
      bg: 'bg-green-500/5',
      border: 'border-green-500/20',
      badge: 'bg-green-500/20 text-green-400 border-green-500/20',
      icon: 'text-green-400',
      glow: 'group-hover:shadow-green-500/10',
    },
    blue: {
      bg: 'bg-blue-500/5',
      border: 'border-blue-500/20',
      badge: 'bg-blue-500/20 text-blue-400 border-blue-500/20',
      icon: 'text-blue-400',
      glow: 'group-hover:shadow-blue-500/10',
    },
  };

  const c = colorClasses[color];

  const openDownloadLink = (version: string) => {
    const url = `https://rdd.weao.gg/?channel=LIVE&binaryType=${binaryType}&version=${version}`;
    window.open(url, '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`group relative p-6 rounded-2xl ${c.bg} border ${c.border} overflow-hidden transition-all duration-500 hover:scale-[1.02] ${c.glow} hover:shadow-xl`}
    >
      {/* Background icon watermark */}
      <div className="absolute -top-2 -right-2 opacity-[0.04]">
        <Icon className={`w-32 h-32 ${c.icon}`} />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl ${c.bg} border ${c.border} flex items-center justify-center`}>
              <Icon className={`w-5 h-5 ${c.icon}`} />
            </div>
            <div>
              <span className={`inline-block px-2.5 py-0.5 rounded-md text-xs font-bold ${c.badge} border`}>
                {platform}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs text-green-400 font-medium">在线</span>
          </div>
        </div>

        {/* Current version */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-1.5">
            <Cpu className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">当前版本</span>
          </div>
          <div className="font-mono text-lg text-white mb-1 break-all">
            {loading ? (
              <div className="h-7 w-48 bg-white/10 rounded-lg animate-pulse" />
            ) : (
              currentVersion
            )}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <Clock className="w-3 h-3" />
            {loading ? '加载中...' : formatDate(currentDate)}
          </div>
        </div>

        {/* Past version */}
        {pastVersion && (
          <div className="mb-5 pl-3 border-l-2 border-white/5">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs text-slate-600 font-medium uppercase tracking-wider">上一个版本</span>
            </div>
            <div className="font-mono text-sm text-slate-400 break-all">
              {pastVersion}
            </div>
            {pastDate && (
              <div className="flex items-center gap-1.5 text-xs text-slate-600 mt-0.5">
                <Clock className="w-3 h-3" />
                {formatDate(pastDate)}
              </div>
            )}
          </div>
        )}

        {/* Download buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => {
              if (currentVersion !== '未知') {
                openDownloadLink(currentVersion);
              }
            }}
            disabled={loading || currentVersion === '未知'}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-500 hover:to-purple-500 text-sm font-semibold transition-all duration-300 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Download className="w-4 h-4" />
            最新版本
          </button>
          <button
            onClick={() => {
              if (pastVersion) {
                openDownloadLink(pastVersion);
              } else if (currentVersion !== '未知') {
                openDownloadLink(currentVersion);
              }
            }}
            disabled={loading || (currentVersion === '未知' && !pastVersion)}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-white/20 text-sm font-semibold transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <AlertCircle className="w-4 h-4" />
            旧版本
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function RobloxVersion() {
  const [loading, setLoading] = useState(true);
  const [currentVersion, setCurrentVersion] = useState<VersionInfo>({
    windows: '未知',
    windowsDate: '未知',
    mac: '未知',
    macDate: '未知',
  });
  const [pastVersion, setPastVersion] = useState<PastVersionInfo | null>(null);

  const getRobloxVersion = async (): Promise<VersionInfo> => {
    const endpoint = 'https://inject.today/api/versions/current';
    try {
      const response = await fetch(endpoint);
      if (response.ok) {
        const data = await response.json();
        return {
          windows: data.Windows?.Version || '未知',
          windowsDate: data.Windows?.Date || '未知',
          mac: data.Macintosh?.Version || '未知',
          macDate: data.Macintosh?.Date || '未知',
        };
      }
    } catch (error) {
      console.error('获取 Roblox 版本失败:', error);
    }
    return { windows: '未知', windowsDate: '未知', mac: '未知', macDate: '未知' };
  };

  const getRobloxPastVersion = async (): Promise<PastVersionInfo | null> => {
    const endpoints = [
      'http://farts.fadedis.xyz:25551/api/versions/past',
      'https://inject.today/api/versions/past',
    ];

    for (const endpoint of endpoints) {
      try {
        const response = await fetch(endpoint);
        if (response.ok) {
          const data = await response.json();
          if (data) {
            return {
              Windows: data.Windows || '未知',
              WindowsDate: data.WindowsDate || '未知',
              Mac: data.Mac || '未知',
              MacDate: data.MacDate || '未知',
            };
          }
        }
      } catch (error) {
        console.error('从 ' + endpoint + ' 获取旧版本失败:', error);
      }
    }

    // Try with proxies if direct requests fail
    const proxyServices = [
      'https://api.allorigins.win/get?url=',
      'https://api.codetabs.com/v1/proxy?quest=',
    ];
    for (const proxyBase of proxyServices) {
      for (const endpoint of endpoints) {
        try {
          const proxyUrl = proxyBase + encodeURIComponent(endpoint);
          const proxyResponse = await fetch(proxyUrl);
          if (proxyResponse.ok) {
            let text = await proxyResponse.text();
            if (proxyBase.includes('allorigins')) {
              try {
                const parsed = JSON.parse(text);
                text = parsed.contents;
              } catch {
                continue;
              }
            }
            if (text.trim().startsWith('{') || text.trim().startsWith('[')) {
              const data = JSON.parse(text);
              if (data) {
                return {
                  Windows: data.Windows || '未知',
                  WindowsDate: data.WindowsDate || '未知',
                  Mac: data.Mac || '未知',
                  MacDate: data.MacDate || '未知',
                };
              }
            }
          }
        } catch {
          // try next proxy
        }
      }
    }

    return null;
  };

  const formatDate = (dateString: string) => {
    if (!dateString || dateString === '未知') return '未知';
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return dateString;
      return date.toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      });
    } catch {
      return dateString;
    }
  };

  const fetchVersion = async () => {
    setLoading(true);
    const [version, past] = await Promise.all([getRobloxVersion(), getRobloxPastVersion()]);
    setCurrentVersion(version);
    setPastVersion(past);
    setLoading(false);
  };

  useEffect(() => {
    fetchVersion();
  }, []);

  return (
    <section id="version" className="relative py-28">
      {/* BG glow */}
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-violet-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold tracking-widest uppercase text-indigo-400 mb-3 block">
            版本追踪
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Roblox <span className="text-gradient">版本</span>
          </h2>
          <p className="max-w-xl mx-auto text-slate-400 text-lg">
            实时获取 Roblox 客户端版本,下载当前或上一个版本.
          </p>
        </motion.div>

        {/* Refresh bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="flex items-center justify-between mb-8 p-4 rounded-2xl glow-card"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
              <Monitor className="w-5 h-5 text-violet-400" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">实时版本监控</h3>
              <p className="text-xs text-slate-500">版本由weao提供api</p>
            </div>
          </div>
          <button
            onClick={fetchVersion}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300 disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            {loading ? '刷新中...' : '刷新'}
          </button>
        </motion.div>

        {/* Version cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <VersionCard
            platform="WINDOWS"
            color="green"
            icon={Monitor}
            currentVersion={currentVersion.windows}
            currentDate={currentVersion.windowsDate}
            pastVersion={pastVersion?.Windows}
            pastDate={pastVersion?.WindowsDate}
            loading={loading}
            formatDate={formatDate}
            binaryType="WindowsPlayer"
          />
          <VersionCard
            platform="macOS"
            color="blue"
            icon={AppleIcon}
            currentVersion={currentVersion.mac}
            currentDate={currentVersion.macDate}
            pastVersion={pastVersion?.Mac}
            pastDate={pastVersion?.MacDate}
            loading={loading}
            formatDate={formatDate}
            binaryType="MacPlayer"
          />
        </div>

        {/* Info banner */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 p-4 rounded-2xl bg-indigo-500/5 border border-indigo-500/15 flex flex-col sm:flex-row items-start sm:items-center gap-3"
        >
          <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center shrink-0">
            <AlertCircle className="w-4 h-4 text-indigo-400" />
          </div>
          <p className="text-sm text-slate-400 leading-relaxed">
            <span className="font-semibold text-indigo-300">提示：</span>{' '}
            如果你的执行器在 Roblox 更新后无法使用,可以下载上一个Roblox版本使用,直到执行器更新.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
