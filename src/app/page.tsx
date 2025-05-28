'use client';
import Navbar from "./components/Navbar";
// import { motion } from "framer-motion";
// import { useState } from "react";
import HomePage from "./components/HomePage";


export default function Home() {

  // const [cliquer, setCliquer] = useState(false);
  return (
    <div>
      <Navbar />
      <HomePage />
    </div>

  );
}
