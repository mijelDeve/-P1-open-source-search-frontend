import { ReactNode } from "react";
import Navbar from "../components/Navbar/Navbar";

interface MainLayoutProps {
    children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    return (
        <div className="bg-black w-full h-screen">
            <Navbar />
            { children}
        </div>
    )
}

export default MainLayout
