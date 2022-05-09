import "../styles/globals.css";
import { useState, useEffect } from "react";
import { Navbar } from "../components/Navbar";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  const [liffObject, setLiffObject] = useState(null);
  const [liffError, setLiffError] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loaded, setLoaded] = useState(null);
  const [userLoaded, setUserLoaded] = useState(null);
  const [userData, setUserData] = useState(null);

  // Execute liff.init() when the app is initialized
  useEffect(() => {
    // to avoid `window is not defined` error
    import("@line/liff").then((liff) => {
      console.log("start liff.init()...");
      liff
        .init({ liffId: process.env.LIFF_ID })
        .then(() => {
          console.log("liff.init() done");
          setLiffObject(liff);
          liff
            .getProfile()
            .then((profile) => {
              // const name = profile.displayName;
              setProfile(profile);
              fetch("/api/refresh", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ userId: profile.userId }),
              })
                .then((response) => response.json())
                .then((data) => {
                  setUserData(data.userData);
                })
                .catch((err) => {
                  setUserData(false);
                })
                .then(() => setUserLoaded(true));
            })
            .catch((err) => {
              console.log("error", err);
              // const profile = JSON.parse(
              //   '{"userId":"Uf371e1f096b77a290a586216c462155f","displayName":"woyiswoy","statusMessage":"คนอย่างเทอมันแน่ มันแน่ตลอด","pictureUrl":"https://profile.line-scdn.net/0hL1CjaRuwEx5uEwdyKv1tYR5DEHRNYkoMF3deKlkVTi5bJwZMR3ReKwkRTStbIwYfRCcPKAhDSiZiAGR4cEXvKmkjTSlXJFxNQXRe-w"}'
              // );
              // setProfile(profile);
              // fetch("/api/refresh", {
              //   method: "POST",
              //   headers: {
              //     "Content-Type": "application/json",
              //   },
              //   body: JSON.stringify({ userId: profile.userId }),
              // })
              //   .then((response) => response.json())
              //   .then((data) => {
              //     setUserData(data.userData);
              //   })
              //   .catch((err) => {
              //     setUserData(false);
              //   })
              //   .then(() => setUserLoaded(true));
            })
            .then(() => setLoaded(true));
        })
        .catch((error) => {
          console.log(`liff.init() failed: ${error}`);
          if (!process.env.liffId) {
            console.info(
              "LIFF Starter: Please make sure that you provided `LIFF_ID` as an environmental variable."
            );
          }
          setLiffError(error.toString());
        });
    });
  }, []);

  pageProps.liff = liffObject;
  pageProps.liffError = liffError;
  pageProps.profile = profile;
  pageProps.loaded = loaded;
  pageProps.userLoaded = userLoaded;
  pageProps.userData = userData;

  return (
    <>
      <Head>
        <title>MWIT SC</title>
        <meta name="description" content="MWIT SC Line Bot Web App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        className="transition duration-300 min-h-screen container mx-auto space-y-7 font-Kodchasan"
        data-theme="pastel"
      >
        <Navbar {...pageProps}></Navbar>
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default MyApp;
