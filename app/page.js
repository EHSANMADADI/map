import Fetchdata from "@/components/Fetchdata";
import Leflet from "@/components/Leflet";
import dynamic from "next/dynamic";
export default function Home() {
  const MapWithNoSSR = dynamic(() => import("../components/Leflet"), {
    ssr: false,
  });
  return (
    <>
      <div className="flex">
        <div className="w-1/2 h-screen p-5 rounded-full z-10">
          <MapWithNoSSR />
        </div>
        <div className="w-1/2 z-50">
          <Fetchdata />
        </div>
      </div>
    </>
  );
}
