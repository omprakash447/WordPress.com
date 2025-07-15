import { connection } from "../config/db";

export const createPostTable = () => {
  const myquery = `
    CREATE TABLE IF NOT EXISTS postTable (
      postid int auto_increment primary key,
      title varchar(100) not null,
      details varchar(1000) not null,
      imgurl varchar(200) not null,
      userid int,
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
