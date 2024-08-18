import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { HowItems, Links, MenuItems, TestAddress, WhyItems } from "./const";
import { DemoContainer } from "./components";
import { useRandomAddress } from "./hooks/useRandomAddress";
import { Background, Footer } from "./layout";
import { motion } from "framer-motion";
import {
  Input,
  ColorfulAddress,
  AddressPattern,
  MainButton,
  WalletIcon,
  Checkbox,
} from "./components";
import "./App.scss";
import TextCard from "./components/TextCard";
import { scrollIntoViewById } from "./lib/utils";
import { TwitterCard } from "./components/TwitterCard";

const App: React.FC = () => {
  const location = useLocation();
  const [address, setAddress] = useState<string>(TestAddress[0]);
  const [mode, setMode] = useState<"simple" | "normal">("normal");
  const { addresses, generate } = useRandomAddress();
  const [isRunning, setIsRunning] = useState<boolean>(true); // 跟踪定时器是否正在运行
  const intervalIdRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning) {
      intervalIdRef.current = setInterval(() => {
        generate();
      }, 5000); // 固定间隔时间为 5000 毫秒
    } else if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current); // 停止定时器
      intervalIdRef.current = null;
    }

    // 清理函数，在组件卸载时清除定时器
    return () => clearInterval(intervalIdRef.current!);
  }, [isRunning, generate]);

  const toggleInterval = () => {
    setIsRunning((prev) => !prev); // 切换定时器的运行状态
  };

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
        <header className="sticky top-0 z-50 h-fit py-4 px-8 backdrop-blur-sm bg-white/5 flex justify-between items-center shadow-sm">
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

              <div className="h-fit max-w-[500px] w-full mt-10 md:mt-0 flex flex-col gap-4 items-center justify-center p-4 sm:p-6 bg-gray-300/10 backdrop-blur-sm rounded-lg shadow-sm font-bold text-gray-100">
                <div className="w-full flex justify-start items-center space-x-2">
                  <Checkbox
                    id="mode"
                    value={"simple"}
                    onCheckedChange={(v) => {
                      setMode(v ? "simple" : "normal");
                    }}
                  />
                  <label
                    htmlFor="mode"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Simple View
                  </label>
                  <Checkbox
                    id="running"
                    defaultChecked={true}
                    className="mr-32"
                    onCheckedChange={toggleInterval}
                  />
                  <label
                    htmlFor="running"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Auto Refresh
                  </label>
                </div>
                {addresses.map((it, index) => (
                  <motion.div
                    key={it}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.2,
                    }}
                    className="flex justify-center w-full overflow-hidden"
                  >
                    <ColorfulAddress
                      key={it}
                      address={it}
                      simple={mode === "simple"}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* DEMO */}
          <div id="try" className="my-6 py-16 sm:py-36">
            <p className="text-white text-2xl text-center pb-16">Try!</p>
            <div className="min-w-80 w-full flex flex-col gap-4 text-gray-100 font-bold bg-slate-50/10 p-4 sm:p-6 rounded-md">
              <Input
                className="w-full"
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
