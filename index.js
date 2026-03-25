/* ═══════════════════════════════════════════════
   AlignData — index.js
   Mapa mundial · Stepper D360° · Countdown · Ticker · Reveal · Timeline
   ═══════════════════════════════════════════════ */

/* ── MAPA MUNDIAL ─────────────────────────────── */
(function () {
  const adCountryData = {
    "Austria":{cat:"eu",law:"RGPD / DSG",dpa:"Datenschutzbehörde (DSB)",web:"https://www.dsb.gv.at"},"Belgium":{cat:"eu",law:"RGPD / Loi du 30 juillet 2018",dpa:"Autorité de protection des données (APD)",web:"https://www.dataprotectionauthority.be"},"Bulgaria":{cat:"eu",law:"RGPD / PDPA",dpa:"Commission for Personal Data Protection (CPDP)",web:"https://www.cpdp.bg"},"Croatia":{cat:"eu",law:"RGPD / ZZOP",dpa:"Agencija za zaštitu osobnih podataka (AZOP)",web:"https://azop.hr"},"Cyprus":{cat:"eu",law:"RGPD / Law 125(I)/2018",dpa:"Commissioner for Personal Data Protection",web:"http://www.dataprotection.gov.cy"},"Czech Republic":{cat:"eu",law:"RGPD / Act No. 110/2019",dpa:"Úřad pro ochranu osobních údajů (UOOU)",web:"https://www.uoou.cz"},"Denmark":{cat:"eu",law:"RGPD / Databeskyttelsesloven",dpa:"Datatilsynet",web:"https://www.datatilsynet.dk"},"Estonia":{cat:"eu",law:"RGPD / Isikuandmete kaitse seadus",dpa:"Andmekaitse Inspektsioon (AKI)",web:"https://www.aki.ee"},"Finland":{cat:"eu",law:"RGPD / Tietosuojalaki",dpa:"Tietosuojavaltuutetun toimisto",web:"https://tietosuoja.fi"},"France":{cat:"eu",law:"RGPD / Loi Informatique et Libertés",dpa:"Commission Nationale de l'Informatique et des Libertés (CNIL)",web:"https://www.cnil.fr"},"Germany":{cat:"eu",law:"RGPD / BDSG",dpa:"Der Bundesbeauftragte für den Datenschutz (BfDI)",web:"https://www.bfdi.bund.de"},"Greece":{cat:"eu",law:"RGPD / L. 4624/2019",dpa:"Hellenic Data Protection Authority (HDPA)",web:"https://www.dpa.gr"},"Hungary":{cat:"eu",law:"RGPD / Infotv.",dpa:"Nemzeti Adatvédelmi és Információszabadság Hatóság (NAIH)",web:"https://www.naih.hu"},"Ireland":{cat:"eu",law:"RGPD / Data Protection Act 2018",dpa:"Data Protection Commission (DPC)",web:"https://www.dataprotection.ie"},"Italy":{cat:"eu",law:"RGPD / Codice Privacy",dpa:"Garante per la protezione dei dati personali",web:"https://www.garanteprivacy.it"},"Latvia":{cat:"eu",law:"RGPD / PDPL",dpa:"Datu Valsts Inspekcija (DVI)",web:"https://www.dvi.gov.lv"},"Lithuania":{cat:"eu",law:"RGPD / ADTAĮ",dpa:"Valstybinė duomenų apsaugos inspekcija (VDAI)",web:"https://vdai.lrv.lt"},"Luxembourg":{cat:"eu",law:"RGPD / Loi du 1er août 2018",dpa:"Commission Nationale pour la Protection des Données (CNPD)",web:"https://cnpd.public.lu"},"Malta":{cat:"eu",law:"RGPD / Data Protection Act",dpa:"Information and Data Protection Commissioner (IDPC)",web:"https://idpc.org.mt"},"Netherlands":{cat:"eu",law:"RGPD / Uitvoeringswet AVG",dpa:"Autoriteit Persoonsgegevens (AP)",web:"https://www.autoriteitpersoonsgegevens.nl"},"Poland":{cat:"eu",law:"RGPD / Ustawa o ochronie danych osobowych",dpa:"Urząd Ochrony Danych Osobowych (UODO)",web:"https://uodo.gov.pl"},"Portugal":{cat:"eu",law:"RGPD / Lei n.º 58/2019",dpa:"Comissão Nacional de Proteção de Dados (CNPD)",web:"https://www.cnpd.pt"},"Romania":{cat:"eu",law:"RGPD / Legea nr. 190/2018",dpa:"Autoritatea Națională de Supraveghere (ANSPDCP)",web:"https://www.dataprotection.ro"},"Slovakia":{cat:"eu",law:"RGPD / Zákon č. 18/2018",dpa:"Úrad na ochranu osobných údajov SR",web:"https://dataprotection.gov.sk"},"Slovenia":{cat:"eu",law:"RGPD / ZVOP-2",dpa:"Informacijski pooblaščenec (IP)",web:"https://www.ip-rs.si"},"Spain":{cat:"eu",law:"RGPD / LOPDGDD",dpa:"Agencia Española de Protección de Datos (AEPD)",web:"https://www.aepd.es"},"Sweden":{cat:"eu",law:"RGPD / Dataskyddslagen",dpa:"Integritetsskyddsmyndigheten (IMY)",web:"https://www.imy.se"},"Iceland":{cat:"eu",law:"RGPD / EEE",dpa:"Persónuvernd",web:"https://www.personuvernd.is"},"Norway":{cat:"eu",law:"RGPD / Personopplysningsloven",dpa:"Datatilsynet",web:"https://www.datatilsynet.no"},"Liechtenstein":{cat:"eu",law:"RGPD / DSG",dpa:"Datenschutzstelle (DSS)",web:"https://www.datenschutzstelle.li"},"United Kingdom":{cat:"adequate",law:"UK GDPR / Data Protection Act 2018",dpa:"Information Commissioner's Office (ICO)",web:"https://ico.org.uk",adequate:"Decisión de adecuación UE adoptada en junio 2021"},"Switzerland":{cat:"adequate",law:"Loi fédérale sur la protection des données (LPD)",dpa:"Préposé fédéral à la protection des données (PFPDT)",web:"https://www.edoeb.admin.ch",adequate:"Reconocido como adecuado por la UE"},"Canada":{cat:"adequate",law:"PIPEDA / Loi 25 (Quebec)",dpa:"Office of the Privacy Commissioner of Canada (OPC)",web:"https://www.priv.gc.ca",adequate:"Decisión de adecuación UE — sector comercial"},"Japan":{cat:"adequate",law:"Act on the Protection of Personal Information (APPI)",dpa:"Personal Information Protection Commission (PPC)",web:"https://www.ppc.go.jp",adequate:"Decisión de adecuación UE adoptada en enero 2019"},"South Korea":{cat:"adequate",law:"Personal Information Protection Act (PIPA)",dpa:"Personal Information Protection Commission (PIPC)",web:"https://www.pipc.go.kr",adequate:"Decisión de adecuación UE adoptada en diciembre 2021"},"New Zealand":{cat:"adequate",law:"Privacy Act 2020",dpa:"Office of the Privacy Commissioner (OPC)",web:"https://www.privacy.org.nz",adequate:"Reconocido como adecuado por la UE"},"Israel":{cat:"adequate",law:"Protection of Privacy Law 5741-1981",dpa:"Privacy Protection Authority (PPA)",web:"https://www.gov.il/en/departments/the_privacy_protection_authority",adequate:"Reconocido como adecuado por la UE"},"Uruguay":{cat:"adequate",law:"Ley N° 18.331 de Protección de Datos Personales",dpa:"Unidad Reguladora y de Control de Datos Personales (URCDP)",web:"https://www.gub.uy/unidad-reguladora-control-datos-personales",adequate:"Primer país de América Latina con decisión de adecuación UE (2012)"},"United States":{cat:"adequate",law:"Data Privacy Framework (DPF) / CCPA / HIPAA",dpa:"Federal Trade Commission (FTC)",web:"https://www.ftc.gov",adequate:"Decisión de adecuación UE adoptada julio 2023"},"Argentina":{cat:"adequate",law:"Ley 25.326 de Protección de Datos Personales",dpa:"Agencia de Acceso a la Información Pública (AAIP)",web:"https://www.argentina.gob.ar/aaip",adequate:"Reconocido como adecuado por la UE"},"Andorra":{cat:"adequate",law:"Llei 15/2003 de protecció de dades personals",dpa:"Agència Andorrana de Protecció de Dades (APDA)",web:"https://www.apda.ad",adequate:"Reconocido como adecuado por la UE"},"Chile":{cat:"independent",law:"Ley 19.628 / Ley 21.719 (vigente diciembre 2026)",dpa:"Agencia de Protección de Datos Personales (APDP) — en constitución",web:"https://www.bcn.cl/leychile/navegar?idNorma=141599",warning:"Chile tiene la Ley 21.719 vigente desde diciembre 2026. No garantiza nivel adecuado UE aún.",highlight:true},"Mexico":{cat:"independent",law:"Ley Federal de Protección de Datos Personales (LFPDPPP)",dpa:"Instituto Nacional de Transparencia (INAI)",web:"https://home.inai.org.mx",warning:"No garantiza nivel adecuado UE."},"Brazil":{cat:"independent",law:"Lei Geral de Proteção de Dados (LGPD) — Lei nº 13.709/2018",dpa:"Autoridade Nacional de Proteção de Dados (ANPD)",web:"https://www.gov.br/anpd",adequate:"Brasil y UE adoptaron decisiones mutuas de adecuación en 2025"},"Colombia":{cat:"independent",law:"Ley Estatutaria 1581 de 2012",dpa:"Superintendencia de Industria y Comercio (SIC)",web:"https://www.sic.gov.co",warning:"No garantiza nivel adecuado UE."},"Peru":{cat:"independent",law:"Ley N° 29733 de Protección de Datos Personales",dpa:"Autoridad Nacional de Protección de Datos Personales (ANPDP)",web:"https://www.minjus.gob.pe/proteccion-de-datos-personales",warning:"No garantiza nivel adecuado UE."},"Ecuador":{cat:"independent",law:"Ley Orgánica de Protección de Datos Personales (LOPDP) — 2021",dpa:"Superintendencia de Protección de Datos Personales",web:"https://www.superintendenciadedatos.gob.ec",warning:"No garantiza nivel adecuado UE."},"Australia":{cat:"independent",law:"Privacy Act 1988 (amended 2022)",dpa:"Office of the Australian Information Commissioner (OAIC)",web:"https://www.oaic.gov.au",warning:"No garantiza nivel adecuado UE."},"India":{cat:"independent",law:"Digital Personal Data Protection Act 2023 (DPDPA)",dpa:"Data Protection Board of India (en constitución)",web:"https://www.meity.gov.in",warning:"No garantiza nivel adecuado UE."},"Singapore":{cat:"independent",law:"Personal Data Protection Act 2012 (PDPA)",dpa:"Personal Data Protection Commission (PDPC)",web:"https://www.pdpc.gov.sg",warning:"No garantiza nivel adecuado UE."},"South Africa":{cat:"independent",law:"Protection of Personal Information Act (POPIA)",dpa:"Information Regulator (South Africa)",web:"https://www.justice.gov.za/inforeg",warning:"No garantiza nivel adecuado UE."},"Russia":{cat:"independent",law:"Federal Law No. 152-FZ on Personal Data (2006)",dpa:"Roskomnadzor",web:"https://rkn.gov.ru",warning:"No garantiza nivel adecuado UE."},"Turkey":{cat:"independent",law:"Kişisel Verilerin Korunması Kanunu (KVKK)",dpa:"Kişisel Verileri Koruma Kurumu (KVKK)",web:"https://www.kvkk.gov.tr",warning:"No garantiza nivel adecuado UE."},"China":{cat:"independent",law:"Personal Information Protection Law (PIPL) — 2021",dpa:"Cyberspace Administration of China (CAC)",web:"https://www.cac.gov.cn",warning:"No garantiza nivel adecuado UE. Restricciones a transferencias internacionales."},"Saudi Arabia":{cat:"law",law:"Personal Data Protection Law (PDPL) — 2021",dpa:"National Data Management Office (NDMO)",web:"https://ndmo.gov.sa"},"Vietnam":{cat:"law",law:"Decree No. 13/2023/ND-CP on Personal Data Protection",dpa:"Ministry of Public Security — A05 Department",web:""},"Nigeria":{cat:"independent",law:"Nigeria Data Protection Act 2023 (NDPA)",dpa:"Nigeria Data Protection Commission (NDPC)",web:"https://ndpc.gov.ng",warning:"No garantiza nivel adecuado UE."},"Kenya":{cat:"independent",law:"Data Protection Act 2019",dpa:"Office of the Data Protection Commissioner (ODPC)",web:"https://www.odpc.go.ke",warning:"No garantiza nivel adecuado UE."}
  };
  const adIso2name = {
    "040":"Austria","056":"Belgium","100":"Bulgaria","191":"Croatia","196":"Cyprus","203":"Czech Republic","208":"Denmark","233":"Estonia","246":"Finland","250":"France","276":"Germany","300":"Greece","348":"Hungary","372":"Ireland","380":"Italy","428":"Latvia","440":"Lithuania","442":"Luxembourg","470":"Malta","528":"Netherlands","616":"Poland","620":"Portugal","642":"Romania","703":"Slovakia","705":"Slovenia","724":"Spain","752":"Sweden","352":"Iceland","578":"Norway","438":"Liechtenstein","826":"United Kingdom","756":"Switzerland","124":"Canada","392":"Japan","410":"South Korea","554":"New Zealand","376":"Israel","858":"Uruguay","840":"United States","032":"Argentina","020":"Andorra","152":"Chile","484":"Mexico","076":"Brazil","170":"Colombia","604":"Peru","036":"Australia","356":"India","702":"Singapore","710":"South Africa","504":"Morocco","566":"Nigeria","404":"Kenya","643":"Russia","792":"Turkey","156":"China","682":"Saudi Arabia","704":"Vietnam","218":"Ecuador","068":"Bolivia","862":"Venezuela","320":"Guatemala","340":"Honduras","188":"Costa Rica","591":"Panama","600":"Paraguay","214":"Dominican Republic","192":"Cuba","398":"Kazakhstan","496":"Mongolia","784":"United Arab Emirates","634":"Qatar","414":"Kuwait","512":"Oman","048":"Bahrain","364":"Iran","368":"Iraq","760":"Syria","422":"Lebanon","400":"Jordan","800":"Uganda","834":"Tanzania","024":"Angola","508":"Mozambique","516":"Namibia","426":"Lesotho","748":"Eswatini","072":"Botswana","454":"Malawi","894":"Zambia","716":"Zimbabwe","231":"Ethiopia","706":"Somalia","729":"Sudan","012":"Algeria","434":"Libya","788":"Tunisia","686":"Senegal","288":"Ghana","384":"Ivory Coast","120":"Cameroon","180":"DR Congo","178":"Congo","266":"Gabon","226":"Equatorial Guinea","132":"Cape Verde","480":"Mauritius","458":"Malaysia","608":"Philippines","764":"Thailand","360":"Indonesia","116":"Cambodia","418":"Laos","104":"Myanmar","524":"Nepal","050":"Bangladesh","144":"Sri Lanka","586":"Pakistan","004":"Afghanistan","408":"North Korea","498":"Moldova","807":"North Macedonia","008":"Albania","688":"Serbia","070":"Bosnia and Herzegovina","499":"Montenegro","804":"Ukraine","268":"Georgia","051":"Armenia","031":"Azerbaijan","860":"Uzbekistan","112":"Belarus","558":"Nicaragua","222":"El Salvador","084":"Belize","780":"Trinidad and Tobago","388":"Jamaica","332":"Haiti","275":"Palestine"
  };
  const adCatColor = { eu:"#1a7a5e", adequate:"#2563EB", partial:"#7B68EE", independent:"#9B59B6", law:"#E67E22", none:"#2d3d55" };
  const adCatLabel = { eu:"País UE / EEE", adequate:"País adecuado (UE)", partial:"Parcialmente adecuado", independent:"Autoridad e leyes independientes", law:"Ley(es) de protección de datos", none:"Sin ley específica" };

  const mapEl = document.getElementById('ad-map');
  if (!mapEl) return;
  const W = mapEl.clientWidth || 800, H = 480;
  const svg = d3.select('#ad-map').append('svg').attr('width', '100%').attr('height', H);
  const g = svg.append('g');
  const projection = d3.geoNaturalEarth1().scale(W / 6.2).translate([W / 2, H / 2]);
  const path = d3.geoPath().projection(projection);
  const zoom = d3.zoom().scaleExtent([1, 8]).on('zoom', e => g.attr('transform', e.transform));
  svg.call(zoom);
  window.adZoomIn    = () => svg.transition().call(zoom.scaleBy, 1.5);
  window.adZoomOut   = () => svg.transition().call(zoom.scaleBy, 0.67);
  window.adZoomReset = () => svg.transition().call(zoom.transform, d3.zoomIdentity);

  d3.json('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json').then(world => {
    const countries = topojson.feature(world, world.objects.countries);
    g.selectAll('.ad-map-country').data(countries.features).join('path')
      .attr('class', 'ad-map-country')
      .attr('d', path)
      .attr('fill', d => {
        const id = String(d.id).padStart(3, '0');
        const name = adIso2name[id];
        const info = name ? adCountryData[name] : null;
        return info ? adCatColor[info.cat] : adCatColor.none;
      })
      .on('click', (event, d) => {
        d3.selectAll('.ad-map-country').classed('ad-selected', false);
        d3.select(event.currentTarget).classed('ad-selected', true);
        const id = String(d.id).padStart(3, '0');
        const name = adIso2name[id] || 'País desconocido';
        adShowInfo(name, adCountryData[name]);
      });
  });

  function adShowInfo(name, info) {
    const panel = document.getElementById('adMapInfo');
    if (!info) {
      panel.innerHTML = `<div class="ad-map-cname">${name}</div><span class="ad-map-badge" style="background:rgba(45,61,85,0.5);color:#8899aa;border:1px solid #2d3d55">Sin ley específica</span><div class="ad-map-val">No se ha identificado legislación específica.</div>`;
      return;
    }
    const color = adCatColor[info.cat], label = adCatLabel[info.cat];
    let html = `<div class="ad-map-cname">${name}${info.highlight ? ' 🇨🇱' : ''}</div><span class="ad-map-badge" style="background:${color}22;color:${color};border:1px solid ${color}44">${label}</span>`;
    if (info.adequate) html += `<div class="ad-map-adequate">✓ ${info.adequate}</div>`;
    if (info.warning)  html += `<div class="ad-map-warning">⚠ ${info.warning}</div>`;
    html += `<hr class="ad-map-divider">`;
    if (info.law) html += `<div class="ad-map-lbl">Legislación</div><div class="ad-map-val">${info.law}</div>`;
    if (info.dpa) html += `<div class="ad-map-lbl">Autoridad de Protección de Datos</div><div class="ad-map-val">${info.dpa}</div>`;
    if (info.web) html += `<div class="ad-map-lbl">Sitio web oficial</div><a class="ad-map-link" href="${info.web}" target="_blank" rel="noopener">${info.web}</a>`;
    panel.innerHTML = html;
  }

  window.adSearchCountry = function (val) {
    if (!val || val.length < 2) return;
    const q = val.toLowerCase();
    d3.selectAll('.ad-map-country').each(function (d) {
      const id = String(d.id).padStart(3, '0');
      const name = adIso2name[id];
      if (name && name.toLowerCase().includes(q)) {
        d3.selectAll('.ad-map-country').classed('ad-selected', false);
        d3.select(this).classed('ad-selected', true);
        adShowInfo(name, adCountryData[name]);
      }
    });
  };
})();


