import React from "react";
import ReactDOM from "react-dom/client";

// Import Application components
import App from "./Components/App/App.tsx";
import Homepage from "./Components/HomepageComponents/Homepage/Homepage.tsx";
import LoginForm from "./Components/UserComponents/Login/Login.tsx";
import SignUp from "./Components/UserComponents/SignUp/SignUp.tsx";
import Profile from "./Components/UserComponents/Profile/Profile.tsx";
import Admin from "./Components/AdminComponents/Admin.tsx";
import Favoris from "./Components/UserComponents/Favoris/Favoris.tsx";
import HeaderUser from "./Components/UserComponents/HeaderUser/HeaderUser.tsx";
import SpotsList from "./Components/SpotsList/SpotsList.tsx";
import Spot from "./Components/Spot/Spot.tsx";
import AboutUs from "./Components/AboutUs/AboutUs.tsx";

// Import of the semantic-ui-css library to use the semantic-ui components
import "semantic-ui-css/semantic.min.css";

// Import of react-router-dom components to create our Router
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const spots = [
  {
    name: "Un Spot",
    description:
      "Une magnifique plage urbaine à Marseille offrant une vue imprenable sur la mer Méditerranée.",
    image:
      "https://cdn-s-www.ledauphine.com/images/0B4C75D1-BE1B-47ED-9CDF-B171D74277BD/NW_raw/le-snowpark-de-vars-s-etale-sur-plus-de-1-000-metres-de-denivele-c-est-ce-qui-fait-sa-singularite-et-sa-notoriete-qui-depassent-aujourd-hui-les-frontieres-europeennes-1390340766.jpg",
  },
  {
    name: "Un deuxième Spot",
    description:
      "Îlot rocheux en Normandie, connu pour son abbaye médiévale perchée au sommet.",
    image:
      "https://static.savoie-mont-blanc.com/wp-content/uploads/external/e132d5d4d725e4a69beabf7bcc818ecf-3800129-1745x1163.jpg",
  },
  {
    name: "ET ATTENTION... Un troisième Spot",
    description:
      "L'un des châteaux les plus reconnaissables de la Loire grâce à son architecture française de la Renaissance.",
    image:
      "https://www.laclusaz.com/app/uploads/apidae/7138618-diaporama-890x500.jpg",
  },
];

const router = createBrowserRouter([
  // 1. Adding the routes to application pages (Homepage, SpotsList, SpotDetails, etc.)
  {
    path: "/",
    element: <App />,
    // setting of children road of the principal road
    children: [
      {
        path: "",
        element: <Homepage />,
      },
      {
        path: "spotslist",
        element: <SpotsList />,
      },
      {
        path: "spot/:id",
        element: <Spot spotId={""} />,
      },
      {
        path: "legal-notice",
        //element: <Admin />,
      },
      {
        path: "contact",
        //element: <Admin />,
      },
    ],
  },
  // 2. Adding routes on login, signup
  {
    path: "/login",
    element: <LoginForm />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },

  // 3. Adding routes on user page
  {
    path: "/",
    element: <HeaderUser />,
    // setting of children road of the principal road
    children: [
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "favoris",
        element: <Favoris spots={spots} />,
      },
    ],
  },

  // 4. Adding routes on admin page
  {
    path: "/admin",
    element: <Admin />,
  },

  {
    path: "our-team",
    element: <AboutUs />,
  },
]);

// X. Rending of the Router
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* ici on ne veut plus rendre simplement le composant App, mais notre router qui contient la logique de routage => c'est lui qui va décider en fonction de l'URL, quel composant rendre */}
    <RouterProvider router={router} />
  </React.StrictMode>
);
