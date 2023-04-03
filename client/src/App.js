import React from "react";

import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

// Layouts
import RootLayout from "./layouts/RootLayout";
import HomeLayout from "./layouts/HomeLayout";
import HelpLayout from "./layouts/HelpLayout";

// Pages
import Groceries from "./pages/Groceries";
import Kitchen from "./pages/Kitchen";
import Essentials from "./pages/Essentials";
import Recipes from "./pages/Recipes";
import Faq from "./pages/Faq";
import Contact from "./pages/Contact";
import Sales from "./pages/Sales";
import EssentialDetails from "./pages/EssentialDetails";
import GroceryDetails from "./pages/GroceryDetails";
import KitchenDetails from "./pages/KitchenDetails";
import SalesDetails from "./pages/SaleDetails";
import RecipeDetails from "./pages/RecipeDetails";

// Components
import Footer from "./components/Footer";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route path="" element={<HomeLayout />} />
      <Route path="recipes" element={<Recipes />} />
      <Route path="groceries" element={<Groceries />} />
      <Route path="kitchen" element={<Kitchen />} />
      <Route path="sales" element={<Sales />} />
      <Route path="essentials" element={<Essentials />} />
      <Route path="help" element={<HelpLayout />}>
        <Route path="faq" element={<Faq />} />
        <Route path="contact" element={<Contact />} />
    </Route>
      <Route path="essentialdetails/:id" element={<EssentialDetails />} />
      <Route path="grocerydetails/:id" element={<GroceryDetails />} />
      <Route path="kitchendetails/:id" element={<KitchenDetails />} />
      <Route path="recipedetails/:id" element={<RecipeDetails />} />
      <Route path="saledetails/:id" element={<SalesDetails />} />
    </Route>
  )
);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Footer />
    </>
  );
}

export default App;
