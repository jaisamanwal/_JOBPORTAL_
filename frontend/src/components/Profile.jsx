import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'

// const skills = ["Html", "Css", "Javascript", "Reactjs"]
const isResume = true;

const Profile = () => {
    useGetAppliedJobs();
    const [open, setOpen] = useState(false);
    const { user } = useSelector(store => store.auth);
    const { allAppliedJobs } = useSelector(store => store.job);

    // Calculate statistics
    const totalApplications = allAppliedJobs?.length || 0;
    const pendingApplications = allAppliedJobs?.filter(app => app.status === 'pending')?.length || 0;
    const acceptedApplications = allAppliedJobs?.filter(app => app.status === 'accepted')?.length || 0;
    const rejectedApplications = allAppliedJobs?.filter(app => app.status === 'rejected')?.length || 0;

    return (
        <div>
            <Navbar />
            {/* Application Statistics */}
            <div className='max-w-4xl mx-auto my-5'>
                <div className='bg-white border border-gray-200 rounded-2xl p-6'>
                    <h2 className='text-xl font-bold mb-4'>Application Statistics</h2>
                    <div className='grid grid-cols-4 gap-4'>
                        <div className='text-center p-4 bg-blue-50 rounded-lg'>
                            <div className='text-3xl font-bold text-blue-600'>{totalApplications}</div>
                            <div className='text-sm text-gray-600 mt-1'>Total Applications</div>
                        </div>
                        <div className='text-center p-4 bg-gray-50 rounded-lg'>
                            <div className='text-3xl font-bold text-gray-600'>{pendingApplications}</div>
                            <div className='text-sm text-gray-600 mt-1'>Pending</div>
                        </div>
                        <div className='text-center p-4 bg-green-50 rounded-lg'>
                            <div className='text-3xl font-bold text-green-600'>{acceptedApplications}</div>
                            <div className='text-sm text-gray-600 mt-1'>Accepted</div>
                        </div>
                        <div className='text-center p-4 bg-red-50 rounded-lg'>
                            <div className='text-3xl font-bold text-red-600'>{rejectedApplications}</div>
                            <div className='text-sm text-gray-600 mt-1'>Rejected</div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Profile Information */}
            <div className='max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8'>
                <div className='flex justify-between'>
                    <div className='flex items-center gap-4'>
                        <Avatar className="h-24 w-24">
                            <AvatarImage src="https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg" alt="profile" />
                        </Avatar>
                        <div>
                            <h1 className='font-medium text-xl'>{user?.fullname}</h1>
                            <p>{user?.profile?.bio}</p>
                        </div>
                    </div>
                    <Button onClick={() => setOpen(true)} className="text-right" variant="outline"><Pen /></Button>
                </div>
                <div className='my-5'>
                    <div className='flex items-center gap-3 my-2'>
                        <Mail />
                        <span>{user?.email}</span>
                    </div>
                    <div className='flex items-center gap-3 my-2'>
                        <Contact />
                        <span>{user?.phoneNumber}</span>
                    </div>
                </div>
                <div className='my-5'>
                    <h1>Skills</h1>
                    <div className='flex items-center gap-1'>
                        {
                            user?.profile?.skills.length !== 0 ? user?.profile?.skills.map((item, index) => <Badge key={index}>{item}</Badge>) : <span>NA</span>
                        }
                    </div>
                </div>
                <div className='grid w-full max-w-sm items-center gap-1.5'>
                    <Label className="text-md font-bold">Resume</Label>
                    {
                        isResume ? <a target='blank' href={user?.profile?.resume} className='text-blue-500 w-full hover:underline cursor-pointer'>{user?.profile?.resumeOriginalName}</a> : <span>NA</span>
                    }
                </div>
            </div>
            <div className='max-w-4xl mx-auto bg-white rounded-2xl'>
                <h1 className='font-bold text-lg my-5'>Applied Jobs</h1>
                {/* Applied Job Table   */}
                <AppliedJobTable />
            </div>
            <UpdateProfileDialog open={open} setOpen={setOpen} />
        </div>
    )
}

export default Profile