    // Product data
    window.productData = {
      'Wooden Blinds': {
        subtitle: 'Natural warmth meets precision engineering. Our Wooden Blinds are crafted from sustainably sourced hardwoods, offering timeless elegance with exceptional light control.',
        features: ['Sustainably sourced hardwood slats', 'Custom sizing from 25cm to 300cm width', 'Available in 30+ finishes and stains', 'UV-resistant coating for lasting colour', 'Easy-clean, warp-resistant construction', 'Compatible with motorisation / smart home']
      },
      'Honeycomb Blinds': {
        subtitle: 'A marvel of engineering: our Honeycomb Blinds trap air within hexagonal cells, providing superior thermal insulation while maintaining an ultra-clean aesthetic.',
        features: ['Triple-cell honeycomb structure for max insulation', 'Available in light-filtering and blackout options', 'Energy Star certified fabrics', 'Top-down / bottom-up operation available', 'Cordless and motorised options', 'Available in 120+ colours']
      },
      'Shangri-La Blinds': {
        subtitle: 'The pinnacle of elegance — our Shangri-La collection layers alternating sheer and opaque fabric bands to create a dreamy transition between light and privacy.',
        features: ['Alternating sheer and opaque fabric bands', 'Infinite adjustment for precise light control', 'Silk-like lustre without silk\'s fragility', 'Available in single or dual rollers', 'Wide-format options up to 3.5m', 'All fabrics fire-retardant certified']
      },
      'Zebra Blinds': {
        subtitle: 'Bold aesthetics meet flexible function. Zebra Blinds use alternating solid and sheer stripes that can be aligned for privacy or offset for diffused light.',
        features: ['Alternating opaque and transparent stripes', 'Align or offset for instant privacy toggle', 'Available in 60+ colour combinations', 'Day & Night vision control', 'Motorisation compatible', 'Easy DIY installation kit included']
      },
      'Screen Blinds': {
        subtitle: 'Designed for views: Screen Blinds reduce glare while preserving your outside vista, making them ideal for offices and rooms with beautiful landscapes.',
        features: ['1% – 14% openness factors available', 'Reduces glare up to 95%', 'Maintains outward views at all times', 'UV protection up to 90%', 'PVC-free, eco-friendly fabrics available', 'Ideal for commercial spaces']
      },
      'Blackout Blinds': {
        subtitle: 'Total darkness on demand. Our Blackout Blinds are engineered for complete light elimination — perfect for bedrooms, home theatres, and nurseries.',
        features: ['99.99% light blockage guaranteed', 'Side-channel system for zero light gaps', 'Thermal and acoustic benefits included', 'Moisture-resistant for bathrooms', 'Available in 80+ colours', 'Child-safe cordless operation']
      },
      'Translucent Blinds': {
        subtitle: 'Soft, diffused luminosity — our Translucent Blinds transform harsh sunlight into a warm, glowing ambience while maintaining gentle privacy.',
        features: ['Soft-filtering fabric transforms harsh light', 'Maintains privacy without blocking daylight', 'Available in 45 muted and vibrant tones', 'Anti-static coating repels dust', 'Seamless cassette housing option', 'Eco-certified recyclable fabrics']
      },
      'Roman Style Blinds': {
        subtitle: 'The classic sophistication of Roman Blinds reimagined in premium fabrics — flat-fold elegance that adds depth, warmth, and a tailored finish to any window.',
        features: ['Flat-fold, waterfall, and hobbled styles', 'Wide selection of premium woven fabrics', 'Bespoke lining options (blackout to interlining)', 'Hand-finished by master upholsterers', 'Available with contrasting border trims', 'Conservation-grade options for period homes']
      }
    };

    window.blogData = {
      'Transform Your Space': { title: 'Transform Your Space: How Window Blinds Influence Interior Design', date: '15 MARCH 2025 · INTERIOR DESIGN' },
      'Choose the Perfect Blinds': { title: 'How to Choose the Perfect Window Blinds for Every Room in Your Home', date: '15 JULY 2025 · BUYING GUIDE' },
      'Blind Trends 2025': { title: 'Top Window Blind Trends for Modern Interiors in 2025', date: '1 AUGUST 2025 · TRENDS' },
      'Smart Blinds Guide': { title: 'Smart Blinds: A Complete Guide to Motorised Window Treatments', date: '10 SEPTEMBER 2025 · TECHNOLOGY' },
      'Energy Savings': { title: 'How Energy-Efficient Blinds Can Reduce Your Electricity Bill', date: '20 OCTOBER 2025 · SUSTAINABILITY' },
      'Care Guide': { title: 'The Ultimate Guide to Cleaning and Maintaining Your Window Blinds', date: '5 NOVEMBER 2025 · MAINTENANCE' }
    };

    function renderBrandLogo() {
      document.querySelectorAll('.logo').forEach((logoEl) => {
        logoEl.innerHTML = `
          <img src="assets/viento-logo.jpg" alt="Viento Blinds logo" class="logo-image">
        `;
        logoEl.setAttribute('aria-label', 'Viento Blinds');
      });
    }

    window.navigate = function (page, data) {
      // Hide all pages
      document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));

      // Update product / blog if needed
      if (page === 'product' && data) {
        const pd = window.productData[data] || window.productData['Wooden Blinds'];
        document.getElementById('pd-title').textContent = data;
        document.getElementById('pd-subtitle').textContent = pd.subtitle;
        const features = pd.features;
        for (let i = 0; i < 6; i++) {
          const el = document.getElementById('pd-f' + (i + 1));
          if (el) el.textContent = features[i] || '';
        }
      }

      if (page === 'blogdetail' && data) {
        const bd = window.blogData[data] || window.blogData['Transform Your Space'];
        document.getElementById('bd-title').textContent = bd.title;
        document.getElementById('bd-date').textContent = bd.date;
      }

      const pageEl = document.getElementById('page-' + page);
      if (pageEl) {
        pageEl.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }

    // Features tabs
    window.showFeature = function (index, clickedTab) {
      document.querySelectorAll('.feature-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.feature-panel').forEach(p => p.classList.remove('active'));
      clickedTab.classList.add('active');
      document.querySelectorAll('.feature-panel')[index].classList.add('active');
    }

    // Scroll progress
    window.addEventListener('scroll', () => {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = (scrollTop / scrollHeight) * 100;
      const progressBar = document.getElementById('scrollProgress');
      if (progressBar) progressBar.style.width = progress + '%';
      const nav = document.getElementById('navbar');
      if (!nav) return;
      if (scrollTop > 20) nav.classList.add('scrolled');
      else nav.classList.remove('scrolled');
    });

    // Custom cursor
    const cursor = document.getElementById('cursor');
    const cursorRing = document.getElementById('cursorRing');
    document.addEventListener('mousemove', e => {
      if (!cursor || !cursorRing) return;
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
      cursorRing.style.left = e.clientX + 'px';
      cursorRing.style.top = e.clientY + 'px';
    });
    document.addEventListener('mousedown', () => {
      if (!cursor) return;
      cursor.style.transform = 'translate(-50%,-50%) scale(1.8)';
    });
    document.addEventListener('mouseup', () => {
      if (!cursor) return;
      cursor.style.transform = 'translate(-50%,-50%) scale(1)';
    });

    // Form submit
    window.submitForm = function () {
      const btn = document.querySelector('.contact-form .btn-primary');
      const success = document.getElementById('form-success');
      if (success) success.style.display = 'block';
      if (btn) { btn.textContent = 'Message Sent ✓'; btn.style.background = 'var(--gold)'; btn.style.color = 'var(--charcoal)'; }
    }

    // Mobile menu
    window.toggleMobileMenu = function () {
      const menu = document.querySelector('.nav-links');
      if (!menu) return;
      const isOpen = menu.getAttribute('data-open') === 'true';
      if (isOpen) {
        menu.removeAttribute('style');
        menu.removeAttribute('data-open');
      } else {
        menu.setAttribute('data-open', 'true');
        Object.assign(menu.style, {
          display: 'flex', flexDirection: 'column',
          position: 'fixed', top: '72px', left: '0', right: '0',
          background: 'var(--warm-white)', padding: '2rem',
          borderTop: '1px solid var(--border)', zIndex: '999',
          gap: '1.5rem', boxShadow: '0 20px 40px rgba(0,0,0,0.08)'
        });
      }
    }

    // Swatch active state
    document.querySelectorAll('.swatch').forEach(s => {
      s.addEventListener('click', () => {
        document.querySelectorAll('.swatch').forEach(x => x.classList.remove('active'));
        s.classList.add('active');
      });
    });

    // Page entrance animation on load
    document.addEventListener('DOMContentLoaded', () => {
      renderBrandLogo();
      document.querySelector('#page-home').style.animation = 'fadeUp 0.8s ease forwards';
    });
