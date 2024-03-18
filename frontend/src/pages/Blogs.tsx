import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"
import { Skeleton } from "../components/Skeleton";
import { useBlogs } from "../hooks"

export const Blogs = () => {
    const {loading, blogs} = useBlogs();
    if(loading) {
        return <div>
            <Appbar />
            <div className="flex justify-center h-screen">
                <Skeleton />
            </div>
        </div>
    }
    return <div>
        <Appbar />
        <div className="flex justify-center items-center">
            <div className="">
                {blogs.map(blog => {
                    return <BlogCard
                    id={blog.id}
                    authorName={blog.author.name || "Anonymous"}
                    title={blog.title}
                    content={blog.content}
                    publishedDate={blog.publishedDate}
                />
                })}
            </div>
        </div>
    </div>
}