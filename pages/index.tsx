import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import Navbar from "../components/navbar";
import Body from "../components/body";
import Footer from "../components/footer";

export const getServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
};

export default function Home() {
  const { t } = useTranslation("common");

  return (
    <>
      <Head>
        <title>Gator - logic gates interactive tool</title>
        <link rel="shortcut icon" href="/ico.png" type="image/x-icon" />
      </Head>
      <div>
        <Navbar />
        <Body />
        <Footer />
      </div>
    </>
  );
}
