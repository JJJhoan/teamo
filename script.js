const carta = [
  [
    { text: "Quiero que sepas lo feliz que me haces todos los días, ", pause: false },
    { text: "por eso te escribo esta carta.", pause: true },
    { text: " Espero que con esto responda tu pregunta de 'Por qué me amas?'", pause: false },
    { text: " y de paso te deje claro que cada día solo te amaré más y más.", pause: false }
  ],
  [
    { text: "Porque genuinamente siento que quiero dedicarte mi vida entera", pause: true },
    { text: " y si acaso fuera posible tener más vidas sin dudas te dedicaría cada una de ellas.", pause: false }
  ],
  [
    { text: "Te amo porque cada vez que pienso en mi futuro y en cómo será mi vida, ", pause: true },
    { text: "inevitablemente pienso en ti y en lo feliz que seré si todas las cosas entre tú y yo funcionan.", pause: false },
  ],
    [
    { text: " Te amo porque cada que escucho un audio tuyo recién levantada deseo que no solo fuera un audio", pause: true },
    { text: "  sino que pudiera despertar todos los días junto a ti.", pause: false }
  ],
  [
    { text: "Te amo porque siempre que me dices algo lindo mi corazón se acelera mucho", pause: true },
    { text: " y me pongo tan nervioso al punto de que me siento confundido", pause: true },
    { text: " pensando en cómo es posible que alguien tan maravillosa como tú pueda estar enamorada de mí.", pause: false },
  ],
    [
    { text: " Te amo porque cada que veo una foto o un video tuyo no pienso en otra cosa más que eres la mujer más hermosa que pude haber llegado a conocer", pause: true },
    { text: " y que no quiero otra cosa más que pasar mi vida entera junto a ti,", pause: true },
    { text: " porque quisiera darme el gusto de hacerte sonreír y así admirar esa sonrisa tan hermosa que tienes siempre que pudiera.", pause: false }
  ],
  [
    { text: "Te amo porque a pesar de que al principio se te hacía difícil expresar tus sentimientos", pause: true },
    { text: " a día de hoy me tratas como yo nunca me imaginé que pudieras hacerlo", pause: true },
    { text: " y eso sinceramente me hace muy feliz porque con eso me demuestras que finalmente pudiste confiar en alguien más a pesar de haber tenido problemas en el pasado,", pause: true },
    { text: " y justo por eso estoy muy orgulloso de ti ", pause: true },
    { text: "mi niña.", pause: true },
    { text: " Y también gracias por tenerme esa confianza y permitirme ver ese lado tan lindo de ti,", pause: true },
    { text: " me faltará vida para agradecerte lo feliz que me haces simplemente con el hecho de confiar en mí,", pause: true },
    { text: " porque realmente lo aprecio demasiado.", pause: false }
  ],
  [
    { text: "Mientras tanto no puedo hacer otra cosa más que intentar darte la felicidad que siempre mereciste tener,", pause: true },
    { text: " porque tal vez no lo notes pero el esfuerzo que tuviste que hacer para aún seguir aquí es grandísimo", pause: true },
    { text: " y me siento orgulloso de eso.", pause: true },
    { text: " Porque si no fuera por ti yo no podría estar viviendo la mejor etapa de mi vida ahora mismo,", pause: true },
    { text: " la cual es estar junto a ti.", pause: true },
    { text: " No dudes que yo haré hasta lo imposible con tal de verte feliz,", pause: true },
    { text: " soy capaz de dejar mi orgullo, ", pause: true },
    { text: "mi egoísmo ", pause: true },
    { text: "y mis malas actitudes de lado con tal de que siempre sigamos siendo solo tú ", pause: true },
    { text: "y yo,", pause: true },
    { text: " porque no necesito a nadie más, solamente a ti.", pause: false }
  ],
  [
    { text: "Te amo te amo te amo te amo te amo te amo te amo y mil veces te amo porque nunca me cansaré de recordártelo.", pause: true },
    { text: " Estoy loco por ti", pause: true },
    { text: " y no pienso dejar de estarlo.", pause: true },
    { text: " Realmente quiero que seas tú, ", pause: true },
    { text: "desde el inicio hasta el fin.", pause: true }
  ],
  [
    { text: "Con mucho amor, ", pause: true },
    { text: "Jhoan.", pause: false }
  ]
];

const cartaContainer = document.querySelector('.carta');
const btnIniciar = document.getElementById('btn-iniciar');
const container = document.querySelector('.container');

const typeSound = new Audio('tecleo.mp3');
typeSound.volume = 0.7;

let indiceParr = 0;
let indiceFrag = 0;
let indiceCaracter = 0;
let textoAcumulado = '';
let estaSonando = false;

const párrafosRenderizados = [];

let pActual = null;

btnIniciar.addEventListener('click', () => {
  container.classList.add('show');
  btnIniciar.disabled = true;
  btnIniciar.textContent = "Escribiendo...";
  typeSound.currentTime = 0;

  const escribirLetra = () => {
    if (indiceParr >= carta.length) {
      btnIniciar.textContent = "♡";
      return;
    }

    const parrafoActual = carta[indiceParr];
    const fragmentoActual = parrafoActual[indiceFrag];

    if (indiceFrag >= parrafoActual.length) {
      const textoCompleto = parrafoActual.map(f => f.text).join('');

      const pDefinitivo = document.createElement('p');
      pDefinitivo.textContent = textoCompleto;
      if (indiceParr === carta.length - 1) pDefinitivo.className = 'final';
      cartaContainer.appendChild(pDefinitivo);
      párrafosRenderizados.push(textoCompleto);

      if (pActual) {
        pActual.remove();
        pActual = null;
      }

      setTimeout(() => {
        indiceParr++;
        indiceFrag = 0;
        indiceCaracter = 0;
        textoAcumulado = '';
        escribirLetra();
      }, 1500);

      return;
    }

    if (indiceCaracter < fragmentoActual.text.length) {
      if (!estaSonando) {
        typeSound.play().catch(e => {
          console.warn("⚠️ No se pudo reproducir el sonido. Asegúrate de que 'tu-sonido.mp3' esté en la misma carpeta.");
        });
        estaSonando = true;
      }

      textoAcumulado += fragmentoActual.text[indiceCaracter];

      if (!pActual) {
        pActual = document.createElement('p');
        pActual.textContent = textoAcumulado;
        if (indiceParr === carta.length - 1) pActual.className = 'final';
        cartaContainer.appendChild(pActual);
      } else {
        pActual.textContent = textoAcumulado;
      }

      indiceCaracter++;
      setTimeout(escribirLetra, 30);
    } else {
      typeSound.pause();
      typeSound.currentTime = 0;
      estaSonando = false;

      if (fragmentoActual.pause) {
        setTimeout(() => {
          indiceFrag++;
          indiceCaracter = 0;
          escribirLetra();
        }, 1500);
      } else {
        indiceFrag++;
        indiceCaracter = 0;
        escribirLetra();
      }
    }
  };

  escribirLetra();

});
