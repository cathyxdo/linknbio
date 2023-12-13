import Image from 'next/image';
import NavBar from './components/NavBar';
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
        <NavBar />
        <div className="container mx-auto mt-8 flex items-center text-left min-h-screen">
          <div className='w-1/2 pr-8 mx-1 flex-row'>
            <h1 className='text-5xl'>Centralize your online presence in one place using <span className='font-bold'>Linknbio</span></h1>
            <h3>Gather all your links, social media, music, videos, and more in one place. Create a page that matches your style and never worry about changing your bio link again.</h3>
            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Get Started</button>
          </div>
          <div className='w-1/2'>
            <Image
              src='/hero-graphic.png'
              width={1178}
              height={1276}
              alt='hero-image'
            >

            </Image>
          </div>
        </div>
    </main>
  )
}
