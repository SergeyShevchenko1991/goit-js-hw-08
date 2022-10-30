import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);
const lastTime = localStorage.getItem('time') || 0;

player.setCurrentTime(lastTime);

function updateTime(time) {
  localStorage.setItem('time', time);
}
const throttleUpdateTime = throttle(updateTime, 1000);

player.on('timeupdate', function (data) {
  throttleUpdateTime(data.seconds);
});
