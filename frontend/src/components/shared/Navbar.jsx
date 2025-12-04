import React, { useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarImage } from '../ui/avatar'
import { LogOut, User2, Menu, X } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    return (
        <div className='bg-white border-b'>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16 px-4 sm:px-6 lg:px-8'>
                <div>
                    <h1 className='text-xl sm:text-2xl font-bold'>Job<span className='text-[#F83002]'>Portal</span></h1>
                </div>

                {/* Desktop Navigation */}
                <div className='hidden md:flex items-center gap-8 lg:gap-12'>
                    <ul className='flex font-medium items-center gap-4 lg:gap-5'>
                        {
                            user && user.role === 'recruiter' ? (
                                <>
                                    <li><Link to="/admin/companies" className='hover:text-[#6A38C2] transition-colors'>Companies</Link></li>
                                    <li><Link to="/admin/jobs" className='hover:text-[#6A38C2] transition-colors'>Jobs</Link></li>
                                </>
                            ) : (
                                <>
                                    <li><Link to="/" className='hover:text-[#6A38C2] transition-colors'>Home</Link></li>
                                    <li><Link to="/jobs" className='hover:text-[#6A38C2] transition-colors'>Jobs</Link></li>
                                    <li><Link to="/browse" className='hover:text-[#6A38C2] transition-colors'>Browse</Link></li>
                                </>
                            )
                        }
                    </ul>
                    {
                        !user ? (
                            <div className='flex items-center gap-2'>
                                <Link to="/login"><Button variant="outline">Login</Button></Link>
                                <Link to="/signup"><Button className="bg-[#6A38C2] hover:bg-[#5b30a6]">Signup</Button></Link>
                            </div>
                        ) : (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Avatar className="cursor-pointer">
                                        <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent className="w-80">
                                    <div className=''>
                                        <div className='flex gap-2 space-y-2'>
                                            <Avatar className="cursor-pointer">
                                                <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                                            </Avatar>
                                            <div>
                                                <h4 className='font-medium'>{user?.fullname}</h4>
                                                <p className='text-sm text-muted-foreground'>{user?.profile?.bio}</p>
                                            </div>
                                        </div>
                                        <div className='flex flex-col my-2 text-gray-600'>
                                            <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                                <User2 />
                                                <Button variant="link"> <Link to="/profile">View Profile</Link></Button>
                                            </div>

                                            <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                                <LogOut />
                                                <Button onClick={logoutHandler} variant="link">Logout</Button>
                                            </div>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        )
                    }
                </div>

                {/* Mobile Menu Button */}
                <div className='md:hidden flex items-center gap-2'>
                    {user && (
                        <Popover>
                            <PopoverTrigger asChild>
                                <Avatar className="cursor-pointer h-8 w-8">
                                    <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                                </Avatar>
                            </PopoverTrigger>
                            <PopoverContent className="w-64">
                                <div className=''>
                                    <div className='flex gap-2 items-center'>
                                        <Avatar className="cursor-pointer h-10 w-10">
                                            <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                                        </Avatar>
                                        <div>
                                            <h4 className='font-medium text-sm'>{user?.fullname}</h4>
                                            <p className='text-xs text-muted-foreground line-clamp-1'>{user?.profile?.bio}</p>
                                        </div>
                                    </div>
                                    <div className='flex flex-col my-2 text-gray-600'>
                                        <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                            <User2 size={16} />
                                            <Button variant="link" className="p-0 h-auto"> <Link to="/profile">View Profile</Link></Button>
                                        </div>

                                        <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                            <LogOut size={16} />
                                            <Button onClick={logoutHandler} variant="link" className="p-0 h-auto">Logout</Button>
                                        </div>
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>
                    )}
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden"
                    >
                        {mobileMenuOpen ? <X /> : <Menu />}
                    </Button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className='md:hidden border-t bg-white'>
                    <div className='px-4 py-4 space-y-3'>
                        <ul className='flex flex-col font-medium gap-3'>
                            {
                                user && user.role === 'recruiter' ? (
                                    <>
                                        <li>
                                            <Link
                                                to="/admin/companies"
                                                className='block py-2 hover:text-[#6A38C2] transition-colors'
                                                onClick={() => setMobileMenuOpen(false)}
                                            >
                                                Companies
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                to="/admin/jobs"
                                                className='block py-2 hover:text-[#6A38C2] transition-colors'
                                                onClick={() => setMobileMenuOpen(false)}
                                            >
                                                Jobs
                                            </Link>
                                        </li>
                                    </>
                                ) : (
                                    <>
                                        <li>
                                            <Link
                                                to="/"
                                                className='block py-2 hover:text-[#6A38C2] transition-colors'
                                                onClick={() => setMobileMenuOpen(false)}
                                            >
                                                Home
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                to="/jobs"
                                                className='block py-2 hover:text-[#6A38C2] transition-colors'
                                                onClick={() => setMobileMenuOpen(false)}
                                            >
                                                Jobs
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                to="/browse"
                                                className='block py-2 hover:text-[#6A38C2] transition-colors'
                                                onClick={() => setMobileMenuOpen(false)}
                                            >
                                                Browse
                                            </Link>
                                        </li>
                                    </>
                                )
                            }
                        </ul>
                        {
                            !user && (
                                <div className='flex flex-col gap-2 pt-2 border-t'>
                                    <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                                        <Button variant="outline" className="w-full">Login</Button>
                                    </Link>
                                    <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                                        <Button className="bg-[#6A38C2] hover:bg-[#5b30a6] w-full">Signup</Button>
                                    </Link>
                                </div>
                            )
                        }
                    </div>
                </div>
            )}
        </div>
    )
}

export default Navbar