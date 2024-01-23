import connection from "../mysql_connect.js";

export const createBook = async (req, res) => {
  try {
    const {
      author,
      title,
      highlight,
      yearOfRelease,
      coverImage,
    } = req.body;

    const existingRows = await connection.promise().query(
      `SELECT * FROM book_inventory WHERE title = ?`,
      [title]
    );

    if (existingRows.length > 0) {
      res.status(400).json({
        message: "Data already exists",
      });

      return;
    }

    await connection.promise().query(
      `INSERT INTO book_inventory (title, author, highlight, yearOfRelease, coverImage) 
          VALUES (?, ?, ?, ?, ?)`,
      [title, author, highlight, yearOfRelease, coverImage],
    );
    res.status(200).json({
      message: 'Book successfully created',
      data: {
        title,
        author,
        highlight,
        yearOfRelease,  
      },
    })
  } catch(e) {
    res.status(500).json({
      message: e,
    });
  };
};

export const showBookData = async (_, res) => {
  try {
    const data = await connection.promise().query(
      `SELECT id, author, title, highlight, yearOfRelease FROM book_inventory`
    );
    
    res.status(200).json({
      bookList: data[0],
    });
  } catch(e) {
    res.status(500).json({
      message: e,
    });
  }
};

export const updateBookData = async (req, res) => {
  try {
    const { id: bookId } = req.params;

    const {
      author,
      title,
      highlight,
      yearOfRelease,
      coverImage,
    } = req.body;

    await connection.promise().query(
      `UPDATE book_inventory SET author = ?, title = ?, highlight = ?, yearOfRelease = ?, coverImage = ? WHERE id = ?`,
      [author, title, highlight, yearOfRelease, coverImage, bookId],
    );

    res.status(200).json({
      message: "Data updated",
      data: {
        author,
        title,
        highlight,
        yearOfRelease,
      },
    })
  } catch(e) {
    res.status(500).json({
      message: e,
    });
  }
};

export const deleteBookData = async (req, res) => {
  try {
    const { id: bookId } = req.params;

    await connection.promise().query(
      `DELETE FROM book_inventory WHERE id = ?`,
      [bookId],
    );

    res.status(200).json({
      message: "Data successfully deleted",
    })
  } catch(e) {
    res.status(200).json({
      message: e,
    });
  }
};