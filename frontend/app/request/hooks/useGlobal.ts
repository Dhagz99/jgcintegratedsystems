import { QueryKey, useMutation, UseMutationOptions, useQuery, useQueryClient, UseQueryOptions } from "@tanstack/react-query";
import { deleteById } from "../services/global.sevice";

type UseAddProps<T> = {
    mutationFn: (data: T) => Promise<any>;
    queryKey: string;
}

type UseFetchProps<T> = {
    queryFn: () => Promise<T>,
    queryKey: string,
    staleTime?: number;
}

export const useAdd = <T>({mutationFn, queryKey}: UseAddProps<T>) =>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [queryKey]});
        }
    })
}


export const useFetch = <T>(options: UseFetchProps<T>) => {
    return useQuery<T>({
      queryKey: [options.queryKey],
      queryFn: options.queryFn,
      staleTime: options.staleTime ?? 5 * 60 * 1000, // default: 5 minutes
    });
  };




  export type UseAddGlobalProps<TVars, TData = unknown, TError = unknown> = {
    mutationFn: (vars: TVars) => Promise<TData>;
    queryKey: QueryKey;
  } & Omit<UseMutationOptions<TData, TError, TVars>, "mutationFn">;
  
  export const useAddGlobal = <TVars, TData = unknown, TError = unknown>({
    mutationFn,
    queryKey,
    ...options
  }: UseAddGlobalProps<TVars, TData, TError>) => {
    const queryClient = useQueryClient();
  
    return useMutation<TData, TError, TVars>({
      mutationFn,
      onSuccess: (...args) => {
        queryClient.invalidateQueries({ queryKey });
        options.onSuccess?.(...args);
      },
      ...options,
    });
  };


  // hooks/useFetch.ts

export type UseGlobalFetchProps<T> = {
  queryKey: QueryKey;                 // string | (string | number | object)[]
  queryFn: () => Promise<T>;          // no args—compose params into queryKey/queryFn
  staleTime?: number;
  enabled?: boolean;
};

export const useFetchGlobal = <T>({
  queryKey,
  queryFn,
  staleTime = 5 * 60 * 1000,          // 5 minutes
  enabled = true,
}: UseGlobalFetchProps<T>) => {
  return useQuery<T>({
    queryKey,                          // ✅ pass as-is (not wrapped again)
    queryFn,
    staleTime,
    enabled,
  } as UseQueryOptions<T>);            // satisfy TS when extending later
};



type UseDeleteGlobalArgs<TRes = void> = {
  baseUrl: string;             // e.g. "/request/delete-branch"
  invalidateKeys: QueryKey[];  // keys to invalidate after success
};

export const useDeleteGlobal = <TRes = void>({
  baseUrl,
  invalidateKeys,
}: UseDeleteGlobalArgs<TRes>) => {
  const qc = useQueryClient();

  return useMutation<TRes, unknown, number>({
    mutationFn: (id: number) => deleteById<TRes>(baseUrl, id),
    onSuccess: () => {
      for (const key of invalidateKeys) {
        qc.invalidateQueries({ queryKey: key });
      }
    },
  });
};






  