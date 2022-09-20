export interface IIconProps {
  imageUrl: string;
  style: {
    width: string;
    height: string;
  };
  onClick: () => void;
}

export interface ToggleIconProps extends IIconProps {
  userInfo: {
    nickname: string;
    email: string;
    roleType: string;
  };
  handleLogout: () => void;
  isShowToggle: boolean;
  setIsShowToggle: (e: boolean) => void;
}

export interface AlarmIconProps {
  imageUrl: string;
  onClick: () => void;
  isShowAlarm: boolean;
  setIsShowAlarm: (e: boolean) => void;
}
