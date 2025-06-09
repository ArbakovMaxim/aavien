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

aboutText();
setupTabSlider();