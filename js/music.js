const music = document.querySelector('#music');
const plusVolume = document.querySelector('.plus-volume');
const minusVolume = document.querySelector('.minus-volume');
const musicToggle = document.querySelector('.music-toggle');
const allBtns = document.querySelectorAll('.click');
const musicMenu = document.querySelector('.open-music-menu');
const controls = document.querySelectorAll('.music-controls');
const btnClickSound = document.querySelector('#button-click');
const mute = document.querySelector('.mute');

function initMusic() {
  let volume = 5;
  music.volume = volume / 10;

  const updateVolume = (change) => {
    volume = Math.min(10, Math.max(1, volume + change));
    music.volume = volume / 10;
  };

  plusVolume.addEventListener('click', () => updateVolume(1));
  minusVolume.addEventListener('click', () => updateVolume(-1));

  const togglePlayPause = () => {
    if (music.paused) {
      music.play();
      document.querySelector('.play').style.display = 'none';
      document.querySelector('.pause').style.display = 'flex';
      musicToggle.setAttribute('title', 'Выключить музыку');

    } else {
      music.pause();
      document.querySelector('.pause').style.display = 'none';
      document.querySelector('.play').style.display = 'flex';
      musicToggle.setAttribute('title', 'Включить музыку');
    }
  };

  musicToggle.addEventListener('click', togglePlayPause);

  function clickBtn() {
    btnClickSound.play();
  }

  allBtns.forEach((btn) => {
    btn.addEventListener('click', clickBtn);
  });

  musicMenu.addEventListener('click', () => {
    controls.forEach(control => control.classList.toggle('active'));
  });

  mute.addEventListener('click', () => {
    if (mute.classList.contains('active')) {
      mute.classList.remove('active');
      btnClickSound.volume = 1;
      mute.setAttribute('title', 'Отключить звук кнопок');
    } else {
      mute.classList.add('active');
      btnClickSound.volume = 0; 
      mute.setAttribute('title', 'Включить звук кнопок');
    }
    console.log(btnClickSound.volume);
  });
}

export {initMusic};