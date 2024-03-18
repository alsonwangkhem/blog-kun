import { Auth } from "../components/Auth"
import { Quote } from "../components/Quote"

export const Signup = () => {
    return <div className="grid lg:grid-cols-2 sm:grid-rows-2">
        <div>
            <Auth type="signup"/>
        </div>
        <div className="">
            <Quote />
        </div>
    </div>
}