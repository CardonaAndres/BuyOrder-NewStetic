import { useEffect, useState } from "react";
import { router } from "../configs/config";
import { Building2Icon, HelpCircle, ListOrdered, Star } from "lucide-react";

export const useNavHook = ({ path }: { path: string }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const profileMenuItems = [
        { name: 'Ayuda', icon: HelpCircle, action: () => {} },
    ];

    const navigationItems = [
        { 
            name: 'OCN', 
            icon: ListOrdered, 
            href: router.npo, 
            active: router.npo === path 
        },
        { 
            name: 'Almacén', 
            icon: Building2Icon, 
            href: router.npo, 
            active: false // router.npo === path 
        },
        { 
            name: 'Calificación', 
            icon: Star, 
            href: router.npo, 
            active: false // router.npo === path 
        },
    ];

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const handleMouseMove = (e: { clientX: number, clientY: number }) => {
        setMousePosition({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return {
        isScrolled,
        mousePosition,
        navigationItems,
        profileMenuItems
    }
}
