export default function Head() {
  return (
    <>
      <title>Votre flotte de taxis à Paris</title>
      <meta name="description" content="70 taxis à Paris pour les professionnels exigeants, ponctuels et discrets." />

      <link rel="preload" as="image" href="/image-provisoire.jpeg" />

      {/* ✅ Favicon standard */}
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      <meta name="theme-color" content="#000000" />
    </>
  );
}
