import React, { useState, useEffect } from "react";
import http from "../../services/httpService";
import { toast } from "react-toastify";
import Header from "../../components/header";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Select from "react-select";
import Post from "../../components/post";
import Modal from "react-modal";
import FormModal from "../../components/formModal";
import { modalStyles } from "../../components/formModal";
import "./style.css";

Modal.setAppElement("#root");
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
  const [groupPath, setGroupPath] = useState("");
  const [posts, setPosts] = useState([]);
  const [pass, setPass] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [applyInfo, setApplyInfo] = useState({
    destEmail: "",
    subject: "",
    body: "",
    cvFile: "",
  });
  useEffect(() => {
    const getGroups = async () => {
      const { data: groups } = await http.get(`${apiBaseUrl}/groups`);
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
  const handleSearchClick = async () => {
    try {
      const { data } = await http.post(`${apiBaseUrl}/crawl/facebook`, {
        job,
        platform: "facebook",
        platformPass: pass,
        groupPath: groupPath,
      });
      setPosts(data.posts);
      toast.success(
        `Search finished with ${data.post.length - posts.length} results`
      );
    } catch (error) {
      toast.error("Somthing went wrong. try again later!");
    }
  };
  const handleGroupSelect = (group) => {
    setGroupPath(group.path);
  };

  const handlePostApply = (post) => {
    const email = post.description.match(
      /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi
    );
    if (!email) {
      toast.error("Cant Apply For This Job");
      return;
    }

    setApplyInfo({ ...applyInfo, destEmail: email[0] });
    /** show modal  */
    setModalIsOpen(true);
  };
  const handlePostDelete = async (post) => {
    try {
      await http.delete(`${apiBaseUrl}/posts/`, {
        data: { postId: post._id, userId: user._id },
      });
    } catch (error) {}
  };
  const handleCancelModal = () => {
    setModalIsOpen(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setApplyInfo({ ...applyInfo, cvFile: file });
  };

  const handleTextInputChange = (e) => {
    setApplyInfo({
      ...applyInfo,
      [e.target.id]: e.target.value,
    });
  };

  const handleCvSend = async (e) => {
    e.preventDefault();
    const { cvFile: file } = applyInfo;
    console.log(file);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("destEmail", applyInfo.destEmail);
    formData.append("subject", applyInfo.subject);
    formData.append("body", applyInfo.body);
    try {
      const res = await http.post(`${apiBaseUrl}/jobs/apply`, formData);
    } catch (error) {}
    setModalIsOpen(false);
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
            <TextField
              name="facebookPassword"
              label="Facebook Password"
              variant="standard"
              type="password"
              inputProps={{ style: { fontSize: 18 } }}
              InputLabelProps={{ style: { fontSize: 18 } }}
              onChange={(e) => setPass(e.target.value)}
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
          <p
            style={{
              fontSize: "3rem",
              textAlign: "center",
              fontWeight: "bold",
              textTransform: "uppercase",
              color: "red",
              padding: "2rem",
            }}
          >
            experemental feature - it might not work properly
          </p>
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={() => setModalIsOpen(false)}
            styles={modalStyles}
          >
            <FormModal
              email={applyInfo.destEmail}
              onCancel={handleCancelModal}
              onSendClick={handleCvSend}
              onFileChange={handleFileChange}
              onTextInputChange={handleTextInputChange}
            />
          </Modal>
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
