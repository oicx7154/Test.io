import { motion } from 'framer-motion';

const teamMembers = [
  {
    name: 'KS',
    role: '小男娘',
    description: '最扫之人,不容置疑',
    image: 'https://tr.rbxcdn.com/30DAY-Avatar-1DA53ECB829E4E0FD721FA33058CB29A-Png/720/720/Avatar/Webp/noFilter',
  },
  {
    name: 'Ye_Pon',
    role: '扫货',
    description: '最强乐乐之人,名言: 我喜茶你',
    image: 'https://tr.rbxcdn.com/30DAY-Avatar-517B4E7630C57B3BD46E079634FE401A-Png/720/720/Avatar/Webp/noFilter',
  }
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
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
           <span className="text-gradient">排行榜</span>
          </h2>
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
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-auto max-w-xs mx-auto"
                />
              </div>

              <h3 className="text-lg font-bold text-white mb-1">{member.name}</h3>
              <p className="text-sm text-gradient font-bold mb-3 px-4 py-1 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-full border border-indigo-500/20 inline-block shadow-lg shadow-indigo-500/10">{member.role}</p>
              <p className="text-slate-400 text-sm leading-relaxed">{member.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
