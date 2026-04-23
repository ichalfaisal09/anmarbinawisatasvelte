<script>
  const services = [
    { id: 'tentang', title: 'Tentang Kami', icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z', desc: 'Profil perusahaan dan visi misi kami.' },
    { id: 'legalitas', title: 'Legalitas', icon: 'M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z', desc: 'Izin resmi Kemenag dan dokumen operasional.' },
    { id: 'layanan', title: 'Layanan', icon: 'M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z', desc: 'Berbagai pilihan perjalanan ibadah.' },
    { id: 'paket', title: 'Paket Umrah', icon: 'M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zM10 4h4v2h-4V4zm10 15H4V8h16v11z', desc: 'Jadwal dan rincian harga paket terbaru.' },
    { id: 'rekening', title: 'Pembayaran', icon: 'M21 18v1c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V5c0-1.1.9-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .89-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z', desc: 'Informasi rekening resmi perusahaan.' },
    { id: 'instagram', title: 'Instagram', icon: 'M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4c0 3.2-2.6 5.8-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8C2 4.6 4.6 2 7.8 2zm-.2 2c-2 0-3.6 1.6-3.6 3.6v8.4c0 2 1.6 3.6 3.6 3.6h8.4c2 0 3.6-1.6 3.6-3.6V7.6c0-2-1.6-3.6-3.6-3.6H7.6zM12 7c2.8 0 5 2.2 5 5s-2.2 5-5 5-5-2.2-5-5 2.2-5 5-5zm0 2c-1.7 0-3 1.3-3 3s1.3 3 3 3 3-1.3 3-3-1.3-3-3-3zm5.2-.2c-.5 0-.8-.3-.8-.8s.3-.8.8-.8.8.3.8.8-.3.8-.8.8z', desc: 'Dokumentasi perjalanan jamaah kami.' },
    { id: 'kantor', title: 'Lokasi Kantor', icon: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z', desc: 'Alamat kantor pusat dan cabang kami.' }
  ];
</script>

<section id="services" class="section-padding services">
  <div class="container">
    <div class="section-header">
      <span class="subtitle">Layanan Unggulan</span>
      <h2>Navigasi <span class="text-gold">Informasi</span></h2>
      <p>Temukan informasi lengkap mengenai keberangkatan dan layanan kami melalui menu di bawah ini.</p>
    </div>

    <div class="services-grid">
      {#each services as service}
        <a href="#{service.id}" class="service-card glass">
          <div class="icon-wrap">
            <svg viewBox="0 0 24 24">
              <path d={service.icon} fill="currentColor" />
            </svg>
          </div>
          <h3>{service.title}</h3>
          <p>{service.desc}</p>
          <span class="arrow">→</span>
        </a>
      {/each}
    </div>
  </div>
</section>

<style>
  .services {
    background-color: var(--white);
  }

  .section-header {
    text-align: center;
    max-width: 600px;
    margin: 0 auto 60px;
  }

  .subtitle {
    color: var(--accent);
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    font-size: 0.8rem;
  }

  h2 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }

  .section-header p {
    color: var(--text-muted);
  }

  .services-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;
  }

  .service-card {
    padding: 3rem 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    border-radius: 8px;
    transition: var(--transition-smooth);
    position: relative;
    overflow: hidden;
  }

  .service-card:hover {
    transform: translateY(-10px);
    background: var(--primary);
    color: var(--white);
  }

  .icon-wrap {
    width: 60px;
    height: 60px;
    background-color: rgba(6, 78, 59, 0.1);
    color: var(--primary);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1.5rem;
    transition: var(--transition-smooth);
  }

  .service-card:hover .icon-wrap {
    background-color: var(--accent);
    color: var(--white);
  }

  .icon-wrap svg {
    width: 30px;
    height: 30px;
  }

  h3 {
    font-size: 1.4rem;
    margin-bottom: 1rem;
    transition: var(--transition-smooth);
  }

  .service-card:hover h3 {
    color: var(--white);
  }

  .service-card p {
    font-size: 0.9rem;
    color: var(--text-muted);
    transition: var(--transition-smooth);
  }

  .service-card:hover p {
    color: rgba(255, 255, 255, 0.7);
  }

  .arrow {
    margin-top: 1.5rem;
    font-size: 1.2rem;
    color: var(--accent);
    opacity: 0;
    transform: translateX(-10px);
    transition: var(--transition-smooth);
  }

  .service-card:hover .arrow {
    opacity: 1;
    transform: translateX(0);
  }
</style>
