import React, { useContext, useState } from 'react'
import { Avatar, AvatarImage } from '../../components/ui/avatar'
import { Button } from '../../components/ui/button'
import { Badge } from '../../components/ui/badge'
import { Label } from '../../components/ui/label'
import { Contact, Loader2, Mail, Pen } from 'lucide-react'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfile from './UpdateProfile'
import { AuthContext } from '@/Context-Api/AuthContext'



const Profile = () => {

    const isResume = true
    const [open, setOpen] = useState(false);

    const { userData } = useContext(AuthContext);
    console.log(userData)

    return (
        !userData || Object.keys(userData).length === 0 ? (
            <div className="flex justify-center items-center w-full h-[90vh]">
                <Loader2 className="h-10 w-10 text-blue-500 animate-spin" />
            </div>
        )
            :
            (
                <div>
                    <div className='sm:max-w-screen-sm md:max-w-2xl  lg:max-w-3xl mx-auto my-14 w-[90%]  bg-white border border-gray-200 rounded-2xl p-8'>
                        <div className='flex justify-between'>
                            <div className='flex items-center gap-4 sm:flex-row flex-col sm:items-start'>
                                <Avatar className="h-24 w-24">
                                    <AvatarImage src={userData?.profile?.profilePhoto} alt="profile" />
                                </Avatar>
                                <div>
                                    <h1 className='font-medium text-xl text-center sm:text-start'>{userData?.fullname}</h1>
                                    <p className='sm:text-start text-center'>{userData?.profile?.bio}</p>
                                </div>
                            </div>
                            <Button className="text-right sm:w-16 w-8" variant="outline" onClick={() => setOpen(true)} ><Pen /></Button>

                        </div>
                        <div className='my-5' >
                            <div className='flex items-center gap-3 my-2 '>
                                <Mail />
                                <span>{userData?.email}</span>
                            </div>
                            <div className='flex items-center gap-3 my-2'>
                                <Contact />
                                <span>{userData?.phoneNumber}</span>
                            </div>
                        </div>

                        <div className='my-5'>
                            <h1>Skills</h1>
                            <div className='flex sm:items-center gap-1 flex-col sm:flex-row items-start'>
                                {
                                   userData?.profile?.skills.length > 0 ? userData?.profile?.skills.map((item, index) => <Badge key={index}>{item}</Badge>) : <span className='text-red-500  font-extrabold'>Skills missing! add to complete profile</span>
                                }
                            </div>
                        </div>

                        <div className='grid w-full max-w-sm items-center gap-1.5'>
                            <Label className="text-md font-bold">Resume</Label>
                            {
                                userData?.profile?.resume ? <a target='blank' href={userData?.profile?.resume} className='text-[#020ef8] w-full hover:underline cursor-pointer'>{userData?.profile?.resumeOriginalName}</a> : <span className='text-red-500 font-extrabold  '>Resume missing! add to complete profile</span>
                            }
                        </div>
                    </div>

                    <div className='sm:max-w-screen-sm md:max-w-2xl  lg:max-w-4xl  my-14 w-[90%] mx-auto bg-white rounded-2xl'>
                        <h1 className='font-bold text-lg my-5'>Applied Jobs</h1>

                        <AppliedJobTable />
                    </div>
                    <div>
                        <UpdateProfile open={open} setOpen={setOpen} />
                    </div>

                </div>
            )

    )
}

export default Profile