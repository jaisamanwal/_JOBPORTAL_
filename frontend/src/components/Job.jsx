import React from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toggleSavedJob } from '@/redux/jobSlice'
import { toast } from 'sonner'

const Job = ({ job }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { savedJobs = [] } = useSelector(store => store.job);

    // Check if this job is already saved
    const isSaved = savedJobs?.some(savedJob => savedJob._id === job._id) || false;

    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
    }

    const saveJobHandler = () => {
        dispatch(toggleSavedJob(job));
        if (!isSaved) {
            toast.success('Job saved for later!');
        } else {
            toast.info('Job removed from saved list');
        }
    }

    return (
        <div className='p-4 sm:p-5 rounded-md shadow-xl bg-white border border-gray-100'>
            <div className='flex items-center justify-between'>
                <p className='text-xs sm:text-sm text-gray-500'>{daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}</p>
                <Button
                    onClick={saveJobHandler}
                    variant="outline"
                    className={`rounded-full ${isSaved ? 'bg-[#6A38C2] text-white hover:bg-[#5b30a6]' : ''}`}
                    size="icon"
                >
                    <Bookmark className={isSaved ? 'fill-current' : ''} />
                </Button>
            </div>

            <div className='flex items-center gap-2 my-2'>
                <Button className="p-4 sm:p-6" variant="outline" size="icon">
                    <Avatar>
                        <AvatarImage src={job?.company?.logo} />
                    </Avatar>
                </Button>
                <div>
                    <h1 className='font-medium text-base sm:text-lg'>{job?.company?.name}</h1>
                    <p className='text-xs sm:text-sm text-gray-500'>India</p>
                </div>
            </div>

            <div>
                <h1 className='font-bold text-base sm:text-lg my-2'>{job?.title}</h1>
                <p className='text-xs sm:text-sm text-gray-600 line-clamp-2'>{job?.description}</p>
            </div>
            <div className='flex flex-wrap items-center gap-2 mt-4'>
                <Badge className={'text-blue-700 font-bold text-xs'} variant="ghost">{job?.position} Positions</Badge>
                <Badge className={'text-[#F83002] font-bold text-xs'} variant="ghost">{job?.jobType}</Badge>
                <Badge className={'text-[#7209b7] font-bold text-xs'} variant="ghost">{job?.salary}LPA</Badge>
            </div>
            <div className='flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-4 mt-4'>
                <Button onClick={() => navigate(`/description/${job?._id}`)} variant="outline" className="w-full sm:w-auto">Details</Button>
                <Button onClick={saveJobHandler} className={`w-full sm:w-auto ${isSaved ? 'bg-gray-600' : 'bg-[#7209b7]'}`}>
                    {isSaved ? 'Saved ✓' : 'Save For Later'}
                </Button>
            </div>
        </div>
    )
}

export default Job