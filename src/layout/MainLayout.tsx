import { ReactNode } from "react";
import Navbar from "../components/Navbar/Navbar";
import { Toaster } from "../components/ui/toaster";

interface MainLayoutProps {
    children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    return (
        <div className="bg-oshblack w-full">
            <Toaster />
            <Navbar />
            { children}
        </div>
    )
}

export default MainLayout
