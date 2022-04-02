import React, { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import { Center, Icon } from "@chakra-ui/react";
import { BiPlayCircle, BiPauseCircle } from "react-icons/bi";
import {
  BsFillVolumeMuteFill,
  BsFillVolumeDownFill,
  BsFillVolumeUpFill,
} from "react-icons/bs";
import { useDispatch } from "react-redux";
import { actionCreators } from "../../state";
import { bindActionCreators } from "redux";

const formWaveSurferOptions = (ref: any) => ({
  container: ref,
  waveColor: "#eee",
  progressColor: "OrangeRed",
  cursorColor: "OrangeRed",
  barWidth: 3,
  barRadius: 3,
  responsive: true,
  height: 150,
  // If true, normalize by the maximum peak instead of 1.0.
  normalize: true,
  // Use the PeakCache to improve rendering speed of large waveforms.
  partialRender: true,
});

type Props = {
  url: string;
};

const WaveformPlayer = (props: Props) => {
  const waveformRef = useRef(null);
  const wavesurfer: any = useRef(null);
  const { url } = props;
  const [playing, setPlay] = useState(false);
  const [volume, setVolume] = useState(0.2);
  const [oldVolume, setOldVolume] = useState(volume);
  //   const [currentTime, setCurrentTime] = useState(0);

  const dispatch = useDispatch();
  const { setCurrentTime } = bindActionCreators(actionCreators, dispatch);

  // create new WaveSurfer instance
  // On component mount and when url changes
  useEffect(() => {
    setPlay(false);

    const options = formWaveSurferOptions(waveformRef.current);
    wavesurfer.current = WaveSurfer.create(options);

    wavesurfer.current.load(url);

    wavesurfer.current.on("ready", () => {
      // https://wavesurfer-js.org/docs/methods.html
      // wavesurfer.current.play();
      // setPlay(true);

      // make sure object stillavailable when file loaded
      if (wavesurfer.current) {
        wavesurfer.current.setVolume(volume);
        setVolume(volume);
        setCurrentTime(wavesurfer.current.getCurrentTime());
      }
    });

    wavesurfer.current.on("finish", () => {
      setPlay(false);
      setCurrentTime(wavesurfer.current.getCurrentTime());
    });

    wavesurfer.current.on("seek", () => {
      setCurrentTime(wavesurfer.current.getCurrentTime());
    });

    wavesurfer.current.on("audioprocess", () => {
      setCurrentTime(wavesurfer.current.getCurrentTime());
    });

    // Removes events, elements and disconnects Web Audio nodes.
    // when component unmount
    return () => wavesurfer.current.destroy();
  }, [url]);

  const handlePlayPause = () => {
    setPlay(!playing);
    wavesurfer.current.playPause();
    setCurrentTime(wavesurfer.current.getCurrentTime());
  };

  const onVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    const newVolume = +target.value;

    if (newVolume) {
      setVolume(newVolume);
      wavesurfer.current.setVolume(newVolume || 1);
    }
    if (newVolume > 0.001) {
      setOldVolume(newVolume);
    }
  };

  const onVolumeClick = () => {
    if (volume > 0.001) {
      setVolume(0.001);
    } else {
      setVolume(oldVolume);
    }
  };

  return (
    <div>
      {/* {currentTime} */}
      <div id="waveform" ref={waveformRef} />
      <div className="controls">
        <Center>
          <Icon
            as={playing ? BiPauseCircle : BiPlayCircle}
            w={14}
            h={14}
            onClick={handlePlayPause}
          />
          <Icon
            as={
              volume <= 0.001
                ? BsFillVolumeMuteFill
                : volume <= 0.5
                ? BsFillVolumeDownFill
                : BsFillVolumeUpFill
            }
            w={8}
            h={8}
            onClick={onVolumeClick}
          />
          <input
            type="range"
            id="volume"
            name="volume"
            // waveSurfer recognize value of `0` same as `1`
            //  so we need to set some zero-ish value for silence
            min="0.001"
            max="1"
            step=".025"
            onChange={onVolumeChange}
            defaultValue={volume}
          />
        </Center>
      </div>
    </div>
  );
};

export default WaveformPlayer;
