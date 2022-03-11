import { RecoilValueReadOnly, useRecoilValueLoadable } from "recoil";

function useGetRecoilState<RecoilValueType>(
  selector: RecoilValueReadOnly<RecoilValueType>
) {
  return useRecoilValueLoadable(selector) as {
    contents: RecoilValueType;
    state: "hasValue" | "loading" | "hasError";
  };
}

export default useGetRecoilState;
