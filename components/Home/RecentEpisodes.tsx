import { useQuery } from "@tanstack/react-query";
import { nanoid } from "nanoid";
import Link from "next/link";
import React from "react";
import styled from "styled-components";
import { Play } from "../../Icons/Icons";
import { recentEp } from "../../interfaces";

function RecentEpisodes() {
  const fetchData = async () => {
    const res = await fetch(`https://api.jikan.moe/v4/watch/episodes`);
    const data = await res.json();
    return data.data;
  };
  const { data, isLoading, isError } = useQuery(["recentep"], fetchData, {
    refetchInterval: (data, isError) => (isError ? 2000 : 0),
  });
  if (isLoading) {
    return <></>;
  }
  if (isError) {
    return <></>;
  }
  const results = data.map((anime: recentEp) => (
    <div key={nanoid()} className="episode_item">
      <div className="image_container">
        <Link href={`/detail/${anime.entry.mal_id}`}>
          <a title="go to detail page">
            <img
              src={anime.entry.images.webp.image_url}
              alt={anime.episodes[0].title}
            />
          </a>
        </Link>
      </div>
      <div className="info">
        <div className="title_container">
          <h3 className="title text-center text-xs sm:text-sm md:text-base w-full px-1">
            {anime.entry.title}
          </h3>
        </div>
        <div className="blur_bg"></div>
        <p className="episode text-xs sm:text-sm md:text-base">
          Ep: {anime.episodes[0].mal_id}
        </p>
      </div>
      <div className="play_layer">
        <div className="play_icon w-1/4">
          <Link href={`/detail/${anime.entry.mal_id}`}>
            <a title="go to detail page">
              <Play />
            </a>
          </Link>
        </div>
      </div>
    </div>
  ));
  console.log(data);
  return (
    <Recent_Episodes>
      <h1 className="w-full text-xl md:text-4xl">Recently Updated :</h1>
      <>{results}</>
    </Recent_Episodes>
  );
}

export default RecentEpisodes;

const Recent_Episodes = styled.main`
  h1 {
    color: gold;
    padding: 10px;
    margin-bottom: 4rem;
  }

  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 10px;
  margin: auto;
  .episode_item {
    margin-bottom: 2rem;
    width: 16%;
    min-width: 145px;
    position: relative;
    overflow: hidden;
    .image_container {
      width: 100%;
      img {
        object-fit: fill;
        width: 100%;
        aspect-ratio: 0.7;
      }
    }
    .info {
      .episode {
        position: absolute;
        top: 0px;
        right: 0px;
        padding: 5px 8px;
        background-color: green;
        border-radius: 10px;
        font-weight: 600;
        margin: 5px 5px 0px 0px;
      }
      .title_container {
        position: absolute;
        height: 80px;
        width: 100%;
        bottom: -95px;
        background-color: #2a2c31;
        display: flex;
        align-items: center;
        color: gold;
        text-transform: capitalize;
        transition: ease 0.3s;
        font-weight: 600;
        z-index: 50;
      }
      .blur_bg {
        position: absolute;
        width: 150%;
        height: 30px;
        background-color: #2a2c31;
        filter: blur(5px);
        bottom: -75px;
        left: -20px;
        z-index: 100;
        transition: ease 0.3s;
      }
    }
    &:hover .title_container {
      bottom: 0px;
    }
    &:hover .blur_bg {
      bottom: 60px;
    }
    .play_layer {
      position: absolute;
      height: 100%;
      width: 100%;
      display: flex;
      align-items: center;
      top: 0px;
      left: 0px;
      justify-content: center;
      background-color: #00000085;
      opacity: 0;
      transition: ease 0.3s;
      svg {
        width: 100%;
        height: 100%;
      }
    }
    &:hover .play_layer {
      opacity: 1;
    }
  }
`;
