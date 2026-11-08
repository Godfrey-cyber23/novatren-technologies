import Image from "next/image";
import Link from "next/link";
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  Blocks,
  Cpu,
  Network,
  Wrench,
} from "lucide-react";
import RepairTracker from "@/components/RepairTracker";
import ProjectEstimator from "@/components/ProjectEstimator";

const services = [
  {
    number: "01",
    icon: Blocks,
    title: "Digital products",
    description:
      "Web applications and SaaS platforms designed around the way your business works.",
  },
  {
    number: "02",
    icon: Wrench,
    title: "Hardware repair",
    description:
      "Clear diagnostics, dependable repairs, and updates from intake through pickup.",
  },
  {
    number: "03",
    icon: Network,
    title: "IT infrastructure",
    description:
      "Connected, resilient systems that give your team room to operate and grow.",
  },
];

export default function HomePage() {
  return (
    <main id="top">
      <section className="page-shell hero-section">
        <div className="hero-copy">
          <p className="eyebrow">NOVATREN TECHNOLOGIES / BUILT FOR WHAT&apos;S NEXT</p>
          <h1>
            Make technology
            <span> work harder.</span>
          </h1>
          <p className="hero-description">
            From the device in your hands to the systems behind your business, we
            bring clarity and care to complex technology.
          </p>
          <div className="hero-actions">
            <Link className="action-link" href="#services">
              Explore our services <ArrowRight aria-hidden="true" size={17} />
            </Link>
            <Link className="quiet-link" href="#contact">
              Get in touch <ArrowUpRight aria-hidden="true" size={17} />
            </Link>
          </div>
          <div className="hero-proof">
            <span className="proof-icon">
              <Activity aria-hidden="true" size={17} />
            </span>
            <p>People-first support. Engineering with purpose.</p>
          </div>
        </div>

        <figure className="hero-visual">
          <Image
            src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=85"
            alt="Close-up of a detailed electronic circuit board"
            fill
            priority
            sizes="(max-width: 900px) 100vw, 48vw"
            className="hero-image"
          />
          <div className="visual-shade" />
          <figcaption className="visual-caption">
            <span className="caption-icon"><Cpu aria-hidden="true" size={18} /></span>
            <span>
              <strong>Technology, end to end</strong>
              <small>Hardware · Software · Infrastructure</small>
            </span>
            <span className="caption-index">NT / 01</span>
          </figcaption>
          <span className="visual-marker" aria-hidden="true">N° 01</span>
        </figure>
      </section>

      <section className="section-rule services-section" id="services">
        <div className="page-shell">
          <div className="section-heading">
            <div>
              <p className="eyebrow">WHAT WE DO</p>
              <h2>One partner. <span>More possibilities.</span></h2>
            </div>
            <p className="section-intro">
              Practical expertise across the technology your work depends on.
            </p>
          </div>

          <div className="service-list">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <article className="service-row" key={service.number}>
                  <span className="service-number">{service.number}</span>
                  <span className="service-icon"><Icon aria-hidden="true" size={23} strokeWidth={1.7} /></span>
                  <div className="service-copy">
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                  </div>
                  <ArrowUpRight className="service-arrow" aria-hidden="true" size={20} />
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <RepairTracker />

      <ProjectEstimator />

      <section className="section-rule about-section" id="about">
        <div className="page-shell about-grid">
          <p className="eyebrow">ABOUT NOVATREN</p>
          <div>
            <h2>Good technology should feel like progress.</h2>
            <p>
              We bring careful problem-solving and straightforward communication
              to every engagement, making technology easier to trust and easier to use.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}