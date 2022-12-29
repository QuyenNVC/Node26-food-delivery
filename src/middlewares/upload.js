const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(req, file);
    // Gọi callback để setup thư mục file sẽ được lưu vào
    cb(null, "./static/");
  },
  filename: (req, file, cb) => {
    // Tránh trường hợp cùng 1 thời điểm có 2 hoặc nhiều file cùng tên được upload lên
    const uniquePrefix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniquePrefix + "-" + file.originalname);
  },
});

module.exports = multer({
  storage,
});
