import { Link } from "react-router-dom"
import { Avatar } from "./BlogCard"

export const Appbar = () => {
    return <div className="border-b flex justify-between px-10 py-5">
        <Link to={'/blogs'} className="flex justify-center items-center font-extrabold text-2xl">
            Blog-Kun
        </Link>
        <div className="flex justify-center items-center">
            <Link to={'/publish'}>
                <button type="button" className="mr-6 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2">Create Blog</button>
            </Link>
            <Avatar name="Alson" size="big"/>
        </div>
    </div>
}