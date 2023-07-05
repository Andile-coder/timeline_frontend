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
            message: "Something went wrong!!",
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
