import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/navigation/Sidebar';

export const MainLayout: React.FC = () => {
    return (
        <div className="flex w-full h-screen bg-gray-50 overflow-hidden">
            <Sidebar />
            <div className="flex-1 h-full overflow-hidden">
                <Outlet />
            </div>
        </div>
    );
};
