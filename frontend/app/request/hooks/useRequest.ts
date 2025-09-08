import { addRequest, deleteChecker, fetchChecker, updateChecker } from "../services/request.service"
import { useAdd, useAddGlobal, useDeleteGlobal, useFetch, useFetchGlobal } from "./useGlobal";
import { addData, getData, updateData } from "../services/global.sevice";
import { Branch, CheckerData, CreateBranchInput, CreateFundTrasnfer, CreateRequestType, FormFundTransfer, RequestType, UpdateBranchInput } from "../lib/request.schema";
import { PublicUserDTO } from "@/types/auth.type";
import { CheckerWithName, RequestTypeDTO } from "../type/RequestType";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";

// Checker hooks 
  export const useAddChecker = () =>
      useAdd<CheckerData>({
        mutationFn: addRequest,
        queryKey: 'checkers', 
      });

  export const useFetchChecker = () =>
      useFetch<CheckerWithName[]>({
        queryKey: 'checkers',
        queryFn: fetchChecker,
      });

  export const useDeleteChecker = () =>
      useAdd<CheckerWithName>({
          mutationFn: deleteChecker,
          queryKey: 'checkers',
      })

  export const useUpdateChecker = () =>
      useAdd<CheckerData>({
          mutationFn: updateChecker,
          queryKey: 'checkers', 
      });   
      

  // Branch hooks 
  const BRANCHES_QK = ["branches"] as const;
  export const useAddBranch = () => {
    return useAddGlobal<CreateBranchInput, Branch>({
      mutationFn: (vars) =>
      addData<CreateBranchInput, Branch>("/request/add-branch", vars),
      queryKey: BRANCHES_QK,
    });
  };



  type UpdateBranchVars = { id: number; data: UpdateBranchInput };
  

  export const useUpdateBranch = () => {
    return useAddGlobal<UpdateBranchVars, Branch>({
      mutationFn: ({ id, data }) =>
        updateData<UpdateBranchInput, Branch>(`/request/update-branch/${id}`, data),
      queryKey: ["branches"],
    });
  };



  export const useDeleteBranch = () =>
    useDeleteGlobal({
      baseUrl: `/request/delete-branch`,
      invalidateKeys: [BRANCHES_QK],
    });


export const useFetchBranches = () =>
  useFetchGlobal<Branch[]>({
    queryKey: BRANCHES_QK,
    queryFn: () => getData<Branch[]>("/request/fetch-branch"),
  });
  
  
  // Request Type hooks 
  const REQUEST_QK = ["request-type"] as const;
  export const useAddRequestType = () => {
    return useAddGlobal<CreateRequestType, RequestType>({
      mutationFn: (vars) =>
      addData<CreateRequestType, RequestType>("/request/add-request-type", vars),
      queryKey: REQUEST_QK,
    });
  };


 // types
type ApiList<T> = { data: T };
// ✅ unwrap the "data" array and normalize
export const useFetchRequestType = () =>
  useFetchGlobal<RequestTypeDTO[]>({
    queryKey: REQUEST_QK,
    queryFn: async () => {
      const res = await getData<ApiList<RequestTypeDTO[]>>('/request/list-request-type');
      return Array.isArray(res.data) ? res.data : [];
    },
  });


  export const useDeleteRequestType= () =>
    useDeleteGlobal({
      baseUrl: `/request/delete-request-type`,
      invalidateKeys: [REQUEST_QK],
    });


  // // Users hooks 
  const QUERYKEY = ["users"] as const;


  // export const useAddUser = () => {
  //   return useAddGlobal<CreateUser, FormData>({
  //     mutationFn: (vars) =>
  //     addData<CreateUser, FormData>("/register", vars),
  //     queryKey: QUERYKEY,
  //   });
  // };

  export const useAddUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: async (formData: FormData) => {
        const res = await api.post("/register", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        return res.data;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["users"] });
      }
    });
  };


  export const useFetchUserList = () =>
    useFetchGlobal<PublicUserDTO[]>({
      queryKey: QUERYKEY,
      queryFn: () => getData<PublicUserDTO[]>("/users"),
    });


    //FORMS

    const FORMKEY = ['approvals'] as const;
    export const useAddFundTransfer = () => {
        return useAddGlobal<CreateFundTrasnfer, FormFundTransfer>({
          mutationFn: (vars) =>
            addData<CreateFundTrasnfer, FormFundTransfer>("/request/add-fund-transfer", vars),
            queryKey: FORMKEY,
        })
    }
    
    



