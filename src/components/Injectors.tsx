import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ExternalLink,
  CheckCircle,
  ShieldCheck,
  MessageCircle,
  Globe,
  ShoppingCart,
  X,
  RefreshCw,
  Search,
  Filter,
} from 'lucide-react';
import RobloxVersion from './RobloxVersion';

interface Injector {
  title: string;
  extype: string;
  extpye?: string;
  detected: boolean;
  free: boolean;
  cost?: string;
  keysystem?: boolean;
  updateStatus: boolean;
  decompiler?: boolean;
  multiInject?: boolean;
  uncPercentage?: string;
  suncPercentage?: string;
  discordlink?: string;
  websitelink?: string;
  purchaselink?: string;
  hidden?: boolean;
  sunc?: {
    suncScrap: string;
    suncKey: string;
  };
  [key: string]: any;
}

interface SelectedInjector {
  name: string;
  suncPercent: number;
  uncPercent: number;
  suncScrap: string;
  suncKey: string;
}

export default function Injectors() {
  const [loading, setLoading] = useState(true);
  const [injectors, setInjectors] = useState<Injector[]>([]);
  const [suncModalOpen, setSuncModalOpen] = useState(false);
  const [selectedInjector, setSelectedInjector] = useState<SelectedInjector | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [platformFilter, setPlatformFilter] = useState<string>('all');

  const getInjectorsData = async () => {
    const endpoints = [
      'http://farts.fadedis.xyz:25551/api/status/exploits',
      'https://whatexpsare.online/api/status/exploits',
      'https://whatexploitsaretra.sh/api/status/exploits',
      'https://weao.gg/api/status/exploits',
    ];

    for (const endpoint of endpoints) {
      try {
        const response = await fetch(endpoint, {
          method: 'GET',
          headers: { Accept: 'application/json' },
        });
        if (response.ok) {
          const data = await response.json();
          const arr = Array.isArray(data) ? data : (data.exploits || data.data || []);
          const filteredData = arr.filter((injector: Injector) => !injector.hidden);
          if (filteredData.length > 0) {
            return { exploits: filteredData };
          }
        }
      } catch {
        // try next endpoint
      }
    }

    const proxyServices = [
      { base: 'https://api.allorigins.win/get?url=', type: 'allorigins' },
      { base: 'https://api.codetabs.com/v1/proxy?quest=', type: 'codetabs' },
      { base: 'https://corsproxy.io/?', type: 'direct' },
      { base: 'https://cors-anywhere.herokuapp.com/', type: 'direct' },
    ];

    for (const proxy of proxyServices) {
      for (const endpoint of endpoints) {
        try {
          let proxyUrl: string;
          if (proxy.type === 'direct' && proxy.base === 'https://corsproxy.io/?') {
            proxyUrl = proxy.base + encodeURIComponent(endpoint);
          } else if (proxy.type === 'direct') {
            proxyUrl = proxy.base + endpoint;
          } else {
            proxyUrl = proxy.base + encodeURIComponent(endpoint);
          }

          const proxyResponse = await fetch(proxyUrl, {
            headers: { Accept: 'application/json' },
          });

          if (proxyResponse.ok) {
            let proxyText = await proxyResponse.text();

            if (proxy.type === 'allorigins') {
              try {
                const proxyData = JSON.parse(proxyText);
                proxyText = proxyData.contents;
              } catch {
                continue;
              }
            }

            if (proxyText && (proxyText.trim().startsWith('[') || proxyText.trim().startsWith('{'))) {
              const data = JSON.parse(proxyText);
              const arr = Array.isArray(data) ? data : (data.exploits || data.data || []);
              const filteredData = arr.filter((injector: Injector) => !injector.hidden);
              if (filteredData.length > 0) {
                return { exploits: filteredData };
              }
            }
          }
        } catch {
          // try next proxy+endpoint combo
        }
      }
    }

    return { exploits: [] };
  };

  const updateInjectorsList = async () => {
    setLoading(true);
    try {
      const injectorsData = await getInjectorsData();
      setInjectors(injectorsData.exploits);
    } catch (error) {
      console.error('加载注入器失败:', error);
      setInjectors([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    updateInjectorsList();
  }, []);

  const getPlatformText = (extype: string) => {
    switch (extype) {
      case 'wexecutor': return 'Windows';
      case 'wexternal': return '外部';
      case 'aexecutor': return '安卓';
      case 'iexecutor': return 'iOS';
      case 'mexecutor': return 'Mac';
      default: return '未知';
    }
  };

  const getPlatformIcon = (extype: string) => {
    switch (extype) {
      case 'wexecutor': return '🖥️';
      case 'wexternal': return '🔌';
      case 'aexecutor': return '📱';
      case 'iexecutor': return '🍎';
      case 'mexecutor': return '💻';
      default: return '❓';
    }
  };

  const openSuncModal = (
    injectorName: string,
    suncPercent: number,
    uncPercent: number,
    suncScrap: string,
    suncKey: string
  ) => {
    setSelectedInjector({ name: injectorName, suncPercent, uncPercent, suncScrap, suncKey });
    setSuncModalOpen(true);
  };

  const closeSuncModal = () => {
    setSuncModalOpen(false);
    setTimeout(() => {
      setSelectedInjector(null);
    }, 300);
  };

  const platformTypes = Array.from(
    new Set(injectors.map((inj) => inj.extype || inj.extpye || ''))
  ).filter(Boolean);

  const filteredInjectors = injectors.filter((inj) => {
    const extype = inj.extype || inj.extpye || '';
    const matchesSearch = inj.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPlatform = platformFilter === 'all' || extype === platformFilter;
    return matchesSearch && matchesPlatform;
  });

  return (
    <section id="version" className="relative py-28">
      {/* BG glows */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-indigo-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Roblox Version Tracker */}
        <RobloxVersion />

        {/* Executor / Injector Status Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 mt-8"
        >
          <span className="text-sm font-semibold tracking-widest uppercase text-indigo-400 mb-3 block">
            注入器获取
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            注入器 <span className="text-gradient">状态</span>
          </h2>
          <p className="max-w-xl mx-auto text-slate-400 text-lg">
            所有已知 Roblox 注入器的实时状态,注入器获取由inject.today提供api
          </p>
        </motion.div>

        {/* Search + Filter toolbar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-8"
        >
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="搜索执行器..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/25 transition-all text-sm"
            />
          </div>

          {/* Platform filter pills */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-slate-600 mr-1 hidden sm:block">
              <Filter className="w-4 h-4" />
            </span>
            <button
              onClick={() => setPlatformFilter('all')}
              className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all duration-300 border ${
                platformFilter === 'all'
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-indigo-500/50 shadow-lg shadow-indigo-500/20 scale-105'
                  : 'bg-white/5 text-slate-400 border-white/10 hover:bg-white/10 hover:text-white hover:border-white/20'
              }`}
            >
              全部
            </button>
            {platformTypes.map((pt) => {
              const isActive = platformFilter === pt;
              const colorMap: Record<string, { active: string; icon: string }> = {
                wexecutor: {
                  active: 'bg-gradient-to-r from-green-600 to-emerald-600 text-white border-green-500/50 shadow-lg shadow-green-500/20 scale-105',
                  icon: '🖥️',
                },
                wexternal: {
                  active: 'bg-gradient-to-r from-orange-600 to-amber-600 text-white border-orange-500/50 shadow-lg shadow-orange-500/20 scale-105',
                  icon: '🔌',
                },
                aexecutor: {
                  active: 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white border-blue-500/50 shadow-lg shadow-blue-500/20 scale-105',
                  icon: '📱',
                },
                iexecutor: {
                  active: 'bg-gradient-to-r from-pink-600 to-rose-600 text-white border-pink-500/50 shadow-lg shadow-pink-500/20 scale-105',
                  icon: '🍎',
                },
                mexecutor: {
                  active: 'bg-gradient-to-r from-violet-600 to-purple-600 text-white border-violet-500/50 shadow-lg shadow-violet-500/20 scale-105',
                  icon: '💻',
                },
              };
              const colors = colorMap[pt] || {
                active: 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-indigo-500/50 shadow-lg shadow-indigo-500/20 scale-105',
                icon: '❓',
              };
              const count = injectors.filter((i) => (i.extype || i.extpye || '') === pt).length;

              return (
                <button
                  key={pt}
                  onClick={() => setPlatformFilter(pt)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all duration-300 border flex items-center gap-1.5 ${
                    isActive
                      ? colors.active
                      : 'bg-white/5 text-slate-400 border-white/10 hover:bg-white/10 hover:text-white hover:border-white/20'
                  }`}
                >
                  <span>{colors.icon}</span>
                  <span>{getPlatformText(pt)}</span>
                  <span className={`ml-0.5 px-1.5 py-0.5 rounded-md text-[10px] font-bold ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-white/5 text-slate-500'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Refresh button */}
          <button
            onClick={updateInjectorsList}
            disabled={loading}
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300 disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            {loading ? '加载中...' : '刷新'}
          </button>
        </motion.div>

        {/* Stats bar */}
        {!loading && injectors.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-wrap gap-4 mb-8"
          >
            <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/5 text-sm text-slate-400">
              <span className="text-white font-bold">{injectors.length}</span> 个执行器
            </div>
            <div className="px-4 py-2 rounded-xl bg-green-500/5 border border-green-500/10 text-sm text-green-400">
              <span className="font-bold">{injectors.filter((i) => i.updateStatus).length}</span> 已更新
            </div>
            <div className="px-4 py-2 rounded-xl bg-red-500/5 border border-red-500/10 text-sm text-red-400">
              <span className="font-bold">{injectors.filter((i) => i.detected).length}</span> 已检测
            </div>
            <div className="px-4 py-2 rounded-xl bg-blue-500/5 border border-blue-500/10 text-sm text-blue-400">
              <span className="font-bold">{injectors.filter((i) => i.free).length}</span> 免费
            </div>
            {searchQuery && (
              <div className="px-4 py-2 rounded-xl bg-violet-500/5 border border-violet-500/10 text-sm text-violet-400">
                <span className="font-bold">{filteredInjectors.length}</span> 个结果
              </div>
            )}
          </motion.div>
        )}

        {/* Content */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-14 w-14 border-t-2 border-b-2 border-violet-500 mx-auto mb-5" />
              <p className="text-slate-400 text-lg">正在加载执行器数据...</p>
              <p className="text-slate-600 text-sm mt-1">从多个数据源获取中</p>
            </div>
          </div>
        ) : injectors.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-4">
              <X className="w-8 h-8 text-red-400" />
            </div>
            <p className="text-red-400 text-lg font-medium mb-2">无法加载执行器数据</p>
            <p className="text-slate-500 text-sm mb-6">请检查网络连接后重试</p>
            <button
              onClick={updateInjectorsList}
              className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl text-sm font-semibold text-white hover:from-indigo-500 hover:to-purple-500 transition-all"
            >
              重试
            </button>
          </div>
        ) : filteredInjectors.length === 0 ? (
          <div className="text-center py-16">
            <Search className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <p className="text-slate-400 text-lg">没有匹配的执行器</p>
            <button
              onClick={() => { setSearchQuery(''); setPlatformFilter('all'); }}
              className="mt-4 text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              清除筛选
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredInjectors.map((injector, index) => {
              const extype = injector.extype || injector.extpye || '';
              const platformText = getPlatformText(extype);
              const platformIcon = getPlatformIcon(extype);
              const uncPercent = Math.min(Math.max(parseInt(injector.uncPercentage || '0') || 0, 0), 100);
              const suncPercent = Math.min(Math.max(parseInt(injector.suncPercentage || '0') || 0, 0), 100);

              return (
                <motion.div
                  key={injector.title + index}
                  initial={{ opacity: 0, scale: 0.95, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: Math.min(index * 0.04, 0.8) }}
                  className="group relative overflow-hidden rounded-2xl bg-slate-900/60 border border-white/5 hover:border-violet-500/30 transition-all duration-500 p-5 flex flex-col justify-between backdrop-blur-sm hover:shadow-lg hover:shadow-violet-500/5"
                >
                  {/* Background watermark */}
                  <div className="absolute top-0 right-0 p-3 opacity-[0.04] group-hover:opacity-[0.08] transition-opacity">
                    <ShieldCheck className="w-28 h-28 text-white" />
                  </div>

                  <div className="relative z-10">
                    {/* Title + price */}
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-lg font-bold text-white group-hover:text-violet-400 transition-colors">
                        {injector.title}
                      </h3>
                      <span
                        className={`px-2.5 py-0.5 rounded-lg text-xs font-bold border ${
                          injector.free
                            ? 'bg-green-500/10 text-green-400 border-green-500/20'
                            : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                        }`}
                      >
                        {injector.free ? '免费' : injector.cost || '付费'}
                      </span>
                    </div>

                    {/* Status badges */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium border ${
                          injector.detected
                            ? 'bg-red-500/10 text-red-400 border-red-500/15'
                            : 'bg-green-500/10 text-green-400 border-green-500/15'
                        }`}
                      >
                        <ShieldCheck className="w-3 h-3" />
                        {injector.detected ? '已检测' : '未检测'}
                      </span>
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium border ${
                          injector.updateStatus
                            ? 'bg-green-500/10 text-green-400 border-green-500/15'
                            : 'bg-orange-500/10 text-orange-400 border-orange-500/15'
                        }`}
                      >
                        <CheckCircle className="w-3 h-3" />
                        {injector.updateStatus ? '已更新' : '未更新'}
                      </span>
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/15">
                        <span>{platformIcon}</span> {platformText}
                      </span>
                      {injector.keysystem && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium bg-purple-500/10 text-purple-400 border border-purple-500/15">
                          🔑 密钥系统
                        </span>
                      )}
                    </div>

                    {/* UNC / SUNC scores */}
                    <div className="space-y-3 mb-5">
                      {extype !== 'wexternal' && (
                        <>
                          {/* UNC bar */}
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs text-slate-500 font-medium">UNC</span>
                              <span className="text-xs font-bold text-white">{uncPercent}%</span>
                            </div>
                            <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                              <div
                                className="h-full rounded-full transition-all duration-700 bg-gradient-to-r from-green-500 to-emerald-400"
                                style={{ width: `${uncPercent}%` }}
                              />
                            </div>
                          </div>
                          {/* SUNC bar */}
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <button
                                onClick={() => {
                                  if (injector.sunc?.suncScrap && injector.sunc?.suncKey) {
                                    openSuncModal(
                                      injector.title,
                                      suncPercent,
                                      uncPercent,
                                      injector.sunc.suncScrap,
                                      injector.sunc.suncKey
                                    );
                                  }
                                }}
                                className="text-xs text-violet-400 hover:text-violet-300 transition-colors font-medium"
                              >
                                SUNC ↗
                              </button>
                              <span className="text-xs font-bold text-white">{suncPercent}%</span>
                            </div>
                            <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                              <div
                                className="h-full rounded-full transition-all duration-700 bg-gradient-to-r from-violet-500 to-purple-400"
                                style={{ width: `${suncPercent}%` }}
                              />
                            </div>
                          </div>
                        </>
                      )}

                      {/* Feature tags */}
                      <div className="flex flex-wrap gap-2 pt-1">
                        {injector.decompiler && (
                          <span className="text-xs text-slate-500 bg-white/5 px-2 py-0.5 rounded-md">
                            反编译器
                          </span>
                        )}
                        {injector.multiInject && (
                          <span className="text-xs text-slate-500 bg-white/5 px-2 py-0.5 rounded-md">
                             多重注入
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex gap-2 relative z-10">
                    {injector.discordlink && (
                      <a
                        href={injector.discordlink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-[#5865F2]/10 hover:bg-[#5865F2]/20 border border-[#5865F2]/20 hover:border-[#5865F2]/30 rounded-xl text-xs font-semibold text-[#5865F2] transition-all duration-300"
                      >
                        <MessageCircle className="w-3.5 h-3.5" /> Discord
                      </a>
                    )}
                    {injector.websitelink && (
                      <a
                        href={injector.websitelink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl text-xs font-semibold text-white transition-all duration-300"
                      >
                        <Globe className="w-3.5 h-3.5" /> 官网
                      </a>
                    )}
                    {injector.purchaselink && (
                      <a
                        href={injector.purchaselink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/20 hover:border-amber-500/30 rounded-xl text-xs font-semibold text-amber-400 transition-all duration-300"
                      >
                        <ShoppingCart className="w-3.5 h-3.5" /> 购买
                      </a>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* SUNC Modal */}
        {suncModalOpen && selectedInjector && (
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4"
            onClick={(e) => {
              if (e.target === e.currentTarget) closeSuncModal();
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="bg-[#0a0a1a]/95 border border-white/10 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl shadow-black/50"
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-white/10 sticky top-0 bg-[#0a0a1a]/95 backdrop-blur-xl z-10 rounded-t-2xl">
                <h3 className="text-2xl font-bold text-white">
                  {selectedInjector.name}
                </h3>
                <p className="text-sm text-slate-500 mt-0.5">SUNC 测试结果</p>
              </div>

              <div className="p-6 space-y-6">
                {/* Score Overview */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-5 rounded-2xl bg-violet-500/5 border border-violet-500/15">
                    <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">SUNC 评分</span>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-3xl font-black text-violet-400">{selectedInjector.suncPercent}%</span>
                      <div className="flex-1 h-2.5 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-violet-500 to-purple-400 rounded-full transition-all duration-700"
                          style={{ width: `${selectedInjector.suncPercent}%` }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="p-5 rounded-2xl bg-green-500/5 border border-green-500/15">
                    <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">UNC 评分</span>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-3xl font-black text-green-400">{selectedInjector.uncPercent}%</span>
                      <div className="flex-1 h-2.5 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full transition-all duration-700"
                          style={{ width: `${selectedInjector.uncPercent}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* SUNC iframe */}
                {selectedInjector.suncScrap && selectedInjector.suncKey ? (
                  <div className="rounded-2xl border border-white/5 overflow-hidden">
                    <div className="px-5 py-3 bg-white/[0.02] border-b border-white/5 flex items-center justify-between">
                      <h5 className="font-semibold text-white text-sm">详细测试结果</h5>
                      <a
                        href={`https://sunc.rubis.app/?scrap=${selectedInjector.suncScrap}&key=${selectedInjector.suncKey}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs text-violet-400 hover:text-violet-300 transition-colors font-medium"
                      >
                        在新标签页打开 <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                    <div className="h-[60vh] overflow-hidden bg-black/20">
                      <iframe
                        src={`https://sunc.rubis.app/?scrap=${selectedInjector.suncScrap}&key=${selectedInjector.suncKey}`}
                        frameBorder={0}
                        sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
                        loading="lazy"
                        className="w-full h-full"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-16 rounded-2xl bg-white/[0.02] border border-white/5">
                    <p className="text-slate-500">该执行器没有 SUNC 测试数据</p>
                  </div>
                )}

                {/* Disclaimer */}
                <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/15 flex items-start gap-3">
                  <span className="text-lg mt-0.5">⚠️</span>
                  <p className="text-sm text-amber-300/80 leading-relaxed">
                    SUNC 测试结果仅供参考，实际性能可能因环境和 Roblox 版本不同而有所差异。使用前请务必充分测试。
                  </p>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-6 border-t border-white/10 flex justify-end">
                <button
                  onClick={closeSuncModal}
                  className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 rounded-xl text-sm font-semibold text-white transition-all duration-300 shadow-lg shadow-indigo-500/20"
                >
                  关闭
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}
