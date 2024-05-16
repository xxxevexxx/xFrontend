"use client"

import * as React from "react";
import {useTheme} from "next-themes";
import {Moon, Sun} from "lucide-react";
import {Button} from "@/components/ui/button";
import {DropdownMenu, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";

const ThemeSwicher = () => {
    const { theme, setTheme } = useTheme()

    const handleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light')
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button className="border-0 w-8 h-8 bg-transparent" onClick={() => handleTheme()} variant="outline" size="icon">
                    <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                </Button>
            </DropdownMenuTrigger>
        </DropdownMenu>
    );
};

export default ThemeSwicher;