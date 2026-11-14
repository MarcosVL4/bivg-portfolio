/* bivg.es — portada (ES y EN): relaciones del modelo en estrella y formulario. */
(function () {
  'use strict';

  const en = document.documentElement.lang === 'en';
  const T = en ? {
    enviado: 'Message sent. I will reply soon.',
    error: 'The message could not be sent. Try again or email me directly.',
    enviando: 'Sending…',
    revisa: 'Check the fields marked in red.',
    casilla: 'Tick the box so I can reply to you.',
    tope: 'Too many messages in a row. Try again later or email me directly.',
  } : {
    enviado: 'Mensaje enviado. Te contesto pronto.',
    error: 'No se ha podido enviar. Prueba otra vez o escríbeme al email.',
    enviando: 'Enviando…',
    revisa: 'Revisa los campos marcados en rojo.',
    casilla: 'Marca la casilla para poder contestarte.',
    tope: 'Demasiados mensajes seguidos. Prueba más tarde o escríbeme al email.',
  };

  /* ── Modelo en estrella: líneas de la tabla de hechos a cada dimensión ── */
  const modelo = document.querySelector('.modelo');
  if (modelo) {
    const svg = modelo.querySelector('.modelo__lineas');
    const hechos = modelo.querySelector('.tabla--hechos');
    const centro = (el, base) => {
      const r = el.getBoundingClientRect();
      return { x: r.left + r.width / 2 - base.left, y: r.top + r.height / 2 - base.top };
    };
    const dibujar = () => {
      const base = modelo.getBoundingClientRect();
      svg.setAttribute('viewBox', `0 0 ${base.width} ${base.height}`);
      const c = centro(hechos, base);
      svg.querySelectorAll('line').forEach((l) => {
        const dim = modelo.querySelector(`.tabla[data-dim="${l.dataset.a}"]`);
        if (!dim) return;
        const d = centro(dim, base);
        l.setAttribute('x1', c.x); l.setAttribute('y1', c.y);
        l.setAttribute('x2', d.x); l.setAttribute('y2', d.y);
      });
    };
    dibujar();
    if ('ResizeObserver' in window) new ResizeObserver(dibujar).observe(modelo);
    else window.addEventListener('resize', dibujar);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(dibujar);

    // Como en Power BI: al señalar una dimensión se resalta su relación.
    modelo.querySelectorAll('a.tabla').forEach((dim) => {
      const linea = svg.querySelector(`line[data-a="${dim.dataset.dim}"]`);
      const on = () => linea && linea.classList.add('activa');
      const off = () => linea && linea.classList.remove('activa');
      dim.addEventListener('mouseenter', on);
      dim.addEventListener('mouseleave', off);
      dim.addEventListener('focus', on);
      dim.addEventListener('blur', off);
    });
  }

  /* ── Formulario de contacto ─────────────────────────────────────────── */
  // Sin JS va solo a gastos.bivg.es/api/contacto-web y vuelve con
  // ?contacto=ok|error. Con JS se manda por fetch y se queda aquí.
  const form = document.getElementById('formulario');
  if (form) {
    const estado = form.querySelector('.estado');
    const boton = form.querySelector('button[type="submit"]');
    const t = form.querySelector('input[name="t"]');
    const marcarHora = () => { if (t) t.value = String(Date.now()); };
    marcarHora();

    const decir = (texto, tipo) => {
      estado.textContent = texto;
      estado.className = 'estado' + (tipo ? ' ' + tipo : '');
    };

    const vuelta = new URLSearchParams(location.search).get('contacto');
    if (vuelta === 'ok') decir(T.enviado, 'ok');
    else if (vuelta === 'error') decir(T.error, 'error');

    form.addEventListener('input', (e) => {
      if (e.target.getAttribute('aria-invalid') === 'true' && e.target.checkValidity()) {
        e.target.setAttribute('aria-invalid', 'false');
      }
    });

    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      let primero = null;
      form.querySelectorAll('[required]').forEach((campo) => {
        const malo = !campo.checkValidity();
        campo.setAttribute('aria-invalid', String(malo));
        if (malo && !primero) primero = campo;
      });
      if (primero) {
        decir(primero.type === 'checkbox' ? T.casilla : T.revisa, 'error');
        primero.focus();
        return;
      }

      boton.disabled = true;
      decir(T.enviando);
      try {
        const res = await fetch(form.action, {
          method: 'POST',
          body: new URLSearchParams(new FormData(form)),
          headers: { Accept: 'application/json' },
        });
        const datos = await res.json().catch(() => ({}));
        if (res.ok && datos.ok) {
          form.reset();
          marcarHora();
          decir(T.enviado, 'ok');
        } else if (res.status === 429) {
          decir(T.tope, 'error');
        } else {
          // Los mensajes del servidor van en castellano; en inglés, el genérico.
          decir((!en && datos.error) || T.error, 'error');
        }
      } catch {
        decir(T.error, 'error');
      } finally {
        boton.disabled = false;
      }
    });
  }

  const anio = document.getElementById('anio');
  if (anio) anio.textContent = String(new Date().getFullYear());
})();
