export default function Home() {
  return (
    <div className="min-h-screen" style={{ textAlign: 'center' }}>
      {/* SECTION 1: HERO */}
      <section className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-tight">
            LET'S BUILD THE POST-SCARCITY ECONOMY
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
            We're building the foundation to an economy where value creation aligns with profit
          </p>
          <button className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-12 py-6 rounded-lg text-xl font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-xl">
            JOIN THE MOVEMENT
          </button>
        </div>
      </section>

      {/* SECTION 2: THE PROBLEM */}
      <section className="py-20 bg-white" style={{ textAlign: 'center' }}>
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-12">
            Lorem Ipsum Dolor
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 text-lg text-gray-600">
              <p>
                <strong>Lorem ipsum dolor</strong> sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <p>
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              <p>
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              </p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
              <div className="text-6xl font-bold text-blue-600 mb-4">123M</div>
              <p className="text-xl text-gray-800 font-semibold">Lorem ipsum dolor</p>
              <p className="text-gray-600 mt-2">Sed ut perspiciatis unde omnis</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: THE VISION */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
            Sed Ut Perspiciatis
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, 
            totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 text-center">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Lorem Ipsum</h3>
              <p className="text-gray-600">Dolor sit amet consectetur adipiscing elit</p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 text-center">
              <div className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <div className="w-8 h-8 bg-indigo-500 rounded-full"></div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Sed Do Eiusmod</h3>
              <p className="text-gray-600">Tempor incididunt ut labore et dolore</p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 text-center">
              <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <div className="w-8 h-8 bg-purple-500 rounded-full"></div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Ut Enim Ad</h3>
              <p className="text-gray-600">Minim veniam quis nostrud exercitation</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: THE MOVEMENT */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            Excepteur Sint Occaecat
          </h2>
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="text-5xl font-bold text-blue-400 mb-4">25K+</div>
              <p className="text-xl text-gray-300">Lorem Ipsum</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-indigo-400 mb-4">75</div>
              <p className="text-xl text-gray-300">Dolor Sit Amet</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-purple-400 mb-4">$1M+</div>
              <p className="text-xl text-gray-300">Consectetur Adipiscing</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-800 rounded-xl p-8 text-center border border-gray-700">
              <p className="text-lg italic mb-6 text-gray-300">
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
              </p>
              <div className="flex items-center justify-center">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold">JD</span>
                </div>
                <div>
                  <p className="font-semibold">John Doe</p>
                  <p className="text-gray-400">Lorem Ipsum</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-800 rounded-xl p-8 text-center border border-gray-700">
              <p className="text-lg italic mb-6 text-gray-300">
                "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
              </p>
              <div className="flex items-center justify-center">
                <div className="w-12 h-12 bg-indigo-500 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold">JS</span>
                </div>
                <div>
                  <p className="font-semibold">Jane Smith</p>
                  <p className="text-gray-400">Dolor Sit Amet</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: THE ACTION */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            Duis Aute Irure
          </h2>
          <p className="text-xl mb-12 leading-relaxed text-gray-200">
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-2xl mx-auto border border-white/20">
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <input 
                  type="text" 
                  placeholder="Lorem Ipsum" 
                  className="w-full px-6 py-4 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                />
                <input 
                  type="email" 
                  placeholder="Dolor Sit Amet" 
                  className="w-full px-6 py-4 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                />
              </div>
              <button 
                type="submit"
                className="w-full bg-white text-blue-600 px-8 py-4 rounded-lg text-xl font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                CONSECTETUR ADIPISCING
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* SECTION 6: THE COMMUNITY */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-8">
            Sed Ut Perspiciatis
          </h2>
          <p className="text-xl text-center text-gray-600 mb-16 max-w-4xl mx-auto">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, 
            totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6 border border-blue-200">
                <div className="w-10 h-10 bg-blue-500 rounded-full"></div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Lorem Ipsum</h3>
              <p className="text-gray-600 mb-6">Dolor sit amet consectetur adipiscing elit</p>
              <button className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors font-medium">
                Sed Do Eiusmod
              </button>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-6 border border-indigo-200">
                <div className="w-10 h-10 bg-indigo-500 rounded-full"></div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Tempor Incididunt</h3>
              <p className="text-gray-600 mb-6">Ut labore et dolore magna aliqua</p>
              <button className="bg-indigo-500 text-white px-6 py-3 rounded-lg hover:bg-indigo-600 transition-colors font-medium">
                Ut Enim Ad
              </button>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-6 border border-purple-200">
                <div className="w-10 h-10 bg-purple-500 rounded-full"></div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Minim Veniam</h3>
              <p className="text-gray-600 mb-6">Quis nostrud exercitation ullamco</p>
              <button className="bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600 transition-colors font-medium">
                Laboris Nisi
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: FOOTER */}
      <footer className="bg-slate-900 text-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="text-2xl font-bold mb-6">Lorem Ipsum</h3>
              <p className="text-gray-400 mb-6">
                Dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Ut Enim Ad
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Minim Veniam
                </a>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quis Nostrud</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Exercitation Ullamco</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Laboris Nisi</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Ut Aliquip</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Ex Ea Commodo</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Consequat Duis</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Aute Irure</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Dolor In</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Reprehenderit</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Voluptate Velit</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Esse Cillum</h4>
              <ul className="space-y-2 text-gray-400">
                <li>dolore@eu.fugiat</li>
                <li>+1 (555) 123-4567</li>
                <li>123 Lorem Ipsum St<br />Dolor Sit, CA 12345</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 Lorem Ipsum. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Nulla Pariatur</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Excepteur Sint</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Occaecat Cupidatat</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
