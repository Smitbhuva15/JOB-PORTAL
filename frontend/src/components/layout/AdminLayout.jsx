import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { adminheader } from '@/lib/config';
import { ChevronLeft, ChevronRight, Briefcase, PlusCircle, Users, LayoutDashboard } from 'lucide-react';
import { Button } from '../ui/button';

// Helper to map links to icons
const getIconForLink = (title) => {
    switch(title.toLowerCase()) {
        case 'companies': return <Briefcase className="w-5 h-5" />;
        case 'add company': return <PlusCircle className="w-5 h-5" />;
        case 'jobs': return <LayoutDashboard className="w-5 h-5" />;
        case 'add jobs': return <PlusCircle className="w-5 h-5" />;
        default: return <Users className="w-5 h-5" />;
    }
};

const AdminLayout = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const location = useLocation();

    return (
        <div className="flex min-h-[calc(100vh-4rem)] bg-muted/10">
            {/* Sidebar */}
            <aside 
                className={`transition-all duration-300 ease-in-out border-r border-border bg-card hidden md:block relative
                    ${isCollapsed ? 'w-20' : 'w-64'}
                `}
            >
                <div className="p-4 flex flex-col h-full">
                    <Button 
                        variant="ghost" 
                        size="icon"
                        className="absolute -right-4 top-6 rounded-full border border-border bg-background shadow-sm hover:bg-accent z-10"
                        onClick={() => setIsCollapsed(!isCollapsed)}
                    >
                        {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
                    </Button>

                    <nav className="space-y-2 mt-8 flex-1">
                        {adminheader.map((item, index) => {
                            const isActive = location.pathname === item.link;
                            return (
                                <Link 
                                    key={index} 
                                    to={item.link}
                                    className={`flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors font-medium text-sm
                                        ${isActive 
                                            ? 'bg-primary/10 text-primary' 
                                            : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                                        }
                                    `}
                                    title={isCollapsed ? item.title : undefined}
                                >
                                    <span className="shrink-0">{getIconForLink(item.title)}</span>
                                    {!isCollapsed && <span className="truncate">{item.title}</span>}
                                </Link>
                            )
                        })}
                    </nav>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 p-6 md:p-8 overflow-y-auto w-full">
                <div className="max-w-7xl mx-auto animate-in fade-in duration-500">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
