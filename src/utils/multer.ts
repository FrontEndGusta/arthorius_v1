import multer from "multer";

// Configurando multer para armazenamento temporário do arquivo na memória
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

export default upload;
