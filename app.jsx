import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import { Menu, X, ArrowRight, Phone, Mail, MapPin, ChevronRight, CheckCircle2, MessageSquareMore } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// ————————————————————————————————————————————————
// THEME — updated to your palette
const theme = {
  vars: {
    primary: "#008080",      // teal
    secondary: "#C6EAE2",    // mint
    page: "#FFF9F2",         // soft cream
    text: "#000000",         // black
  },
  card: "bg-white/90 backdrop-blur border border-neutral-200",
};

function cx(...xs) { return xs.filter(Boolean).join(" "); }

const pageTransition = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.25 },
};

function ScrollToTop(){
  const { pathname } = useLocation();
  useEffect(()=>{ window.scrollTo(0,0); }, [pathname]);
  return null;
}

// Asset helpers (use .webp files from your zip under /assets)
const ASSETS = {
  logo: "/assets/logo.webp",
  hero: "/assets/hero.webp",
};

const PORTFOLIO = [
  { file: "/assets/portfolio/nuclearforbc.webp", title: "Nuclear for BC" },
  { file: "/assets/portfolio/zuschnittwerk.webp", title: "Zuschnittwerk" },
  { file: "/assets/portfolio/skin-care.webp", title: "Skin Care" },
  { file: "/assets/portfolio/moviglo.webp", title: "Moviglo" },
  { file: "/assets/portfolio/elif-binici.webp", title: "Elif Binici" },
];

function ImageWithFallback({ src, alt, className }){
  const [ok, setOk] = useState(true);
  if (!ok) {
    return <img src={`https://placehold.co/1200x800?text=${encodeURIComponent(alt||"Image")}`} alt={alt} className={className}/>;
  }
  return <img src={src} alt={alt} className={className} onError={()=>setOk(false)}/>;
}

// ————————————————————————————————————————————————
// LAYOUT
function Shell({ children }) {
  return (
    <div style={{ backgroundColor: theme.vars.page, color: theme.vars.text }} className="min-h-screen flex flex-col"> 
      <SiteHeader/>
      <main className="flex-1">{children}</main>
      <SiteFooter/>
    </div>
  );
}

function SiteHeader(){
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-neutral-200/70" style={{ backgroundColor: `${theme.vars.page}E6`, backdropFilter: "blur(8px)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="size-8 rounded-xl" style={{ backgroundImage: `linear-gradient(135deg, ${theme.vars.primary}, ${theme.vars.secondary})` }}/>
          <span className="font-semibold tracking-tight text-lg">Web Sixer</span>
        </Link>
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(l => <NavLink key={l.path} to={l.path} label={l.label} />)}
        </nav>
        <div className="hidden md:flex items-center gap-3">
          <a href="mailto:info@websixer.com" className="text-sm px-3 py-2 rounded-xl border border-neutral-200">info@websixer.com</a>
          <Link to="/contact" className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-2xl text-white" style={{ backgroundColor: theme.vars.primary }}>
            Get a Free Quote <ArrowRight className="size-4"/>
          </Link>
        </div>
        <button onClick={()=>setOpen(!open)} className="md:hidden p-2 rounded-xl border border-neutral-200">
          {open ? <X className="size-5"/> : <Menu className="size-5"/>}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div {...pageTransition} className="md:hidden border-t border-neutral-200">
            <div className="px-4 py-3 grid">
              {NAV_LINKS.map(l => (
                <Link key={l.path} to={l.path} onClick={()=>setOpen(false)} className="px-3 py-2 rounded-xl hover:bg-black/5">{l.label}</Link>
              ))}
              <Link to="/contact" onClick={()=>setOpen(false)} className="mt-2 inline-flex items-center justify-center gap-2 text-sm font-semibold px-4 py-3 rounded-2xl text-white" style={{ backgroundColor: theme.vars.primary }}>
                Get a Free Quote <ArrowRight className="size-4"/>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function NavLink({ to, label }){
  const { pathname } = useLocation();
  const active = pathname === to;
  return (
    <Link to={to} className={cx("px-3 py-2 rounded-xl text-sm font-medium transition", active ? "bg-black text-white" : "hover:bg-black/5")}>{label}</Link>
  );
}

