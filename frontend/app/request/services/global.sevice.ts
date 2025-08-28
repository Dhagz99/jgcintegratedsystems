import api from "@/lib/api";
import { ApiResponse } from "../type/MainType";

export async function addData<TRequest, TResponse>(
  url: string,
  data: TRequest
): Promise<TResponse> {
  const res = await api.post<TResponse>(url, data);
  return res.data;
}


export async function updateData<TReq, TRes>(url: string, data: TReq): Promise<TRes> {
    const res = await api.put<TRes>(url, data);
    return res.data;
  }

  export async function getData<TRes>(url: string, params?: Record<string, any>): Promise<TRes> {
    const res = await api.get<TRes>(url, { params });
    return res.data;
  }

  
  export async function getDataRes<TRes>(
    url: string,
    params?: Record<string, any>
  ): Promise<TRes> {
    const res = await api.get<TRes>(url, { params });
    return res.data; 
  }
  
  


  // DELETE by id in URL
export async function deleteById<TRes>(baseUrl: string, id: number | string): Promise<TRes> {
    const res = await api.delete<TRes>(`${baseUrl}/${id}`);
    return res.data;
  }