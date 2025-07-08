import { useState } from "react";
import { Link } from "react-router-dom";


function Homepage() {
    // NEW: Manage which tab is active
    const [activeTab, setActiveTab] = useState("recommended");
    const [create, setcreate] = useState<boolean>(false);

    const checkloggedin: boolean = false;



    //creation of the new post
    const createnewpost = () => {
        setcreate(!create);
    }

    // Dummy data for recommended posts
    const mydata = [
        {
            id: 1,
            author: "Hazel",
            title: "Better lives",
            details:
                "What are you most excited about for the future? In my village, parents, despite hardship and low income, do their best to send their children to school, which means more educated people...",
            image: "https://via.placeholder.com/300x200?text=Blog+Image",
            date: "16h ago",
            comments: 44,
            likes: 125,
        },
        {
            id: 2,
            author: "Milena Alien",
            title: "adventure",
            details:
                "Exploring new horizons and sharing my journey with the world...",
            image: "https://via.placeholder.com/300x200?text=Blog+Image",
            date: "19h ago",
            comments: 0,
            likes: 10,
        },
        {
            id: 3,
            author: "Hazel",
            title: "Better lives",
            details:
                "What are you most excited about for the future? In my village, parents, despite hardship and low income, do their best to send their children to school, which means more educated people...",
            image: "https://via.placeholder.com/300x200?text=Blog+Image",
            date: "16h ago",
            comments: 44,
            likes: 125,
        },
        {
            id: 4,
            author: "Milena Alien",
            title: "adventure",
            details:
                "Exploring new horizons and sharing my journey with the world...",
            image: "https://via.placeholder.com/300x200?text=Blog+Image",
            date: "19h ago",
            comments: 0,
            likes: 10,
        },
        {
            id: 5,
            author: "Hazel",
            title: "Better lives",
            details:
                "What are you most excited about for the future? In my village, parents, despite hardship and low income, do their best to send their children to school, which means more educated people...",
            image: "https://via.placeholder.com/300x200?text=Blog+Image",
            date: "16h ago",
            comments: 44,
            likes: 125,
        },
        {
            id: 6,
            author: "Milena Alien",
            title: "adventure",
            details:
                "Exploring new horizons and sharing my journey with the world...",
            image: "https://via.placeholder.com/300x200?text=Blog+Image",
            date: "19h ago",
            comments: 0,
            likes: 10,
        },
    ];

    // Dummy data for user's own posts
    const myPosts = [
        {
            id: 101,
            author: "You",
            title: "My First Post",
            details: "This is your own blog post content here...",
            image: "https://via.placeholder.com/300x200?text=My+Post",
            date: "2h ago",
            comments: 5,
            likes: 20,
        },
        {
            id: 102,
            author: "You",
            title: "My Second Post",
            details: "Another piece of your writing!",
            image: "https://via.placeholder.com/300x200?text=My+Post",
            date: "1h ago",
            comments: 2,
            likes: 8,
        },
    ];

    return (
        <div className="bg-light min-vh-100">
            <div className="container py-5">
                {/* Header Section */}
                <div className="text-center mb-5">
                    <p className="text-muted fs-5">WordPress Reader</p>
                    <h1 className="display-5 fw-bold text-dark">
                        Enjoy millions of blogs at your fingertips.
                    </h1>
                </div>

                {/* Navigation Tabs */}
                <ul className="nav nav-tabs nav-justified mb-4 border-bottom">
                    <li className="nav-item">
                        <button
                            className={`nav-link text-dark ${activeTab === "recommended" ? "active" : ""
                                }`}
                            onClick={() => setActiveTab("recommended")}
                        >
                            Recommended
                        </button>
                    </li>
                    {checkloggedin ? (<>
                        <li className="nav-item">
                            <button
                                className={`nav-link text-dark ${activeTab === "myposts" ? "active" : ""
                                    }`}
                                onClick={() => setActiveTab("myposts")}
                            >
                                Your posts
                            </button>
                        </li>
                    </>) :
                        (
                            <>
                            </>
                        )}
                </ul>

                {/* Tab Content */}
                <div className="tab-content">
                    {/* Recommended Tab */}
                    {activeTab === "recommended" && (
                        <div className="tab-pane fade show active">
                            <div className="row g-4">
                                {(checkloggedin ? mydata : mydata.slice(0, 4)).map((post) => {
                                    return (
                                        <div key={post.id} className="col-12 col-md-8 mx-auto">
                                            <div className="card border-0 shadow-sm mb-4">
                                                <div className="card-body p-4">
                                                    <h5 className="card-title fs-4 fw-bold">
                                                        {post.title}
                                                    </h5>
                                                    <p className="card-subtitle text-muted mb-3">
                                                        {post.author} · {post.date}
                                                    </p>
                                                    <p className="card-text">{post.details}</p>
                                                    {post.image && (
                                                        <img
                                                            src={post.image}
                                                            className="img-fluid rounded mb-3"
                                                            alt={`${post.title} image`}
                                                        />
                                                    )}
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <div className="d-flex align-items-center gap-2">
                                                            <button className="btn btn-outline-secondary btn-sm">
                                                                <i className="bi bi-share"></i> Share
                                                            </button>
                                                            <span className="text-muted small">{post.comments} comments</span>
                                                            <button className="btn btn-outline-secondary btn-sm ms-2">
                                                                <i className="bi bi-chat"></i> Comment
                                                            </button>
                                                        </div>
                                                        <button className="btn btn-outline-primary btn-sm">
                                                            + Subscribe
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                                {checkloggedin ? (<></>) : (<>
                                    {/* Login Prompt */}
                                    <div className="text-center bg-white p-3 rounded shadow-sm">
                                        <p className="text-muted mb-2">
                                            <strong>Login</strong> to view more posts and personalized recommendations.
                                        </p>
                                        <Link to="/login">
                                            <button className="btn btn-primary btn-sm px-4" style={{ backgroundColor: "#005ea6", borderColor: "#005ea6" }}>
                                                Login
                                            </button>
                                        </Link>
                                    </div>
                                </>)}
                            </div>
                        </div>
                    )}

                    {/* My Posts Tab */}
                    {activeTab === "myposts" && (
                        <div className="tab-pane fade show active">
                            {/* Create Post Button */}
                            <div className="text-end mb-4">
                                <button className="btn btn-success" onClick={createnewpost}>+ Create New Post</button>
                            </div>
                            <div className="row g-4">
                                {myPosts.map((post) => (
                                    <div key={post.id} className="col-12 col-md-8 mx-auto">
                                        <div className="card border-0 shadow-sm">
                                            <div className="card-body p-4">
                                                <h5 className="card-title fs-4 fw-bold">
                                                    {post.title}
                                                </h5>
                                                <p className="card-subtitle text-muted mb-3">
                                                    {post.author} · {post.date}
                                                </p>
                                                <p className="card-text">{post.details}</p>
                                                {post.image && (
                                                    <img
                                                        src={post.image}
                                                        className="img-fluid rounded mb-3"
                                                        alt={`${post.title} image`}
                                                    />
                                                )}
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <div className="d-flex align-items-center gap-2">
                                                        <button className="btn btn-outline-secondary btn-sm">
                                                            Edit
                                                        </button>
                                                        <button className="btn btn-outline-danger btn-sm">
                                                            Delete
                                                        </button>
                                                    </div>
                                                    <span className="text-muted">
                                                        {post.comments} comments · {post.likes} likes
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {myPosts.length === 0 && (
                                    <p className="text-center text-muted">
                                        You haven't created any posts yet.
                                    </p>
                                )}
                            </div>
                        </div>
                    )}



                    {create && (
                        <div
                            className="modal fade show d-block"
                            style={{
                                backgroundColor: "rgba(0,0,0,0.5)",
                            }}
                        >
                            <div className="modal-dialog modal-dialog-centered modal-lg">
                                <div className="modal-content">
                                    <div className="modal-header border-0">
                                        <h5 className="modal-title fw-bold">Create New Post</h5>
                                        <button
                                            type="button"
                                            className="btn-close"
                                            onClick={() => setcreate(false)}
                                        ></button>
                                    </div>
                                    <div className="modal-body">
                                        <form>
                                            <div className="mb-3">
                                                <label htmlFor="title" className="form-label fw-semibold">
                                                    Title
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="title"
                                                    placeholder="Enter post title"
                                                    required
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
                                                    placeholder="Write your post content..."
                                                    required
                                                ></textarea>
                                            </div>

                                            <div className="mb-3">
                                                <label htmlFor="image" className="form-label fw-semibold">
                                                    Image URL <span className="text-muted">(optional)</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="image"
                                                    placeholder="Paste image URL if any"
                                                />
                                            </div>

                                            <div className="d-flex justify-content-end gap-2">
                                                <button
                                                    type="button"
                                                    className="btn btn-outline-secondary"
                                                    onClick={() => setcreate(false)}
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    type="submit"
                                                    className="btn btn-primary"
                                                    style={{ backgroundColor: "#005ea6", borderColor: "#005ea6" }}
                                                >
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
        </div>
    );
}

export default Homepage;
