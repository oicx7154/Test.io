import { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Key, Shield, Clock, CheckCircle, ArrowRight, Zap, AlertTriangle } from 'lucide-react';

export default function GetKey() {
  const keyUrl = 'https://jnkie.com/overview/acc';

  const steps = [
    {
      num: '01',
      icon: <ExternalLink className="w-5 h-5" />,
      title: '打开链接',
      desc: '点击下方按钮或复制链接，前往卡密获取页面。',
      color: 'indigo',
    },
    {
      num: '02',
      icon: <CheckCircle className="w-5 h-5" />,
      title: '完成验证',
      desc: '按照页面提示完成简单的验证步骤，即可获得卡密。',
      color: 'violet',
    },
    {
      num: '03',
      icon: <Key className="w-5 h-5" />,
      title: '复制卡密',
      desc: '验证完成后，复制生成的卡密并粘贴到脚本生成器中。',
      color: 'purple',
    },
  ];

  const faqs = [
    {
      q: '卡密有效期是多久？',
      a: '卡密通常在获取后 24 小时内有效，过期后需要重新获取。具体有效期以获取页面的提示为准。',
    },
    {
      q: '为什么需要卡密？',
      a: '卡密系统用于验证用户身份，防止脚本被滥用，同时也是我们维持免费服务的方式之一。',
    },
    {
      q: '获取卡密时遇到问题怎么办？',
      a: '请尝试关闭广告拦截器后重试。如果仍有问题，可以加入我们的 Discord 社区寻求帮助。',
    },
    {
      q: '一个卡密可以用几次？',
      a: '每个卡密仅限使用一次。再次使用脚本时需要重新获取新的卡密。',
    },
  ];

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-semibold tracking-widest text-indigo-400 uppercase">Key System</span>
          <h2 className="mt-3 text-4xl md:text-5xl font-extrabold text-white">
            获取<span className="text-gradient">卡密</span>
          </h2>
          <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
            获取免费卡密以激活脚本，简单几步即可完成
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative max-w-3xl mx-auto mb-16"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600/20 via-violet-600/20 to-purple-600/20 rounded-3xl blur-xl" />
          <div className="relative bg-slate-900/80 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-600/10 via-violet-600/10 to-purple-600/10 border-b border-white/5 px-6 py-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                <Key className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">卡密获取中心</h3>
                <p className="text-slate-400 text-xs">点击下方按钮前往获取页面</p>
              </div>
              <div className="ml-auto flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs text-green-400 font-medium">在线可用</span>
              </div>
            </div>

            <div className="p-6 md:p-8">
              <div className="flex flex-col items-center text-center mb-8">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-600/20 border border-indigo-500/30 flex items-center justify-center mb-5">
                  <Zap className="w-10 h-10 text-indigo-400" />
                </div>
                <h4 className="text-white font-bold text-xl mb-2">免费获取卡密</h4>
                <p className="text-slate-400 text-sm max-w-md">
                  完成简单验证即可获得卡密，将卡密粘贴到脚本生成器中即可使用完整功能。
                </p>
              </div>

              <div className="mb-4">
                <a
                  href={keyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center gap-3 w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 rounded-xl text-white font-semibold text-base shadow-xl shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all duration-300 hover:scale-[1.02]"
                >
                  获取卡密
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>

            <div className="border-t border-white/5 px-6 py-4 bg-white/[0.02] flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500">
              <span className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-green-400/60" />
                安全验证
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-blue-400/60" />
                约 1-2 分钟
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-violet-400/60" />
                完全免费
              </span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <h3 className="text-center text-xl font-bold text-white mb-8">获取步骤</h3>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {steps.map((step, i) => (
              <div key={i} className="relative group">
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-px bg-gradient-to-r from-white/10 to-transparent" />
                )}
                <div className="bg-slate-900/60 border border-white/5 rounded-xl p-6 hover:border-indigo-500/30 transition-all">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      step.color === 'indigo' ? 'bg-indigo-500/20 text-indigo-400' :
                      step.color === 'violet' ? 'bg-violet-500/20 text-violet-400' :
                      'bg-purple-500/20 text-purple-400'
                    }`}>
                      {step.icon}
                    </div>
                    <span className="text-2xl font-black text-white/10">{step.num}</span>
                  </div>
                  <h4 className="text-white font-semibold mb-2">{step.title}</h4>
                  <p className="text-slate-500 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-3xl mx-auto mb-12"
        >
          <h3 className="text-center text-xl font-bold text-white mb-8">常见问题</h3>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <FaqItem key={i} q={faq.q} a={faq.a} />
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="max-w-3xl mx-auto"
        >
          <div className="p-4 bg-amber-500/10 rounded-xl border border-amber-500/20 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-amber-300 text-sm font-medium mb-1">注意事项</p>
              <p className="text-amber-300/70 text-xs leading-relaxed">
                获取卡密时请勿使用广告拦截器，否则可能导致验证失败。如遇到页面无法加载，请尝试更换浏览器或使用手机访问。卡密仅供个人使用，请勿转让或出售。
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      onClick={() => setOpen(!open)}
      className={`bg-slate-900/60 border rounded-xl overflow-hidden cursor-pointer select-none transition-all ${
        open ? 'border-indigo-500/20' : 'border-white/5 hover:border-white/10'
      }`}
    >
      <div className="flex items-center justify-between p-4">
        <span className="text-white text-sm font-medium pr-4">{q}</span>
        <svg
          className={`w-4 h-4 text-slate-500 shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
      {open && (
        <div className="px-4 pb-4 border-t border-white/5">
          <p className="text-slate-400 text-sm leading-relaxed pt-3">{a}</p>
        </div>
      )}
    </div>
  );
}
