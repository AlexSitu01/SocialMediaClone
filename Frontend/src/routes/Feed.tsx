import { Navbar } from "../components/Navbar";
import Post from "../components/Post";
import { waitForFirebaseAuth } from "../lib/firebase/authHelpers";
import { getUserInfo } from "../lib/firebase/database";

export function Feed() {
    return (
        <div className="p-4">

            <Navbar></Navbar>
            

            <div className="flex flex-col size-full items-center my-4'">
                <Post id={1} author={{ uid: "fdsa", userName: "Jason Ly", bio: "Pog Champ", pfp: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsRWrZP4YmuQ21VFfuNc5ch85RNRwBf7qL_A&s' }} pic='https://media.officedepot.com/images/f_auto,q_auto,e_sharpen,h_450/products/208206/208206_p/208206' desc='LOOK COKE ^^^^^^^^^^^^' numLikes={10} timeOfPost={1741817303814} comments={[{ content: "Testing" }]} />
                <Post id={2} author={{ uid: "fdsas", userName: "Alex Situ", bio: "Real Life Human", pfp: "https://beverages2u.com/wp-content/uploads/2019/05/0007800000038_C.jpg" }} pic="https://uchi.imgix.net/general/anime2.png?crop=focalpoint&domain=uchi.imgix.net&fit=crop&fm=pjpg&fp-x=0.5&fp-y=0.5&h=558&ixlib=php-3.3.1&q=82&usm=20&w=992" desc='Look its a brand new can of Sprite how cool is that ' numLikes={3} timeOfPost={1741817347758} comments={[{ content: "Testing" }]} />
                <Post id={2} author={{ uid: "fewrf", userName: "Alex Situ", bio: "Real Life Human", pfp: "https://beverages2u.com/wp-content/uploads/2019/05/0007800000038_C.jpg" }} pic="https://i.pinimg.com/736x/df/ed/7f/dfed7f105f7817381f3e6e1b898b43de.jpg" desc='Look its a brand new can of Sprite how cool is that ' numLikes={3} timeOfPost={1741817347758} comments={[{ content: "Testing" }]} />
            </div>

            <button className="bg-blue-300 text-white cursor-pointer" onClick={getUserInfo}>Print User Info</button>
        </div>
    )



}