import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { toggleSavedJob } from '@/redux/jobSlice'
import { toast } from 'sonner'
import { X } from 'lucide-react'

const SavedJobsTable = ({ savedJobs = [] }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const removeSavedJob = (job) => {
        dispatch(toggleSavedJob(job));
        toast.info('Job removed from saved list');
    }

    return (
        <div className='overflow-x-auto'>
            <Table>
                <TableCaption>Your saved jobs for later</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="min-w-[150px]">Company</TableHead>
                        <TableHead className="min-w-[150px]">Job Role</TableHead>
                        <TableHead className="min-w-[100px]">Location</TableHead>
                        <TableHead className="min-w-[100px]">Salary</TableHead>
                        <TableHead className="text-right min-w-[150px]">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        !savedJobs || savedJobs.length <= 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center">
                                    No saved jobs yet. Click "Save For Later" on any job to add it here.
                                </TableCell>
                            </TableRow>
                        ) : savedJobs.map((job) => (
                            <TableRow key={job._id}>
                                <TableCell className="text-xs sm:text-sm font-medium">{job?.company?.name}</TableCell>
                                <TableCell className="text-xs sm:text-sm">{job?.title}</TableCell>
                                <TableCell className="text-xs sm:text-sm">{job?.location}</TableCell>
                                <TableCell className="text-xs sm:text-sm">
                                    <Badge className="text-xs" variant="ghost">{job?.salary}LPA</Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end gap-2">
                                        <Button
                                            onClick={() => navigate(`/description/${job?._id}`)}
                                            variant="outline"
                                            size="sm"
                                            className="text-xs"
                                        >
                                            View Details
                                        </Button>
                                        <Button
                                            onClick={() => removeSavedJob(job)}
                                            variant="ghost"
                                            size="sm"
                                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                        >
                                            <X className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default SavedJobsTable
