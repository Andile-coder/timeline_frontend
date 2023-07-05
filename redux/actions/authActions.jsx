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
export const registerUser = (user) => {
  return async (dispatch) => {
    const registerHandler = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_DEV_API}register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(user),
        }
      );
      if (response.ok) {
        const userData = await response.json();
        dispatch(
          notificationActions.showNotification({
            type: "success",
            message: "Registered  Successfully",
            open: true,
          })
        );
      } else {
        dispatch(
          notificationActions.showNotification({
            type: "error",
            message: "Registration Failed",
            open: true,
          })
        );
      }
    };

    try {
      const userData = await registerHandler(user);
      dispatch(authActions.register());
    } catch (err) {
      console.error(err);
      dispatch(
        notificationActions.showNotification({
          type: "error",
          message: "Registration Failed",
          open: true,
        })
      );
    }
  };
};

export const currentUser = () => {
  return async (dispatch) => {
    const getCurrentUser = async () => {
      const token = localStorage.getItem("jwt");
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_DEV_API}user`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const userData = await response.json();
        return userData;
      } else {
        dispatch(
          notificationActions.showNotification({
            message: "User not signed in",
            type: "warning",
            open: true,
          })
        );
        return null;
      }
    };

    try {
      const currentUser = await getCurrentUser();
      dispatch(authActions.currentUser(currentUser));
    } catch (error) {
      console.error(error);
    }
  };
};
