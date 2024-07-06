import { FaReact } from 'react-icons/fa'

function Footer(){
    return(
        <footer className="mt-16">
            <span className="font-bold text-white text-2xl satoshi-bold ">
            <a 
            href="https://www.tiktok.com/albert_dvlp"
            
            >
            Made by Albert Dev
            </a>
            <ul className='flex justify-center mt-5'>
                <li><FaReact/></li>
            </ul>
            </span>
    </footer>
    )

}
export default Footer;