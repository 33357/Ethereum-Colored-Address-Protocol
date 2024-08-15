import React, { useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { MenuItems } from "./const";
import "./App.scss";
import Background from "./layout/Background";
import { ConnectKitButton } from "connectkit";

const App: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  return (
    <>
      <Background />

      <div className="absolute inset-0">
        <header className="sticky top-0 h-fit py-6 px-8 backdrop-blur-sm bg-white/30 flex justify-between items-center shadow-sm">
          <h1 className="text-lg font-bold">ETH Colored Address Protocol</h1>

          <ul className="flex flex-nowrap gap-4">
            {MenuItems.map((it) => (
              <NavLink to={`/#${it.id}`}>
                <li>{it.label}</li>
              </NavLink>
            ))}
          </ul>
        </header>

        <main className="max-w-screen-md mx-auto py-6">
          <ConnectKitButton />
          <div id="why" className="h-60">
            why
          </div>

          <div id="how" className="h-60">
            how
          </div>

          <div id="involved" className="h-60">
            get involved
          </div>

          <div id="faq" className="h-60">
            faq
          </div>

          <div id="testimonials" className="h-60">
            testimonials
          </div>

          <div id="support" className="h-60">
            support
          </div>
        </main>

        <footer className="text-center py-4 border-t">
          EthShenzhen@{new Date().getFullYear()}
        </footer>
      </div>
    </>
  );
};

export default App;
