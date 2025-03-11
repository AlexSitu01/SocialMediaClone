import './App.css'
import Post from './components/Post'


function App() {


  return (
    <>
      <div className='flex flex-col size-full items-center bg-black'>
        <Post author={{name: "Jason Ly", id: 1, bio: "Pog Champ", pic : ''}} pic='https://media.officedepot.com/images/f_auto,q_auto,e_sharpen,h_450/products/208206/208206_p/208206' desc='LOOK COKE ^^^^^^^^^^^^' id={1} numLikes={10} />
        <Post author={{name: "Alex Situ", id:2, bio: "Real Life Human", pic: "https://beverages2u.com/wp-content/uploads/2019/05/0007800000038_C.jpg"}} pic="https://cdn.shoplightspeed.com/shops/609238/files/3198469/sprite-1l.jpg"/>
      </div>
      
    </>
  )
}

export default App
