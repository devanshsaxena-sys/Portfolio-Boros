import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useSpring, useTransform, AnimatePresence } from "framer-motion";
import {
  SiGithub,
  SiReact,
  SiDjango,
  SiPython,
  SiC,
  SiGit,
} from "react-icons/si";
import { FaJava, FaLinkedin } from "react-icons/fa";
import { Moon, Sun, Menu, X, ArrowUp, Mail, MapPin, Phone, Download, FileText, CheckCircle, ExternalLink } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import { Button } from "@/components/ui/button";
import devanshPhoto from "@assets/WhatsApp_Image_2026-03-13_at_9.01.26_PM_1781159314441.jpeg";

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

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 200);
          return 100;
        }
        return prev + 5;
      });
    }, 50);
    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] bg-slate-900 flex flex-col items-center justify-center text-white"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-6xl font-black mb-8 tracking-tighter"
      >
        DS<span className="text-primary">.</span>
      </motion.div>
      <div className="w-64 h-1 bg-slate-800 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-primary"
          initial={{ width: "0%" }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>
    </motion.div>
  );
};

const CustomCursor = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const updateMousePos = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      
      const target = e.target as HTMLElement;
      setIsHovering(
        target.tagName.toLowerCase() === 'button' ||
        target.tagName.toLowerCase() === 'a' ||
        target.closest('button') !== null ||
        target.closest('a') !== null
      );
    };
    window.addEventListener("mousemove", updateMousePos);
    return () => window.removeEventListener("mousemove", updateMousePos);
  }, []);

  const springX = useSpring(mousePos.x, { stiffness: 500, damping: 28, mass: 0.5 });
  const springY = useSpring(mousePos.y, { stiffness: 500, damping: 28, mass: 0.5 });

  return (
    <>
      <div 
        className="fixed top-0 left-0 w-2 h-2 bg-primary rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2"
        style={{ 
          transform: `translate(${mousePos.x}px, ${mousePos.y}px) translate(-50%, -50%) scale(${isHovering ? 1.5 : 1})`,
          transition: 'transform 0.1s ease-out'
        }}
      />
      <motion.div 
        className="fixed top-0 left-0 w-8 h-8 border border-secondary/50 rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2"
        style={{ 
          x: springX, 
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
          scale: isHovering ? 1.5 : 1
        }}
        transition={{ duration: 0.2 }}
      />
    </>
  );
};

