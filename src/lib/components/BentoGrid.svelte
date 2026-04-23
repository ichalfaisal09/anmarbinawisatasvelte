<script>
  import { onMount } from 'svelte';
  let visible = $state(false);
  
  onMount(() => {
    setTimeout(() => visible = true, 100);
  });
</script>

<div class="container modern-hub {visible ? 'is-visible' : ''}">
  <div class="bento-grid">
    <!-- Main Highlight Card -->
    <div class="bento-item bento-col-2 bento-row-2 hero-card">
      <div class="card-bg"></div>
      <div class="content">
        <span class="badge">Edisi 2025</span>
        <h1>Perjalanan <br> <span class="text-glow">Penuh Makna</span></h1>
        <p>Rasakan kenyamanan ibadah Umrah dengan bimbingan terbaik dan fasilitas bintang lima.</p>
        <a href="#packages" class="btn-pill">Lihat Paket <span class="icon">→</span></a>
      </div>
    </div>

    <!-- Quick Stats / Legality -->
    <div class="bento-item legality-card">
      <div class="icon-box">✓</div>
      <h3>Legalitas Resmi</h3>
      <p>Terakreditasi Kemenag RI dengan izin PPIU aktif.</p>
      <a href="#legal" class="link-more">Cek Dokumen</a>
    </div>

    <!-- Service Feature 1 -->
    <div class="bento-item feature-card">
      <div class="feature-icon">🕋</div>
      <h3>Manasik Intensif</h3>
      <p>Bimbingan sesuai Sunnah oleh Ustadz berpengalaman.</p>
    </div>

    <!-- Instagram / Social Hub -->
    <div class="bento-item bento-col-2 social-card">
      <div class="social-header">
        <h3>@anmarbinawisata</h3>
        <span class="follower-count">50K+ Jamaah</span>
      </div>
      <div class="social-gallery">
        <div class="thumb"></div>
        <div class="thumb"></div>
        <div class="thumb"></div>
      </div>
    </div>

    <!-- Contact Quick Card -->
    <div class="bento-item contact-card">
      <h3>Butuh Bantuan?</h3>
      <p>Konsultasi gratis 24/7 via WhatsApp.</p>
      <a href="#contact" class="btn-cta-small">Hubungi Kami</a>
    </div>

    <!-- Gallery / Experience -->
    <div class="bento-item feature-card accent-bg">
      <div class="feature-icon">⭐</div>
      <h3>Layanan VVIP</h3>
      <p>Fasilitas hotel premium di ring 1 pelataran Masjid.</p>
    </div>
  </div>
</div>

<style>
  .modern-hub {
    margin-top: 100px;
    opacity: 0;
    transform: translateY(20px);
    transition: all 1s ease-out;
  }

  .modern-hub.is-visible {
    opacity: 1;
    transform: translateY(0);
  }

  /* Specific Card Styles */
  .hero-card {
    background-color: var(--primary);
    color: white;
    justify-content: flex-end;
    position: relative;
  }

  .card-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url('https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&q=80&w=1200');
    background-size: cover;
    background-position: center;
    opacity: 0.4;
    transition: var(--transition-bounce);
  }
  
  .hero-card:hover .card-bg {
    transform: scale(1.1);
    opacity: 0.6;
  }

  .hero-card .content {
    position: relative;
    z-index: 2;
  }

  .badge {
    background: var(--accent);
    padding: 0.4rem 1rem;
    border-radius: 50px;
    font-size: 0.7rem;
    font-weight: 800;
    text-transform: uppercase;
    display: inline-block;
    margin-bottom: 1rem;
  }

  .text-glow {
    color: var(--accent);
    text-shadow: 0 0 20px rgba(217, 119, 6, 0.4);
  }

  .legality-card {
    background: #f8fafc;
    border: 1px solid #e2e8f0;
  }

  .icon-box {
    width: 40px;
    height: 40px;
    background: var(--primary);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 12px;
    font-weight: 800;
  }

  .link-more {
    font-size: 0.8rem;
    color: var(--primary);
    font-weight: 700;
    text-decoration: underline;
  }

  .social-card {
    background: #fff;
    border: 1px solid #eee;
  }

  .social-gallery {
    display: flex;
    gap: 10px;
    margin-top: 1rem;
  }

  .thumb {
    flex: 1;
    height: 80px;
    background: #f0f0f0;
    border-radius: 12px;
  }

  .accent-bg {
    background: var(--accent-soft);
    border: 1px solid var(--accent);
  }

  .feature-icon {
    font-size: 2rem;
    margin-bottom: 0.5rem;
  }

  .btn-cta-small {
    background: var(--primary);
    color: white;
    padding: 0.6rem 1rem;
    border-radius: 12px;
    font-size: 0.8rem;
    font-weight: 700;
    text-align: center;
    margin-top: 1rem;
  }

  @media (max-width: 768px) {
    .modern-hub {
      margin-top: 80px;
    }
  }
</style>
