import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { get, put, remove } from "../utils/serverURL";

export const Design = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
  const { designid } = useParams();
  const navigate = useNavigate();

  const handleDelete = async () => {
    await remove("/doc/delete/" + designid);
    navigate("/");
  };

  const handleTrash = async () => {
    await put("/doc/trash/" + designid);
    navigate("/");
  };

  useEffect(async () => {
    const response = await get("/doc/" + designid);
    setData(response.data);
    setIsLoading(false);
  }, []);
  return (
    <>
      <h1>GDD Page</h1>
      {!isLoading && (
        <>
          <p>{data.name}</p>
          <p>{data.image}</p>
          <button onClick={handleTrash}>Trash</button>
          <button onClick={handleDelete}>Delete</button>
        </>
      )}
    </>
  );
};
