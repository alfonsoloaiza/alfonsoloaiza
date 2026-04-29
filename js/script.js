document.addEventListener('DOMContentLoaded', () => {
  const browserLang = navigator.language.split('-')[0];  
  const finalLang = browserLang || 'es';

  if(finalLang === 'es')
      setLanguage('es');
    else
      setLanguage('en');

  const slides = document.querySelectorAll('.container-img.slider');  

  const btnNext = document.getElementById('nextBtn');
  const btnPrev = document.getElementById('prevBtn');
  let currentIndex = 0;



  const updateSlider = (index) => {
    slides.forEach((slide, i) => {
      // Buscamos la imagen dentro del slide actual
      const imagenHijo = slide.querySelector('img');

      if (i === index) {
        slide.classList.add('slider-show');
        slide.classList.remove('slider-hidden');
        
        // Si la imagen existe, añadimos .active
        if (imagenHijo) imagenHijo.classList.add('active');
        
      } else {
        slide.classList.remove('slider-show');
        slide.classList.add('slider-hidden');
        
        // Si la imagen existe, quitamos .active
        if (imagenHijo) imagenHijo.classList.remove('active');
      }
    });
};

  // const updateSlider = (index) => {
  //   slides.forEach((slide, i) => {
  //     if (i === index) {
  //       slide.classList.add('slider-show');
  //       slide.classList.remove('slider-hidden');
  //     } else {
  //       slide.classList.remove('slider-show');
  //       slide.classList.add('slider-hidden');
  //     }
  //   });
  // };

  // Botón Siguiente
  btnNext.addEventListener('click', (e) => {
    e.preventDefault();
    currentIndex = (currentIndex + 1) % slides.length;
    updateSlider(currentIndex);
  });

  // Botón Anterior
  btnPrev.addEventListener('click', (e) => {
    e.preventDefault();
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateSlider(currentIndex);
  });

  // Inicializar el primer slide
  updateSlider(currentIndex);
});


const sections = Array.from(document.querySelectorAll('.scroll-item'));
let currentIndex = 0;

function scrollToSection(index) {
  var i = Math.max(0, Math.min(index, sections.length - 1));
  window.scrollTo({ top: sections[i].offsetTop, behavior: 'smooth' });
}


// Función principal para cambiar el idioma
async function setLanguage(lang) {
  try {
    // 1. Intentar cargar el archivo de recursos (JSON)
    const response = await fetch(`./locales/${lang}.json`);

    if (!response.ok) throw new Error("No se pudo cargar el archivo de idioma.");

    const translations = await response.json();

    // 2. Buscar todos los elementos que tengan el atributo 'data-i18n'
    const elements = document.querySelectorAll('[data-i18n]');

    elements.forEach(el => {
      // Obtenemos la clave (ej: "welcome_message")
      const key = el.getAttribute('data-i18n');

      // Buscamos el valor en nuestro JSON
      if (translations[key]) {
        // AQUÍ es donde colocas el valor dentro del H1 o cualquier etiqueta
        el.textContent = translations[key];
      }
    });

    // Opcional: Guardar la preferencia en el navegador para la próxima visita
    localStorage.setItem('user-lang', lang);

    // Opcional: Cambiar el atributo 'lang' del HTML para accesibilidad y SEO
    document.documentElement.lang = lang;

  } catch (error) {
    console.error("Error en la traducción:", error);
  }
}


// Al final de tu código actual en main.js
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js')
    .then(() => console.log("PWA lista para trabajar."))
    .catch(err => console.log("Fallo en el SW", err));
}

function mostrarMensaje() {
      document.getElementById('mensaje_exito').style.display = 'block';
  }


// const form = document.getElementById('form');
// form.addEventListener('submit', (e) => {
//   e.preventDefault();

//   const urlAction = "https://docs.google.com/forms/d/e/1FAIpQLSf7H8IIZAewRu7BEsRuCQbqY49KUa226Mu4Nbi51eEHIFruEw/formResponse";

//   const params = new URLSearchParams();

//   params.append('entry.1633920210', document.getElementById('company-name').value);
//   params.append('entry.227649005', document.getElementById('email').value);
//   params.append('entry.359346719', document.getElementById('ask-anything').value);
//   params.append('entry.1846923513', document.getElementById('link-to-job').value);
//   params.append('entry.850572067', document.getElementById('work-mode').value);

//   fetch(urlAction, {
//     method: 'POST',
//     mode: 'no-cors',
//     headers: {
//       'Content-Type': 'application/x-www-form-urlencoded'
//     },
//     body: params.toString(),
//   }).then(() => {
//     alert("¡Datos enviados!");
//     form.reset();
//   }).catch(error => console.error('Error:', error));

// });

async function mostrarMensaje() {
  alert("¡Gracias! Tus datos han sido enviados.");
  // const form = document.getElementById('form');
  // const urlAction = "https://docs.google.com/forms/d/e/1FAIpQLSf7H8IIZAewRu7BEsRuCQbqY49KUa226Mu4Nbi51eEHIFruEw/formResponse";

  // // Recolectamos los datos manualmente para asegurar que no vayan vacíos
  // const datos = new URLSearchParams();
  // datos.append('entry.2005620554', form.querySelector('input[name="entry.2005620554"]').value);
  // datos.append('entry.1045781291', form.querySelector('input[name="entry.1045781291"]').value);
  // datos.append('entry.413783281', form.querySelector('textarea[name="entry.413783281"]').value);
  // datos.append('entry.839337160', form.querySelector('input[name="entry.839337160"]').value);
  // datos.append('entry.1295736863', form.querySelector('select[name="entry.1295736863"]').value);

  // try {
  //   await fetch(urlAction, {
  //     method: 'POST',
  //     body: datos.toString(),
  //     mode: 'no-cors',
  //     headers: {
  //       'Content-Type': 'application/x-www-form-urlencoded'
  //     }
  //   });

  //   // Si llega aquí, el envío se hizo
  //   console.log(datos.toString());
  //   alert("¡Gracias! Tus datos han sido enviados.");
  //   form.reset();
  // } catch (error) {
  //   console.error("Error al enviar:", error);
  //   alert("Hubo un problema, pero intentaremos enviarlo de nuevo.");
  // }
};