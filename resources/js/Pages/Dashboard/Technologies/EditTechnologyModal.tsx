import { useRef, useState, FormEventHandler, ChangeEvent } from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import { Technology } from "@/types/codex";
import Select from "@/Components/Select";
import { SelectOption } from "@/types/select";

type EditTechnologyProps = {
    technology: Technology;
    categorySelectOptions: SelectOption[];
};

export default function EditCategoryModal({
    categorySelectOptions,
    technology,
}: EditTechnologyProps) {
    const [updatingTechnology, setUpdatingTechnology] = useState(false);
    const nameInput = useRef<HTMLInputElement>();
    const { id: technologyId, name, category } = technology;

    const {
        data,
        setData,
        patch: update,
        processing,
        errors,
    } = useForm({
        name,
        categoryId: category.id,
    });

    const confirmEditTechnology = () => {
        setUpdatingTechnology(true);
    };

    const updateTechnology: FormEventHandler = (e) => {
        e.preventDefault();

        update(route("technology.update", technologyId), {
            onSuccess: () => closeModal(),
            onError: () => nameInput.current?.focus(),
        });
    };

    const closeModal = () => {
        setUpdatingTechnology(false);
    };

    return (
        <>
            <span
                onClick={confirmEditTechnology}
                className="text-indigo-400 hover:text-indigo-300 cursor-pointer"
            >
                Edit
            </span>

            <Modal show={updatingTechnology} onClose={closeModal}>
                <form onSubmit={updateTechnology} className="p-6">
                    <header>
                        <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                            Edit Technology
                        </h2>
                    </header>

                    <div className="mt-6">
                        <InputLabel htmlFor="name" value="Name" />

                        <TextInput
                            ref={nameInput}
                            id="name"
                            name="name"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            className="mt-1 block w-3/4"
                            autoComplete="off"
                            isFocused
                        />

                        <InputError message={errors.name} className="mt-2" />
                    </div>

                    <div className="mt-6 w-3/4">
                        <InputLabel
                            htmlFor="categoryId"
                            value="Catgory"
                            className="mb-1"
                        />
                        <Select
                            id="categoryId"
                            selectedKeys={[data.categoryId]}
                            options={categorySelectOptions}
                            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                                setData("categoryId", e.target.value)
                            }
                        />
                    </div>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>
                            Cancel
                        </SecondaryButton>

                        <PrimaryButton className="ml-3" disabled={processing}>
                            Save
                        </PrimaryButton>
                    </div>
                </form>
            </Modal>
        </>
    );
}
