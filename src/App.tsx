import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { MenuItems, TestAddress } from "./const";
import { ColorfulAddress } from "./components/ColorfulAddress";
import { AddressColorBar } from "./components/AddressColorBar";
import { AddressPattern } from "./components/BackgroundAddress";
import Background from "./layout/Background";
import { Input } from "./components/Input";
import { DemoContainer } from "./components/DemoContainer";
import "./App.scss";

const App: React.FC = () => {
  const location = useLocation();
  const [address, setAddress] = useState<string>(TestAddress[0]);

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
              <NavLink key={it.id} to={`/#${it.id}`}>
                <li>{it.label}</li>
              </NavLink>
            ))}
          </ul>
        </header>

        <main className="max-w-screen-md mx-auto py-6">
          <h1 className="font-bold text-5xl text-center bg-gradient-to-r from-cyan-500 to-fuchsia-500 bg-clip-text text-transparent">
            ETH Colored Address Protocol
          </h1>
          <h2>这里是介绍内容。</h2>

          {/* DEMO */}
          <div className="flex flex-col gap-4">
            <Input
              value={address}
              placeholder="ETH Address"
              onChange={(e) => setAddress(e.target.value)}
            />
            <DemoContainer>
              <AddressColorBar address={address} />
            </DemoContainer>
            <DemoContainer>
              <AddressPattern address={address} />
            </DemoContainer>
            <DemoContainer>
              <ColorfulAddress address={address} />
            </DemoContainer>
          </div>

          <div id="why" className="h-60">
            why
          </div>

          <div id="how" className="h-60">
            <span>how</span>
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
