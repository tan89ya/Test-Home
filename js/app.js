document.querySelector('.burger').addEventListener('click', function() {
	this.classList.toggle('active');
	document.querySelector('.nav-header').classList.toggle('open');
})

let dropdown = document.getElementsByClassName("dropdown-btn");
let i;

for (i = 0; i < dropdown.length; i++) {
  dropdown[i].addEventListener("click", function() {
    this.classList.toggle("active");
    let dropdownContent = this.nextElementSibling;
    if (dropdownContent.style.display === "block") {
      dropdownContent.style.display = "none";
    } else {
      dropdownContent.style.display = "block";
    }
  });
}

function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}
window.onclick = function(e) {
  if (!e.target.matches('.dropbtn')) {
  let myDropdown = document.getElementById("myDropdown");
    if (myDropdown.classList.contains('show')) {
      myDropdown.classList.remove('show');
    }
  }
}

let swiper = new Swiper(".mySwiper", {
	effect: "cards",
	grabCursor: true,
	loop: true,
  centeredSlides: true,
	effect: 'cards',
	cardsEffect: {
		perSlideOffset: 15, 
		rotate: false, 
		perSlideRotate: 5,
		slideShadows: false, 
	},
	navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

function getSuggestions(query) {
  $.ajax({
    url: 'https://suggest-maps.yandex.ru/suggest-geo',
    dataType: 'jsonp',
    data: {
      part: query,
      lang: 'ru_RU',
      v: '5',
      search_type: 'all',
      callback: 'suggestCallback',
      html: 'false',
      apikey:  '410768bc-b606-4b5b-9dcb-9082d6c4b6a3' // Замените на свой API-ключ
    },
    success: function(response) {
      if (response && response[1]) {
        let suggestions = response[1];
        let suggestionsList = document.getElementById('suggestionsList');
        suggestionsList.innerHTML = '';

        for (let i = 0; i < suggestions.length; i++) {
          let suggestion = suggestions[i];
          if (suggestion[0] === 'geo') {
            let suggestionItem = document.createElement('option');
            suggestionItem.value = suggestion[1]; 
            suggestionItem.textContent = suggestion[1];
            suggestionsList.appendChild(suggestionItem);
          }
        }
      } else {
        console.error('Неверный формат ответа:', response);
      }
    },
    error: function(xhr, status, error) {
      console.error('Ошибка запроса:', error);
    }
  });
}



let suggestionsList = document.getElementById('suggestionsList');
let inputField = document.getElementById('inputField');

suggestionsList.addEventListener('click', function(event) {
  if (event.target.tagName === 'LI') {
    let selectedText = event.target.textContent;
    inputField.value = selectedText;
  }
});

$(window).scroll(function() {
	if ($(this).scrollTop() > $(window).height()) {
		$('.top').addClass("active");
	} else {
		$('.top').removeClass("active");
	};
});
$('.top').click(function() {
	$('html, body').stop().animate({scrollTop: 0});
});

