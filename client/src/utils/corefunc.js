export const getInitials = (fullName) => {
  if (!fullName) return "";
  if (fullName.includes(" ")) {
    return fullName
      .trim()
      .split(" ")
      .map((word) => word[0].toUpperCase())
      .join("");
  } else {
    const caps = fullName.match(/[A-Z]/g);
    if (caps && caps.length > 1) {
      return caps.join("");
    } else {
      return fullName[0].toUpperCase();
    }
  }
};

export const getRandomLightColor = () => {
  const r = Math.floor(200 + Math.random() * 55);
  const g = Math.floor(200 + Math.random() * 55);
  const b = Math.floor(200 + Math.random() * 55);
  return `rgb(${r}, ${g}, ${b})`;
};

export const formatRole = (role) => {
  if (!role) return "";
  return role
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};
