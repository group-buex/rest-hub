import { RecoilState, useRecoilValue } from "recoil";
import { abc } from "states";

function useGetRecoilState<RecoiStateType>(state: string) {
  const abc = require(`../states${state}`);
  const value = useRecoilValue<RecoiStateType>(abc);
  return value;
}

export default useGetRecoilState;
