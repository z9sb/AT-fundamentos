import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

import Home from '../screens/AT/index.jsx'
import Produto from "../screens/AT/Produtos/Produtos.jsx";

const router = createBrowserRouter([

    {
        path: '/',
        element: <Home />
    },
    {
        path: '/Produto',
        element: <Produto />
    }

]);

export default function routes() {
    return (
        <RouterProvider router={router} />
    );
};