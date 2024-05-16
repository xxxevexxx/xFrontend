import {Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger} from "@/components/ui/sheet";
import {svgMenu} from "@/components/SvgCollections";
import React from "react";

const burgerBlock = () => {
    return (
        <div className="lg:hidden flex">
            <Sheet>
                <SheetTrigger>
                    {svgMenu()}
                </SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle className="text-3xl">⌘ Меню</SheetTitle>
                        <SheetDescription className="flex flex-col gap-2 items-start ml-2">
                            <a className="text-2xl transition-colors hover:text-foreground/90 text-foreground/60"
                               href="/">...</a>
                            <a className="text-2xl transition-colors hover:text-foreground/90 text-foreground/60"
                               href="/">...</a>
                            <a className="text-2xl transition-colors hover:text-foreground/90 text-foreground/60"
                               href="/">...</a>
                            <a className="text-2xl transition-colors hover:text-foreground/90 text-foreground/60"
                               href="/">...</a>
                            <a className="text-2xl transition-colors hover:text-foreground/90 text-foreground/60"
                               href="/">...</a>
                        </SheetDescription>
                    </SheetHeader>
                </SheetContent>
            </Sheet>
        </div>
    )
}

export default burgerBlock;