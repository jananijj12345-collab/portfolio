import React, { useEffect, useRef, useState } from "react";
/**
 * Janani J — Portfolio
 * Single-file React component (App.jsx)
 *
 * USAGE (Vite)
 * - Drop this in as src/App.jsx in a Vite React project.
 * - Put your resume PDF at: src/assets/resume.pdf
 *   It's imported below with the `?url` suffix so Vite always treats it
 *   as a static asset (this matters because Vite doesn't auto-recognize
 *   .pdf in its default asset list — `?url` forces it regardless).
 * - No external CSS file needed — styles are embedded below.
 * - No backend, no database, no router. Pure static single page.
 */

import resumeUrl from "./assets/resume.pdf";

const NAV_LINKS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "education", label: "Education" },
  { id: "skills", label: "Skills" },
  { id: "certifications", label: "Certifications" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

/* ---------------------------------- Icons --------------------------------- */
/* Small inline line icons — no external icon library, keeps this a single file. */

const Icon = ({ path, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...props}
  >
    {path}
  </svg>
);

const IconLedger = (p) => (
  <Icon
    {...p}
    path={
      <>
        <rect x="4" y="3" y2="21" width="16" height="18" rx="1.5" />
        <path d="M8 8h8M8 12h8M8 16h5" />
      </>
    }
  />
);
const IconFinance = (p) => (
  <Icon
    {...p}
    path={
      <>
        <path d="M4 19h16" />
        <path d="M7 19V10M12 19V5M17 19v7" />
      </>
    }
  />
);
const IconOps = (p) => (
  <Icon
    {...p}
    path={
      <>
        <circle cx="12" cy="12" r="8" />
        <path d="M12 8v4l3 2" />
      </>
    }
  />
);
const IconErp = (p) => (
  <Icon
    {...p}
    path={
      <>
        <rect x="3" y="4" width="18" height="12" rx="1.5" />
        <path d="M8 20h8M12 16v4" />
      </>
    }
  />
);
const IconData = (p) => (
  <Icon
    {...p}
    path={
      <>
        <ellipse cx="12" cy="6" rx="7" ry="3" />
        <path d="M5 6v12c0 1.66 3.13 3 7 3s7-1.34 7-3V6" />
        <path d="M5 12c0 1.66 3.13 3 7 3s7-1.34 7-3" />
      </>
    }
  />
);
const IconAdmin = (p) => (
  <Icon
    {...p}
    path={
      <>
        <path d="M9 3h6l1 3H8l1-3Z" />
        <rect x="5" y="6" width="14" height="15" rx="1.5" />
        <path d="M9 12h6M9 16h6" />
      </>
    }
  />
);
const IconMail = (p) => (
  <Icon
    {...p}
    path={
      <>
        <rect x="3" y="5" width="18" height="14" rx="1.5" />
        <path d="m4 6 8 7 8-7" />
      </>
    }
  />
);
const IconPhone = (p) => (
  <Icon
    {...p}
    path={
      <path d="M6.6 10.8a15 15 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 9.3 9.3 0 0 0 2.9.47 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 5a1 1 0 0 1 1-1h3.3a1 1 0 0 1 1 1 9.3 9.3 0 0 0 .47 2.9 1 1 0 0 1-.25 1L6.6 10.8Z" />
    }
  />
);
const IconLinkedIn = (p) => (
  <Icon
    {...p}
    path={
      <>
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M7.5 10.5v6M7.5 7.75v.01M11.5 16.5v-3.7c0-1.1.9-2 2-2s2 .9 2 2v3.7M11.5 12.8v3.7" />
      </>
    }
  />
);
const IconMenu = (p) => (
  <Icon {...p} path={<path d="M4 7h16M4 12h16M4 17h16" />} />
);
const IconClose = (p) => <Icon {...p} path={<path d="M6 6l12 12M18 6 6 18" />} />;

/* --------------------------------- Data ----------------------------------- */

const SKILL_GROUPS = [
  {
    title: "Accounting & Finance",
    items: [
      { name: "Basic Accounting Entries", level: "Basic" },
      { name: "Accounting Fundamentals", level: "Basic" },
      { name: "Financial Documentation", level: "Working Knowledge" },
      { name: "Business Documentation", level: "Working Knowledge" },
    ],
  },
  {
    title: "Software & Tools",
    items: [
      { name: "MS Excel", level: "Working Knowledge" },
      { name: "MS Word", level: "Working Knowledge" },
      { name: "MS PowerPoint", level: "Working Knowledge" },
      { name: "Tally ERP 9", level: "Basic" },
      { name: "Basic ERP Systems", level: "Basic" },
    ],
  },
  {
    title: "Administrative Skills",
    items: [
      { name: "Data Entry", level: "Working Knowledge" },
      { name: "Record Maintenance", level: "Working Knowledge" },
      { name: "Documentation Handling", level: "Working Knowledge" },
      { name: "Email Communication", level: "Working Knowledge" },
      { name: "Attendance & Leave Record Management", level: "Basic" },
    ],
  },
  {
    title: "Professional Skills",
    items: [
      { name: "Communication", level: "Working Knowledge" },
      { name: "Time Management", level: "Working Knowledge" },
      { name: "Discipline", level: "Working Knowledge" },
      { name: "Punctuality", level: "Working Knowledge" },
      { name: "Teamwork", level: "Working Knowledge" },
      { name: "Willingness to Learn", level: "Working Knowledge" },
    ],
  },
];

const INTEREST_AREAS = [
  {
    title: "Accounting",
    desc: "Interest in accounting entries, records and financial documentation.",
    Icon: IconLedger,
  },
  {
    title: "Finance",
    desc: "Interest in financial concepts, business finance and financial operations.",
    Icon: IconFinance,
  },
  {
    title: "Business Operations",
    desc: "Interest in supporting efficient day-to-day business processes.",
    Icon: IconOps,
  },
  {
    title: "ERP Systems",
    desc: "Basic understanding of ERP-based business operations and workflows.",
    Icon: IconErp,
  },
  {
    title: "Data & Documentation",
    desc: "Comfortable with data entry, record maintenance and documentation.",
    Icon: IconData,
  },
  {
    title: "Administration",
    desc: "Interest in organized administrative and operational support.",
    Icon: IconAdmin,
  },
];

const CERTIFICATIONS = [
  { title: "MS Office", meta: "Excel, Word & PowerPoint" },
  { title: "Tally ERP 9", meta: "Beginner Level" },
  { title: "Basics of ERP Systems", meta: "Udemy — Beginner Level" },
  { title: "Stock Marketing", meta: "Beginner Level" },
];

const RESPONSIBILITIES = [
  "Maintained employee records and HR documentation",
  "Supported attendance tracking and leave records",
  "Coordinated interview scheduling",
  "Supported internal communication",
  "Assisted workforce planning and coordination",
  "Supported PMS activities",
  "Assisted with 5S audit documentation",
];

const STRENGTHS = [
  { title: "Communication", desc: "Able to communicate clearly and work effectively with others." },
  { title: "Time Management", desc: "Able to organize tasks and manage responsibilities systematically." },
  { title: "Discipline", desc: "Committed to maintaining professional standards and completing assigned responsibilities." },
  { title: "Teamwork", desc: "Comfortable working collaboratively in a team environment." },
  { title: "Punctuality", desc: "Values timely completion of tasks and professional commitments." },
  { title: "Willingness to Learn", desc: "Motivated to learn new accounting, finance and business tools." },
];

const LANGUAGES = [
  { name: "Tamil", note: "Speak · Read · Write" },
  { name: "English", note: "Speak · Read · Write" },
];

/* ------------------------------- Reveal hook ------------------------------- */

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(node);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return [ref, visible];
}

