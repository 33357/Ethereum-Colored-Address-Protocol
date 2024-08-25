import React, { useEffect, useRef, useState } from "react";
import { ColorfulAddress } from "./ColorfulAddress";
import { Checkbox } from "./CheckBox";
import { motion } from "framer-motion";
import { useRandomAddress } from "../hooks/useRandomAddress";

let interval: NodeJS.Timeout | null = null;

export const ExampleCard = () => {
  const { addresses, generate } = useRandomAddress();

  const [enable, setEnable] = useState<boolean>(true);
  const [mode, setMode] = useState<"simple" | "normal">("normal");
  const [refreshing, setRefreshing] = useState<boolean>(true);
  const [showDiff, setShowDiff] = useState<boolean>(true);
  const diffWith = showDiff ? addresses[0] : undefined;

  useEffect(() => {
    if (refreshing) {
      interval = setInterval(() => {
        generate();
      }, 5000);
    } else if (interval) {
      clearInterval(interval);
      interval = null;
    }

    return () => {
      interval && clearInterval(interval);
    };
  }, [refreshing, generate]);

  const toggleInterval = () => {
    setRefreshing((v) => !v);
  };

  return (
    <div className="h-fit max-w-[500px] w-full mt-10 md:mt-0 flex flex-col gap-4 items-center justify-center p-4 sm:p-6 bg-gray-300/10 backdrop-blur-sm rounded-lg shadow-sm font-bold text-gray-100">
      <div className="w-full flex justify-start items-center space-x-2">
        <Checkbox
          id="enable"
          defaultChecked={true}
          onCheckedChange={(v) => setEnable(Boolean(v))}
        />
        <label
          htmlFor="enable"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Enable
        </label>

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

        <Checkbox
          id="diff"
          defaultChecked={true}
          onCheckedChange={(v) => setShowDiff(Boolean(v))}
        />
        <label
          htmlFor="diff"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Show Diff
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
            enable={enable}
            simple={mode === "simple"}
            diffWith={diffWith}
          />
        </motion.div>
      ))}
    </div>
  );
};
