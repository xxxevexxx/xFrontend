import {svgLogo} from "@/components/SvgCollections";


const Footer = () => {
    return (
        <footer
            className="sticky z-50 w-full border-t border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-10 gap-2 max-w-screen-1xl items-center justify-center p-3 sm:p-6">
                <div className="flex items-center h-10 gap-2">
                    <a className="font-bold text-sm" href="/">X Ξ V Ξ X</a>
                    <span className="text-sm">©</span>
                    <span className="text-sm">Copyright 2017 – 2024</span>
                    <a className="font-bold text-sm" href="https://t.me/xxxevexxx">Yoriy</a>
                    <div className="h-4 w-4">{svgLogo()}</div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;