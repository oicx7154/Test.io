import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Megaphone,
  Pin,
  ChevronDown,
  AlertTriangle,
  Info,
  CheckCircle,
  Sparkles,
  Clock,
} from 'lucide-react';

interface Announcement {
  id: number;
  title: string;
  content: string;
  date: string;
  type: 'update' | 'warning' | 'info' | 'event';
  pinned?: boolean;
  expanded?: boolean;
}

const announcements: Announcement[] = [
  {
    id: 1,
    title: 'ℹ️ 关于卡密系统说明',
    content:
      '每个卡密仅限绑定一个账号使用.如需更换绑定,请联系管理员处理.购买卡密后请妥善保管,脚本页面输入卡密即可一键生成专属脚本.',
    date: '2025-01-12',
    type: 'info',
  },
  {
    id: 2,
    title: "更新公告",
    content: "新增游戏:无标题近战RNG,Dungeon Leveling Origin",
    date: '2026-03-15',
    type: 'update',
  },
  {
    id: 3,
    title: "更新公告",
    content: "新增游戏:撕咬之夜",
    date: '2026-04-4',
    type: 'update',
    pinned: true,
  }
];

const typeConfig = {
  update: {
    icon: CheckCircle,
    color: 'emerald',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
    text: 'text-emerald-400',
    glow: 'shadow-emerald-500/10',
    label: '更新',
    dotColor: 'bg-emerald-400',
    hoverBorder: 'hover:border-emerald-500/40',
  },
  warning: {
    icon: AlertTriangle,
    color: 'amber',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/20',
    text: 'text-amber-400',
    glow: 'shadow-amber-500/10',
    label: '警告',
    dotColor: 'bg-amber-400',
    hoverBorder: 'hover:border-amber-500/40',
  },
  info: {
    icon: Info,
    color: 'blue',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
    text: 'text-blue-400',
    glow: 'shadow-blue-500/10',
    label: '通知',
    dotColor: 'bg-blue-400',
    hoverBorder: 'hover:border-blue-500/40',
  },
  event: {
    icon: Sparkles,
    color: 'violet',
    bg: 'bg-violet-500/10',
    border: 'border-violet-500/20',
    text: 'text-violet-400',
    glow: 'shadow-violet-500/10',
    label: '活动',
    dotColor: 'bg-violet-400',
    hoverBorder: 'hover:border-violet-500/40',
  },
};

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (days === 0) return '今天';
  if (days === 1) return '昨天';
  if (days < 7) return `${days} 天前`;
  if (days < 30) return `${Math.floor(days / 7)} 周前`;

  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
}

