/* SÖLO URB — interações da home */

document.addEventListener('DOMContentLoaded', () => {

  /* ----- Barra de condições fixa: fechar ----- */
  const barra = document.querySelector('.beneficios-bar');
  barra?.querySelector('.beneficios-bar__fechar')?.addEventListener('click', () => {
    barra.hidden = true;
    document.body.style.paddingBottom = '0';
    const sac = document.querySelector('.sac-whats');
    if (sac) sac.style.bottom = '18px';
  });

  /* ----- Menu mobile ----- */
  const botaoMenu = document.querySelector('.topo__menu');
  const navMobile = document.getElementById('nav-mobile');
  if (botaoMenu && navMobile) {
    botaoMenu.addEventListener('click', () => {
      const aberto = botaoMenu.getAttribute('aria-expanded') === 'true';
      botaoMenu.setAttribute('aria-expanded', String(!aberto));
      botaoMenu.setAttribute('aria-label', aberto ? 'Abrir menu' : 'Fechar menu');
      navMobile.hidden = aberto;
    });
    navMobile.addEventListener('click', (e) => {
      if (e.target.closest('a')) {
        botaoMenu.setAttribute('aria-expanded', 'false');
        navMobile.hidden = true;
      }
    });
  }

  /* ----- Revelação no scroll ----- */
  const reduzMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revelaveis = document.querySelectorAll('.revela');
  if (!reduzMotion && 'IntersectionObserver' in window) {
    const observador = new IntersectionObserver((entradas) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          entrada.target.classList.add('is-visivel');
          observador.unobserve(entrada.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    revelaveis.forEach((el) => observador.observe(el));
  } else {
    revelaveis.forEach((el) => el.classList.add('is-visivel'));
  }

  /* ----- Parallax da empena (campanha 9060) ----- */
  const paralaxe = document.querySelector('[data-parallax]');
  if (paralaxe && !reduzMotion) {
    const secao = paralaxe.parentElement;
    let agendado = false;
    const mover = () => {
      const r = secao.getBoundingClientRect();
      if (r.bottom > 0 && r.top < window.innerHeight) {
        const progresso = (r.top + r.height / 2 - window.innerHeight / 2) / window.innerHeight;
        paralaxe.style.transform = `translateY(${(progresso * -70).toFixed(1)}px)`;
      }
      agendado = false;
    };
    window.addEventListener('scroll', () => {
      if (!agendado) { agendado = true; requestAnimationFrame(mover); }
    }, { passive: true });
    mover();
  }

  /* ----- Trilho de lançamentos: setas ----- */
  const rail = document.getElementById('rail-lancamentos');
  const passo = () => Math.round(rail.clientWidth * 0.8);
  document.querySelector('[data-rail-prev]')?.addEventListener('click', () => {
    rail.scrollBy({ left: -passo(), behavior: reduzMotion ? 'auto' : 'smooth' });
  });
  document.querySelector('[data-rail-next]')?.addEventListener('click', () => {
    rail.scrollBy({ left: passo(), behavior: reduzMotion ? 'auto' : 'smooth' });
  });

  /* ==========================================================
     Sacola e favoritos, com gaveta lateral
     ========================================================== */

  const CHAVE_FAV = 'solo-favoritos';
  const CHAVE_SACOLA = 'solo-sacola';

  const lerFavoritos = () => {
    try { const v = JSON.parse(localStorage.getItem(CHAVE_FAV)); return Array.isArray(v) ? v : []; }
    catch { return []; }
  };
  // chave da sacola: "id|tamanho" ("U" = tamanho único)
  const lerSacola = () => {
    try {
      const v = JSON.parse(localStorage.getItem(CHAVE_SACOLA));
      let mapa = {};
      if (Array.isArray(v)) v.forEach((id) => { mapa[id] = (mapa[id] || 0) + 1; });
      else if (v && typeof v === 'object') mapa = v;
      const migrado = {};
      Object.entries(mapa).forEach(([chave, qtd]) => {
        migrado[chave.includes('|') ? chave : `${chave}|U`] = qtd;
      });
      return migrado;
    } catch { return {}; }
  };

  let favoritos = lerFavoritos();
  let sacola = lerSacola();

  const gravar = () => {
    localStorage.setItem(CHAVE_FAV, JSON.stringify(favoritos));
    localStorage.setItem(CHAVE_SACOLA, JSON.stringify(sacola));
  };

  const badgeFav = document.querySelector('[data-fav-count]');
  const badgeSacola = document.querySelector('[data-cart-count]');
  const qtdSacola = () => Object.values(sacola).reduce((s, q) => s + q, 0);

  const atualizaBadges = () => {
    if (badgeFav) { badgeFav.textContent = favoritos.length; badgeFav.hidden = favoritos.length === 0; }
    if (badgeSacola) { const q = qtdSacola(); badgeSacola.textContent = q; badgeSacola.hidden = q === 0; }
  };

  const sincronizaCoracoes = () => {
    document.querySelectorAll('.card').forEach((card) => {
      const fav = card.querySelector('.card__fav');
      fav?.setAttribute('aria-pressed', String(favoritos.includes(card.dataset.id)));
    });
  };

  /* ----- Gaveta ----- */
  const gaveta = document.querySelector('[data-gaveta]');
  const gavetaFundo = document.querySelector('[data-gaveta-fundo]');
  const gavetaTitulo = document.querySelector('[data-gaveta-titulo]');
  const gavetaCorpo = document.querySelector('[data-gaveta-corpo]');
  const gavetaRodape = document.querySelector('[data-gaveta-rodape]');
  let gavetaModo = null; // 'sacola' | 'favoritos'

  const idDaChave = (chave) => chave.split('|')[0];
  const tamDaChave = (chave) => chave.split('|')[1] || 'U';
  const subtotal = () => Object.entries(sacola).reduce((s, [chave, q]) => {
    const p = CATALOGO[idDaChave(chave)];
    return s + (p ? p.preco * q : 0);
  }, 0);

  const adicionaNaSacola = (id, tam) => {
    const chave = `${id}|${tam}`;
    sacola[chave] = (sacola[chave] || 0) + 1;
    gravar();
    atualizaBadges();
  };

  const estadoVazio = (titulo, texto) => `
    <div class="gaveta__vazia">
      <p class="gaveta__vazia-titulo">${titulo}</p>
      <p>${texto}</p>
      <button class="botao botao--preto" type="button" data-gaveta-novidades>Ver novidades</button>
    </div>`;

  const renderSacola = () => {
    gavetaTitulo.textContent = `Sacola de compras (${qtdSacola()} ${qtdSacola() === 1 ? 'item' : 'itens'})`;
    const chaves = Object.keys(sacola).filter((chave) => CATALOGO[idDaChave(chave)]);
    if (!chaves.length) {
      gavetaCorpo.innerHTML = estadoVazio('Sua sacola está vazia.', 'Aproveite para ver o que acabou de chegar.');
      gavetaRodape.hidden = true;
      return;
    }
    gavetaCorpo.innerHTML = chaves.map((chave) => {
      const p = CATALOGO[idDaChave(chave)];
      const tam = tamDaChave(chave);
      return `
        <div class="gaveta-item" data-item="${chave}">
          <img src="${p.img}" alt="${p.marca} ${p.nome}" width="76" height="88">
          <div class="gaveta-item__info">
            <span class="gaveta-item__marca">${p.marca}</span>
            <span class="gaveta-item__nome">${p.nome}</span>
            <span class="gaveta-item__preco">${fmtBRL(p.preco)}${tam !== 'U' ? ` <em class="gaveta-item__tamsel">· Tam ${tam}</em>` : ''}</span>
            <div class="gaveta-item__acoes">
              <div class="qtd" aria-label="Quantidade">
                <button type="button" data-qtd-menos="${chave}" aria-label="Diminuir quantidade">−</button>
                <span>${sacola[chave]}</span>
                <button type="button" data-qtd-mais="${chave}" aria-label="Aumentar quantidade">+</button>
              </div>
              <button class="gaveta-item__remover" type="button" data-remover="${chave}">Remover</button>
            </div>
          </div>
        </div>`;
    }).join('');
    gavetaRodape.hidden = false;
    gavetaRodape.innerHTML = `
      <div class="gaveta__totais">
        <p><span>Subtotal</span><strong>${fmtBRL(subtotal())}</strong></p>
        <p class="gaveta__pix"><span>No Pix (5% off)</span><strong>${fmtPix(subtotal())}</strong></p>
      </div>
      <button class="botao botao--preto gaveta__finalizar" type="button" data-finalizar>Finalizar compra</button>
      <p class="gaveta__nota" data-nota-checkout hidden>O pagamento online entra na próxima fase. Por enquanto, finalize pelo WhatsApp ou nas lojas.</p>
      <p class="gaveta__nota">Frete grátis acima de R$ 599 · Até 12x nos cartões</p>`;
  };

  const renderFavoritos = () => {
    gavetaTitulo.textContent = `Favoritos (${favoritos.length})`;
    gavetaRodape.hidden = true;
    const ids = favoritos.filter((id) => CATALOGO[id]);
    if (!ids.length) {
      gavetaCorpo.innerHTML = estadoVazio('Você ainda não tem favoritos.', 'Toque no coração de um produto para guardar aqui.');
      return;
    }
    gavetaCorpo.innerHTML = ids.map((id) => {
      const p = CATALOGO[id];
      const escolha = p.tamanhos && p.tamanhos.length
        ? `<div class="gaveta-item__tams" role="group" aria-label="Escolha o tamanho">${p.tamanhos.map((t) => `<button type="button" class="chip" data-fav-tam="${id}|${t}">${t}</button>`).join('')}</div>`
        : `<button class="gaveta-item__mover" type="button" data-fav-sacola="${id}">Adicionar à sacola</button>`;
      return `
        <div class="gaveta-item" data-item="${id}">
          <img src="${p.img}" alt="${p.marca} ${p.nome}" width="76" height="88">
          <div class="gaveta-item__info">
            <span class="gaveta-item__marca">${p.marca}</span>
            <span class="gaveta-item__nome">${p.nome}</span>
            <span class="gaveta-item__preco">${fmtBRL(p.preco)}</span>
            ${escolha}
            <div class="gaveta-item__acoes">
              <button class="gaveta-item__remover" type="button" data-fav-remover="${id}">Remover</button>
            </div>
          </div>
        </div>`;
    }).join('');
  };

  const renderGaveta = () => {
    if (gavetaModo === 'sacola') renderSacola();
    else if (gavetaModo === 'favoritos') renderFavoritos();
  };

  const abrirGaveta = (modo) => {
    gavetaModo = modo;
    renderGaveta();
    gaveta.hidden = false;
    gavetaFundo.hidden = false;
    requestAnimationFrame(() => {
      gaveta.classList.add('is-aberta');
      gavetaFundo.classList.add('is-aberta');
    });
    document.body.style.overflow = 'hidden';
    gaveta.querySelector('[data-gaveta-fechar]')?.focus();
  };

  const fecharGaveta = () => {
    gaveta.classList.remove('is-aberta');
    gavetaFundo.classList.remove('is-aberta');
    document.body.style.overflow = '';
    const esconder = () => { gaveta.hidden = true; gavetaFundo.hidden = true; };
    if (reduzMotion) esconder(); else setTimeout(esconder, 300);
    gavetaModo = null;
  };

  document.querySelector('.topo__sacola')?.addEventListener('click', () => abrirGaveta('sacola'));
  document.querySelector('.topo__fav')?.addEventListener('click', () => abrirGaveta('favoritos'));
  document.querySelector('[data-abrir-favoritos]')?.addEventListener('click', (e) => {
    e.preventDefault();
    if (botaoMenu && navMobile) { botaoMenu.setAttribute('aria-expanded', 'false'); navMobile.hidden = true; }
    abrirGaveta('favoritos');
  });
  document.querySelector('[data-gaveta-fechar]')?.addEventListener('click', fecharGaveta);
  gavetaFundo?.addEventListener('click', fecharGaveta);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !gaveta.hidden) fecharGaveta();
  });

  /* ----- Ações dentro da gaveta ----- */
  gaveta?.addEventListener('click', (e) => {
    const mais = e.target.closest('[data-qtd-mais]');
    const menos = e.target.closest('[data-qtd-menos]');
    const remover = e.target.closest('[data-remover]');
    const favRemover = e.target.closest('[data-fav-remover]');
    const favSacola = e.target.closest('[data-fav-sacola]');
    const favTam = e.target.closest('[data-fav-tam]');
    const novidades = e.target.closest('[data-gaveta-novidades]');
    const finalizar = e.target.closest('[data-finalizar]');

    if (mais) sacola[mais.dataset.qtdMais] = (sacola[mais.dataset.qtdMais] || 0) + 1;
    if (menos) {
      const chave = menos.dataset.qtdMenos;
      sacola[chave] = (sacola[chave] || 0) - 1;
      if (sacola[chave] <= 0) delete sacola[chave];
    }
    if (remover) delete sacola[remover.dataset.remover];
    if (favRemover) favoritos = favoritos.filter((f) => f !== favRemover.dataset.favRemover);
    if (favSacola) {
      const chave = `${favSacola.dataset.favSacola}|U`;
      sacola[chave] = (sacola[chave] || 0) + 1;
      gavetaModo = 'sacola'; // mostra a sacola, como na Vans
    }
    if (favTam) {
      const chave = favTam.dataset.favTam;
      sacola[chave] = (sacola[chave] || 0) + 1;
      gavetaModo = 'sacola';
    }
    if (novidades) {
      fecharGaveta();
      document.getElementById('lancamentos')?.scrollIntoView({ behavior: reduzMotion ? 'auto' : 'smooth' });
      return;
    }
    if (finalizar) {
      const nota = gaveta.querySelector('[data-nota-checkout]');
      if (nota) nota.hidden = false;
      return;
    }
    if (mais || menos || remover || favRemover || favSacola || favTam) {
      gravar();
      atualizaBadges();
      sincronizaCoracoes();
      renderGaveta();
    }
  });

  /* ----- Ações nos cards (favoritar e adicionar) ----- */
  document.addEventListener('click', (e) => {
    const fav = e.target.closest('.card__fav');
    if (fav) {
      const id = fav.closest('.card').dataset.id;
      const ativo = favoritos.includes(id);
      favoritos = ativo ? favoritos.filter((f) => f !== id) : [...favoritos, id];
      gravar();
      atualizaBadges();
      sincronizaCoracoes();
      return;
    }
    // cliques no painel de tamanhos não devem navegar (ele vive dentro do link da foto)
    const painelTam = e.target.closest('.card__tamanhos');
    if (painelTam) e.preventDefault();

    // chip de tamanho no card: adiciona e abre a sacola
    const chipTam = e.target.closest('[data-card-tam]');
    if (chipTam) {
      const [id, tam] = chipTam.dataset.cardTam.split('|');
      adicionaNaSacola(id, tam);
      chipTam.closest('.card__tamanhos')?.remove();
      abrirGaveta('sacola');
      return;
    }

    const add = e.target.closest('[data-add]');
    if (add) {
      const id = add.dataset.add;
      const p = CATALOGO[id];
      const card = add.closest('.card');
      // sem grade de tamanhos (relógios, acessórios): direto pra sacola
      if (!p || !p.tamanhos || !p.tamanhos.length) {
        adicionaNaSacola(id, 'U');
        abrirGaveta('sacola'); // como na Vans: adicionar abre a sacola
        return;
      }
      // com grade: abre o seletor de numeração sobre a foto
      const aberto = card.querySelector('.card__tamanhos');
      if (aberto) { aberto.remove(); return; }
      const painel = document.createElement('div');
      painel.className = 'card__tamanhos';
      painel.innerHTML = `
        <p>Escolha o tamanho</p>
        <div class="card__tamanhos-chips">
          ${p.tamanhos.map((t) => `<button type="button" class="chip" data-card-tam="${id}|${t}">${t}</button>`).join('')}
        </div>`;
      card.querySelector('.card__media').appendChild(painel);
    }
  });

  atualizaBadges();
  sincronizaCoracoes();

  /* ----- Newsletter ----- */
  const form = document.querySelector('[data-news]');
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    form.hidden = true;
    document.querySelector('[data-news-ok]').hidden = false;
  });
});
