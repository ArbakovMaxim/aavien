function aboutText() {
  const btn = document.querySelector('.btn-about-more');
  const HtmlText = `
    </br>
    <p>Beyond energy, we aim to actively support the railway sector through
        infrastructure development and rolling stock material supply, and serve 
        the marine industry with vessel support, spare parts, and technical 
        services — driving efficiency and reliability across all modes of transport.</p>
    </br>
    <p>At Aavien International, we stand for trust, innovation, and results. With decades 
      of experience and a future-forward mindset, we aim
      to be a key partner in the region’s sustainable energy growth, railway
      infrastructure development, Locomotive and rolling stock material supply, as well as the marine sector.
    </p>`
  btn.onclick = () => {
    const wrapperText = document.querySelector('.about-more-text');
    if (btn.classList.contains('active')) {
      btn.classList.remove('active');
      btn.innerHTML = 'Show more';
      wrapperText.innerHTML = '';
    }
    else {
      btn.classList.add('active');
      btn.innerHTML = 'Show less';
      wrapperText.innerHTML = HtmlText;
    }
  }
}

function setupTabSlider() {
  const tabs = document.querySelectorAll(".tab");
  const track = document.querySelector(".tabs__track");

  for (const tab of tabs) {
    tab.onclick = () => {
      const index = parseInt(tab.getAttribute("data-tab"));

      for (const t of tabs) t.classList.remove("active");
      tab.classList.add("active");

      track.style.transform = `translateX(-${index * 100}%)`;
    };
  }
}

document.addEventListener('DOMContentLoaded', function () {
  const burgerBtn = document.getElementById('burger-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const overlay = document.getElementById('overlay');
  const body = document.body;
  const mobileMenuLinks = document.querySelectorAll('.mobile-menu-item a');
  const mobileMenuButton = document.querySelector('.mobile-menu-button');

  function toggleMenu() {
    burgerBtn.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    overlay.classList.toggle('active');
    body.classList.toggle('menu-open');
    body.classList.toggle('hidden');
  }

  function closeMenu() {
    burgerBtn.classList.remove('active');
    mobileMenu.classList.remove('active');
    overlay.classList.remove('active');
    body.classList.remove('menu-open');
    body.classList.remove('hidden');
  }

  burgerBtn.onclick = () => { toggleMenu(); };

  overlay.onclick = () => { closeMenu(); };

  mobileMenuLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      closeMenu();

      const targetId = this.getAttribute('href');
      if (targetId.startsWith('#')) {
        e.preventDefault();
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          setTimeout(() => {
            targetElement.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }, 300);
        }
      }
    });
  });

  if (mobileMenuButton) {
    mobileMenuButton.addEventListener('click', function (e) {
      closeMenu();

      const targetId = this.getAttribute('href');
      if (targetId.startsWith('#')) {
        e.preventDefault();
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          setTimeout(() => {
            targetElement.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }, 300);
        }
      }
    });
  }

  window.addEventListener('resize', function () {
    if (window.innerWidth >= 768) {
      closeMenu();
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeMenu();
    }
  });
});

const input = document.querySelector("#phone");

const iti = window.intlTelInput(input, {
  initialCountry: "auto",
  geoIpLookup: callback => {
    fetch("https://ipapi.co/json")
      .then(res => res.json())
      .then(data => callback(data.country_code))
      .catch(() => callback("us"));
  },
  utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@18.1.1/build/js/utils.js",
});

function toggleContent(index) {
  const content = document.getElementById(`content-${index}`);
  const plus = content.parentElement.querySelector('.industrial__plus');
  for (let i = 0; i < 4; i++) {
    if (i !== index) {
      const otherContent = document.getElementById(`content-${i}`);
      const otherPlus = otherContent.parentElement.querySelector('.industrial__plus');
      otherContent.classList.remove('active');
      otherPlus.classList.remove('active');
    }
  }

  content.classList.toggle('active');
  plus.classList.toggle('active');
}
document.addEventListener('click', function (event) {
  if (!event.target.closest('.industries__wrapper-content')) {
    for (let i = 0; i < 4; i++) {
      const content = document.getElementById(`content-${i}`);
      const plus = content.parentElement.querySelector('.industrial__plus');
      content.classList.remove('active');
      plus.classList.remove('active');
    }
  }
});

function handleSubmit(e) {
  e.preventDefault();

  const formData = {
    name: document.getElementById("name").value.trim(),
    company: document.getElementById("Company").value.trim(),
    phone: document.getElementById("phone").value.trim(),
    email: document.getElementById("email").value.trim(),
    description: document.getElementById("description").value.trim()
  };

  fetch("send.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(formData)
  })
    .then((res) => {
      if (!res.ok) throw new Error("Failed to send");
      return res.json();
    })
    .then((data) => {
      if (data.success) {
        showSuccessAnimation();
        setTimeout(() => {
          document.querySelector('form').reset();
        }, 2000);
      } else {
        alert("Something went wrong. Please try again.");
      }
    })
    .catch((err) => {
      console.error(err);
      alert("Failed to send message.");
    });
}

function showSuccessAnimation() {
  const overlay = document.getElementById('successOverlay');
  overlay.classList.add('show');
  setTimeout(() => {
    overlay.classList.add('fade-out');
    overlay.classList.remove('show');
    setTimeout(() => {
      overlay.classList.remove('fade-out');
    }, 2000);
  }, 3000);
}


aboutText();
setupTabSlider();



const certificates = [
  {
    img: "img/certificates-1x2.jpg",
  },
  {
    img: "img/certificates-2x2.jpg",
  },
  {
    img: "img/certificates-3x2.jpg",
  }
];

let currentImageIndex = 0;

function openModal(index) {
  currentImageIndex = index;
  const modal = document.getElementById('certificateModal');
  const modalImage = document.getElementById('modalImage');
  const modalCaption = document.getElementById('modalCaption');

  updateModalContent();

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const modal = document.getElementById('certificateModal');
  modal.classList.remove('active');
  document.body.style.overflow = 'auto';
}

function nextImage() {
  currentImageIndex = (currentImageIndex + 1) % certificates.length;
  updateModalContent();
}

function prevImage() {
  currentImageIndex = (currentImageIndex - 1 + certificates.length) % certificates.length;
  updateModalContent();
}

function updateModalContent() {
  const modalImage = document.getElementById('modalImage');
  const modalCaption = document.getElementById('modalCaption');
  const cert = certificates[currentImageIndex];

  modalImage.innerHTML = `
                <div class="cert-icon" style="font-size: 72px; margin-bottom: 30px;">
                <img src="${cert.img}" alt="Certificate Image" style="max-width: 100%; max-height: 100%; border-radius: 12px;">
                </div>
            `;

  modalCaption.textContent = cert.description;
}

window.onclick = function (event) {
  const modal = document.getElementById('certificateModal');
  if (event.target === modal) {
    closeModal();
  }
}

document.addEventListener('keydown', function (event) {
  const modal = document.getElementById('certificateModal');
  if (modal.classList.contains('active')) {
    switch (event.key) {
      case 'Escape':
        closeModal();
        break;
      case 'ArrowLeft':
        prevImage();
        break;
      case 'ArrowRight':
        nextImage();
        break;
    }
  }
});
