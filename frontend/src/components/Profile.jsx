import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobTable from './AppliedJobTable'
import SavedJobsTable from './SavedJobsTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'

// const skills = ["Html", "Css", "Javascript", "Reactjs"]
const isResume = true;

const Profile = () => {
    useGetAppliedJobs();
    const [open, setOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('applied'); // 'applied' or 'saved'
    const { user } = useSelector(store => store.auth);
    const { allAppliedJobs, savedJobs = [] } = useSelector(store => store.job);

    // Calculate statistics
    const totalApplications = allAppliedJobs?.length || 0;
    const pendingApplications = allAppliedJobs?.filter(app => app.status === 'pending')?.length || 0;
    const acceptedApplications = allAppliedJobs?.filter(app => app.status === 'accepted')?.length || 0;
    const rejectedApplications = allAppliedJobs?.filter(app => app.status === 'rejected')?.length || 0;
    const totalSavedJobs = savedJobs?.length || 0;

    return (
        <div>
            <Navbar />
            {/* Application Statistics */}
            <div className='max-w-4xl mx-auto my-5 px-4 sm:px-6 lg:px-8'>
                <div className='bg-white border border-gray-200 rounded-2xl p-4 sm:p-6'>
                    <h2 className='text-lg sm:text-xl font-bold mb-4'>Application Statistics</h2>
                    <div className='grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4'>
                        <div className='text-center p-3 sm:p-4 bg-blue-50 rounded-lg'>
                            <div className='text-2xl sm:text-3xl font-bold text-blue-600'>{totalApplications}</div>
                            <div className='text-xs sm:text-sm text-gray-600 mt-1'>Total Applications</div>
                        </div>
                        <div className='text-center p-3 sm:p-4 bg-gray-50 rounded-lg'>
                            <div className='text-2xl sm:text-3xl font-bold text-gray-600'>{pendingApplications}</div>
                            <div className='text-xs sm:text-sm text-gray-600 mt-1'>Pending</div>
                        </div>
                        <div className='text-center p-3 sm:p-4 bg-green-50 rounded-lg'>
                            <div className='text-2xl sm:text-3xl font-bold text-green-600'>{acceptedApplications}</div>
                            <div className='text-xs sm:text-sm text-gray-600 mt-1'>Accepted</div>
                        </div>
                        <div className='text-center p-3 sm:p-4 bg-red-50 rounded-lg'>
                            <div className='text-2xl sm:text-3xl font-bold text-red-600'>{rejectedApplications}</div>
                            <div className='text-xs sm:text-sm text-gray-600 mt-1'>Rejected</div>
                        </div>
                        <div className='text-center p-3 sm:p-4 bg-purple-50 rounded-lg'>
                            <div className='text-2xl sm:text-3xl font-bold text-purple-600'>{totalSavedJobs}</div>
                            <div className='text-xs sm:text-sm text-gray-600 mt-1'>Saved Jobs</div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Profile Information */}
            <div className='max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-4 sm:p-6 lg:p-8 mx-4 sm:mx-6 lg:mx-auto'>
                <div className='flex flex-col sm:flex-row justify-between gap-4'>
                    <div className='flex flex-col sm:flex-row items-center sm:items-start gap-4'>
                        <Avatar className="h-20 w-20 sm:h-24 sm:w-24">
                            <AvatarImage src="https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg" alt="profile" />
                        </Avatar>
                        <div className='text-center sm:text-left'>
                            <h1 className='font-medium text-lg sm:text-xl'>{user?.fullname}</h1>
                            <p className='text-sm sm:text-base'>{user?.profile?.bio}</p>
                        </div>
                    </div>
                    <Button onClick={() => setOpen(true)} className="text-right w-full sm:w-auto" variant="outline"><Pen /></Button>
                </div>
                <div className='my-5 space-y-3'>
                    <div className='flex items-center gap-3 my-2'>
                        <Mail className="flex-shrink-0" />
                        <span className='text-sm sm:text-base break-all'>{user?.email}</span>
                    </div>
                    <div className='flex items-center gap-3 my-2'>
                        <Contact className="flex-shrink-0" />
                        <span className='text-sm sm:text-base'>{user?.phoneNumber}</span>
                    </div>
                </div>
                <div className='my-5'>
                    <h1 className='font-medium mb-2'>Skills</h1>
                    <div className='flex flex-wrap items-center gap-1'>
                        {
                            user?.profile?.skills.length !== 0 ? user?.profile?.skills.map((item, index) => <Badge key={index} className="text-xs">{item}</Badge>) : <span>NA</span>
                        }
                    </div>
                </div>
                <div className='grid w-full max-w-sm items-center gap-1.5'>
                    <Label className="text-sm sm:text-md font-bold">Resume</Label>
                    {
                        isResume ? <a target='blank' href={user?.profile?.resume} className='text-blue-500 w-full hover:underline cursor-pointer text-sm sm:text-base break-all'>{user?.profile?.resumeOriginalName}</a> : <span>NA</span>
                    }
                </div>
            </div>

            {/* Jobs Section with Tabs */}
            <div className='max-w-4xl mx-auto bg-white rounded-2xl px-4 sm:px-6 lg:px-8 pb-8'>
                {/* Tab Navigation */}
                <div className='flex gap-4 border-b mb-5'>
                    <button
                        onClick={() => setActiveTab('applied')}
                        className={`pb-3 px-2 font-medium text-sm sm:text-base transition-colors ${activeTab === 'applied'
                                ? 'border-b-2 border-[#6A38C2] text-[#6A38C2]'
                                : 'text-gray-600 hover:text-gray-900'
                            }`}
                    >
                        Applied Jobs ({totalApplications})
                    </button>
                    <button
                        onClick={() => setActiveTab('saved')}
                        className={`pb-3 px-2 font-medium text-sm sm:text-base transition-colors ${activeTab === 'saved'
                                ? 'border-b-2 border-[#6A38C2] text-[#6A38C2]'
                                : 'text-gray-600 hover:text-gray-900'
                            }`}
                    >
                        Saved Jobs ({totalSavedJobs})
                    </button>
                </div>

                {/* Tab Content */}
                <div className='overflow-x-auto'>
                    {activeTab === 'applied' ? (
                        <AppliedJobTable />
                    ) : (
                        <SavedJobsTable savedJobs={savedJobs} />
                    )}
                </div>
            </div>

            <UpdateProfileDialog open={open} setOpen={setOpen} />
        </div>
    )
}

export default Profile