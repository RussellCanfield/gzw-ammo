import { lazy, Suspense } from 'react';
import AmmoSkeletonLoader from './components/AmmoSkeletonLoader';

const App = lazy(() => {
    if (import.meta.env.MODE === 'production') {
        return import('ammo_analyzer/App');
    }
    return import('./App');
});

export default function Bootstrap() {
    return (
        <Suspense fallback={<AmmoSkeletonLoader />}>
            <App />
        </Suspense>
    )
}