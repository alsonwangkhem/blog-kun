import { Blog } from "../hooks"
import { Appbar } from "./Appbar"
import { Avatar } from "./BlogCard"

export const FullBlock = ({ blog } : { blog : Blog}) => {
    return <div>
        <Appbar />
        <div className="md:grid md:grid-cols-12 gap-4 sm:px-6 lg:px-56 md:px-24  pt-12">
            <div className="col-span-8">
                <div className="text-4xl font-extrabold pt-3">
                    {blog.title}
                </div>
                <div className="text-slate-400 font-semibold text-md py-3">
                    {`Posted on ${blog.publishedDate}`}
                </div>
                <div className="text-xl">
                    {blog.content}
                </div>
            </div>
            <div className="col-span-4">
                <div className="sm:pt-6 sm:pb-4 md:py-3">
                    Author
                </div>
                <div className="flex">
                    <div>
                        <Avatar size="big" name={blog.author.name || "Anonymous"} />
                    </div>
                    <div className="flex justify-center items-center pl-2">
                        <div className="text-xl font-bold">
                            {blog.author.name || "Anonymous"}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}