import React, { useState, useEffect } from "react";
import {
  Container,
  ImageAudio,
  ButtonBar,
  Button,
  TimeLine,
  TimeLineActive,
  ContentTimes,
  ContentTimer,
  Time,
  Labels,
  ArtistName,
  MusicName,
  Info,
} from "./styles";
import {
  Pause,
  Play,
  PlayBack,
  PlayForward,
  SquareSharp,
} from "react-ionicons";
import { toMinutes } from "../../utils/convertTime";

interface AudioInterface {
  name: string;
  music: string;
  artist: string;
  image: string;
}
interface PlayerInterface {
  audios: AudioInterface[];
  model: "Vertical" | "Horizontal";
}

const Player = ({ audios, model }: PlayerInterface) => {
  const [loading, setLoading] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [audioTiming, setAudioTiming] = useState({
    total: 0,
    actual: 0,
    percent: 0,
  });

  const [actualAudio, setActualAudio] = useState(0);
  const [audioList] = useState(Object.entries(audios).map((audio) => audio[1]));

  const { name, music, artist, image } = audioList[actualAudio];

  const [audio, setAudio] = useState(new Audio(music));

  const tooglePlay = () => {
    setPlaying((prev) => {
      if (!prev) {
        audio.play();
      } else {
        audio.pause();
      }
      return !prev;
    });
  };

  const nextAudio = () => {
    setActualAudio((prev) => (prev + 1 >= audioList.length ? 0 : prev + 1));
  };
  const prevAudio = () => {
    setActualAudio((prev) => (prev - 1 < 0 ? audioList.length - 1 : prev - 1));
  };

  const handleTimeLine = (e: any) => {
    const left = e.target.getBoundingClientRect().x;
    const width = e.target.getBoundingClientRect().width;
    const clickX = e.clientX - left;
    const fraction = clickX / width;
    audio.currentTime = fraction * audioTiming.total;
  };

  useEffect(() => {
    audio.pause();
    audio.src = music;
  }, [actualAudio]);

  useEffect(() => {
    audio.addEventListener("timeupdate", () => {
      setAudioTiming((prev) => ({
        ...prev,
        actual: audio.currentTime,
        percent: (audio.currentTime / prev.total) * 100,
      }));
    });
    audio.addEventListener("loadstart", () => {
      setLoading(true);
    });
    audio.addEventListener("canplay", () => {
      setTimeout(() => {
        audio
          .play()
          .then(() => {
            setPlaying(true);
          })
          .catch((error) => {});
        setLoading(false);
      }, 1000);
    });
    audio.addEventListener("loadeddata", (e) => {
      setAudioTiming((prev) => ({
        ...prev,
        total: audio.duration,
        percent: 0,
      }));
    });
    audio.addEventListener("ended", () => {
      audio.pause();
      setPlaying(false);
    });
    return () => {
      audio.removeEventListener("timeupdate", () => audio.play());
      audio.removeEventListener("canplay", () => audio.play());
      audio.removeEventListener("loadstart", () => audio.pause());
      audio.removeEventListener("loadeddata", () => audio.pause());
      audio.removeEventListener("ended", () => audio.pause());
    };
  }, [audio]);

  return (
    <Container>
      {model === "Vertical" && (
        <>
          <ImageAudio src={image}></ImageAudio>
          <Labels>
            <MusicName>{name}</MusicName>
            <ArtistName>{artist}</ArtistName>
          </Labels>
        </>
      )}
      {model === "Horizontal" && (
        <Info>
          <ImageAudio width={84} height={84} src={image}></ImageAudio>
          <Labels>
            <MusicName>{name}</MusicName>
            <ArtistName>{artist}</ArtistName>
          </Labels>
        </Info>
      )}

      <ButtonBar>
        <Button onClick={prevAudio}>
          <PlayBack
            color={"#E1E1E6"}
            // rotate
            height="28px"
            width="28px"
          />
        </Button>
        <Button onClick={tooglePlay}>
          {loading && (
            <SquareSharp color={"#E1E1E6"} rotate height="28px" width="28px" />
          )}

          {!loading &&
            (playing ? (
              <Pause
                color={"#E1E1E6"}
                // rotate
                height="28px"
                width="28px"
              />
            ) : (
              <Play
                color={"#E1E1E6"}
                // rotate
                height="28px"
                width="28px"
              />
            ))}
        </Button>
        <Button onClick={nextAudio}>
          <PlayForward
            color={"#E1E1E6"}
            // rotate
            height="28px"
            width="28px"
          />
        </Button>
      </ButtonBar>
      <ContentTimer>
        <>
          <TimeLine onClick={handleTimeLine}>
            <TimeLineActive percent={audioTiming.percent} />
          </TimeLine>
          <ContentTimes>
            <Time>{toMinutes(audioTiming.total)}</Time>
            <Time>{toMinutes(audioTiming.actual)}</Time>
          </ContentTimes>
        </>
      </ContentTimer>
    </Container>
  );
};

export default Player;
