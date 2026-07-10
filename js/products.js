/* SÖLO URB — catálogo da home
   Cada produto: id, marca, nome, preco (centavos), selo opcional, imagem.
   A equipe edita este arquivo para trocar os destaques da home. */

const PRODUTOS = {
  /* Só tênis: é o destino do card "Tênis" das categorias */
  lancamentos: [
    { id: 'nb-9060-blk',   marca: 'New Balance', nome: '9060 Black Castlerock',   preco: 129900, selo: 'novo',      img: 'assets/img/hero-nb9060.webp',    tamanhos: [38, 39, 40, 41, 42, 43] },
    { id: 'nb-530-wht',    marca: 'New Balance', nome: '530 White Silver',        preco: 74900,  selo: 'novo',      img: 'assets/img/nb530-warm.webp',     tamanhos: [35, 36, 37, 38, 39, 40] },
    { id: 'puma-speed-bg', marca: 'Puma',        nome: 'Speedcat OG Suede',       preco: 59900,  selo: 'novo',      img: 'assets/img/puma-suede-pink.webp', tamanhos: [35, 36, 37, 38, 39] },
    { id: 'nb-9060-wht',   marca: 'New Balance', nome: '9060 Triple White',       preco: 129900, selo: 'novo',      img: 'assets/img/nb-white-red.webp',   tamanhos: [35, 36, 37, 38, 39, 40, 41] },
    { id: 'lacoste-l003',  marca: 'Lacoste',     nome: 'L003 Neo Off-White',      preco: 89900,  selo: null,        img: 'assets/img/lacoste-cream.webp',  tamanhos: [39, 40, 41, 42, 43] },
    { id: 'nb-9060-sea',   marca: 'New Balance', nome: '9060 Sea Salt',           preco: 129900, selo: 'novo',      img: 'assets/img/nb9060-stack.webp',   tamanhos: [37, 38, 39, 40, 41] },
    { id: 'converse-ct70', marca: 'Converse',    nome: 'Chuck 70 Hi Parchment',   preco: 44900,  selo: null,        img: 'assets/img/converse-white.webp', tamanhos: [34, 35, 36, 37, 38, 39, 40] },
    { id: 'puma-speed-sd', marca: 'Puma',        nome: 'Speedcat Suede Sand',     preco: 59900,  selo: null,        img: 'assets/img/puma-beige-blue.webp', tamanhos: [34, 35, 36, 37, 38] },
  ],

  /* Só confecção: destino do card "Roupas" e do painel "Streetwear" do hero */
  roupas: [
    { id: 'deus-shirt',      marca: 'Deus Ex Machina', nome: 'Camisa Workwear Address', preco: 54900, selo: null,   img: 'assets/img/deus-workshirt.webp', tamanhos: ['P', 'M', 'G', 'GG'] },
    { id: 'columbia-anorak', marca: 'Columbia',        nome: 'Anorak Challenger',       preco: 79900, selo: 'novo', img: 'assets/img/columbia-blue.webp',  tamanhos: ['P', 'M', 'G', 'GG'] },
    { id: 'deus-hood',       marca: 'Deus Ex Machina', nome: 'Moletom São Paulo',       preco: 64900, selo: null,   img: 'assets/img/deus-hoodie.webp',    tamanhos: ['P', 'M', 'G', 'GG'] },
    { id: 'tee-madeni',      marca: 'Seleção Sölo',    nome: 'Camiseta Gráfica Off',    preco: 19900, selo: null,   img: 'assets/img/tee-graphic-off.webp', tamanhos: ['P', 'M', 'G'] },
  ],

  maisVendidos: [
    { id: 'nb-530-bed',      marca: 'New Balance', nome: '530 White Natural',     preco: 74900,  selo: 'maisvendido', img: 'assets/img/nb530-bed.webp',      tamanhos: [34, 35, 36, 37, 38, 39] },
    { id: 'casio-vintage',   marca: 'Casio',       nome: 'Vintage CA-53 Dourado', preco: 39900,  selo: 'maisvendido', img: 'assets/img/casio-calc-gold.webp', tamanhos: null },
    { id: 'nb-990-blk',      marca: 'New Balance', nome: '990 Black Grey',        preco: 169900, selo: 'maisvendido', img: 'assets/img/nb-premium-black.webp', tamanhos: [39, 40, 41, 42, 43, 44] },
    { id: 'puma-speed-bk',   marca: 'Puma',        nome: 'Speedcat OG Black',     preco: 59900,  selo: null,          img: 'assets/img/puma-black-pink.webp', tamanhos: [38, 39, 40, 41, 42] },
    { id: 'lacoste-court',   marca: 'Lacoste',     nome: 'Court Cage Off-White',  preco: 79900,  selo: null,          img: 'assets/img/lacoste-blue.webp',   tamanhos: [38, 39, 40, 41, 42] },
    { id: 'casio-mesh',      marca: 'Casio',       nome: 'AQ-800 Mesh Prata',     preco: 34900,  selo: 'maisvendido', img: 'assets/img/casio-mesh.webp',     tamanhos: null },
    { id: 'nb-9060-grey',    marca: 'New Balance', nome: '9060 Rain Cloud',       preco: 129900, selo: 'ultimas',     img: 'assets/img/nb9060-grey-hand.webp', tamanhos: [40, 41, 42] },
    { id: 'casio-a158-gold', marca: 'Casio',       nome: 'Vintage A158 Dourado',  preco: 44900,  selo: null,          img: 'assets/img/gold-casios.webp',    tamanhos: null },
  ],

  relogios: [
    { id: 'gshock-trio',   marca: 'G-Shock', nome: 'Linha GM Steel',          preco: 129900, selo: null,        img: 'assets/img/gshock-trio.webp' },
    { id: 'casio-diver',   marca: 'Casio',   nome: 'Duro Marlin Green Dial',  preco: 49900,  selo: 'selecao',   img: 'assets/img/watch-green-dark.webp' },
    { id: 'gshock-gm2100', marca: 'G-Shock', nome: 'GM-2100 Full Metal',      preco: 149900, selo: 'exclusivo', img: 'assets/img/gshock-hand.webp' },
    { id: 'casio-aq800',   marca: 'Casio',   nome: 'AQ-800 Blue Steel',       preco: 34900,  selo: null,        img: 'assets/img/casio-green-denim.webp' },
    { id: 'casio-duro-vd', marca: 'Casio',   nome: 'Duro Marlin Verde',       preco: 49900,  selo: 'selecao',   img: 'assets/img/watch-orange.webp' },
    { id: 'casio-duo',     marca: 'Casio',   nome: 'Vintage Duo Prata',       preco: 32900,  selo: null,        img: 'assets/img/wrists-duo.webp' },
  ],
};