function SiteFooter(){
  return (
    <footer className="border-t border-neutral-200 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2">
            <div className="size-8 rounded-xl" style={{ backgroundImage: `linear-gradient(135deg, ${theme.vars.primary}, ${theme.vars.secondary})` }}/>
            <span className="font-semibold tracking-tight text-lg">Web Sixer</span>
          </div>
          <p className="mt-3 text-sm opacity-80">Web design and development for small businesses, startups, artists, influencers and bloggers.</p>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Company</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/careers">Career</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Services</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/website-design">Website Design</Link></li>
            <li><Link to="/services">Graphic Design</Link></li>
            <li><Link to="/services">Content Writing</Link></li>
            <li><Link to="/services">Software Testing</Link></li>
            <li><Link to="/services">Project Management</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Contact</h4>
          <div className="space-y-1 text-sm">
            <p className="flex items-center gap-2"><Mail className="size-4"/> info@websixer.com</p>
            <p className="flex items-center gap-2"><Phone className="size-4"/> +8801518924188</p>
            <p className="flex items-center gap-2"><MapPin className="size-4"/> Asia • Bangladesh • Chittagong</p>
            <p className="text-xs opacity-70">WhatsApp: wa.me/+8801518924188</p>
          </div>
        </div>
      </div>
      <div className="border-t border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between text-xs opacity-70">
          <p>All Rights Reserved • Designed by Web Sixer • 2025</p>
          <p>Bengali Site</p>
        </div>
      </div>
    </footer>
  );
}

// ————————————————————————————————————————————————
// REUSABLES
function Page({ title, subtitle, children }){
  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-8">
          <h1 className="text-3xl font-extrabold tracking-tight">{title}</h1>
          {subtitle && <p className="mt-2 opacity-80">{subtitle}</p>}
        </header>
        {children}
      </div>
    </section>
  );
}

function Bullet({ children }){
  return <li className="flex items-start gap-2 text-sm"><CheckCircle2 className="size-4 mt-0.5" style={{ color: theme.vars.primary }}/>{children}</li>;
}

function Stat({ k, v }){
  return (
    <div className="p-5 rounded-2xl border border-neutral-200 text-center">
      <div className="text-3xl font-extrabold">{k}</div>
      <div className="text-xs opacity-70">{v}</div>
    </div>
  );
}

function PrimaryButton({ children, to }){
  const Btn = to ? Link : (props)=> <button {...props}/>;
  const props = to ? { to } : { type: "button" };
  return (
    <Btn {...props} className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-white font-semibold hover:opacity-90" style={{ backgroundColor: theme.vars.primary }}>
      {children}
    </Btn>
  );
}

function SecondaryButton({ children, to }){
  const Btn = to ? Link : (props)=> <button {...props}/>;
  const props = to ? { to } : { type: "button" };
  return (
    <Btn {...props} className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl font-semibold border" style={{ borderColor: theme.vars.primary, color: theme.vars.primary }}>
      {children}
    </Btn>
  );
}

