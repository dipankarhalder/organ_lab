import { Link, useParams } from "react-router-dom";

export const CategoryDetails = () => {
  const { id } = useParams();
  console.log(id);

  return <div>Category Details - {id}</div>;
};
