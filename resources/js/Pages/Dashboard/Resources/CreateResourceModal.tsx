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
import Toggle from "@/Components/Toggle";

type CreateResourceModalProps = {
    categorySelectOptions: SelectOption[];
    technologySelectOptions: SelectOption[];
};

export default function CreateResourceModal({
    categorySelectOptions,
    technologySelectOptions,
}: CreateResourceModalProps): JSX.Element {
    const [creatingResource, setCreatingResource] = useState(false);
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
        isOfficial: false,
        technology: technologySelectOptions[0],
        category: categorySelectOptions[0],
        url: "",
    });

    const confirmCreateResource = () => {
        setCreatingResource(true);
    };

    const createResource: FormEventHandler = (e) => {
        e.preventDefault();

        store(route("resource.store"), {
            onSuccess: () => closeModal(),
            onError: () => nameInput.current?.focus(),
        });
    };

    transform((data): any => {
        const { category, technology, isOfficial, name, url } = data;

        return {
            name,
            isOfficial,
            categoryId: category?.value,
            technologyId: technology?.value,
            url,
        };
    });

    const closeModal = () => {
        setCreatingResource(false);
        reset();
    };

    return (
        <>
            <button
                onClick={confirmCreateResource}
                className="block rounded-md bg-indigo-500 px-3 py-2 text-center text-sm font-semibold text-white hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
                Add
            </button>

            <Modal show={creatingResource} onClose={closeModal}>
                <form onSubmit={createResource} className="p-6">
                    <header>
                        <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                            Add Resource
                        </h2>
                    </header>

                    <div className="mt-6">
                        <Toggle
                            label="Official"
                            onChange={(enabled) =>
                                setData("isOfficial", enabled)
                            }
                        />
                    </div>

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

                    <div className="mt-6">
                        <InputLabel htmlFor="url" value="Url" />

                        <TextInput
                            id="url"
                            name="url"
                            value={data.url}
                            onChange={(e) => setData("url", e.target.value)}
                            className="mt-1 block w-3/4"
                            autoComplete="off"
                        />

                        <InputError message={errors.name} className="mt-2" />
                    </div>

                    <div className="mt-6 w-3/4">
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

                    <div className="mt-6 w-3/4">
                        <Select
                            id="technology"
                            label="Technology"
                            value={data.technology}
                            options={technologySelectOptions}
                            onChange={(selectedOption: any) =>
                                setData("technology", selectedOption)
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