<script>
  import { onMount } from 'svelte';
  
  let visible = $state(false);

  onMount(() => {
    setTimeout(() => visible = true, 100);
  });
</script>

<section id="hero" class="hero">
  <div class="hero-bg">
    <!-- Replace with real high-res images later -->
    <div class="overlay"></div>
    <div class="ken-burns"></div>
  </div>

  <div class="container hero-content {visible ? 'is-visible' : ''}">
    <span class="subtitle">Khidmat, Amanah & Berpengalaman</span>
    <h1>Wujudkan Ibadah <br> <span class="text-gold italic">Sesuai Sunnah</span></h1>
    <p>Bergabunglah bersama ribuan jamaah yang telah mempercayakan perjalanan ibadah Umrah dan Hajj mereka kepada Anmar Binawisata.</p>
    
    <div class="hero-actions">
      <a href="#packages" class="btn-premium">Lihat Paket</a>
      <a href="#contact" class="btn-outline">Hubungi Kami</a>
    </div>
  </div>

  <div class="scroll-indicator">
    <div class="mouse"></div>
    <span>Gulir Kebawah</span>
  </div>
</section>

<style>
  .hero {
    position: relative;
    height: 100vh;
    display: flex;
    align-items: center;
    color: var(--white);
    overflow: hidden;
    background-color: var(--primary); /* Fallback */
  }

  .hero-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
  }

  .ken-burns {
    width: 100%;
    height: 100%;
    background-image: url('https://images.unsplash.com/photo-1564767609342-620cb19b2357?auto=format&fit=crop&q=80&w=1920'); /* Mecca background */
    background-size: cover;
    background-position: center;
    animation: kenburns 20s infinite alternate;
  }

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to right, rgba(6, 78, 59, 0.9), rgba(6, 78, 59, 0.4), transparent);
    z-index: 1;
  }

  @keyframes kenburns {
    from { transform: scale(1); }
    to { transform: scale(1.15); }
  }

  .hero-content {
    position: relative;
    z-index: 2;
    max-width: 700px;
    opacity: 0;
    transform: translateY(30px);
    transition: all 1s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .hero-content.is-visible {
    opacity: 1;
    transform: translateY(0);
  }

  .subtitle {
    display: inline-block;
    color: var(--accent);
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.2em;
    margin-bottom: 1rem;
    font-size: 0.9rem;
  }

  h1 {
    font-size: clamp(2.5rem, 8vw, 5rem);
    line-height: 1.1;
    color: var(--white);
    margin-bottom: 1.5rem;
  }

  .italic {
    font-style: italic;
  }

  p {
    font-size: 1.1rem;
    color: rgba(255, 255, 255, 0.8);
    margin-bottom: 2.5rem;
    font-weight: 300;
  }

  .hero-actions {
    display: flex;
    gap: 1.5rem;
  }

  .btn-outline {
    padding: 1rem 2.5rem;
    border: 1px solid var(--white);
    color: var(--white);
    border-radius: 4px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    transition: var(--transition-smooth);
  }

  .btn-outline:hover {
    background-color: var(--white);
    color: var(--primary);
  }

  .scroll-indicator {
    position: absolute;
    bottom: 40px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    opacity: 0.7;
    z-index: 2;
  }

  .mouse {
    width: 24px;
    height: 40px;
    border: 2px solid var(--white);
    border-radius: 12px;
    position: relative;
  }

  .mouse::after {
    content: '';
    position: absolute;
    top: 8px;
    left: 50%;
    width: 4px;
    height: 4px;
    background-color: var(--white);
    border-radius: 50%;
    transform: translateX(-50%);
    animation: scroll 2s infinite;
  }

  @keyframes scroll {
    0% { opacity: 1; transform: translateX(-50%) translateY(0); }
    100% { opacity: 0; transform: translateX(-50%) translateY(15px); }
  }

  .scroll-indicator span {
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 2px;
  }

  @media (max-width: 768px) {
    .overlay {
      background: rgba(6, 78, 59, 0.7);
    }
    .hero-actions {
      flex-direction: column;
      gap: 1rem;
    }
    .hero-content {
      text-align: center;
    }
  }
</style>
