import { createContext, useState } from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Header from "./Components/Header";
import Sidebar from "./Components/Sidebar";

const MyContext = createContext();

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <section className="main">
            <Header />
            <div className="contentMain flex">
              <div className={`overflow-hidden sidebarWrapper ${isSidebarOpen===true ? 'w-[16%]' : 'w-[0px] opacity-0'} transition-all`}>
                <Sidebar />
              </div>
              <div className={`contentRight py-4 px-5 ${isSidebarOpen===false ? 'w-[100%]' : 'w-[84%]'} transition-all`}>
                <Dashboard />
              </div>
            </div>
          </section>
        </>
      ),
    },
  ]);

  const values = {
    isSidebarOpen,
    setIsSidebarOpen
  };


  return (
    <>
      <MyContext.Provider value={values}>
        <RouterProvider router={router} />
      </MyContext.Provider>
    </>
  );
}

export default App;
export {MyContext};

