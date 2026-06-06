import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: 'RS Hub 是免费使用的吗?',
    a: '免费,但是处于密钥系统阶段,也可以通过购买卡密获取永久使用权',
  },
  {
    q: '支持哪些执行器？',
    a: 'RS 支持所有主流执行器,包括krnl,Potassium,Wave,Volt等.',
  },
  {
    q: '使用这些脚本会被封号吗？',
    a: '没有任何脚本是 100% 不会被检测的,我们建议使用小号以确保最大安全性.',
  },
  {
    q: '脚本多久更新一次？',
    a: '不定时更新',
  },
  {
    q: '如何使用这些脚本？',
    a: '只需从我们的网站复制脚本,打开你的执行器,将脚本粘贴到注入器中,然后点击执行即可.',
  },
  {
    q: '我可以请求支持新游戏吗？',
    a: '当然,加入我们的Q群进行申请即可',
  },
];

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="border-b border-white/5 last:border-0"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left group"
      >
        <span className="text-base font-semibold text-white group-hover:text-indigo-300 transition-colors pr-4">
          {q}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-slate-500 shrink-0 transition-transform duration-300 ${
            open ? 'rotate-180 text-indigo-400' : ''
          }`}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-slate-400 leading-relaxed text-sm">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  return (
    <section id="faq" className="relative py-28">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold tracking-widest uppercase text-indigo-400 mb-3 block">
            常见问题
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            有 <span className="text-gradient">疑问?</span>
          </h2>
          <p className="max-w-xl mx-auto text-slate-400 text-lg">
            在下方找到最常见问题的答案。
          </p>
        </motion.div>

        <div className="rounded-2xl glow-card p-2 md:p-6">
          {faqs.map((faq, i) => (
            <FAQItem key={i} q={faq.q} a={faq.a} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
