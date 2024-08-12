import React from 'react';
import {Layout, Menu, theme} from 'antd';
import './App.css';

const {Header, Content, Footer} = Layout;

const items = new Array(6).fill(null).map((_, index) => ({
    key: index + 1,
    label: `nav ${index + 1}`,
}));

const App: React.FC = () => {
    const {
        token: {colorBgContainer, borderRadiusLG},
    } = theme.useToken();

    return (
        <Layout>
            <Header style={{display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF'}}>
                <img className="demo-logo" src={'/logo192.png'} alt={'Banner'} width={'50px'} height={'50px'}/>
                <Menu
                    theme="light"
                    mode="horizontal"
                    defaultSelectedKeys={['1']}
                    items={items}
                    className={'menu'}
                    style={{minWidth: 0, backgroundColor: '#FFFFFF'}}
                />
            </Header>
            <Content style={{padding: '0 48px', backgroundColor: '#FFFFFF', width: '100%', height: '100%'}}>
                <div
                    style={{
                        background: colorBgContainer,
                        minHeight: 280,
                        padding: 24,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    Content
                </div>
            </Content>
            <Footer style={{textAlign: 'center'}}>
                Ant Design ©{new Date().getFullYear()} Created by Ant UED
            </Footer>
        </Layout>
    );
};

export default App;