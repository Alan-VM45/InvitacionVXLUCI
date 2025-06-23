// ========== CUENTA REGRESIVA ==========
const contador = document.getElementById('contador');
const fechaEvento = new Date("November 22, 2025 22:00:00").getTime();

function actualizarContador() {
  const ahora = new Date().getTime();
  const distancia = fechaEvento - ahora;

  if (distancia <= 0) {
    contador.innerHTML = "¡El evento ya comenzó!";
    return;
  }

  const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
  const horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
  const segundos = Math.floor((distancia % (1000 * 60)) / 1000);

  contador.innerHTML = `${dias} días ${horas}h ${minutos}m ${segundos}s`;
}

setInterval(actualizarContador, 1000);
actualizarContador();


// ========== MÚSICA CON BOTÓN ==========
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get("musica") === "true") {
  const audio = document.createElement("audio");
  audio.src = "Musica/ABBA - Dancing Queen (Official Lyric Video).mp3";
  audio.autoplay = true;
  audio.loop = true;
  audio.hidden = true;
  document.body.appendChild(audio);

  const btn = document.createElement("button");
  btn.textContent = "🔊 Pausar música";
  Object.assign(btn.style, {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    padding: "10px 15px",
    borderRadius: "30px",
    border: "none",
    backgroundColor: "#fff",
    color: "#000",
    fontWeight: "bold",
    cursor: "pointer",
    boxShadow: "0 0 10px rgba(255,255,255,0.3)",
    zIndex: "1000",
    transition: "all 0.3s ease"
  });

  let estaPausado = false;

  btn.onclick = () => {
    estaPausado ? audio.play() : audio.pause();
    btn.textContent = estaPausado ? "🔊 Pausar música" : "🎵 Reanudar música";
    estaPausado = !estaPausado;
  };

  document.body.appendChild(btn);
}


// ========== MODAL PARA TARJETAS ==========
const modal = document.getElementById('modal');
const modalBody = document.getElementById('modal-body');
const closeBtn = modal.querySelector('.close-btn');

document.querySelectorAll('.card-title').forEach(title => {
  title.style.cursor = 'pointer';
  title.addEventListener('click', () => {
    const cardContent = title.nextElementSibling.innerHTML;
    modalBody.innerHTML = cardContent;
    modal.classList.add('show');             // Aquí se abre el modal con clase 'show'
    document.body.style.overflow = 'hidden'; // Evita scroll detrás del modal
  });
});

closeBtn.addEventListener('click', () => {
  modal.classList.remove('show');            // Aquí se cierra el modal
  document.body.style.overflow = 'auto';
});

// Cerrar modal al hacer click fuera del contenido
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.remove('show');          // También se cierra si clickeás fuera del contenido
    document.body.style.overflow = 'auto';
  }
});


// ========== ESTRELLAS FLOTANTES ==========
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
document.body.appendChild(canvas);

Object.assign(canvas.style, {
  position: 'fixed',
  top: '0',
  left: '0',
  zIndex: '-1',
});

let stars = [];

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function initStars() {
  stars = [];
  for (let i = 0; i < 100; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.5,
      d: Math.random() * 0.05 + 0.01
    });
  }
}

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#fff';
  for (let s of stars) {
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, 2 * Math.PI);
    ctx.fill();
    s.y += s.d * 3;
    if (s.y > canvas.height) {
      s.y = 0;
      s.x = Math.random() * canvas.width;
    }
  }
  requestAnimationFrame(drawStars);
}

window.addEventListener('resize', () => {
  resize();
  initStars();
});

resize();
initStars();
drawStars();
