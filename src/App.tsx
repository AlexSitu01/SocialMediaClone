import './App.css'
import Post from './components/Post'


function App() {


  return (
    <>
      <div className='flex flex-col size-full items-center bg-black'>
        <Post author={{name: "Jason Ly Whereas recognition of the inherent dignity", id: 123, bio: "Pog Champ", pic : 'https://media.officedepot.com/images/f_auto,q_auto,e_sharpen,h_450/products/208206/208206_p/208206'}} pic='https://media.officedepot.com/images/f_auto,q_auto,e_sharpen,h_450/products/208206/208206_p/208206' desc='LOOK COKE ^^^^^^^^^^^^' id={1} />
        
      </div>
      
    </>
  )
}

export default App
