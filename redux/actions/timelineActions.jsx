import { loaderActions } from "../slices/loader";
import { timelineActions } from "../slices/timelineSlice";
import { notificationActions } from "../slices/notificationSlice";
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
        return timelineData;
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
      const timelineData = await createTimelineHandler({ data });

      // dispatch(loaderActions.showLoader(false)); //disable loader

      dispatch(timelineActions.createTimeline(timelineData));
    } catch (error) {
      dispatch(loaderActions.showLoader(false)); //disable loader
      console.error(error);
    }
  };
};
