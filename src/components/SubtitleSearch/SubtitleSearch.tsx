import React, { useEffect, useState } from "react";
import { Input, Link, Text, withDefaultColorScheme } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators, RootState } from "../../state";
import { bindActionCreators } from "redux";

type SrtParser = {
  id: string;
  startTime: number;
  endTime: number;
  text: string;
}[];

type SubtitleItem = {
  id: string;
  startTime: number;
  endTime: number;
  text: string;
};

const SubtitleSearch = (props: any) => {
  const [searchString, setSearchString] = useState<string>("");
  const [filteredArray, setFilteredArray] = useState<SrtParser>([]);

  const state = useSelector((state: RootState) => state.files);

  useEffect(() => {
    if (!searchString) {
      setFilteredArray([]);
      return;
    }
    const { subtitleArray } = state;
    const filteredArr = subtitleArray.filter((item: SubtitleItem) =>
      item.text.toUpperCase().includes(searchString.toUpperCase())
    );
    setFilteredArray(filteredArr);
  }, [searchString]);

  const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchString(event.target.value);
  };
  return (
    <div>
      <Input placeholder="Search subtitle" onChange={onSearchChange} />
      {filteredArray.map(({ id, startTime, text }) => (
        <Text
          key={id}
          onClick={() => {
            props.wf.seekTo(startTime / props.wf.getDuration());
          }}
        >
          {text}
        </Text>
      ))}
    </div>
  );
};

export default SubtitleSearch;
