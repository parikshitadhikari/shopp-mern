import path from "path";
import express from "express";
import multer from "multer";
const router = express.Router();

// where we want to store image
// diskStorage means we want it to be on the server
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
    // cb is callback, null pretends to an error, 2nd arg is where we want out uploads to go
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

// check file types
function fileFilter(req, file, cb) {
  const filetypes = /jpe?g|png|webp/; // only allow jpeg, png and webp
  const mimetypes = /image\/jpe?g|image\/png|image\/webp/;

  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = mimetypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error("Images only!"), false);
  }
}

const upload = multer({ storage, fileFilter });
const uploadSingleImage = upload.single("image"); // only allow single file upload

router.post("/", (req, res) => {
  uploadSingleImage(req, res, function (err) {
    if (err) {
      return res.status(400).send({ message: err.message });
    }
    res.status(200).send({
      message: "Image uploaded successfully",
      image: `/${req.file.path}`,
    });
  });
});

export default router;
