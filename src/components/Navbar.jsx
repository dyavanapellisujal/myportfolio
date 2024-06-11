import logo from "../assets/kevinRushLogo.png"
import { FaLinkedin } from "react-icons/fa"
import { FaGithub } from "react-icons/fa"
import { FaMedium } from "react-icons/fa"

const Navbar = () => {
  return <nav className="  mb-20 flex items-center justify-between py-6">
    <div className="flex flex-shrink-0 items-center ">
        <img className=" size-16" src={logo} alt="logo" />
    </div>
    <div className="m-8 flex items-center justify-center gap-4 text-2xl">
        <a href="https://www.linkedin.com/in/dyavanapelli-sujal-409766249/" target="_blank"><FaLinkedin/></a>
        <a href="https://medium.com/@dyavanapellisujal7" target="_blank"><FaMedium /></a>
        <a href="https://github.com/dyavanapellisujal" target="_blank"><FaGithub/></a>
    </div>
  </nav>
  }

export default Navbar
