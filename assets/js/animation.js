if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);

  gsap.from('.hero-text', {
    y: 40,
    opacity: 0,
    duration: 1,
    ease: 'power3.out'
  });

  gsap.from('.hero-card', {
    scale: 0.96,
    opacity: 0,
    duration: 1.1,
    delay: 0.2,
    ease: 'power3.out'
  });

  gsap.utils.toArray('.portfolio-card, .service-card, .info-box, .testimonial-card, .cta-box').forEach((el) => {
    gsap.from(el, {
      y: 40,
      opacity: 0,
      duration: 0.8,
      scrollTrigger: {
        trigger: el,
        start: 'top 88%'
      }
    });
  });
}
