import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { HowItems, Links, MenuItems, TestAddress, WhyItems } from "./const";
import { DemoContainer, DeviceExample, ExampleCard } from "./components";
import { Background, Footer } from "./layout";
import { scrollIntoViewById } from "./lib/utils";
import {
  Input,
  ColorfulAddress,
  AddressPattern,
  MainButton,
  WalletIcon,
  TwitterCard,
  TextCard,
} from "./components";
import "./App.scss";

const App: React.FC = () => {
  const location = useLocation();
  const [address, setAddress] = useState<string>(TestAddress);

  useEffect(() => {
    if (location.hash) {
      scrollIntoViewById(location.hash);
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
        <header className="sticky top-0 z-50 h-fit py-4 px-4 sm:px-8 backdrop-blur-sm bg-white/5 flex justify-between items-center shadow-sm">
          <Link to={"/"}>
            <h1 className="flex items-center text-white text-sm sm:text-lg font-bold">
              <img
                src="/eth-shenzhen.svg"
                alt="ETH ShenZhen"
                className="w-[92px] h-[28px]"
              />
              <span className="ml-4">ETH Colored Address Protocol</span>
            </h1>
          </Link>

          <ul className="flex-nowrap gap-8 hidden md:flex">
            {MenuItems.map((it) => (
              <NavLink key={it.id} to={`/#${it.id}`}>
                <li className="text-white">{it.label}</li>
              </NavLink>
            ))}
          </ul>
        </header>

        <main className="max-w-screen-xl mx-auto p-4 sm:p-6">
          <div className="w-full flex flex-col items-center justify-center h-dvh mt-0 sm:-mt-[88px]">
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
                <div className="mt-8">{MainButton("#try")}</div>
              </div>

              <ExampleCard />
            </div>
          </div>

          <DeviceExample />

          {/* DEMO */}
          <div id="try" className="my-6 py-16 sm:py-36">
            <p className="text-white text-2xl text-center pb-16">Try!</p>
            <div className="min-w-80 w-full flex flex-col gap-4 text-gray-100 font-bold bg-slate-50/10 p-4 sm:p-6 rounded-md">
              <Input
                className="w-full text-xs sm:text-base"
                value={address}
                placeholder="ETH Address"
                icon={<WalletIcon />}
                onChange={(e) => setAddress(e.target.value)}
              />

              <DemoContainer>
                <AddressPattern address={address} />
              </DemoContainer>
              <DemoContainer>
                <ColorfulAddress address={address} simple={true} />
              </DemoContainer>
              <DemoContainer>
                <ColorfulAddress address={address} />
              </DemoContainer>
            </div>
          </div>

          <div id="why" className="my-6 py-12 sm:py-48">
            <p className="text-white text-2xl text-center">Why?</p>
            <div className="flex flex-col sm:flex-row justify-center gap-6 pt-16">
              {WhyItems.map((cardText, index) => (
                <TextCard
                  key={`why + ${index}`}
                  title={cardText.title}
                  content={cardText.content}
                />
              ))}
            </div>
          </div>

          <div id="how" className="my-6 py-12 sm:py-48">
            <p className="text-white text-2xl text-center">How?</p>
            <div className="flex flex-col sm:flex-row justify-center gap-6 pt-16">
              {HowItems.map((cardText, index) => (
                <TextCard
                  key={`why + ${index}`}
                  title={cardText.title}
                  content={cardText.content}
                />
              ))}
            </div>
          </div>

          <div id="support" className="my-6">
            <p className="text-white text-2xl text-center">Support</p>
            <div className="flex flex-col justify-between gap-4 items-center my-16 px-4 sm:px-20">
              <Link to={Links.Github} target="_blank">
                <img
                  src={Links.GithubCover}
                  className="w-[500px] rounded-md"
                  alt="Github Card"
                />
              </Link>

              <TwitterCard />
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default App;
