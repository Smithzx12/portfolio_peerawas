(function () {

  /* ── 1. Reveal on scroll (generic) ── */
  const reveals = document.querySelectorAll('.reveal');
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        revealObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });
  reveals.forEach(el => revealObs.observe(el));

  /* ── 2. About text word-by-word light-up ── */
  const aboutText = document.getElementById('aboutText');
  if (aboutText) {
    const words = aboutText.textContent.trim().split(/\s+/);
    aboutText.innerHTML = words.map(w => `<span class="word">${w}</span>`).join(' ');
    const wordEls = aboutText.querySelectorAll('.word');

    function updateWords() {
      const rect = aboutText.getBoundingClientRect();
      const vh = window.innerHeight;
      // progress: 0 when top of section hits bottom of viewport → 1 when bottom hits top
      const progress = Math.min(Math.max((vh - rect.top) / (rect.height + vh * 0.4), 0), 1);
      const litCount = Math.round(progress * wordEls.length);
      wordEls.forEach((w, i) => w.classList.toggle('lit', i < litCount));
    }

    window.addEventListener('scroll', updateWords, { passive: true });
    updateWords();
  }

  /* ── 2b. Testimonial quote word-by-word light-up ── */
  const testiQuote = document.getElementById('testiQuote');
  if (testiQuote) {
    const words = testiQuote.textContent.trim().split(/\s+/);
    testiQuote.innerHTML = words.map(w => `<span class="word">${w}</span>`).join(' ');
    const wordEls = testiQuote.querySelectorAll('.word');

    function updateTestiWords() {
      const rect = testiQuote.getBoundingClientRect();
      const vh = window.innerHeight;
      const progress = Math.min(Math.max((vh - rect.top) / (rect.height + vh * 0.5), 0), 1);
      const litCount = Math.round(progress * wordEls.length);
      wordEls.forEach((w, i) => w.classList.toggle('lit', i < litCount));
    }

    window.addEventListener('scroll', updateTestiWords, { passive: true });
    updateTestiWords();
  }

  /* ── 3. Parallax on project images (subtle) ── */
  const cards = document.querySelectorAll('.proj-card');

  function updateParallax() {
    const vh = window.innerHeight;
    cards.forEach(card => {
      const rect = card.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      const offset = (center - vh / 2) / vh; // -0.5 … 0.5
      // subtle 24px range — no snap, pure parallax feel
      card.style.transform = `translateY(${offset * 24}px)`;
    });
  }

  window.addEventListener('scroll', updateParallax, { passive: true });
  updateParallax();

  /* ── 4. Hero parallax bg word ── */
  const bgWord = document.querySelector('.hero-bg-word');
  const heroDesc = document.querySelector('.hero-desc');
  const heroStatus = document.querySelector('.hero-status');

  function updateHero() {
    const scrollY = window.scrollY;
    const vh = window.innerHeight;
    const t = Math.min(scrollY / vh, 1);
    if (bgWord) bgWord.style.transform = `translateY(${t * -80}px)`;
    if (heroDesc) {
      heroDesc.style.transform = `translateY(${t * 40}px)`;
      heroDesc.style.opacity = 1 - t * 1.5;
    }
    if (heroStatus) {
      heroStatus.style.transform = `translateY(${t * 30}px)`;
      heroStatus.style.opacity = 1 - t * 1.5;
    }
  }

  window.addEventListener('scroll', updateHero, { passive: true });
  updateHero();

  /* ── 5. HOW WE WORK — horizontal scroll driven by vertical scroll ── */
  const processOuter = document.getElementById('process');
  const processTrack = document.getElementById('processTrack');
  const processFill  = document.getElementById('processFill');

  function updateProcess() {
    if (!processOuter || !processTrack) return;
    const rect  = processOuter.getBoundingClientRect();
    const outerH = processOuter.offsetHeight;
    const stickyH = window.innerHeight;
    // total scrollable distance = outerH - stickyH
    const scrollable = outerH - stickyH;
    // progress 0→1 while section is pinned
    const progress = Math.min(Math.max(-rect.top / scrollable, 0), 1);
    // max translateX = total cards width - track-wrap width
    const trackWrap = processTrack.parentElement;
    const maxX = processTrack.scrollWidth - trackWrap.offsetWidth;
    processTrack.style.transform = `translateX(${-progress * maxX}px)`;
    if (processFill) processFill.style.width = `${progress * 100}%`;
  }

  window.addEventListener('scroll', updateProcess, { passive: true });
  window.addEventListener('resize', updateProcess, { passive: true });
  updateProcess();

})();

  /* ── Splash ── */
  window.addEventListener('load', () => {
    const splash = document.getElementById('splash');
    const pageWrap = document.getElementById('page-wrap');
    setTimeout(() => {
      splash.classList.add('hide');
      pageWrap.classList.add('show');
      document.body.classList.remove('splash-active');
      setTimeout(() => splash.remove(), 1100);
    }, 950);
  });