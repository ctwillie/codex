import { useRef, useState, FormEventHandler } from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import { Category } from "@/types/codex";
import TextareaInput from "@/Components/TextareaInput";

type EditCategoryProps = {
    category: Category;
};

export default function EditCategoryModal({ category }: EditCategoryProps) {
    const [updatingCatgory, setUpdatingCatgory] = useState(false);
    const nameInput = useRef<HTMLInputElement>();
    const { id: categoryId, name, description } = category;

    const {
        data,
        setData,
        patch: update,
        processing,
        errors,
    } = useForm({
        name,
        description,
    });

    const confirmEditCategory = () => {
        setUpdatingCatgory(true);
    };

    const updateCategory: FormEventHandler = (e) => {
        e.preventDefault();

        update(route("category.update", categoryId), {
            onSuccess: () => closeModal(),
            onError: () => nameInput.current?.focus(),
        });
    };

    const closeModal = () => {
        setUpdatingCatgory(false);
    };

    return (
        <>
            <span
                onClick={confirmEditCategory}
                className="text-indigo-400 hover:text-indigo-300 cursor-pointer"
            >
                Edit
            </span>

            <Modal show={updatingCatgory} onClose={closeModal}>
                <form onSubmit={updateCategory} className="p-6">
                    <header>
                        <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                            Edit Category
                        </h2>
                    </header>

                    <div className="mt-6">
                        <InputLabel htmlFor="Name" value="Name" />

                        <TextInput
                            ref={nameInput}
                            id="name"
                            name="name"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            className="mt-1 block w-3/4"
                            isFocused
                        />

                        <InputError message={errors.name} className="mt-2" />
                    </div>

                    <div className="mt-6">
                        <InputLabel htmlFor="Description" value="Description" />

                        <TextareaInput
                            rows={4}
                            id="description"
                            name="description"
                            value={data.description}
                            onChange={(e) =>
                                setData("description", e.target.value)
                            }
                            className="mt-1 block w-3/4"
                        />

                        <InputError message={errors.name} className="mt-2" />
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
