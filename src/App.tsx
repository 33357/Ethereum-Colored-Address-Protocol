import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { MenuItems } from "./const";
import "./App.scss";
import Background from "./layout/Background";
import { sha256 } from "js-sha256";
// import { Wallet } from "ethers";

const App: React.FC = () => {
  const location = useLocation();
  const [textAddress, setTextAddress] = useState<string>('');
  const [coloredAddress, setColoredAddress] = useState<JSX.Element | null>(null);

  const generateRandomAddress = () => {
    // const randomAddress = Wallet.createRandom().address;
    // setTextAddress(randomAddress);
    // return randomAddress.slice(2, 42);
    return textAddress.slice(2, 42);
  };

  const calculateColors = (address: string): string[] => {
    const hash = sha256(address);
    const firstThirtyHexChars = hash.slice(0, 30);
    const colors = [];

    for (let i = 0; i < 10; i++) {
      const segment = firstThirtyHexChars.slice(i * 3, i * 3 + 3);
      const r = parseInt(segment[0], 16) * 10 + 50;
      const g = parseInt(segment[1], 16) * 10 + 50;
      const b = parseInt(segment[2], 16) * 10 + 50;
      colors.push(`rgb(${r}, ${g}, ${b})`);
    }

    return colors;
  };

  const generateColoredAddress = (address: string): JSX.Element => {
    const colors = calculateColors(address);
    return (
        <div>
          <span>0x</span>
          {colors.slice(0, 5).map((color, index) => (
              <span key={index} style={{ color }}>
            {address[index]}
          </span>
          ))}
          {address.slice(5, 35)}
          {colors.slice(5, 10).map((color, index) => (
              <span key={index + 35} style={{ color }}>
            {address[index + 35]}
          </span>
          ))}
        </div>
    );
  };

  const handleSummit = () => {
    const address = generateRandomAddress();
    setColoredAddress(generateColoredAddress(address));
  };

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
            <div id="why" className="h-60">
              why
            </div>

            <div id="how" className="h-60">
              <span>how</span>
              <br />

              <input
                  type="text"
                  className={"w-screen"}
                  value={textAddress}
                  onChange={(e) => setTextAddress(e.target.value)}
                  placeholder="Enter something"
              />
              <br />

              <button onClick={handleSummit}>Start Text!</button>
              <br />
              {coloredAddress}
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
