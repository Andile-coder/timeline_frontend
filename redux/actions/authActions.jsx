import { authActions } from "../slices/authSlice";
import { notificationActions } from "../slices/notificationSlice";
export const loginUser = (user) => {
  return async (dispatch) => {
    const loginHandler = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_DEV_API}login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(user),
        }
      );
      if (response.ok) {
        const userData = await response.json();
        localStorage.setItem("jwt", userData?.accessToken);
        dispatch(
          notificationActions.showNotification({
            type: "success",
            message: "Logged in Successfully",
            open: true,
          })
        );
      } else {
        dispatch(
          notificationActions.showNotification({
            type: "error",
            message: "Login Failed",
            open: true,
          })
        );
      }
    };

    try {
      const userData = await loginHandler(user);
      dispatch(authActions.login(user));
    } catch (err) {
      console.error(err);
      dispatch(
        notificationActions.showNotification({
          type: "error",
          message: "Login Failed",
          open: true,
        })
      );
    }
  };
};
