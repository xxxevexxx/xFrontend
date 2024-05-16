'use client';

import { svgEn, svgRu } from '@/components/SvgCollections';
import { useRouter, usePathname } from 'next/navigation';
import { useCallback } from 'react';

const LanguageSwitcher = () => {
    const router = useRouter();
    const pathname = usePathname();
    const handleLocaleChange = useCallback(
        (newLocale: string) => {
            const newPath = pathname.replace(/\/[a-z]{2}($|\/)/, `/${newLocale}$1`);
            router.push(newPath);
        },
        [pathname, router]
    );
    return (
        <div className="flex">
            <div
                onClick={() => handleLocaleChange('ru')}
                className="inline-flex gap-1 items-center justify-center rounded-md hover:bg-accent hover:text-accent-foreground cursor-pointer h-8 py-2 px-1 filter grayscale hover:filter-none"
            >
                <span className="font-bold">RU</span>
                <div className="w-7 h-7">{svgRu()}</div>
            </div>
            <div
                onClick={() => handleLocaleChange('en')}
                className="inline-flex gap-1 items-center justify-center rounded-md hover:bg-accent hover:text-accent-foreground cursor-pointer h-8 py-2 px-1 filter grayscale hover:filter-none"
            >
                <span className="font-bold">EN</span>
                <div className="w-7 h-7">{svgEn()}</div>
      </div>
    </div>
  );
};

export default LanguageSwitcher;
