import React, { useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import {
  SiGithub,
  SiReact,
  SiDjango,
  SiPython,
  SiC,
  SiGit,
} from "react-icons/si";
import { FaJava, FaLinkedin } from "react-icons/fa";
import { Moon, Sun, Menu, X, ArrowUp, Mail, MapPin, Phone } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import { Button } from "@/components/ui/button";

const navLinks = [
  "Home",
  "About",
  "Skills",
  "Experience",
  "Projects",
  "Certificates",
  "Education",
  "Contact",
];

const Typewriter = ({ texts }: { texts: string[] }) => {
  const [textIndex, setTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(
      () => {
        const currentText = texts[textIndex];
        if (!isDeleting) {
          setDisplayText(currentText.substring(0, displayText.length + 1));
          if (displayText.length === currentText.length) {
            setTimeout(() => setIsDeleting(true), 1500);
          }
        } else {
          setDisplayText(currentText.substring(0, displayText.length - 1));
          if (displayText.length === 0) {
            setIsDeleting(false);
            setTextIndex((prev) => (prev + 1) % texts.length);
          }
        }
      },
      isDeleting ? 50 : 100
    );
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, textIndex, texts]);

  return (
    <span className="text-primary font-mono inline-block min-w-[20px]">
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  );
};

export default function Home() {
  const { theme, setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setIsMenuOpen(false);
    const el = document.getElementById(id.toLowerCase());
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 relative overflow-hidden">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary origin-left z-50"
        style={{ scaleX }}
      />

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <span
              className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary cursor-pointer"
              onClick={() => scrollTo("home")}
              data-testid="logo"
            >
              Devansh Saxena
            </span>

            <div className="hidden md:flex items-center space-x-6">
              {navLinks.map((link) => (
                <button
                  key={link}
                  onClick={() => scrollTo(link)}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  data-testid={`nav-link-${link.toLowerCase()}`}
                >
                  {link}
                </button>
              ))}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                data-testid="theme-toggle"
              >
                {theme === "dark" ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </Button>
            </div>

            <div className="md:hidden flex items-center">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="mr-2"
              >
                {theme === "dark" ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-background/95 backdrop-blur-md border-b border-border">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navLinks.map((link) => (
                <button
                  key={link}
                  onClick={() => scrollTo(link)}
                  className="block w-full text-left px-3 py-2 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-md"
                >
                  {link}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="pt-32 pb-20 min-h-screen flex items-center justify-center relative overflow-hidden"
      >
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/30 rounded-full mix-blend-screen filter blur-[100px] animate-pulse" />
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-secondary/30 rounded-full mix-blend-screen filter blur-[100px] animate-pulse delay-1000" />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-4">
              Hi, I'm{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                Devansh Saxena
              </span>
            </h1>
            <div className="text-xl md:text-3xl font-medium mb-6 h-12">
              <Typewriter
                texts={[
                  "Software Engineer",
                  "Full Stack Developer",
                  "Problem Solver",
                ]}
              />
            </div>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              Motivated B.Tech Information Technology student seeking an
              entry-level opportunity to apply my knowledge of Python, Java, and
              web development. Eager to contribute to real-world projects,
              enhance technical skills, and grow as a software developer in a
              dynamic organization.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <Button
                size="lg"
                onClick={() => scrollTo("projects")}
                className="bg-gradient-to-r from-primary to-secondary text-white border-0"
                data-testid="btn-view-projects"
              >
                View Projects
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => scrollTo("contact")}
                data-testid="btn-contact-me"
              >
                Contact Me
              </Button>
            </div>

            <div className="flex justify-center space-x-6">
              <a
                href="https://github.com/devanshsaxena-sys"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                data-testid="link-github"
              >
                <SiGithub className="h-8 w-8" />
              </a>
              <a
                href="https://www.linkedin.com/in/devansh-saxena-4332a0330"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                data-testid="link-linkedin"
              >
                <FaLinkedin className="h-8 w-8" />
              </a>
              <a
                href="mailto:dhruvsaxena137@gmail.com"
                className="text-muted-foreground hover:text-primary transition-colors"
                data-testid="link-email"
              >
                <Mail className="h-8 w-8" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-8 text-center">About Me</h2>
            <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8 shadow-xl">
              <p className="text-lg leading-relaxed text-card-foreground mb-6">
                I am a B.Tech Information Technology student at Shri Ramswaroop
                Memorial College of Engineering and Management. I am passionate
                about software development, web technologies, and
                problem-solving. I enjoy building practical applications and
                continuously improving my technical skills through projects,
                internships, and hands-on learning experiences.
              </p>
              <div className="flex items-center text-muted-foreground">
                <MapPin className="h-5 w-5 mr-2 text-primary" />
                <span>Lucknow, India</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-12 text-center">Skills</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {/* Languages */}
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 hover:border-primary/50 transition-colors">
                <h3 className="text-xl font-semibold mb-6 flex items-center">
                  <span className="w-8 h-1 bg-primary mr-3 rounded-full"></span>
                  Programming Languages
                </h3>
                <div className="space-y-4">
                  <SkillItem
                    icon={<FaJava className="text-[#5382a1]" />}
                    name="Java"
                    level="Basic to Moderate"
                  />
                  <SkillItem
                    icon={<SiPython className="text-[#3776AB]" />}
                    name="Python"
                    level="Basic"
                  />
                  <SkillItem
                    icon={<SiC className="text-[#A8B9CC]" />}
                    name="C"
                    level="Basic"
                  />
                </div>
              </div>

              {/* Frameworks */}
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 hover:border-primary/50 transition-colors">
                <h3 className="text-xl font-semibold mb-6 flex items-center">
                  <span className="w-8 h-1 bg-secondary mr-3 rounded-full"></span>
                  Frameworks & Tech
                </h3>
                <div className="space-y-4">
                  <SkillItem
                    icon={<SiReact className="text-[#61DAFB]" />}
                    name="React.js"
                    level="Intermediate"
                  />
                  <SkillItem
                    icon={<SiDjango className="text-[#092E20]" />}
                    name="Django REST"
                    level="Intermediate"
                  />
                </div>
              </div>

              {/* Tools */}
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 hover:border-primary/50 transition-colors">
                <h3 className="text-xl font-semibold mb-6 flex items-center">
                  <span className="w-8 h-1 bg-gradient-to-r from-primary to-secondary mr-3 rounded-full"></span>
                  Tools
                </h3>
                <div className="space-y-4">
                  <SkillItem
                    icon={<SiGit className="text-[#F05032]" />}
                    name="Git"
                    level="Intermediate"
                  />
                  <SkillItem
                    icon={<SiGithub className="text-foreground" />}
                    name="GitHub"
                    level="Intermediate"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-12 text-center">Experience</h2>
            <div className="relative border-l border-border/50 ml-4 md:ml-0 md:pl-8 py-4">
              <div className="absolute w-4 h-4 bg-primary rounded-full -left-[8.5px] top-8 md:-left-[8.5px] shadow-[0_0_10px_rgba(56,189,248,0.5)]" />
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 md:p-8 ml-6 md:ml-0 hover:-translate-y-1 transition-transform duration-300">
                <h3 className="text-2xl font-bold text-foreground">
                  Full Stack Developer Trainee (Django)
                </h3>
                <h4 className="text-lg text-primary font-medium mb-4">SRDT</h4>
                <p className="text-muted-foreground leading-relaxed">
                  Worked on full-stack web development concepts using Django and
                  related technologies while gaining practical experience in
                  backend development, API integration, REST APIs, and software
                  development workflows.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-12 text-center">Projects</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl overflow-hidden group cursor-pointer"
              >
                <div className="h-48 bg-gradient-to-br from-primary/20 to-secondary/20 relative overflow-hidden flex items-center justify-center">
                  <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,transparent,black)]" />
                  <h3 className="text-3xl font-bold text-foreground/80 group-hover:scale-110 transition-transform duration-500">
                    Daily Planner
                  </h3>
                </div>
                <div className="p-6 md:p-8">
                  <h3 className="text-2xl font-bold mb-2">Daily Planner</h3>
                  <p className="text-sm text-primary mb-4">Web Application</p>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    A daily planning application designed to help users manage
                    tasks efficiently, improve productivity, organize schedules,
                    and track daily goals through an intuitive interface.
                  </p>
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold mb-2">Technologies:</h4>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                        React.js (Frontend)
                      </span>
                      <span className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-xs font-medium">
                        Django REST (Backend)
                      </span>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold mb-2">Features:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside pl-2">
                      <li>Task Management & Daily Planning</li>
                      <li>Productivity Tracking</li>
                      <li>Clean UI & Efficient Task Organization</li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Certificates & Education */}
      <section id="certificates" className="py-20 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Certificates */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-8">Certificates</h2>
              <div className="space-y-6">
                <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 flex items-start space-x-4 hover:border-primary/50 transition-colors">
                  <div className="p-3 bg-primary/10 rounded-lg text-primary">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">
                      Mobile Application Development Completion
                    </h3>
                    <p className="text-muted-foreground text-sm">Internship</p>
                  </div>
                </div>
                <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 flex items-start space-x-4 hover:border-secondary/50 transition-colors">
                  <div className="p-3 bg-secondary/10 rounded-lg text-secondary">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">
                      Python Full-Stack Development Completion
                    </h3>
                    <p className="text-muted-foreground text-sm">Internship</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Education */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              id="education"
            >
              <h2 className="text-3xl font-bold mb-8">Education</h2>
              <div className="space-y-8 border-l border-border/50 ml-3 pl-6">
                <div className="relative">
                  <div className="absolute w-3 h-3 bg-primary rounded-full -left-[30.5px] top-1.5" />
                  <h3 className="font-bold text-lg">
                    B.Tech Information Technology
                  </h3>
                  <p className="text-muted-foreground">
                    Shri Ramswaroop Memorial College of Engineering and
                    Management
                  </p>
                </div>
                <div className="relative">
                  <div className="absolute w-3 h-3 bg-muted-foreground rounded-full -left-[30.5px] top-1.5" />
                  <h3 className="font-bold text-lg flex items-center justify-between">
                    Intermediate
                    <span className="text-sm bg-accent px-2 py-1 rounded text-accent-foreground font-mono">
                      89.75%
                    </span>
                  </h3>
                  <p className="text-muted-foreground">
                    City Montessori School, Lucknow
                  </p>
                </div>
                <div className="relative">
                  <div className="absolute w-3 h-3 bg-muted-foreground rounded-full -left-[30.5px] top-1.5" />
                  <h3 className="font-bold text-lg flex items-center justify-between">
                    High School
                    <span className="text-sm bg-accent px-2 py-1 rounded text-accent-foreground font-mono">
                      94.5%
                    </span>
                  </h3>
                  <p className="text-muted-foreground">
                    City Montessori School, Lucknow
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-12 text-center">Contact Me</h2>
            <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-3xl p-8 md:p-12 shadow-2xl">
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-2xl font-semibold mb-6">Get in Touch</h3>
                  <div className="space-y-6">
                    <a
                      href="tel:+918317085372"
                      className="flex items-center space-x-4 text-muted-foreground hover:text-primary transition-colors group"
                    >
                      <div className="p-3 bg-accent rounded-full group-hover:bg-primary/20 transition-colors">
                        <Phone className="h-5 w-5" />
                      </div>
                      <span className="text-lg">+91 8317085372</span>
                    </a>
                    <a
                      href="mailto:dhruvsaxena137@gmail.com"
                      className="flex items-center space-x-4 text-muted-foreground hover:text-primary transition-colors group"
                    >
                      <div className="p-3 bg-accent rounded-full group-hover:bg-primary/20 transition-colors">
                        <Mail className="h-5 w-5" />
                      </div>
                      <span className="text-lg">dhruvsaxena137@gmail.com</span>
                    </a>
                    <div className="flex items-center space-x-4 text-muted-foreground">
                      <div className="p-3 bg-accent rounded-full">
                        <MapPin className="h-5 w-5" />
                      </div>
                      <span className="text-lg">Lucknow, India</span>
                    </div>
                  </div>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    // Toast simulation
                    alert("Message sent successfully!");
                    (e.target as HTMLFormElement).reset();
                  }}
                  className="space-y-4"
                >
                  <div>
                    <input
                      type="text"
                      placeholder="Your Name"
                      required
                      className="w-full bg-background border border-input rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="Your Email"
                      required
                      className="w-full bg-background border border-input rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Subject"
                      required
                      className="w-full bg-background border border-input rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
                    />
                  </div>
                  <div>
                    <textarea
                      placeholder="Your Message"
                      rows={4}
                      required
                      className="w-full bg-background border border-input rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow resize-none"
                    ></textarea>
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-primary to-secondary text-white border-0 py-6 rounded-xl text-lg font-medium"
                    data-testid="btn-submit-contact"
                  >
                    Send Message
                  </Button>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border/50 bg-muted/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-muted-foreground text-sm mb-4 md:mb-0">
            Devansh Saxena &copy; 2026. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a
              href="https://github.com/devanshsaxena-sys"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <SiGithub className="h-5 w-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/devansh-saxena-4332a0330"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <FaLinkedin className="h-5 w-5" />
            </a>
            <a
              href="mailto:dhruvsaxena137@gmail.com"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>
      </footer>

      {/* Back to top */}
      {showScrollTop && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-8 right-8 p-3 bg-primary text-primary-foreground rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all z-50"
          data-testid="btn-scroll-top"
        >
          <ArrowUp className="h-6 w-6" />
        </motion.button>
      )}
    </div>
  );
}

function SkillItem({
  icon,
  name,
  level,
}: {
  icon: React.ReactNode;
  name: string;
  level: string;
}) {
  return (
    <div className="flex items-center space-x-4 p-3 rounded-lg hover:bg-accent/50 transition-colors">
      <div className="text-3xl">{icon}</div>
      <div>
        <h4 className="font-medium">{name}</h4>
        <p className="text-xs text-muted-foreground">{level}</p>
      </div>
    </div>
  );
}
