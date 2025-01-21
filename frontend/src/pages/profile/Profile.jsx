import React from 'react'
import { Avatar, AvatarImage } from '../../components/ui/avatar'
import { Button } from '../../components/ui/button'
import { Badge } from '../../components/ui/badge'
import { Label } from '../../components/ui/label'
import { Contact, Mail, Pen } from 'lucide-react'
import AppliedJobTable from './AppliedJobTable'



const Profile = () => {
    const randome=[1,2,3,4]
    const isResume=true
    return (
        <div>
            <div className='max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8'>
                <div className='flex justify-between'>
                    <div className='flex items-center gap-4'>
                        <Avatar className="h-24 w-24">
                            <AvatarImage src="https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg" alt="profile" />
                        </Avatar>
                        <div>
                            <h1 className='font-medium text-xl'>user?.fullname</h1>
                            <p>user?.profile?.bio</p>
                        </div>
                    </div>
                    <Button className="text-right" variant="outline"><Pen /></Button>

                </div>
                <div className='my-5'>
                    <div className='flex items-center gap-3 my-2'>
                        <Mail />
                        <span>user?.email</span>
                    </div>
                    <div className='flex items-center gap-3 my-2'>
                        <Contact />
                        <span>user?.phoneNumber</span>
                    </div>
                </div>

                <div className='my-5'>
                    <h1>Skills</h1>
                    <div className='flex items-center gap-1'>
                        {
                            randome.length!== 0 ? randome.map((item, index) => <Badge key={index}>{item}</Badge>) : <span className='text-[#020ef8] font-extrabold'>NAN</span>
                        }
                    </div>
                </div>

                <div className='grid w-full max-w-sm items-center gap-1.5'>
                    <Label className="text-md font-bold">Resume</Label>
                    {
                        isResume ? <a target='blank' href='https://ui.shadcn.com/docs/components/radio-group' className='text-[#020ef8] w-full hover:underline cursor-pointer'>resumeOriginalName</a> : <span className='text-[#020ef8] font-extrabold'>NAN</span>
                    }
                </div>
            </div>

            <div className='max-w-4xl mx-auto bg-white rounded-2xl'>
                <h1 className='font-bold text-lg my-5'>Applied Jobs</h1>
                
                <AppliedJobTable />
            </div>


        </div>
    )
}

export default Profile