/* ── STEPPER D360° ────────────────────────────── */
var pcCur = 0;
var pcSteps = [
  {
    tag: '~30 días · 31–51 horas · Proyecto único',
    title: 'D360° Inicia',
    desc: 'Evaluación base de cumplimiento Ley 21.719. Kick-off con gerencia, assessment en 8 dimensiones (2–3 reuniones), análisis legal de hallazgos y entrega de dashboard ejecutivo con roadmap de adecuación 3–12 meses.',
    chips: [{t:'8 dimensiones',c:'#2563EB'},{t:'Dashboard ejecutivo',c:'#2563EB'},{t:'Informe + roadmap',c:'#2563EB'},{t:'31–51 h',c:'#2563EB'}],
    iconBg: 'rgba(37,99,235,0.15)',
    iconSvg: '<svg width="32" height="32" viewBox="0 0 32 32" fill="none"><circle cx="14" cy="14" r="9" stroke="#2563EB" stroke-width="2"/><line x1="21" y1="21" x2="28" y2="28" stroke="#2563EB" stroke-width="2.5" stroke-linecap="round"/><line x1="10" y1="14" x2="18" y2="14" stroke="#2563EB" stroke-width="1.5" stroke-linecap="round"/><line x1="14" y1="10" x2="14" y2="18" stroke="#2563EB" stroke-width="1.5" stroke-linecap="round"/></svg>',
    fill: '12%'
  },
  {
    tag: '~45 días · Proyecto único · 2 perfiles',
    title: 'D360° Evalúa',
    desc: 'Análisis profundo de sistemas, silos de datos, contratos con terceros y DPIA preliminar. Incluye todo lo del Inicia más inventario completo de tratamientos, mapeo de flujos y hoja de ruta técnica priorizada.',
    chips: [{t:'DPIA preliminar',c:'#0F6E56'},{t:'Inventario sistemas',c:'#0F6E56'},{t:'Contratos terceros',c:'#0F6E56'},{t:'60–94 h · 2 perfiles',c:'#0F6E56'}],
    iconBg: 'rgba(15,110,86,0.15)',
    iconSvg: '<svg width="32" height="32" viewBox="0 0 32 32" fill="none"><rect x="5" y="3" width="22" height="26" rx="3" stroke="#0F6E56" stroke-width="2"/><line x1="10" y1="11" x2="22" y2="11" stroke="#0F6E56" stroke-width="1.5" stroke-linecap="round"/><line x1="10" y1="16" x2="22" y2="16" stroke="#0F6E56" stroke-width="1.5" stroke-linecap="round"/><line x1="10" y1="21" x2="16" y2="21" stroke="#0F6E56" stroke-width="1.5" stroke-linecap="round"/></svg>',
    fill: '42%'
  },
  {
    tag: '3–6 meses · 82–168 h/mes · Alcance variable',
    title: 'D360° Acompaña',
    desc: 'Ejecución guiada del plan de adecuación con equipo multidisciplinario. Consultor principal, asesor legal, técnico de datos e integraciones trabajando en sprints quincenales con revisiones al cliente.',
    chips: [{t:'5 perfiles',c:'#854F0B'},{t:'Sprints quincenales',c:'#854F0B'},{t:'Scrum Master incluido',c:'#854F0B'},{t:'82–168 h/mes',c:'#854F0B'}],
    iconBg: 'rgba(133,79,11,0.15)',
    iconSvg: '<svg width="32" height="32" viewBox="0 0 32 32" fill="none"><circle cx="10" cy="10" r="4" stroke="#854F0B" stroke-width="1.8"/><circle cx="22" cy="10" r="4" stroke="#854F0B" stroke-width="1.8"/><circle cx="16" cy="22" r="4" stroke="#854F0B" stroke-width="1.8"/><line x1="14" y1="10" x2="18" y2="10" stroke="#854F0B" stroke-width="1.5"/><line x1="12" y1="14" x2="14" y2="18" stroke="#854F0B" stroke-width="1.5"/><line x1="20" y1="14" x2="18" y2="18" stroke="#854F0B" stroke-width="1.5"/></svg>',
    fill: '75%'
  },
  {
    tag: '6–12 meses · a cotizar · Diseño a medida',
    title: 'D360° Implementa',
    desc: 'Implementación técnica en sistemas, integraciones con AlignData Protect™, adecuación de contratos y capacitación de equipos. Alcance y precio construidos sobre el resultado del D360° Evalúa aprobado.',
    chips: [{t:'Diseño a medida',c:'#534AB7'},{t:'Post D360° Evalúa',c:'#534AB7'},{t:'5+ perfiles',c:'#534AB7'},{t:'Cotización por hitos',c:'#534AB7'}],
    iconBg: 'rgba(83,74,183,0.15)',
    iconSvg: '<svg width="32" height="32" viewBox="0 0 32 32" fill="none"><rect x="3" y="7" width="26" height="18" rx="3" stroke="#534AB7" stroke-width="2"/><line x1="3" y1="13" x2="29" y2="13" stroke="#534AB7" stroke-width="1.5"/><circle cx="8" cy="10" r="1.5" fill="#534AB7"/><circle cx="13" cy="10" r="1.5" fill="#534AB7"/><line x1="10" y1="19" x2="22" y2="19" stroke="#534AB7" stroke-width="1.5" stroke-linecap="round"/></svg>',
    fill: '100%'
  }
];

