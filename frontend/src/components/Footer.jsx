import { motion } from "framer-motion"; // eslint-disable-line no-unused-vars

function FadeUp({ children, delay = 0, className = "" }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}
//a
export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] pt-20 pb-10 border-t border-white/5">
      <FadeUp className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div>
            <div className="flex items-center mb-6">
              <img
                src="/FitMeal_logoblanco.png"
                alt="FitMeal logo"
                className="h-10 w-auto"
              />
            </div>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              Transformando vidas a través de la nutrición inteligente y el
              entrenamiento efectivo. Únete a nuestra comunidad global.
            </p>
            <div className="flex gap-4">
              {["facebook-f", "instagram", "twitter"].map((icon) => (
                <a
                  key={icon}
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all"
                  href="#"
                >
                  <i className={`fab fa-${icon}`} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Plataforma</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              {[
                "Planes de Comida",
                "Entrenamientos",
                "Dashboard",
                "Comunidad",
              ].map((item) => (
                <li key={item}>
                  <a className="hover:text-primary transition-colors" href="#">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Compañía</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              {["Sobre Nosotros", "Carreras", "Blog", "Contacto"].map(
                (item) => (
                  <li key={item}>
                    <a
                      className="hover:text-primary transition-colors"
                      href="#"
                    >
                      {item}
                    </a>
                  </li>
                ),
              )}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Suscríbete</h4>
            <p className="text-gray-500 text-sm mb-4">
              Recibe tips semanales y ofertas exclusivas.
            </p>
            <form className="flex flex-col gap-3">
              <input
                className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-primary transition-colors"
                placeholder="Tu email"
                type="email"
              />
              <button
                className="bg-white text-black font-bold py-3 rounded-lg hover:bg-gray-200 transition-colors"
                type="submit"
              >
                Suscribirse
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-xs">
            © 2024 FitMeal Inc. Todos los derechos reservados.
          </p>
          <div className="flex gap-6 text-gray-600 text-xs">
            {["Privacidad", "Términos", "Cookies"].map((l) => (
              <a key={l} className="hover:text-white" href="#">
                {l}
              </a>
            ))}
          </div>
        </div>
      </FadeUp>
    </footer>
  );
}
