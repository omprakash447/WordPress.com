import { connection } from "../config/db";

export const createPostTable = () => {
  const myquery = `
    CREATE TABLE IF NOT EXISTS postTable (
      postid INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(100) NOT NULL,
      details VARCHAR(1000) NOT NULL,
      imgurl VARCHAR(200) NOT NULL,
      postTime DATETIME DEFAULT CURRENT_TIMESTAMP,
      postDate DATETIME DEFAULT CURRENT_TIMESTAMP,
      userid INT,
      FOREIGN KEY (userid) REFERENCES userAuth(id) ON DELETE CASCADE
    );
  `;

  connection.query(myquery, (err) => {
    if (err) {
      console.log("Error creating postTable:", err);
    } else {
      console.log("postTable created successfully.");
    }
  });
};
