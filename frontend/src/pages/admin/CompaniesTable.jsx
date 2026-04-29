import React, { useEffect, useState } from 'react'
import { Avatar, AvatarImage, AvatarFallback } from '../../components/ui/avatar'
import { Edit2, Loader2, Trash2, MapPin, Building2, Calendar } from 'lucide-react'
import GetAllCompany from '../../FechingData/GetAllCompany'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/ui/button'
import toast from 'react-hot-toast'

const CompaniesTable = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const API_URL = import.meta.env.VITE_API_URL;

    const searchcompanytext = useSelector(store => store.company.searchtext);
    const AllCompany = useSelector(store => store.company.AllCompany);

    const [filterCompany, setFilterCompany] = useState([]);
    const [token, setToken] = useState(localStorage.getItem('token-jobportal'));
    const [isLoading, setIsLoading] = useState(true);

    const getcompany = async () => {
        try {
            setIsLoading(true);
            await GetAllCompany(token, dispatch, API_URL);
        } catch (error) {
            console.log("error: ", error)
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getcompany();
    }, [])

    useEffect(() => {
        if (AllCompany && AllCompany.length > 0) {
            if (searchcompanytext && searchcompanytext.length > 0) {
                const filtered = AllCompany.filter((company) => {
                    return company?.name && company?.name.toLowerCase().includes(searchcompanytext.toLowerCase())
                })
                setFilterCompany(filtered)
            } else {
                setFilterCompany(AllCompany)
            }
        } else {
            setFilterCompany([]);
        }
    }, [AllCompany, searchcompanytext]);

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this company? This action cannot be undone.")) return;

        try {
            const response = await fetch(`${API_URL}/user/v2/api/delete/company/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (response.ok) {
                toast.success("Company deleted successfully");
                getcompany(); // Refresh the list
            } else {
                const errData = await response.json();
                toast.error(errData.message || "Failed to delete company");
            }
        } catch (error) {
            toast.error("Internal server error");
        }
    }

    if (isLoading) {
        return (
            <div className="flex justify-center items-center w-full min-h-[50vh]">
                <Loader2 className="h-10 w-10 text-primary animate-spin" />
            </div>
        )
    }

    if (filterCompany.length <= 0) {
        return (
            <div className="flex flex-col justify-center items-center w-full min-h-[40vh] bg-card border border-border rounded-2xl shadow-sm p-8 mt-10">
                <div className="bg-muted w-16 h-16 rounded-full flex items-center justify-center mb-4">
                    <Building2 className="text-muted-foreground w-8 h-8" />
                </div>
                <div className='text-foreground text-center text-xl font-bold font-heading'>
                    No Companies Found
                </div>
                <p className="text-sm text-muted-foreground mt-2 max-w-sm text-center">
                    You haven't registered any companies yet, or none match your search criteria.
                </p>
                <Button onClick={() => navigate('/admin/add/company')} className="mt-6 rounded-xl">
                    Register a Company
                </Button>
            </div>
        )
    }

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 mb-20'>
            {filterCompany.map((company) => (
                <div key={company._id} className="bg-card border border-border rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow group flex flex-col h-full relative">
                    <div className="flex items-start justify-between mb-4">
                        <Avatar className="w-16 h-16 border-2 border-border/50 shadow-sm rounded-xl object-contain">
                            <AvatarImage src={company?.logo} className="object-contain" />
                            <AvatarFallback className="rounded-xl bg-primary/10 text-primary font-bold text-xl">{company?.name?.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex items-center gap-2">
                            <Button variant="outline" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary transition-colors" onClick={() => navigate(`/admin/setup/company/${company._id}`)}>
                                <Edit2 className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors" onClick={() => handleDelete(company._id)}>
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>

                    <h3 className="font-bold text-lg text-foreground font-heading line-clamp-1 mb-1">{company?.name}</h3>
                    
                    <div className="flex flex-col gap-2 mt-2 mb-4">
                        {company?.location && (
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <MapPin className="w-4 h-4 shrink-0 text-primary" />
                                <span className="line-clamp-1">{company.location}</span>
                            </div>
                        )}
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="w-4 h-4 shrink-0 text-primary" />
                            <span>Registered on {company?.createdAt?.split('T')[0]}</span>
                        </div>
                    </div>

                    <div className="mt-auto pt-4 border-t border-border">
                        <Button className="w-full rounded-xl" variant="secondary" onClick={() => navigate(`/admin/setup/company/${company._id}`)}>
                            Manage Company
                        </Button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default CompaniesTable
