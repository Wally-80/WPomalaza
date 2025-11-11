export default function About() {
  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-12">Sobre mí</h2>
        
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <p className="text-lg text-gray-700 mb-6">
              Soy un desarrollador apasionado por crear soluciones web modernas y eficientes. 
              Me especializo en el desarrollo full stack con tecnologías como Next.js, React, 
              TypeScript y bases de datos modernas como Supabase.
            </p>
            
            <h3 className="text-2xl font-bold mb-4">Habilidades</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              {[
                'Next.js',
                'React',
                'TypeScript',
                'Tailwind CSS',
                'Supabase',
                'Node.js',
                'PostgreSQL',
                'Git',
                'PWA'
              ].map((skill) => (
                <div key={skill} className="bg-gray-100 px-4 py-2 rounded-lg text-center">
                  {skill}
                </div>
              ))}
            </div>

            <h3 className="text-2xl font-bold mb-4">Experiencia</h3>
            <p className="text-gray-700">
              Agrega tu experiencia laboral aquí. Puedes gestionar esta información 
              desde tu base de datos de Supabase usando la tabla &quot;experiences&quot;.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
