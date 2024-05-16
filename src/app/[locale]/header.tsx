import React from "react";
import ThemeSwicher from "@/components/ThemeSwicher";
import { svgLogo } from "@/components/SvgCollections";
import LanguageSwitcher from "@/src/app/components/Header/LanguageSwicher";
import BurgerBlock from "@/src/app/components/Header/BurgerBlock";
import DropDownBlock from "@/src/app/components/Header/DropDownBlock";
import NavigationBlock from "@/src/app/components/Header/NavigationBlock";



const Header = () => {
    return (
        <header
            className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-10 max-w-screen-1xl items-center p-3 sm:p-6">
                <div className="mr-4 flex">
                    <a className="mr-6 flex items-center space-x-2" href="/">
                        <div className="h-6 w-6">{svgLogo()}</div>
                        <span className="font-bold text-sm">X Ξ V Ξ X</span>
                    </a>
                    <NavigationBlock/>
                </div>
                <div className="flex flex-1 items-center space-x-2 justify-end">
                    <nav className="flex items-center">
                        <LanguageSwitcher/>
                        <ThemeSwicher/>
                        <DropDownBlock/>
                        <BurgerBlock/>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;