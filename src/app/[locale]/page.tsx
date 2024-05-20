import { svgLogo, svgTelegram, svgVkontakte } from "@/components/SvgCollections";
import React from "react";


const HomePage = () => {
    return (
        <div className="container relative">
            <section className="mx-auto flex max-w-[1240px] flex-col items-center">
                <div className="flex items-center gap-3 w-[300px]">
                    <div className="left-0 h-[250px]">{svgTelegram()}</div>
                    <div className="w-full border-t-[0.5px] top-[35px]"></div>
                    <div className="h-17">{svgLogo()}</div>
                    <div className="w-full border-t-[0.5px] top-[35px]"></div>
                    <div className="right-0 h-[300px]">{svgVkontakte()}</div>
                </div>
            </section>
        </div>
    )
}

export default HomePage;