<script>
  let { 
    phoneNumber = '6281234567890', 
    message = 'Halo Anmar Binawisata, saya ingin bertanya tentang paket Umrah.' 
  } = $props();
</script>


<a 
  href="https://wa.me/{phoneNumber}?text={encodeURIComponent(message)}" 
  class="whatsapp-btn" 
  target="_blank" 
  rel="noopener noreferrer"
  aria-label="Contact via WhatsApp"
>
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.031 6.172c-2.32 0-4.518.892-6.193 2.512-1.675 1.621-2.597 3.775-2.597 6.064 0 1.29.284 2.553.845 3.707l-1.074 3.914 4.1-.96c1.1.56 2.32.85 3.56.85h.004c2.32 0 4.522-.892 6.196-2.512 1.675-1.621 2.597-3.776 2.597-6.064 0-2.289-.922-4.443-2.597-6.064-1.675-1.62-3.872-2.513-6.197-2.513zm-1.028 9.387l-1.164-.54c-.456-.21-.861-.795-.861-1.305v-2.43c0-.51.405-1.095.861-1.305l1.164-.54c.456-.21 1.215-.21 1.671 0l1.164.54c.456.21.861.795.861 1.305v2.43c0 .51-.405 1.095-.861 1.305l-1.164.54c-.456.21-1.215.21-1.671 0z"/>
  </svg>
  <span>Tanya Kami</span>
</a>

<style>
  .whatsapp-btn {
    position: fixed;
    bottom: 30px;
    right: 30px;
    background-color: #25d366;
    color: white;
    padding: 12px 24px;
    border-radius: 50px;
    display: flex;
    align-items: center;
    gap: 10px;
    font-weight: 600;
    box-shadow: 0 10px 25px rgba(37, 211, 102, 0.4);
    z-index: 999;
    transition: var(--transition-smooth);
  }

  .whatsapp-btn:hover {
    transform: scale(1.05) translateY(-5px);
    box-shadow: 0 15px 30px rgba(37, 211, 102, 0.5);
  }

  .whatsapp-btn svg {
    width: 24px;
    height: 24px;
  }

  @media (max-width: 768px) {
    .whatsapp-btn span {
      display: none;
    }
    .whatsapp-btn {
      padding: 15px;
      bottom: 20px;
      right: 20px;
    }
  }
</style>
