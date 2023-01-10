import React, { useState, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBTextArea,
  MDBValidation,
  MDBValidationItem,
} from "mdb-react-ui-kit";
import { storage } from "../firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { useAddBlogMutation } from "../services/blogsApi";
function AddEditBlog() {
  const initialState = {
    title: "",
    description: "",
  };
  const [addBlog] = useAddBlogMutation();

  const navigate = useNavigate();
  const [data, setData] = useState(initialState);
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(null);
  const { title, description } = data;

  console.log("data, ", data);

  //   This UseEffect is used for Upload file in Firebase
  useEffect(() => {
    const uploadFile = () => {
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is" + progress + "% done");
          setProgress(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;

            default:
              break;
          }
        },
        (error) => {
          console.log("error");
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setData((prev) => ({ ...prev, imgURL: downloadURL }));
          });
        }
      );
    };
    file && uploadFile();
  }, [file]);
  //   upto Line 57, function is used how to upload a file in Firebase
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title && description) {

      await addBlog(data);
      navigate("/")


    //   console.log("datainsidfe", data);
    }
  };
  return (
    <div
      style={{
        margin: "auto",
        padding: "15px",
        maxWidth: "450px",
        alignContent: "center",
        marginTop: "120px",
      }}
      className="constainer"
    >
      <MDBCard alignment="center">
        <h4 className="fw-bold">Create Blog</h4>
      </MDBCard>
      <MDBCardBody>
        <MDBValidation className="row g-3" noValidate onSubmit={handleSubmit}>
          <MDBValidationItem
            className="col-md-12"
            feedback="Please provide title"
            invalid
          >
            <MDBInput
              label="Title"
              type="text"
              name="title"
              onChange={(e) => handleChange(e)}
              className="form-control"
              required
            />
          </MDBValidationItem>
          {/* description */}
          <MDBValidationItem
            className="col-md-12"
            feedback="Please provide description"
            invalid
          >
            <MDBTextArea
              label="Description"
              type="text"
              name="description"
              onChange={(e) => handleChange(e)}
              className="form-control"
              required
            />
          </MDBValidationItem>
          <div className="col-md-12">
            <MDBInput
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <div className="col-md-12">
            <MDBBtn
              style={{ width: "100%" }}
              disabled={progress !== null && progress < 100}
            >
              Submit
            </MDBBtn>
          </div>
        </MDBValidation>
      </MDBCardBody>
    </div>
  );
}

export default AddEditBlog;
