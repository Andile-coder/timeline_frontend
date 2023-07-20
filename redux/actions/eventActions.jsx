import { loaderActions } from "../slices/loader";
import { timelineActions } from "../slices/timelineSlice";
import { notificationActions } from "../slices/notificationSlice";
import { eventActions } from "../slices/eventSlice";
export const createEvent = (data) => {
  return async (dispatch) => {
    dispatch(loaderActions.showLoader(true)); //activate loader
    const createTimelineHandler = async () => {
      const token = localStorage.getItem("jwt");
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_DEV_API}api/events`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        const eventData = await response.json();
        dispatch(loaderActions.showLoader(false)); //disable loader
        dispatch(
          notificationActions.showNotification({
            message: "Event created",
            type: "success",
            open: true,
          })
        );
        return eventData;
      } else {
        dispatch(loaderActions.showLoader(false)); //disable loader
        dispatch(
          notificationActions.showNotification({
            message: "Failed to create event",
            type: "warning",
            open: true,
          })
        );
      }
    };
    try {
      const eventData = await createTimelineHandler({ data });

      // dispatch(eventActions.createTimeline(eventData));
    } catch (error) {
      dispatch(loaderActions.showLoader(false)); //disable loader
      console.error(error);
    }
  };
};

export const getTimelineEvents = (timeline_id) => {
  return async (dispatch) => {
    const getTimelineEventsHandler = async () => {
      const token = localStorage.getItem("jwt");
      const response = await fetch(
        `${
          import.meta.env.VITE_SERVER_DEV_API
        }api/events/timeline/${timeline_id}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const eventData = await response.json();
        dispatch(loaderActions.showLoader(false)); //disable loader
        return eventData;
      } else {
        console.log("response", response);
        dispatch(loaderActions.showLoader(false)); //disable loader
        dispatch(
          notificationActions.showNotification({
            message: "Something went wrong!!",
            type: "error",
            open: true,
          })
        );
      }
    };

    try {
      const response = await getTimelineEventsHandler(timeline_id);

      console.log("response", response);
      dispatch(eventActions.addTimelineEvents(response));
    } catch (error) {
      console.error(error);
    }
  };
};
export const getEvent = (event_id) => {
  return async (dispatch) => {
    const getEventHandler = async () => {
      const token = localStorage.getItem("jwt");
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_DEV_API}api/events/${event_id}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const eventData = await response.json();
        dispatch(loaderActions.showLoader(false)); //disable loader
        return eventData;
      } else {
        dispatch(loaderActions.showLoader(false)); //disable loader
        dispatch(
          notificationActions.showNotification({
            message: "Something went wrong!!",
            type: "error",
            open: true,
          })
        );
      }
    };

    try {
      const response = await getEventHandler(event_id);
      console.log("response", response);
      dispatch(eventActions.addOneEvent(response));
    } catch (error) {
      console.error(error);
    }
  };
};
