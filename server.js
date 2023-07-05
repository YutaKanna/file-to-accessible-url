const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 3000;

// ファイルの保存先とファイル名の設定
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

// ファイルのアップロード処理
const upload = multer({ storage: storage });

// CORS設定
app.use(cors());

// 静的ファイルとして uploads ディレクトリを公開
app.use(express.static('uploads'));

app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  const fileUrl = `${req.protocol}://${req.get('host')}/${req.file.filename}`;
  res.send(fileUrl);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
