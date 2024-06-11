import { HERO_CONTENT } from "../constants";
import { FaHackerNewsSquare } from 'react-icons/fa';
import { FaUserSecret } from 'react-icons/fa';
import { motion } from 'framer-motion'; // Import motion from Framer Motion
import Profilepic from "../assets/kevinRushProfile.png";

const container = (delay) => (
  {
    hidden: {x:-100, opacity:0},
    visible: {
      x:0 ,
      opacity:1 ,
      transition: { duration: 1.0 , delay: delay},
    }
  }
)

const MyComponent = () => {
  return (
    <div>
      <FaUserSecret size={500} className="text-neutral-700" />
    </div>
  );
};

const Hero = () => {
  return (
    <div className="border-b border-neutral-900 pb-4 lg:mb-35">
      <div className="flex flex-wrap">
        <div className="w-full lg:w-1/2">
          <div className="flex flex-col items-center lg:items-start">
            <motion.h1 variants={container(0)} initial="hidden" animate="visible" className="pb-16 text-6xl font-thin tracking-tight lg:mt-16 lg:text-8xl">Dyavanapelli Sujal</motion.h1>
            <motion.span whileHover={{scale: 1.2}} whileTap={{scale: 1.1}} drag="x" dragConstraints={{left: -100 , right: 100}} variants={container(0.5)} initial="hidden" animate="visible" className="bg-gradient-to-r from-pink-300 via-slate-500 to-purple-500 bg-clip-text  mx-1 text-4xl tracking-tight text-transparent">SOC ANALYST</motion.span>
          </div>
        </div>
        <div className="w-full lg:w-1/2 lg:p-8">
          <div className="flex justify-center">
            {/* Your component or image */}
          </div>
        </div>
      </div>
   </div>
  );
};

export default Hero;
