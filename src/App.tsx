import React, { useState, useEffect, useRef } from "react";
import { Layout, Menu, theme } from "antd";
import "./App.scss";

const { Header, Content, Footer } = Layout;

const menusItems = [
  "Why",
  "How",
  "Get Involved",
  "FAQ",
  "Testimonials",
  "Community Support",
];

const items = menusItems.map((item) => ({
  key: item,
  label: item,
}));

const App: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const sections = {
    Why: useRef<HTMLDivElement>(null),
    How: useRef<HTMLDivElement>(null),
    GetInvolved: useRef<HTMLDivElement>(null),
    FAQ: useRef<HTMLDivElement>(null),
    Testimonials: useRef<HTMLDivElement>(null),
    CommunitySupport: useRef<HTMLDivElement>(null),
  };

  const handleMenuClick = (key: string) => {
    const sectionRef = sections[key.replace(/ /g, "") as keyof typeof sections];
    if (sectionRef && sectionRef.current) {
      window.scrollTo({
        top: sectionRef.current.offsetTop, // 偏移量与 Header 的高度一致
        behavior: "smooth",
      });
    }
  };

  return (
    <Layout>
      <Header
        className="fixed inset-0 z-50 h-fit flex justify-between items-center bg-white shadow-sm"
        style={{
          boxShadow: isScrolled ? "0 2px 8px rgba(0, 0, 0, 0.15)" : "none",
          transition: "box-shadow 0.3s ease",
        }}
      >
        <h1 className="text-lg font-bold">ETH Colored Address Protocol</h1>
        <Menu
          theme="light"
          mode="horizontal"
          defaultSelectedKeys={["1"]}
          items={items}
          className={"menu"}
          style={{ minWidth: 0, backgroundColor: "#FFFFFF" }}
          onClick={(e) => handleMenuClick(e.key)}
        />
      </Header>

      <Content
        style={{
          padding: "0 48px",
          backgroundColor: "#FFFFFF",
          width: "100%",
          height: "100%",
          marginTop: "15vh",
        }}
      >
        {menusItems.map((item) => (
          <div key={item}>
            {/* 占位元素，保持与 Header 高度一致 */}
            <div
              style={{ height: "15vh" }}
              ref={sections[item.replace(/ /g, "") as keyof typeof sections]}
            ></div>
            <div
              style={{
                background: colorBgContainer,
                minHeight: 280,
                padding: 24,
                borderRadius: borderRadiusLG,
                marginBottom: "20px",
              }}
            >
              <h2>{item}</h2>
              <p>Content for {item} section...</p>
            </div>
          </div>
        ))}
      </Content>

      <Footer style={{ textAlign: "center" }}>
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layout>
  );
};

export default App;