function TestimonialsSection(){
  return (
    <section className="py-16 border-t border-neutral-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold">Customer Testimonials</h2>
        <p className="opacity-80 mt-1">Hear what our clients have to say about us!</p>
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t,i)=>(
            <div key={i} className="p-5 rounded-2xl border border-neutral-200">
              <p className="text-sm leading-relaxed">“{t.quote}”</p>
              <div className="mt-3 font-semibold">{t.author}</div>
              <div className="text-xs opacity-70">{t.role}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQSection(){
  return (
    <section className="py-16 border-t border-neutral-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold">Frequently Asked Questions (FAQs)</h2>
        <p className="opacity-80 mt-1">You may have a few questions that need immediate answers. Our consultation is entirely free, and after the consultation, you can decide whether you would like to proceed.</p>
        <div className="mt-6 divide-y divide-neutral-200 rounded-2xl border border-neutral-200">
          {FAQS.map((f,i)=> (
            <details key={i} className="p-5 group">
              <summary className="font-semibold flex items-center justify-between cursor-pointer">
                {f.q}
                <ChevronRight className="size-4 group-open:rotate-90 transition"/>
              </summary>
              {f.a && <p className="mt-2 text-sm opacity-90">{f.a}</p>}
            </details>
          ))}
        </div>
        <div className="mt-6">
          <PrimaryButton to="/contact">Schedule Your Free Consultation <MessageSquareMore className="size-4"/></PrimaryButton>
        </div>
      </div>
    </section>
  );
}

// ————————————————————————————————————————————————
// PAGES
function Home(){
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10" style={{ opacity: 0.25, backgroundImage: `radial-gradient(ellipse at top, ${theme.vars.secondary}, ${theme.vars.page})` }}/>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.h1 initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{duration:0.35}} className="text-4xl md:text-5xl font-extrabold tracking-tight">
                Affordable Web Design • All‑in‑One Solution
              </motion.h1>
              <p className="mt-4 text-lg opacity-90">At Web Sixer, we specialize in building custom websites that are not only visually stunning but also strategically designed to drive business success.</p>
              <div className="mt-6 flex flex-wrap gap-2 text-sm">
                {[
                  "Consultation","Business Plan","UI/UX Design","Figma Design","Website Design","Graphic Design","Content Writing","Web Development","Software Testing","Project Management"
                ].map(x => (
                  <span key={x} className="px-3 py-1 rounded-full border border-neutral-200" style={{ backgroundColor: `${theme.vars.secondary}66` }}>{x}</span>
                ))}
              </div>
              <div className="mt-6 flex items-center gap-3">
                <PrimaryButton to="/contact">Get a Free Quote <ArrowRight className="size-4"/></PrimaryButton>
                <SecondaryButton to="/contact">Contact Us</SecondaryButton>
              </div>
            </div>
            <div>
              <div className="aspect-[16/11] rounded-3xl overflow-hidden shadow-2xl border border-neutral-200">
                <ImageWithFallback src={ASSETS.hero} alt="Web Sixer hero" className="w-full h-full object-cover"/>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OUR SOLUTIONS */}
      <section className="py-16 border-t border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold">Our Solutions • Services We Provide</h2>
          <p className="opacity-80">We offer a full spectrum of solutions to ensure every client secures the perfect fit for their business.</p>
          <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {HOME_SOLUTIONS.map(s => (
              <div key={s.title} className="p-5 rounded-2xl border border-neutral-200">
                <div className="font-semibold">{s.title}</div>
                <ul className="mt-3 space-y-2">
                  {s.items.map(it => <Bullet key={it}>{it}</Bullet>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section className="py-16 border-t border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-bold">Our Completed Projects</h2>
              <p className="opacity-80">End‑to‑end builds from UI/UX and content to full‑stack development & testing.</p>
            </div>
            <Link to="/projects" className="text-sm font-semibold underline">View All Projects</Link>
          </div>
          <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PORTFOLIO.map((p,i)=> (
              <div key={i} className="group border border-neutral-200 rounded-2xl overflow-hidden">
                <ImageWithFallback src={p.file} alt={p.title} className="w-full h-auto group-hover:scale-[1.02] transition"/>
                <div className="p-4 text-sm opacity-80">{p.title}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE HIGHLIGHTS */}
      <section className="py-16 border-t border-neutral-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold">Experience Highlights</h2>
          <ul className="mt-4 grid md:grid-cols-2 gap-3 text-sm">
            {EXPERIENCE_HIGHLIGHTS.map(h => <li key={h} className="p-4 rounded-xl border border-neutral-200">{h}</li>)}
          </ul>
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {STATS.map(s => <Stat key={s.k} k={s.k} v={s.v}/>) }
          </div>
        </div>
      </section>

      <TestimonialsSection/>
      <FAQSection/>

      {/* CONTACT CTA */}
      <section className="py-16 border-t border-neutral-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-bold">We’re here to bring your ideas to life.</h3>
          <p className="opacity-80 mt-1">Let’s build something great together.</p>
          <PrimaryButton to="/contact">Get in Touch <ArrowRight className="size-4"/></PrimaryButton>
        </div>
      </section>
    </>
  );
}

function Services(){
  return (
    <Page title="Services" subtitle="Creative Web Design Bringing Clients' Brands to Life Online">
      <p className="opacity-90">With top web designers in Bangladesh, Web Sixer delivers high‑quality, creative solutions including website design, graphics, branding and more for clients globally.</p>
      <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SERVICE_BLOCKS.map(s => (
          <div key={s.title} className="p-6 rounded-2xl border border-neutral-200">
            <div className="font-semibold text-lg">{s.title}</div>
            <p className="text-sm opacity-80 mt-1">{s.desc}</p>
            <ul className="mt-3 space-y-2">{s.points.map(p => <Bullet key={p}>{p}</Bullet>)}</ul>
            <Link to={s.ctaTo} className="mt-4 inline-flex items-center gap-1 text-sm font-semibold underline">{s.cta}</Link>
          </div>
        ))}
      </div>

      <section className="mt-12 grid md:grid-cols-3 gap-6">
        {KEY_VALUES.map(k => (
          <div key={k.heading} className="p-6 rounded-2xl border border-neutral-200">
            <div className="font-semibold">{k.heading}</div>
            <p className="text-sm opacity-80 mt-1">{k.copy}</p>
          </div>
        ))}
      </section>

      <div className="mt-10 p-6 rounded-2xl border border-neutral-200" style={{ backgroundImage: `linear-gradient(135deg, ${theme.vars.secondary}, ${theme.vars.page})` }}>
        <h3 className="font-semibold text-lg">Get an obligation free quote in 60 seconds</h3>
        <PrimaryButton to="/contact">Get Quote <ArrowRight className="size-4"/></PrimaryButton>
      </div>
    </Page>
  );
}

function WebsiteDesign(){
  return (
    <Page title="Website Design" subtitle="Let's turn your business into a revenue generating asset">
      <p className="opacity-90">We build websites that not only look great but also drive results. We focus on creating sites that turn visitors into customers and help your business grow.</p>
      <div className="mt-6 flex gap-3">
        <PrimaryButton to="/contact">Get Started <ArrowRight className="size-4"/></PrimaryButton>
        <SecondaryButton to="/projects">Projects</SecondaryButton>
      </div>
      <section className="mt-10">
        <h3 className="font-semibold">For Over Five Years, I Have Supported Companies Across Various Industries & Countries.</h3>
        <p className="text-sm opacity-80">I love working at the intersection of creativity and user friendly interfaces.</p>
      </section>
      <FAQSection/>
      <TestimonialsSection/>
    </Page>
  );
}

function FAQPage(){
  return (
    <Page title="Frequently Asked Questions" subtitle="Your query—quick answers to common questions">
      <FAQSection/>
      <ContactMini/>
    </Page>
  );
}

function About(){
  return (
    <Page title="About" subtitle="Web Sixer Is All About Your Success">
      <div className="prose max-w-none">
        <p>Web Sixer is a creative team based in Asia. We design and develop digital solutions for global clients. Our team includes web designers, developers, & strategists. We’ve completed 200+ projects & served 60+ happy clients. Our focus areas include WordPress, design, testing, & content. We work with startups, small businesses, influencers, bloggers. Our digital experiences deliver real results that generates more revenue.</p>
      </div>
      <div className="mt-8 grid md:grid-cols-2 gap-3">
        {EXPERIENCE_HIGHLIGHTS.map(h => <div key={h} className="p-4 rounded-xl border border-neutral-200">{h}</div>)}
      </div>
      <section className="mt-10">
        <h3 className="text-lg font-semibold">What We Offer</h3>
        <div className="mt-4 grid md:grid-cols-2 gap-6">
          {ABOUT_OFFERS.map(o => (
            <div key={o.title} className="p-5 rounded-2xl border border-neutral-200">
              <div className="font-semibold">{o.title}</div>
              <p className="text-sm opacity-80 mt-1">{o.copy}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="mt-10 grid md:grid-cols-3 gap-6">
        {KEY_AREAS.map(k => (
          <div key={k.title} className="p-5 rounded-2xl border border-neutral-200">
            <div className="font-semibold">{k.title}</div>
            <p className="text-sm opacity-80 mt-1">{k.copy}</p>
          </div>
        ))}
      </section>
      <ContactMini/>
    </Page>
  );
}

function ContactMini(){
  return (
    <div className="mt-10 p-6 rounded-2xl border border-neutral-200">
      <h3 className="font-semibold">Contact Us</h3>
      <div className="text-sm mt-2 grid sm:grid-cols-2 gap-3">
        <p><strong>Email:</strong> info@websixer.com</p>
        <p><strong>Phone:</strong> +8801518924188</p>
        <p className="sm:col-span-2"><strong>WhatsApp:</strong> wa.me/+8801518924188</p>
      </div>
      <SecondaryButton to="/contact">Get a Free Quote</SecondaryButton>
    </div>
  );
}

function Contact(){
  return (
    <Page title="Contact" subtitle="Get in Touch — If you have any question, feel free to contact with us anytime">
      <div className="grid md:grid-cols-2 gap-8">
        <form className="grid gap-4">
          <div className="grid gap-2">
            <label className="text-sm font-medium">Name</label>
            <input className="px-3 py-2 rounded-xl border border-neutral-300 focus:outline-none focus:ring-4" style={{ boxShadow: `0 0 0 4px ${theme.vars.secondary}55` }} placeholder="Enter Your Name" defaultValue=""/>
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-medium">Email</label>
            <input type="email" className="px-3 py-2 rounded-xl border border-neutral-300 focus:outline-none focus:ring-4" style={{ boxShadow: `0 0 0 4px ${theme.vars.secondary}55` }} placeholder="Enter Your Email" defaultValue=""/>
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-medium">Message</label>
            <textarea rows={6} className="px-3 py-2 rounded-xl border border-neutral-300 focus:outline-none focus:ring-4" style={{ boxShadow: `0 0 0 4px ${theme.vars.secondary}55` }} placeholder="Tell us what kind of website you need..."/>
          </div>
          <PrimaryButton>Send Message <ArrowRight className="size-4"/></PrimaryButton>
          <p className="text-xs opacity-70">This demo does not submit yet.</p>
        </form>
        <div className="grid gap-4 content-start">
          <div className="p-5 rounded-2xl border border-neutral-200">
            <h3 className="font-semibold">Contact Details</h3>
            <p className="text-sm mt-2"><Mail className="inline size-4 mr-2"/> info@websixer.com</p>
            <p className="text-sm"><Phone className="inline size-4 mr-2"/> +8801518924188</p>
            <p className="text-sm">WhatsApp: wa.me/+8801518924188</p>
            <p className="text-sm">Facebook • Linkedin • Whatsapp</p>
          </div>
          <div className="p-5 rounded-2xl border border-neutral-200">
            <h3 className="font-semibold">Let’s grow together</h3>
            <p className="text-sm">New ideas. Fresh designs.</p>
          </div>
        </div>
      </div>
    </Page>
  );
}

function Projects(){
  return (
    <Page title="Projects" subtitle="A rotating selection of recent work">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PORTFOLIO.map((p,i)=> (
          <div key={i} className="group border border-neutral-200 rounded-2xl overflow-hidden">
            <ImageWithFallback src={p.file} alt={p.title} className="w-full h-auto group-hover:scale-[1.02] transition"/>
            <div className="p-4">
              <div className="font-semibold truncate">{p.title}</div>
              <div className="text-sm opacity-70">Custom build • WordPress</div>
            </div>
          </div>
        ))}
      </div>
    </Page>
  );
}

function NotFound(){
  return (
    <Page title="Page not found" subtitle="The page you’re looking for doesn’t exist">
      <SecondaryButton to="/">Go Home</SecondaryButton>
    </Page>
  );
}

// ————————————————————————————————————————————————
// DATA
const NAV_LINKS = [
  { path: "/", label: "Home" },
  { path: "/services", label: "Services" },
  { path: "/website-design", label: "Website Design" },
  { path: "/faq", label: "FAQ" },
  { path: "/about", label: "About" },
  { path: "/contact", label: "Contact" },
];

const HOME_SOLUTIONS = [
  { title: "Business Plan", items: ["Business Model Definition","Market Research","Revenue Strategy"]},
  { title: "UI/UX Design", items: ["Figma Design","Wireframing","Prototyping"]},
  { title: "Website Design", items: ["Mobile Optimization","Responsive Design","Custom Layouts"]},
  { title: "Graphic Design", items: ["Marketing Materials","Logo Design","Branding"]},
  { title: "Content Writing", items: ["Web Content","Blog Writing","Copywriting"]},
  { title: "Web Development", items: ["Frontend Development","Backend Development","CMS Integration"]},
  { title: "Software Testing", items: ["Functional Testing","Usability Testing","Bug Fixing"]},
  { title: "Project Management", items: ["Project Planning","Task Scheduling","Monitoring"]},
];

const EXPERIENCE_HIGHLIGHTS = [
  "We build custom WordPress sites that are both beautiful and built for performance.",
  "Our software testing ensures your product is reliable & bug‑free from day one.",
  "From new builds to upgrades, we manage every detail with care.",
  "Delivered 200+ successful projects with a 100% success rate.",
  "Trusted by 60+ happy clients across various industries.",
  "Focused on smart, user‑friendly digital solutions.",
  "We turn ideas into powerful web experiences.",
];

const STATS = [
  { k: "0+", v: "Completed Projects" },
  { k: "0+", v: "Website Design" },
  { k: "0+", v: "Software Testing" },
  { k: "0%", v: "Success Rate" },
  { k: "0+", v: "Graphic Design" },
  { k: "0+", v: "Figma Design" },
  { k: "0+", v: "Content Writing" },
  { k: "0+", v: "Satisfied Clients" },
];

const TESTIMONIALS = [
  { quote: "Crafts lightweight, high-performance Android micro apps that offer a seamless user experience.", author: "Md Rahman", role: "Android Developer" },
  { quote: "Produces responsive, modern websites using HTML, CSS, and PHP that are as visually appealing as they are functional.", author: "Md Kader", role: "Coach" },
  { quote: "Consistently recognized for outstanding performance and dedication, exemplifying commitment to quality.", author: "Md Toukir", role: "CEO" },
  { quote: "Played a vital role in the development of the Nuclear for BC website, combining creativity with technical precision.", author: "Ivan Syreyshchikov", role: "Director" },
  { quote: "Delivers exceptional results by combining technical expertise with innovative design.", author: "Ahmed", role: "Instructor" },
  { quote: "Attention to detail in software testing is second to none. Issues are identified with precision and resolved thoroughly.", author: "Dalia Dubrovskaya", role: "Trainer" },
];

const FAQS = [
  { q: "What types of websites do you create?", a: "We specialize in custom websites for various industries—e‑commerce, corporate, portfolios, blogs, and more—tailored to your goals." },
  { q: "How long does it take to build a website?", a: null },
  { q: "Can I update my website myself after it's built?", a: null },
  { q: "Do you provide hosting and domain registration?", a: null },
  { q: "Will my website be mobile-friendly?", a: null },
  { q: "What if I need changes or updates after my website is live?", a: null },
  { q: "How do you ensure my website is SEO-friendly?", a: null },
  { q: "What is the cost of building a website?", a: null },
  { q: "Can you help with branding and graphic design?", a: null },
  { q: "How can I get started?", a: null },
];

const SERVICE_BLOCKS = [
  { title: "Web Design", desc: "We craft custom WordPress websites optimized for your industry, target audience and business goals.", points: ["Responsive layouts","Conversion‑ready pages","Speed best practices"], cta:"View Projects", ctaTo: "/projects" },
  { title: "Software Testing", desc: "Quality assurance to ship confidently.", points: ["Functional/Usability","Cross‑device","Bug reporting"], cta:"View Projects", ctaTo: "/projects" },
  { title: "Project Management", desc: "Plan, schedule, and monitor successful delivery.", points: ["Project planning","Task scheduling","Monitoring"], cta:"View Projects", ctaTo: "/projects" },
  { title: "Graphic Design", desc: "From logos and branding to marketing materials.", points: ["Logos & branding","Marketing materials","Social graphics"], cta:"See Portfolio", ctaTo: "/projects" },
  { title: "Special Request", desc: "Social media management and engaging content.", points: ["Community building","Content creation","Conversion focus"], cta:"Learn More", ctaTo: "/contact" },
  { title: "Custom Branding", desc: "Design for the visionary who desires to stand out.", points: ["Unique design","Custom development","Fast launch"], cta:"Get Quote", ctaTo: "/contact" },
];

const KEY_VALUES = [
  { heading: "Design • Unique", copy: "We specialize in the creative and the technical to make you remarkable." },
  { heading: "Development • Custom", copy: "Tailored builds that support your goals and scale with you." },
  { heading: "Launch • Fast site", copy: "Performance‑minded rollout with QA." },
  { heading: "Optimize • SEO Friendly", copy: "Foundations that help search engines understand your site." },
  { heading: "Responsive • All devices", copy: "Beautiful experiences from mobile to desktop." },
  { heading: "Affordable • Great value", copy: "Transparent pricing, strong ROI." },
];

const ABOUT_OFFERS = [
  { title: "Custom Website Design", copy: "Visually appealing, responsive sites tailored to your brand and goals." },
  { title: "Software & App Testing", copy: "Rigorous QA to identify bugs, optimize performance, and improve UX." },
  { title: "Graphic & Branding Solutions", copy: "From logos to full identity kits to elevate your presence." },
  { title: "Content & Media Production", copy: "Scroll‑stopping content: video editing, voice overs, social graphics." },
];

const KEY_AREAS = [
  { title: "Design", copy: "Crafting aesthetics that make lasting impressions." },
  { title: "Development", copy: "Building robust sites to support your goals." },
  { title: "Marketing", copy: "Strategies to attract and retain ideal customers." },
  { title: "SEO", copy: "Optimizing sites for search engine visibility." },
  { title: "Support", copy: "Ongoing maintenance to sustain success." },
];

// ————————————————————————————————————————————————
// ROUTES
function RoutesView(){
  return (
    <AnimatePresence mode="wait">
      <motion.div key={useLocation().pathname} {...pageTransition}>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/services" element={<Services/>} />
          <Route path="/website-design" element={<WebsiteDesign/>} />
          <Route path="/projects" element={<Projects/>} />
          <Route path="/faq" element={<FAQPage/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/contact" element={<Contact/>} />
          <Route path="*" element={<NotFound/>} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

export default function App(){
  return (
    <Router>
      <ScrollToTop/>
      <Shell>
        <RoutesView/>
      </Shell>
    </Router>
  );
}
