import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'
import { useSelector } from 'react-redux'

const AppliedJobTable = () => {
    const { allAppliedJobs } = useSelector(store => store.job);
    return (
        <div className='overflow-x-auto'>
            <Table>
                <TableCaption>A list of your applied jobs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="min-w-[100px]">Date</TableHead>
                        <TableHead className="min-w-[150px]">Job Role</TableHead>
                        <TableHead className="min-w-[150px]">Company</TableHead>
                        <TableHead className="text-right min-w-[100px]">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        allAppliedJobs.length <= 0 ? <TableRow><TableCell colSpan={4} className="text-center">You haven't applied any job yet.</TableCell></TableRow> : allAppliedJobs.map((appliedJob) => (
                            <TableRow key={appliedJob._id}>
                                <TableCell className="text-xs sm:text-sm">{appliedJob?.createdAt?.split("T")[0]}</TableCell>
                                <TableCell className="text-xs sm:text-sm">{appliedJob.job?.title}</TableCell>
                                <TableCell className="text-xs sm:text-sm">{appliedJob.job?.company?.name}</TableCell>
                                <TableCell className="text-right"><Badge className={`text-xs ${appliedJob?.status === "rejected" ? 'bg-red-400' : appliedJob.status === 'pending' ? 'bg-gray-400' : 'bg-green-400'}`}>{appliedJob.status.toUpperCase()}</Badge></TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default AppliedJobTable