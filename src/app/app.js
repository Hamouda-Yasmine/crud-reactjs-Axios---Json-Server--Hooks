import axios from "axios";
import { createContext, useState } from "react";

//hook pour centralise les information de lapp en perd pas les objets quand we go from a page to another
export const AppContext=createContext();



export const productsApi=axios.create({baseURL:"http://localhost:9000",}
);
//sans la pagination
/*export const getProducts =()=>{
    return productsApi.get(`/productsbd`);
};*/
//avec la pagination
export const getProducts =(keyword="",page=1,size=4)=>{
    return productsApi.get(`/productsbd?name_like=${keyword}&_page=${page}&_limit=${size}`);
};
export const deleteProducts=(product)=>{
    return productsApi.delete(`/productsbd/${product.id}`);
};
export const getProduct=(id)=>{
    return productsApi.get(`/productsbd/${id}`);
};
export const saveProduct=(product)=>{
    return productsApi.post(`/productsbd`,  product);
};
export const checkProduct=(product)=>{
    return productsApi.patch(`/productsbd/${product.id}`,{checked: !product.checked});

}
export const updateProduct=(product)=>{
    return productsApi.put(`/productsbd/${product.id}`,product);
}


export const useAppState=()=>{
    const initialState={
        products:[],
        currentPage:1,
        pageSize:4,
        keyword:"",
        totalPages:0,
      };
      const appState= useState(initialState);
      return appState;
} ;
