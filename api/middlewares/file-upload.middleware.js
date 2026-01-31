// api/middlewares/file-upload.middleware.js
import multer from 'multer';

/*
========================================================
FILE UPLOAD MIDDLEWARE — VERSION FINALE
✔ memoryStorage (RNCP SAFE)
✔ pas d’écriture disque par multer
✔ limite 20 Mo
✔ images uniquement
✔ UTF-8 SAFE (accents OK)
========================================================
*/

/* =========================
   STORAGE (MEMORY)
========================= */
const storage = multer.memoryStorage();

/* =========================
   LIMITES
========================= */
const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20 Mo

/* =========================
   TYPES AUTORISÉS
========================= */
const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

/* =========================
   FILE FILTER
========================= */
const fileFilter = (req, file, cb) => {
  if (ALLOWED_MIME_TYPES.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        'Format d’image non supporté (JPG, PNG, WEBP uniquement)',
      ),
      false,
    );
  }
};

/* =========================
   MULTER INSTANCE
========================= */
export const upload = multer({
  storage,
  limits: {
    fileSize: MAX_FILE_SIZE,
  },
  fileFilter,
});
