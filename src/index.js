import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate
} from "react-router-dom";

import Root from './routes/Root'
import ErrorPage from './error-page'
const Parametric = React.lazy(() => import('./routes/shells/Parametric'))
const ParametricMesh = React.lazy(() => import('./routes/shells/ParametricMesh'))
const Raup = React.lazy(() => import('./routes/shells/Raup'))
const PlanarBryozoan = React.lazy(() => import('./routes/branches/PlanarBryozoan'))
const Bryozoan = React.lazy(() => import('./routes/branches/Bryozoan'))
const About = React.lazy(() => import('./routes/About'))

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Navigate to="/parametricMesh" replace /> },
      {
        path: "parametric",
        element: <Parametric />
      },
      {
        path: "parametricMesh",
        element: <ParametricMesh />
      },
      {
        path: "raup",
        element: <Raup />
      },
      {
        path: "about",
        element: <About />
      },
      {
        path: "planarBryozoan",
        element: <PlanarBryozoan />
      },
      {
        path: "Bryozoan",
        element: <Bryozoan />
      }
    ]
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
