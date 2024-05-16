import {withAuth} from 'next-auth/middleware';
import createIntlMiddleware from 'next-intl/middleware';
import {NextRequest} from 'next/server';

let locale = "ru"
const locales = ['en', 'ru'];
const publicPages = ['/', '/auth', '/vksorry', '/vksorry', '/info'];

const intlMiddleware = createIntlMiddleware({
    locales,
    defaultLocale: 'ru'
});

const authMiddleware = withAuth(
    function onSuccess(req) {
        const [, locale, ...fragments] = req.nextUrl.pathname.split("/")
        return intlMiddleware(req);
    },
    {
        callbacks: {
            authorized: ({token}) => token != null
        },
        pages: {
            signIn: `${locale}/auth`
        }
    }
);

export default function middleware(req: NextRequest) {
    const publicPathnameRegex = RegExp(
        `^(/(${locales.join('|')}))?(${publicPages
            .flatMap((p) => (p === '/' ? ['', '/'] : p))
            .join('|')})/?$`,
        'i'
    );
    const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname);
    if (isPublicPage) {
        return intlMiddleware(req);
    } else {
        return (authMiddleware as any)(req);
    }
}

export const config = {
    matcher: ['/((?!api|_next|.*\\..*).*)']
};