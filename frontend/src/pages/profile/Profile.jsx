import React, { useContext, useState } from 'react'
import { Avatar, AvatarImage, AvatarFallback } from '../../components/ui/avatar'
import { Button } from '../../components/ui/button'
import { Badge } from '../../components/ui/badge'
import { Label } from '../../components/ui/label'
import { Contact, Loader2, Mail, Pen, Briefcase, FileText, MapPin } from 'lucide-react'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfile from './UpdateProfile'
import { AuthContext } from '@/Context-Api/AuthContext'

const Profile = () => {
    const [open, setOpen] = useState(false);
    const { userData } = useContext(AuthContext);

    return (
        !userData || Object.keys(userData).length === 0 ? (
            <div className="flex justify-center items-center w-full min-h-[calc(100vh-8rem)]">
                <Loader2 className="h-10 w-10 text-primary animate-spin" />
            </div>
        ) : (
            <div className='bg-background min-h-[calc(100vh-8rem)] pb-14'>
                {/* Cover Photo Header */}
                <div className="h-48 md:h-64 bg-gradient-to-r from-primary/80 to-purple-600/80 w-full relative">
                    <div className="absolute inset-0 bg-black/10"></div>
                </div>

                <div className='sm:max-w-screen-sm md:max-w-3xl lg:max-w-4xl mx-auto px-4 sm:px-6 w-full -mt-20 relative z-10'>
                    
                    {/* Top Section: Avatar & Basic Info */}
                    <div className='bg-card border border-border shadow-md rounded-2xl p-6 sm:p-8 mb-6'>
                        <div className='flex flex-col sm:flex-row justify-between items-start gap-6'>
                            <div className='flex flex-col sm:flex-row items-center sm:items-start gap-6 w-full'>
                                <Avatar className="h-28 w-28 sm:h-32 sm:w-32 border-4 border-card shadow-sm -mt-16 sm:-mt-20 bg-background">
                                    <AvatarImage src={userData?.profile?.profilePhoto} alt="profile" className="object-cover" />
                                    <AvatarFallback className="text-3xl text-primary font-semibold">{userData?.fullname?.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div className="text-center sm:text-left flex-1 mt-2 sm:mt-0">
                                    <h1 className='font-bold text-2xl md:text-3xl font-heading text-foreground'>{userData?.fullname}</h1>
                                    <p className='text-muted-foreground mt-1 text-sm md:text-base'>{userData?.profile?.bio || "No bio provided"}</p>
                                    
                                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 mt-4 text-sm text-muted-foreground">
                                        <div className='flex items-center gap-1.5'>
                                            <Mail className="h-4 w-4" />
                                            <span>{userData?.email}</span>
                                        </div>
                                        <div className='flex items-center gap-1.5'>
                                            <Contact className="h-4 w-4" />
                                            <span>{userData?.phoneNumber || "No phone number"}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Button className="shrink-0 w-full sm:w-auto" variant="outline" onClick={() => setOpen(true)}>
                                <Pen className="h-4 w-4 mr-2" /> Edit Profile
                            </Button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        {/* Skills Section */}
                        <div className="md:col-span-2 bg-card border border-border shadow-sm rounded-2xl p-6 sm:p-8">
                            <h2 className='font-bold text-lg font-heading text-foreground mb-4 flex items-center gap-2'>
                                <Briefcase className="h-5 w-5 text-primary" /> Skills
                            </h2>
                            <div className='flex flex-wrap gap-2'>
                                {userData?.profile?.skills?.length > 0 ? (
                                    userData?.profile?.skills.map((item, index) => (
                                        <Badge key={index} variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20 px-3 py-1 text-sm">
                                            {item}
                                        </Badge>
                                    ))
                                ) : (
                                    <span className='text-destructive text-sm font-medium'>Skills missing! Edit to complete profile.</span>
                                )}
                            </div>
                        </div>

                        {/* Resume Section */}
                        <div className="bg-card border border-border shadow-sm rounded-2xl p-6 sm:p-8">
                            <h2 className='font-bold text-lg font-heading text-foreground mb-4 flex items-center gap-2'>
                                <FileText className="h-5 w-5 text-primary" /> Resume
                            </h2>
                            <div className='w-full'>
                                {userData?.profile?.resume ? (
                                    <a target='_blank' rel="noreferrer" href={userData?.profile?.resume} className='flex items-center gap-2 p-3 rounded-xl border border-primary/20 bg-primary/5 hover:bg-primary/10 transition-colors group'>
                                        <FileText className="h-8 w-8 text-primary group-hover:scale-110 transition-transform" />
                                        <div className="overflow-hidden">
                                            <p className="text-sm font-medium text-foreground truncate">{userData?.profile?.resumeOriginalName || "Resume.pdf"}</p>
                                            <p className="text-xs text-primary">View Document</p>
                                        </div>
                                    </a>
                                ) : (
                                    <span className='text-destructive text-sm font-medium'>Resume missing! Edit to complete profile.</span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Applied Jobs Section */}
                    <div className='bg-card border border-border shadow-sm rounded-2xl p-6 sm:p-8 mb-6'>
                        <h2 className='font-bold text-lg font-heading text-foreground mb-6'>Applied Jobs</h2>
                        <AppliedJobTable />
                    </div>

                    <UpdateProfile open={open} setOpen={setOpen} />
                </div>
            </div>
        )
    )
}

export default Profile