function pcGoTo(i) {
  if (i < 0 || i > 3 || !document.getElementById('pcFill')) return;
  pcCur = i;
  var s = pcSteps[i];
  document.getElementById('pcFill').style.width = s.fill;
  document.getElementById('pcTitle').textContent = s.title;
  document.getElementById('pcDesc').textContent = s.desc;
  document.getElementById('pcTag').textContent = s.tag;
  document.getElementById('pcBigNum').textContent = (i + 1 < 10 ? '0' : '') + (i + 1);
  document.getElementById('pcIcon').innerHTML = s.iconSvg;
  document.getElementById('pcIcon').style.background = s.iconBg;
  var chips = s.chips.map(function (c) {
    return '<span class="pc-chip" style="color:' + c.c + ';border-color:' + c.c + '44;background:' + c.c + '11;">' + c.t + '</span>';
  }).join('');
  document.getElementById('pcChips').innerHTML = chips;
  [0, 1, 2, 3].forEach(function (n) {
    var btn = document.getElementById('pnb' + n);
    var nm  = document.getElementById('pnn' + n);
    var dot = document.getElementById('pdd' + n);
    if (btn) btn.className = 'pc-node-btn' + (n < i ? ' done' : n === i ? ' active' : '');
    if (nm)  nm.className  = 'pc-node-name' + (n === i ? ' active' : '');
    if (dot) dot.className = 'pc-nav-dot'   + (n === i ? ' active' : '');
  });
  var next = document.getElementById('pcNext');
  if (next) next.disabled = (i === 3);
}

