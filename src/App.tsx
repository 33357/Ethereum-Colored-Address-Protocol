import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
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
  WalletIcon,
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
    } else {
      document
        .querySelector("#container")
        ?.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location]);

  return (
    <>
      <Background />

      <div id="container" className="absolute inset-0 overflow-auto">
        <header className="sticky top-0 z-50 h-fit py-4 px-8 backdrop-blur-sm bg-white/5 flex justify-between items-center shadow-sm">
          <Link to={"/"}>
            <h1 className="flex items-center text-white text-lg font-bold">
              <img
                src="/eth-shenzhen.svg"
                alt="ETH ShenZhen"
                className="w-[92px] h-[28px]"
              />
              <span className="ml-4">ETH Colored Address Protocol</span>
            </h1>
          </Link>

          <ul className="flex-nowrap gap-4 hidden md:flex">
            {MenuItems.map((it) => (
              <NavLink key={it.id} to={`/#${it.id}`}>
                <li className="text-white">{it.label}</li>
              </NavLink>
            ))}
          </ul>
        </header>

        <main className="max-w-screen-xl mx-auto p-6">
          <div className="w-full flex flex-col items-center justify-center h-dvh -mt-[88px]">
            <div className="w-full flex flex-col md:flex-row justify-between items-center">
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

              <div className="h-fit max-w-[450px] w-full mt-10 md:mt-0 flex flex-col gap-4 items-center justify-center p-6 bg-gray-300/10 backdrop-blur-sm rounded-lg shadow-sm font-bold text-gray-100">
                {addresses.map((it, index) => (
                  <motion.div
                    key={it}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.2,
                    }}
                    className="w-full overflow-hidden"
                  >
                    <ColorfulAddress key={it} address={it} />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* DEMO */}
          <div className="flex">
            <div className="min-w-80 w-full flex flex-col gap-4 text-gray-100 font-bold bg-slate-50/10 p-6 rounded-md">
              <Input
                className="w-full"
                value={address}
                placeholder="ETH Address"
                icon={<WalletIcon />}
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
          </div>

          <div id="why" className="my-6">
            <p className="text-white text-2xl text-center">Why?</p>
          </div>

          <div id="how" className="my-6">
            <p className="text-white text-2xl text-center">How?</p>
          </div>

          <div id="involved" className="my-6">
            <p className="text-white text-2xl text-center">Get Involved</p>
          </div>

          <div id="faq" className="my-6">
            <p className="text-white text-2xl text-center">FAQ</p>
          </div>

          <div id="testimonials" className="my-6">
            <p className="text-white text-2xl text-center">Testimonials</p>
          </div>

          <div id="support" className="my-6">
            <p className="text-white text-2xl text-center">Support</p>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default App;
