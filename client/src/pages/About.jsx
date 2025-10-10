export default function About() {
  return (
    <div className="px-4 py-12 max-w-6xl mx-auto text-slate-700">
      <h1 className="text-4xl font-bold mb-6 text-center text-slate-800">
        About <span className="text-slate-600">AbhiEstate</span>
      </h1>

      <p className="mb-4 text-lg leading-relaxed text-justify">
        <span className="font-semibold text-slate-900">AbhiEstate</span> is a
        modern real estate platform designed to make property transactions
        smarter, faster, and more transparent. Built with innovation and
        simplicity in mind, our platform connects buyers, sellers, and renters
        through a secure and user-friendly digital experience.
      </p>

      <p className="mb-4 text-lg leading-relaxed text-justify">
        Our mission is to empower individuals to discover their ideal homes and
        investment opportunities effortlessly. Whether you’re buying your first
        property, listing an estate, or exploring rental options, AbhiEstate
        provides verified listings, smart search capabilities, and an intuitive
        interface to help you make confident real estate decisions.
      </p>

      <p className="mb-4 text-lg leading-relaxed text-justify">
        Powered by the <span className="font-semibold">MERN stack</span> — MongoDB,
        Express, React, and Node.js — and integrated with Firebase for secure
        authentication and image storage, AbhiEstate showcases a scalable,
        full-stack architecture tailored for real-world applications. It reflects
        our commitment to combining elegant design with robust functionality.
      </p>

      <p className="mb-4 text-lg leading-relaxed text-justify">
        Beyond being a project, AbhiEstate represents a vision — to redefine how
        people interact with the real estate market in the digital era. Our focus
        remains on creating a seamless user journey, from browsing listings to
        managing profiles and closing deals with trust and transparency.
      </p>

      <div className="mt-10 text-center">
        <h2 className="text-xl font-semibold text-slate-800 mb-2">
          Our Core Values
        </h2>
        <ul className="text-lg leading-relaxed space-y-2 text-slate-700">
          <li>🏡 <span className="font-medium">Transparency:</span> Every listing is verified and trustworthy.</li>
          <li>⚙️ <span className="font-medium">Innovation:</span> Leveraging technology to simplify real estate operations.</li>
          <li>🤝 <span className="font-medium">User Trust:</span> Privacy, security, and authenticity are our priorities.</li>
          <li>📈 <span className="font-medium">Scalability:</span> Built with modern, production-grade architecture.</li>
        </ul>
      </div>

      <div className="mt-10 text-center">
        <p className="italic text-slate-600 text-lg">
          “At AbhiEstate, we don’t just list properties — we help you find your place in the world.”
        </p>
      </div>
    </div>
  );
}
