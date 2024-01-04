//vimeo video player on hover
function hoverVideo(index, e) {
  this.querySelector('.video_image_container').style.display = "none";
  this.querySelector('.play_overlay').style.display = "block";
  // let num = index + 1;
  // let iframes = $('#player-' + num)[0];
  // let player = $f(iframes) ? $f(iframes) : '';
  // player.api('play');
}

function hideVideo(index, e) {
  this.querySelector('.video_image_container').style.display = "block";
  this.querySelector('.play_overlay').style.display = "none";
  // let num = index + 1;
  // let iframes = $('#player-' + num)[0];
  // let player = $f(iframes) ? $f(iframes) : '';
  // player.api('pause');
}

document.addEventListener('DOMContentLoaded', function () {
  let videoBlog = $(".chill-videos-item");
  [].forEach.call(videoBlog, function (item, index) {
    item.addEventListener('mouseover', hoverVideo.bind(item, index), false);
    item.addEventListener('mouseout', hideVideo.bind(item, index), false);
  });

  let figure2 = $(".chill-videos-item");
  let vid = figure2.find(".play-video");
  let videoNo = vid.length;

  for (let i = 1; i <= videoNo; i++) {
    let iframees = document.querySelector('#player-' + i);
    if (iframees && typeof Vimeo != 'undefined') {
      let playeer1 = new Vimeo.Player(iframees);
      playeer1.getDuration().then(function (duration) {
        let ids = document.querySelector('#player-' + i);
        if (ids) {
          ids.parentElement.parentElement.querySelector('.video-length').innerHTML = duration.toFixed(0) + ' sec';
        }
      });
    }
  }
})