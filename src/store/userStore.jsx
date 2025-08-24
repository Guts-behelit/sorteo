import { create } from "zustand";

export const useUserStore = create((set)=>(
  {
    dataUser:{
    full_name: "",
    email: "",
    phone: "",
    amount: ""
  },
  setDataUser:(data)=> set({dataUser:data}),
  resetUser: () =>
    set({
      dataUser: {
        full_name: "",
        email: "",
        phone: "",
        amount: "",
      },
    }),
  }
))