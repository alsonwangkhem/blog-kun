import { Link } from "react-router-dom";

interface BlogCardProps {
    authorName: string;
    title: string;
    content: string;
    publishedDate: string;
    id: number;
}

export const BlogCard = ({
    authorName, title, content, publishedDate, id
} : BlogCardProps) => {
    return <Link to={`/blog/${id}`}>
        <div className="border-b-2 border-slate-200 pb-4 px-6 w-screen max-w-screen-md">
            <div className="flex pt-4">
                <div className="flex justify-center items-center">
                    <Avatar size ={"small"} name={authorName}/>
                </div>
                <div className="flex justify-center items-center pl-2 font-semibold">
                    {authorName}
                </div>
                <div className="flex justify-center items-center pl-2">
                    <Circle />
                </div>
                <div className="flex justify-center items-center pl-2 text-gray-500 font-semibold">
                    {publishedDate}
                </div>
            </div>
            <div className="text-2xl font-bold pt-3">
                {title}
            </div>
            <div className="text-lg">
                {content.slice(0, 150) + "..."}
            </div>
            <div className="text-sm text-slate-500 pt-4">
                {`${Math.ceil(content.length/100)}`} minute read
            </div>
        </div>
    </Link>
}

export function Avatar({ name, size } : { name: string, size?: "small" | "big" }) {
    return <div className={`relative mr-2 inline-flex items-center justify-center ${size === "small" ? "w-6 h-6" : "w-9 h-9"} overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600`}>
        <span className={`${size === "small" ? "text-sm" : "text-md"} text-gray-600 dark:text-gray-300`}>{name[0]}</span>
    </div> 
}

function Circle() {
    return <div className="h-1 w-1 rounded-full bg-gray-500"></div>
}