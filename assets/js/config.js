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
    action: '',                 // e.g. 'https://docs.google.com/forms/d/e/1FAIpQL…/formResponse'
    fields: {
      name:   'entry.000000001',
      email:  'entry.000000002',
      daw:    'entry.000000003',
      plugin: 'entry.000000004'
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

  downloads: {
    progressions: {
      version: '1.0.0 beta',
      mac: {
        url:  'https://github.com/andrebeltrame/Website-Nowhr-Dynamics/releases/latest/download/Progressions-macOS.zip',
        meta: 'VST3 · Universal (Intel + Apple Silicon) · macOS 10.13+'
      },
      win: {
        url:  'https://github.com/andrebeltrame/Website-Nowhr-Dynamics/releases/latest/download/Progressions-Windows.zip',
        meta: 'VST3 · 64-bit · Windows 10+'
      }
    },
    'grid-frequency': {
      version: '1.0.0 beta',
      mac: {
        url:  'https://github.com/andrebeltrame/Website-Nowhr-Dynamics/releases/latest/download/GridFrequency-macOS.zip',
        meta: 'VST3 · Universal (Intel + Apple Silicon) · macOS 10.13+'
      },
      win: {
        url:  'https://github.com/andrebeltrame/Website-Nowhr-Dynamics/releases/latest/download/GridFrequency-Windows.zip',
        meta: 'VST3 · 64-bit · Windows 10+'
      }
    }
  },

  /* ------------------------------------------------------------------ */
  /*  3. Contact                                                         */
  /* ------------------------------------------------------------------ */
  email: 'andrebeltrame@gmail.com'
};