document.addEventListener('DOMContentLoaded', function () { pcGoTo(0); });


/* ── COUNTDOWN TICKER ─────────────────────────── */
(function () {
  function updateTk() {
    var diff = new Date('2026-12-01T00:00:00') - new Date();
    if (diff <= 0) return;
    var d = Math.floor(diff / 86400000);
    var h = String(Math.floor((diff % 86400000) / 3600000)).padStart(2, '0');
    var m = String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0');
    var s = String(Math.floor((diff % 60000) / 1000)).padStart(2, '0');
    ['tkDays', 'tkDays2'].forEach(function (id) { var el = document.getElementById(id); if (el) el.textContent = d; });
    ['tkHrs',  'tkHrs2' ].forEach(function (id) { var el = document.getElementById(id); if (el) el.textContent = h; });
    ['tkMin',  'tkMin2' ].forEach(function (id) { var el = document.getElementById(id); if (el) el.textContent = m; });
    ['tkSec',  'tkSec2' ].forEach(function (id) { var el = document.getElementById(id); if (el) el.textContent = s; });
  }
  updateTk();
  setInterval(updateTk, 1000);
})();


/* ── SCROLL REVEAL ────────────────────────────── */
(function () {
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '-160px 0px -80px 0px' });

  document.querySelectorAll('.ad-reveal').forEach(function (el) {
    var siblings = el.parentElement
      ? Array.from(el.parentElement.children).filter(function (c) { return c.classList.contains('ad-reveal'); })
      : [];
    var sibIndex = siblings.indexOf(el);
    if (sibIndex > 0) el.style.transitionDelay = (sibIndex * 0.12) + 's';
    observer.observe(el);
  });
})();


/* ── TIMELINE REVEAL ──────────────────────────── */
(function () {
  var rows = ['ad-r0', 'ad-r1', 'ad-r2', 'ad-r3'];
  var lines = ['ad-lf0', 'ad-lf1', 'ad-lf2'];
  var started = false;

  function revealStep(i) {
    if (i >= rows.length) return;
    var row = document.getElementById(rows[i]);
    if (row) {
      row.classList.add('ad-tl-visible');
      if (i < lines.length) {
        setTimeout(function () {
          var lf = document.getElementById(lines[i]);
          if (lf) lf.style.height = '100%';
          setTimeout(function () { revealStep(i + 1); }, 300);
        }, 500);
      } else {
        setTimeout(function () { revealStep(i + 1); }, 300);
      }
    }
  }

  var tl = document.getElementById('ad-timeline');
  if (tl) {
    var obs = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting && !started) {
        started = true;
        revealStep(0);
        obs.disconnect();
      }
    }, { threshold: 0.15 });
    obs.observe(tl);
  }
})();