export default function Announcements() {
  const [expandedIds, setExpandedIds] = useState<Set<number>>(
    new Set(announcements.filter((a) => a.pinned).map((a) => a.id))
  );
  const [showAll, setShowAll] = useState(false);

  const toggleExpand = (id: number) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const visibleAnnouncements = announcements;
  const pinnedAnnouncements = visibleAnnouncements.filter((a) => a.pinned);
  const regularAnnouncements = visibleAnnouncements.filter((a) => !a.pinned);
  const displayedRegular = showAll
    ? regularAnnouncements
    : regularAnnouncements.slice(0, 3);

  return (
    <section className="relative py-24 overflow-hidden" id="announcements">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-950/5 to-transparent" />

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-xs font-bold tracking-widest text-indigo-400 uppercase mb-3 block">
            公告中心
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
            最新
            <span className="text-gradient"> 公告</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            了解最新的脚本更新和活动通知
          </p>
        </motion.div>

        {/* Marquee ticker bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8 rounded-xl bg-gradient-to-r from-indigo-600/10 via-purple-600/10 to-indigo-600/10 border border-indigo-500/20 p-3 flex items-center gap-3 overflow-hidden"
        >
          <div className="flex-shrink-0 flex items-center gap-2 px-3 py-1 rounded-lg bg-indigo-500/20 border border-indigo-500/30">
            <Megaphone className="w-4 h-4 text-indigo-400" />
            <span className="text-xs font-bold text-indigo-300">滚动播报</span>
          </div>
          <div className="overflow-hidden flex-1 relative">
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-indigo-600/10 to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-indigo-600/10 to-transparent z-10" />
            <motion.div
              className="flex gap-12 whitespace-nowrap"
              animate={{ x: ['0%', '-50%'] }}
              transition={{
                duration: 30,
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              {[...announcements, ...announcements].map((a, i) => {
                const cfg = typeConfig[a.type];
                return (
                  <span key={i} className="inline-flex items-center gap-2 text-sm">
                    <span className={`w-1.5 h-1.5 rounded-full ${cfg.dotColor}`} />
                    <span className={cfg.text}>[{cfg.label}]</span>
                    <span className="text-slate-300">{a.title.replace(/^[^\s]+\s/, '')}</span>
                  </span>
                );
              })}
            </motion.div>
          </div>
        </motion.div>

        {/* Pinned announcements */}
        {pinnedAnnouncements.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Pin className="w-4 h-4 text-indigo-400" />
              <span className="text-sm font-semibold text-indigo-400">置顶公告</span>
            </div>
            <div className="space-y-4">
              <AnimatePresence>
                {pinnedAnnouncements.map((a) => {
                  const cfg = typeConfig[a.type];
                  const Icon = cfg.icon;
                  const isExpanded = expandedIds.has(a.id);

                  return (
                    <motion.div
                      key={a.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ duration: 0.3 }}
                      onClick={() => toggleExpand(a.id)}
                      className={`relative rounded-xl border ${cfg.border} ${cfg.bg} backdrop-blur-sm overflow-hidden shadow-lg ${cfg.glow} cursor-pointer select-none ${cfg.hoverBorder} transition-all duration-300 active:scale-[0.995]`}
                    >
                      {/* Pinned glow */}
                      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-indigo-400/50 to-transparent" />

                      <div className="p-5">
                        <div className="flex items-start gap-3">
                          <div className={`p-2 rounded-lg ${cfg.bg} border ${cfg.border} flex-shrink-0 mt-0.5`}>
                            <Icon className={`w-5 h-5 ${cfg.text}`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${cfg.bg} ${cfg.text} border ${cfg.border}`}>
                                {cfg.label}
                              </span>
                              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/20">
                                📌 置顶
                              </span>
                              <span className="flex items-center gap-1 text-xs text-slate-500">
                                <Clock className="w-3 h-3" />
                                {formatDate(a.date)}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <h4 className="text-base font-bold text-white flex-1">
                                {a.title}
                              </h4>
                              <motion.div
                                animate={{ rotate: isExpanded ? 180 : 0 }}
                                transition={{ duration: 0.3 }}
                                className="flex-shrink-0 text-slate-500"
                              >
                                <ChevronDown className="w-4 h-4" />
                              </motion.div>
                            </div>
                            <AnimatePresence>
                              {isExpanded && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: 'auto' }}
                                  exit={{ opacity: 0, height: 0 }}
                                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                                  className="overflow-hidden"
                                >
                                  <p className="text-sm text-slate-400 leading-relaxed mt-2 pt-2 border-t border-white/5">
                                    {a.content}
                                  </p>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* Regular announcements */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Megaphone className="w-4 h-4 text-slate-500" />
            <span className="text-sm font-semibold text-slate-400">历史公告</span>
          </div>

          <div className="space-y-3">
            <AnimatePresence>
              {displayedRegular.map((a, index) => {
                const cfg = typeConfig[a.type];
                const Icon = cfg.icon;
                const isExpanded = expandedIds.has(a.id);

                return (
                  <motion.div
                    key={a.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    onClick={() => toggleExpand(a.id)}
                    className={`group relative rounded-xl border border-white/5 bg-slate-900/50 hover:bg-slate-900/80 ${cfg.hoverBorder} backdrop-blur-sm overflow-hidden transition-all duration-300 cursor-pointer select-none active:scale-[0.998]`}
                  >
                    {/* Left accent bar */}
                    <div className={`absolute left-0 top-0 bottom-0 w-[3px] ${cfg.bg} opacity-60 group-hover:opacity-100 transition-opacity`}>
                      <div className={`w-full h-full bg-gradient-to-b from-transparent ${cfg.text.replace('text-', 'via-')} to-transparent opacity-80`} />
                    </div>

                    <div className="p-4 pl-5">
                      <div className="flex items-start gap-3">
                        <div className={`p-1.5 rounded-lg ${cfg.bg} border ${cfg.border} flex-shrink-0 mt-0.5`}>
                          <Icon className={`w-4 h-4 ${cfg.text}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold uppercase ${cfg.bg} ${cfg.text} border ${cfg.border}`}>
                              {cfg.label}
                            </span>
                            <span className="flex items-center gap-1 text-xs text-slate-500">
                              <Clock className="w-3 h-3" />
                              {formatDate(a.date)}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-semibold text-white group-hover:text-indigo-300 transition-colors flex-1">
                              {a.title}
                            </h4>
                            <motion.div
                              animate={{ rotate: isExpanded ? 180 : 0 }}
                              transition={{ duration: 0.3 }}
                              className="flex-shrink-0 text-slate-500 group-hover:text-slate-300 transition-colors"
                            >
                              <ChevronDown className="w-4 h-4" />
                            </motion.div>
                          </div>
                          <AnimatePresence>
                            {isExpanded && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3, ease: 'easeInOut' }}
                                className="overflow-hidden"
                              >
                                <p className="text-sm text-slate-400 leading-relaxed mt-2 pt-2 border-t border-white/5">
                                  {a.content}
                                </p>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Show more / Show less */}
          {regularAnnouncements.length > 3 && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-6 text-center"
            >
              <button
                onClick={() => setShowAll(!showAll)}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm font-medium text-slate-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300"
              >
                {showAll ? (
                  <>
                    <motion.div animate={{ rotate: 180 }}>
                      <ChevronDown className="w-4 h-4" />
                    </motion.div>
                    收起
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-4 h-4" />
                    查看更多 ({regularAnnouncements.length - 3} 条)
                  </>
                )}
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
