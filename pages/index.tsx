import type { NextPage } from "next";
import Head from "next/head";
import Header from "../components/Header";
import HeroSlide from "../components/Home/HeroSlide";
import RecentEpisodes from "../components/Home/RecentEpisodes";
import TopLists from "../components/Home/TopLists";

const Home: NextPage = (hero_data: any) => {
  const { hero_top_data, pop_data, complete_data } = hero_data;
  // console.log(hero_top_data);
  return (
    <div className="page">
      <Head>
        <title>Animo Time</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="animo time a website to watch your favorite anime online without any ads"
        />
      </Head>
      <Header />
      <main className="">
        <HeroSlide data={hero_data} />
        {/* <TopLists /> */}
        <RecentEpisodes />
      </main>
    </div>
  );
};

export default Home;

export const getStaticProps = async () => {
  const hero_res = await fetch(
    `https://api.jikan.moe/v4/top/anime?filter=airing`
  );
  const hero_data = await hero_res.json();

  return {
    props: {
      hero_data,
    },
  };
};
