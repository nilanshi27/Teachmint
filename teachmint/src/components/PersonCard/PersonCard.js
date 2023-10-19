import { useState, useEffect } from "react";
import "./PersonCard.scss";
import { useNavigate } from "react-router-dom";

export const PersonCard = () => {
  const [data, setData] = useState(null);
  const [posts, setPosts] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error));
  }, []);
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((json) => setPosts(json))
      .catch((error) => console.error(error));
  }, []);
  const countPost = (id) => {
    let count = 0;
    posts &&
      posts.forEach((postOfUser) => {
        if (postOfUser.userId === id) {
          count = count + 1;
        }
      });
    return count;
  };

  return (
    <div>
      <h3>Directory</h3>
      {data &&
        data.map((userData) => {
          return (
            <div
              key={userData.id}
              onClick={() => {
                navigate("/user/" + userData.id, {
                  state: { posts: posts, users: userData },
                });
              }}
              className="data-wrapper"
              style={{ cursor: "pointer" }}
            >
              <div className="content-section">
                <div className="name-section">Name: {userData.name}</div>
                <div className="post-section">
                  Posts: {countPost(userData.id)}
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};
