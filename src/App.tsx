import './App.css'
import Post from './components/Post'


function App() {


  return (
    <>
      <div className='flex flex-col size-full items-center my-4'>
        <Post author={{name: "Jason Ly", id: 1, bio: "Pog Champ", pic : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsRWrZP4YmuQ21VFfuNc5ch85RNRwBf7qL_A&s'}} pic='https://media.officedepot.com/images/f_auto,q_auto,e_sharpen,h_450/products/208206/208206_p/208206' desc='LOOK COKE ^^^^^^^^^^^^' id={1} numLikes={10} timeOfPost={2}/>
        <Post author={{name: "Alex Situ", id:2, bio: "Real Life Human", pic: "https://beverages2u.com/wp-content/uploads/2019/05/0007800000038_C.jpg"}} pic="https://uchi.imgix.net/general/anime2.png?crop=focalpoint&domain=uchi.imgix.net&fit=crop&fm=pjpg&fp-x=0.5&fp-y=0.5&h=558&ixlib=php-3.3.1&q=82&usm=20&w=992" desc='Look its a brand new can of Sprite how cool is that ' id={2} numLikes={3} timeOfPost={4}/>
      </div>
      
    </>
  )
}

export default App
