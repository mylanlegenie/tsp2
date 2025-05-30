'use client';
import Navbar from "./components/Navbar";
// import { motion } from "framer-motion";
// import { useState } from "react";
import HomePage from "./components/HomePage";
import NosServices from "./components/NosServices"
// import ZonesDesservies from "./components/ZonesDesservies";
import Zones from "./components/Zones";
import QSM from './qsm/page'


export default function Home() {

  return (
    <div>
      <Navbar />
      <HomePage />
      <NosServices />
      <Zones />
      <QSM />
    </div>

  );
}
