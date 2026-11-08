import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, CircuitBoard, Mail, Menu } from "lucide-react";
import { Manrope, Space_Grotesk } from "next/font/google";
import "./globals.css";

const bodyFont = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const displayFont = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const navigation = [
  { label: "Services", href: "#services" },
  { label: "Hardware Repair Tracker", href: "#tracker" },
  { label: "Project Estimator", href: "#estimator" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export const metadata: Metadata = {
  title: "Novatren Technologies | Engineering What’s Next",
  description:
    "Technology services, hardware repair, and digital product engineering from Novatren Technologies.",
};

function NavigationLinks({ mobile = false }: { mobile?: boolean }) {
  return (
    <div className={mobile ? "mobile-nav-links" : "desktop-nav-links"}>
      {navigation.map((item) => (
        <Link key={item.href} href={item.href}>
          {item.label}
        </Link>
      ))}
    </div>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const year = new Date().getFullYear();

  return (
    <html lang="en">
      <body className={`${bodyFont.variable} ${displayFont.variable}`}>
        <header className="site-header">
          <div className="page-shell header-inner">
            <Link className="brand-lockup" href="#top" aria-label="Novatren Technologies home">
              <span className="brand-mark">
                <CircuitBoard aria-hidden="true" size={22} strokeWidth={1.8} />
              </span>
              <span className="brand-name">
                <strong>NOVATREN</strong>
                <span>TECHNOLOGIES</span>
              </span>
            </Link>

            <nav className="desktop-nav" aria-label="Main navigation">
              <NavigationLinks />
            </nav>

            <Link className="header-contact" href="#contact">
              Start a conversation <ArrowUpRight aria-hidden="true" size={16} />
            </Link>

            <details className="mobile-nav">
              <summary aria-label="Open navigation menu">
                <Menu aria-hidden="true" size={21} />
              </summary>
              <nav aria-label="Mobile navigation">
                <NavigationLinks mobile />
              </nav>
            </details>
          </div>
        </header>

        {children}

        <footer className="site-footer" id="contact">
          <div className="page-shell footer-main">
            <div className="footer-brand">
              <Link className="brand-lockup" href="#top" aria-label="Novatren Technologies home">
                <span className="brand-mark">
                  <CircuitBoard aria-hidden="true" size={22} strokeWidth={1.8} />
                </span>
                <span className="brand-name">
                  <strong>NOVATREN</strong>
                  <span>TECHNOLOGIES</span>
                </span>
              </Link>
              <p>Technology, thoughtfully engineered for what comes next.</p>
            </div>
            <div className="footer-contact">
              <span className="footer-label">Talk with our team</span>
              <a href="mailto:hello@novatren.tech">
                <Mail aria-hidden="true" size={16} />
                hello@novatren.tech
                <ArrowUpRight aria-hidden="true" size={15} />
              </a>
            </div>
          </div>
          <div className="page-shell footer-bottom">
            <span>© {year} Novatren Technologies</span>
            <span>Built for a connected world.</span>
          </div>
        </footer>
      </body>
    </html>
  );
}