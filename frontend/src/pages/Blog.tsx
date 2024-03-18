import { useParams } from "react-router-dom";
import { useBlog } from "../hooks";
import { FullBlock } from "../components/FullBlog";
import { Skeleton } from "../components/Skeleton";
import { Appbar } from "../components/Appbar";

export const Blog = () => {
  const { id } = useParams();
  const { loading, blog } = useBlog({
    id: id || "",
  });
  if (loading || !blog) {
    return (
      <div>
        <Appbar />
        <div className="flex justify-center h-screen">
          <Skeleton />
        </div>
      </div>
    );
  }
  return (
    <div>
      <FullBlock blog={blog} />
    </div>
  );
};
