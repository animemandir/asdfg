import styled from "styled-components";
import { dataOb } from "../../interfaces";
import { useState } from "react";
import Header from "../Header";
import { nanoid } from "nanoid";

//-------------------------

function DetailHero({ data }: dataOb) {
  const [showMore, setshowMore] = useState(false);
  const summaryVsibility = () => {
    setshowMore((pre) => !pre);
  };
  const summary = data.synopsis.slice(0, 350);
  return (
    <>
      <Header />
      <Div_A className="Detail_page">
        <div className="hero_container">
          <div className="background__image">
            <img
              src={data.images.webp.large_image_url}
              alt="background image"
              width="300"
              height="400"
            />
          </div>
          <div className="infos px-7 mt-20 md:mt-0">
            <div className="image_summary">
              <div className="cover_image mb-5">
                <img
                  src={data.images.webp.image_url}
                  alt={`${data.title} cover image`}
                  width="200"
                  height="285"
                  className="mb-2"
                />

                <button className="block mx-auto p-2 rounded-md w-36 border-2 hover:border-gray-900  ">
                  <a
                    href={data.trailer.url}
                    target="_blank"
                    title="go to youtube"
                  >
                    Trailer
                  </a>
                </button>
              </div>
              <div className="title_summary ml-10 flex flex-col md:flex-row md:items-center">
                <div className="summary">
                  <h1 className="title text-2xl lg:text-3xl">{data.title}</h1>
                  <p className="synposis">
                    {showMore ? data.synopsis : `${summary}...`}
                    <span
                      className="block text-green-700 font-semibold cursor-pointer"
                      onClick={summaryVsibility}
                    >
                      {showMore ? "less -" : "more +"}
                    </span>
                  </p>
                </div>
                <div className="more_details md:ml-10">
                  <p className="title_japanese text-yellow-400">
                    {data.title_japanese}
                  </p>
                  <p className="type">Type: {data.type}</p>
                  <p className="status"> Status: {data.status}</p>
                  <p className="duration">Duration: {data.duration}</p>
                  <p className="eposides">Episodes: {data.episodes}</p>
                  <p className="score">Score: {data.score}</p>
                  <p className="gener mb-2">
                    <span className="block mb-2">Genre</span>
                    {data.genres.map((e) => (
                      <span
                        key={nanoid()}
                        className="p-1 mr-1 border border-solid rounded-lg"
                      >
                        {e.name}
                      </span>
                    ))}
                  </p>
                  <p>Popularity : {data.popularity}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Div_A>
    </>
  );
}

export default DetailHero;

//-----------------------------------

const Div_A = styled.div`
  min-height: 100vh;
  position: relative;
  .background__image {
    z-index: -1;
    position: absolute;
    top: 0px;
    width: 100%;
    height: calc(100vh - 130px);
    img {
      width: 100%;
      height: 100%;
      filter: blur(50px) brightness(40%);
    }
  }
  .cover_image {
    width: 20%;
    min-width: 200px;
    img {
      width: 100%;
      height: 100%;
      border-radius: 10px;
      box-shadow: 0px 0px 20px 5px #000000b8;
    }
  }
  .infos {
    width: 100%;
    display: flex;
    align-items: center;
    min-height: calc(100vh - 130px);
    .image_summary {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      h1 {
        margin-bottom: 5px;
        font-weight: 600;
        color: gold;
      }
      .summary {
        max-width: 800px;
      }
    }
    .more_details {
      width: 300px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 10px;
    }
  }
`;
