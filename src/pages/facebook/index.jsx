import React, { useState, useEffect } from "react";
import http from "../../services/httpService";
import Header from "../../components/header";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Select from "react-select";
import Post from "../../components/post";
import "./style.css";

const apiBaseUrl = process.env.REACT_APP_DEV_BASE_URL;
const styles = {
  control: (base) => ({
    ...base,
    fontSize: "2rem",
  }),
  menu: (base) => ({
    ...base,
    fontSize: "2rem",
    fontWeight: "bold",
  }),
};
const Facebook = ({ user }) => {
  const [job, setJob] = useState("");
  const [groups, setgroups] = useState([]);
  const [setGroupPath] = useState("");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getGroups = async () => {
      const { data: groups } = await http.get(
        "http://localhost:5000/api/groups"
      );
      /** add value prop to each group */
      const mappedOptions = groups.map((g) => ({ ...g, value: g.path }));
      setgroups(mappedOptions);
    };
    getGroups();
  }, []);

  useEffect(() => {
    if (user) {
      const getPosts = async () => {
        const { data: posts } = await http.get(
          `${apiBaseUrl}/posts/${user._id}`
        );
        /** add value prop to each group */

        setPosts(posts);
      };
      getPosts();
    }
  }, [user]);
  const handleSearchClick = () => {
    console.log(job);
  };
  const handleGroupSelect = (group) => {
    setGroupPath(group.path);
  };

  const handlePostApply = (postId) => {
    console.log(postId);
  };
  const handlePostDelete = async (postId) => {
    try {
      await http.delete(`${apiBaseUrl}/posts/`, {
        data: { postId: postId, userId: user._id },
      });
    } catch (error) {}
  };
  return (
    <>
      <Header
        title="Facebook"
        firstName={user && user.firstName}
        lastName={user && user.lastName}
      />
      <div className="facebook-main">
        <div className="fb-upper-section shadow-card">
          <div className="fb-search-box">
            <TextField
              name="job"
              label="Job"
              variant="standard"
              inputProps={{ style: { fontSize: 18 } }}
              InputLabelProps={{ style: { fontSize: 18 } }}
              onChange={(e) => setJob(e.target.value)}
            />
            <Button
              variant="contained"
              type="submit"
              style={{ width: 250, height: 50, fontSize: 30 }}
              onClick={handleSearchClick}
              disabled={job.length < 2}
            >
              Find Posts
            </Button>
          </div>
          <div className="fb-groups-input">
            <Select
              options={groups}
              onChange={(g) => handleGroupSelect(g)}
              name="datePosted"
              styles={styles}
              placeholder="Select a group"
            />
          </div>
        </div>
        <div className="fb-lower-section">
          {posts.map((post) => (
            <Post
              key={post._id}
              post={post}
              onPostApply={handlePostApply}
              onPostDelete={handlePostDelete}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Facebook;
