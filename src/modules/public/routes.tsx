import About from "./views/About";
import Quotation from "./views/Quotation";
import Contact from "./views/Contact";
import Home from "./views/Home";
import Notfound from "./views/Notfound";
import Privacy from "./views/Privacy";
import Products from "./views/Products";
import SingleProduct from "./views/SingleProduct";
import Terms from "./views/Terms";

const routes = [
  {
    name: "Home",
    layout: "/",
    path: "home",
    icon: "",
    component: <Home />,
  },
  {
    name: "Single Products",
    layout: "/",
    path: "products/:productId",
    icon: "",
    component: <SingleProduct />,
  },
  {
    name: "Products",
    layout: "/",
    path: "products",
    icon: "",
    component: <Products />,
  },
  {
    name: "Quotation",
    layout: "/",
    path: "quotation",
    icon: "",
    component: <Quotation />,
  },
  {
    name: "About",
    layout: "/",
    path: "about",
    icon: "",
    component: <About />,
  },
  {
    name: "Privacy",
    layout: "/",
    path: "privacy",
    icon: "",
    component: <Privacy />,
  },
  {
    name: "Terms",
    layout: "/",
    path: "terms",
    icon: "",
    component: <Terms />,
  },
  {
    name: "Contact",
    layout: "/",
    path: "contact",
    icon: "",
    component: <Contact />,
  },
  {
    name: "Notfound",
    layout: "/",
    path: "notfound",
    icon: "",
    component: <Notfound />,
  },
];

export default routes;