function Reveal({ as: Tag = "div", className = "", children, ...rest }) {
  const [ref, visible] = useReveal();
  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/* --------------------------------- Layout ---------------------------------- */

function useScrollSpy(ids) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}

function NavBar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const activeId = useScrollSpy(NAV_LINKS.map((l) => l.id));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = (id) => (e) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <header className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
      <div className="nav__inner">
        <a href="#home" className="nav__brand" onClick={handleClick("home")}>
          JANANI J
        </a>

        <nav className="nav__links nav__links--desktop" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={handleClick(link.id)}
              className={`nav__link ${
                activeId === link.id ? "nav__link--active" : ""
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a className="btn btn--ghost nav__cta" href={resumeUrl} download="Janani_J_Resume.pdf">
          Download Resume
        </a>

        <button
          className="nav__toggle"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <IconClose width={22} height={22} /> : <IconMenu width={22} height={22} />}
        </button>
      </div>

      <div className={`nav__mobile ${open ? "nav__mobile--open" : ""}`}>
        {NAV_LINKS.map((link) => (
          <a
            key={link.id}
            href={`#${link.id}`}
            onClick={handleClick(link.id)}
            className={`nav__mobile-link ${
              activeId === link.id ? "nav__link--active" : ""
            }`}
          >
            {link.label}
          </a>
        ))}
        <a className="btn btn--primary nav__mobile-cta" href={resumeUrl} download="Janani_J_Resume.pdf">
          Download Resume
        </a>
      </div>
    </header>
  );
}

