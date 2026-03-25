import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars
import { useAuth } from '../context/AuthContext';
import Footer from '../components/Footer';

function TextReveal({ text, className, delay = 0 }) {
  const words = text.split(' ');
  return (
    <motion.span
      className={`inline-flex flex-wrap gap-x-[0.3em] ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      transition={{ staggerChildren: 0.1, delayChildren: delay }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block"
          variants={{
            hidden: { opacity: 0, filter: 'blur(12px)', y: 24 },
            visible: {
              opacity: 1,
              filter: 'blur(0px)',
              y: 0,
              transition: { duration: 0.75, ease: [0.2, 0.65, 0.3, 0.9] },
            },
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}

function LetterReveal({ text, className, delay = 0 }) {
  return (
    <motion.span
      className={`inline-flex ${className}`}
      initial="hidden"
      animate="visible"
      transition={{ staggerChildren: 0.06, delayChildren: delay }}
    >
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          variants={{
            hidden: { opacity: 0, y: 60, rotateX: -40 },
            visible: {
              opacity: 1,
              y: 0,
              rotateX: 0,
              transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
            },
          }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
}

function FadeUp({ children, delay = 0, className = '' }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

const plans = [
  {
    name: 'Plan Básico',
    price: 'FREE',
    features: [
      'Evaluación inicial simple',
      'Plan de alimentación general',
      'Rutina de ejercicios 3x por semana',
      'Dashboard de progreso',
      'Tips semanales',
    ],
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAK_63ioWKMT7Ib4A3gI2dZ-R8I7obScZ4IxmNoBuIdmTKA-Q4rrc_9YuXBmP2WwmkblX21lOO4SEO8bb5kkwAAPwgvOtJ2OtPnzfQUV8edBFAN_F30aUfyBdukN_SAiUrqg05jvTPiVKPa4GpMX5JY27levV692ESfnf16fzHtqeI8stP6u2tULvQ51_IDonH6JG6GemoCyZ0i_F9W5aeiLmoBhQNnZx4ZwMah8FgmCfLimAQbl3DJBln75poSf-v7Nl8_r_7FQb3Q',
    imgAlt: 'Healthy Bowl',
    featured: false,
    dotColor: 'bg-white',
  },
  {
    name: 'Plan Avanzado',
    price: '9,99 € /mes',
    features: [
      'Todo del Básico',
      'Plan personalizado (calorías)',
      'Rutinas 4-5 por semana',
      'Seguimiento mensual',
      'Acceso a comunidad',
    ],
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCLxsc-hWCARcTTx4wcrk0KlWy4eprK4Fc3M782mjObGw8lJd4JH2Tr-W3h296ZWlRK-x1zVA2bT9a7MsCQWeF7oA3-Whem2l7ILTYozmgHTEZ-TtYLBrrj-pAwwkqIr9m1aE-t8z-0n6Ej7qLnb5VgyEbi9g73WgIyXAjPxR1cQ3dgR88TNV0hFxYcwK-UvtPhrZd6H8t90aTDft8Qq70PVQiPqEOPFvXCmexWSQTr5_bMSbCkT5AzHR6SyuDGvqQ_tDsznIGoX33g',
    imgAlt: 'Chicken Meal',
    featured: true,
    dotColor: 'bg-primary',
  },
  {
    name: 'Plan Premium',
    price: '19,99 € /mes',
    features: [
      'Todo del Avanzado',
      'Revisión mensual con asesor',
      'Alimentación adaptable',
      'Recordatorios personalizados',
      'Desafíos con recompensas',
    ],
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCm3RQIyd3thGQqw9yhGww3Kf_cONx27NOIyLvBeu3R98zeinp99gJlirbx9GMo1sDWlMDmbYJAYHeGLqAKDuB0ZIw4-V-2T5cSO1LcQyEE7bPZDOu5UBfAQitLElO8mcLIlmfyzKFJfMej-17EB_DIkFE7Fvm-FnSqtFBNgdcv58TvcAKIO0IdvpeA05TOeoVQc3_jH3b2leF8HqfqIMyF9HDEnmVqVWd_4XV8uXhBzCXnzDd-Uz3cSM4gXK92HkFA62saj-S6mzM8',
    imgAlt: 'Avocado Salad',
    featured: false,
    dotColor: 'bg-white',
  },
];

const products = [
  {
    name: 'Whey Isolate Pro',
    desc: 'Chocolate Fudge, 2kg',
    price: '€59.99',
    badge: 'NEW',
    badgeBg: 'bg-black/50',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCSTyx2m5pvOqXdRXLFRTsuD6jNOX4FbX905LsQKEWwTDOZOn7vzZ4IZEMZz86GDlTGeUg6vkJpQhTHYhYvCHNsG8yuywxba0zk_aC7J8f1-9zazh0yDnYhtI1QGw3RYYh4ht_ADmr2gPh7jO7ClwQfx-TcTWkWirqZXtPitnuxCo_TExAE9SDuW4sbByl9CnhXb6xDjLsUf-o4r1DCB42nvLVmilm6NOnkkNL2meCwBlZeUjVYyO5EBFjV_o96HWDzjpuB36sVwVR3',
  },
  {
    name: 'Ignite Pre-Workout',
    desc: 'Blue Raspberry, 30 Servings',
    price: '€34.99',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCR5oVUq-JXd7SlZzRKpGzy5i5Oi-eTkR1rk-EPF9rNfEcw4lR4nlRZW_zJYJjHKP87MxDl6PBXovNMMpSbhlkErR3slb5M5Hah_AbxswoJOSRlKpyh4kCRSb7XHU04zbpJZFpz-mZubzE0p_Ibm62ShXCfvq15Vql4r1cX2GIePieDdnbmDvWp9bMSS4rmHWvR4rlF4qvXWgxsozhgTWGI-KzCU0ulEPSWgdLDiapw00u9A12cnE2JyLmeqCm1LogNmEpEcr4FtUSR',
  },
  {
    name: 'Multi-V Complex',
    desc: 'Daily Essentials, 90 Caps',
    price: '€24.99',
    oldPrice: '€29.99',
    badge: '-15%',
    badgeBg: 'bg-primary',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBG-lLTiymwJ1Lk7-xI7i8yxO1_IzPEoOk4DIYEbEl__FGgss79wvR1bVH_WZa8InTbrbWdl6m8by4-u46ubmCiNL_bydX2-l4OBq4RuIgibmNQyFu3dsP-pMsDOXBmQn41QHJaNDeMnbLdtC1Z6z0ztH9Zt5uv4AQnp_kOGkYbKNTDjhptTiPmRezYvAh3vYgzRAL5_DHt3RAD-R7M-gy2_IwWBzK8HyBvShckQy9TpinejEjng5HDLNIc0paetT7ZwjA7_1FE53vm',
  },
  {
    name: 'Pro Shaker Bottle',
    desc: 'Matte Black, 700ml',
    price: '€12.99',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCsVEj2SP94cMeoGp1_oHywGVj07dz9dyOQ-gH10peYacvk4-v8MmQiZdplr_2PYR__tqIY-7nuvD-Wdi62V0JUhtJ_98sQF9Wd8KD5xAr-dAo630dx4jl2yJXfV0CIFC1w21th2vdV0b_1QbPY45Us3agfdyht0JzCxUpawmE5k53aEcBy_Aqy-I1gw4gP8P7G41zgdXE4VM3pWuYTlXhTRpDABGLMEDkFTJcn5W_ozfQz8_UB5M3iZpd_E3NCiF_Lbnj9O2ez0jVH',
  },
];

export default function Home() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="font-body min-h-screen bg-black text-white">

      <div className="relative w-full h-screen flex flex-col overflow-hidden">

        <div className="absolute inset-0 z-0">
          <img
            alt="Modern gym interior"
            className="w-full h-full object-cover"
            src="fit-woman-performing-a-goblet-squat-at-the-gym-fo-2026-01-09-10-34-51-utc.webp"
            // src="https://lh3.googleusercontent.com/aida-public/AB6AXuDhBkpDLj34N2Ky3IDNE1hYOrqVX2gBTE6JpTUF-mj_X7H0-gpChyyNyti3Mt6VfAE9mQA4G_w5QaCkon0ZWZD8DpB-56euIzggvPjyafFSrjTmZ_n2qXUK2fH4QU47_h6mHTGu74_YWK7S4qKrNQQNYZ7gI8OhafRfQ5REdg2recg4Io9i_o7JxINZTDhvTq47yJvnetW6KkHYqsXIps64vYSE2xqrxLm-xkxCRe4kf_lCddS9L003578ZeNb9NuYv0yjjNdckiztq"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
        </div>

        <main className="relative z-10 flex-grow flex items-center px-8 md:px-16 lg:px-24 pt-20">
          <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            <div>
              <h1 className="text-8xl md:text-[10rem] font-display italic leading-[0.85] tracking-tight text-white mb-8 drop-shadow-2xl perspective-[600px]">
                <LetterReveal text="FITMEAL" delay={0.1} />
              </h1>
              <motion.div
                className="flex flex-col sm:flex-row gap-6 items-start sm:items-center mb-12"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  to={isAuthenticated ? '/dashboard' : '/register'}
                  className="bg-primary hover:bg-primary-hover text-white font-bold italic py-4 px-10 rounded-full shadow-[0_0_30px_rgba(211,15,21,0.4)] transition-all hover:scale-105 active:scale-95 text-lg flex items-center gap-2 group"
                >
                  {isAuthenticated ? 'Ir al Dashboard' : 'Empieza tu recorrido'}
                  <span className="material-symbols-outlined text-xl group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </Link>

                <div className="flex items-center gap-3 text-sm font-light italic opacity-80 bg-black/30 p-2 rounded-full pr-4 backdrop-blur-sm border border-white/5">
                  <div className="flex -space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gray-300 border-2 border-black overflow-hidden">
                      <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCtDZLR2lf2xI-VXUtdl65mTkwi_FFud4EqefZfn0qus1tVdUuKeMBZhODnTG_A_VgK6kGKD52ROy8yCJDlKNdBPDokj20Rm0WFEqmzY0nkpoUZusiBfrAtAxn8Ik-1S3mbFy67fd640ZzH-W_k_GbQH53FZ_CI5sL5bywefl1t8KB8OVuV6Y_4gmFYPL-adJLQfrQkth4QX6sR59XwIGNUVcQE_CebbnOp1gqPLoA8sj_X-cfmagFE1iCHDq_rBDkCeDocE2UjPiF3" alt="" />
                    </div>
                    <div className="w-10 h-10 rounded-full bg-gray-300 border-2 border-black overflow-hidden">
                      <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDEe08QMKkq6qWd2-PxSgJWvnu8SUZlBMfF2l2Qci7n8HUizB-Kmu0ArN0KAlFqGOhbrzn1TRi4d8jnAjgAeARXoAwSyX00blKF-PyU9YBWsH0M2HT1Xt-seuh1FcSJOSMcx-KIaiKVuGVJW7A-7f-apDv7xGM6CMepHA5EBSsKmS7w_u6z3EgA3fWBjVIwVCxLfL6HT8ART2I9R28v0K2in8e53ADP681LQCSPu06jKzmMScf78ByPyPK9hvbFayHUcEmZD7UV5DkR" alt="" />
                    </div>
                    <div className="w-10 h-10 rounded-full bg-card-lighter border-2 border-black flex items-center justify-center text-white text-xs font-bold">+2k</div>
                  </div>
                  <span className="pl-1">Active members</span>
                </div>
              </motion.div>
            </div>

            <motion.div
              className="hidden lg:grid grid-cols-2 gap-4 h-[500px]"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: { staggerChildren: 0.15, delayChildren: 0.5 },
                },
              }}
            >
              <motion.div
                  className="bg-card-dark/10 backdrop-blur-md p-8 rounded-[2rem] border border-white/5 hover:border-primary/40 transition-all cursor-pointer group row-span-2 flex flex-col justify-between relative overflow-hidden"
                variants={{
                  hidden: { opacity: 0, x: 60, y: 20, filter: 'blur(6px)' },
                  visible: { opacity: 1, x: 0, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
                }}
              >
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <span className="material-symbols-outlined text-9xl">restaurant_menu</span>
                </div>
                <div>
                  <span className="material-symbols-outlined text-primary text-5xl mb-4 group-hover:scale-110 transition-transform duration-300 block">restaurant</span>
                  <h3 className="font-display italic text-3xl mb-2">Nutrition<br />Plans</h3>
                </div>
                <div className="mt-auto">
                  <p className="text-sm text-gray-400 leading-relaxed mb-4">Metabolic tailored meal prepping for peak performance.</p>
                  <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all">
                    <span className="material-symbols-outlined text-xl rotate-45 group-hover:rotate-0 transition-transform">arrow_upward</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="bg-card-lighter/10 backdrop-blur-md p-6 rounded-[2rem] border border-white/5 hover:border-primary/40 transition-all cursor-pointer group flex flex-col justify-center relative overflow-hidden"
                variants={{
                  hidden: { opacity: 0, x: 60, y: 20, filter: 'blur(6px)' },
                  visible: { opacity: 1, x: 0, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
                }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="material-symbols-outlined text-white text-4xl">fitness_center</span>
                  <div className="bg-green-500/20 text-green-400 text-xs font-bold px-2 py-1 rounded-full">+15% Gain</div>
                </div>
                <h3 className="font-display italic text-2xl mb-1">Tracking</h3>
                <p className="text-xs text-gray-400">Log every set &amp; rep instantly.</p>
              </motion.div>

              <motion.div
                className="bg-card-dark/10 backdrop-blur-md p-6 rounded-[2rem] border border-white/5 hover:border-primary/40 transition-all cursor-pointer group flex items-center gap-4 relative overflow-hidden"
                variants={{
                  hidden: { opacity: 0, x: 60, y: 20, filter: 'blur(6px)' },
                  visible: { opacity: 1, x: 0, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
                }}
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-black flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-white text-3xl">monitoring</span>
                </div>
                <div>
                  <h3 className="font-display italic text-2xl mb-1">Results</h3>
                  <p className="text-xs text-gray-400">Data visualization dashboard.</p>
                </div>
              </motion.div>
            </motion.div>

          </div>
        </main>

        <motion.div
          className="absolute bottom-8 right-8 flex-col gap-4 z-20 hidden md:flex"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 1.1, staggerChildren: 0.1 }}
        >
          {['instagram', 'twitter', 'youtube'].map((icon) => (
            <a
              key={icon}
              className="w-12 h-12 rounded-full border border-white/20 bg-black/20 backdrop-blur-sm flex items-center justify-center hover:bg-white hover:text-black hover:scale-110 transition-all duration-300"
              href="#"
            >
              <i className={`fab fa-${icon} text-lg`} />
            </a>
          ))}
        </motion.div>
      </div>

      <section className="relative py-24 bg-black" id="plans">
        <div className="max-w-7xl mx-auto px-6 md:px-12">

          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-display italic mb-4">
              <TextReveal text="Empieza tu plan personalizado" />
            </h2>
            <FadeUp delay={0.2}>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Planes basados en tus objetivos y datos personales para maximizar resultados.
              </p>
            </FadeUp>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            transition={{ staggerChildren: 0.15 }}
          >
            {plans.map((plan) => (
              <motion.div
                key={plan.name}
                variants={{
                  hidden: { opacity: 0, y: 50, scale: 0.95 },
                  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
                }}
                className={`bg-card-lighter rounded-3xl p-8 border ${
                  plan.featured
                    ? 'border-primary/20 hover:border-primary transform md:-translate-y-4 shadow-2xl shadow-primary/10'
                    : 'border-white/5 hover:border-primary/30'
                } transition-all duration-300 group flex flex-col h-full relative overflow-hidden`}
              >
                {plan.featured && (
                  <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
                )}
                <div className="flex justify-between items-start mb-8">
                  <h3 className="font-display italic text-3xl text-white">{plan.name}</h3>
                  <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-white/10 group-hover:scale-110 transition-transform duration-500 shadow-xl shadow-black/50 absolute top-6 right-6">
                    <img alt={plan.imgAlt} className="w-full h-full object-cover" src={plan.img} />
                  </div>
                </div>
                <div className="mt-8 mb-8 flex-grow">
                  <ul className="space-y-3 text-sm text-gray-300">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-center gap-2">
                        <span className={`w-1.5 h-1.5 ${plan.dotColor} rounded-full`} />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <button className="w-full py-3 rounded-full bg-primary hover:bg-primary-hover text-white font-bold italic tracking-wide transition-colors shadow-[0_0_15px_rgba(211,15,21,0.3)]">
                  {plan.price}
                </button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-black relative overflow-hidden" id="products">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1/3 h-2/3 bg-primary/5 blur-3xl rounded-full pointer-events-none" />
        <div className="absolute right-1/4 bottom-0 w-64 h-64 bg-primary/10 blur-[100px] rounded-full pointer-events-none" />
        <FadeUp className="max-w-7xl mx-auto px-6 md:px-12 mb-10 flex justify-between items-end relative z-10">
          <div>
            <h2 className="text-4xl md:text-5xl font-display italic text-white">
              <TextReveal text="Nuestros Productos" />
            </h2>
            <p className="text-gray-400 mt-2">Suplementación de alta calidad para complementar tu dieta.</p>
          </div>
          <div className="hidden md:flex gap-2">
            <button className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-colors">
              <span className="material-symbols-outlined">arrow_back</span>
            </button>
            <button className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-colors">
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
        </FadeUp>

        <motion.div
          className="flex overflow-x-auto gap-6 pb-8 px-6 md:px-12 scrollbar-hide snap-x relative z-10"
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {products.map((p) => (
            <motion.div
              key={p.name}
              className="min-w-[280px] md:min-w-[320px] bg-card-lighter rounded-2xl p-4 snap-center group cursor-pointer hover:bg-card-dark transition-colors border border-white/5"
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
            >
              <div className="w-full h-64 bg-white/5 rounded-xl mb-4 relative overflow-hidden flex items-center justify-center">
                <img alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src={p.img} />
                {p.badge && (
                  <span className={`absolute top-3 right-3 ${p.badgeBg} backdrop-blur-md px-2 py-1 rounded text-xs font-bold text-white`}>
                    {p.badge}
                  </span>
                )}
              </div>
              <h3 className="font-display italic text-xl text-white mb-1">{p.name}</h3>
              <p className="text-sm text-gray-400 mb-4">{p.desc}</p>
              <div className="flex justify-between items-center">
                <div className="flex gap-2 items-center">
                  <span className="text-primary font-bold text-lg">{p.price}</span>
                  {p.oldPrice && <span className="text-gray-500 text-sm line-through">{p.oldPrice}</span>}
                </div>
                <button className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                  <span className="material-symbols-outlined text-sm">add</span>
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section className="py-24 bg-black relative overflow-hidden">
        <div className="absolute right-0 top-0 w-1/2 h-full bg-primary/5 blur-3xl rounded-full" />
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">

          <motion.div
            className="order-2 lg:order-1 relative"
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative z-10 rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl">
              <img
                alt="Meal Prep"
                className="w-full h-auto object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDkhnk5VsyXteI0FDUEMEIrnI0-71PDnCJRTVF-WKbfPoHijCfWswRFcHOdXCJ-1N7c-LscZBiRvx-mapDyh0XQlysCD5_GV7d0iF9zlj3JSdlzkCwDaRYeI0po_qqwvXX4OGvfrv6p8HxJZGYWczDYmfnjfNuYgs9NPypkfrOHx2GOC1aBJhvSGbEzDYfr7f73D6wzaCrUb8FE-W7zRRl3vNdoe4vXlgPmXi_rFeO6JiYAi520pT2mds859KP3KUFYKPtc5Bc7xZ1w"
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black to-transparent p-8">
                <div className="flex items-center gap-4">
                  <div className="bg-primary p-3 rounded-full">
                    <span className="material-symbols-outlined text-white">restaurant</span>
                  </div>
                  <div>
                    <p className="text-white font-bold">Weekly Menu</p>
                    <p className="text-gray-300 text-xs">Updated every Sunday</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-primary rounded-full filter blur-[100px] opacity-30" />
          </motion.div>

          <motion.div
            className="order-1 lg:order-2"
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          >
            <span className="text-primary font-bold tracking-wider uppercase text-sm mb-2 block">Nutrición Inteligente</span>
            <h2 className="text-5xl md:text-6xl font-display italic text-white mb-6">
              <TextReveal text="Tu comida, tu combustible." />
            </h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              No se trata solo de calorías, se trata de calidad. Nuestros planes de comidas están diseñados
              por nutricionistas expertos para asegurar que obtengas los macro y micronutrientes que tu
              cuerpo necesita para rendir al máximo.
            </p>

            <motion.div
              className="grid grid-cols-2 gap-6 mb-10"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ staggerChildren: 0.15, delayChildren: 0.3 }}
            >
              {[{ value: '100+', label: 'Recetas Saludables' }, { value: '24/7', label: 'Soporte Nutricional' }].map((s) => (
                <motion.div
                  key={s.label}
                  className="flex flex-col gap-2"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                  }}
                >
                  <span className="text-3xl font-display italic text-white">{s.value}</span>
                  <span className="text-sm text-gray-500">{s.label}</span>
                </motion.div>
              ))}
            </motion.div>

            <motion.button
              className="border border-white text-white hover:bg-white hover:text-black font-medium py-3 px-8 rounded-full transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              Ver Menú Semanal
            </motion.button>
          </motion.div>

        </div>
      </section>

      <Footer />

    </div>
  );
}
