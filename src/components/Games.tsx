import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const games = [
  {
    name: 'Sakura Stand',
    placeId: 8534845015,
    universeId: 8534845015,
    features: ['自动重生', '即时互动', '传送', '透视'],
    status: '已更新',
    gradient: 'from-orange-500 to-red-500',
  },
  {
    name: 'Tap Simulator',
    placeId: 75992362647444,
    universeId: 75992362647444,
    features: ['自动重生', '自动点击', '自动抽蛋'],
    status: '已更新',
    gradient: 'from-pink-500 to-rose-500',
  },
  {
    name: "种植花园",
    placeId: 126884695634066,
    universeId: 126884695634066,
    features: ["忘记了"],
    status: "未更新",
    gradient: 'from-slate-500 to-zinc-600'
  },
  {
    name: "被遗弃",
    placeId: 18687417158,
    universeId: 18687417158,
    features: ["自动修机","透视杀手","透视玩家"],
    status: "未更新",
    gradient: 'from-cyan-500 to-teal-500'
  },
  {
    name: "黑暗欺骗",
    placeId: 136431686349723,
    universeId: 136431686349723,
    features: ["自动收集碎片","透视怪"],
    status: "未更新",
    gradient: 'from-amber-500 to-orange-600'
  },
  {
    name: "Hunter",
    placeId: 72992062125248,
    universeId:72992062125248,
    features: ["杀戮光环","自动过关"],
    status: "未更新",
    gradient: "from-pink-400 to-fuchsia-500"
  },
  {
    name: "无标题近战RNG",
    placeId: 99248392277037,
    universeId: 99248392277037,
    features: ["自动攻击","自动抽奖"],
    status: "已更新",
    gradient: "from-emerald-500 to-green-500"
  },
  {
    name: "Dungeon Leveling Origin",
    placeId: 85809786409351,
    universeId: 85809786409351,
    features: ["杀戮光环"],
    status: "已更新",
    gradient: "from-emerald-500 to-pink-400"
  },
  {
    name: "撕咬之夜",
    placeId: 70845479499574,
    universeId: 70845479499574,
    features: ["自动修机","透视杀手","无限体力","电池秒互动"],
    status: "已更新",
    gradient: "from-emerald-500 to-fuchsia-500"
  }
];
const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Games() {
  const [thumbnails, setThumbnails] = useState<Record<number, string>>({});
  const [failedImages, setFailedImages] = useState<Set<number>>(new Set());

  useEffect(() => {
    const fetchThumbnails = async () => {
      const placeIds = games.map((g) => g.placeId).join(',');
      const apiUrl = `https://thumbnails.roblox.com/v1/places/gameicons?placeIds=${placeIds}&returnPolicy=PlaceHolder&size=512x512&format=Png&isCircular=false`;

      const proxyUrls = [
        `https://api.allorigins.win/raw?url=${encodeURIComponent(apiUrl)}`,
        `https://corsproxy.io/?${encodeURIComponent(apiUrl)}`,
        `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(apiUrl)}`,
      ];

      for (const proxyUrl of proxyUrls) {
        try {
          const res = await fetch(proxyUrl);
          if (res.ok) {
            const data = await res.json();
            const map: Record<number, string> = {};
            const items = data.data || data;
            if (Array.isArray(items)) {
              items.forEach((entry: { targetId: number; state: string; imageUrl: string }) => {
                if (entry.state === 'Completed' && entry.imageUrl) {
                  map[entry.targetId] = entry.imageUrl;
                }
              });
            }
            if (Object.keys(map).length > 0) {
              setThumbnails(map);
              return;
            }
          }
        } catch {
          continue;
        }
      }

      try {
        const res = await fetch(apiUrl);
        if (res.ok) {
          const data = await res.json();
          const map: Record<number, string> = {};
          data.data?.forEach((entry: { targetId: number; state: string; imageUrl: string }) => {
            if (entry.state === 'Completed' && entry.imageUrl) {
              map[entry.targetId] = entry.imageUrl;
            }
          });
          if (Object.keys(map).length > 0) {
            setThumbnails(map);
          }
        }
      } catch {
      }
    };

    fetchThumbnails();
  }, []);

  const handleImageError = (placeId: number) => {
    setFailedImages((prev) => new Set(prev).add(placeId));
  };

  return (
    <section id="games" className="relative py-28">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold tracking-widest uppercase text-indigo-400 mb-3 block">
            兼容性
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            支持的 <span className="text-gradient">游戏</span>
          </h2>
          <p className="max-w-xl mx-auto text-slate-400 text-lg">
            我们持续更新中
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
        >
          {games.map((g) => {
            const imageUrl = thumbnails[g.placeId];
            const imageFailed = failedImages.has(g.placeId);
            const showImage = imageUrl && !imageFailed;

            return (
              <motion.div
                key={g.name}
                variants={item}
                className="group relative rounded-2xl glow-card transition-all duration-500 overflow-hidden flex flex-col"
                style={{ willChange: 'transform', backfaceVisibility: 'hidden', transform: 'translateZ(0)' }}
              >
                <div className="relative w-full h-40 overflow-hidden">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${g.gradient} flex items-center justify-center`}
                  >
                    <span className="text-white/80 font-extrabold text-3xl tracking-wider drop-shadow-lg">
                      {g.name
                        .split(' ')
                        .map((w) => w[0])
                        .join('')}
                    </span>
                  </div>

                  {showImage && (
                    <img
                      src={imageUrl}
                      alt={g.name}
                      onError={() => handleImageError(g.placeId)}
                      className="absolute inset-0 w-full h-full object-cover z-[1]"
                      style={{ imageRendering: 'auto' }}
                    />
                  )}

                  <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0b0f1a] to-transparent z-[2]" />
                  <div className="absolute top-3 right-3 z-[3]">
                    <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-green-500/20 text-green-400 border border-green-500/30 backdrop-blur-sm">
                      {g.status}
                    </span>
                  </div>
                </div>

                <div className="p-5 pt-2 flex-1 flex flex-col" style={{ backfaceVisibility: 'hidden', transform: 'translateZ(0)' }}>
                  <h3 className="font-bold text-white text-base mb-3 group-hover:text-indigo-400 transition-colors">
                    {g.name}
                  </h3>
                  <ul className="space-y-1.5 flex-1">
                    {g.features.map((feat) => (
                      <li key={feat} className="flex items-center gap-2 text-sm text-slate-400">
                        <Check className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                        {feat}
                      </li>
                    ))}
                  </ul>
                </div>

                <div
                  className={`absolute bottom-0 left-4 right-4 h-[2px] rounded-full bg-gradient-to-r ${g.gradient} opacity-0 group-hover:opacity-60 transition-opacity duration-500`}
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
