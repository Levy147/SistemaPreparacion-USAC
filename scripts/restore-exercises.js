const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '..', 'data', 'lenguaje');

const exercisesByUnit = {
    '1': [
        { id: 1, type: 'fill', question: 'El _____ es el elemento de la comunicación que se refiere al lugar, momento y circunstancias en las que se produce el acto comunicativo.', options: ['mensaje', 'contexto', 'código', 'ruido'], correct: 1 },
        { id: 2, type: 'fill', question: 'La función del lenguaje que se centra en la forma del mensaje para crear un efecto estético se denomina función _____.', options: ['fática', 'emotiva', 'poética', 'conativa'], correct: 2 },
        { id: 3, type: 'fill', question: 'En Guatemala es común escuchar expresiones como "yo pensaba de que". Estos errores se conocen como _____.', options: ['anfibología', 'dequeísmo', 'solecismo', 'cacofonía'], correct: 1 },
        { id: 4, type: 'fill', question: 'Cuando un discurso tiene como propósito principal transmitir información objetiva, se clasifica como discurso _____.', options: ['narrativo', 'descriptivo', 'expositivo', 'argumentativo'], correct: 2 },
        { id: 5, type: 'tf', question: 'El contexto es el elemento de la comunicación que representa al emisor del mensaje.', correct: false },
        { id: 6, type: 'tf', question: 'En un silogismo válido, si ambas premisas son negativas, la conclusión puede ser una proposición afirmativa.', correct: false },
        { id: 7, type: 'tf', question: 'La función conativa y la función apelativa son la misma cosa.', correct: true },
        { id: 8, type: 'tf', question: 'La cacofonía se produce cuando se repiten sonidos de forma intencional con el propósito de crear un efecto literario positivo.', correct: false },
        { id: 9, type: 'correct', question: '¿Cuál es la forma correcta? «Le dije de que viniera a la reunión»', options: ['Le dije de que viniera', 'Le dije para que viniera', 'Le dije que viniera', 'Le dije de que venga'], correct: 2 },
        { id: 10, type: 'correct', question: '¿Cuál es la forma correcta? «Hubieron muchos problemas»', options: ['Hubieron muchos problemas', 'Han habido muchos problemas', 'Hubo muchos problemas', 'Ha de haber muchos problemas'], correct: 2 },
        { id: 11, type: 'correct', question: '¿Cuál es la forma correcta? «La película que la vi ayer fue muy buena»', options: ['La película que la vi ayer fue buena', 'La película la vi ayer y fue buena', 'Ayer vi la película y fue buena', 'La película fue buena que la vi ayer'], correct: 2 },
        { id: 12, type: 'correct', question: '¿Cuál es la forma correcta? «Subir arriba del cerro es cansado»', options: ['Subir arriba del cerro', 'Subir pa arriba del cerro', 'Subir al cerro', 'Subir hacia arriba del cerro'], correct: 2 },
        { id: 13, type: 'order', question: 'Ordena los elementos del proceso comunicativo en el orden lógico:', items: ['Receptor', 'Canal', 'Código', 'Emisor', 'Mensaje'], correct: [3, 2, 4, 1, 0] },
        { id: 14, type: 'order', question: 'Ordena las fases de la argumentación:', items: ['Cierre', 'Desarrollo', 'Apertura'], correct: [2, 1, 0] },
        { id: 15, type: 'order', question: 'Ordena las partes de un silogismo clásico:', items: ['Conclusión', 'Premisa menor', 'Premisa mayor'], correct: [2, 1, 0] },
        { id: 16, type: 'match', question: 'Empareja cada función del lenguaje con su elemento:', left: ['Función emotiva', 'Función conativa', 'Función referencial', 'Función fática', 'Función metalingüística', 'Función poética'], right: ['Canal', 'Receptor', 'Código', 'Contexto', 'Emisor', 'Mensaje'], correct: [4, 1, 3, 0, 2, 5] },
        { id: 17, type: 'match', question: 'Empareja cada falacia con su descripción:', left: ['Ad hominem', 'Ad populum', 'Ad baculum'], right: ['Apelación a la coacción', 'Ataque a la persona', 'Apelación a la mayoría'], correct: [1, 2, 0] },
        { id: 18, type: 'match', question: 'Empareja cada vicio con su ejemplo:', left: ['Pleonasmo', 'Anfibología', 'Solecismo', 'Cacofonía', 'Dequeísmo'], right: ['Pienso de que debemos estudiar', 'La película la vi ayer', 'Hubieron muchos problemas', 'Subir arriba del cerro', 'La tierra tiembla tiritando'], correct: [3, 1, 2, 4, 0] },
        { id: 19, type: 'reading', passage: 'Juan le dice a María: "¿Hola? ¿Me escuchas?". María no responde porque la línea tiene interferencias.', question: 'Las preguntas de Juan tienen como función:', options: ['Expresar frustración', 'Transmitir información climática', 'Verificar que el canal funciona', 'Influir en María'], correct: 2 },
        { id: 20, type: 'reading', passage: 'En una clase, el profesor pide analizar: "Nosotros llegamos a nuestra casa, nos sentamos en nuestro sofá, y comimos nuestra cena preparada para nosotros". Un estudiante señala la repetición innecesaria.', question: '¿Qué vicio de dicción predominaba?', options: ['Anfibología', 'Solecismo', 'Pleonasmo', 'Cacofonía'], correct: 2 }
    ],
    '2': [
        { id: 1, type: 'fill', question: 'El _____ es la unidad mínima significativa de la lengua que tiene forma y contenido.', options: ['fonema', 'signo', 'morfema', 'sintagma'], correct: 1 },
        { id: 2, type: 'fill', question: 'La _____ es el significado que una palabra tiene por uso establecido en la comunidad lingüística.', options: ['connotación', 'denotación', 'polisemia', 'sinonimia'], correct: 1 },
        { id: 3, type: 'fill', question: 'Las _____ son palabras que tienen la misma forma pero diferente significado.', options: ['polisemia', 'homografía', 'paronimia', 'antonomasia'], correct: 1 },
        { id: 4, type: 'fill', question: 'La _____ es el uso de una palabra para designar un concepto que se parece al que normalmente designa.', options: ['metáfora', 'metonimia', 'sinécdoque', 'hipérbole'], correct: 1 },
        { id: 5, type: 'tf', question: 'El significado denotativo es el significado subjetivo y emocional de una palabra.', correct: false },
        { id: 6, type: 'tf', question: 'La polisemia se refiere a una palabra con múltiples significados.', correct: true },
        { id: 7, type: 'tf', question: 'Los sinónimos son palabras que suenan igual pero tienen diferente significado.', correct: false },
        { id: 8, type: 'tf', question: 'La antonimia es la relación entre palabras con significados opuestos.', correct: true },
        { id: 9, type: 'correct', question: '¿Cuál es la forma correcta? «Le presté el libro a mi hermano y me lo devolvió»', options: ['Le presté el libro a mi hermano', 'Le presté el libro a el hermano', 'Le presté el libro a él hermano', 'Presté el libro al hermano'], correct: 0 },
        { id: 10, type: 'correct', question: '¿Cuál es la forma correcta? «Hay mucha gente que piensa diferente»', options: ['Hay mucha gente que piensa diferente', 'Hay mucha gente que piensa distinto', 'Hay mucha gente que piensa de diferente', 'Hay mucha gente que piensa diferentemente'], correct: 0 },
        { id: 11, type: 'correct', question: '¿Cuál es la forma correcta? «Es un problema grave que nos afecta a todos»', options: ['Es un problema grave que nos afecta a todos', 'Es un problema grave que nos afecta a todxs', 'Es un problema grave que nos afecta a todes', 'Es un problema grave que nos afecta a cada uno'], correct: 0 },
        { id: 12, type: 'correct', question: '¿Cuál es la forma correcta? «La actitud de los estudiantes fue positiva»', options: ['La actitud de los estudiantes fue positiva', 'La actitud de los estudiantes fue positivo', 'La actitud de los estudiantes positiva fue', 'La actitud positiva de los estudiantes fue'], correct: 0 },
        { id: 13, type: 'order', question: 'Ordena los niveles del lenguaje de más formal a menos formal:', items: ['Culto', 'Estándar', 'Populachero', 'Vulgar'], correct: [0, 1, 2, 3] },
        { id: 14, type: 'order', question: 'Ordena las categorías gramaticales de mayor a menor capacidad de combinación:', items: ['Verbo', 'Sustantivo', 'Adjetivo', 'Artículo'], correct: [0, 1, 2, 3] },
        { id: 15, type: 'order', question: 'Ordena las partes de la oración según su función:', items: ['Predicado', 'Complemento directo', 'Complemento indirecto', 'Sujeto'], correct: [3, 0, 1, 2] },
        { id: 16, type: 'match', question: 'Empareja cada tipo de palabra con su ejemplo:', left: ['Sustantivo', 'Adjetivo', 'Verbo', 'Adverbio'], right: ['Mesa', 'Bonito', 'Correr', 'Rápidamente'], correct: [0, 1, 2, 3] },
        { id: 17, type: 'match', question: 'Empareja cada concepto con su definición:', left: ['Denotación', 'Connotación', 'Polisemia', 'Homonimia'], right: ['Significado literal', 'Significado emocional', 'Muchos significados', 'Igual forma, diferente significado'], correct: [0, 1, 2, 3] },
        { id: 18, type: 'match', question: 'Empareja cada relación de significado:', left: ['Sinónimos', 'Antónimos', 'Homónimos', 'Parónimos'], right: ['Mismo significado', 'Significado opuesto', 'Igual forma', 'Parecido en forma'], correct: [0, 1, 2, 3] },
        { id: 19, type: 'reading', passage: 'El profesor explicó que el signo lingüístico tiene dos inseparables: la expresión (significante) y el contenido (significado).', question: '¿Qué relación existe entre significante y significado?', options: ['Son independientes', 'Son inseparables', 'El significado es mayor', 'El significante es más importante'], correct: 1 },
        { id: 20, type: 'reading', passage: 'María dijo: "Mi hermano es muy alto". El profesor señaló que "alto" es un adjetivo que modifica al sustantivo "hermano".', question: '¿Qué función cumple "alto" en la oración?', options: ['Sujeto', 'Predicado', 'Complemento del nombre', 'Complemento verbal'], correct: 2 }
    ],
    '3': [
        { id: 1, type: 'fill', question: 'Las palabras _____ terminan en vocal y llevan tilde en la última sílaba.', options: ['agudas', 'graves', 'esdrújulas', 'sobresdrújulas'], correct: 0 },
        { id: 2, type: 'fill', question: 'Las palabras _____ terminan en consonante (excepto n, s) y llevan tilde en la penúltima sílaba.', options: ['agudas', 'graves', 'esdrújulas', 'sobresdrújulas'], correct: 1 },
        { id: 3, type: 'fill', question: 'Las palabras _____ llevan tilde en la antepenúltima sílaba.', options: ['agudas', 'graves', 'esdrújulas', 'sobresdrújulas'], correct: 2 },
        { id: 4, type: 'fill', question: 'La _____ es la marca gráfica que separa la sílaba tónica de las átonas.', options: ['coma', 'tilde', 'punto', 'dos puntos'], correct: 1 },
        { id: 5, type: 'tf', question: 'Las palabras monosílabas nunca llevan tilde.', correct: false },
        { id: 6, type: 'tf', question: 'Las palabras agudas llevan tilde en la última sílaba.', correct: true },
        { id: 7, type: 'tf', question: 'Las palabras esdrújulas siempre llevan tilde.', correct: true },
        { id: 8, type: 'tf', question: 'Las palabras graves llevan tilde en la penúltima sílaba.', correct: true },
        { id: 9, type: 'correct', question: '¿Cuál es la forma correcta? «El cafe esta bueno»', options: ['El cafe esta bueno', 'El café está bueno', 'El café esta bueno', 'El cafe está bueno'], correct: 1 },
        { id: 10, type: 'correct', question: '¿Cuál es la forma correcta? «La musica es hermosa»', options: ['La musica es hermosa', 'La música es hermosa', 'La musica es hermosa', 'La música es hermoso'], correct: 1 },
        { id: 11, type: 'correct', question: '¿Cuál es la forma correcta? «Yo tambien quiero ir»', options: ['Yo tambien quiero ir', 'Yo también quiero ir', 'Yo tambien quero ir', 'Yo también quiero ir'], correct: 1 },
        { id: 12, type: 'correct', question: '¿Cuál es la forma correcta? «Tu eres mi amigo»', options: ['Tu eres mi amigo', 'Tú eres mi amigo', 'Tu eres mi amigo', 'Tú eres mi amiguo'], correct: 1 },
        { id: 13, type: 'order', question: 'Ordena las reglas de acentuación de más simple a más compleja:', items: ['Esdrújulas siempre tilde', 'Sobresdrújulas siempre tilde', 'Agudas: tilde si terminan en vocal, n, s', 'Graves: tilde si terminan en consonante'], correct: [0, 1, 2, 3] },
        { id: 14, type: 'order', question: 'Ordena las palabras por número de sílabas:', items: ['casa', 'casita', 'casita bonita', 'casita'], correct: [0, 1, 3, 2] },
        { id: 15, type: 'order', question: 'Ordena de más a menos sílabas:', items: ['murciélago', 'gato', 'computadora', 'casa'], correct: [0, 2, 3, 1] },
        { id: 16, type: 'match', question: 'Empareja cada palabra con su tipo de acentuación:', left: ['Mesa', 'Árbol', 'Música', 'Fácilmente'], right: ['Grave', 'Aguda', 'Esdrújula', 'Sobresdrújula'], correct: [0, 1, 2, 3] },
        { id: 17, type: 'match', question: 'Empareja cada regla con su tilde:', left: ['Termina en vocal', 'Termina en n o s', 'Termina en consonante', 'Es esdrújula'], right: ['Aguda: tilde', 'Aguda: tilde', 'Grave: tilde', 'Siempre tilde'], correct: [0, 1, 2, 3] },
        { id: 18, type: 'match', question: 'Empareja cada palabra con su sílaba tónica:', left: ['Casa', 'Música', 'Árbol', 'Corriendo'], right: ['Sa', 'Si', 'Bal', 'Rien'], correct: [0, 1, 2, 3] },
        { id: 19, type: 'reading', passage: 'El profesor explicó que "café" es una palabra aguda que termina en e, por lo tanto lleva tilde.', question: '¿Por qué lleva tilde "café"?', options: ['Porque es esdrújula', 'Porque es grave', 'Porque es aguda y termina en vocal', 'Porque es sobresdrújula'], correct: 2 },
        { id: 20, type: 'reading', passage: 'Una estudiante escribió: "Yo tambien quiero ir al parque". El profesor marcó un error.', question: '¿Qué error cometió la estudiante?', options: ['Error de tilde', 'Error de ortografía', 'Error de gramática', 'Error de puntuación'], correct: 0 }
    ],
    '4': [
        { id: 1, type: 'fill', question: 'Las _____ son palabras que acompañan al sustantivo y lo determinan o califican.', options: ['preposiciones', 'artículos', 'conjunciones', 'adverbios'], correct: 1 },
        { id: 2, type: 'fill', question: 'El _____ es la parte de la oración que expresa acción, estado o proceso.', options: ['sustantivo', 'adjetivo', 'verbo', 'adverbio'], correct: 2 },
        { id: 3, type: 'fill', question: 'Los _____ son palabras que modifican al verbo, adjetivo u otro adverbio.', options: ['preposiciones', 'conjunciones', 'adverbios', 'pronombres'], correct: 2 },
        { id: 4, type: 'fill', question: 'La _____ es la unión de un sujeto y un predicado.', options: ['palabra', 'frase', 'oración', 'período'], correct: 2 },
        { id: 5, type: 'tf', question: 'El sujeto simple tiene solo un núcleo.', correct: true },
        { id: 6, type: 'tf', question: 'El predicado nominal tiene como núcleo un adjetivo.', correct: true },
        { id: 7, type: 'tf', question: 'Los adjetivos siempre van después del sustantivo en español.', correct: false },
        { id: 8, type: 'tf', question: 'El verbo "ser" es un verbo copulativo.', correct: true },
        { id: 9, type: 'correct', question: '¿Cuál es la forma correcta? «Los niños está jugando»', options: ['Los niños está jugando', 'Los niños están jugando', 'Los niños estan jugando', 'El niños están jugando'], correct: 1 },
        { id: 10, type: 'correct', question: '¿Cuál es la forma correcta? «Yo he comido ya»', options: ['Yo he comido ya', 'Yo há comido ya', 'Yo ha comido ya', 'Yo he comido yo'], correct: 0 },
        { id: 11, type: 'correct', question: '¿Cuál es la forma correcta? «Nosotros vamos al mercado»', options: ['Nosotros vamos al mercado', 'Nosotros vamos a el mercado', 'Nosotros vamos al mercado', 'Nosotros vamos al mercadó'], correct: 0 },
        { id: 12, type: 'correct', question: '¿Cuál es la forma correcta? «Ellas no han llegado»', options: ['Ellas no han llegado', 'Ellas no a llegado', 'Ellas no ha llegado', 'Ellas no han llegadó'], correct: 0 },
        { id: 13, type: 'order', question: 'Ordena las categorías gramaticales variables de mayor a menor:', items: ['Verbo', 'Sustantivo', 'Adjetivo', 'Artículo'], correct: [0, 1, 2, 3] },
        { id: 14, type: 'order', question: 'Ordena las partes de la oración según función:', items: ['Predicado', 'Sujeto', 'Complemento directo', 'Complemento indirecto'], correct: [1, 0, 2, 3] },
        { id: 15, type: 'order', question: 'Ordena los tiempos verbales de presente a futuro:', items: ['Presente', 'Pretérito imperfecto', 'Futuro simple', 'Condicional'], correct: [0, 1, 3, 2] },
        { id: 16, type: 'match', question: 'Empareja cada categoría con su ejemplo:', left: ['Sustantivo', 'Adjetivo', 'Verbo', 'Adverbio'], right: ['Casa', 'Bonito', 'Correr', 'Rápidamente'], correct: [0, 1, 2, 3] },
        { id: 17, type: 'match', question: 'Empareja cada tipo de sujeto:', left: ['Sujeto simple', 'Sujeto compuesto', 'Sujeto tácito', 'Sujeto nominal'], right: ['Un núcleo', 'Más de un núcleo', 'No aparece en la oración', 'Está formado por sustantivo'], correct: [0, 1, 2, 3] },
        { id: 18, type: 'match', question: 'Empareja cada verbo con su tipo:', left: ['Ser', 'Tener', 'Ir', 'Hablar'], right: ['Copulativo', 'Auxiliar', 'Auxiliar', 'Semántico'], correct: [0, 1, 2, 3] },
        { id: 19, type: 'reading', passage: 'El profesor explicó que "Los estudiantes estudian mucho" es una oración con sujeto compuesto.', question: '¿Cuál es el sujeto?', options: ['Los', 'Estudiantes', 'Los estudiantes', 'Mucho'], correct: 2 },
        { id: 20, type: 'reading', passage: 'María escribió: "Los niños juegan en el parque". El profesor pidió identificar el predicado verbal.', question: '¿Cuál es el predicado verbal?', options: ['Los niños', 'Juegan', 'En el parque', 'Juegan en el parque'], correct: 3 }
    ],
    '5': [
        { id: 1, type: 'fill', question: 'El _____ es una composición en prosa que presenta un análisis de una temática.', options: ['cuento', 'ensayo', 'poema', 'noticia'], correct: 1 },
        { id: 2, type: 'fill', question: 'El _____ es una composición literaria que narra hechos reales o imaginarios.', options: ['ensayo', 'cuento', 'artículo', 'crónica'], correct: 1 },
        { id: 3, type: 'fill', question: 'La _____ es una composición que expresa sentimientos y emociones en verso.', options: ['narración', 'descripción', 'poesía', 'argumentación'], correct: 2 },
        { id: 4, type: 'fill', question: 'El _____ es un escrito breve que opina sobre un tema de actualidad.', options: ['ensayo', 'artículo', 'cuento', 'poema'], correct: 1 },
        { id: 5, type: 'tf', question: 'El ensayo es una composición libre y subjetiva.', correct: true },
        { id: 6, type: 'tf', question: 'El cuento tiene personajes, argumento, ambiente y tiempo.', correct: true },
        { id: 7, type: 'tf', question: 'La crónica es un género informativo que narra hechos actuales.', correct: true },
        { id: 8, type: 'tf', question: 'El poema es una composición exclusivamente en prosa.', correct: false },
        { id: 9, type: 'correct', question: '¿Cuál es la forma correcta de expresar una opinión?', options: ['Yo pienso que es correcto', 'Es correcto porque tiene sentido', 'Todos piensan que es correcto', 'Es correcto absolutamente'], correct: 1 },
        { id: 10, type: 'correct', question: '¿Cuál es la forma correcta de presentar un argumento?', options: ['Creo que esto es importante', 'Es importante porque...', 'Todo el mundo sabe que es importante', 'Es importante y ya'], correct: 1 },
        { id: 11, type: 'correct', question: '¿Cuál es la forma correcta de concluir un texto?', options: ['En conclusión, se puede afirmar que...', 'Al final, creo yo que...', 'Todo mundo piensa que...', 'No sé qué pensar'], correct: 0 },
        { id: 12, type: 'correct', question: '¿Cuál es la forma correcta de iniciar una exposición?', options: ['Bueno, les voy a hablar de...', 'Hoy les voy a presentar...', 'A ver, escuchen...', 'Oigan, les voy a decir'], correct: 1 },
        { id: 13, type: 'order', question: 'Ordena las partes de un ensayo:', items: ['Conclusión', 'Introducción', 'Desarrollo', 'Tesis'], correct: [3, 1, 2, 0] },
        { id: 14, type: 'order', question: 'Ordena las etapas de la exposición oral:', items: ['Conclusión', 'Introducción', 'Desarrollo', 'Preparación'], correct: [3, 1, 2, 0] },
        { id: 15, type: 'order', question: 'Ordena los géneros literarios de más antiguo a más moderno:', items: ['Poesía épica', 'Novela', 'Cuento', 'Artículo'], correct: [0, 1, 2, 3] },
        { id: 16, type: 'match', question: 'Empareja cada género con su característica:', left: ['Ensayo', 'Cuento', 'Crónica', 'Poema'], right: ['Análisis libre', 'Narración breve', 'Informativo actual', 'Expresión en verso'], correct: [0, 1, 2, 3] },
        { id: 17, type: 'match', question: 'Empareja cada parte del ensayo con su función:', left: ['Introducción', 'Desarrollo', 'Conclusión', 'Tesis'], right: ['Presentar el tema', 'Argumentar', 'Sintetizar', 'Idea central'], correct: [0, 1, 2, 3] },
        { id: 18, type: 'match', question: 'Empareja cada género textual con su propósito:', left: ['Narrar', 'Describir', 'Argumentar', 'Exponer'], right: ['Cuento', 'Paisaje', 'Ensayo', 'Noticia'], correct: [0, 1, 2, 3] },
        { id: 19, type: 'reading', passage: 'Juan preparó una exposición sobre cambio climático. Comenzó con datos impactantes, luego explicó las causas y finalmente propuso soluciones.', question: '¿Qué estructura siguió Juan?', options: ['Introducción, desarrollo, conclusión', 'Solo introducción', 'Solo conclusión', 'No tuvo estructura'], correct: 0 },
        { id: 20, type: 'reading', passage: 'María escribió un ensayo sobre la importancia de la lectura. En la introducción presentó la tesis, en el desarrollo dio argumentos y en la conclusión reafirmó su posición.', question: '¿Qué tipo de texto escribió María?', options: ['Cuento', 'Ensayo', 'Crónica', 'Poema'], correct: 1 }
    ],
    '6': [
        { id: 1, type: 'fill', question: 'La _____ es la capacidad de entender y interpretar un texto escrito.', options: ['expresión', 'comprensión', 'interpretación', 'producción'], correct: 1 },
        { id: 2, type: 'fill', question: 'La _____ se refiere a la idea principal que el autor quiere comunicar.', options: ['idea secundaria', 'tema', 'propósito', 'argumento'], correct: 1 },
        { id: 3, type: 'fill', question: 'Las _____ son ideas que apoyan o explican la idea principal.', options: ['ideas principales', 'ideas secundarias', 'tesis', 'argumentos'], correct: 1 },
        { id: 4, type: 'fill', question: 'La _____ es la capacidad de deducir información no explícita en el texto.', options: ['lectura literal', 'inferencia', 'interpretación', 'síntesis'], correct: 1 },
        { id: 5, type: 'tf', question: 'La idea principal es la que más información aporta al texto.', correct: true },
        { id: 6, type: 'tf', question: 'Las ideas secundarias son igual de importantes que la idea principal.', correct: false },
        { id: 7, type: 'tf', question: 'La inferencia es una deducción que se hace a partir de la información explícita del texto.', correct: true },
        { id: 8, type: 'tf', question: 'La comprensión literal se limita a leer las palabras sin interpretar.', correct: true },
        { id: 9, type: 'correct', question: '¿Cuál es la forma correcta de identificar la idea principal?', options: ['Leer solo el título', 'Buscar la oración que resume el párrafo', 'Contar las veces que se repite una palabra', 'Leer solo la primera línea'], correct: 1 },
        { id: 10, type: 'correct', question: '¿Cuál es la forma correcta de hacer una inferencia?', options: ['Adivinar sin leer', 'Usar la información del texto + conocimientos previos', 'Inventar información', 'Leer solo el primer párrafo'], correct: 1 },
        { id: 11, type: 'correct', question: '¿Cuál es la forma correcta de resumir un texto?', options: ['Copiar todo el texto', 'Identificar ideas principales y expressirlas con tus palabras', 'Cambiar solo algunas palabras', 'Escribir más que el original'], correct: 1 },
        { id: 12, type: 'correct', question: '¿Cuál es la forma correcta de analizar un texto?', options: ['Leer una vez rápido', 'Leer varias veces y tomar notas', 'Solo leer los títulos', 'No es necesario analizar'], correct: 1 },
        { id: 13, type: 'order', question: 'Ordena los pasos para comprender un texto:', items: ['Leer el texto completo', 'Identificar vocabulario desconocido', 'Subrayar ideas principales', 'Hacer un resumen'], correct: [0, 1, 2, 3] },
        { id: 14, type: 'order', question: 'Ordena los niveles de comprensión lectora:', items: ['Comprensión literal', 'Comprensión inferencial', 'Comprensión crítica', 'Comprensión global'], correct: [0, 1, 3, 2] },
        { id: 15, type: 'order', question: 'Ordena las partes de un resumen:', items: ['Idea principal', 'Ideas secundarias', 'Conclusión', 'Introducción'], correct: [3, 0, 1, 2] },
        { id: 16, type: 'match', question: 'Empareja cada tipo de comprensión:', left: ['Literal', 'Inferencial', 'Crítica', 'Global'], right: ['Texto dice explícitamente', 'Deducir información', 'Evaluar y juzgar', 'Entender el todo'], correct: [0, 1, 2, 3] },
        { id: 17, type: 'match', question: 'Empareja cada estrategia con su uso:', left: ['Subrayar', 'Hacer resumen', 'Hacer inferencias', 'Mapa conceptual'], right: ['Identificar ideas clave', 'Sintetizar información', 'Deducir información', 'Organizar ideas'], correct: [0, 1, 2, 3] },
        { id: 18, type: 'match', question: 'Empareja cada habilidad lectora:', left: ['Leer rápido', 'Leer comprensivamente', 'Leer críticamente', 'Leer selectivamente'], right: ['Escanear', 'Entender el significado', 'Evaluar argumentos', 'Buscar información específica'], correct: [0, 1, 2, 3] },
        { id: 19, type: 'reading', passage: 'El cambio climático es uno de los mayores desafíos del siglo XXI. Las temperaturas globales han aumentado significativamente en las últimas décadas. Este fenómeno tiene múltiples causas, entre las que destaca la emisión de gases de efecto invernadero.', question: '¿Cuál es la idea principal del texto?', options: ['Las temperaturas han aumentado', 'El cambio climático es un gran desafío', 'Hay múltiples causas', 'Se emiten gases de efecto invernadero'], correct: 1 },
        { id: 20, type: 'reading', passage: 'Los derechos humanos son universales e inalienables. Todo ser humano nace libre y con igual dignidad. Sin embargo, en muchos países estos derechos son vulnerados diariamente.', question: '¿Qué se puede inferir del texto?', options: ['Los derechos humanos se respetan en todos los países', 'La vulneración de derechos es un problema mundial', 'Los derechos humanos no existen', 'Solo algunos países tienen derechos humanos'], correct: 1 }
    ]
};

for (const [unitNum, exercises] of Object.entries(exercisesByUnit)) {
    const filePath = path.join(dataDir, `u${unitNum}.json`);
    if (!fs.existsSync(filePath)) {
        console.log(`Archivo no encontrado: ${filePath}`);
        continue;
    }
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    data.exercises = exercises;
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    console.log(`Unidad ${unitNum}: ${exercises.length} ejercicios restaurados`);
}

console.log('Ejercicios restaurados correctamente.');
