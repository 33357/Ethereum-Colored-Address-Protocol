import React from "react";

export const TwitterCard = ({ className }: { className?: string }) => {
  return (
    <blockquote className="twitter-tweet" data-theme="dark">
      <p lang="zh" dir="ltr">
        <a href="https://twitter.com/hashtag/ETHShenZhen?src=hash&amp;ref_src=twsrc%5Etfw">
          #ETHShenZhen
        </a>{" "}
        公共物品项目：
        <a href="https://twitter.com/hashtag/%E4%BB%A5%E5%A4%AA%E5%9D%8A%E6%9C%89%E8%89%B2%E5%9C%B0%E5%9D%80%E5%8D%8F%E8%AE%AE?src=hash&amp;ref_src=twsrc%5Etfw">
          #以太坊有色地址协议
        </a>
        <br />
        <br />
        如何快速确认你转账时输入的{" "}
        <a href="https://twitter.com/hashtag/ETH?src=hash&amp;ref_src=twsrc%5Etfw">
          #ETH
        </a>
        …
      </p>
      &mdash; 33357.xyz (@33357xyz){" "}
      <a href="https://twitter.com/33357xyz/status/1824471393297371186?ref_src=twsrc%5Etfw">
        August 16, 2024
      </a>
    </blockquote>
  );
};
