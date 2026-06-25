export default function About() {
  return (
    <div className='py-16 max-w-6xl mx-auto px-6 text-slate-700 dark:text-slate-300 transition-colors duration-300'>
      {/* Hero Section */}
      <div className='text-center max-w-3xl mx-auto mb-16'>
        <span className='px-4 py-1.5 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-widest rounded-full border border-indigo-100 dark:border-indigo-900/40'>
          Our Story
        </span>
        <h1 className='text-4xl sm:text-5xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight mt-4 mb-6'>
          About <span className='bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent'>Abhi Estate</span>
        </h1>
        <p className='text-lg text-slate-500 dark:text-slate-400 leading-relaxed font-medium'>
          Redefining how people discover, list, and invest in real estate by blending beautiful design, robust engineering, and absolute transparency.
        </p>
      </div>

      {/* Stats Dashboard */}
      <div className='grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16'>
        {[
          { label: 'Verified Listings', val: '100%' },
          { label: 'Happy Clients', val: '5k+' },
          { label: 'Active Locations', val: '50+' },
          { label: 'Customer Support', val: '24/7' },
        ].map(({ label, val }) => (
          <div key={label} className='p-6 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-2xl shadow-sm text-center transform hover:-translate-y-1 transition-all duration-300'>
            <p className='text-3xl sm:text-4xl font-black text-indigo-600 dark:text-indigo-400'>{val}</p>
            <p className='text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mt-2'>{label}</p>
          </div>
        ))}
      </div>

      {/* Main Philosophy Sections */}
      <div className='grid md:grid-cols-2 gap-10 items-stretch mb-20'>
        <div className='p-8 bg-slate-50/50 dark:bg-slate-900/30 border border-slate-100 dark:border-slate-800/40 rounded-3xl flex flex-col justify-center'>
          <h2 className='text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4'>Our Vision</h2>
          <p className='text-base leading-relaxed text-justify mb-4 font-medium text-slate-600 dark:text-slate-400'>
            Abhi Estate is a modern real estate platform designed to make property transactions smarter, faster, and more transparent. Built with simplicity in mind, our platform connects buyers, sellers, and renters through a secure, high-performance digital experience.
          </p>
          <p className='text-base leading-relaxed text-justify font-medium text-slate-600 dark:text-slate-400'>
            Our mission is to empower individuals to discover their ideal homes and investment opportunities effortlessly. Whether you’re buying your first property, listing an estate, or exploring rentals, we provide the tools to help you decide with confidence.
          </p>
        </div>

        <div className='p-8 bg-indigo-600 dark:bg-indigo-950/20 text-white dark:text-indigo-300 rounded-3xl flex flex-col justify-center shadow-xl shadow-indigo-100 dark:shadow-none relative overflow-hidden'>
          <div className='absolute -right-10 -bottom-10 w-44 h-44 bg-indigo-500/20 dark:bg-indigo-900/20 rounded-full blur-3xl'></div>
          <h2 className='text-2xl font-bold text-white mb-4'>Technology & Stack</h2>
          <p className='text-base leading-relaxed text-justify mb-4 opacity-90 font-medium'>
            Powered by the modern <span className='font-bold underline decoration-wavy decoration-indigo-300'>MERN stack</span> (MongoDB, Express, React, and Node.js), Abhi Estate showcases a scalable, full-stack architecture built to match production-grade requirements.
          </p>
          <p className='text-base leading-relaxed text-justify opacity-90 font-medium'>
            We integrate JWT cookie auth, local Base64 media streaming, and modular state management to ensure that speed, privacy, and visual elegance coexist in a single ecosystem.
          </p>
        </div>
      </div>

      {/* Core Values Section */}
      <div className='mb-20'>
        <div className='text-center mb-12'>
          <h2 className='text-3xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight'>Our Core Values</h2>
          <p className='text-sm text-slate-400 dark:text-slate-500 font-semibold mt-2'>The principles that guide how we build and support our community</p>
        </div>

        <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6'>
          {[
            {
              title: 'Transparency',
              desc: 'Every listing undergoes validation. We supply clear, authentic specs and transparent metrics.',
              icon: (
                <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' />
                </svg>
              ),
            },
            {
              title: 'Innovation',
              desc: 'Leveraging web capabilities like instant Base64 processing to bypass cloud storage subscription limitations.',
              icon: (
                <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M13 10V3L4 14h7v7l9-11h-7z' />
                </svg>
              ),
            },
            {
              title: 'User Trust',
              desc: 'Prioritizing data security, cookie protection, and secure auth methods above all else.',
              icon: (
                <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' />
                </svg>
              ),
            },
            {
              title: 'Scalability',
              desc: 'Engineered with clean RESTful controller-route patterns and robust MongoDB backend models.',
              icon: (
                <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4' />
                </svg>
              ),
            },
          ].map(({ title, desc, icon }) => (
            <div key={title} className='p-6 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300'>
              <div className='p-3 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 rounded-xl w-fit mb-4'>
                {icon}
              </div>
              <h3 className='text-lg font-bold text-slate-800 dark:text-slate-100 mb-2'>{title}</h3>
              <p className='text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-semibold'>{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Quote Testimonial */}
      <div className='bg-slate-50/50 dark:bg-slate-900/30 border border-slate-100 dark:border-slate-800/40 rounded-3xl p-8 max-w-3xl mx-auto text-center'>
        <p className='italic text-lg font-semibold text-slate-700 dark:text-slate-300 leading-relaxed'>
          “At Abhi Estate, we don’t just list properties — we help you discover your space in the world and secure it with complete confidence.”
        </p>
      </div>
    </div>
  );
}
