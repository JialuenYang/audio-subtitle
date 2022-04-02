import React, { useRef, useState } from "react";
import { Button, HStack, Text } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../state";

type Props = {
  children: string;
  fileType: string;
};

const InputFile = (props: Props) => {
  const { children, fileType } = props;
  const inputFile = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState("");

  const dispatch = useDispatch();
  const { setAudioBlob, setSubtitleText } = bindActionCreators(
    actionCreators,
    dispatch
  );

  const onButtonClick = () => {
    inputFile?.current?.click();
  };
  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFileName(event.target.files[0].name);
      const url = URL.createObjectURL(event.target.files[0]);
      if (fileType === ".srt") {
        const reader = new FileReader();
        reader.onload = (event: any) => {
          // The file's text will be printed here
          console.log(event.target.result);
          setSubtitleText(event.target.result);
        };
        reader.readAsText(event.target.files[0]);
        // setSubtitlePath(url);
      } else if (fileType === ".mp3") {
        setAudioBlob(url);
      }
    }
  };

  return (
    <div>
      <input
        type="file"
        id="file"
        accept={fileType}
        ref={inputFile}
        onChange={onFileChange}
        style={{ display: "none" }}
      />
      <HStack>
        <Button onClick={onButtonClick} borderRadius="5px">
          {children}
        </Button>
        <Text>{fileName}</Text>
      </HStack>
    </div>
  );
};

export default InputFile;
