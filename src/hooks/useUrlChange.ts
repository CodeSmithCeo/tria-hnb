import { useEffect, useState } from 'react';

export type UrlData = {
    path: string;
    pathPartials: string[];
}

const useUrlChange = (): UrlData => {
    const [urlData, setUrlData] = useState<UrlData>({
        path: window.location.pathname,
        pathPartials: window.location.pathname.split('/').filter(Boolean),
    });

    useEffect(() => {
        const handleUrlChange = () => {
            const newPath = window.location.pathname;
            setUrlData({
                path: newPath,
                // keep the result from having faulty values from '//'
                pathPartials: newPath.split('/').filter(Boolean),
            });
        };

        window.addEventListener('popstate', handleUrlChange);
        window.addEventListener('pushstate', handleUrlChange);
        window.addEventListener('replacestate', handleUrlChange);

        return () => {
            window.removeEventListener('popstate', handleUrlChange);
            window.removeEventListener('pushstate', handleUrlChange);
            window.removeEventListener('replacestate', handleUrlChange);
        };
    }, []);

    return urlData;
};

export default useUrlChange;