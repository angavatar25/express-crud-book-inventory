import express from 'express';
import bookRouter from './router/book_inventory.js';

const app = express();
const PORT = process.env.PORT || 3009;

app.use(express.json({ limit: '20mb' }));

app.use('/book-inventory', bookRouter);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});