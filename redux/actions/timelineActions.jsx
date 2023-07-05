import { loaderActions } from "../slices/loader";
import { timelineActions } from "../slices/timelineSlice";
import { notificationActions } from "../slices/notificationSlice";
import { eventActions } from "../slices/eventSlice";

export const createTimeline = (data) => {
  return async (dispatch) => {
    dispatch(loaderActions.showLoader(true)); //activate loader
    const createTimelineHandler = async () => {
      const token = localStorage.getItem("jwt");
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_DEV_API}api/timelines`,
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
        const timelineData = await response.json();
        dispatch(loaderActions.showLoader(false)); //disable loader
        dispatch(
          notificationActions.showNotification({
            message: "Timeline created",
            type: "success",
            open: true,
          })
        );
        dispatch(
          eventActions.addTimelineId({
            timeline_id: timelineData.data.timeline_id,
          })
        );

        return timelineData;
      } else {
        dispatch(loaderActions.showLoader(false)); //disable loader
        dispatch(
          notificationActions.showNotification({
            message: "Failed to create timeline!!",
            type: "warning",
            open: true,
          })
        );
      }
    };
    try {
      const timelineData = await createTimelineHandler({ data });
      // dispatch(loaderActions.showLoader(false)); //disable loader
      if (timelineData) {
        dispatch(timelineActions.createTimeline(timelineData));
      }
    } catch (error) {
      dispatch(loaderActions.showLoader(false)); //disable loader
      console.error(error);
    }
  };
};

export const clearTimelineState = () => {
  return async (dispatch) => {
    dispatch(timelineActions.clearState());
  };
};
