<script>
  let scrolled = $state(false);
  
  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', () => {
      scrolled = window.scrollY > 20;
    });
  }
</script>

<nav class="floating-nav {scrolled ? 'is-scrolled' : ''}">
  <div class="logo">
    <span class="label">ANMAR</span>
  </div>

  <div class="links">
    <a href="/">Home</a>
    <a href="#packages">Paket</a>
    <a href="#about">Tentang</a>
    <a href="#contact">Kontak</a>
  </div>

  <a href="#booking" class="btn-book">
    Register
  </a>
</nav>

<style>
  .floating-nav {
    position: fixed;
    top: 1.5rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1000;
    width: min(90%, 600px);
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(0,0,0,0.05);
    padding: 0.6rem 1.2rem;
    border-radius: 100px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0 4px 20px rgba(0,0,0,0.03);
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }

  .floating-nav.is-scrolled {
    width: min(95%, 450px);
    top: 1rem;
    box-shadow: 0 10px 40px rgba(0,0,0,0.08);
  }

  .logo {
    font-weight: 900;
    font-size: 1rem;
    letter-spacing: -0.02em;
    color: var(--primary);
  }

  .links {
    display: flex;
    gap: 1.5rem;
  }

  .links a {
    font-size: 0.8rem;
    font-weight: 600;
    color: var(--text-dim);
    transition: var(--transition-smooth);
  }

  .links a:hover {
    color: var(--primary);
  }

  .btn-book {
    background: var(--primary);
    color: white;
    font-size: 0.75rem;
    font-weight: 700;
    padding: 0.5rem 1rem;
    border-radius: 50px;
    transition: var(--transition-smooth);
  }

  .btn-book:hover {
    background: var(--accent);
    transform: scale(1.05);
  }

  @media (max-width: 640px) {
    .links {
      display: none;
    }
    .floating-nav {
      width: 90%;
    }
  }
</style>
