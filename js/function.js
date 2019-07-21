var jsonFile = [
{
  date: 1563744181242,
  temperature: {
    night: +14,
    day: +24,
  },
  cloudiness: 'Ясно',
  snow: false,
  rain: false,
},
{
  date: 1563830581242,
  temperature: {
    night: +15,
    day: +26,
  },
  cloudiness: 'Ясно',
  snow: false,
  rain: true,
},
{
  date: 1563916981242,
  temperature: {
    night: +16,
    day: +27,
  },
  cloudiness: 'Облачно',
  snow: true,
  rain: false,
},
{
  date: 1564003381242,
  temperature: {
    night: +17,
    day: +28,
  },
  cloudiness: 'Облачно',
  snow: true,
  rain: true,
},
{
  date: 1564089781242,
  temperature: {
    night: +15,
    day: +23,
  },
  cloudiness: 'Облачно',
  snow: false,
  rain: false,
},
{
  date: 1564176181242,
  temperature: {
    night: +13,
    day: +23,
  },
  cloudiness: 'Ясно',
  snow: true,
  rain: true,
},
{
  date: 1564262581242,
  temperature: {
    night: +14,
    day: +22,
  },
  cloudiness: 'Облачно',
  snow: false,
  rain: true,
},
{
  date: 1564348981242,
  temperature: {
    night: +1,
    day: +3,
  },
  cloudiness: 'Облачно',
  snow: false,
  rain: true,
},
]

function setDayToRussian(day) {
  var dayData = ['Воскресенье','Понедельник','Вторник','Среда','Четверг','Пятница','Суббота'];
  return dayData[day];
};

function setMounthToRussian(mounth) {
  var mounthData = ['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря'];
  return mounthData[mounth];
};

function setItemPicture(cloud, snow, rain) {
  var positionPicture = '';
  if (cloud == 'Ясно') {
    if (snow == true && rain == true) {
      positionPicture = '-540px -318px';
    } else if (snow == true && rain == false) {
      positionPicture = '-462px -46px';
    } else if (snow == false && rain == true) {
      positionPicture = '-620px -44px';
    } else {
      positionPicture = '-60px -44px';
    }
  } else if (cloud == 'Облачно') {
    if (snow == true && rain == true) {
      positionPicture = '-140px -182px';
    } else if (snow == true && rain == false) {
      positionPicture = '-622px -184px';
    } else if (snow == false && rain == true) {
      positionPicture = '-306px -112px';
    } else {
      positionPicture = '-224px -52px';
    }
  }
  return positionPicture;
};
function checkPrecipitation(snow, rain) {
  var precipitation = '';
  if (snow == true && rain == true) {
    precipitation = 'Дождь со снегом';
  } else if (snow == true && rain == false) {
    precipitation = 'Снег';
  } else if (snow == false && rain == true) {
    precipitation = 'Дождь';
  } else {
    precipitation = 'Без осадков';
  }
  return precipitation;
}
 
var container = document.querySelector('.item__container');
jsonFile.forEach(function(item){
  var itemDate = new Date(item.date);
  var dayNow = 1563744181242;

  if (itemDate >= dayNow) {
    var itemWrapper = document.createElement('div');
    var itemDay = document.createElement('div');
    var itemTitle = document.createElement('div');
    var itemCloudness = document.createElement('div');
    var itemTemperatureDay = document.createElement('div');
    var itemTemperatureNight = document.createElement('div');
    var itemPrecipitation = document.createElement('div');

    itemWrapper.className = 'item__wrapper swiper-slide';
    container.appendChild(itemWrapper);

    itemDay.className = 'item__calendar';
    if (dayNow == item.date) {
      itemDay.innerHTML = 'Сегодня';
    } else {
      itemDay.innerHTML = setDayToRussian(itemDate.getDay());
    }

    itemTitle.className = 'item__day';
    itemTitle.innerHTML = itemDate.getDate() + '&nbsp;' + setMounthToRussian(itemDate.getMonth());

    itemWrapper.appendChild(itemDay);
    itemWrapper.appendChild(itemTitle);

    itemCloudness.className = 'item__picture';
    itemCloudness.style.backgroundPosition = setItemPicture(item.cloudiness,item.snow,item.rain);
    itemWrapper.appendChild(itemCloudness);

    itemTemperatureDay.className = 'item__temperature_day';
    itemTemperatureDay.innerHTML = 'днем ' + item.temperature.day + '&deg;'
    itemTemperatureNight.className= 'item__temperature_night';
    itemTemperatureNight.innerHTML = 'ночью ' + item.temperature.night + '&deg;'
    itemWrapper.appendChild(itemTemperatureDay);
    itemWrapper.appendChild(itemTemperatureNight);

    itemPrecipitation.className = 'item__precipitation';
    itemPrecipitation.innerHTML = checkPrecipitation(item.snow,item.rain);
    itemWrapper.appendChild(itemPrecipitation);
  }
});


window.onload = function() {
  var mySwiper = new Swiper ('.swiper-container', {
    wrapperClass: 'swiper-wrapper',
    speed: 400,
    spaceBetween: 4,
    slidesPerView: 4,
    navigation: {
      nextEl: '.swiper__next',
      prevEl: '.swiper__prev',
    }, 
    breakpoints: {
      1200: {
        slidesPerView: 3,
      },
      991: {
        slidesPerView: 2,
      },
      768: {
        slidesPerView: 1,
      },
    },
  });
}