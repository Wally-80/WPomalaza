export default function Hero() {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
          Hola, soy <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">WPomalaza</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Desarrollador Full Stack apasionado por crear experiencias web modernas y eficientes
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#projects"
            className="px-8 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            Ver Proyectos
          </a>
          <a
            href="#contact"
            className="px-8 py-3 bg-white text-gray-900 border-2 border-gray-900 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Contactar
          </a>
        </div>
      </div>
    </section>
  )
}
