// AddBranchModal.tsx
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import {
  branchSchema,
  createBranchSchema,
  updateBranchSchema,
  type Branch,
  type CreateBranchInput,
  type UpdateBranchInput,
}  from "../../lib/request.schema";
import { useEffect, useMemo } from "react";
import { SaveAs, Close } from "@mui/icons-material";
import ButtonComponents from "../../components/Buttons";
import { FormsInputs, FormsSelect } from "../../components/FormsInputs";
import { showSuccess } from "../../components/ToastAlert";
import { useAddBranch, useAddUser, useFetchBranches, useFetchChecker, useUpdateBranch } from "../../hooks/useRequest";
import { CreateUser, createUserSchema, updateUserSchema } from "@/lib/schemas";
import SearchableInput from "../../components/SearchableInputs";
import { PublicUserDTO } from "@/types/auth.type";
import { Option1 } from "../../type/RequestType";


type Props = {
  onClose: () => void;
  selectedData?: PublicUserDTO | null; // when editing, pass the existing Branch
};

export default function AddAccountModal({ onClose, selectedData }: Props) {
  const isEdit = !!selectedData;
  // pick schema based on mode
  const schema = useMemo(
    () => (isEdit ? updateUserSchema : createUserSchema),
    [isEdit]
  );

  type FormValues = z.infer<typeof schema>;
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema as any),
    defaultValues: {
      // @ts-ignore
      name: "",
      // @ts-ignore
      email: "",
      // @ts-ignore
      username: "",
      // @ts-ignore
      password: "",
     // @ts-ignore
      role: "User",
       // @ts-ignore
       branchName : "",
    },
  });

  // Pre-fill when editing
  useEffect(() => {
    if (selectedData) {
      // Only keep fields that exist in the schema
      const { id, name, email, username, role, branchId } = selectedData;
      reset({ id, name, email, username, role, branchId } as FormValues);
    }
  }, [selectedData, reset]);

  const { mutate: addUser, isPending: isAdding } = useAddUser();
  const { mutate: updateBranch, isPending: isUpdating } = useUpdateBranch();

  const onSubmit = (data: FormValues) => {
    if (isEdit && selectedData?.id) {
    //   updateBranch(
    //     { id: selectedData.id, data }, 
    //     {
    //       onSuccess: () => {
    //         showSuccess({ message: "Branch updated successfully!", position: "top-center" });
    //         onClose();
    //       },
    //     }
    //   );
    } else {
        addUser(data as CreateUser, {
        onSuccess: () => {
          showSuccess({ message: "Branch added successfully!", position: "top-center" });
          onClose();
        },
      });
    }
  };

  type Option = { value: string | number; label: string };
  const options: Option[] = [
    { value: "Admin", label: "Admin" },
    { value: "User", label: "User" },
    { value: "Branch", label: "Branch" },
    { value: "Coordinator", label: "Coordinator" },
    { value: "Superadmin", label: "Superadmin" },
  ];

  const { data: branches = [], isLoading } = useFetchBranches();

  const checkerData: Option1[] = branches.map(c => ({
    id: c.id ?? "",    
    name: c.branchName ?? ""
  }));

  const handleBranchChange = (value: Option1) => {
    console.log("selected value:", value);
}

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-6 mb-6 grid-cols-6 md:grid-cols-12 ">
        <div className="col-span-5">
        <FormsInputs
          label="Name"
          placeholder="Enter user full name"
          error={errors.name}
          register={register("name")}
          type="text"
        />
        </div>
        <div className="col-span-4">
        <FormsInputs
          label="Email"
          placeholder="Enter email"
          error={errors.email}
          register={register("email")}
          type="text"
        />
        </div>
        <div className="col-span-3">
            <FormsSelect 
                label="Role"
                placeholder="Select Role"
                options={options}
                register={register("role")}
                error={errors.role}
            />
        </div>
        <div className="col-span-4">
            <Controller
            name="branchId"
            control={control}
            render={({ field, fieldState }) => (
              <SearchableInput
                data={checkerData}
                label="Branch"
                placeholder="Select branch..."
                // pass RHF-controlled props directly
                name={field.name}
                value={field.value}
                onChange={field.onChange}
                inputRef={field.ref}
                error={fieldState.error}
                />
              )}
             />
        </div>
        <div className="col-span-4">
        <FormsInputs
          label="Username"
            placeholder="Enter username"
            error={errors.username}
            type="text"
            register={register("username")}
        />
        </div>
        <div className="col-span-4">
        <FormsInputs
            label="Password"
                placeholder="Enter password"
            error={errors.password}
            type="text"
            register={register("password")}
            />
        </div>
    
      
      </div>

      <div className="flex justify-end gap-2">
        <ButtonComponents
          label={isEdit ? "Update" : "Submit"}
          size="md"
          type="submit"
          icon={<SaveAs />}
          disabled={isSubmitting || isAdding || isUpdating}
        />
        <ButtonComponents
          label="Close"
          size="md"
          onClick={onClose}
          variant="danger"
          icon={<Close />}
        />
      </div>
    </form>
  );
}
