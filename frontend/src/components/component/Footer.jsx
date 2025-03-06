

import { AuthContext } from "@/Context-Api/AuthContext";
import { useContext } from "react";
import { FaEnvelope, FaFacebook, FaInstagram, FaLinkedin, FaMapMarked, FaMapMarkedAlt, FaPhoneAlt, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {

    const { userData } = useContext(AuthContext);
    const currentYear = new Date().getFullYear()
   
    

    return (
        <>
            <div className="py-12 bg-gary-100 px-8 min-h-52 bg-slate-50 ">
                <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 sm:grid-cols-2 gap-8">
                    <div className="space-y-6 mr-14">
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
                        <p className="text-para mt-2">Connect with us for updates, support, and services. Your journey starts here. Stay informed and engaged with our team!</p>
                        <div className="flex space-x-4 mt-4">
                            <a href="#" className="bg-gray-200 text-[#020ef8] rounded-full size-10 flex items-center justify-center hover:bg-primary/90 hover:text-white ">
                                <FaFacebook /></a>
                            <a href="#" className="bg-gray-200 text-[#020ef8] rounded-full size-10 flex items-center justify-center hover:bg-primary/90 hover:text-white ">
                                <FaInstagram /></a>
                            <a href="#" className="bg-gray-200 text-[#020ef8] rounded-full size-10 flex items-center justify-center hover:bg-primary/90 hover:text-white ">
                                <FaTwitter /></a>
                            <a href="#" className="bg-gray-200 text-[#020ef8] rounded-full size-10 flex items-center justify-center hover:bg-primary/90 hover:text-white ">
                                <FaLinkedin /></a>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <h3 className="text-xl font-semibold mb-4">Quick Links </h3>
                        <ul className="space-y-3">

                            {
                                userData && userData.role === "recruiter"
                                    ?
                                    (
                                        <>
                                            <li><Link to="/admin/compnies" onClick={() => window.scrollTo(0, 0)} spy={true} smooth={true} offset={-100} duration={500} className="hover:underline text-gray-700">Companies</Link></li>


                                            <li><Link to="/admin/jobs" onClick={() => window.scrollTo(0, 0)} spy={true} smooth={true} offset={-10} duration={500} className="hover:underline text-gray-700">Jobs</Link></li>



                                        </>
                                    )
                                    :
                                    (
                                        <>
                                            <li>
                                                <Link to="/home" onClick={() => window.scrollTo(0, 0)} className="hover:underline text-gray-700">
                                                    Home
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="/jobs" onClick={() => window.scrollTo(0, 0)} className="hover:underline text-gray-700">
                                                    Jobs
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="/browse" onClick={() => window.scrollTo(0, 0)} className="hover:underline text-gray-700">
                                                    Browse
                                                </Link>
                                            </li>
                                        </>
                                    )
                            }

                        </ul>

                    </div>

                    <div className="space-y-2 ">
                        <h3 className="text-xl font-semibold mb-4">Support </h3>
                        <ul className="space-y-3">
                            <li><a href="#" className="hover:underline text-gray-700">FAQ</a></li>


                            <li><a href="#" className="hover:underline text-gray-700">Terms of services</a></li>


                            <li><a href="#" className="hover:underline text-gray-700">Privacy policy</a></li>


                            <li><a href="#" className="hover:underline text-gray-700">Support center</a></li>
                        </ul>

                    </div>

                    <div className="space-y-2">
                        <h3 className="text-xl font-semibold mb-4">Contact infp </h3>
                        <ul className="space-y-3">
                            <li className="flex items-center gap-2">
                                <FaMapMarkedAlt className="text-[#020ef8]" />
                                <p className="text-gray-700">64, Vadapalani, Chennai, India</p>
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
                <div className="text-center container w-full mt-10 font-semibold">
                    <p>Copyright © {currentYear} - All right reserved by <span className="text-[#020ef8] font-bold">JobLinker</span></p>
                    <p className="mb-5">Developed by <span className="text-[#020ef8] font-bold">Smit.Tech</span> </p>
                </div>
            </div>
        </>
    );
};
export default Footer;