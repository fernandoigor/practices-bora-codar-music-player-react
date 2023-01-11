import styled from "styled-components";

interface ImageAudio {
  width?: number;
  height?: number;
}
interface TimeLineActiveProps {
  percent: number;
}

export const Container = styled.header`
  background: #2a2141;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  /* height: 498px;
  width: 266px; */
  height: 100%;
  width: 100%;
  border-radius: 10px;
  align-items: center;
  padding-top: 20px;
  padding-bottom: 20px;
`;
export const ImageAudio = styled.img<ImageAudio>`
  height: ${(props) => props.height || "190"}px;
  width: ${(props) => props.width || "190"}px;
  border-radius: 10px;
  align-items: center;
`;

export const Labels = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: start;
`;
export const MusicName = styled.span`
  margin-right: auto;
  font-family: Arial, Helvetica, sans-serif;
  font-size: x-large;
  color: #d9d9d9;
  align-items: left;
  text-align: left;
`;
export const ArtistName = styled.span`
  margin-right: auto;
  font-family: Arial, Helvetica, sans-serif;
  font-size: large;
  color: #828282;
  align-items: center;
`;

export const ButtonBar = styled.div`
  margin: 0 30px;
  padding: 10px;
  display: flex;
  justify-content: space-around;
  width: 80%;
`;

export const Button = styled.button`
  background-color: transparent;
  border: none;
  :hover {
    transform: scale(1.1, 1.1);
  }
`;

export const ContentTimer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
`;
export const TimeLine = styled.div`
  background-color: #828282;
  height: 6px;
  border-radius: 10px;
  width: 100%;
  display: flex;
`;
export const TimeLineActive = styled.div<TimeLineActiveProps>`
  margin: 0;
  background-color: #d9d9d9;
  height: 6px;
  border-radius: 10px;
  width: ${(props) => props.percent || "0"}%;
  display: flex;
`;

export const ContentTimes = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  width: 100%;
`;
export const Time = styled.span`
  font-family: Arial, Helvetica, sans-serif;
  font-size: small;
  color: #828282;
  align-items: center;
`;
export const Info = styled.div`
  margin-top: 20px;
  width: 80%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  gap: 25px;
`;
