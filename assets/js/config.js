/* ==========================================================================
   Nowhr Dynamics — site configuration
   This is the only file you need to edit to wire up the form and the
   downloads. Everything else reads from here.
   ========================================================================== */

window.NOWHR = {

  /* ------------------------------------------------------------------ */
  /*  1. Google Form                                                     */
  /* ------------------------------------------------------------------ */
  /*  How to fill this in:
   *
   *  a) Create a Google Form with five SHORT ANSWER questions:
   *       Name · WhatsApp · Email · DAW · Plugin
   *     (Responses land in a Google Sheet: Responses → Link to Sheets.)
   *
   *     They must be short answer. A Google Form rejects the WHOLE submission
   *     when one answer does not fit its question, so a multiple-choice
   *     question here loses the entire contact, not just that column.
   *
   *  b) Open the live form, right-click → View page source, and search for
   *     "entry." — you will find one `entry.NNNNNNNNN` per question.
   *
   *  c) Paste the form's response URL below. It is the "viewform" URL with
   *     `viewform` swapped for `formResponse`:
   *       https://docs.google.com/forms/d/e/1FAIpQL.../formResponse
   *
   *  Until `action` is filled in, the form still works on the page — it just
   *  does not store anything, and it logs a warning to the console.
   */
  form: {
    action: 'https://docs.google.com/forms/d/e/1FAIpQLSc0_uIQ9Jjgv6R5qkhdBDBy8FRl2jNwXSXxCM_0TbIymzSGJw/formResponse',
    fields: {
      name:     'entry.57955336',
      whatsapp: 'entry.817370356',
      email:    'entry.1449390413',
      daw:      'entry.589139950',
      plugin:   'entry.19681736'
    }
  },

  /* ------------------------------------------------------------------ */
  /*  2. Downloads                                                       */
  /* ------------------------------------------------------------------ */
  /*  Upload the zipped .vst3 bundles as assets on a GitHub Release of this
   *  repository, then point each entry at the asset. Using the
   *  `releases/latest/download/<file>` form means these URLs never have to
   *  change again — publishing a new release is enough.
   */
  repo: 'https://github.com/andrebeltrame/Website-Nowhr-Dynamics',

  /*  One entry per platform build that exists. The pages already carry a
   *  Windows install tab; the moment a Windows build is uploaded, add a `win`
   *  entry here and a second <a class="dl-tile" data-dl="win"> to each plugin
   *  page and the tile appears with no other change.
   *
   *  `meta` is the line under the tile name. Keep it to facts that do not go
   *  stale — the size does not, a version number does.
   */
  downloads: {
    progressions: {
      version: '1.0.0 beta',
      mac: {
        url:  'https://github.com/andrebeltrame/Website-Nowhr-Dynamics/releases/latest/download/Progressions.zip',
        meta: '1,8 MB'
      }
    },
    'smart-review': {
      version: '1.0.0 beta',
      mac: {
        url:  'https://github.com/andrebeltrame/Website-Nowhr-Dynamics/releases/latest/download/SmartReview.zip',
        meta: '6,8 MB'
      }
    }
  },

  /* ------------------------------------------------------------------ */
  /*  3. Contact                                                         */
  /* ------------------------------------------------------------------ */
  email: 'andrebeltrame@gmail.com',

  /*  Beta support. `whatsapp` is digits only, country code first, no plus
   *  sign and no punctuation — that is the format wa.me expects. `display` is
   *  what a person reads.
   */
  support: {
    whatsapp: '5541995299700',
    display:  '+55 41 99529-9700'
  }
};
