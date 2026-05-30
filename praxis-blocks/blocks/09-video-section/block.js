/**
 * px-video-section — Side-by-side video + text.
 *
 * Reads on .px-video-section:
 *   data-video-src="..."     mp4 URL or YouTube/Vimeo embed URL
 *   data-poster="..."        Poster for native video
 *   data-autoplay="true"     Autoplay native video (muted/loop)
 *   data-layout="left|right"
 *
 * Builds the media element from data-* and inserts .px-video-section-media.
 * Native video shows a play button overlay; click removes overlay and plays.
 * Embeds render as a lazy iframe.
 * No globals. IIFE-wrapped.
 */
;(function () {
  'use strict';

  const section = document.querySelector('.px-video-section');
  if (!section) return;

  const src      = section.dataset.videoSrc || '';
  const poster   = section.dataset.poster   || '';
  const autoplay = section.dataset.autoplay === 'true';
  const reduced  = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!src) return;

  // Create media wrapper
  const media = document.createElement('div');
  media.className = 'px-video-section-media';

  const isEmbed = src.includes('youtube') || src.includes('vimeo') || src.includes('embed');

  if (isEmbed) {
    // Lazy iframe — load only when visible
    const placeholder = document.createElement('div');
    placeholder.style.cssText = 'width:100%;height:100%;background:var(--bg3);';

    const observer = new IntersectionObserver(entries => {
      if (!entries[0].isIntersecting) return;
      const iframe = document.createElement('iframe');
      iframe.src             = src;
      iframe.allow           = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
      iframe.allowFullscreen = true;
      iframe.loading         = 'lazy';
      iframe.setAttribute('title', 'Video');
      placeholder.replaceWith(iframe);
      observer.disconnect();
    }, { rootMargin: '300px' });

    media.appendChild(placeholder);
    section.appendChild(media);
    observer.observe(media);

  } else {
    // Native video
    const video = document.createElement('video');
    video.src        = src;
    video.poster     = poster;
    video.playsInline = true;
    video.muted      = true;
    video.setAttribute('aria-hidden', 'true');

    if (autoplay && !reduced) {
      video.autoplay = true;
      video.loop     = true;
    }

    media.appendChild(video);

    // Play button overlay (skip if autoplay)
    if (!autoplay || reduced) {
      const playBtn = document.createElement('button');
      playBtn.className = 'px-vs-play-btn';
      playBtn.setAttribute('aria-label', 'Play video');
      playBtn.innerHTML = `
        <span class="px-vs-play-circle">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="var(--white)" aria-hidden="true">
            <polygon points="5 3 19 12 5 21 5 3"/>
          </svg>
        </span>`;

      playBtn.addEventListener('click', () => {
        video.muted = false;
        video.play();
        playBtn.remove();
      });

      media.appendChild(playBtn);
    }

    section.appendChild(media);
  }
})();
