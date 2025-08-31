

import { AuthContext } from "@/Context-Api/AuthContext";
import { adminheader, userheader } from "@/lib/config";
import { Github, Globe, Linkedin } from "lucide-react";
import { useContext } from "react";
import { FaEnvelope, FaMapMarkedAlt, FaPhoneAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {

    const { userData } = useContext(AuthContext);
    const currentYear = new Date().getFullYear()



    return (
        <>
            <div className="py-10 bg-gary-100 px-8 min-h-52 bg-slate-50 ">
                <div className="container mx-auto grid grid-cols-1  lg:grid-cols-4 sm:grid-cols-2 gap-8">
                    <div className="space-y- mr-14 col-span-2 sm:w-[80%]">
                        <div className="flex items-center space-x-2">
                            {
                                userData && userData.role === "recruiter"
                                    ?
                                    (
                                        <>
                                            <Link to='/admin/compnies' onClick={() => window.scrollTo(0, 0)} >
                                                <div className='flex ' >
                                                    <img src='/logo.png' alt='logo' className='w-20    ' />
                                                    <h1 className='text-2xl font-bold pt-8'>Job<span className='text-[#020ef8]'>Linker</span></h1>
                                                </div>
                                            </Link>
                                        </>
                                    )
                                    :
                                    (
                                        <>
                                            <Link to='/home' onClick={() => window.scrollTo(0, 0)}>
                                                <div className='flex '>
                                                    <img src='/logo.png' alt='logo' className='w-20    ' />
                                                    <h1 className='text-2xl font-bold pt-8'>Job<span className='text-[#020ef8]'>Linker</span></h1>
                                                </div>
                                            </Link>
                                        </>
                                    )
                            }
                        </div>
                        <p className="text-para mt-2 font-semibold">Join our community to receive updates, personalized assistance, and expert guidance start your journey today!</p>

                    </div>

                    <div className="space-y-2">
                        <h3 className="sm:text-xl text-lg text-zinc-800 font-bold mb-4">Quick Links </h3>
                        <ul className="space-y-3">

                            {
                                userData && userData.role === "recruiter"
                                    ?
                                    (adminheader.map((header) => (
                                        <li className=" ">
                                            <Link to={header.link} onClick={() => window.scrollTo(0, 0)} spy={true} smooth={true} offset={-100} duration={500} className="hover:underline text-gray-700 font-semibold">{header.title}</Link>
                                        </li>
                                    ))

                                    )
                                    :
                                    (

                                        userheader.map((header) => (
                                            <li>
                                                <Link to={header.link} onClick={() => window.scrollTo(0, 0)} className="hover:underline text-gray-700 font-semibold">
                                                    {header.title}
                                                </Link>
                                            </li>
                                        ))
                                    )
                            }

                        </ul>

                    </div>

                    <div className="space-y-2">
                        <h3 className="sm:text-xl text-lg font-bold text-zinc-800 mb-4">Contact info </h3>
                        <ul className="space-y-3 font-semibold">
                            <li className="flex  items-center gap-2">
                                <FaMapMarkedAlt className="text-[#020ef8]" />
                                <p className="text-gray-700"> Ahmedabad, India</p>
                            </li>
                            <li className="flex items-center gap-2">
                                <FaPhoneAlt className="text-[#020ef8]" />
                                <p className="text-gray-700">+973 536 8732</p>
                            </li>
                            <li className="flex items-center gap-2">
                                <FaEnvelope className="text-[#020ef8]" />
                                <p className="text-gray-700">info@joblinker.com</p>
                            </li>
                        </ul>


                    </div>

                </div>
                <div className="flex justify-center space-x-4 lg:mt-4  mt-10 w-full text-[#020ef8] size-10">

                    <a
                        href="https://github.com/Smitbhuva15"
                        target="_blank"
                        rel="noopener noreferrer "
                        className=" rounded-full px-2 py-2 transition-colors bg-gray-200 hover:bg-gray-300"
                    >
                        <Github />
                    </a>
                    <a
                        href="https://www.linkedin.com/in/smit-bhuva-1007ba314/"
                        target="_blank"
                        rel="noopener noreferrer "
                        className=" rounded-full px-2 py-2 transition-colors bg-gray-200 hover:bg-gray-300"
                    >
                        <Linkedin />
                    </a>
                    <a
                        href="#"
                        rel="noopener noreferrer "
                        className=" rounded-full px-2 py-2 transition-colors bg-gray-200 hover:bg-gray-300"
                    >
                        <Globe />
                    </a>
                </div>
                <div className="text-center  w-full mt-10 font-semibold text-wrap">
                    <p>Copyright © {currentYear} - All right reserved by <span className="text-[#020ef8] font-bold">JobLinker</span></p>
                    <p className=" text-center">Designed & Developed <span className="text-[#020ef8] font-bold">Smit Bhuva</span> </p>
                </div>
            </div >
        </>
    );
};
export default Footer;