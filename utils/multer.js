const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, '/upload')
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + ' -' + file.originalname)
    }
  })
  const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'application/pdf' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true)
    }
    else {
      cb(new Error('Only PDF, JPEG, and PNG files are allowed'))
    }
  }

  const upload = multer({ storage: storage, fileFilter: fileFilter })


module.exports={upload}