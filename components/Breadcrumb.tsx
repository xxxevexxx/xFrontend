"use client"

import { usePathname } from 'next/navigation';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbEllipsis,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

const BreadcrumbComponent = () => {
    const pathname = usePathname();
    const pathSegments = pathname.split('/').filter(segment => segment !== '');
    if (pathSegments.length <= 0) {
        return null;
    }
    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center gap-1">
                        <BreadcrumbEllipsis className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                        <DropdownMenuItem>Documentation</DropdownMenuItem>
                        <DropdownMenuItem>Themes</DropdownMenuItem>
                        <DropdownMenuItem>GitHub</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                {pathSegments.map((segment, index) => (
                    <><BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href={`/${pathSegments.slice(0, index + 1).join('/')}`}>
                            {segment.charAt(0).toUpperCase() + segment.slice(1)}
                        </BreadcrumbLink>
                    </BreadcrumbItem></>
                ))}
            </BreadcrumbList>
        </Breadcrumb>
    );
};

export default BreadcrumbComponent;