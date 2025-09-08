// AddBranchModal.tsx
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  createBranchSchema,
  updateBranchSchema,
  type Branch,
  type CreateBranchInput,
}  from "../../lib/request.schema";
import { useEffect, useMemo } from "react";
import { SaveAs, Close } from "@mui/icons-material";
import ButtonComponents from "../../components/Buttons";
import { FormsInputs } from "../../components/FormsInputs";
import { showSuccess } from "../../components/ToastAlert";
import { useAddBranch, useUpdateBranch } from "../../hooks/useRequest";


type Props = {
  onClose: () => void;
  selectedData?: Branch | null; // when editing, pass the existing Branch
};

export default function AddBranchModal({ onClose, selectedData }: Props) {
  const isEdit = !!selectedData;

  // pick schema based on mode
  const schema = useMemo(
    () => (isEdit ? updateBranchSchema : createBranchSchema),
    [isEdit]
  );

  type FormValues = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema as any),
    defaultValues: {
      branchCode: "",
    },
  });


  // Pre-fill when editing
  useEffect(() => {
    if (selectedData) {
      // Only keep fields that exist in the schema
      const { id, branchCode, branchName, bom, faa, companyName, telephone, address } = selectedData;
      reset({ id, branchCode, branchName, bom, faa, companyName, telephone, address } as FormValues);
    }
  }, [selectedData, reset]);

  const { mutate: addBranch, isPending: isAdding } = useAddBranch();
  const { mutate: updateBranch, isPending: isUpdating } = useUpdateBranch();

  const onSubmit = (data: FormValues) => {
    if (isEdit && selectedData?.id) {
      updateBranch(
        { id: selectedData.id, data }, 
        {
          onSuccess: () => {
            showSuccess({ message: "Branch updated successfully!", position: "top-center" });
            onClose();
          },
        }
      );
    } else {
      addBranch(data as CreateBranchInput, { 
        onSuccess: () => {
          showSuccess({ message: "Branch added successfully!", position: "top-center" });
          onClose();
        },
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-4 mb-6 md:grid-cols-12">
        <div className="col-span-3">
          <FormsInputs
            label="Branch Code"
            placeholder="Enter branch code"
            error={errors.branchCode}
            register={register("branchCode")}
            type="text"
          />
        </div>
        <div className="col-span-5">
          <FormsInputs
            label="Branch Name"
            placeholder="Enter branch name"
            error={errors.branchName}
            register={register("branchName")}
            type="text"
          />
        </div>

        <div className="col-span-4">
          <FormsInputs
            label="BOM"
              placeholder="Enter BOM name"
            error={errors.bom}
            type="text"
            register={register("bom")}
          />
        </div>
        <div className="col-span-4">
          <FormsInputs
            label="FAA"
                placeholder="Enter FAA name"
            error={errors.faa}
            type="text"
            register={register("faa")}
          />
        </div>
        <div className="col-span-5">
          <FormsInputs
            label="Company Name"
                placeholder="Enter telephone"
            error={errors.companyName}
            type="text"
            register={register("companyName")}
          />
        </div>
        <div className="col-span-3">
          <FormsInputs
            label="Telephone"
                placeholder="Enter telephone"
            error={errors.telephone}
            type="text"
            register={register("telephone")}
          />
        </div>
        <div className="col-span-12">
          <FormsInputs
            label="Address"
                placeholder="Enter branch address"
            error={errors.address}
            type="text"
            register={register("address")}
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
