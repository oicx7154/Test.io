import { motion } from 'framer-motion';
import { Trophy, Medal, Award, Star, Zap, Crown } from 'lucide-react';

const rankingData = [
  {
    rank: 1,
    name: 'KS',
    title: '小男娘',
    description: '最扫之人,不容置疑',
    score: 99999,
    image: 'https://tr.rbxcdn.com/30DAY-Avatar-1DA53ECB829E4E0FD721FA33058CB29A-Png/720/720/Avatar/Webp/noFilter',
    badges: ['传奇', '至尊'],
  },
  {
    rank: 2,
    name: 'Ye_Pon',
    title: '扫货',
    description: '最强乐乐之人,名言: 我喜茶你',
    score: 88888,
    image: 'https://tr.rbxcdn.com/30DAY-Avatar-517B4E7630C57B3BD46E079634FE401A-Png/720/720/Avatar/Webp/noFilter',
    badges: ['精英', '活跃'],
  },

];

const getRankIcon = (rank: number) => {
  switch (rank) {
    case 1:
      return <Crown className="w-8 h-8 text-yellow-400" />;
    case 2:
      return <Medal className="w-8 h-8 text-gray-300" />;
    case 3:
      return <Award className="w-8 h-8 text-amber-600" />;
    default:
      return <span className="w-8 h-8 flex items-center justify-center text-lg font-bold text-slate-500">{rank}</span>;
  }
};

const getRankBg = (rank: number) => {
  switch (rank) {
    case 1:
      return 'bg-gradient-to-br from-yellow-500/20 via-amber-500/10 to-orange-500/20 border-yellow-500/30';
    case 2:
      return 'bg-gradient-to-br from-gray-400/20 via-gray-500/10 to-gray-600/20 border-gray-400/30';
    case 3:
      return 'bg-gradient-to-br from-amber-600/20 via-amber-700/10 to-orange-600/20 border-amber-600/30';
    default:
      return 'bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-indigo-600/10 border-indigo-500/20';
  }
};

export default function Team() {
  return (
    <section id="team" className="relative py-28 bg-grid">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <Trophy className="w-8 h-8 text-yellow-400" />
            <h2 className="text-4xl md:text-5xl font-extrabold text-white">
             <span className="text-gradient">排行榜</span>
            </h2>
            <Trophy className="w-8 h-8 text-yellow-400" />
          </div>
          <p className="text-slate-400 text-lg">赛季积分榜 - 最强玩家榜单</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {rankingData.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`rounded-xl p-4 text-center group hover:scale-105 transition-all duration-300 border backdrop-blur-xl ${getRankBg(member.rank)}`}
            >
              <div className="relative mb-3">
                <div className="absolute -top-2 -right-2 z-10">
                  {getRankIcon(member.rank)}
                </div>
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-auto max-w-[140px] mx-auto rounded-lg shadow-xl"
                />
              </div>

              <h3 className="text-base font-bold text-white mb-2">{member.name}</h3>

              <p className="text-xs text-gradient font-bold mb-2 px-3 py-1 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-full border border-indigo-500/20 inline-block">
                {member.title}
              </p>

              <div className="flex flex-wrap justify-center gap-1.5 mb-3">
                {member.badges.map((badge) => (
                  <span key={badge} className="text-xs px-2.5 py-0.5 bg-white/5 rounded-full text-slate-300 border border-white/10">
                    {badge}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-center gap-1.5 text-slate-400 text-sm">
                <Zap className="w-4 h-4 text-yellow-400" />
                <span>积分: <span className="text-yellow-400 font-bold">{member.score.toLocaleString()}</span></span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
