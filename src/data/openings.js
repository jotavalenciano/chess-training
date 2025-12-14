/**
 * Base de datos de aperturas de ajedrez
 * Organizada por niveles: principiante, intermedio, avanzado
 */

export const OPENINGS_DATABASE = [
  // ===== NIVEL PRINCIPIANTE =====
  {
    id: 'ita_01',
    name: 'Apertura Italiana',
    level: 'principiante',
    eco: 'C50',
    moves: ['e4', 'e5', 'Nf3', 'Nc6', 'Bc4'],
    fen: 'r1bqkbnr/pppp1ppp/2n5/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 3 3',
    description: 'Una de las aperturas más antiguas y populares. Desarrolla rápidamente las piezas y controla el centro.',
    mainIdea: 'Desarrollar el alfil a c4, atacando f7 (punto débil) y preparar el enroque corto.',
    nextMoves: ['Nf6', 'd3', 'O-O'],
    category: 'e4'
  },
  {
    id: 'esp_01',
    name: 'Apertura Española (Ruy López)',
    level: 'principiante',
    eco: 'C60',
    moves: ['e4', 'e5', 'Nf3', 'Nc6', 'Bb5'],
    fen: 'r1bqkbnr/pppp1ppp/2n5/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 3 3',
    description: 'La apertura más popular a nivel profesional. Presiona al caballo de c6 que defiende el peón de e5.',
    mainIdea: 'Controlar el centro y preparar d4, mientras se amenaza capturar el caballo.',
    nextMoves: ['a6', 'Ba4', 'Nf6'],
    category: 'e4'
  },
  {
    id: 'esc_01',
    name: 'Defensa Escocesa',
    level: 'principiante',
    eco: 'C44',
    moves: ['e4', 'e5', 'Nf3', 'Nc6', 'd4'],
    fen: 'r1bqkbnr/pppp1ppp/2n5/4p3/3PP3/5N2/PPP2PPP/RNBQKB1R b KQkq - 0 3',
    description: 'Apertura directa que abre el centro rápidamente.',
    mainIdea: 'Capturar en el centro con d4 y desarrollar piezas activamente.',
    nextMoves: ['exd4', 'Nxd4'],
    category: 'e4'
  },
  {
    id: 'lon_01',
    name: 'Sistema Londres',
    level: 'principiante',
    eco: 'D02',
    moves: ['d4', 'Nf6', 'Nf3', 'd5', 'Bf4'],
    fen: 'rnbqkb1r/ppp1pppp/5n2/3p4/3P1B2/5N2/PPP1PPPP/RN1QKB1R b KQkq - 3 3',
    description: 'Sistema sólido y fácil de aprender. Ideal para principiantes.',
    mainIdea: 'Desarrollar el alfil por fuera de la cadena de peones con Bf4, estructura sólida.',
    nextMoves: ['e6', 'e3', 'Bd6'],
    category: 'd4'
  },
  {
    id: 'cen_01',
    name: 'Gambito del Centro',
    level: 'principiante',
    eco: 'C21',
    moves: ['e4', 'e5', 'd4', 'exd4', 'Qxd4'],
    fen: 'rnbqkbnr/pppp1ppp/8/8/3QP3/8/PPP2PPP/RNB1KBNR b KQkq - 0 3',
    description: 'Gambito agresivo que sacrifica un peón por desarrollo rápido.',
    mainIdea: 'Desarrollar la dama temprano y controlar el centro con presión.',
    nextMoves: ['Nc6', 'Qa4'],
    category: 'e4'
  },

  // ===== NIVEL INTERMEDIO =====
  {
    id: 'sic_01',
    name: 'Defensa Siciliana',
    level: 'intermedio',
    eco: 'B20',
    moves: ['e4', 'c5'],
    fen: 'rnbqkbnr/pp1ppppp/8/2p5/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2',
    description: 'La defensa más popular contra e4. Lucha por el control asimétrico del centro.',
    mainIdea: 'Controlar d4 con el peón de c5 y crear juego asimétrico.',
    nextMoves: ['Nf3', 'd6', 'd4'],
    category: 'e4'
  },
  {
    id: 'sic_02',
    name: 'Siciliana Dragón',
    level: 'intermedio',
    eco: 'B70',
    moves: ['e4', 'c5', 'Nf3', 'd6', 'd4', 'cxd4', 'Nxd4', 'Nf6', 'Nc3', 'g6'],
    fen: 'rnbqkb1r/pp2pp1p/3p1np1/8/3NP3/2N5/PPP2PPP/R1BQKB1R w KQkq - 0 6',
    description: 'Variante aguda de la Siciliana con fianchetto del alfil de rey.',
    mainIdea: 'Enrocar largo y crear ataque sobre el rey negro, o enroque corto y presión central.',
    nextMoves: ['Be3', 'Bg7', 'f3'],
    category: 'e4'
  },
  {
    id: 'fra_01',
    name: 'Defensa Francesa',
    level: 'intermedio',
    eco: 'C00',
    moves: ['e4', 'e6'],
    fen: 'rnbqkbnr/pppp1ppp/4p3/8/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2',
    description: 'Defensa sólida que prepara d5 para desafiar el centro.',
    mainIdea: 'Jugar d5 en el siguiente movimiento y presionar el centro blanco.',
    nextMoves: ['d4', 'd5'],
    category: 'e4'
  },
  {
    id: 'cak_01',
    name: 'Defensa Caro-Kann',
    level: 'intermedio',
    eco: 'B10',
    moves: ['e4', 'c6'],
    fen: 'rnbqkbnr/pp1ppppp/2p5/8/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2',
    description: 'Defensa sólida similar a la Francesa pero más flexible para el alfil de c8.',
    mainIdea: 'Preparar d5 manteniendo libre la casilla c8 para el alfil.',
    nextMoves: ['d4', 'd5'],
    category: 'e4'
  },
  {
    id: 'ind_01',
    name: 'Defensa India de Rey',
    level: 'intermedio',
    eco: 'E60',
    moves: ['d4', 'Nf6', 'c4', 'g6'],
    fen: 'rnbqkb1r/pppppp1p/5np1/8/2PP4/8/PP2PPPP/RNBQKBNR w KQkq - 0 3',
    description: 'Sistema flexible de fianchetto contra d4.',
    mainIdea: 'Desarrollar el alfil en fianchetto y atacar el centro desde los flancos.',
    nextMoves: ['Nc3', 'Bg7', 'e4'],
    category: 'd4'
  },
  {
    id: 'nim_01',
    name: 'Defensa Nimzoindia',
    level: 'intermedio',
    eco: 'E20',
    moves: ['d4', 'Nf6', 'c4', 'e6', 'Nc3', 'Bb4'],
    fen: 'rnbqk2r/pppp1ppp/4pn2/8/1bPP4/2N5/PP2PPPP/R1BQKBNR w KQkq - 2 4',
    description: 'Ataca el caballo de c3 y prepara doblar los peones blancos.',
    mainIdea: 'Presionar c3 y controlar e4, posible cambio de alfil por caballo.',
    nextMoves: ['e3', 'O-O'],
    category: 'd4'
  },
  {
    id: 'gru_01',
    name: 'Defensa Grünfeld',
    level: 'intermedio',
    eco: 'D80',
    moves: ['d4', 'Nf6', 'c4', 'g6', 'Nc3', 'd5'],
    fen: 'rnbqkb1r/ppp1pp1p/5np1/3p4/2PP4/2N5/PP2PPPP/R1BQKBNR w KQkq - 0 4',
    description: 'Permite al blanco formar un centro grande para atacarlo después.',
    mainIdea: 'Permitir cxd5 y atacar el centro con c5 y el alfil de g7.',
    nextMoves: ['cxd5', 'Nxd5', 'e4'],
    category: 'd4'
  },

  // ===== NIVEL AVANZADO =====
  {
    id: 'ber_01',
    name: 'Defensa Berlinesa (Española)',
    level: 'avanzado',
    eco: 'C67',
    moves: ['e4', 'e5', 'Nf3', 'Nc6', 'Bb5', 'Nf6'],
    fen: 'r1bqkb1r/pppp1ppp/2n2n2/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4',
    description: 'Defensa sólida popularizada por Kramnik. Lleva a finales simplificados.',
    mainIdea: 'Cambiar piezas rápidamente y llegar a finales técnicos.',
    nextMoves: ['O-O', 'Nxe4', 'd4'],
    category: 'e4'
  },
  {
    id: 'naj_01',
    name: 'Siciliana Najdorf',
    level: 'avanzado',
    eco: 'B90',
    moves: ['e4', 'c5', 'Nf3', 'd6', 'd4', 'cxd4', 'Nxd4', 'Nf6', 'Nc3', 'a6'],
    fen: 'rnbqkb1r/1p2pppp/p2p1n2/8/3NP3/2N5/PPP2PPP/R1BQKB1R w KQkq - 0 6',
    description: 'La variante más compleja y teórica de la Siciliana.',
    mainIdea: 'Flexibilidad máxima: b5, e5, o e6 según la respuesta blanca.',
    nextMoves: ['Be3', 'e5', 'Nb3'],
    category: 'e4'
  },
  {
    id: 'sla_01',
    name: 'Defensa Eslava',
    level: 'avanzado',
    eco: 'D10',
    moves: ['d4', 'd5', 'c4', 'c6'],
    fen: 'rnbqkbnr/pp2pppp/2p5/3p4/2PP4/8/PP2PPPP/RNBQKBNR w KQkq - 0 3',
    description: 'Defensa sólida del Gambito de Dama que mantiene la cadena de peones.',
    mainIdea: 'Defender d5 sin bloquear el alfil de c8.',
    nextMoves: ['Nf3', 'Nf6', 'Nc3'],
    category: 'd4'
  },
  {
    id: 'ben_01',
    name: 'Defensa Benoni',
    level: 'avanzado',
    eco: 'A60',
    moves: ['d4', 'Nf6', 'c4', 'c5', 'd5'],
    fen: 'rnbqkb1r/pp1ppppp/5n2/2pP4/2P5/8/PP2PPPP/RNBQKBNR b KQkq - 0 3',
    description: 'Defensa asimétrica y agresiva que busca contrajuego en el flanco de dama.',
    mainIdea: 'Jugar e6 y presionar d5, con juego de piezas en el flanco de dama.',
    nextMoves: ['e6', 'Nc3', 'exd5'],
    category: 'd4'
  },
  {
    id: 'hol_01',
    name: 'Defensa Holandesa',
    level: 'avanzado',
    eco: 'A80',
    moves: ['d4', 'f5'],
    fen: 'rnbqkbnr/ppppp1pp/8/5p2/3P4/8/PPP1PPPP/RNBQKBNR w KQkq - 0 2',
    description: 'Defensa agresiva que busca controlar e4.',
    mainIdea: 'Presionar e4 y crear ataque en el flanco de rey.',
    nextMoves: ['g3', 'Nf6', 'Bg2'],
    category: 'd4'
  },
  {
    id: 'mar_01',
    name: 'Ataque Marshall (Española)',
    level: 'avanzado',
    eco: 'C89',
    moves: ['e4', 'e5', 'Nf3', 'Nc6', 'Bb5', 'a6', 'Ba4', 'Nf6', 'O-O', 'Be7', 'Re1', 'b5', 'Bb3', 'O-O', 'c3', 'd5'],
    fen: 'r1bq1rk1/2p1bppp/p1n2n2/1p1pp3/4P3/1BP2N2/PP1P1PPP/RNBQR1K1 w - - 0 9',
    description: 'Gambito de peón agresivo que sacrifica material por ataque.',
    mainIdea: 'Sacrificar el peón de e5 para conseguir iniciativa y ataque sobre el rey blanco.',
    nextMoves: ['exd5', 'Nxd5', 'Nxe5'],
    category: 'e4'
  },
  {
    id: 'svc_01',
    name: 'Siciliana Sveshnikov',
    level: 'avanzado',
    eco: 'B33',
    moves: ['e4', 'c5', 'Nf3', 'Nc6', 'd4', 'cxd4', 'Nxd4', 'Nf6', 'Nc3', 'e5'],
    fen: 'r1bqkb1r/pp1p1ppp/2n2n2/4p3/3NP3/2N5/PPP2PPP/R1BQKB1R w KQkq - 0 6',
    description: 'Variante compleja que acepta debilidades para obtener actividad.',
    mainIdea: 'Aceptar casillas débiles (d5, d6) a cambio de piezas activas y contrajuego.',
    nextMoves: ['Ndb5', 'd6', 'Bg5'],
    category: 'e4'
  },
  {
    id: 'kat_01',
    name: 'Apertura Catalana',
    level: 'avanzado',
    eco: 'E00',
    moves: ['d4', 'Nf6', 'c4', 'e6', 'g3'],
    fen: 'rnbqkb1r/pppp1ppp/4pn2/8/2PP4/6P1/PP2PP1P/RNBQKBNR b KQkq - 0 3',
    description: 'Sistema híbrido que combina d4 con fianchetto de rey.',
    mainIdea: 'Presión sobre d5 y el flanco de dama desde el alfil fianchettado.',
    nextMoves: ['d5', 'Bg2', 'Be7'],
    category: 'd4'
  },
];

/**
 * Obtiene aperturas filtradas por nivel
 */
export function getOpeningsByLevel(levels) {
  if (!levels || levels.length === 0) {
    return OPENINGS_DATABASE;
  }
  return OPENINGS_DATABASE.filter(opening => levels.includes(opening.level));
}

/**
 * Obtiene una apertura por ID
 */
export function getOpeningById(id) {
  return OPENINGS_DATABASE.find(opening => opening.id === id);
}

/**
 * Obtiene aperturas por categoría (e4, d4, etc.)
 */
export function getOpeningsByCategory(category) {
  return OPENINGS_DATABASE.filter(opening => opening.category === category);
}
