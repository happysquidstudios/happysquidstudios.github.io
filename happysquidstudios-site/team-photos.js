/* ==========================================================================
   Drops each person's photo into their card on the home page.

   The card markup stays in index.html (so it still works with JS off and
   search engines can read it); the photo path lives only in team-data.js.
   Add a `photo:` to someone there and it shows up here automatically —
   no HTML to edit.

     photo:    "assets/team/martin-wilkinson.jpg"
     photoPos: "50% 25%"   // optional, nudges the crop if a face sits high

   A missing or broken path is not an error: the monogram just stays.
   ========================================================================== */
(function () {
  if (typeof TEAM_DATA === 'undefined') return;

  document.querySelectorAll('a.team-card[href*="?p="]').forEach(function (card) {
    var slug   = card.getAttribute('href').split('?p=')[1];
    var person = TEAM_DATA[slug];
    if (!person || !person.photo) return;

    var frame = card.querySelector('.tc-photo');
    if (!frame) return;

    var img = document.createElement('img');
    img.alt = person.name;
    img.loading = 'lazy';
    img.decoding = 'async';
    if (person.photoPos) img.style.objectPosition = person.photoPos;

    // reveal only once it has actually decoded, so a slow or broken
    // photo leaves the monogram in place rather than an empty hole
    img.addEventListener('load', function () { frame.classList.add('has-photo'); });
    img.addEventListener('error', function () { img.remove(); });

    frame.appendChild(img);        // must be in the DOM BEFORE src is set,
    img.src = person.photo;        // otherwise loading="lazy" never fires
  });
})();
