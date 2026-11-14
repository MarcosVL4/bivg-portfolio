/* ============================================================
   BIVG Portfolio — main.js
   Scroll reveal · Navbar effect · Mobile menu
   ============================================================ */

(function () {
  'use strict';

  /* ── Navbar scroll effect ──────────────────────────────────── */
  const nav = document.querySelector('.nav');
  if (nav) {
    const onScroll = () => {
      nav.classList.toggle('scrolled', window.scrollY > 40);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ── Mobile hamburger menu ─────────────────────────────────── */
  const burger = document.querySelector('.nav__burger');
  const mobileMenu = document.querySelector('.nav__mobile');
  if (burger && mobileMenu) {
    const closeMenu = () => {
      burger.classList.remove('open');
      mobileMenu.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
      burger.setAttribute('aria-label', 'Abrir menú');
    };

    burger.addEventListener('click', () => {
      const isOpen = burger.classList.toggle('open');
      mobileMenu.classList.toggle('open', isOpen);
      burger.setAttribute('aria-expanded', String(isOpen));
      burger.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
    });

    // Close when a link is clicked
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && burger.classList.contains('open')) {
        closeMenu();
        burger.focus();
      }
    });
  }

  /* ── Scroll reveal (IntersectionObserver) ───────────────────── */
  const revealElements = document.querySelectorAll('.reveal, .reveal-right');
  if (revealElements.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            // Stagger delay based on sibling index within parent
            const siblings = Array.from(entry.target.parentElement.children);
            const idx = siblings.indexOf(entry.target);
            const delay = Math.min(idx * 80, 400);
            setTimeout(() => {
              entry.target.classList.add('visible');
            }, delay);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    revealElements.forEach(el => observer.observe(el));
  }

  /* ── Filter pills (dashboard pages) ─────────────────────────── */
  document.querySelectorAll('.filter-pill').forEach(pill => {
    pill.setAttribute('aria-pressed', String(pill.classList.contains('active')));
    pill.addEventListener('click', function () {
      const group = this.closest('.topbar__controls');
      if (!group) return;
      group.querySelectorAll('.filter-pill').forEach(p => {
        p.classList.remove('active');
        p.setAttribute('aria-pressed', 'false');
      });
      this.classList.add('active');
      this.setAttribute('aria-pressed', 'true');
    });
  });

  /* ── Formulario de contacto ─────────────────────────────────── */
  // Sin JS, el formulario va solo a gastos.bivg.es/api/contacto-web y vuelve
  // con ?contacto=ok|error. Con JS se manda por fetch y se queda aquí.
  const form = document.getElementById('form-contacto');
  if (form) {
    const estado = form.querySelector('.form-contacto__estado');
    const boton = form.querySelector('button[type="submit"]');
    const t = form.querySelector('input[name="t"]');
    if (t) t.value = String(Date.now());

    const decir = (texto, tipo) => {
      estado.textContent = texto;
      estado.className = 'form-contacto__estado' + (tipo ? ' ' + tipo : '');
    };

    const vuelta = new URLSearchParams(location.search).get('contacto');
    if (vuelta === 'ok') decir('Mensaje enviado. Te contesto pronto.', 'ok');
    else if (vuelta === 'error') decir('No se ha podido enviar. Prueba otra vez o escríbeme al email.', 'error');

    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      let primero = null;
      form.querySelectorAll('input[required], textarea[required]').forEach((campo) => {
        const malo = !campo.checkValidity();
        campo.setAttribute('aria-invalid', String(malo));
        if (malo && !primero) primero = campo;
      });
      if (primero) {
        decir(primero.type === 'checkbox'
          ? 'Marca la casilla para poder contestarte.'
          : 'Revisa los campos marcados en rojo.', 'error');
        primero.focus();
        return;
      }

      boton.disabled = true;
      decir('Enviando…');
      try {
        const res = await fetch(form.action, {
          method: 'POST',
          body: new URLSearchParams(new FormData(form)),
          headers: { Accept: 'application/json' },
        });
        const datos = await res.json().catch(() => ({}));
        if (res.ok && datos.ok) {
          form.reset();
          if (t) t.value = String(Date.now());
          decir('Mensaje enviado. Te contesto pronto.', 'ok');
        } else {
          decir(datos.error || 'No se ha podido enviar. Prueba otra vez o escríbeme al email.', 'error');
        }
      } catch {
        decir('No se ha podido enviar. Prueba otra vez o escríbeme al email.', 'error');
      } finally {
        boton.disabled = false;
      }
    });
  }

  /* ── Footer year ────────────────────────────────────────────── */
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

})();
