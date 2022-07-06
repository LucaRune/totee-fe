import {atom, selector} from "recoil";


export const UserState=atom({
    key:"userState",
    default:{
        email: "",
        nickname: null,
        position: null,
        profileImgaeUrl: "",
        roleType:""
    }
})

export const UserSelector = selector({
    key:"userSelector",
    get:({get})=>{
        const user = get(UserState)
        return user;
    }
})