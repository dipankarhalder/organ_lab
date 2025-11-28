export const handleApiErrorToast = async (res, addToast, toastStatus) => {
  if (!res.success) {
    const messages = {
      400: {
        title: "Invalid Request",
        description:
          res.data?.message ||
          "There was an issue with the data provided. Please review the form and try again.",
      },
      401: {
        title: "Unauthorized Access",
        description:
          "Please log in with appropriate credentials to access this resource.",
      },
      404: {
        title: "Resource Not Found",
        description:
          "The requested resource could not be located. Please check the URL or try again later.",
      },
      500: {
        title: "Something Went Wrong",
        description:
          res.data?.message ||
          "We encountered an issue processing your request. Please try again shortly.",
      },
    };

    const { title, description } = messages[res.status] || messages[500];
    await addToast({
      type: toastStatus.ERROR,
      title,
      description,
    });
    return true;
  }

  return false;
};
