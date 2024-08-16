import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { MenuItems, TestAddress } from "./const";
import { DemoContainer } from "./components/DemoContainer";
import { useRandomAddress } from "./hooks/useRandomAddress";
import { Background, Footer } from "./layout";
import {
  Input,
  ColorfulAddress,
  AddressColorBar,
  AddressPattern,
} from "./components";
import "./App.scss";

const App: React.FC = () => {
  const location = useLocation();
  const [address, setAddress] = useState<string>(TestAddress[0]);
  const { addresses, generate } = useRandomAddress();

  useEffect(() => {
    let interval = setInterval(() => {
      generate();
    }, 5000);

    return () => clearInterval(interval);
  }, [generate]);

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

      <div className="absolute inset-0 overflow-auto">
        <header className="sticky top-0 z-50 h-fit py-4 px-8 backdrop-blur-sm bg-white/5 flex justify-between items-center shadow-sm">
          <h1 className="flex text-lg font-bold">
            <img src="/eth-shenzhen.svg" alt="ETH ShenZhen" />
          </h1>

          <ul className="flex-nowrap gap-4 sm:hidden md:flex">
            {MenuItems.map((it) => (
              <NavLink key={it.id} to={`/#${it.id}`}>
                <li className="text-white">{it.label}</li>
              </NavLink>
            ))}
          </ul>
        </header>

        <main className="max-w-screen-lg mx-auto py-6">
          <div className="flex items-center justify-between my-32 ">
            <div className="flex flex-col gap-4">
              <h1 className="font-bold text-4xl bg-gradient-to-r from-cyan-500 to-fuchsia-500 bg-clip-text text-transparent">
                ETH Colored Address Protocol
              </h1>
              <h2 className="font-bold text-2xl bg-gradient-to-r from-cyan-500 to-fuchsia-500 bg-clip-text text-transparent">
                以太坊有色地址协议
              </h2>
              <p></p>
            </div>

            <div className="h-fit w-[450px] flex flex-col gap-4 items-center justify-center p-6 bg-gray-300/10 backdrop-blur-sm rounded-lg shadow-sm font-bold">
              {addresses.map((it) => (
                <ColorfulAddress key={it} address={it} />
              ))}
            </div>
          </div>

          {/* DEMO */}
          <div className="flex flex-col gap-4 -mt-10 text-gray-100 font-bold">
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

        <Footer />
      </div>
    </>
  );
};

export default App;
