/* ============================================================
   BLOCK #24 — blog-preview
   Reads posts from WP REST API or static data-posts attribute.
   Usage: <div class="px-bp-root" data-posts='[...]'></div>
   Or: <div class="px-bp-root" data-rest="/wp-json/wp/v2/posts?per_page=3"></div>
   ============================================================ */
(function () {
  "use strict";

  function renderCard(post) {
    var img = post.img
      ? '<div class="px-bp-img"><img src="' + escHtml(post.img) + '" alt="' + escHtml(post.imgAlt || post.title) + '" loading="lazy"></div>'
      : '';
    return (
      '<article class="px-bp-card">' +
        img +
        '<div class="px-bp-body">' +
          (post.tag ? '<span class="px-bp-tag">' + escHtml(post.tag) + '</span>' : '') +
          '<h3 class="px-bp-title">' + escHtml(post.title) + '</h3>' +
          (post.excerpt ? '<p class="px-bp-excerpt">' + escHtml(post.excerpt) + '</p>' : '') +
          '<a class="px-bp-cta" href="' + escHtml(post.url || '#') + '">' + escHtml(post.cta || 'Διαβάστε περισσότερα') + '</a>' +
        '</div>' +
      '</article>'
    );
  }

  function renderGrid(root, posts) {
    var grid = document.createElement('div');
    grid.className = 'px-bp-grid';
    grid.innerHTML = posts.map(renderCard).join('');
    root.appendChild(grid);
  }

  function escHtml(s) {
    return String(s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function init() {
    document.querySelectorAll('.px-bp-root').forEach(function (root) {
      var staticPosts = root.getAttribute('data-posts');
      var restUrl = root.getAttribute('data-rest');

      if (staticPosts) {
        try { renderGrid(root, JSON.parse(staticPosts)); } catch (e) {}
        return;
      }

      if (restUrl) {
        fetch(restUrl)
          .then(function (r) { return r.json(); })
          .then(function (data) {
            var posts = data.map(function (p) {
              return {
                title: p.title && p.title.rendered ? p.title.rendered.replace(/<[^>]+>/g, '') : '',
                excerpt: p.excerpt && p.excerpt.rendered ? p.excerpt.rendered.replace(/<[^>]+>/g, '').substring(0, 140) + '...' : '',
                url: p.link,
                tag: p._embedded && p._embedded['wp:term'] ? (p._embedded['wp:term'][0][0] || {}).name : '',
                img: p._embedded && p._embedded['wp:featuredmedia'] ? (p._embedded['wp:featuredmedia'][0] || {}).source_url : '',
                cta: 'Διαβάστε περισσότερα'
              };
            });
            renderGrid(root, posts);
          })
          .catch(function () {});
        return;
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
