import { useState, useEffect } from "react";
import srtParser2 from "srt-parser-2";
import { Center, Text } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators, RootState } from "../../state";
import { bindActionCreators } from "redux";

type SrtParser = {
  id: string;
  startTime: Number;
  endTime: Number;
  text: string;
}[];

const SubtitlePlayer = () => {
  const [text, setText] = useState<string>("");

  const state = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  const { setSubtitleArray } = bindActionCreators(actionCreators, dispatch);

  const strToTime = (str: string) => {
    const parts = str.split(",");
    const milliseconds = `0.${parts[1]}`;
    const seconds = parts[0].split(":");
    const newTime =
      parseInt(seconds[0]) * 3600 +
      parseInt(seconds[1]) * 60 +
      parseInt(seconds[2]) +
      parseFloat(milliseconds);
    return newTime;
  };

  useEffect(() => {
    let srt = state.files.subtitleText;
    const parser = new srtParser2();
    const result: SrtParser = parser.fromSrt(srt).map((element) => {
      const newStartTime = strToTime(element.startTime);
      const newEndTime = strToTime(element.endTime);
      return {
        ...element,
        startTime: newStartTime,
        endTime: newEndTime,
      };
    });
    setSubtitleArray(result);
    console.log(result);
  }, []);

  useEffect(() => {
    const elements: any = state.files.subtitleArray?.filter(
      (e: any) =>
        e.startTime <= state.player.currentTime &&
        e.endTime >= state.player.currentTime
    );
    if (elements) {
      setText(elements[0]?.text);
    } else {
      setText("");
    }
  });

  return (
    <Center bg="tomato" h="20" w="100%" color="white">
      <Text fontSize="3xl">{text}</Text>
    </Center>
  );
};

export default SubtitlePlayer;
