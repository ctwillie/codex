import { useRef, useState, FormEventHandler } from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import TextareaInput from "@/Components/TextareaInput";

export default function CreateCategoryModal() {
    const [creatingCategory, setCreatingCategory] = useState(false);
    const nameInput = useRef<HTMLInputElement>();

    const {
        data,
        setData,
        post: store,
        processing,
        reset,
        errors,
    } = useForm({
        name: "",
        description: "",
    });

    const confirmCreateCategory = () => {
        setCreatingCategory(true);
    };

    const createCategory: FormEventHandler = (e) => {
        e.preventDefault();

        store(route("category.store"), {
            onSuccess: () => closeModal(),
            onError: () => nameInput.current?.focus(),
        });
    };

    const closeModal = () => {
        setCreatingCategory(false);
        reset();
    };

    return (
        <>
            <button
                onClick={confirmCreateCategory}
                className="block rounded-md bg-indigo-500 px-3 py-2 text-center text-sm font-semibold text-white hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
                Add
            </button>

            <Modal show={creatingCategory} onClose={closeModal}>
                <form onSubmit={createCategory} className="p-6">
                    <header>
                        <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                            Add Category
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
