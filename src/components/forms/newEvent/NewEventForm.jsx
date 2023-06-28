import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { Spinner } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Select from "react-select";
import styles from "./NewEventForm.module.scss";
const NewEventForm = () => {
  const [eventForm, setEventForm] = useState({
    title: "",
    description: "",
    category_id: "",
    event_date: "",
  });

  const [spinner, setSpinner] = useState(false);

  const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
    // Add more options as needed
  ];

  const handleFormChange = async (event) => {
    const { name, value } = event.target;
    setEventForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoiSmFjayIsImVtYWlsIjoiamFja0BleGFtcGxlLmNvbSIsInVzZXJfaWQiOiIxYWJjZjc3YS03YTllLTRmZTUtYjI5ZS1jZjBlZjM1ODJlM2UifSwiaWF0IjoxNjg3OTQ4MTg4LCJleHAiOjE2ODc5NTE3Mjh9.Z1mvJQ_M8ui_jtERIto1y6L4mv12QVYAJzZ0K1MZruU";

  const onSubmitEvent = async (e) => {
    e.preventDefault();
    setSpinner(true);
    try {
      const response = await fetch(`http://localhost:3000/api/timelines`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json ",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title: "New Timeline" }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("data", data);
      } else {
        console.log(response);
      }
    } catch (err) {
      console.error("An error occured", err);
    }
    setSpinner(false);
  };

  const handleTagChange = (selectedOptions) => {
    console.log(selectedOptions); // Handle selected options here
  };

  return (
    <div className={styles.container}>
      <div
        className={styles.spinner_overlay}
        style={{ display: spinner ? "flex" : "none" }}
      >
        <div class={styles.spinner}></div>
      </div>
      <Form onSubmit={onSubmitEvent}>
        <Form.Group className="mb-3" controlId="event_title">
          <Form.Label>Event Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Title"
            name="title"
            value={eventForm.title}
            onChange={handleFormChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="event_description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={7}
            name="description"
            placeholder="Enter Description"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="event_title">
          <Form.Label>Date</Form.Label>
          <Form.Control type="date" name="date" placeholder="Event date" />
        </Form.Group>

        <Form.Group className="d-flex">
          <Select isMulti options={options} onChange={handleTagChange} />
          <Button variant="outline-success">Create</Button>
        </Form.Group>

        <Form.Group className="me-2">
          <Button type="submit">Submit</Button>{" "}
        </Form.Group>
      </Form>
    </div>
  );
};

export default NewEventForm;
