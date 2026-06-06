import { motion } from 'framer-motion';

const teamMembers = [
  {
    name: 'KS',
    role: '扫货',
    description: '最扫之人,不容置疑',
    image: 'https://www.roblox.com/Thumbs/Avatar.ashx?x=150&y=150&Format=Png&userId=3902382749',
  },
  {
    name: '管理员',
    role: '脚本管理',
    description: '负责脚本审核与社区管理',
    image: 'https://www.roblox.com/Thumbs/Avatar.ashx?x=150&y=150&Format=Png&userId=2',
  },
  {
    name: '技术支持',
    role: '技术支持',
    description: '协助用户解决技术问题',
    image: 'https://www.roblox.com/Thumbs/Avatar.ashx?x=150&y=150&Format=Png&userId=3',
  },
  {
    name: '美工',
    role: 'UI 设计',
    description: '负责网站界面设计与美化',
    image: 'https://www.roblox.com/Thumbs/Avatar.ashx?x=150&y=150&Format=Png&userId=4',
  },
];

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
          <span className="text-sm font-semibold tracking-widest uppercase text-indigo-400 mb-3 block">
            核心团队
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            我们的 <span className="text-gradient">团队</span>
          </h2>
          <p className="max-w-xl mx-auto text-slate-400 text-lg">
            了解 RS Hub 背后的专业团队
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="rounded-2xl glow-card p-6 text-center group hover:scale-105 transition-transform duration-300"
            >
              <div className="relative mb-5 inline-block">
                <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-indigo-500/30 group-hover:border-indigo-400/60 transition-colors mx-auto">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute inset-0 rounded-full bg-gradient-to-t from-indigo-500/20 to-transparent pointer-events-none" />
              </div>

              <h3 className="text-lg font-bold text-white mb-1">{member.name}</h3>
              <p className="text-sm text-indigo-400 font-medium mb-3">{member.role}</p>
              <p className="text-slate-400 text-sm leading-relaxed">{member.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
