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
   *  a) Create a Google Form with four short-answer questions, in this order:
   *       Name · Email · DAW · Plugin
   *     (Responses land in a Google Sheet: Responses → Link to Sheets.)
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
      name:   'entry.57955336',
      email:  'entry.1449390413',
      daw:    'entry.589139950',

      // ⚠ TURN THIS BACK ON once the "plugin" question in the Google Form is a
      //   SHORT ANSWER question. Right now it is a multiple-choice question
      //   whose only option is "Opção 1", and a Google Form rejects the ENTIRE
      //   submission when one answer does not fit its question — so sending
      //   this field would mean losing every contact, not just this column.
      //
      //   Fix: open the form editor → click the "plugin" question → change the
      //   type from "Múltipla escolha" to "Resposta curta". Then swap the two
      //   lines below.
      plugin: ''
      // plugin: 'entry.19681736'
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
        url:  'https://github.com/andrebeltrame/Website-Nowhr-Dynamics/releases/latest/download/Progressions-1.0.0-macOS.zip',
        meta: '1,8 MB'
      }
    },
    'grid-frequency': {
      version: '1.0.0 beta',
      mac: {
        url:  'https://github.com/andrebeltrame/Website-Nowhr-Dynamics/releases/latest/download/GridFrequency-1.0.0-macOS.zip',
        meta: '6,5 MB'
      }
    }
  },

  /* ------------------------------------------------------------------ */
  /*  3. Contact                                                         */
  /* ------------------------------------------------------------------ */
  email: 'andrebeltrame@gmail.com'
};
