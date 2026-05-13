import { createBrowserRouter } from 'react-router-dom';
import Protected from './components/Protected';
import Home from './features/blueprint/pages/Home';
import BlueprintResult from './features/blueprint/pages/BlueprintResult';

export const router = createBrowserRouter([
    // ... Login and Register routes stay the same
    {
        path: '/',
        element: <Protected><Home /></Protected>
    },
    {
        path: '/blueprint/:id',
        element: <Protected><BlueprintResult /></Protected>
    }
]);