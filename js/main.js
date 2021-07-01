const swiper = new Swiper('.swiper-container', {

  loop: true,

  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },

  scrollbar: {
    el: '.swiper-scrollbar',
  },

  autoplay: {
    delay: 5000,
  },

  speed: 1000,
});


const nav = document.querySelector('.nav'),
  links = nav.querySelectorAll('.nav-link'),
	containers = document.querySelectorAll('section'),
  contact = document.querySelector('a.button');

const offset = document.documentElement.clientHeight > 780 ? 200 : 200;

function switchLinks(link) {
  let current = 0;
  links.forEach(function(item, index) {
    item.classList.remove('active');
    if(item === link) {
      item.classList.add('active');
      current = index;
    }
  });
  return current;
}

function selectContainer(current) {
  containers.forEach(function(item, index) {
    if(index == current) {
      scroll({top: item.offsetTop-20, behavior: "smooth"});
    }
  });
}

window.addEventListener('scroll', function() {
  const header = document.querySelector('.header');
  const height = header.offsetHeight;
  const body = document.querySelector('body');
  if(pageYOffset > nav.offsetTop) {
    header.classList.add('header-fixed');
    body.style.marginTop = (height+50) + 'px';
  } else {
    header.classList.remove('header-fixed');
    body.style.marginTop = 0;
  }

  containers.forEach(function(item, index) {
    if(item.offsetTop-offset <= pageYOffset) {
      switchLinks(links[index]);
    }
    let scrollHeight = Math.max(
      document.body.scrollHeight, document.documentElement.scrollHeight,
      document.body.offsetHeight, document.documentElement.offsetHeight,
      document.body.clientHeight, document.documentElement.clientHeight
    );

    if(pageYOffset >= scrollHeight - document.documentElement.clientHeight - offset) {
      switchLinks(links[links.length-1]);
    }
  });
});

function navClickHandler(e) {
  if (e.target.tagName !== 'A') {
    return;
  }

  e.target.classList.remove('active');

	let current = switchLinks(e.target);

	selectContainer(current);
}

nav.addEventListener('click', navClickHandler);

contact.addEventListener('click', function() {
  const lastInd = links.length-1;
  switchLinks(links[lastInd]);
  selectContainer(lastInd);
});

if(document.documentElement.clientWidth >= 1000) {
  particlesJS.load('particles-js', 'particles.json', function() {
    console.log('callback - particles.js config loaded');
  });
}

AOS.init();




