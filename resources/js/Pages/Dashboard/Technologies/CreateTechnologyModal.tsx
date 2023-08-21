import { JSX, useRef, useState, FormEventHandler } from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import Select from "@/Components/Select";
import { SelectOption } from "@/types/select";

type CreateCategoryModalProps = {
    categorySelectOptions: SelectOption[];
};

export default function CreateTechnologyModal({
    categorySelectOptions,
}: CreateCategoryModalProps): JSX.Element {
    const [creatingTechnology, setCreatingTechnology] = useState(false);
    const nameInput = useRef<HTMLInputElement>();

    const {
        data,
        setData,
        post: store,
        processing,
        reset,
        errors,
        transform,
    } = useForm({
        name: "",
        category: categorySelectOptions[0],
    });

    const confirmCreateTechnology = () => {
        setCreatingTechnology(true);
    };

    const createTechnology: FormEventHandler = (e) => {
        e.preventDefault();

        store(route("technology.store"), {
            onSuccess: () => closeModal(),
            onError: () => nameInput.current?.focus(),
        });
    };

    transform((data): any => {
        const { category, name } = data;

        return {
            name,
            categoryId: category?.id,
        };
    });

    const closeModal = () => {
        setCreatingTechnology(false);
        reset();
    };

    return (
        <>
            <button
                onClick={confirmCreateTechnology}
                className="block rounded-md bg-indigo-500 px-3 py-2 text-center text-sm font-semibold text-white hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
                Add
            </button>

            <Modal show={creatingTechnology} onClose={closeModal}>
                <form onSubmit={createTechnology} className="p-6">
                    <header>
                        <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                            Add Technology
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
                        <Select
                            id="category"
                            label="Category"
                            value={data.category}
                            options={categorySelectOptions}
                            onChange={(selectedOption: any) =>
                                setData("category", selectedOption)
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
