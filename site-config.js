/* ═══════════════════════════════════════════════
   AlignData — site-config.js
   Única fuente de verdad para fechas, valores de referencia y precios.
   Para cambiar un precio o una fecha, edite SOLO este archivo.
   (El HTML conserva el último valor conocido como respaldo sin JavaScript.)
   ═══════════════════════════════════════════════ */
window.AD_CONFIG = {
  // Fecha de entrada en vigor vigente según la ley (zona horaria de Chile continental, verano)
  lawDate: '2026-12-01T00:00:00-03:00',
  // Mientras exista un proyecto de postergación en trámite, se muestra el aviso en la home.
  // Poner en false cuando el proyecto se archive o la ley se publique con la nueva fecha.
  showPostponementNotice: true,

  // Valores de referencia para convertir a pesos (actualizar cada tanto)
  ufValue: 40900,            // CLP por 1 UF (referencial, sept. 2026)
  utmValue: 71700,           // CLP por 1 UTM (referencial, sept. 2026)
  refLabel: 'valores referenciales de septiembre 2026',

  // Datos de contacto y medición
  contactEmail: 'contacto@aligndata.cl',
  calendarUrl: 'https://calendar.app.google/6MXvAUtuqaxMHwdg7',
  leadEndpoint: 'https://script.google.com/macros/s/AKfycbxNOzQGLmC15Bv1p7EZhKKichnybe3V0PCRzjdfjBdgBKGezqpfPKlesFaXADNgXqCbbQ/exec',
  adsId: 'AW-18071612726',

  // Precios en UF (IVA no incluido). Un número = precio fijo; {min,max} = rango.
  prices: {
    inicia: 48,
    evalua: 96,
    combo: 107,
    comboSeparado: 144,       // inicia + evalua
    acompana: 130,            // UF por mes, mínimo 3 meses
    implementa: 400,          // referencial, a medida
    protectStarter:    { min: 4,  max: 5  },
    protectBusiness:   { min: 8,  max: 12 },
    protectEnterprise: { min: 16, max: 22 },
    dpoEsencial:       { min: 8,  max: 12 },
    dpoActivo:         { min: 16, max: 22 },
    dpoEstrategico:    { min: 28, max: 40 }
  }
};