const SELOS = {
  novo:        { rotulo: 'Novo',           classe: 'selo--novo' },
  exclusivo:   { rotulo: 'Exclusivo Sölo', classe: 'selo--exclusivo' },
  selecao:     { rotulo: 'Seleção Sölo',   classe: 'selo--selecao' },
  maisvendido: { rotulo: 'Mais vendido',   classe: 'selo--maisvendido' },
  ultimas:     { rotulo: 'Últimas unidades', classe: 'selo--ultimas' },
};

/* Índice por id, usado pela sacola e pelos favoritos */
const CATALOGO = {};
Object.values(PRODUTOS).flat().forEach((p) => { CATALOGO[p.id] = p; });

const fmtBRL = (centavos) =>
  (centavos / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 0, maximumFractionDigits: 0 });

const fmtParcela = (centavos) => {
  const parcela = centavos / 100 / 12;
  return `12x de ${parcela.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`;
};

const fmtPix = (centavos) => fmtBRL(Math.round(centavos * 0.95));

function cardProduto(p) {
  const selo = p.selo ? SELOS[p.selo] : null;
  return `
    <article class="card" data-id="${p.id}">
      <a class="card__media" href="#produto-${p.id}" aria-label="${p.marca} ${p.nome}">
        <img src="${p.img}" alt="${p.marca} ${p.nome}" loading="lazy" width="353" height="426">
        ${selo ? `<span class="selo ${selo.classe}">${selo.rotulo}</span>` : ''}
      </a>
      <button class="card__fav" type="button" aria-pressed="false" aria-label="Favoritar ${p.nome}">
        <svg viewBox="0 0 24 24" width="19" height="19" aria-hidden="true"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </button>
      <div class="card__info">
        <span class="card__marca">${p.marca}</span>
        <h3 class="card__nome">${p.nome}</h3>
        <p class="card__preco"><strong>${fmtBRL(p.preco)}</strong> <span class="card__pix">${fmtPix(p.preco)} no Pix</span></p>
        <p class="card__parcela">${fmtParcela(p.preco)}</p>
      </div>
      <button class="card__add" type="button" data-add="${p.id}">Adicionar à sacola</button>
    </article>`;
}

function renderLista(seletor, lista) {
  const el = document.querySelector(seletor);
  if (el) el.innerHTML = lista.map(cardProduto).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  renderLista('#rail-lancamentos', PRODUTOS.lancamentos);
  renderLista('#grade-roupas', PRODUTOS.roupas);
  renderLista('#grade-maisvendidos', PRODUTOS.maisVendidos);
  renderLista('#grade-relogios', PRODUTOS.relogios);
});
