import { zodResolver } from "@hookform/resolvers/zod";
import { CheckerData, CheckerInput, CheckerOutput, checkerSchema } from "../../lib/request.schema";
import { Controller, useForm } from "react-hook-form";
import { useAddChecker, useFetchUserList, useUpdateChecker } from "../../hooks/useRequest";
import { FormsInputs } from "../../components/FormsInputs";
import { Close, SaveAs } from "@mui/icons-material";
import ButtonComponents from "../../components/Buttons";
import { useEffect } from "react";
import { showSuccess } from "../../components/ToastAlert";
import SearchableInput from "../../components/SearchableInputs";
import { CheckerWithName, Option1 } from "../../type/RequestType";

type AddCheckerModalProps = {
  onClose: () => void;
  selectedData?: CheckerWithName | null;
};

export default function AddCheckerModal({ onClose, selectedData }: AddCheckerModalProps) {
  const isEdit = !!selectedData;


  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } =useForm<CheckerInput, any, CheckerOutput>({
    resolver: zodResolver(checkerSchema),
    defaultValues: {
      position: "",
      initial: "",
    },
  });

  const { mutate: addChecker, isPending: isAdding } = useAddChecker();
  const { mutate: editChecker, isPending: isEditing } = useUpdateChecker();

  
  useEffect(() => {
    if (selectedData) {
      reset({
        userId: selectedData.userId,     // 👈 convert string -> number
        position: selectedData.position ?? "",
        initial: selectedData.initial ?? "",
      });
    }
  }, [selectedData, reset]);

  const onSubmit = (data: CheckerData) => {
    if (isEdit && selectedData?.id) {
      editChecker(
        { ...data, id: selectedData.id }, 
        {
          onSuccess: () => {
            showSuccess({ message: "Checker updated successfully!", position: "top-center" });
            onClose();
          },
        }
      );
    } else {
      addChecker(data, {
        onSuccess: () => {
          showSuccess({ message: "Checker added successfully!", position: "top-center" });
          onClose();
        },
      });
    }
  };

    const { data: users = [] } = useFetchUserList();
  
    const userData: Option1[] = users.map(c => ({
      id: c.id ?? "",    
      name: c.name ?? ""
    }));
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-6 mb-6 md:grid-cols-3">
            <Controller
            name="userId"
            control={control}
            render={({ field, fieldState }) => (
              <SearchableInput
                data={userData}
                label="Name"
                placeholder="Select checker name..."
                // pass RHF-controlled props directly
                name={field.name}
                value={field.value}
                onChange={field.onChange}
                inputRef={field.ref}
                error={fieldState.error}
                />
              )}
             />
        <FormsInputs
          label="Position"
          placeholder="Enter position"
          error={errors.position}
          register={register("position")}
          type="text"
        />
        <FormsInputs
          label="Initial"
          placeholder="Enter initial"
          error={errors.initial}
          register={register("initial")}
          type="text"
        />
      </div>
      <div className="flex justify-end gap-2">
        <ButtonComponents
          label={isEdit ? "Update" : "Submit"}
          size="md"
          type="submit"
          icon={<SaveAs />}
          disabled={isAdding || isEditing}
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
