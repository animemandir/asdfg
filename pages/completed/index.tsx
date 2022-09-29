import { nanoid } from "nanoid";
import Head from "next/head";
import Header from "../../components/Header";
import SearchCard from "../../components/serach/SearchCard";
import { anilistInfo } from "../../interfaces";

function index({ data }: { data: [anilistInfo] }) {
  console.log(data);
  return (
    <>
      <div className="completed__container flex flex-wrap justify-center">
        <Head>
          <title>Completed Anime</title>
          <meta name="description" content="watch top completed anime free" />
        </Head>
        <Header />
        {data.map((movieCard: anilistInfo) => (
          <SearchCard key={nanoid()} data={movieCard} />
        ))}
      </div>
    </>
  );
}

export default index;

export const getStaticProps = async () => {
  //-------------------------
  const resP1 = await fetch(
    `https://consumet-api.herokuapp.com/meta/anilist/advanced-search?status=FINISHED&perPage=100&page=1`
  );
  const dataP1 = await resP1.json();
  const result1 = await dataP1.results;
  //-------------------------
  const resP2 = await fetch(
    `https://consumet-api.herokuapp.com/meta/anilist/advanced-search?status=FINISHED&perPage=100&page=2`
  );
  const dataP2 = await resP2.json();
  const result2 = await dataP2.results;
  //-------------------------
  const resP3 = await fetch(
    `https://consumet-api.herokuapp.com/meta/anilist/advanced-search?status=FINISHED&perPage=100&page=3`
  );
  const dataP3 = await resP3.json();
  const result3 = await dataP3.results;
  //-------------------------
  const resP4 = await fetch(
    `https://consumet-api.herokuapp.com/meta/anilist/advanced-search?status=FINISHED&perPage=100&page=4`
  );
  const dataP4 = await resP4.json();
  const result4 = await dataP4.results;

  const data = [...result1, ...result2, ...result3, ...result4];

  return {
    props: {
      data,
    },
  };
};