const MouseGlow = () => {
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
      style={{
        background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(56, 189, 248, 0.06), transparent 40%)`,
      }}
    />
  );
};

const AuroraBackground = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, 150]);
  
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none dark:opacity-20 opacity-10 transition-opacity duration-500">
      <motion.div 
        style={{ y: y1 }}
        className="absolute -top-[10%] -left-[10%] w-[600px] h-[600px] rounded-full bg-[#38BDF8] mix-blend-screen filter blur-[120px] animate-aurora" 
      />
      <motion.div 
        style={{ y: y2 }}
        className="absolute top-[20%] -right-[10%] w-[500px] h-[500px] rounded-full bg-[#8B5CF6] mix-blend-screen filter blur-[100px] animate-aurora-offset" 
      />
      <div className="absolute -bottom-[10%] left-[20%] w-[400px] h-[400px] rounded-full bg-teal-500 mix-blend-screen filter blur-[80px] animate-aurora" style={{ animationDelay: '2s' }} />
    </div>
  );
};

const ParticleCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Disable on small screens
    if (window.innerWidth < 768) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let animationFrameId: number;
    
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', resize);
    resize();
    
    const particles: {x: number, y: number, vx: number, vy: number, size: number, color: string}[] = [];
    
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        color: Math.random() > 0.5 ? 'rgba(56, 189, 248, 0.4)' : 'rgba(139, 92, 246, 0.3)'
      });
    }
    
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
        
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(139, 92, 246, ${0.15 * (1 - dist/120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      
      animationFrameId = requestAnimationFrame(draw);
    };
    
    draw();
    
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  
  return <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />;
};

const ShootingStars = () => {
  const stars = Array.from({ length: 6 });
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {stars.map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-[1px] w-[150px] bg-gradient-to-r from-transparent via-white to-transparent"
          initial={{ 
            x: Math.random() * 1000 - 500, 
            y: -100, 
            opacity: 0,
            rotate: 35
          }}
          animate={{ 
            x: Math.random() * 1000 + 500, 
            y: 800, 
            opacity: [0, 1, 0] 
          }}
          transition={{
            duration: 1.5 + Math.random(),
            repeat: Infinity,
            delay: Math.random() * 10,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
};

const ProjectCard3D = () => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    setRotateX(-y / 10);
    setRotateY(x / 10);
  };
  
  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      style={{ perspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="h-full"
    >
      <motion.div
        animate={{ rotateX, rotateY }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="bg-card/60 backdrop-blur-md border border-border/50 rounded-2xl overflow-hidden group cursor-pointer h-full relative"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
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
    </motion.div>
  );
};

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

const FloatingIcons = () => {
  const icons = [
    { Icon: SiReact, color: "#61DAFB", delay: 0, x: "10%", y: "20%", size: 48 },
    { Icon: SiPython, color: "#3776AB", delay: 1, x: "85%", y: "15%", size: 40 },
    { Icon: SiDjango, color: "#092E20", delay: 2, x: "15%", y: "75%", size: 36 },
    { Icon: FaJava, color: "#5382a1", delay: 1.5, x: "80%", y: "80%", size: 44 },
    { Icon: SiGit, color: "#F05032", delay: 0.5, x: "5%", y: "50%", size: 32 },
    { Icon: SiGithub, color: "currentColor", delay: 2.5, x: "90%", y: "45%", size: 38 },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      {icons.map((item, i) => (
        <motion.div
          key={i}
          className="absolute opacity-[0.08] dark:opacity-[0.15]"
          style={{ left: item.x, top: item.y }}
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 4, repeat: Infinity, delay: item.delay, ease: "easeInOut" }}
        >
          <item.Icon size={item.size} color={item.color} />
        </motion.div>
      ))}
    </div>
  );
};

const FloatingSnippets = () => {
  const snippets = [
    { code: "const [skills] = useState([...])", top: "25%", left: "15%", delay: 0 },
    { code: "def solve(): return True", top: "70%", left: "80%", delay: 2 },
    { code: "git push origin main", top: "40%", left: "75%", delay: 1 },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none z-0 hidden md:block">
      {snippets.map((snip, i) => (
        <motion.div
          key={i}
          className="absolute bg-card/30 backdrop-blur-sm border border-border/20 p-2 rounded-lg font-mono text-xs opacity-[0.07] dark:opacity-[0.12]"
          style={{ top: snip.top, left: snip.left }}
          animate={{ y: [0, -10, 0], x: [0, 5, 0] }}
          transition={{ duration: 5 + i, repeat: Infinity, delay: snip.delay, ease: "easeInOut" }}
        >
          {snip.code}
        </motion.div>
      ))}
    </div>
  );
};

const ResumeDownloadButton = () => {
  const [downloaded, setDownloaded] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const handleDownload = () => {
    if (downloading || downloaded) return;
    setDownloading(true);
    setTimeout(() => {
      const link = document.createElement("a");
      link.href = `${import.meta.env.BASE_URL}Devansh_Saxena_Resume.pdf`;
      link.download = "Devansh_Saxena_Resume.pdf";
      link.click();
      setDownloading(false);
      setDownloaded(true);
      setTimeout(() => setDownloaded(false), 3000);
    }, 800);
  };

  return (
    <motion.button
      onClick={handleDownload}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      data-testid="btn-download-resume"
      className="relative flex items-center gap-2.5 px-8 h-11 rounded-full text-sm font-semibold overflow-hidden border border-primary/40 bg-primary/5 backdrop-blur-sm hover:bg-primary/10 transition-colors"
      style={{ cursor: "pointer" }}
    >
      {/* Animated shimmer sweep */}
      <motion.span
        className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent -skew-x-12"
        initial={{ x: "-100%" }}
        animate={{ x: "200%" }}
        transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 1.5, ease: "easeInOut" }}
      />

      <AnimatePresence mode="wait">
        {downloading ? (
          <motion.span
            key="downloading"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="flex items-center gap-2 text-primary"
          >
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
              className="block"
            >
              <FileText className="h-4 w-4" />
            </motion.span>
            Preparing…
          </motion.span>
        ) : downloaded ? (
          <motion.span
            key="done"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2 text-green-400"
          >
            <CheckCircle className="h-4 w-4" />
            Downloaded!
          </motion.span>
        ) : (
          <motion.span
            key="idle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2 text-foreground"
          >
            <motion.span
              animate={{ y: [0, 3, 0] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
              className="block"
            >
              <Download className="h-4 w-4 text-primary" />
            </motion.span>
            Download Resume
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

export default function Home() {
  const { theme, setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { scrollYProgress, scrollY } = useScroll();
  
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

  const headerY = useTransform(scrollY, [0, 300], [0, 50]);

  return (
    <>
      <AnimatePresence>
        {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 relative overflow-hidden">
        {theme === 'dark' && <CustomCursor />}
        {theme === 'dark' && <MouseGlow />}
        <AuroraBackground />

        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary origin-left z-50"
          style={{ scaleX }}
        />

        {/* Navbar */}
        <nav className="fixed top-0 left-0 right-0 z-40 bg-background/60 backdrop-blur-xl border-b border-border/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <span
                className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary cursor-pointer hover:opacity-80 transition-opacity"
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
                    className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors relative group py-2"
                    data-testid={`nav-link-${link.toLowerCase()}`}
                  >
                    {link}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                  </button>
                ))}
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full"
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
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden bg-background/95 backdrop-blur-md border-b border-border overflow-hidden"
              >
                <div className="px-4 py-4 space-y-2">
                  {navLinks.map((link) => (
                    <button
                      key={link}
                      onClick={() => scrollTo(link)}
                      className="block w-full text-left px-4 py-3 text-base font-medium text-muted-foreground hover:text-primary hover:bg-accent/50 rounded-lg transition-colors"
                    >
                      {link}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>

        {/* Hero Section */}
        <section
          id="home"
          className="pt-32 pb-20 min-h-[100dvh] flex items-center justify-center relative overflow-hidden"
        >
          <ParticleCanvas />
          {theme === 'dark' && <ShootingStars />}
          <FloatingIcons />
          <FloatingSnippets />

          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-left"
              >
                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-4">
                  Hi, I'm <br className="hidden md:block"/>
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-primary bg-300% animate-gradient">
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
                <p className="text-lg text-muted-foreground mb-8 max-w-xl leading-relaxed">
                  Motivated B.Tech Information Technology student seeking an
                  entry-level opportunity to apply my knowledge of Python, Java, and
                  web development. Eager to contribute to real-world projects,
                  enhance technical skills, and grow as a software developer in a
                  dynamic organization.
                </p>

                <div className="flex flex-wrap gap-4 mb-12">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                    <Button
                      size="lg"
                      onClick={() => scrollTo("projects")}
                      className="bg-gradient-to-r from-primary to-secondary text-white border-0 hover:opacity-90 transition-opacity rounded-full px-8 shadow-lg shadow-primary/25"
                      data-testid="btn-view-projects"
                    >
                      View Projects
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                    <Button
                      size="lg"
                      variant="outline"
                      onClick={() => scrollTo("contact")}
                      className="rounded-full px-8 border-border/50 hover:bg-accent backdrop-blur-sm"
                      data-testid="btn-contact-me"
                    >
                      Contact Me
                    </Button>
                  </motion.div>
                  <ResumeDownloadButton />
                </div>

                <div className="flex space-x-6">
                  <a
                    href="https://github.com/devanshsaxena-sys"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors hover:-translate-y-1 transform duration-300"
                    data-testid="link-github"
                  >
                    <SiGithub className="h-7 w-7" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/devansh-saxena-4332a0330"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors hover:-translate-y-1 transform duration-300"
                    data-testid="link-linkedin"
                  >
                    <FaLinkedin className="h-7 w-7" />
                  </a>
                  <a
                    href="mailto:dhruvsaxena137@gmail.com"
                    className="text-muted-foreground hover:text-primary transition-colors hover:-translate-y-1 transform duration-300"
                    data-testid="link-email"
                  >
                    <Mail className="h-7 w-7" />
                  </a>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="flex justify-center md:justify-end"
              >
                <div className="relative w-64 h-64 md:w-80 md:h-80 animate-float-avatar">
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-primary to-secondary animate-pulse opacity-50 blur-xl" />
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-primary to-secondary p-1">
                    <div className="w-full h-full rounded-[22px] bg-background overflow-hidden relative">
                      <img 
                        src={devanshPhoto} 
                        alt="Devansh Saxena" 
                        className="w-full h-full object-cover rounded-[22px] mix-blend-normal"
                      />
                      <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] rounded-[22px] pointer-events-none" />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-24 relative">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] border border-primary/10 rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="w-full h-full rounded-full border-t border-primary/30" />
          </div>
          
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div style={{ y: headerY }} className="mb-16 text-center">
              <h2 className="text-3xl md:text-4xl font-bold">About Me</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mt-4 rounded-full" />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className="bg-card/40 backdrop-blur-xl border border-border/40 rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 pointer-events-none" />
              <p className="text-lg leading-relaxed text-card-foreground mb-8 relative z-10">
                I am a B.Tech Information Technology student at Shri Ramswaroop
                Memorial College of Engineering and Management. I am passionate
                about software development, web technologies, and
                problem-solving. I enjoy building practical applications and
                continuously improving my technical skills through projects,
                internships, and hands-on learning experiences.
              </p>
              <div className="flex items-center text-muted-foreground bg-background/50 w-fit px-4 py-2 rounded-full border border-border/30 relative z-10">
                <MapPin className="h-5 w-5 mr-2 text-primary" />
                <span className="font-medium">Lucknow, India</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-24 bg-muted/20 relative">
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] border border-secondary/10 rounded-full translate-y-1/3 -translate-x-1/3 pointer-events-none">
            <motion.div animate={{ rotate: -360 }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} className="w-full h-full rounded-full border-b border-secondary/30" />
          </div>

          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div style={{ y: headerY }} className="mb-16 text-center">
              <h2 className="text-3xl md:text-4xl font-bold">Skills</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mt-4 rounded-full" />
            </motion.div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* Languages */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-card/60 backdrop-blur-md border border-border/40 rounded-3xl p-8 hover:border-primary/50 transition-all hover:shadow-xl hover:shadow-primary/5"
              >
                <h3 className="text-xl font-bold mb-8 flex items-center">
                  <span className="w-3 h-8 bg-primary mr-3 rounded-full"></span>
                  Languages
                </h3>
                <div className="space-y-6">
                  <SkillItem icon={<FaJava className="text-[#5382a1]" />} name="Java" percentage={60} />
                  <SkillItem icon={<SiPython className="text-[#3776AB]" />} name="Python" percentage={40} />
                  <SkillItem icon={<SiC className="text-[#A8B9CC]" />} name="C" percentage={35} />
                </div>
              </motion.div>

              {/* Frameworks */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-card/60 backdrop-blur-md border border-border/40 rounded-3xl p-8 hover:border-secondary/50 transition-all hover:shadow-xl hover:shadow-secondary/5"
              >
                <h3 className="text-xl font-bold mb-8 flex items-center">
                  <span className="w-3 h-8 bg-secondary mr-3 rounded-full"></span>
                  Frameworks
                </h3>
                <div className="space-y-6">
                  <SkillItem icon={<SiReact className="text-[#61DAFB]" />} name="React.js" percentage={65} />
                  <SkillItem icon={<SiDjango className="text-[#092E20]" />} name="Django REST" percentage={60} />
                </div>
              </motion.div>

              {/* Tools */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-card/60 backdrop-blur-md border border-border/40 rounded-3xl p-8 hover:border-primary/50 transition-all hover:shadow-xl hover:shadow-primary/5"
              >
                <h3 className="text-xl font-bold mb-8 flex items-center">
                  <span className="w-3 h-8 bg-gradient-to-b from-primary to-secondary mr-3 rounded-full"></span>
                  Tools
                </h3>
                <div className="space-y-6">
                  <SkillItem icon={<SiGit className="text-[#F05032]" />} name="Git" percentage={70} />
                  <SkillItem icon={<SiGithub className="text-foreground" />} name="GitHub" percentage={70} />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-24 relative">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div style={{ y: headerY }} className="mb-16 text-center">
              <h2 className="text-3xl md:text-4xl font-bold">Experience</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mt-4 rounded-full" />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="relative border-l border-primary/30 ml-4 md:ml-0 md:pl-10 py-4">
                <div className="absolute w-4 h-4 bg-primary rounded-full -left-[8.5px] top-10 md:-left-[8.5px] shadow-[0_0_15px_rgba(56,189,248,0.8)] ring-4 ring-background" />
                <div className="bg-card/50 backdrop-blur-xl border border-border/40 rounded-3xl p-8 md:p-10 ml-6 md:ml-0 hover:shadow-2xl transition-all duration-300 group">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl pointer-events-none" />
                  <h3 className="text-2xl font-bold text-foreground mb-1">
                    Full Stack Developer Trainee (Django)
                  </h3>
                  <h4 className="text-lg text-primary font-semibold mb-6 flex items-center gap-2">
                    SRDT
                    <span className="text-sm font-normal text-muted-foreground px-3 py-1 bg-muted rounded-full ml-auto">Internship</span>
                  </h4>
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
        <section id="projects" className="py-24 bg-muted/20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div style={{ y: headerY }} className="mb-16 text-center">
              <h2 className="text-3xl md:text-4xl font-bold">Projects</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mt-4 rounded-full" />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid md:grid-cols-2 gap-8"
            >
              <ProjectCard3D />
            </motion.div>
          </div>
        </section>

        {/* Certificates & Education */}
        <section id="certificates" className="py-24 relative">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-16">
              {/* Certificates */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold mb-10 flex items-center gap-3">
                  <span className="w-2 h-8 bg-primary rounded-full" />
                  Certificates
                </h2>
                <div className="space-y-6">
                  <div className="bg-card/50 backdrop-blur-sm border border-border/40 rounded-2xl p-6 flex items-start space-x-5 hover:border-primary/50 transition-all hover:shadow-lg group">
                    <div className="p-3 bg-primary/10 rounded-xl text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg leading-tight mb-1">
                        Mobile Application Development
                      </h3>
                      <p className="text-primary font-medium text-sm">Completion Certificate</p>
                    </div>
                  </div>
                  <div className="bg-card/50 backdrop-blur-sm border border-border/40 rounded-2xl p-6 flex items-start space-x-5 hover:border-secondary/50 transition-all hover:shadow-lg group">
                    <div className="p-3 bg-secondary/10 rounded-xl text-secondary group-hover:bg-secondary group-hover:text-secondary-foreground transition-colors">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg leading-tight mb-1">
                        Python Full-Stack Development
                      </h3>
                      <p className="text-secondary font-medium text-sm">Completion Certificate</p>
                    </div>
                  </div>
                  <a
                    href={`${import.meta.env.BASE_URL}DSA_Certificate.pdf`}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid="link-dsa-certificate"
                    className="bg-card/50 backdrop-blur-sm border border-border/40 rounded-2xl p-6 flex items-start space-x-5 hover:border-primary/40 transition-all hover:shadow-lg group cursor-pointer"
                  >
                    <div className="p-3 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl text-primary group-hover:from-primary group-hover:to-secondary group-hover:text-primary-foreground transition-all flex-shrink-0">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-lg leading-tight mb-1">
                        Data Structures &amp; Algorithms (DSA)
                      </h3>
                      <p className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary font-medium text-sm">Completion Certificate</p>
                    </div>
                    <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 mt-1" />
                  </a>
                </div>
              </motion.div>

              {/* Education */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                id="education"
              >
                <h2 className="text-3xl font-bold mb-10 flex items-center gap-3">
                  <span className="w-2 h-8 bg-secondary rounded-full" />
                  Education
                </h2>
                <div className="space-y-10 border-l-2 border-border/40 ml-4 pl-8">
                  <div className="relative">
                    <div className="absolute w-4 h-4 bg-primary rounded-full -left-[41px] top-1.5 ring-4 ring-background" />
                    <h3 className="font-bold text-xl mb-1">
                      B.Tech Information Technology
                    </h3>
                    <p className="text-muted-foreground mb-2">
                      Shri Ramswaroop Memorial College of Engineering and Management
                    </p>
                  </div>
                  <div className="relative">
                    <div className="absolute w-4 h-4 bg-muted-foreground/50 rounded-full -left-[41px] top-1.5 ring-4 ring-background" />
                    <h3 className="font-bold text-xl mb-1 flex items-center flex-wrap gap-3">
                      Intermediate
                      <span className="text-xs bg-accent px-2.5 py-1 rounded-md text-accent-foreground font-mono font-medium">
                        89.75%
                      </span>
                    </h3>
                    <p className="text-muted-foreground">
                      City Montessori School, Lucknow
                    </p>
                  </div>
                  <div className="relative">
                    <div className="absolute w-4 h-4 bg-muted-foreground/50 rounded-full -left-[41px] top-1.5 ring-4 ring-background" />
                    <h3 className="font-bold text-xl mb-1 flex items-center flex-wrap gap-3">
                      High School
                      <span className="text-xs bg-accent px-2.5 py-1 rounded-md text-accent-foreground font-mono font-medium">
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
        <section id="contact" className="py-24 bg-muted/20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div style={{ y: headerY }} className="mb-16 text-center">
              <h2 className="text-3xl md:text-4xl font-bold">Contact Me</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mt-4 rounded-full" />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-card/40 backdrop-blur-xl border border-border/40 rounded-[2rem] p-8 md:p-12 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl" />
              
              <div className="grid md:grid-cols-2 gap-16 relative z-10">
                <div>
                  <h3 className="text-3xl font-bold mb-8">Get in Touch</h3>
                  <p className="text-muted-foreground mb-10 text-lg">
                    I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
                  </p>
                  <div className="space-y-8">
                    <a
                      href="tel:+918317085372"
                      className="flex items-center space-x-5 text-muted-foreground hover:text-primary transition-colors group"
                    >
                      <div className="p-4 bg-background border border-border/50 rounded-2xl group-hover:border-primary/50 group-hover:bg-primary/10 transition-all shadow-sm">
                        <Phone className="h-6 w-6" />
                      </div>
                      <span className="text-xl font-medium">+91 8317085372</span>
                    </a>
                    <a
                      href="mailto:dhruvsaxena137@gmail.com"
                      className="flex items-center space-x-5 text-muted-foreground hover:text-primary transition-colors group"
                    >
                      <div className="p-4 bg-background border border-border/50 rounded-2xl group-hover:border-primary/50 group-hover:bg-primary/10 transition-all shadow-sm">
                        <Mail className="h-6 w-6" />
                      </div>
                      <span className="text-xl font-medium break-all">dhruvsaxena137@gmail.com</span>
                    </a>
                    <div className="flex items-center space-x-5 text-muted-foreground group">
                      <div className="p-4 bg-background border border-border/50 rounded-2xl group-hover:border-primary/50 group-hover:bg-primary/10 transition-all shadow-sm">
                        <MapPin className="h-6 w-6" />
                      </div>
                      <span className="text-xl font-medium">Lucknow, India</span>
                    </div>
                  </div>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    alert("Message sent successfully!");
                    (e.target as HTMLFormElement).reset();
                  }}
                  className="space-y-5"
                >
                  <div>
                    <input
                      type="text"
                      placeholder="Your Name"
                      required
                      className="w-full bg-background/80 border border-input rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all backdrop-blur-sm"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="Your Email"
                      required
                      className="w-full bg-background/80 border border-input rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all backdrop-blur-sm"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Subject"
                      required
                      className="w-full bg-background/80 border border-input rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all backdrop-blur-sm"
                    />
                  </div>
                  <div>
                    <textarea
                      placeholder="Your Message"
                      rows={5}
                      required
                      className="w-full bg-background/80 border border-input rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none backdrop-blur-sm"
                    ></textarea>
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white border-0 py-7 rounded-2xl text-lg font-bold shadow-lg shadow-primary/20 hover:-translate-y-1 transition-all"
                    data-testid="btn-submit-contact"
                  >
                    Send Message
                  </Button>
                </form>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-10 border-t border-border/20 bg-background relative z-10">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-muted-foreground text-sm font-medium">
              Devansh Saxena &copy; 2026. All rights reserved.
            </p>
            <div className="flex space-x-8">
              <a href="https://github.com/devanshsaxena-sys" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <SiGithub className="h-6 w-6" />
              </a>
              <a href="https://www.linkedin.com/in/devansh-saxena-4332a0330" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <FaLinkedin className="h-6 w-6" />
              </a>
              <a href="mailto:dhruvsaxena137@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">
                <Mail className="h-6 w-6" />
              </a>
            </div>
          </div>
        </footer>

        {/* Back to top */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0, y: 20 }}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="fixed bottom-8 right-8 p-4 bg-primary text-primary-foreground rounded-full shadow-2xl hover:shadow-primary/50 hover:-translate-y-2 transition-all z-50 ring-4 ring-background"
              data-testid="btn-scroll-top"
            >
              <ArrowUp className="h-6 w-6" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

function SkillItem({
  icon,
  name,
  percentage
}: {
  icon: React.ReactNode;
  name: string;
  percentage: number;
}) {
  return (
    <div className="group">
      <div className="flex items-center space-x-4 mb-3">
        <div className="text-3xl p-3 bg-background rounded-xl border border-border/50 group-hover:border-primary/50 transition-colors shadow-sm">{icon}</div>
        <div className="flex-1 flex justify-between items-center">
          <h4 className="font-bold text-lg">{name}</h4>
          <span className="text-sm font-mono font-medium text-muted-foreground">{percentage}%</span>
        </div>
      </div>
      <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
        <motion.div 
          className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
          initial={{ width: 0 }}
          whileInView={{ width: `${percentage}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        />
      </div>
    </div>
  );
}
