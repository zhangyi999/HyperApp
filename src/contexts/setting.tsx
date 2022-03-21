// Make sure the shape of the default value passed to

import { createContext, Dispatch, useContext } from "react";

export interface Setting {
  userSlippageTolerance: number; // 用户滑点设置
  userSwapApproveUnlimited: boolean; // 用户无限授权交易
}

const getLocalState = () => {
  const local = localStorage.getItem("setting");
  if (local) return JSON.parse(local) as Setting;
  return {};
};

export const settingInitData: Setting = {
  userSlippageTolerance: 0.1,
  userSwapApproveUnlimited: false,
  ...getLocalState(),
};

export interface SettingReducerProps {
  settingState: Setting;
  changeSettingState: Dispatch<Partial<Setting>>;
}

export const SettingContext = createContext<SettingReducerProps>({
  settingState: settingInitData,
  changeSettingState: () => {
    throw new Error("SettingContext 未定义");
  },
});

export const SettingReducer = (
  prevState: Setting,
  updatedProperty: Partial<Setting>
): Setting => {
  const newState = {
    ...prevState,
    ...updatedProperty,
  };
  console.log("newState:", newState);
  localStorage.setItem("setting", JSON.stringify(newState));
  return newState;
};

export const useSetting = () => {
  const context = useContext(SettingContext);

  return {
    setting: context.settingState,
    setSetting: context.changeSettingState,
  };
};
