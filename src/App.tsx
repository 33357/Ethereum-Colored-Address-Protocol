import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { MenuItems, TestAddress } from "./const";
import { DemoContainer } from "./components/DemoContainer";
import { useRandomAddress } from "./hooks/useRandomAddress";
import { Background, Footer } from "./layout";
import { motion } from "framer-motion";
import {
  Input,
  ColorfulAddress,
  AddressColorBar,
  AddressPattern,
  MainButton,
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
          <div className="flex flex-col items-center justify-center h-dvh -mt-[88px]">
            <div className="w-full flex justify-between items-center">
              <div className="flex flex-col gap-4">
                <h1 className="font-bold text-4xl bg-gradient-to-r from-cyan-500 to-fuchsia-500 bg-clip-text text-transparent">
                  ETH Colored Address Protocol
                </h1>
                <h2 className="font-bold text-2xl bg-gradient-to-r from-cyan-500 to-fuchsia-500 bg-clip-text text-transparent">
                  以太坊有色地址协议
                </h2>
                <p className="text-gray-100 max-w-96">
                  该方案旨为钱包地址增加视觉校验，通过地址哈希值计算唯一颜色组合，减少输入地址时的校验负担，同时防范交互时黑客钓鱼行为的潜在风险。
                </p>
                <div className="mt-8">
                  <MainButton />
                </div>
              </div>

              <div className="h-fit w-[450px] flex flex-col gap-4 items-center justify-center p-6 bg-gray-300/10 backdrop-blur-sm rounded-lg shadow-sm font-bold text-gray-100">
                {addresses.map((it, index) => (
                  <motion.div
                    key={it}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.2,
                    }}
                  >
                    <ColorfulAddress key={it} address={it} />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* DEMO */}
          <div className="flex flex-col gap-4 text-gray-100 font-bold">
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

          <div id="why" className="">
            <p className="text-white text-xl">Why?</p>
          </div>

          <div id="how" className="">
            <p className="text-white text-xl">How?</p>
          </div>

          <div id="involved" className="">
            <p className="text-white text-xl">Get Involved</p>
          </div>

          <div id="faq" className="">
            <p className="text-white text-xl">FAQ</p>
          </div>

          <div id="testimonials" className="">
            <p className="text-white text-xl">Testimonials</p>
          </div>

          <div id="support" className="">
            <p className="text-white text-xl">Support</p>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default App;
