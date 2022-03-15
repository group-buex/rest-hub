import { useEffect } from "react";
import {
  RecoilValueReadOnly,
  useRecoilValueLoadable,
  useRecoilState,
  RecoilState,
} from "recoil";
import { defaultState } from "states";

function useGetRecoilValueLoadable<RecoilValueType>(
  selector: RecoilValueReadOnly<RecoilValueType>,
  atomState: RecoilState<RecoilValueType> = null
) {
  const { contents, state } = useRecoilValueLoadable(selector) as {
    contents: RecoilValueType;
    state: "hasValue" | "loading" | "hasError";
  };

  const [stateData, setStateData] = useRecoilState<RecoilValueType>(
    atomState ?? defaultState
  );

  useEffect(() => {
    atomState && state === "hasValue" && contents && setStateData(contents);
  }, [contents]);

  return { contents, state, stateData, setStateData };
}

export default useGetRecoilValueLoadable;
