import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { Spinner } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Select from "react-select";
import styles from "./NewEventForm.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { offCanvasActions } from "../../../../redux/slices/offCanvasSlice";
import { eventActions } from "../../../../redux/slices/eventSlice";
import Loader from "../../loader/Loader";
import { notificationActions } from "../../../../redux/slices/notificationSlice";
const NewEventForm = () => {
  const dispatch = useDispatch();
  const offCanvasData = useSelector((state) => state.offCanvas.data);
  const [eventForm, setEventForm] = useState(offCanvasData);
  const [categories, setCategories] = useState([]);
  const eventImages = [];

  const getCategories = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_SERVER_DEV_API}api/categories`
    );
    const categoryData = await response.json();
    setCategories(
      categoryData?.response?.map((category) => {
        const option = { value: category.category_id, label: category.name };
        return option;
      })
    );
  };

  useEffect(() => {
    getCategories();
  }, []);
  const handleFormChange = async (event) => {
    const { name, value } = event.target;
    setEventForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSubmitDraft = async (e) => {
    e.preventDefault();
    dispatch(offCanvasActions.updateData({ data: eventForm }));
    dispatch(eventActions.addEventData({ event: eventForm }));
    dispatch(
      notificationActions.showNotification({
        type: "success",
        message: "Event draft saved",
        open: true,
      })
    );
    //remove offcanvas data after draft submission
    dispatch(offCanvasActions.resetState());
  };

  const handleTagChange = (selectedCategories) => {
    // Handle selected categories here
    const tempSelectedCategories = selectedCategories
      .map((category) => category.value)
      .toString();
    setEventForm({
      ...eventForm,
      category_id: tempSelectedCategories.toString(),
    });
    console.log(tempSelectedCategories);
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64String = reader.result.split(",")[1]; // Get the base64 string (remove the data URL prefix)
        setEventForm({
          ...eventForm,
          images: [...eventForm.images, base64String],
        });
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={styles.container}>
      <Form onSubmit={onSubmitDraft}>
        <Form.Group className="mb-3" controlId="event_title">
          <Form.Label>Event Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Title"
            name="title"
            value={eventForm.title}
            onChange={handleFormChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="event_description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={7}
            value={eventForm.description}
            required
            onChange={handleFormChange}
            name="description"
            placeholder="Enter Description (Optional)"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="event_title">
          <Form.Label>Date</Form.Label>
          <Form.Control
            value={eventForm.event_date}
            onChange={handleFormChange}
            type="datetime-local"
            name="event_date"
            placeholder="Event date"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Select
            isMulti
            options={categories}
            onChange={handleTagChange}
            placeholder="Tags (Optional)"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="event_title">
          <Form.Label>Images</Form.Label>
          <Form.Control
            value={eventForm.image}
            onChange={handleFileChange}
            type="file"
            accept=".png, .jpeg, .jpg"
            name="image"
            multiple
            placeholder="Select Image"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Button type="submit">Save Draft</Button>{" "}
        </Form.Group>
      </Form>
    </div>
  );
};

export default NewEventForm;
