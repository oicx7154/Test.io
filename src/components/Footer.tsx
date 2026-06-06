import { Zap } from 'lucide-react';

type Page = 'home' | 'version' | 'games' | 'scripts' | 'getkey';

export default function Footer({ navigate }: { navigate: (p: Page) => void }) {
  const handleLogoClick = () => {
    navigate('home');
  };

  const handlePageClick = (e: React.MouseEvent, page: Page) => {
    e.preventDefault();
    navigate(page);
  };

  return (
    <footer className="relative border-t border-white/5 bg-[#030308]">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-1">
            <button onClick={handleLogoClick} className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold">
                <span className="text-white">RS</span>
                <span className="text-gradient">Hub</span>
              </span>
            </button>
            <p className="text-sm text-slate-500 leading-relaxed">
              最受信赖的 Roblox 脚本中心。安全、快速，持续更新。
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4">导航</h4>
            <ul className="space-y-2.5 text-sm text-slate-500">
              <li><a href="#features" className="hover:text-indigo-400 transition-colors">功能</a></li>
              <li>
                <a
                  href="#/games"
                  onClick={(e) => handlePageClick(e, 'games')}
                  className="hover:text-indigo-400 transition-colors"
                >
                  支持的游戏
                </a>
              </li>
              <li>
                <a
                  href="#/scripts"
                  onClick={(e) => handlePageClick(e, 'scripts')}
                  className="hover:text-indigo-400 transition-colors"
                >
                  脚本
                </a>
              </li>
              <li>
                <a
                  href="#/getkey"
                  onClick={(e) => handlePageClick(e, 'getkey')}
                  className="hover:text-indigo-400 transition-colors"
                >
                  获取卡密
                </a>
              </li>
              <li>
                <a
                  href="#/version"
                  onClick={(e) => handlePageClick(e, 'version')}
                  className="hover:text-indigo-400 transition-colors"
                >
                  版本追踪
                </a>
              </li>
              <li><a href="#faq" className="hover:text-indigo-400 transition-colors">常见问题</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4">社区</h4>
            <ul className="space-y-2.5 text-sm text-slate-500">
              <li><a href="https://discord.gg/pvpdkxhJ7Y" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400 transition-colors">Discord 服务器</a></li>
              <li><a href="https://qm.qq.com/q/ALly9zVZbq" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400 transition-colors">QQ 群</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4">法律</h4>
            <ul className="space-y-2.5 text-sm text-slate-500">
              <li><a href="#" className="hover:text-indigo-400 transition-colors">服务条款</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">隐私政策</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">免责声明</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-600">
            © 2025 RS Hub. 保留所有权利.
          </p>
          <p className="text-xs text-slate-700">
          仅供学习用途.
          </p>
        </div>
      </div>
    </footer>
  );
}
