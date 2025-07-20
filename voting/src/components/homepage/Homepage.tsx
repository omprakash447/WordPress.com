import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import React, { useEffect, useState } from "react";
import { UseProvider } from "../../middlewere/authmiddlewere/checkauth";

dayjs.extend(relativeTime);

type PostType = {
  id: number;
  title: string;
  details: string;
  image?: string;
  date?: string;
  comments?: number;
  likes?: number;
  author: string;
};

function Homepage() {
  const [activeTab, setActiveTab] = useState<"recommended" | "myposts">("recommended");
  const [create, setCreate] = useState<boolean>(false);
  const { isloggedin } = UseProvider();

  const [title, setTitle] = useState<string>("");
  const [details, setDetails] = useState<string>("");
  const [imgurl, setImgUrl] = useState<string>("");
  const [publicPosts, setPublicPosts] = useState<PostType[]>([]);
  const [userPosts, setUserPosts] = useState<PostType[]>([]);

  //Fetch all public posts
  const fetchPublicPosts = async () => {
    try {
      const response = await fetch("http://localhost:2000/api/post/public-post");
      const data = await response.json();

      console.log("the data is : ",data);
      
      const formatted = data.result.map((post: any, index: number) => {
        const postDate = post.postDate ? dayjs(post.postDate) : null;

        console.log("Post Date Raw:", post.postDate);

        return {
          id: index,
          title: post.title || "Untitled",
          details: post.details || "",
          image: post.imgurl || "https://via.placeholder.com/400x200.png?text=No+Image",
          author: post.name || "Anonymous",
          date: postDate && postDate.isValid() ? postDate.fromNow() : "Unknown",
          fullDate: postDate && postDate.isValid()
            ? postDate.format("MMM D, YYYY h:mm A")
            : "",
          comments: 0,
          likes: 0,
        };
      });

      setPublicPosts(formatted);
    } catch (error) {
      console.error("Error fetching public posts:", error);
    }
  };

  //Fetch logged-in user's own posts
  const fetchLoggedinUserPosts = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const res = await fetch("http://localhost:2000/api/post/get-user-post", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("Failed to fetch user posts");
      const data = await res.json();
      const formatted = data.result.map((post: any, index: number) => ({
        id: post.postid || index,
        title: post.title,
        details: post.details,
        image: post.imgurl,
        author: "You",
        date: post.postDate ? dayjs(post.postDate).fromNow() : "Just now",
        comments: 0,
        likes: 0,
      }));
      setUserPosts(formatted);
    } catch (err) {
      console.error("Error fetching user posts:", err);
    }
  };

  // Handle post creation
  const createPost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:2000/api/table/posttable/user-post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, details, imgurl }),
      });
      const data = await res.json();

      console.log(data);
      
      if (res.ok) {
        setTitle("");
        setDetails("");
        setImgUrl("");
        setCreate(false);
        alert("Post created successfully!");
        fetchLoggedinUserPosts();
      } else {
        alert(data.message || "Post creation failed.");
      }
    } catch (err) {
      console.error("Error creating post:", err);
      alert("Error creating post.");
    }
  };

  // Handle post deletion
  const deletePost = async (postId: number) => {
    if (!confirm("Are you sure you want to delete this post?")) return;
    
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Unauthorized: Please log in");
        return;
      }

      const res = await fetch(`http://localhost:2000/api/delete/delete-post/${postId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      let message = "Failed to delete post.";
      if (res.ok) {
        const data = await res.json();
        message = data.message || "Post deleted successfully!";
      } else {
        try {
          const data = await res.json();
          message = data.message || `Error: ${res.status} ${res.statusText}`;
        } catch {
          const text = await res.text();
          message = text || `Error: ${res.status} ${res.statusText}`;
          if (res.status === 500) {
            message = text || "Server error: Failed to delete post. Check backend logs for details (database issue likely).";
          } else if (res.status === 401) {
            message = text || "Unauthorized: Invalid or expired token";
          } else if (res.status === 404) {
            message = text || "Post not found or you are not authorized to delete it";
          }
        }
      }

      alert(message);
      if (res.ok) {
        fetchLoggedinUserPosts(); // Refresh user posts
      }
    } catch (err) {
      console.error("Error deleting post:", err);
      alert("Failed to connect to server. Please check your network or backend server.");
    }
  };

  useEffect(() => {
    fetchPublicPosts();
    if (isloggedin) {
      fetchLoggedinUserPosts();
    }
  }, [isloggedin]);

  // Render a single post
  const renderPostCard = (post: PostType) => (
    <div key={post.id} className="col-12 col-md-8 mx-auto">
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body p-4">
          <h5 className="card-title fs-4 fw-bold">{post.title}</h5>
          <p className="card-subtitle text-muted mb-3">
            {post.author} · {post.date}
          </p>
          <p className="card-text">{post.details}</p>
          {post.image && (
            <img src={post.image} className="img-fluid rounded mb-3" alt="Post" />
          )}
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center gap-2">
              <button className="btn btn-outline-secondary btn-sm">Share</button>
              <span className="text-muted small">{post.comments || 0} comments</span>
              <button className="btn btn-outline-secondary btn-sm ms-2">Comment</button>
            </div>
            <div className="d-flex align-items-center gap-2">
              <span className="text-muted">{post.likes || 0} likes</span>
              {activeTab === "myposts" && (
                <button 
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => deletePost(post.id)}
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-light min-vh-100">
      <div className="container py-5">
        <div className="text-center mb-5">
          <p className="text-muted fs-5">WordPress Reader</p>
          <h1 className="display-5 fw-bold text-dark">
            Enjoy millions of blogs at your fingertips.
          </h1>
        </div>

        {/* Tabs */}
        <ul className="nav nav-tabs nav-justified mb-4 border-bottom">
          <li className="nav-item">
            <button
              className={`nav-link text-dark ${activeTab === "recommended" ? "active" : ""}`}
              onClick={() => setActiveTab("recommended")}
            >
              Recommended
            </button>
          </li>
          {isloggedin && (
            <li className="nav-item">
              <button
                className={`nav-link text-dark ${activeTab === "myposts" ? "active" : ""}`}
                onClick={() => setActiveTab("myposts")}
              >
                Your Posts
              </button>
            </li>
          )}
        </ul>

        {/* Recommended Posts */}
        {activeTab === "recommended" && (
          <div className="tab-pane fade show active">
            <div className="row g-4">
              {publicPosts
                .slice(0, isloggedin ? publicPosts.length : 3)
                .map(renderPostCard)}
              {!isloggedin && publicPosts.length > 3 && (
                <div className="col-12 col-md-8 mx-auto">
                  <div className="card border-0 shadow-sm mb-4 text-center">
                    <div className="card-body p-4">
                      <p className="card-text text-muted">
                        Want to see more amazing posts? Log in to unlock the full
                        experience!
                      </p>
                      <button
                        className="btn btn-primary"
                        onClick={() => (window.location.href = "/login")}
                      >
                        Log In to See More
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* User Posts */}
        {isloggedin && activeTab === "myposts" && (
          <div className="tab-pane fade show active">
            <div className="text-end mb-4">
              <button className="btn btn-success" onClick={() => setCreate(true)}>
                + Create New Post
              </button>
            </div>
            <div className="row g-4">
              {userPosts.length > 0 ? (
                userPosts.map(renderPostCard)
              ) : (
                <p className="text-center text-muted">
                  You haven't created any posts yet.
                </p>
              )}
            </div>
          </div>
        )}

        {/* Modal: Create Post */}
        {create && (
          <div
            className="modal fade show d-block"
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          >
            <div className="modal-dialog modal-dialog-centered modal-lg">
              <div className="modal-content">
                <div className="modal-header border-0">
                  <h5 className="modal-title fw-bold">Create New Post</h5>
                  <button
                    className="btn-close"
                    onClick={() => setCreate(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <form onSubmit={createPost}>
                    <div className="mb-3">
                      <label htmlFor="title" className="form-label fw-semibold">
                        Title
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="title"
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="details" className="form-label fw-semibold">
                        Details
                      </label>
                      <textarea
                        className="form-control"
                        id="details"
                        rows={4}
                        required
                        value={details}
                        onChange={(e) => setDetails(e.target.value)}
                      ></textarea>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="image" className="form-label fw-semibold">
                        Image URL
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="image"
                        value={imgurl}
                        onChange={(e) => setImgUrl(e.target.value)}
                      />
                    </div>
                    <div className="d-flex justify-content-end gap-2">
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => setCreate(false)}
                      >
                        Cancel
                      </button>
                      <button type="submit" className="btn btn-primary">
                        Post
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Homepage;