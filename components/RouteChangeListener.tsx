"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useModeStore } from "@/components/StateProvider";

const RouteChangeListener = () => {
  const router = useRouter();
  const [changes, setChanges] = useState(0);
  const changeTurboMode = useModeStore.use.changeTurboMode();

  useEffect(() => {
    const handleRouteChange = (url) => {
      console.log("App is changing to:", url);
      changeTurboMode();
      // Additional logic or function calls can be placed here to handle the change
    };

    router.events.on("routeChangeStart", handleRouteChange);

    // Cleanup the event listener on component unmount
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [router.events]);

  return <></>;
};

export default RouteChangeListener;
