import { useRef, useState, FormEventHandler } from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import { Category } from "@/types/codex";

type EditCategoryProps = {
    category: Category;
};

export default function EditCategoryModal({ category }: EditCategoryProps) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const nameInput = useRef<HTMLInputElement>();
    const { name, description } = category;

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm({
        name,
        description,
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser: FormEventHandler = (e) => {
        e.preventDefault();
        console.log(data);
        closeModal();

        // destroy(route("profile.destroy"), {
        //     preserveScroll: true,
        //     onSuccess: () => closeModal(),
        //     onError: () => passwordInput.current?.focus(),
        //     onFinish: () => reset(),
        // });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);

        reset();
    };

    return (
        <>
            <span
                onClick={confirmUserDeletion}
                className="text-indigo-400 hover:text-indigo-300 cursor-pointer"
            >
                Edit
            </span>

            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                <form onSubmit={deleteUser} className="p-6">
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

                        <TextInput
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
