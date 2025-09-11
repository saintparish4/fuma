'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    
    // Scroll reveal animation
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    }, observerOptions);
    
    document.querySelectorAll('.scroll-reveal').forEach(el => {
      observer.observe(el);
    });
    
    setIsLoaded(true);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Floating Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-20 right-20 w-32 h-32 bg-secondary opacity-5 rounded-full animate-float"
          style={{ transform: `translateY(${scrollY * 0.1}px)` }}
        />
        <div 
          className="absolute bottom-40 left-20 w-24 h-24 bg-primary opacity-5 rounded-full animate-float"
          style={{ 
            transform: `translateY(${scrollY * -0.05}px)`,
            animationDelay: '2s'
          }}
        />
      </div>

      {/* Hero Section */}
      <section className="space-section relative">
        <div className="container-narrow text-center">
          <div className={`transition-all duration-1000 ${isLoaded ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'}`}>
            <div className="relative">
              <h1 className="text-display space-element relative">
                <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent animate-pulse-glow">
                  Fūma
                </span>
              </h1>
              <div className="absolute -inset-4 bg-gradient-to-r from-secondary/20 to-primary/20 rounded-full blur-3xl opacity-30 animate-pulse" />
            </div>
            <p className="text-headline text-muted-foreground space-content">
              An AI-powered design ecosystem for architecture and design professionals
            </p>
            <p className="text-body text-subtle-foreground max-w-2xl mx-auto space-element">
              Revolutionizing how creative teams conceptualize, execute, and deliver projects. 
              Our platform integrates intelligent design assistance, real-time client collaboration, 
              and automated compliance checking into one comprehensive workspace.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="btn-primary focus-glow group relative overflow-hidden">
                <span className="relative z-10 flex items-center gap-2">
                  Start Creating
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
              <button className="btn-secondary focus-glow group">
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.5a2.5 2.5 0 100-5H9v5zm0 0H7.5A2.5 2.5 0 105 12.5V10" />
                  </svg>
                  Watch Demo
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="space-section-sm gradient-bg-subtle relative overflow-hidden">
        <div className="container-wide">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="scroll-reveal">
              <h2 className="text-title space-element">
                Your Creative Catalyst
              </h2>
              <p className="text-body text-muted-foreground space-element">
                Fūma becomes your intelligent design companion that anticipates your needs and 
                amplifies your vision. It eliminates the friction between inspiration and execution, 
                allowing you to spend more time innovating and less time coordinating.
              </p>
              <p className="text-body text-subtle-foreground">
                No more creative interruptions or administrative overhead—everything flows 
                seamlessly from concept to completion, helping you deliver exceptional designs 
                that exceed client expectations while growing your practice.
              </p>
            </div>
            <div className="scroll-reveal interactive-card glass-card rounded-2xl p-8 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-primary/5 rounded-2xl" />
              <div className="space-y-6 relative z-10">
                <div className="flex items-start gap-4 group">
                  <div className="feature-icon w-8 h-8 rounded-full bg-gradient-to-br from-secondary to-primary flex items-center justify-center mt-1 flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2 group-hover:text-secondary transition-colors">
                      AI-Powered Design Assistance
                    </h3>
                    <p className="text-caption">Intelligent tools that enhance your creative process</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 group">
                  <div className="feature-icon w-8 h-8 rounded-full bg-gradient-to-br from-secondary to-primary flex items-center justify-center mt-1 flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2 group-hover:text-secondary transition-colors">
                      Real-Time Collaboration
                    </h3>
                    <p className="text-caption">Seamless client interaction throughout the project</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 group">
                  <div className="feature-icon w-8 h-8 rounded-full bg-gradient-to-br from-secondary to-primary flex items-center justify-center mt-1 flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2 group-hover:text-secondary transition-colors">
                      Automated Compliance
                    </h3>
                    <p className="text-caption">Built-in checking for regulations and standards</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Differentiators Section */}
      <section className="space-section relative">
        <div className="container-wide">
          <div className="text-center space-content scroll-reveal">
            <h2 className="text-title space-element">
              Beyond Traditional Project Management
            </h2>
            <p className="text-body text-muted-foreground max-w-3xl mx-auto">
              We leverage cutting-edge technology and insights from leading design firms across 
              <span className="font-medium text-secondary"> 40+ countries</span> to create tools that don't just manage projects—they enhance creative output.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="scroll-reveal bg-muted rounded-2xl p-8 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-muted-foreground/5 to-transparent" />
              <h3 className="text-caption text-subtle-foreground mb-6 uppercase tracking-wider relative z-10">
                Traditional Approach
              </h3>
              <div className="space-y-5 relative z-10">
                {[
                  'Traditional project management',
                  'Workflow streamlining', 
                  'Centralized organization',
                  'Design partner positioning',
                  'Efficiency & relationships'
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3 group/item">
                    <div className="w-2 h-2 rounded-full bg-muted-foreground opacity-60 transition-all group-hover/item:scale-125"></div>
                    <span className="text-body transition-all group-hover/item:translate-x-1">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="scroll-reveal interactive-card glass-card rounded-2xl p-8 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 to-primary/5 rounded-2xl" />
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-secondary/10 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-700" />
              <h3 className="text-caption text-secondary mb-6 uppercase tracking-wider font-medium relative z-10">
                Fūma's Approach
              </h3>
              <div className="space-y-5 relative z-10">
                {[
                  'AI-powered design assistance',
                  'Creative amplification focus',
                  'Intelligent automation', 
                  'Design catalyst positioning',
                  'Profitability & growth emphasis'
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3 group/item">
                    <div className="w-2 h-2 rounded-full bg-secondary transition-all group-hover/item:scale-125 group-hover/item:shadow-lg group-hover/item:shadow-secondary/50"></div>
                    <span className="text-body font-medium transition-all group-hover/item:translate-x-1 group-hover/item:text-secondary">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="space-section-sm gradient-bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-secondary/90" />
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-float" />
          <div className="absolute bottom-10 right-10 w-16 h-16 bg-white/5 rounded-full animate-float" style={{ animationDelay: '1s' }} />
        </div>
        <div className="container-narrow text-center relative z-10">
          <div className="scroll-reveal">
            <h2 className="text-headline space-element">
              Transform your design process
            </h2>
            <p className="text-body opacity-90 space-element max-w-2xl mx-auto">
              Where creativity meets intelligence. Join the future of architectural and design excellence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="bg-primary-foreground text-primary px-8 py-4 rounded-xl font-medium text-lg hover:bg-opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl hover:transform hover:-translate-y-1 focus-glow group">
                <span className="flex items-center gap-2">
                  Get Early Access
                  <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </button>
              <button className="premium-link text-primary-foreground opacity-80 hover:opacity-100 transition-all">
                Schedule a Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-16 bg-subtle relative">
        <div className="container-wide">
          <div className="text-center scroll-reveal">
            <div className="mb-8">
              <h3 className="text-title mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Fūma
              </h3>
              <p className="text-caption max-w-md mx-auto mb-6">
                An AI-powered design ecosystem for architecture and design professionals. 
                Elevating creative output through intelligent automation.
              </p>
              
              {/* Social Links */}
              <div className="flex justify-center gap-6 mb-8">
                {['Twitter', 'LinkedIn', 'GitHub'].map((social, index) => (
                  <a 
                    key={social}
                    href="#" 
                    className="w-10 h-10 rounded-full bg-muted hover:bg-secondary transition-all duration-300 flex items-center justify-center group hover:scale-110 hover:shadow-lg"
                  >
                    <span className="text-sm font-medium text-muted-foreground group-hover:text-white transition-colors">
                      {social[0]}
                    </span>
                  </a>
                ))}
              </div>
            </div>
            
            <div className="pt-8 border-t border-border">
              <p className="text-caption flex items-center justify-center gap-2">
                <span>© 2025 Fūma.</span>
                <span className="text-secondary">•</span>
                <span>Crafted with precision for creative excellence.</span>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