/* -------------------------------- Sections --------------------------------- */

function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero__grid container">
        <Reveal className="hero__copy">
          <p className="eyebrow">B.Com · Accounting &amp; Finance</p>
          <h1 className="hero__name">Janani J</h1>
          <p className="hero__role">B.Com (Accounting &amp; Finance) Graduate</p>
          <p className="hero__desc">
            Commerce graduate with a strong interest in accounting, finance,
            business operations and administrative processes, with practical
            exposure to HR operations and experience using MS Office, Tally
            ERP and basic ERP systems.
          </p>
          <div className="hero__actions">
            <a
              href="#skills"
              className="btn btn--primary"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              View My Profile
            </a>
            <a
              href="#contact"
              className="btn btn--outline"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Contact Me
            </a>
          </div>
        </Reveal>

        <Reveal className="hero__panel" as="div">
          <div className="ledger-card" role="group" aria-label="Profile summary">
            <div className="ledger-card__row">
              <span className="ledger-card__label">Qualification</span>
              <span className="ledger-card__value">B.Com (Accounting &amp; Finance)</span>
            </div>
            <div className="ledger-card__rule" />
            <div className="ledger-card__row">
              <span className="ledger-card__label">Aggregate</span>
              <span className="ledger-card__value ledger-card__value--figure">87%</span>
            </div>
            <div className="ledger-card__rule" />
            <div className="ledger-card__row">
              <span className="ledger-card__label">Location</span>
              <span className="ledger-card__value">Chennai</span>
            </div>
            <div className="ledger-card__rule" />
            <div className="ledger-card__row">
              <span className="ledger-card__label">Focus Area</span>
              <span className="ledger-card__value">Accounting &amp; Finance</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="section">
      <div className="container">
        <Reveal>
          <p className="eyebrow">About</p>
          <h2 className="section__title">About Me</h2>
        </Reveal>

        <div className="about__grid">
          <Reveal className="about__text">
            <p>
              I am a B.Com (Accounting &amp; Finance) graduate with an interest
              in accounting, finance, business operations and administrative
              processes. I have developed practical knowledge of MS Excel,
              Tally ERP, MS Word, PowerPoint and basic ERP systems. Through my
              internship experience, I gained hands-on exposure to maintaining
              records, documentation, coordination and day-to-day
              organizational operations. I am a disciplined, organized and
              willing-to-learn professional looking to begin and grow my
              career in a professional business environment.
            </p>
          </Reveal>

          <Reveal className="focus-card" as="div">
            <h3 className="focus-card__title">Career Focus</h3>
            <ul className="focus-card__list">
              <li>Accounting</li>
              <li>Finance</li>
              <li>Business Operations</li>
              <li>Administration</li>
              <li>ERP &amp; Documentation</li>
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Education() {
  return (
    <section id="education" className="section section--muted">
      <div className="container">
        <Reveal>
          <p className="eyebrow">Education</p>
          <h2 className="section__title">Education</h2>
        </Reveal>

        <div className="timeline">
          <Reveal className="timeline__item" as="div">
            <div className="timeline__marker" />
            <div className="timeline__card">
              <div className="timeline__head">
                <h3>B.Com — Accounting &amp; Finance</h3>
                <span className="badge badge--green">Completed</span>
              </div>
              <p className="timeline__meta">
                Anna Adarsh College for Women, Chennai
              </p>
              <p className="timeline__figure">87%</p>
            </div>
          </Reveal>

          <Reveal className="timeline__item" as="div">
            <div className="timeline__marker" />
            <div className="timeline__card">
              <div className="timeline__head">
                <h3>Higher Secondary</h3>
                <span className="badge">2023</span>
              </div>
              <p className="timeline__meta">
                Alpha Matriculation Higher Secondary School, Chennai
              </p>
              <p className="timeline__figure">93%</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="section">
      <div className="container">
        <Reveal>
          <p className="eyebrow">Capabilities</p>
          <h2 className="section__title">Professional Skills</h2>
        </Reveal>

        <div className="skills__grid">
          {SKILL_GROUPS.map((group) => (
            <Reveal className="skills__card" key={group.title} as="div">
              <h3 className="skills__group-title">{group.title}</h3>
              <ul className="skills__list">
                {group.items.map((item) => (
                  <li key={item.name} className="skills__item">
                    <span>{item.name}</span>
                    <span className="chip">{item.level}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function AreasOfInterest() {
  return (
    <section id="focus" className="section section--muted">
      <div className="container">
        <Reveal>
          <p className="eyebrow">Focus</p>
          <h2 className="section__title">Areas of Interest</h2>
        </Reveal>

        <div className="cards-grid cards-grid--six">
          {INTEREST_AREAS.map(({ title, desc, Icon: ItemIcon }) => (
            <Reveal className="info-card" key={title} as="div">
              <ItemIcon className="info-card__icon" width={26} height={26} />
              <h3>{title}</h3>
              <p>{desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Certifications() {
  return (
    <section id="certifications" className="section">
      <div className="container">
        <Reveal>
          <p className="eyebrow">Learning</p>
          <h2 className="section__title">Certifications &amp; Courses</h2>
        </Reveal>

        <div className="cards-grid cards-grid--four">
          {CERTIFICATIONS.map((cert) => (
            <Reveal className="cert-card" key={cert.title} as="div">
              <h3>{cert.title}</h3>
              <p>{cert.meta}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="section section--muted">
      <div className="container">
        <Reveal>
          <p className="eyebrow">Experience</p>
          <h2 className="section__title">Internship Experience</h2>
        </Reveal>

        <Reveal className="experience-card" as="div">
          <div className="experience-card__head">
            <div>
              <h3>Metal Forms Private Limited</h3>
              <p className="experience-card__role">HR / Administrative Intern</p>
            </div>
          </div>
          <p className="experience-card__desc">
            Completed an internship at Metal Forms Private Limited, gaining
            practical exposure to HR operations, administrative support,
            documentation and workforce coordination.
          </p>
          <ul className="experience-card__list">
            {RESPONSIBILITIES.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

function Strengths() {
  return (
    <section id="strengths" className="section">
      <div className="container">
        <Reveal>
          <p className="eyebrow">Attributes</p>
          <h2 className="section__title">Professional Strengths</h2>
        </Reveal>

        <div className="cards-grid cards-grid--six">
          {STRENGTHS.map((s) => (
            <Reveal className="info-card info-card--plain" key={s.title} as="div">
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function InterestsLanguages() {
  return (
    <section id="personal" className="section section--muted">
      <div className="container personal__grid">
        <Reveal className="personal__block" as="div">
          <p className="eyebrow">Personal</p>
          <h2 className="section__title section__title--sm">Interests</h2>
          <ul className="tag-list">
            <li>Reading Books</li>
            <li>Planting Saplings</li>
            <li>Walking</li>
          </ul>
        </Reveal>

        <Reveal className="personal__block" as="div">
          <p className="eyebrow">Languages</p>
          <h2 className="section__title section__title--sm">Languages</h2>
          <div className="languages">
            {LANGUAGES.map((lang) => (
              <div className="language-card" key={lang.name}>
                <span className="language-card__name">{lang.name}</span>
                <span className="language-card__note">{lang.note}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function CareerObjective() {
  return (
    <section id="objective" className="section objective">
      <div className="container objective__inner">
        <Reveal>
          <p className="eyebrow">Vision</p>
          <h2 className="section__title">Career Objective</h2>
          <p className="objective__text">
            To begin and build a professional career in accounting, finance,
            business operations or administration, where I can apply my
            commerce education, organizational skills and practical
            experience while continuously developing my professional
            knowledge.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="section section--dark">
      <div className="container">
        <Reveal>
          <p className="eyebrow eyebrow--light">Contact</p>
          <h2 className="section__title section__title--light">Let&apos;s Connect</h2>
          <p className="contact__intro">
            I am open to entry-level opportunities, internships and
            professional roles in accounting, finance, business operations
            and administration.
          </p>
        </Reveal>

        <Reveal className="contact__grid" as="div">
          <a className="contact__item" href="mailto:jananij12345@gmail.com">
            <IconMail width={20} height={20} />
            <span>jananij12345@gmail.com</span>
          </a>
          <a className="contact__item" href="tel:+917200052411">
            <IconPhone width={20} height={20} />
            <span>7200052411</span>
          </a>
          <a
            className="contact__item"
            href="https://www.linkedin.com/in/janani-j-77a653278"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconLinkedIn width={20} height={20} />
            <span>LinkedIn Profile</span>
          </a>
        </Reveal>

        <Reveal as="div">
          <a
            className="btn btn--primary"
            href="https://www.linkedin.com/in/janani-j-77a653278"
            target="_blank"
            rel="noopener noreferrer"
          >
            Connect on LinkedIn
          </a>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div>
          <p className="footer__name">Janani J</p>
          <p className="footer__role">B.Com (Accounting &amp; Finance)</p>
        </div>
        <div className="footer__links">
          <a
            href="https://www.linkedin.com/in/janani-j-77a653278"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <a href="mailto:jananij12345@gmail.com">Email</a>
          <a href="tel:+917200052411">Phone</a>
        </div>
      </div>
      <p className="footer__copy">© 2026 Janani J. All rights reserved.</p>
    </footer>
  );
}

/* ---------------------------------- Styles ---------------------------------- */

const Styles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@500;600&display=swap');

    :root {
      --navy: #0F1E33;
      --navy-2: #16283F;
      --white: #FFFFFF;
      --gray-bg: #F4F6F8;
      --gray-border: #E2E6EA;
      --slate: #4B5563;
      --slate-light: #6B7280;
      --blue: #2F5D8A;
      --green: #3F7D58;
      --radius: 10px;
      --max-width: 1120px;
      --shadow-sm: 0 1px 2px rgba(15, 30, 51, 0.06);
    }

    * { box-sizing: border-box; }
    html { scroll-behavior: smooth; }
    body, html, #root { margin: 0; padding: 0; }

    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      color: var(--navy);
      background: var(--white);
      -webkit-font-smoothing: antialiased;
    }

    .portfolio-root h1, .portfolio-root h2, .portfolio-root h3 {
      font-family:'Outfit', sans-serif;
      color: var(--navy);
      margin: 0;
      letter-spacing: -0.01em;
    }

    .portfolio-root p { margin: 0; }
    .portfolio-root ul { margin: 0; padding: 0; list-style: none; }

    /* FIX: this used to be ".portfolio-root a { color: inherit; ... }" which has
       higher specificity (class+tag) than single-class rules like .btn--primary
       or .contact__item, so it was silently overriding their explicit white
       text color -> navy text on navy backgrounds (invisible). Scoping this to
       the bare element keeps specificity LOW so component classes win. */
    a { color: inherit; text-decoration: none; }

    .container {
      max-width: var(--max-width);
      margin: 0 auto;
      padding: 0 24px;
    }

    .eyebrow {
      font-family: 'IBM Plex Mono', monospace;
      font-size: 12px;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: var(--green);
      margin: 0 0 10px;
    }
    .eyebrow--light { color: #7FD3A3; }

    /* Reveal animation */
    .reveal {
      opacity: 0;
      transform: translateY(16px);
      transition: opacity 0.6s ease, transform 0.6s ease;
    }
    .reveal.is-visible { opacity: 1; transform: translateY(0); }
    @media (prefers-reduced-motion: reduce) {
      .reveal { transition: none; opacity: 1; transform: none; }
    }

    /* Buttons */
    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 12px 22px;
      border-radius: 6px;
      font-weight: 600;
      font-size: 14.5px;
      border: 1px solid transparent;
      cursor: pointer;
      transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease, transform 0.15s ease;
    }
    .btn:focus-visible { outline: 2px solid var(--blue); outline-offset: 3px; }
    .btn--primary { background: var(--navy); color: var(--white); }
    .btn--primary:hover { background: var(--navy-2); transform: translateY(-1px); }
    .btn--outline { background: transparent; color: var(--navy); border-color: var(--navy); }
    .btn--outline:hover { background: var(--navy); color: var(--white); }
    .btn--ghost { background: transparent; color: var(--navy); border-color: var(--gray-border); }
    .btn--ghost:hover { border-color: var(--navy); }

    /* Nav */
    .nav {
      position: sticky;
      top: 0;
      z-index: 100;
      background: rgba(255,255,255,0.9);
      backdrop-filter: blur(8px);
      border-bottom: 1px solid transparent;
      transition: border-color 0.2s ease, box-shadow 0.2s ease;
    }
    .nav--scrolled { border-bottom-color: var(--gray-border); box-shadow: var(--shadow-sm); }
    .nav__inner {
      max-width: var(--max-width);
      margin: 0 auto;
      padding: 16px 24px;
      display: flex;
      align-items: center;
      gap: 28px;
    }
    .nav__brand {
      font-family: 'Playfair Display', 'Baskerville', 'Georgia', serif;
      font-weight: 600;
      font-size: 20px; /* Slightly larger for serif titles */
      letter-spacing: 0.05em;
      margin-right: auto;
      color: var(--navy);
    }
    .nav__links--desktop { display: flex; gap: 26px; }
    .nav__link {
      position: relative;
      font-size: 14.5px;
      font-weight: 500;
      color: var(--slate);
      padding: 4px 0;
    }
    .nav__link::after {
      content: '';
      position: absolute;
      left: 0; right: 0; bottom: -3px;
      height: 2px;
      background: var(--green);
      transform: scaleX(0);
      transform-origin: left;
      transition: transform 0.2s ease;
    }
    .nav__link:hover { color: var(--navy); }
    .nav__link--active { color: var(--navy); }
    .nav__link--active::after { transform: scaleX(1); }
    .nav__cta { white-space: nowrap; }
    .nav__toggle {
      display: none;
      background: none;
      border: none;
      color: var(--navy);
      cursor: pointer;
      padding: 4px;
    }

    .nav__mobile {
      display: none;
      flex-direction: column;
      gap: 4px;
      padding: 0 24px 18px;
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.25s ease;
    }
    .nav__mobile--open { max-height: 420px; }
    .nav__mobile-link {
      padding: 12px 4px;
      font-size: 15px;
      font-weight: 500;
      color: var(--slate);
      border-bottom: 1px solid var(--gray-border);
    }
    .nav__mobile-cta { margin-top: 12px; width: 100%; }

    @media (max-width: 860px) {
      .nav__links--desktop, .nav__cta { display: none; }
      .nav__toggle { display: inline-flex; }
      .nav__mobile { display: flex; }
    }

    /* Hero */
    .hero { padding: 72px 0 88px; background: var(--white); }
    .hero__grid {
      display: grid;
      grid-template-columns: 1.15fr 0.85fr;
      gap: 56px;
      align-items: center;
    }
    .hero__name {
    font-size: clamp(40px, 6vw, 60px);
    font-weight: 600;
    }
    .hero__role {
      font-size: 18px;
      color: var(--blue);
      font-weight: 500;
      margin-top: 10px;
    }
    .hero__desc {
      margin-top: 20px;
      font-size: 16px;
      line-height: 1.7;
      color: var(--slate);
      max-width: 52ch;
    }
    .hero__actions { display: flex; gap: 14px; margin-top: 30px; flex-wrap: wrap; }

    .ledger-card {
      background: var(--navy);
      border-radius: var(--radius);
      padding: 30px 28px;
      color: var(--white);
      background-image:
        linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px);
      background-size: 100% 28px;
    }
    .ledger-card__row {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      padding: 10px 0;
      gap: 12px;
    }
    .ledger-card__label {
      font-size: 12.5px;
      color: #A9B7C9;
      text-transform: uppercase;
      letter-spacing: 0.08em;
    }
    .ledger-card__value { font-size: 15px; font-weight: 500; text-align: right; color: var(--white); }
    .ledger-card__value--figure {
      font-family: 'IBM Plex Mono', monospace;
      color: #7FD3A3;
      font-size: 18px;
      font-weight: 600;
    }
    .ledger-card__rule { height: 1px; background: rgba(255,255,255,0.12); }

    @media (max-width: 860px) {
      .hero__grid { grid-template-columns: 1fr; gap: 36px; }
      .hero { padding: 48px 0 56px; }
    }

    /* Section base */
    .section { padding: 84px 0; }
    .section--muted { background: var(--gray-bg); }
    .section--dark { background: var(--navy); }
    .section__title { font-size: clamp(26px, 3.4vw, 34px); font-weight: 600; margin-bottom: 40px; }
    .section__title--sm { font-size: 22px; margin-bottom: 20px; }
    .section__title--light { color: var(--white); }

    /* About */
    .about__grid {
      display: grid;
      grid-template-columns: 1.4fr 1fr;
      gap: 48px;
      align-items: start;
    }
    .about__text p { font-size: 16px; line-height: 1.85; color: var(--slate); }
    .focus-card {
      background: var(--white);
      border: 1px solid var(--gray-border);
      border-radius: var(--radius);
      padding: 26px;
      border-top: 3px solid var(--green);
    }
    .focus-card__title { font-size: 16px; margin-bottom: 14px; color: var(--navy); }
    .focus-card__list li {
      padding: 9px 0;
      border-bottom: 1px solid var(--gray-border);
      font-size: 14.5px;
      color: var(--slate);
    }
    .focus-card__list li:last-child { border-bottom: none; }

    @media (max-width: 780px) {
      .about__grid { grid-template-columns: 1fr; }
    }

    /* Timeline */
    .timeline { display: flex; flex-direction: column; gap: 0; position: relative; }
    .timeline__item { display: grid; grid-template-columns: 20px 1fr; gap: 20px; position: relative; padding-bottom: 34px; }
    .timeline__item:last-child { padding-bottom: 0; }
    .timeline__item::before {
      content: '';
      position: absolute;
      left: 9px; top: 24px; bottom: -10px;
      width: 1px;
      background: var(--gray-border);
    }
    .timeline__item:last-child::before { display: none; }
    .timeline__marker {
      width: 19px; height: 19px;
      border-radius: 50%;
      background: var(--white);
      border: 2px solid var(--green);
      margin-top: 4px;
    }
    .timeline__card {
      background: var(--white);
      border: 1px solid var(--gray-border);
      border-radius: var(--radius);
      padding: 22px 24px;
    }
    .timeline__head { display: flex; justify-content: space-between; align-items: center; gap: 12px; flex-wrap: wrap; }
    .timeline__head h3 { font-size: 17px; }
    .timeline__meta { color: var(--slate); font-size: 14.5px; margin-top: 6px; }
    .timeline__figure {
      font-family: 'IBM Plex Mono', monospace;
      color: var(--blue);
      font-weight: 600;
      font-size: 15px;
      margin-top: 10px;
    }
    .badge {
      font-family: 'IBM Plex Mono', monospace;
      font-size: 11.5px;
      padding: 4px 10px;
      border-radius: 20px;
      background: var(--gray-bg);
      color: var(--slate);
      border: 1px solid var(--gray-border);
      white-space: nowrap;
    }
    .badge--green { background: #EAF4EE; color: var(--green); border-color: #CFE7D8; }

    /* Skills */
    .skills__grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 20px;
    }
    .skills__card {
      background: var(--white);
      border: 1px solid var(--gray-border);
      border-radius: var(--radius);
      padding: 22px;
    }
    .skills__group-title {
      font-size: 15px;
      margin-bottom: 14px;
      padding-bottom: 12px;
      border-bottom: 1px solid var(--gray-border);
      color: var(--navy);
    }
    .skills__item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 10px;
      padding: 8px 0;
      font-size: 13.5px;
      color: var(--slate);
    }
    .chip {
      font-family: 'IBM Plex Mono', monospace;
      font-size: 10.5px;
      color: var(--blue);
      background: #EAF0F6;
      border-radius: 20px;
      padding: 3px 8px;
      white-space: nowrap;
    }

    @media (max-width: 980px) {
      .skills__grid { grid-template-columns: repeat(2, 1fr); }
    }
    @media (max-width: 560px) {
      .skills__grid { grid-template-columns: 1fr; }
    }

    /* Cards grids */
    .cards-grid { display: grid; gap: 20px; }
    .cards-grid--six { grid-template-columns: repeat(3, 1fr); }
    .cards-grid--four { grid-template-columns: repeat(4, 1fr); }

    .info-card, .cert-card {
      background: var(--white);
      border: 1px solid var(--gray-border);
      border-radius: var(--radius);
      padding: 24px;
      transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
    }
    .info-card:hover, .cert-card:hover {
      transform: translateY(-3px);
      box-shadow: 0 8px 20px rgba(15,30,51,0.08);
      border-color: #CBD5E1;
    }
    .info-card__icon { color: var(--green); margin-bottom: 14px; }
    .info-card h3, .cert-card h3 { font-size: 16px; margin-bottom: 8px; color: var(--navy); }
    .info-card p, .cert-card p { font-size: 13.5px; color: var(--slate); line-height: 1.6; }
    .info-card--plain { border-top: 3px solid var(--blue); }

    @media (max-width: 980px) {
      .cards-grid--six { grid-template-columns: repeat(2, 1fr); }
      .cards-grid--four { grid-template-columns: repeat(2, 1fr); }
    }
    @media (max-width: 560px) {
      .cards-grid--six, .cards-grid--four { grid-template-columns: 1fr; }
    }

    /* Experience */
    .experience-card {
      background: var(--white);
      border: 1px solid var(--gray-border);
      border-radius: var(--radius);
      padding: 32px;
    }
    .experience-card__head h3 { font-size: 19px; }
    .experience-card__role { color: var(--blue); font-weight: 500; margin-top: 4px; font-size: 14.5px; }
    .experience-card__desc {
      margin-top: 16px;
      color: var(--slate);
      line-height: 1.75;
      font-size: 15px;
      max-width: 70ch;
    }
    .experience-card__list {
      margin-top: 22px;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 10px 24px;
    }
    .experience-card__list li {
      font-size: 14px;
      color: var(--navy);
      padding-left: 18px;
      position: relative;
      line-height: 1.5;
    }
    .experience-card__list li::before {
      content: '';
      position: absolute;
      left: 0; top: 7px;
      width: 6px; height: 6px;
      border-radius: 50%;
      background: var(--green);
    }
    @media (max-width: 640px) {
      .experience-card__list { grid-template-columns: 1fr; }
      .experience-card { padding: 24px; }
    }

    /* Personal / languages */
    .personal__grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 48px;
    }
    .tag-list { display: flex; flex-wrap: wrap; gap: 10px; }
    .tag-list li {
      background: var(--white);
      border: 1px solid var(--gray-border);
      border-radius: 20px;
      padding: 8px 16px;
      font-size: 13.5px;
      color: var(--slate);
    }
    .languages { display: flex; gap: 14px; flex-wrap: wrap; }
    .language-card {
      background: var(--white);
      border: 1px solid var(--gray-border);
      border-radius: var(--radius);
      padding: 16px 22px;
      min-width: 150px;
    }
    .language-card__name { display: block; font-family: 'Fraunces', serif; font-size: 16px; color: var(--navy); }
    .language-card__note { display: block; margin-top: 6px; font-size: 12.5px; color: var(--slate-light); font-family: 'IBM Plex Mono', monospace; }

    @media (max-width: 700px) {
      .personal__grid { grid-template-columns: 1fr; }
    }

    /* Objective */
    .objective { background: var(--white); }
    .objective__inner { max-width: 720px; }
    .objective__text {
      margin-top: 18px;
      font-size: 18px;
      line-height: 1.8;
      color: var(--slate);
    }

    /* Contact */
    .section--dark .eyebrow { color: #7FD3A3; }
    .contact__intro {
      margin-top: 14px;
      color: #C7D2E0;
      font-size: 15.5px;
      max-width: 60ch;
      line-height: 1.7;
    }
    .contact__grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
      margin: 36px 0 34px;
    }
    .contact__item {
      display: flex;
      align-items: center;
      gap: 12px;
      background: rgba(255,255,255,0.05);
      border: 1px solid rgba(255,255,255,0.12);
      border-radius: var(--radius);
      padding: 16px 18px;
      color: var(--white);
      font-size: 14px;
      transition: background 0.2s ease, border-color 0.2s ease;
    }
    .contact__item:hover { background: rgba(255,255,255,0.09); border-color: rgba(255,255,255,0.25); }
    .contact__item svg { color: #7FD3A3; flex-shrink: 0; }

    @media (max-width: 780px) {
      .contact__grid { grid-template-columns: 1fr; }
    }

    /* Footer */
    .footer { background: var(--navy-2); padding: 40px 0 24px; color: #C7D2E0; }
    .footer__inner {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      flex-wrap: wrap;
      gap: 18px;
      padding-bottom: 24px;
      border-bottom: 1px solid rgba(255,255,255,0.1);
    }
    .footer__name { font-family: 'Fraunces', serif; font-size: 18px; color: var(--white); }
    .footer__role { font-size: 13px; margin-top: 4px; color: #93A4BB; }
    .footer__links { display: flex; gap: 20px; }
    .footer__links a { font-size: 13.5px; color: #C7D2E0; }
    .footer__links a:hover { color: var(--white); }
    .footer__copy {
      text-align: center;
      font-size: 12.5px;
      color: #7E8FA6;
      margin-top: 20px;
    }

    /* Focus states for accessibility */
    a:focus-visible, button:focus-visible {
      outline: 2px solid var(--blue);
      outline-offset: 3px;
      border-radius: 4px;
    }
  `}</style>
);

/* ---------------------------------- App ------------------------------------ */

export default function App() {
  useEffect(() => {
    document.title = "Janani J | B.Com Accounting & Finance Graduate";
    const metaDesc = document.querySelector('meta[name="description"]');
    const content =
      "Professional portfolio of Janani J, a B.Com (Accounting & Finance) graduate with skills in accounting, MS Excel, Tally ERP, ERP systems, documentation and business operations.";
    if (metaDesc) {
      metaDesc.setAttribute("content", content);
    } else {
      const tag = document.createElement("meta");
      tag.name = "description";
      tag.content = content;
      document.head.appendChild(tag);
    }
  }, []);

  return (
    <div className="portfolio-root">
      <Styles />
      <NavBar />
      <main>
        <Hero />
        <About />
        <Education />
        <Skills />
        <AreasOfInterest />
        <Certifications />
        <Experience />
        <Strengths />
        <InterestsLanguages />
        <CareerObjective />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
