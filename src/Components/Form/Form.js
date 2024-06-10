import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { FileUploader } from "react-drag-drop-files";
import DropContainer from "../File/FileUpload";
import { json, useNavigate } from "react-router-dom";

const defaultData = {
  firstname: "",
  lastname: "",
  email: "",
  phonenumber: "",
  address: "",
  skillcategory: "",
  uploadimage: [],
  payment: "",
};

const skillcategoryvalues = {
  novice: 1,
  intermediary: 3,
  advanced: 5,
  professional: 7,
};
function FormContainer() {
  const [validated, setValidated] = useState(false);
  const [data, setData] = useState(defaultData);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleFileChange = (file) => {
    let newFiles = Array.from(file);
    newFiles.splice(10);

    setData({
      ...data,
      uploadimage: newFiles,
      payment: newFiles.length * skillcategoryvalues[data.skillcategory],
    });
  };
  const handleFiles = (files) => {
    setData({ ...data, uploadimage: files });
  };
  const navigate = useNavigate();
  const handlesubmit = (event) => {
    // const handleSubmit = (event) => {
    const form = event.currentTarget;
    console.log(form.checkValidity());
    event.preventDefault();
    if (form.checkValidity() === false) {
      console.log("hello");

      event.stopPropagation();
    } else {
      const {
        firstname,
        lastname,
        email,
        phonenumber,
        address,
        skillcategory,
      } = data;
      fetch("http://localhost:5000", {
        method: "POST",
        body: JSON.stringify({
          firstname,
          lastname,
          email,
          phonenumber,
          address,
          skillcategory,
        }),
        headers: { "Content-type": "application/json" },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          navigate("/payment");
        });
    }

    setValidated(true);
  };

  return (
    <>
      <h3 className="av">AVIS Photo Competition</h3>

      <Form
        noValidate
        validated={validated}
        onSubmit={handlesubmit}
        className="forms"
      >
        <Row>
          <Form.Label>1. Full Name *</Form.Label>
        </Row>
        <Row>
          <Form.Group as={Col} md="6" sm="12" controlId="validationCustom01">
            <Form.Control
              required
              type="first name"
              placeholder="First Name"
              name="firstname"
              value={data.firstname}
              onChange={handleChange}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              Please Enter your First Name.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md="6" controlId="validationCustom02">
            <Form.Control
              required
              type="last name"
              placeholder="Last Name"
              name="lastname"
              value={data.lastname}
              onChange={handleChange}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              Please Enter your First Name.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className="forms">
          <Form.Label>2. Email *</Form.Label>
        </Row>
        <Row>
          <Form.Group as={Col} md="12" controlId="validationCustom03">
            <Form.Control
              required
              type="email"
              placeholder="Email"
              name="email"
              value={data.email}
              onChange={handleChange}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              Please Enter your First Name.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className="forms">
          <Form.Label>3. Phone Number *</Form.Label>
        </Row>
        <Row>
          <Form.Group as={Col} md="12" controlId="validationCustom04">
            <Form.Control
              required
              type="number"
              placeholder="Phone Number"
              name="phonenumber"
              value={data.phonenumber}
              onChange={handleChange}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              Please Enter your First Name.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className="forms">
          <Form.Label>4. Address *</Form.Label>
        </Row>
        <Form.Group as={Col} md="12" controlId="validationCustom05">
          <Form.Control
            required
            type="text"
            placeholder="Address"
            name="address"
            value={data.address}
            onChange={handleChange}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Please Enter your First Name.
          </Form.Control.Feedback>
        </Form.Group>

        <Row className="forms">
          <Form.Label>5. Skill Category *</Form.Label>
          <Form.Group as={Col} md="12" controlId="validationCustom06">
            <Form.Check
              required
              className="checks"
              type="radio"
              label="Novice"
              name="skillcategory"
              id="Novice"
              value="novice"
              onChange={handleChange}
            />

            <Form.Check
              required
              className="checks"
              type="radio"
              label="Intermediary"
              name="skillcategory"
              id="Intermediary"
              value="intermediary"
              onChange={handleChange}
            />

            <Form.Check
              required
              className="checks"
              type="radio"
              label="Advanced"
              name="skillcategory"
              id="Advanced"
              value="advanced"
              onChange={handleChange}
            />

            <Form.Check
              required
              className="checks"
              type="radio"
              label="Professional"
              name="skillcategory"
              id="Professional"
              value="professional"
              onChange={handleChange}
            />

            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              Please Enter your First Name.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row></Row>
        <Row className="forms">
          <Form.Label>6. Upload Your image here *</Form.Label>
          <p className="size">
            For Successful competition submission, please allow the file size
            below 100MB per image and limit it to 10 entries. Exceeding that
            will remove you from the selection.
          </p>
        </Row>
        <Row>
          <Form.Group as={Col} md="12" controlId="validationCustom07">
            <FileUploader
              required
              multiple={true}
              label="Drop files here"
              handleChange={handleFileChange}
              name="file"
              maxSize={10}
              files={data.uploadimage}
              disabled={data.uploadimage.length >= 10}
              children={
                <DropContainer
                  files={data.uploadimage}
                  setFiles={handleFiles}
                />
              }
            ></FileUploader>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              Please Enter your First Name.
            </Form.Control.Feedback>
          </Form.Group>
          <Col></Col>
        </Row>
        <Row className="forms">
          <Form.Label>7. Payment *</Form.Label>
          <p>Payment amount: ${data.payment}</p>
        </Row>
        <Row>
          <Button className="button" type="submit">
            Next
          </Button>
        </Row>
      </Form>
    </>
  );
}

export default FormContainer;
