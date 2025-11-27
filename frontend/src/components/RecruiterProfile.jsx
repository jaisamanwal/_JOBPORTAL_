import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen, Building2, Briefcase } from 'lucide-react'
import { Badge } from './ui/badge'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs'
import { Link } from 'react-router-dom'

const RecruiterProfile = () => {
    useGetAllCompanies();
    useGetAllAdminJobs();
    const [open, setOpen] = useState(false);
    const { user } = useSelector(store => store.auth);
    const { companies } = useSelector(store => store.company);
    const { allAdminJobs } = useSelector(store => store.job);

    // Calculate statistics
    const totalCompanies = companies?.length || 0;
    const totalJobs = allAdminJobs?.length || 0;
    const activeJobs = allAdminJobs?.filter(job => job.applications?.length > 0)?.length || 0;

    return (
        <div>
            <Navbar />
            {/* Recruiter Statistics */}
            <div className='max-w-4xl mx-auto my-5'>
                <div className='bg-white border border-gray-200 rounded-2xl p-6'>
                    <h2 className='text-xl font-bold mb-4'>Recruiter Dashboard</h2>
                    <div className='grid grid-cols-3 gap-4'>
                        <div className='text-center p-4 bg-blue-50 rounded-lg'>
                            <div className='text-3xl font-bold text-blue-600'>{totalCompanies}</div>
                            <div className='text-sm text-gray-600 mt-1'>Companies Registered</div>
                        </div>
                        <div className='text-center p-4 bg-purple-50 rounded-lg'>
                            <div className='text-3xl font-bold text-purple-600'>{totalJobs}</div>
                            <div className='text-sm text-gray-600 mt-1'>Jobs Posted</div>
                        </div>
                        <div className='text-center p-4 bg-green-50 rounded-lg'>
                            <div className='text-3xl font-bold text-green-600'>{activeJobs}</div>
                            <div className='text-sm text-gray-600 mt-1'>Active Jobs</div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Profile Information */}
            <div className='max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8'>
                <div className='flex justify-between'>
                    <div className='flex items-center gap-4'>
                        <Avatar className="h-24 w-24">
                            <AvatarImage src={user?.profile?.profilePhoto || "https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"} alt="profile" />
                        </Avatar>
                        <div>
                            <h1 className='font-medium text-xl'>{user?.fullname}</h1>
                            <Badge className="bg-purple-600 text-white">Recruiter</Badge>
                            <p className='mt-2'>{user?.profile?.bio}</p>
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
            </div>
            {/* Quick Actions */}
            <div className='max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-6'>
                <h2 className='text-xl font-bold mb-4'>Quick Actions</h2>
                <div className='grid grid-cols-2 gap-4'>
                    <Link to="/admin/companies">
                        <div className='p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer'>
                            <div className='flex items-center gap-3'>
                                <Building2 className='h-8 w-8 text-blue-600' />
                                <div>
                                    <h3 className='font-semibold'>Manage Companies</h3>
                                    <p className='text-sm text-gray-600'>View and edit your companies</p>
                                </div>
                            </div>
                        </div>
                    </Link>
                    <Link to="/admin/jobs">
                        <div className='p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer'>
                            <div className='flex items-center gap-3'>
                                <Briefcase className='h-8 w-8 text-purple-600' />
                                <div>
                                    <h3 className='font-semibold'>Manage Jobs</h3>
                                    <p className='text-sm text-gray-600'>View and post job listings</p>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
            <UpdateProfileDialog open={open} setOpen={setOpen} />
        </div>
    )
}

export default RecruiterProfile
