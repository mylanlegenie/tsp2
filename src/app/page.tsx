'use client';
import HomePage from "./components/HomePage";
import NosServices from "./components/NosServices"
import Zones from "./components/Zones";


export default function Home() {

  return (
    <div>
      <HomePage />
      <NosServices />
      <Zones />
    </div>

  );
}