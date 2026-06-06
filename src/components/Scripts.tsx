import { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, Terminal, Key, Sparkles, Wand2, Zap } from 'lucide-react';

export default function Scripts() {
  const [key, setKey] = useState('');
  const [generatedScript, setGeneratedScript] = useState('');
  const [copied, setCopied] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);
  const [quickCopied, setQuickCopied] = useState(false);

  const quickScript = `getfenv().Image = ""; -- 使用rbxassetid://
getfenv().SCRIPT_KEY = "";
loadstring(game:HttpGet'https://tinyurl.com/3fmxt65b')()`;

  const handleQuickCopy = async () => {
    await navigator.clipboard.writeText(quickScript);
    setQuickCopied(true);
    setTimeout(() => setQuickCopied(false), 2500);
  };

  const generateScript = () => {
    if (!key.trim()) return;
    const script = `getfenv().Image = ""; -- 使用rbxassetid://
getgenv().SCRIPT_KEY = "${key.trim()}"
loadstring(game:HttpGet'https://tinyurl.com/3fmxt65b')()':3'`;
    setGeneratedScript(script);
    setIsGenerated(true);
    setCopied(false);
  };

  const handleCopy = async () => {
    if (!generatedScript) return;
    await navigator.clipboard.writeText(generatedScript);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      generateScript();
    }
  };

  return (
    <section id="scripts" className="relative py-28">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-purple-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="text-sm font-semibold tracking-widest uppercase text-indigo-400 mb-3 block">
            脚本生成器
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            生成你的 <span className="text-gradient">脚本</span>
          </h2>
          <p className="max-w-xl mx-auto text-slate-400 text-lg">
            在下方输入你的卡密，生成脚本，然后复制粘贴到你的执行器中。
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative rounded-2xl glow-card overflow-hidden mb-8"
        >
          <div className="p-8 md:p-10">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white mb-6">
              <Zap className="w-3 h-3" />
              快速复制
            </span>

            <h3 className="text-xl font-bold text-white mb-2">一键复制脚本</h3>
            <p className="text-sm text-slate-400 mb-6">无需卡密，直接复制脚本到执行器中运行。</p>

            <div className="relative rounded-xl bg-[#0a0a1a] border border-white/10 p-5 mb-5 overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-amber-400" />
                  <span className="text-xs text-slate-500 font-mono">Lua</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/60" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                  <div className="w-3 h-3 rounded-full bg-green-500/60" />
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex flex-col text-right select-none">
                  <span className="text-xs text-slate-700 font-mono leading-relaxed">1</span>
                </div>
                <pre className="flex-1 overflow-x-auto">
                  <code className="text-sm font-mono leading-relaxed whitespace-pre block">
                    <span className="text-yellow-400">getfenv</span>
                    <span className="text-slate-400">()</span>
                    <span className="text-slate-400">.</span>
                    <span className="text-yellow-400">Image</span>
                    <span className="text-green-400">=</span>
                    <span className="text-slate-400">""; -- 使用rbxassetid://
                    </span>
                    <span className="text-yellow-400">getgenv</span>
                    <span className="text-slate-400">()</span>
                    <span className="text-slate-400">.</span>
                    <span className="text-cyan-300">SCRIPT_KEY</span>
                    <span className="text-pink-400"> = </span>
                     <span className="text-green-400">""</span>
                    <span className="text-yellow-400">loadstring</span>
                    <span className="text-slate-400">(</span>
                    <span className="text-cyan-300">game</span>
                    <span className="text-slate-400">:</span>
                    <span className="text-yellow-400">HttpGet</span>
                    <span className="text-green-400">'https://tinyurl.com/3fmxt65b'</span>
                    <span className="text-slate-400">)()</span>
                    <span className="text-green-400">':3'</span>
                  </code>
                </pre>
              </div>
            </div>

            <button
              onClick={handleQuickCopy}
              className={`w-full flex items-center justify-center gap-2.5 py-4 rounded-xl font-bold text-sm transition-all duration-300 ${
                quickCopied
                  ? 'bg-green-500/20 text-green-400 border border-green-500/30 shadow-lg shadow-green-500/10'
                  : 'bg-gradient-to-r from-amber-600 to-orange-600 text-white hover:from-amber-500 hover:to-orange-500 shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-[1.02] active:scale-[0.98]'
              }`}
            >
              {quickCopied ? (
                <>
                  <Check className="w-5 h-5" /> 已复制到剪贴板！
                </>
              ) : (
                <>
                  <Copy className="w-5 h-5" /> 复制脚本
                </>
              )}
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="relative rounded-2xl glow-card overflow-hidden"
        >
          <div className="p-8 md:p-10">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white mb-6">
              <Sparkles className="w-3 h-3" />
              Rs Hub 加载器
            </span>

            <div className="mb-6">
              <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-3">
                <Key className="w-4 h-4 text-indigo-400" />
                卡密
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={key}
                  onChange={(e) => {
                    setKey(e.target.value);
                    if (isGenerated) {
                      setIsGenerated(false);
                      setGeneratedScript('');
                      setCopied(false);
                    }
                  }}
                  onKeyDown={handleKeyDown}
                  placeholder="在此输入你的卡密..."
                  className="w-full px-5 py-4 rounded-xl bg-[#0a0a1a] border border-white/10 text-white placeholder-slate-600 font-mono text-sm focus:outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-600">
                  <Key className="w-5 h-5" />
                </div>
              </div>
              <p className="text-xs text-slate-600 mt-2 ml-1">
                粘贴你获得的卡密来生成专属脚本。
              </p>
            </div>

            <button
              onClick={generateScript}
              disabled={!key.trim()}
              className={`w-full flex items-center justify-center gap-2.5 py-4 rounded-xl font-bold text-sm transition-all duration-300 mb-6 ${
                !key.trim()
                  ? 'bg-slate-800/50 text-slate-600 cursor-not-allowed border border-white/5'
                  : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-500 hover:to-purple-500 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.02] active:scale-[0.98]'
              }`}
            >
              <Wand2 className="w-4 h-4" />
              生成脚本
            </button>

            {isGenerated && generatedScript && (
              <motion.div
                initial={{ opacity: 0, y: 15, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-xs font-medium text-green-400">脚本生成成功</span>
                </div>

                <div className="relative rounded-xl bg-[#0a0a1a] border border-white/10 p-5 mb-5 overflow-hidden group">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Terminal className="w-4 h-4 text-indigo-400" />
                      <span className="text-xs text-slate-500 font-mono">Lua</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500/60" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                      <div className="w-3 h-3 rounded-full bg-green-500/60" />
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex flex-col text-right select-none">
                      {generatedScript.split('\n').map((_, i) => (
                        <span key={i} className="text-xs text-slate-700 font-mono leading-relaxed">
                          {i + 1}
                        </span>
                      ))}
                    </div>
                    <pre className="flex-1 overflow-x-auto">
                      <code className="text-sm text-indigo-300 font-mono leading-relaxed whitespace-pre">
                        {generatedScript.split('\n').map((line, i) => (
                          <span key={i} className="block">
                            {line.startsWith('getgenv()') ? (
                              <>
                                <span className="text-yellow-400">getgenv</span>
                                <span className="text-slate-400">()</span>
                                <span className="text-slate-400">.</span>
                                <span className="text-cyan-300">SCRIPT_KEY</span>
                                <span className="text-pink-400"> = </span>
                                <span className="text-green-400">"{key.trim()}"</span>
                              </>
                            ) : line.startsWith('loadstring') ? (
                              <>
                                <span className="text-yellow-400">loadstring</span>
                                <span className="text-slate-400">(</span>
                                <span className="text-cyan-300">game</span>
                                <span className="text-slate-400">:</span>
                                <span className="text-yellow-400">HttpGet</span>
                                <span className="text-green-400">'https://tinyurl.com/3fmxt65b'</span>
                                <span className="text-slate-400">)()</span>
                                <span className="text-green-400">':3'</span>
                              </>
                            ) : (
                              <span className="text-indigo-300">{line}</span>
                            )}
                          </span>
                        ))}
                      </code>
                    </pre>
                  </div>

                  <div className="absolute inset-0 shimmer pointer-events-none" />
                </div>

                <button
                  onClick={handleCopy}
                  className={`w-full flex items-center justify-center gap-2.5 py-4 rounded-xl font-bold text-sm transition-all duration-300 ${
                    copied
                      ? 'bg-green-500/20 text-green-400 border border-green-500/30 shadow-lg shadow-green-500/10'
                      : 'bg-gradient-to-r from-emerald-600 to-cyan-600 text-white hover:from-emerald-500 hover:to-cyan-500 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-[1.02] active:scale-[0.98]'
                  }`}
                >
                  {copied ? (
                    <>
                      <Check className="w-5 h-5" /> 已复制到剪贴板！
                    </>
                  ) : (
                    <>
                      <Copy className="w-5 h-5" /> 复制脚本
                    </>
                  )}
                </button>
              </motion.div>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {[
            { step: '01', title: '输入卡密', desc: '在上方输入框中粘贴你的卡密。' },
            { step: '02', title: '生成脚本', desc: '点击生成按钮来创建你的脚本。' },
            { step: '03', title: '复制 & 运行', desc: '复制脚本并粘贴到你的执行器中。' },
          ].map((item) => (
            <div
              key={item.step}
              className="relative p-5 rounded-xl bg-slate-900/30 border border-white/5 group hover:border-indigo-500/20 transition-all duration-300"
            >
              <span className="text-3xl font-black text-indigo-500/10 absolute top-3 right-4 group-hover:text-indigo-500/20 transition-colors">
                {item.step}
              </span>
              <h4 className="text-sm font-bold text-white mb-1">{item.title}</h4>
              <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}