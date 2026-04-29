import { AuthContext } from "@/Context-Api/AuthContext";
import { adminheader, userheader } from "@/lib/config";
import { Github, Globe, Linkedin, Briefcase } from "lucide-react";
import { useContext } from "react";
import { FaEnvelope, FaMapMarkedAlt, FaPhoneAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
    const { userData } = useContext(AuthContext);
    const currentYear = new Date().getFullYear()

    const isRecruiter = (userData?.role === "recruiter") || (!userData && localStorage.getItem('user-role') === "recruiter");
    const navLinks = isRecruiter ? adminheader : userheader;
    const homeRoute = isRecruiter ? '/admin/compnies' : '/home';

    return (
        <footer className="bg-muted/40 border-t border-border mt-auto">
            <div className="container mx-auto px-4 md:px-8 py-12 md:py-16 max-w-7xl">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8">
                    
                    {/* Brand Section */}
                    <div className="col-span-1 md:col-span-2 space-y-6">
                        <Link to={homeRoute} onClick={() => window.scrollTo(0, 0)} className="flex items-center gap-2 w-fit">
                            <Briefcase className="w-8 h-8 text-primary" />
                            <h1 className='text-2xl font-bold font-heading tracking-tight'>
                                Job<span className='text-primary'>Linker</span>
                            </h1>
                        </Link>
                        <p className="text-muted-foreground max-w-md leading-relaxed">
                            Join our community to receive updates, personalized assistance, and expert guidance. Start your journey with the ultimate platform for modern hiring.
                        </p>
                        
                        <div className="flex items-center gap-4 pt-2">
                            <a href="https://github.com/Smitbhuva15" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-background border border-border text-muted-foreground hover:text-primary hover:border-primary transition-colors">
                                <Github className="w-5 h-5" />
                            </a>
                            <a href="https://www.linkedin.com/in/smit-bhuva-1007ba314/" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-background border border-border text-muted-foreground hover:text-primary hover:border-primary transition-colors">
                                <Linkedin className="w-5 h-5" />
                            </a>
                            <a href="#" rel="noopener noreferrer" className="p-2 rounded-full bg-background border border-border text-muted-foreground hover:text-primary hover:border-primary transition-colors">
                                <Globe className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-foreground tracking-tight">Quick Links</h3>
                        <ul className="space-y-3">
                            {navLinks.map((header, index) => (
                                <li key={index}>
                                    <Link 
                                        to={header.link} 
                                        onClick={() => window.scrollTo(0, 0)} 
                                        className="text-muted-foreground hover:text-primary transition-colors text-sm font-medium"
                                    >
                                        {header.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-foreground tracking-tight">Contact</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-muted-foreground">
                                <FaMapMarkedAlt className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                <span className="text-sm leading-tight">Ahmedabad, Gujarat<br/>India</span>
                            </li>
                            <li className="flex items-center gap-3 text-muted-foreground">
                                <FaPhoneAlt className="w-4 h-4 text-primary shrink-0" />
                                <span className="text-sm">+91 97353 68732</span>
                            </li>
                            <li className="flex items-center gap-3 text-muted-foreground">
                                <FaEnvelope className="w-4 h-4 text-primary shrink-0" />
                                <span className="text-sm">info@joblinker.com</span>
                            </li>
                        </ul>
                    </div>

                </div>

                <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
                    <p>© {currentYear} JobLinker. All rights reserved.</p>
                    <p>
                        Designed & Developed by <span className="font-semibold text-foreground">Smit Bhuva</span>
                    </p>
                </div>
            </div>
        </footer>
    );
};
export default Footer;